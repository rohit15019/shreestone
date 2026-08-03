import React, { useState, useRef } from 'react';
import { Room360Provider, useRoom360 } from '../context/Room360Context';
import RoomSelector from '../components/360/RoomSelector/RoomSelector';
import LightingControls from '../components/360/LightingControls/LightingControls';
import ScreenshotButton from '../components/360/ScreenshotButton/ScreenshotButton';
import TileSelector from '../components/360/TileSelector/TileSelector';
import RoomViewer from '../components/360/RoomViewer/RoomViewer';
import CompareSlider from '../components/360/CompareSlider/CompareSlider';
import InfoPanel from '../components/360/InfoPanel/InfoPanel';
import MeasurementPanel from '../components/360/MeasurementPanel/MeasurementPanel';
import { Sparkles, Compass, Layers, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Visualizer360Content = () => {
  const [isMeasurementOpen, setIsMeasurementOpen] = useState(false);
  const canvasContainerRef = useRef(null);
  const { activeRoom } = useRoom360();

  return (
    <div className="min-h-screen pt-20 sm:pt-24 bg-gray-100 dark:bg-charcoal-950 pb-16 transition-colors duration-300">
      {/* 1. Page Title Header */}
      <section className="bg-white dark:bg-charcoal-900 border-b border-gray-200/80 dark:border-charcoal-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-gold text-charcoal-950">
                360° ARCHITECTURAL STUDIO
              </span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" />
                Real-Time WebGL 3D Visualization
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-charcoal-900 dark:text-white">
              360° Tile Room Visualizer
            </h1>
          </div>

          {/* Quick Perks Bar */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Instant Floor & Wall Preview</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold" />
              <span>60 FPS Luxury Shading</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Bar: 9 Room Selector & Lighting / Screenshot Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 space-y-4">
        <div className="bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-xl p-3 sm:p-4 rounded-3xl border border-gray-200/80 dark:border-charcoal-800 shadow-sm space-y-3">
          <RoomSelector />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-charcoal-800">
            <LightingControls />
            <ScreenshotButton canvasContainerRef={canvasContainerRef} />
          </div>
        </div>
      </section>

      {/* 3. Main Studio Workspace: Left Tile Sidebar + Right 360° Viewport */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left Sidebar: Tile Selector & Filters (Fixed width on lg) */}
          <div className="w-full lg:w-96 flex-shrink-0 h-[680px] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-charcoal-800 shadow-xl">
            <TileSelector />
          </div>

          {/* Right Main Area: 360° Three.js Viewport */}
          <div className="flex-1 relative min-h-[520px] lg:min-h-[680px] flex flex-col">
            <RoomViewer canvasContainerRef={canvasContainerRef} />

            {/* Split Screen Compare Mode Slider Overlay */}
            <CompareSlider />

            {/* Floating Info Panel at Bottom */}
            <div className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 z-20">
              <InfoPanel onOpenMeasurement={() => setIsMeasurementOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Measurement & Cost Estimation Modal */}
      <MeasurementPanel
        isOpen={isMeasurementOpen}
        onClose={() => setIsMeasurementOpen(false)}
      />
    </div>
  );
};

const Tile360VisualizerPage = () => {
  return (
    <Room360Provider>
      <Visualizer360Content />
    </Room360Provider>
  );
};

export default Tile360VisualizerPage;
