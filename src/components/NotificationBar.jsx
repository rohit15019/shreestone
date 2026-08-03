import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { Download, X, ShieldAlert, Sparkles, FileText, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBar = () => {
  const {
    notification,
    isDismissed,
    dismissNotification,
    openAdminModal,
    downloadFile,
  } = useNotification();

  if (!notification || !notification.isActive || isDismissed) {
    return null;
  }

  const getThemeStyles = () => {
    switch (notification.styleTheme) {
      case 'obsidian':
        return 'bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 text-gray-100 border-b border-charcoal-800';
      case 'emerald':
        return 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-100 border-b border-emerald-700/40';
      case 'sapphire':
        return 'bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-blue-100 border-b border-blue-700/40';
      case 'gold':
      default:
        return 'bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 text-gold-light border-b border-gold/30 shadow-luxury';
    }
  };

  const getButtonStyles = () => {
    switch (notification.styleTheme) {
      case 'obsidian':
        return 'bg-white text-charcoal-950 hover:bg-gray-200';
      case 'emerald':
        return 'bg-emerald-400 text-charcoal-950 hover:bg-emerald-300';
      case 'sapphire':
        return 'bg-blue-400 text-charcoal-950 hover:bg-blue-300';
      case 'gold':
      default:
        return 'bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 hover:shadow-luxury hover:scale-105';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`w-full relative z-[60] px-4 py-2.5 sm:py-2 ${getThemeStyles()} overflow-hidden`}
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-full bg-gold/10 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left / Center Message */}
          <div className="flex items-center gap-2.5 text-center sm:text-left flex-1 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-gold/30 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
              <span>Announcement</span>
            </span>

            <p className="font-medium text-gray-200 dark:text-gray-100 flex items-center gap-1.5 line-clamp-2 sm:line-clamp-1">
              {notification.message}
            </p>
          </div>

          {/* Right Action Controls: Download File + Admin Open + Dismiss */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Download File Button */}
            <button
              onClick={downloadFile}
              className={`px-3.5 py-1.5 rounded-full font-bold text-xs shadow-md transition-all duration-200 flex items-center gap-1.5 group cursor-pointer ${getButtonStyles()}`}
            >
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              <span>{notification.fileLabel || 'Download File'}</span>
            </button>

            {/* Admin Broadcast Center Button */}
            <button
              onClick={openAdminModal}
              title="Admin Broadcast & Upload Center"
              className="px-2.5 py-1.5 rounded-full bg-charcoal-800/80 hover:bg-charcoal-700 text-gold-light border border-gold/20 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-gold" />
              <span className="hidden md:inline">Admin Panel</span>
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
