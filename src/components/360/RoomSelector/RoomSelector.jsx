import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import { 
  Sofa, 
  Bath, 
  Utensils, 
  Bed, 
  Sun, 
  Briefcase, 
  Building2, 
  Wine, 
  Trees 
} from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
  Sofa,
  Bath,
  Utensils,
  Bed,
  Sun,
  Briefcase,
  Building2,
  Wine,
  Trees
};

const RoomSelector = () => {
  const { ROOM_TYPES, activeRoomId, setActiveRoomId, activeRoom } = useRoom360();

  return (
    <div className="w-full">
      {/* Horizontal Scrollable Room Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-2">
        {ROOM_TYPES.map((room) => {
          const IconComponent = ICON_MAP[room.icon] || Sofa;
          const isActive = room.id === activeRoomId;

          return (
            <motion.button
              key={room.id}
              onClick={() => setActiveRoomId(room.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border ${
                isActive
                  ? 'bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-900 border-gold shadow-gold-sm'
                  : 'bg-white/80 dark:bg-charcoal-800/80 backdrop-blur-md text-charcoal-700 dark:text-gray-300 border-gray-200/60 dark:border-charcoal-700 hover:border-gold/50'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-gray-400'}`} />
              <span>{room.name}</span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active Room Subtitle Bar */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-charcoal-800 dark:text-white uppercase tracking-wider text-[11px]">
            {activeRoom.name}
          </span>
          <span>•</span>
          <span>{activeRoom.desc}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <span>
            Dimensions: <strong className="text-charcoal-700 dark:text-gray-300">{activeRoom.width}ft × {activeRoom.length}ft × {activeRoom.height}ft</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoomSelector;
