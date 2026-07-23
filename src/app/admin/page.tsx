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
  Globe,
  Send,
  X,
  FileText,
  SendHorizontal,
  Plus,
  Bell,
  CheckCheck
} from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import { MessageItem } from '@/lib/db';

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Gmail Sidebar Category Navigation
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'sent' | 'draft' | 'all'>('inbox');
  const [search, setSearch] = useState('');
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Gmail Inline Reply Box State
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Gmail Docked Bottom-Right Compose Box State
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sendingCompose, setSendingCompose] = useState(false);

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
      showToast('⚠️ Failed to refresh emails');
    } font-sans
    finally {
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
    if (!confirm('Are you sure you want to delete this email?')) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMsgId === id) {
          const remaining = messages.filter((m) => m.id !== id);
          setSelectedMsgId(remaining.length > 0 ? remaining[0].id : null);
        }
        showToast('🗑️ Email deleted');
      }
    } catch {
      showToast('❌ Error deleting email');
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

  // Filter messages by folder and search term
  const filteredMessages = messages.filter((m) => {
    const folderMatch =
      activeFolder === 'all'
        ? true
        : activeFolder === 'sent'
        ? m.folder === 'sent'
        : activeFolder === 'draft'
        ? m.folder === 'draft'
        : (m.folder || 'inbox') === 'inbox';

    const searchMatch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject && m.subject.toLowerCase().includes(search.toLowerCase()));

    return folderMatch && searchMatch;
  });

  const activeMsg = messages.find((m) => m.id === selectedMsgId) || filteredMessages[0] || null;

  useEffect(() => {
    if (activeMsg) {
      setReplyText(`Hi ${activeMsg.name},\n\nThank you for reaching out through my portfolio website! I would be delighted to work with you.\n\nBest regards,\nEmran Hossen`);
    }
  }, [activeMsg]);

  // Send Inline Reply via Resend API
  const handleSendInlineReply = async () => {
    if (!activeMsg || !replyText.trim()) return;
    setSendingReply(true);

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: activeMsg.id,
          toEmail: activeMsg.email,
          toName: activeMsg.name,
          subject: `Re: ${activeMsg.subject || 'Portfolio Inquiry'}`,
          replyText,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`✉️ Sent email reply to ${activeMsg.email} from dev@emran.work!`);
        fetchMessages();
      } else {
        showToast(`❌ Failed: ${data.error || 'Check Resend domain setup'}`);
      }
    } catch {
      showToast('❌ Error sending email reply');
    } finally {
      setSendingReply(false);
    }
  };

  // Send Docked New Email via Resend API
  const handleSendComposeEmail = async () => {
    if (!composeTo.trim() || !composeBody.trim()) return;
    setSendingCompose(true);

    try {
      const res = await fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: composeTo,
          toName: composeTo.split('@')[0],
          subject: composeSubject || 'Portfolio Message from Emran Hossen',
          replyText: composeBody,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`✉️ Email sent to ${composeTo} from dev@emran.work!`);
        setComposeTo('');
        setComposeSubject('');
        setComposeBody('');
        setComposeOpen(false);
        fetchMessages();
      } else {
        showToast(`❌ Failed: ${data.error || 'Check Resend API key'}`);
      }
    } catch {
      showToast('❌ Error sending email');
    } finally {
      setSendingCompose(false);
    }
  };

  // Counts
  const inboxUnread = messages.filter((m) => (m.folder || 'inbox') === 'inbox' && !m.read).length;
  const sentCount = messages.filter((m) => m.folder === 'sent').length;
  const draftCount = messages.filter((m) => m.folder === 'draft').length;

  return (
    <div className="h-screen w-full bg-[#070d1e] text-slate-100 flex relative overflow-hidden font-sans">
      <SpaceBackground />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[9999] px-5 py-3.5 rounded-2xl bg-white/95 text-slate-900 font-bold text-xs shadow-2xl border border-indigo-500/40 backdrop-blur-xl animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= GMAIL DOCKED BOTTOM-RIGHT COMPOSE BOX ================= */}
      {composeOpen && (
        <div className="fixed bottom-0 right-6 sm:right-12 z-[9990] w-full max-w-lg bg-[#0b1428] rounded-t-2xl border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-[#121f3f] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>New Message (from dev@emran.work)</span>
            </h3>
            <button
              onClick={() => setComposeOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs bg-[#0b1428]">
            <input
              type="email"
              placeholder="To: recipient@example.com"
              value={composeTo}
              onChange={(e) => setComposeTo(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Subject"
              value={composeSubject}
              onChange={(e) => setComposeSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              rows={7}
              placeholder="Write your email here..."
              value={composeBody}
              onChange={(e) => setComposeBody(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleSendComposeEmail}
                disabled={sendingCompose}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {sendingCompose ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <SendHorizontal className="w-4 h-4" />
                    <span>Send Email</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-slate-400">Resend API • dev@emran.work</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= FIXED GMAIL SIDEBAR ================= */}
      <aside className="w-64 sm:w-72 bg-[#091124] border-r border-white/10 flex flex-col justify-between p-4 relative z-20 shrink-0 hidden md:flex h-screen sticky top-0">
        
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight text-white flex items-center gap-1">
                <span>Emran</span>
                <span className="text-indigo-400">Gmail OS</span>
              </h2>
              <p className="text-[10px] text-indigo-400 font-bold">dev@emran.work</p>
            </div>
          </div>

          {/* "+ Compose" Button */}
          <button
            onClick={() => setComposeOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer"
          >
            <Plus className="w-5 h-5 text-amber-300" />
            <span>Compose Email</span>
          </button>

          {/* Gmail Sidebar Folder Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveFolder('inbox')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeFolder === 'inbox'
                  ? 'bg-indigo-600/90 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4 text-indigo-400" />
                <span>Inbox</span>
              </div>
              {inboxUnread > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black animate-pulse">
                  {inboxUnread}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveFolder('sent')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeFolder === 'sent'
                  ? 'bg-indigo-600/90 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <SendHorizontal className="w-4 h-4 text-emerald-400" />
                <span>Sent Mails</span>
              </div>
              {sentCount > 0 && (
                <span className="text-[10px] text-slate-400 font-bold">{sentCount}</span>
              )}
            </button>

            <button
              onClick={() => setActiveFolder('draft')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeFolder === 'draft'
                  ? 'bg-indigo-600/90 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Drafts</span>
              </div>
              {draftCount > 0 && (
                <span className="text-[10px] text-slate-400 font-bold">{draftCount}</span>
              )}
            </button>

            <button
              onClick={() => setActiveFolder('all')}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                activeFolder === 'all'
                  ? 'bg-indigo-600/90 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>All Mails</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">{messages.length}</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <a
            href="/"
            className="w-full px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Open Main Portfolio</span>
          </a>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs border border-indigo-500/30 shrink-0">
                EH
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Emran Hossen'}</p>
                <p className="text-[10px] text-indigo-400 font-semibold truncate">dev@emran.work</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span className="capitalize">{activeFolder} Workspace</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold hidden sm:inline-block">
                🟢 Supabase &amp; Resend API Connected
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMessages}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Emails</span>
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

        {/* ================= GMAIL SPLIT-PANE WORKSPACE ================= */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT EMAIL LIST COLUMN (LINE-WISE EMAIL ROWS) */}
          <div className="w-full lg:w-[400px] xl:w-[440px] border-r border-white/10 flex flex-col bg-[#091124]/60 shrink-0 h-[calc(100vh-4rem)]">
            
            {/* Search Input */}
            <div className="p-3.5 border-b border-white/10 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search in ${activeFolder}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Line-wise Email List Stream */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {filteredMessages.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  <Inbox className="w-8 h-8 text-indigo-400 mx-auto mb-2 opacity-50" />
                  <p>No emails in {activeFolder}</p>
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
                      className={`p-4 transition-all duration-200 cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#122045] border-l-4 border-indigo-500 shadow-md'
                          : !msg.read && (msg.folder || 'inbox') === 'inbox'
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
                            <h4 className={`text-xs truncate ${!msg.read && (msg.folder || 'inbox') === 'inbox' ? 'font-black text-white' : 'font-semibold text-slate-300'}`}>
                              {msg.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate">{msg.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {!msg.read && (msg.folder || 'inbox') === 'inbox' && (
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          )}
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      <p className={`text-xs truncate pl-10 ${!msg.read && (msg.folder || 'inbox') === 'inbox' ? 'font-bold text-indigo-300' : 'text-slate-300'}`}>
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

          {/* RIGHT EMAIL READING PAPER & INLINE EMBEDDED REPLY WORKSPACE */}
          <div className="flex-1 bg-[#070d1e] overflow-y-auto p-6 lg:p-10 h-[calc(100vh-4rem)]">
            {activeMsg ? (
              <div className="max-w-4xl mx-auto animate-fade-in pb-16">
                
                {/* UNIFIED GMAIL ELEGANT READING PAPER CARD */}
                <div className="glass-card rounded-3xl border border-white/10 bg-[#091124] shadow-2xl p-6 sm:p-8 space-y-6">
                  
                  {/* Top Subject Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                        {activeMsg.folder === 'sent' ? 'Sent Email' : 'Received Portfolio Email'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                        {activeMsg.subject || 'Portfolio Inquiry'}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(activeMsg.id)}
                        className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Delete Email"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Sender Profile Details Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-lg shadow-lg shrink-0">
                        {activeMsg.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{activeMsg.name}</h3>
                          {!activeMsg.read && (activeMsg.folder || 'inbox') === 'inbox' && (
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

                  {/* High Contrast Formatted Message Content Area */}
                  <div className="py-2">
                    <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans border-l-2 border-indigo-500/40 pl-4 py-1">
                      {activeMsg.message}
                    </div>
                  </div>

                  {/* INTEGRATED GMAIL INLINE EMAIL REPLY WORKSPACE */}
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <SendHorizontal className="w-4 h-4 text-indigo-400" />
                        <span>Reply from: <span className="text-indigo-400 font-extrabold">dev@emran.work</span></span>
                      </div>
                      <span className="text-[10px] text-slate-400">Resend API Connected</span>
                    </div>

                    <textarea
                      rows={5}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Write your email reply to ${activeMsg.name}...`}
                      className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed shadow-inner"
                    />

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={handleSendInlineReply}
                        disabled={sendingReply || !replyText.trim()}
                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {sendingReply ? (
                          <span>Sending via Resend...</span>
                        ) : (
                          <>
                            <SendHorizontal className="w-4 h-4" />
                            <span>Send Email Reply</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] text-slate-400">Direct Delivery to {activeMsg.email}</span>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-12">
                <div>
                  <Inbox className="w-16 h-16 text-indigo-400 mx-auto mb-4 opacity-40 animate-pulse" />
                  <h3 className="text-lg font-bold text-white">Select an Email</h3>
                  <p className="text-xs text-slate-400 mt-1">Choose an email from the left list to view details or send replies</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
