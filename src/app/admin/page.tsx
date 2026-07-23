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
  X,
  ChevronRight,
  User
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
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Email Reply Modal State
  const [replyModalOpen, setReplyModalOpen] = useState(false);
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
        if (data.messages.length > 0 && !selectedMsgId) {
          setSelectedMsgId(data.messages[0].id);
        }
      }
    } catch {
      showToast('⚠️ Failed to refresh messages');
    } finally {
      setLoading(false);
    }
  }, [selectedMsgId]);

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
        if (selectedMsgId === id) {
          const remaining = messages.filter((m) => m.id !== id);
          setSelectedMsgId(remaining.length > 0 ? remaining[0].id : null);
        }
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

  const activeMsg = messages.find((m) => m.id === selectedMsgId) || messages[0] || null;

  const openReplyModal = (msg: MessageItem) => {
    setSelectedMsgId(msg.id);
    setReplySubject(`Re: ${msg.subject || 'Portfolio Inquiry'}`);
    setReplyBody(`Hi ${msg.name},\n\nThank you for reaching out through my portfolio website! I would be delighted to work with you.\n\nBest regards,\nEmran Hossen`);
    setReplyModalOpen(true);
  };

  const sendResendEmail = async () => {
    if (!activeMsg || !replyBody) return;
    setSendingEmail(true);

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: activeMsg.id,
          toEmail: activeMsg.email,
          toName: activeMsg.name,
          subject: replySubject,
          replyText: replyBody,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`✉️ Email reply sent to ${activeMsg.email} from dev@emran.work!`);
        setMessages((prev) =>
          prev.map((m) => (m.id === activeMsg.id ? { ...m, read: true } : m))
        );
        setReplyModalOpen(false);
      } else {
        showToast(`❌ Failed: ${data.error || 'Check Resend domain configuration'}`);
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
    <div className="h-screen w-full bg-[#070d1e] text-slate-100 flex relative overflow-hidden font-sans">
      <SpaceBackground />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[9999] px-5 py-3.5 rounded-2xl bg-white/95 text-slate-900 font-bold text-xs shadow-2xl border border-indigo-500/40 backdrop-blur-xl animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= RESEND EMAIL REPLY MODAL ================= */}
      {replyModalOpen && activeMsg && (
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
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
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
                  value={`${activeMsg.name} <${activeMsg.email}>`}
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
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer"
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

      {/* ================= FIXED SIDEBAR ================= */}
      <aside className="w-64 sm:w-72 bg-[#091124] border-r border-white/10 flex flex-col justify-between p-5 relative z-20 shrink-0 hidden md:flex h-screen sticky top-0">
        
        <div className="space-y-8">
          {/* Sidebar Brand Header */}
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>Emran</span>
                <span className="text-indigo-400">Admin</span>
              </h2>
              <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold">dev@emran.work</p>
            </div>
          </div>

          {/* Sidebar Navigation */}
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

        {/* Sidebar Footer Info */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <a
            href="/"
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Open Main Portfolio</span>
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
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* ================= MAIN WORKSPACE CONTAINER ================= */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative z-10 overflow-hidden">
        
        {/* FIXED TOP NAVBAR */}
        <header className="h-16 border-b border-white/10 bg-[#091124]/90 backdrop-blur-2xl px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Inbox Communications</span>
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
              <span className="hidden sm:inline">Refresh Inbox</span>
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

        {/* ================= GMAIL / LINEAR STYLE SPLIT INBOX BODY ================= */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT LIST COLUMN (LINE-WISE EMAIL ROWS) */}
          <div className="w-full lg:w-[420px] border-r border-white/10 flex flex-col bg-[#091124]/60 shrink-0 h-[calc(100vh-4rem)]">
            
            {/* List Filter Toolbar */}
            <div className="p-3.5 border-b border-white/10 space-y-3 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search sender, email, or message..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1.5 justify-between">
                {(['all', 'unread', 'read'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer text-center ${
                      filter === tab
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab === 'unread' ? `Unread (${unreadCount})` : 'Read'}
                  </button>
                ))}
              </div>
            </div>

            {/* Line-wise Email Rows Stream */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {filteredMessages.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-xs">
                  <Inbox className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                  <p>No messages match criteria</p>
                </div>
              ) : (
                filteredMessages.map((msg) => {
                  const isSelected = msg.id === (activeMsg?.id || '');
                  return (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMsgId(msg.id);
                        if (!msg.read) handleMarkRead(msg.id);
                      }}
                      className={`p-4 transition-all duration-200 cursor-pointer relative group ${
                        isSelected
                          ? 'bg-[#122045] border-l-4 border-indigo-500 shadow-md'
                          : !msg.read
                          ? 'bg-indigo-950/20 hover:bg-[#0e1936]'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="truncate">
                            <h4 className={`text-xs truncate ${!msg.read ? 'font-black text-white' : 'font-semibold text-slate-300'}`}>
                              {msg.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate">{msg.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {!msg.read && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      <p className={`text-xs truncate pl-10 ${!msg.read ? 'font-bold text-indigo-300' : 'text-slate-300'}`}>
                        {msg.subject || 'Portfolio Inquiry'}
                      </p>

                      <p className="text-[11px] text-slate-400 line-clamp-1 pl-10 mt-0.5 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* RIGHT EMAIL DETAIL PANE */}
          <div className="flex-1 bg-[#070d1e] overflow-y-auto p-6 lg:p-10 h-[calc(100vh-4rem)]">
            {activeMsg ? (
              <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                
                {/* Email Subject Title & Toolbar */}
                <div className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0b1428]/80 shadow-2xl space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Portfolio Inquiry</span>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {activeMsg.subject || 'Portfolio Inquiry'}
                      </h2>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => openReplyModal(activeMsg)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply (dev@emran.work)</span>
                      </button>

                      <button
                        onClick={() => handleDelete(activeMsg.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sender Profile Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-lg shadow-lg shrink-0">
                        {activeMsg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{activeMsg.name}</h3>
                          {!activeMsg.read && (
                            <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Unread
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`mailto:${activeMsg.email}`}
                            className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>{activeMsg.email}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => copyToClipboard(activeMsg.email, activeMsg.id)}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                            title="Copy Email"
                          >
                            {copiedId === activeMsg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{new Date(activeMsg.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                </div>

                {/* Formatted Message Body Paper Container */}
                <div className="glass-card p-7 sm:p-8 rounded-3xl border border-white/10 bg-[#0b1428]/90 shadow-2xl space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
                    Message Content
                  </p>
                  <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {activeMsg.message}
                  </div>
                </div>

                {/* Quick Reply Button Bottom Bar */}
                <div className="pt-2">
                  <button
                    onClick={() => openReplyModal(activeMsg)}
                    className="w-full py-4 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>Click to Write &amp; Send Reply Email from dev@emran.work</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-12">
                <div>
                  <Inbox className="w-16 h-16 text-indigo-400 mx-auto mb-4 opacity-40 animate-pulse" />
                  <h3 className="text-lg font-bold text-white">Select a Message</h3>
                  <p className="text-xs text-slate-400 mt-1">Choose an email from the left inbox list to view details</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
