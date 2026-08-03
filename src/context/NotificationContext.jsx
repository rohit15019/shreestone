import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

const DEFAULT_FILE_CONTENT = `================================================================================
              SHREESTONE LUXURY CERAMICS & ARCHITECTURAL TILES
                     2026 OFFICIAL CATALOG & SPEC GUIDE
================================================================================

Welcome to the official Shreestone Tile Collection for Architects & Designers.
Our 2026 collection brings forward state-of-the-art sintering technology,
ultra-high-definition veining, and sustainable Italian-inspired craftsmanship.

--------------------------------------------------------------------------------
1. STATUARIO IMPERIALE GOLD (MARBLE COLLECTION)
--------------------------------------------------------------------------------
• Dimensions      : 1200 x 2400 mm / 600 x 1200 mm
• Finish          : Polished Mirror Glaze / Honed Matte
• Water Absorb.   : < 0.05%
• Application     : Luxury Residential Lobbies, Executive Bathrooms, Villas
• Description     : Pristine white marble base with striking organic gold and
                    charcoal veining.

--------------------------------------------------------------------------------
2. NERO MARQUINA INFINITY (OBSIDIAN SERIES)
--------------------------------------------------------------------------------
• Dimensions      : 1200 x 2400 mm / 800 x 1600 mm
• Finish          : High-Gloss Crystal Polish
• Slip Resistance : R9 (Interior) / R11 (Outdoor Anti-Slip Option)
• Description     : Deep obsidian black marble with lightning-crisp white veins.

--------------------------------------------------------------------------------
3. TRAVERTINO BEIGE ROYAL (NATURAL STONE)
--------------------------------------------------------------------------------
• Dimensions      : 600 x 1200 mm / 1000 x 1000 mm
• Finish          : Textured Carving / Natural Satin
• Application     : Living Rooms, Courtyards, Premium Commercial Spaces
• Description     : Warm Roman travertine texture with delicate tactile pits.

--------------------------------------------------------------------------------
TECHNICAL CERTIFICATIONS & STANDARDS:
--------------------------------------------------------------------------------
✓ ISO 13006 / EN 14411 Group BIa Certified (Porcelain Tiles)
✓ Scratch Resistance: Mohs Hardness 7+
✓ Chemical Resistance: Class GA/GLA
✓ Frost Proof & UV Color-Lock Guaranteed (25 Years)

--------------------------------------------------------------------------------
FOR SAMPLES, CUSTOM PRICING & PROJECT QUOTATIONS:
• Phone : +91 98765 43210
• Email : projects@shreestone.com
• Visit : https://github.com/rohit15019/shreestone
================================================================================
`;

const DEFAULT_NOTIFICATION = {
  isActive: true,
  message: '💎 NEW 2026 RELEASE: Shreestone Architectural Tile Catalog & Technical Price Matrix is now available!',
  fileLabel: 'Download Catalog (PDF/Spec)',
  fileName: 'Shreestone_Luxury_Tiles_Catalog_2026.txt',
  fileContent: DEFAULT_FILE_CONTENT,
  fileType: 'text/plain',
  styleTheme: 'gold', // options: 'gold', 'obsidian', 'emerald', 'sapphire'
  updatedAt: new Date().toISOString(),
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(() => {
    try {
      const saved = localStorage.getItem('shreestone_admin_notification');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved notification', e);
    }
    return DEFAULT_NOTIFICATION;
  });

  const [isDismissed, setIsDismissed] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shreestone_admin_notification', JSON.stringify(notification));
    } catch (e) {
      console.error('Failed to save notification', e);
    }
  }, [notification]);

  const broadcastNotification = (newConfig) => {
    const updated = {
      ...notification,
      ...newConfig,
      updatedAt: new Date().toISOString(),
    };
    setNotification(updated);
    setIsDismissed(false); // Reset dismiss state so all users see the new broadcast
    setIsAdminModalOpen(false);
  };

  const dismissNotification = () => {
    setIsDismissed(true);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  const downloadFile = () => {
    try {
      const blob = new Blob([notification.fileContent || DEFAULT_FILE_CONTENT], {
        type: notification.fileType || 'text/plain',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = notification.fileName || 'Shreestone_Catalog.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        isDismissed,
        isAdminModalOpen,
        broadcastNotification,
        dismissNotification,
        openAdminModal,
        closeAdminModal,
        downloadFile,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
