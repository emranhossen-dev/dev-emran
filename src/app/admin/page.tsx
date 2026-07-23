'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Inbox, 
  Mail, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  Search, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Copy, 
  Check, 
  Globe, 
  X, 
  FileText, 
  SendHorizontal, 
  Plus, 
  ArrowLeft,
  Menu
} from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import { MessageItem } from '@/lib/db';

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mobile responsive view state: 'list' (Inbox list) vs 'detail' (Full Email Reading & Reply View)
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  // Gmail Docked Compose Box State
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
    } finally {
      setLoading(false);
    }
  }, [selectedMsgId]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

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
          setMobileView('list');
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
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white/95 text-slate-900 font-bold text-xs shadow-2xl border border-indigo-500/40 backdrop-blur-xl animate-fade-in flex items-center gap-2 max-w-[90vw]">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= GMAIL DOCKED / MOBILE COMPOSE BOX ================= */}
      {composeOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-0 sm:right-12 z-[9990] w-full sm:max-w-lg bg-[#0b1428] sm:rounded-t-2xl border-t sm:border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-slide-up max-h-[90vh]">
          <div className="bg-[#121f3f] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>New Message (dev@emran.work)</span>
            </h3>
            <button
              onClick={() => setComposeOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs bg-[#0b1428] overflow-y-auto">
            <input
              type="email"
              placeholder="To: recipient@example.com"
              value={composeTo}
              onChange={(e) => setComposeTo(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Subject"
              value={composeSubject}
              onChange={(e) => setComposeSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              rows={6}
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
              <span className="text-[10px] text-slate-400">dev@emran.work</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE SIDEBAR DRAWER OVERLAY ================= */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="w-72 bg-[#091124] border-r border-white/10 flex flex-col justify-between p-4 relative z-10 h-full">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white">Emran Admin</h2>
                    <p className="text-[10px] text-indigo-400 font-bold">dev@emran.work</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => {
                  setComposeOpen(true);
                  setMobileSidebarOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg flex items-center gap-3"
              >
                <Plus className="w-4 h-4" />
                <span>Compose Email</span>
              </button>

              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setActiveFolder('inbox');
                    setMobileSidebarOpen(false);
                    setMobileView('list');
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                    activeFolder === 'inbox' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Inbox className="w-4 h-4 text-indigo-400" />
                    <span>Inbox</span>
                  </div>
                  {inboxUnread > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black">
                      {inboxUnread}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('sent');
                    setMobileSidebarOpen(false);
                    setMobileView('list');
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                    activeFolder === 'sent' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <SendHorizontal className="w-4 h-4 text-emerald-400" />
                    <span>Sent Mails</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{sentCount}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('draft');
                    setMobileSidebarOpen(false);
                    setMobileView('list');
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                    activeFolder === 'draft' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Drafts</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{draftCount}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('all');
                    setMobileSidebarOpen(false);
                    setMobileView('list');
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                    activeFolder === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>All Mails</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{messages.length}</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href="/"
                className="w-full px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-medium flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>Open Main Portfolio</span>
              </a>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ================= DESKTOP FIXED SIDEBAR ================= */}
      <aside className="w-64 sm:w-72 bg-[#091124] border-r border-white/10 flex-col justify-between p-4 relative z-20 shrink-0 hidden md:flex h-screen sticky top-0">
        
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight text-white flex items-center gap-1">
                <span>Emran</span>
                <span className="text-indigo-400">Admin</span>
              </h2>
              <p className="text-[10px] text-indigo-400 font-bold">dev@emran.work</p>
            </div>
          </div>

          <button
            onClick={() => setComposeOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer"
          >
            <Plus className="w-5 h-5 text-amber-300" />
            <span>Compose Email</span>
          </button>

          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveFolder('inbox');
                setMobileView('list');
              }}
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
              onClick={() => {
                setActiveFolder('sent');
                setMobileView('list');
              }}
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
              onClick={() => {
                setActiveFolder('draft');
                setMobileView('list');
              }}
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
              onClick={() => {
                setActiveFolder('all');
                setMobileView('list');
              }}
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
        <header className="h-16 border-b border-white/10 bg-[#091124]/90 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="capitalize">{activeFolder}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold hidden sm:inline-block">
                🟢 Supabase &amp; Resend Connected
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <button
              onClick={() => setComposeOpen(true)}
              className="md:hidden p-2 rounded-xl bg-indigo-600 text-white"
              title="Compose"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ================= GMAIL SPLIT-PANE WORKSPACE ================= */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT EMAIL LIST COLUMN (VISIBLE ON DESKTOP & MOBILE WHEN mobileView === 'list') */}
          <div className={`w-full lg:w-[380px] xl:w-[420px] border-r border-white/10 flex-col bg-[#091124]/60 shrink-0 h-[calc(100vh-4rem)] ${mobileView === 'detail' ? 'hidden lg:flex' : 'flex'}`}>
            
            {/* Search Input */}
            <div className="p-3 border-b border-white/10 shrink-0">
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
                <div className="p-10 text-center text-slate-400 text-xs">
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
                        setMobileView('detail');
                      }}
                      className={`p-3.5 sm:p-4 transition-all duration-200 cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#122045] border-l-4 border-indigo-500 shadow-md'
                          : !msg.read && (msg.folder || 'inbox') === 'inbox'
                          ? 'bg-indigo-950/20 hover:bg-[#0e1936]'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="truncate">
                            <h4 className={`text-xs truncate ${!msg.read && (msg.folder || 'inbox') === 'inbox' ? 'font-black text-white' : 'font-semibold text-slate-300'}`}>
                              {msg.name}
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">{msg.email}</p>
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

                      <p className={`text-xs truncate pl-9 sm:pl-10 ${!msg.read && (msg.folder || 'inbox') === 'inbox' ? 'font-bold text-indigo-300' : 'text-slate-300'}`}>
                        {msg.subject || 'Portfolio Inquiry'}
                      </p>

                      <p className="text-[11px] text-slate-400 line-clamp-1 pl-9 sm:pl-10 mt-0.5 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* RIGHT EMAIL READING & INLINE REPLY PANE (VISIBLE ON DESKTOP & MOBILE WHEN mobileView === 'detail') */}
          <div className={`flex-1 bg-[#091124]/30 overflow-y-auto h-[calc(100vh-4rem)] ${mobileView === 'list' ? 'hidden lg:block' : 'block'}`}>
            {activeMsg ? (
              <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-5 animate-fade-in pb-20">
                
                {/* Mobile Back Button Bar */}
                <div className="lg:hidden flex items-center justify-between border-b border-white/10 pb-3">
                  <button
                    onClick={() => setMobileView('list')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-xs font-bold text-indigo-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Inbox</span>
                  </button>

                  <button
                    onClick={() => handleDelete(activeMsg.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* UNIFIED SEAMLESS EMAIL WORKSPACE */}
                <div className="space-y-5">
                  
                  {/* Top Subject Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                        {activeMsg.folder === 'sent' ? 'Sent Email' : 'Received Portfolio Email'}
                      </span>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white mt-1 leading-snug">
                        {activeMsg.subject || 'Portfolio Inquiry'}
                      </h2>
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-base sm:text-lg shadow-lg shrink-0">
                        {activeMsg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-white truncate">{activeMsg.name}</h3>
                          {!activeMsg.read && (activeMsg.folder || 'inbox') === 'inbox' && (
                            <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Unread
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <a
                            href={`mailto:${activeMsg.email}`}
                            className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1 truncate max-w-[220px] sm:max-w-none"
                          >
                            <span className="truncate">{activeMsg.email}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                          <button
                            onClick={() => copyToClipboard(activeMsg.email, activeMsg.id)}
                            className="text-slate-400 hover:text-white transition-colors p-1 shrink-0"
                            title="Copy Email"
                          >
                            {copiedId === activeMsg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5 pt-1 sm:pt-0">
                      <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{new Date(activeMsg.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* High Contrast Formatted Message Content Area */}
                  <div className="py-2">
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans border-l-2 border-indigo-500/40 pl-3 sm:pl-4 py-1">
                      {activeMsg.message}
                    </div>
                  </div>

                  {/* INTEGRATED GMAIL INLINE EMAIL REPLY WORKSPACE */}
                  <div className="pt-4 sm:pt-6 border-t border-white/10 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
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
                      className="w-full p-3.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed shadow-inner"
                    />

                    <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
                      <button
                        onClick={handleSendInlineReply}
                        disabled={sendingReply || !replyText.trim()}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
              <div className="h-full flex items-center justify-center text-center p-8">
                <div>
                  <Inbox className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-40 animate-pulse" />
                  <h3 className="text-base font-bold text-white">Select an Email</h3>
                  <p className="text-xs text-slate-400 mt-1">Choose an email from the list to view details or send replies</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
