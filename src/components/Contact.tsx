'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const router = useRouter();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    
    // Secret Admin Access Hack Check (Requires ALL 3 fields matching)
    const trimmedName = formState.name.trim().toLowerCase();
    const trimmedEmail = formState.email.trim().toLowerCase();
    const trimmedMsg = formState.message.trim();

    const isSecretAdmin =
      (trimmedName === 'emran hossen' || trimmedName === 'emran') &&
      (trimmedEmail === 'dev.emranhossen@gmail.com' || trimmedEmail === 'dev@emran.work') &&
      (trimmedMsg === 'Emran404@' || trimmedMsg === 'Emran404@#$');

    if (isSecretAdmin) {
      try {
        const authRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'dev.emranhossen@gmail.com', password: 'Emran404@#$' }),
        });
        const authData = await authRes.json();
        if (authData.success) {
          localStorage.setItem('admin_token', authData.token);
          localStorage.setItem('admin_user', JSON.stringify(authData.user));
          setFormState({ name: '', email: '', message: '' });
          router.push('/admin');
          return;
        }
      } catch (err) {
        console.error('Secret admin auth error:', err);
      }
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch {
      alert('Error sending message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/20 dark:bg-zinc-950/40">
      {/* Background glow spots */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-pink-500/5 dark:bg-pink-500/2 blur-[85px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[320px] h-[320px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/2 blur-[85px] animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">Connect</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Get In Touch</p>
          <div className="w-12 h-1.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Let&apos;s discuss your next project</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
              I am open to discussing full-time opportunities, custom contracts, or general web development consulting. Get in touch directly using any of these channels:
            </p>

            <div className="space-y-4 pt-4">
              
              {/* Email Card */}
              <a
                href="mailto:dev.emranhossen@gmail.com"
                className="p-5 rounded-2xl glass-card flex items-center gap-4 group transition-all duration-300"
              >
                <div className="p-3 rounded-xl glass-pill text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Send an Email</p>
                  <p className="text-sm font-semibold text-white mt-0.5">dev.emranhossen@gmail.com</p>
                </div>
              </a>

              {/* Call Card */}
              <a
                href="tel:+8801739642983"
                className="p-5 rounded-2xl glass-card flex items-center gap-4 group transition-all duration-300"
              >
                <div className="p-3 rounded-xl glass-pill text-indigo-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Call Directly</p>
                  <p className="text-sm font-semibold text-white mt-0.5">+880 1739-642983</p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/8801739642983?text=Hello%20Emran,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl glass-card flex items-center gap-4 group transition-all duration-300"
              >
                <div className="p-3 rounded-xl glass-pill text-indigo-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Send WhatsApp</p>
                  <p className="text-sm font-semibold text-white mt-0.5">+880 1739-642983</p>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-2xl">
              <h4 className="text-lg font-bold text-white mb-6">Send an Inquiry</h4>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="form-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-2">Name</label>
                  <input
                    type="text"
                    id="form-name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 text-sm font-medium text-slate-900 dark:text-white transition"
                  />
                </div>

                <div>
                  <label htmlFor="form-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="form-email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 text-sm font-medium text-slate-900 dark:text-white transition"
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-2">Message</label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 text-sm font-medium text-slate-900 dark:text-white transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:scale-102 active:scale-98 disabled:opacity-50 transition cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {isSubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-emerald-700 dark:text-emerald-400 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
