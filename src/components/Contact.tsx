'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';
import ScrollReveal from '@/components/ScrollReveal';

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
        console.error('Secret admin auth bypass error:', err);
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
        
        // Premium SweetAlert Popup Notification
        Swal.fire({
          title: 'Thank You!',
          text: 'Thank you for your message! I will respond to your inquiry as soon as possible.',
          icon: 'success',
          confirmButtonText: 'Awesome!',
          confirmButtonColor: '#6366f1',
          background: '#0b1426',
          color: '#ffffff',
          customClass: {
            popup: 'glass-card border border-white/20 rounded-3xl shadow-2xl backdrop-blur-2xl',
            title: 'text-2xl font-black text-white',
            htmlContainer: 'text-slate-300 text-sm font-medium leading-relaxed',
            confirmButton: 'px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/40 text-xs'
          }
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch {
      alert('Error connecting to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/20 dark:bg-zinc-950/40">
      {/* Background glow spots */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-pink-500/5 dark:bg-pink-500/2 blur-[85px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[320px] h-[320px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/2 blur-[85px] animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">Connect</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Get In Touch</p>
            <div className="w-12 h-1.5 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-4 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Contact Details: Slides from LEFT */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal variant="fade-left">
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Let&apos;s discuss your next project</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
                I am open to discussing full-time opportunities, custom contracts, or general web development consulting. Get in touch directly using any of these channels:
              </p>

              <div className="space-y-4 pt-4">
                
                {/* Email Card */}
                <a
                  href="mailto:dev@emran.work"
                  className="p-5 rounded-2xl glass-card flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="p-3 rounded-xl glass-pill text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Send an Email</p>
                    <p className="text-sm font-semibold text-white mt-0.5">dev@emran.work</p>
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
                  <div className="p-3 rounded-xl glass-pill text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">WhatsApp</p>
                    <p className="text-sm font-semibold text-white mt-0.5">+880 1739-642983</p>
                  </div>
                </a>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Contact Form: Slides from RIGHT */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-right">
              <div className="p-8 sm:p-10 rounded-3xl glass-card relative">
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">Message Delivered!</h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto">
                      Thank you for reaching out! I have received your message and will respond to your email as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your project, timeline, or requirements..."
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
