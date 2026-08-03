import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import { Sunrise, Sun, Sunset, Moon, Flame, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Flame,
  Sparkles
};

const LightingControls = () => {
  const { LIGHTING_MODES, lightingModeId, setLightingModeId, activeLighting } = useRoom360();

  return (
    <div className="flex flex-wrap items-center gap-1.5 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-gray-200/60 dark:border-charcoal-700 shadow-sm">
      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 mr-1 hidden md:inline">
        Lighting:
      </span>
      {LIGHTING_MODES.map((mode) => {
        const IconComponent = ICON_MAP[mode.icon] || Sun;
        const isActive = mode.id === lightingModeId;

        return (
          <motion.button
            key={mode.id}
            onClick={() => setLightingModeId(mode.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={mode.desc}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gold text-charcoal-950 font-bold shadow-sm'
                : 'text-charcoal-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-charcoal-800'
            }`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{mode.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default LightingControls;
