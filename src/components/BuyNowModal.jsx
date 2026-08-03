import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, ShieldCheck, Phone, MapPin, Calculator, Sparkles } from 'lucide-react';

const BuyNowModal = ({ tile, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: '',
    state: '',
    deliveryAddress: '',
    quantityRequired: '1000',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !tile) return null;

  const pricePerSqFt = tile.pricePerSqFt || 150;
  const estimatedCost = (Number(formData.quantityRequired) || 0) * pricePerSqFt;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Frontend simulation of inquiry submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-charcoal-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-charcoal-700 max-w-2xl w-full shadow-2xl relative my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-charcoal-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-charcoal-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-gold/10 to-transparent pointer-events-none" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-1">
                Concierge Quote Service
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold">
                Inquire • {tile.name}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {tile.size} • {tile.finish} • ₹{pricePerSqFt} per sq.ft
              </p>
            </div>
            <button
              onClick={resetAndClose}
              aria-label="Close modal"
              className="p-2 rounded-full bg-charcoal-800 text-gray-400 hover:text-white hover:bg-charcoal-700 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-2xl text-charcoal-900 dark:text-white">
                  Inquiry Received
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-charcoal-900 dark:text-white">{formData.fullName || 'Architect'}</strong>. Your quote request for <strong>{tile.name} ({formData.quantityRequired} sq.ft)</strong> has been logged. Our showroom consultant will reach out via WhatsApp/Phone within 30 minutes.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetAndClose}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-md hover:scale-105 transition-transform"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cost Calculator Banner */}
                <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gold/20 text-gold-dark dark:text-gold">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-charcoal-900 dark:text-gray-200 block">
                        Estimated Material Cost
                      </span>
                      <span className="text-[11px] text-gray-600 dark:text-gray-400">
                        Based on {formData.quantityRequired || 0} sq.ft × ₹{pricePerSqFt}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-charcoal-900 dark:text-white">
                      ₹{estimatedCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ar. Rohit Sharma / Client Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rohit@architecturestudio.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                      Req. Area (sq.ft) *
                    </label>
                    <input
                      type="number"
                      name="quantityRequired"
                      required
                      min="10"
                      value={formData.quantityRequired}
                      onChange={handleChange}
                      placeholder="1000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white text-sm font-bold focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                      City / Showroom Location *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Mumbai / Delhi / Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                      Project Type
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Residential Villa / Commercial"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-gray-300 uppercase mb-1">
                    Special Instructions / Waterjet Customization
                  </label>
                  <textarea
                    name="additionalNotes"
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="E.g., Require book-matched veining or express delivery..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-charcoal-900 dark:text-white text-sm focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-md hover:shadow-luxury hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BuyNowModal;
