import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

const CATALOG_CONTENT = `================================================================================
              SHREESTONE LUXURY CERAMICS & ARCHITECTURAL TILES
                     2026 OFFICIAL CATALOG & SPEC GUIDE
================================================================================

Welcome to the official Shreestone Tile Collection for Architects, Builders & Homeowners.
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
4. EMERALD QUARTZITE (JEWEL COLLECTION)
--------------------------------------------------------------------------------
• Dimensions      : 800 x 1600 mm
• Finish          : High Gloss Mirror
• Application     : Statement Walls, Powder Rooms, Boutique Retail
• Description     : Rich emerald green crystal veining inspired by Brazilian quartzite.

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

export const NotificationProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dismissNotification = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsDismissed(true);
  };

  const downloadFile = () => {
    try {
      const blob = new Blob([CATALOG_CONTENT], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Shreestone_2026_Luxury_Tiles_Catalog.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsDownloaded(true);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        isModalOpen,
        isDismissed,
        isDownloaded,
        openModal,
        closeModal,
        dismissNotification,
        downloadFile,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
