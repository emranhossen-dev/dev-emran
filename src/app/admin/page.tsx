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
  Sparkle
} from 'lucide-react';
import SpaceBackground from '@/components/SpaceBackground';
import { MessageItem } from '@/lib/db';

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
    <>
      <SpaceBackground />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[9999] px-5 py-3 rounded-2xl bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 font-bold text-xs shadow-2xl border border-indigo-500/40 backdrop-blur-xl animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="min-h-screen p-4 sm:p-6 md:p-10 relative z-10 max-w-7xl mx-auto">
        
        {/* Top Header Card */}
        <header className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            
            {/* Title & Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    Messages <span className="text-gradient">Dashboard</span>
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                    <Database className="w-3 h-3" />
                    Supabase DB Live
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Welcome back, <strong className="text-slate-900 dark:text-white font-bold">{user?.name || 'Emran Hossen'}</strong> — Portfolio Contact Inbox
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <a
                href="/"
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View Portfolio</span>
              </a>

              <button
                onClick={fetchMessages}
                className="px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                title="Refresh Messages"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </header>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Inquiries</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{totalCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Unread Messages</p>
              <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">{unreadCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Processed / Read</p>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{totalCount - unreadCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Toolbar: Filter Tabs & Search Bar */}
        <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-white/10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by sender name, email, or message text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-inner"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {(['all', 'unread', 'read'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Messages' : tab === 'unread' ? `Unread (${unreadCount})` : 'Read Messages'}
              </button>
            ))}
          </div>

        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 shadow-xl">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-50" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No messages to display</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {messages.length === 0 ? 'No portfolio inquiries received yet. Form submissions will appear here live!' : 'No messages match your current filter or search criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`glass-card p-6 rounded-3xl border transition-all duration-300 shadow-xl ${
                  !msg.read
                    ? 'border-indigo-500/60 bg-indigo-50/40 dark:bg-indigo-950/30 ring-1 ring-indigo-500/30'
                    : 'border-slate-200/90 dark:border-white/10'
                }`}
              >
                {/* Message Header Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                  
                  {/* Sender Avatar & Contact */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-lg shadow-md shrink-0">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{msg.name}</h4>
                        {!msg.read && (
                          <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                            Unread
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>{msg.email}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => copyToClipboard(msg.email, msg.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                          title="Copy Email"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp & Action Toolbar */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mr-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>

                    {!msg.read && (
                      <button
                        onClick={() => handleMarkRead(msg.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                        title="Mark as Read"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Mark Read</span>
                      </button>
                    )}

                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </a>

                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 transition-all cursor-pointer"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Subject & Message Content Box */}
                <div className="space-y-2">
                  {msg.subject && (
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Subject: <span className="text-slate-900 dark:text-white font-extrabold">{msg.subject}</span>
                    </p>
                  )}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/80 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </>
  );
}
