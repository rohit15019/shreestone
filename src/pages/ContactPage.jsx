import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Sparkles, HelpCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Villa',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const faqs = [
    {
      q: "Can I order custom sample cutouts before confirming a villa project?",
      a: "Yes. Architects and interior designers can request 300×300 mm physical sample swatches of our Statuario, Armani Gris, and Carving collections. Samples are dispatched via express air courier within 24 hours."
    },
    {
      q: "What is the difference between Polished PGVT and Carving Glazed Vitrified slabs?",
      a: "Polished Glazed Vitrified Tiles (PGVT) offer a high-gloss, mirror-like reflectivity ideal for luxury living rooms and foyers. Carving slabs feature delicate 3D relief texture engraved into the veins, offering an authentic sculpted stone feel and subtle matte-satin sheen."
    },
    {
      q: "Do you offer direct site delivery across India?",
      a: "Yes. We ship across India using reinforced wooden pallet crates with edge-protection foam, guaranteeing zero transit breakage."
    },
    {
      q: "Are special trade discounts available for architects and builders?",
      a: "We offer tiered trade discounts for registered architects, interior designers, and developers on project quantities exceeding 1,000 sq.ft. Speak with our showroom concierge for trade terms."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-marble-light dark:bg-charcoal-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
            Showroom Concierge
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-charcoal-900 dark:text-white">
            Visit Our Flagship Studio
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Schedule a private architectural consultation or request sample swatches for your upcoming residential or commercial project.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Left Column: Contact Cards & Showroom Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-gray-200/80 dark:border-charcoal-700 shadow-card space-y-6">
              <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white border-b border-gray-100 dark:border-charcoal-700 pb-4">
                Showroom Information
              </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gold/15 text-gold flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-900 dark:text-white">Flagship Experience Center</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    Shreestone Studio, Worli Sea Face, Mumbai, Maharashtra - 400030
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gold/15 text-gold flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-900 dark:text-white">Direct Line & WhatsApp</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    +91 98200 44520 / 022-2490-8800
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gold/15 text-gold flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-900 dark:text-white">Architect Trade Enquiries</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    luxury@shreestone.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gold/15 text-gold flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-900 dark:text-white">Showroom Timings</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    Monday – Saturday: 10:00 AM – 7:30 PM <br />
                    Sunday: By Private Architect Appointment
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Support Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-charcoal-900 to-charcoal-950 text-white border border-charcoal-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gold uppercase block">Instant Connect</span>
                <h4 className="font-display font-bold text-lg">WhatsApp Concierge</h4>
                <p className="text-xs text-gray-400 mt-0.5">Response within 15 minutes</p>
              </div>
              <a
                href="https://wa.me/919820044520"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gold text-charcoal-950 font-bold text-xs hover:scale-105 transition-transform flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact & Sample Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-charcoal-800 border border-gray-200/80 dark:border-charcoal-700 shadow-card">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-charcoal-900 dark:text-white">
                    Consultation Request Confirmed
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-charcoal-900 dark:text-white">{formData.name}</strong>. Our showroom manager has received your message regarding your <strong className="text-gold">{formData.projectType}</strong> project and will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm hover:scale-105 transition-transform"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                      Request Quote or Physical Samples
                    </span>
                    <h3 className="font-display font-bold text-2xl text-charcoal-900 dark:text-white">
                      Send a Message to Our Studio
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                        Your Name / Studio Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ar. Rohit Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="studio@architecture.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                        Project Category
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                      >
                        <option value="Residential Villa">Residential Villa / Penthouse</option>
                        <option value="Commercial Office">Commercial Office / Lobby</option>
                        <option value="Hospitality / Hotel">Hospitality / Boutique Hotel</option>
                        <option value="Architect Trade Partnership">Architect Trade Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                      Project Details / Slabs Required
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please mention area size, preferred finish (e.g., 800×1600 Statuario Glossy), or sample delivery address..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-md hover:shadow-luxury hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
              Architectural FAQ
            </span>
            <h2 className="text-3xl font-display font-bold text-charcoal-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-charcoal-800 border border-gray-200/80 dark:border-charcoal-700 shadow-card"
              >
                <h4 className="font-display font-bold text-base text-charcoal-900 dark:text-white flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
