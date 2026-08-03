import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { Download, X, FileText, CheckCircle2, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CatalogDownloadModal = () => {
  const { isModalOpen, closeModal, downloadFile, isDownloaded } = useNotification();

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg glass-card rounded-2xl border border-gold/30 shadow-2xl overflow-hidden bg-charcoal-950 text-white p-6 sm:p-8 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Icon & Title */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-amber via-gold to-gold-light flex items-center justify-center shadow-luxury">
              <FileText className="w-7 h-7 text-charcoal-950" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-wider border border-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Release</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              2026 Shreestone Tile Catalog
            </h2>
            <p className="text-sm text-gray-300">
              Complete architectural tile specifications, sintered marble finishes, and direct factory sq.ft price matrix.
            </p>
          </div>

          {/* Catalog Feature Highlights */}
          <div className="p-4 rounded-xl bg-charcoal-900/80 border border-charcoal-800 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Full Sintered Marble &amp; Granite Matrix</h4>
                <p className="text-xs text-gray-400">Includes 1200x2400mm slabs, polished mirror glazes, and anti-slip R11 outdoor pavers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Project Pricing &amp; ISO 13006 Certifications</h4>
                <p className="text-xs text-gray-400">Complete technical specs for architects, interior designers, and commercial builders.</p>
              </div>
            </div>
          </div>

          {/* Single Download File Action Button */}
          <div className="pt-2">
            <button
              onClick={downloadFile}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-base shadow-luxury hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isDownloaded ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-charcoal-950" />
                  <span>Catalog Downloaded Successfully!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download 2026 Catalog &amp; Price Guide</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              File: <span className="font-mono text-gold-light">Shreestone_2026_Luxury_Tiles_Catalog.txt</span> • Instant Direct Download
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CatalogDownloadModal;
