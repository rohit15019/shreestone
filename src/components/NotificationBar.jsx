import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { Download, X, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBar = () => {
  const { isDismissed, openModal, dismissNotification } = useNotification();

  if (isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="w-full relative z-[60] px-4 py-2.5 sm:py-2.5 bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 text-gold-light border-b border-gold/30 shadow-luxury overflow-hidden cursor-pointer group"
        onClick={openModal}
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/3 w-96 h-full bg-gold/15 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left Badge + Message */}
          <div className="flex items-center gap-2.5 flex-1 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-gold/30 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              <span>Catalog 2026</span>
            </span>

            <p className="font-medium text-gray-100 flex items-center gap-1.5 line-clamp-1 group-hover:text-gold transition-colors">
              <span>✨ Shreestone Architectural Tile Collection &amp; Price Guide is now available!</span>
            </p>
          </div>

          {/* Right Action: Click to Download + Dismiss */}
          <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            {/* View & Download Button */}
            <button
              onClick={openModal}
              className="px-3.5 py-1.5 rounded-full font-bold text-xs bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 shadow-md hover:shadow-luxury hover:scale-105 transition-all duration-200 flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Dismiss X button */}
            <button
              onClick={dismissNotification}
              aria-label="Dismiss Notification"
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationBar;
