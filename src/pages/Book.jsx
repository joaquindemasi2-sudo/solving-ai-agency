import { useState } from 'react';

const WEBHOOK_URL = 'https://formspree.io/f/mbdpwero';

const LABEL = "block font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] text-[#52525B] uppercase tracking-widest mb-3";
const INPUT = "w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors";
const SELECT = "w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 font-mono text-sm text-black focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer";
const CHECKBOX_GROUP = "flex flex-wrap gap-3";
const CHIP = (checked) =>
  `px-4 py-2 border font-mono text-xs uppercase tracking-widest cursor-pointer transition-all ${
    checked ? 'border-black bg-black/10 text-black' : 'border-black/10 text-[#52525B] hover:border-black/30'
  }`;

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    teamSize: '',
    painPoints: [],
    adminHours: '',
    budget: '',
    notes: '',
  });

  const industries = ['Painting', 'Construction', 'Roofing', 'Landscaping', 'Property Management', 'Plumbing/HVAC', 'Other'];
  const teamSizes = ['Just me', '2-5', '6-15', '16-50', '50+'];
  const painOptions = [
    'Following up on leads',
    'Scheduling jobs',
    'Responding to reviews',
    'Creating proposals/invoices',
    'Managing crew schedule',
    'Other',
  ];
  const adminOptions = ['Less than 5 hrs', '5-10 hrs', '10-20 hrs', '20+ hrs'];
  const budgetOptions = ['Under $500/mo', '$500-$1,000/mo', '$1,000-$2,500/mo', '$2,500+/mo', 'Not sure yet'];

  const togglePain = (p) => {
    setForm(f => ({
      ...f,
      painPoints: f.painPoints.includes(p)
        ? f.painPoints.filter(x => x !== p)
        : [...f.painPoints, p]
    }));
  };

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          painPoints: form.painPoints.join(', '),
          submittedAt: new Date().toISOString(),
          source: 'solving.ai/book',
        }),
      });

      if (!res.ok) throw new Error('Error en el envío');
      setSubmitted(true);
    } catch (err) {
      setError('Hubo un error. Intenta de nuevo o escríbenos directamente.');
      console.error('Webhook error:', err);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-[8rem] px-6 lg:px-12 flex flex-col items-center justify-center bg-white">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 border border-black/20 flex items-center justify-center mb-8 mx-auto">
            <iconify-icon icon="solar:check-read-linear" className="text-4xl text-black"></iconify-icon>
          </div>
          <h2 className="text-h3 text-black mb-4">We got your info.</h2>
          <p className="text-body mb-8">
            We'll review your submission and reach out within 24 hours to schedule your free discovery call.
          </p>
          <span className="font-mono text-[0.65rem] text-[#52525B] uppercase tracking-widest">Joaquin de Masi will be in touch</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-[8rem] px-6 lg:px-12 bg-white">
      <div className="w-full max-w-[100rem] mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[8rem] mb-[6rem]">
          <div className="lg:col-span-12">
            <div className="editorial-badge mb-[2rem]">CONTACT</div>
            <h1 className="text-h2 text-black mb-6">
              Work with us.
            </h1>
            <p className="text-body max-w-[36rem]">
              Tell us about your business and we'll reach out within 24 hours.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="border-t border-black/10">

            {/* Section 1: Contact Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[8rem] py-[4rem] border-b border-black/10">
              <div className="lg:col-span-4">
                <span className="font-mono text-[0.65rem] text-black uppercase tracking-widest">01</span>
                <h3 className="font-sans font-semibold text-lg text-black mt-2">Contact Info</h3>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={LABEL}>Full Name *</label>
                  <input required type="text" className={INPUT} placeholder="Joaquin de Masi"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL}>Email *</label>
                  <input required type="email" className={INPUT} placeholder="you@company.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL}>Phone Number</label>
                  <input type="tel" className={INPUT} placeholder="+1 (555) 000-0000"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL}>Company Name</label>
                  <input type="text" className={INPUT} placeholder="Your Business"
                    value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                </div>
              </div>
            </div>

            {/* Section 2: Your Business */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[8rem] py-[4rem] border-b border-black/10">
              <div className="lg:col-span-4">
                <span className="font-mono text-[0.65rem] text-black uppercase tracking-widest">02</span>
                <h3 className="font-sans font-semibold text-lg text-black mt-2">Your Business</h3>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <label className={LABEL}>Industry *</label>
                  <select required className={SELECT}
                    value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}>
                    <option value="" disabled>Select your industry</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className={LABEL}>Team Size</label>
                  <div className={CHECKBOX_GROUP}>
                    {teamSizes.map(s => (
                      <button type="button" key={s}
                        className={CHIP(form.teamSize === s)}
                        onClick={() => setForm(f => ({ ...f, teamSize: s }))}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Pain Points */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[8rem] py-[4rem] border-b border-black/10">
              <div className="lg:col-span-4">
                <span className="font-mono text-[0.65rem] text-black uppercase tracking-widest">03</span>
                <h3 className="font-sans font-semibold text-lg text-black mt-2">Pain Points</h3>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <label className={LABEL}>What's eating most of your time? *</label>
                  <div className={CHECKBOX_GROUP}>
                    {painOptions.map(p => (
                      <button type="button" key={p}
                        className={CHIP(form.painPoints.includes(p))}
                        onClick={() => togglePain(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Hours spent on admin per week</label>
                  <div className={CHECKBOX_GROUP}>
                    {adminOptions.map(a => (
                      <button type="button" key={a}
                        className={CHIP(form.adminHours === a)}
                        onClick={() => setForm(f => ({ ...f, adminHours: a }))}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Budget & Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[8rem] py-[4rem] border-b border-black/10">
              <div className="lg:col-span-4">
                <span className="font-mono text-[0.65rem] text-black uppercase tracking-widest">04</span>
                <h3 className="font-sans font-semibold text-lg text-black mt-2">Budget & Details</h3>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <label className={LABEL}>Monthly budget for automation</label>
                  <div className={CHECKBOX_GROUP}>
                    {budgetOptions.map(b => (
                      <button type="button" key={b}
                        className={CHIP(form.budget === b)}
                        onClick={() => setForm(f => ({ ...f, budget: b }))}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Anything we should know?</label>
                  <textarea rows="4" className={`${INPUT} resize-none`}
                    placeholder="e.g. We're currently using Jobber and QuickBooks, we need help with..."
                    value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-[4rem]">
            {error && (
              <p className="text-red-400 font-mono text-sm">{error}</p>
            )}
            {!error && <div></div>}
            <button
              type="submit"
              disabled={sending}
              className="bg-black text-white px-10 py-4 font-sans font-semibold text-sm hover:bg-black/90 transition-colors flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Submit Application'}
              {!sending && (
                <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
