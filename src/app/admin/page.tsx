'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Inbox, 
  Mail, 
  Trash2, 
  CheckCircle, 
  RefreshCw, 
  LogOut, 
  Search, 
  Clock, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  Database,
  ArrowLeft,
  Filter,
  UserCheck,
  Globe,
  LayoutDashboard,
  BarChart3,
  Settings,
  Bell,
  CheckCheck,
  Send,
  X
} from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import { MessageItem } from '@/lib/db';

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [activeTab, setActiveTab] = useState<'inbox' | 'analytics' | 'database'>('inbox');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Email Reply Modal State
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<MessageItem | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch {
      showToast('⚠️ Failed to refresh messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');

    if (!token) {
      router.push('/auth');
      return;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }

    fetchMessages();
  }, [router, fetchMessages]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/auth');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showToast('🗑️ Message deleted successfully');
      }
    } catch {
      showToast('❌ Error deleting message');
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
        showToast('✓ Marked as read');
      }
    } catch {
      console.error('Failed to mark read');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('📋 Copied email to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openReplyModal = (msg: MessageItem) => {
    setSelectedMsg(msg);
    setReplySubject(`Re: ${msg.subject || 'Portfolio Inquiry'}`);
    setReplyBody(`Hi ${msg.name},\n\nThank you for reaching out through my portfolio website! I would be delighted to work with you.\n\nBest regards,\nEmran Hossen`);
    setReplyModalOpen(true);
  };

  const sendResendEmail = async () => {
    if (!selectedMsg || !replyBody) return;
    setSendingEmail(true);

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: selectedMsg.id,
          toEmail: selectedMsg.email,
          toName: selectedMsg.name,
          subject: replySubject,
          replyText: replyBody,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`✉️ Email reply sent to ${selectedMsg.email} from dev@emran.work!`);
        setMessages((prev) =>
          prev.map((m) => (m.id === selectedMsg.id ? { ...m, read: true } : m))
        );
        setReplyModalOpen(false);
      } else {
        showToast(`❌ Failed: ${data.error || 'Check Resend domain verification'}`);
      }
    } catch (err: any) {
      showToast('❌ Error sending email reply');
    } finally {
      setSendingEmail(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'unread' ? !m.read : m.read;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject && m.subject.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen w-full bg-[#070d1e] text-slate-100 flex relative overflow-hidden font-sans">
      <SpaceBackground />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[9999] px-5 py-3.5 rounded-2xl bg-white/95 text-slate-900 font-bold text-xs shadow-2xl border border-indigo-500/40 backdrop-blur-xl animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= RESEND EMAIL REPLY MODAL ================= */}
      {replyModalOpen && selectedMsg && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-white/20 bg-[#0b1428] shadow-2xl relative space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Send Domain Email Reply</h3>
                  <p className="text-xs text-indigo-400 font-semibold">From: dev@emran.work (Resend API)</p>
                </div>
              </div>

              <button
                onClick={() => setReplyModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">To Recipient</label>
                <input
                  type="text"
                  disabled
                  value={`${selectedMsg.name} <${selectedMsg.email}>`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Email Subject</label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1">Message Body</label>
                <textarea
                  rows={6}
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  placeholder="Write your email response here..."
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReplyModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={sendResendEmail}
                disabled={sendingEmail}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {sendingEmail ? (
                  <span>Sending via Resend...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send from dev@emran.work</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 sm:w-72 bg-[#091124]/90 border-r border-white/10 backdrop-blur-2xl flex flex-col justify-between p-5 relative z-20 shrink-0 hidden md:flex min-h-screen">
        
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>Emran</span>
                <span className="text-indigo-400">Admin</span>
              </h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">dev@emran.work</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'inbox'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Message Inbox</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics &amp; Resend API</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4" />
                <span>Supabase Database</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <a
            href="/"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Open Main Website</span>
          </a>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-500/30 shrink-0">
                EH
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Emran Hossen'}</p>
                <p className="text-[10px] text-indigo-400 truncate font-semibold">dev@emran.work</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/10 bg-[#091124]/80 backdrop-blur-2xl px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Message Communications</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold hidden sm:inline-block">
                🟢 Supabase DB &amp; Resend API Connected
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMessages}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Sync</span>
            </button>

            <button
              onClick={handleLogout}
              className="md:hidden p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Body Content */}
        <div className="p-6 md:p-10 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Summary Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0b1428]/80 flex items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Inquiries</p>
                <p className="text-3xl font-black text-white">{totalCount}</p>
                <p className="text-[11px] text-slate-400">Received from portfolio contact form</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Inbox className="w-7 h-7" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0b1428]/80 flex items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Unread Messages</p>
                <p className="text-3xl font-black text-amber-400">{unreadCount}</p>
                <p className="text-[11px] text-amber-400/80 font-medium">Action required</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Bell className="w-7 h-7 animate-pulse" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0b1428]/80 flex items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Processed / Read</p>
                <p className="text-3xl font-black text-emerald-400">{totalCount - unreadCount}</p>
                <p className="text-[11px] text-emerald-400/80 font-medium">Domain Email Replies (dev@emran.work)</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCheck className="w-7 h-7" />
              </div>
            </div>

          </div>

          {/* Search Bar & Filter Tabs */}
          <div className="glass-card p-4 rounded-3xl border border-white/10 bg-[#0b1428]/80 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search sender name, email, or text..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700/70 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-inner"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {(['all', 'unread', 'read'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    filter === tab
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab === 'all' ? 'All Messages' : tab === 'unread' ? `Unread (${unreadCount})` : 'Read Messages'}
                </button>
              ))}
            </div>

          </div>

          {/* Message List Stream */}
          {filteredMessages.length === 0 ? (
            <div className="glass-card rounded-3xl p-16 text-center border border-white/10 bg-[#0b1428]/60 shadow-2xl">
              <MessageSquare className="w-14 h-14 text-indigo-400 mx-auto mb-4 opacity-40" />
              <h3 className="text-lg font-bold text-white">No messages found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {messages.length === 0 ? 'No portfolio inquiries received yet. Visitors submitting the contact form will appear here live!' : 'No messages match your search or filter.'}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`glass-card p-6 sm:p-7 rounded-3xl border transition-all duration-300 shadow-2xl ${
                    !msg.read
                      ? 'border-indigo-500/50 bg-[#0d1833] ring-1 ring-indigo-500/30'
                      : 'border-white/10 bg-[#091124]/80'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-lg shadow-md shrink-0">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-base font-bold text-white">{msg.name}</h4>
                          {!msg.read && (
                            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              Unread
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>{msg.email}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => copyToClipboard(msg.email, msg.id)}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                            title="Copy Email"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mr-2">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>

                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                          title="Mark as Read"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Mark Read</span>
                        </button>
                      )}

                      <button
                        onClick={() => openReplyModal(msg)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply (dev@emran.work)</span>
                      </button>

                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Card Content Box */}
                  <div className="space-y-2">
                    {msg.subject && (
                      <p className="text-xs font-bold text-slate-400">
                        Subject: <span className="text-white font-extrabold">{msg.subject}</span>
                      </p>
                    )}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
