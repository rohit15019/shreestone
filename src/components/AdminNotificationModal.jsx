import React, { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import { X, Shield, Upload, FileText, Check, Sparkles, Send, Bell, Palette, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_MESSAGES = [
  {
    label: '2026 Catalog Release',
    message: '💎 NEW 2026 RELEASE: Shreestone Architectural Tile Catalog & Technical Price Matrix is now available!',
    fileLabel: 'Download Catalog (PDF/Spec)',
    fileName: 'Shreestone_Luxury_Tiles_Catalog_2026.txt',
    styleTheme: 'gold',
  },
  {
    label: 'Festival Contractor Offer',
    message: '⚡ FESTIVAL OFFER: Download our Exclusive 25% Off Contractor & Builder Brochure!',
    fileLabel: 'Download Offer Brochure',
    fileName: 'Shreestone_Festival_Offer_Brochure.txt',
    styleTheme: 'emerald',
  },
  {
    label: 'Marble Installation Guide',
    message: '🏛️ MARBLE MASTERCLASS: Download our Sintered Marble Installation & Specification Guide!',
    fileLabel: 'Download Spec Guide',
    fileName: 'Shreestone_Installation_Guide.txt',
    styleTheme: 'obsidian',
  },
];

const THEME_OPTIONS = [
  { id: 'gold', name: 'Imperial Gold & Charcoal', color: 'from-gold-amber to-gold' },
  { id: 'obsidian', name: 'Deep Obsidian Slate', color: 'from-charcoal-900 to-charcoal-700' },
  { id: 'emerald', name: 'Royal Emerald Jewel', color: 'from-emerald-700 to-emerald-500' },
  { id: 'sapphire', name: 'Sapphire Crystal Blue', color: 'from-blue-700 to-blue-500' },
];

const AdminNotificationModal = () => {
  const {
    notification,
    isAdminModalOpen,
    closeAdminModal,
    broadcastNotification,
  } = useNotification();

  const [message, setMessage] = useState('');
  const [fileLabel, setFileLabel] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileType, setFileType] = useState('text/plain');
  const [styleTheme, setStyleTheme] = useState('gold');
  const [isActive, setIsActive] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (notification && isAdminModalOpen) {
      setMessage(notification.message || '');
      setFileLabel(notification.fileLabel || 'Download File');
      setFileName(notification.fileName || 'Shreestone_Catalog.txt');
      setFileContent(notification.fileContent || '');
      setFileType(notification.fileType || 'text/plain');
      setStyleTheme(notification.styleTheme || 'gold');
      setIsActive(notification.isActive !== undefined ? notification.isActive : true);
    }
  }, [notification, isAdminModalOpen]);

  if (!isAdminModalOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileType(file.type || 'application/octet-stream');

    const reader = new FileReader();
    // If it's text, read as text, otherwise read as ArrayBuffer/DataURL
    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.json')) {
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (event) => {
        // Read as data URL so binary files can be downloaded back
        setFileContent(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPreset = (preset) => {
    setMessage(preset.message);
    setFileLabel(preset.fileLabel);
    setFileName(preset.fileName);
    setStyleTheme(preset.styleTheme);
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    broadcastNotification({
      isActive,
      message,
      fileLabel,
      fileName,
      fileContent,
      fileType,
      styleTheme,
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAdminModal}
          className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-card rounded-2xl border border-gold/30 shadow-2xl overflow-hidden bg-charcoal-950 text-white max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800 bg-gradient-to-r from-charcoal-900 to-charcoal-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gold/20 text-gold border border-gold/30">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white flex items-center gap-2">
                  Admin Broadcast &amp; File Download Center
                  <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                    Live Control
                  </span>
                </h2>
                <p className="text-xs text-gray-400">
                  Send upper-side banner notifications &amp; attach downloadable files for all users.
                </p>
              </div>
            </div>
            <button
              onClick={closeAdminModal}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleBroadcast} className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* Status Toggle & Quick Presets */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-charcoal-900/60 border border-charcoal-800">
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-charcoal-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                </label>
                <div>
                  <span className="text-sm font-semibold text-gray-200">
                    {isActive ? 'Banner Active (Visible to Users)' : 'Banner Hidden / Disabled'}
                  </span>
                  <p className="text-xs text-gray-400">
                    When active, the upper banner is shown across the website.
                  </p>
                </div>
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                Quick Notification Presets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {PRESET_MESSAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="px-3 py-2 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 border border-charcoal-700 hover:border-gold/50 text-left transition-all group"
                  >
                    <span className="text-xs font-bold text-gold group-hover:text-gold-light block">
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-gray-400 line-clamp-1">
                      {preset.message}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 block">
                Notification Message
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. 💎 New 2026 Architectural Shreestone Luxury Tile Catalog is now available..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            {/* File Button & Upload Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 block">
                  Download Button Label
                </label>
                <input
                  type="text"
                  value={fileLabel}
                  onChange={(e) => setFileLabel(e.target.value)}
                  placeholder="e.g. Download Catalog (PDF)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 block">
                  File Name
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Shreestone_Catalog_2026.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                  required
                />
              </div>
            </div>

            {/* Custom File Upload */}
            <div className="p-4 rounded-xl bg-charcoal-900/80 border border-dashed border-charcoal-700 hover:border-gold/50 transition-colors">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-gold/10 text-gold">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Upload Custom Downloadable File
                    </h4>
                    <p className="text-xs text-gray-400">
                      Upload any PDF, TXT, or doc. Currently attached: <span className="text-gold font-mono">{fileName}</span>
                    </p>
                  </div>
                </div>
                <label className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-semibold cursor-pointer border border-charcoal-700 hover:border-gold transition-colors shrink-0">
                  <span>Choose File...</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Banner Color Theme */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2 block flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-gold" />
                <span>Banner Theme Style</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStyleTheme(opt.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      styleTheme === opt.id
                        ? 'border-gold bg-gold/10 shadow-luxury'
                        : 'border-charcoal-700 bg-charcoal-900 hover:border-charcoal-600'
                    }`}
                  >
                    <div className={`w-full h-3 rounded-md bg-gradient-to-r ${opt.color} mb-1.5`} />
                    <span className="text-xs font-semibold text-white block">
                      {opt.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-charcoal-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeAdminModal}
                className="px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-md hover:shadow-luxury hover:scale-105 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Notification</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminNotificationModal;
