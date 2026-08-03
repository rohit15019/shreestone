import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Truck, Sparkles, MapPin, Users, Building2, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: "Years of Ceramic Craft", value: "28+" },
    { label: "Architects & Studios", value: "1,400+" },
    { label: "Luxury Slabs & Finishes", value: "120+" },
    { label: "Surface Gloss Warranty", value: "10 Yrs" },
  ];

  const pillars = [
    {
      title: "Italian Design Heritage",
      desc: "Our design team collaborates directly with Italian Carrara and Tuscan quarries to translate authentic marble veining into high-strength porcelain.",
      icon: <Sparkles className="w-6 h-6 text-gold" />
    },
    {
      title: "Zero-Stain Nano Seal",
      desc: "Every glazed vitrified slab undergoes micro-pore vitrification, ensuring <0.05% water absorption and immunity against household stains.",
      icon: <ShieldCheck className="w-6 h-6 text-gold" />
    },
    {
      title: "Precision Rectified Edges",
      desc: "Diamond-cut edges with sub-millimeter calibration allow seamless installation with grout joints as narrow as 1 mm.",
      icon: <Award className="w-6 h-6 text-gold" />
    },
    {
      title: "Architect Trade Support",
      desc: "Dedicated project consultants, physical sample kits dispatched within 24 hours, and custom waterjet fabrication for statement lobbies.",
      icon: <Users className="w-6 h-6 text-gold" />
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-marble-light dark:bg-charcoal-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
            The Shreestone Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-charcoal-900 dark:text-white">
            Crafting India’s Most Iconic Surfaces
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
            Founded with a singular vision to replace fragile quarried marble with ultra-durable vitrified slabs, Shreestone Ceramics represents the intersection of Italian artistry and high-precision ceramic engineering.
          </p>
        </div>

        {/* Hero Image Banner */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-20 bg-charcoal-900">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
            alt="Shreestone Studio Showroom"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex items-end p-8 sm:p-12">
            <div className="max-w-xl text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                Flagship Experience Center
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl mt-1">
                Worli Sea Face, Mumbai
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                A 15,000 sq.ft tactile studio where architects and discerning homeowners experience full-sized 800×1600 mm slabs under calibrated natural daylight.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-gray-200/80 dark:border-charcoal-700 shadow-card text-center"
            >
              <span className="text-3xl sm:text-4xl font-display font-extrabold text-gradient-gold block">
                {item.value}
              </span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2 block">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Four Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
              Our Engineering Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 dark:text-white">
              Why Discerning Architects Specify Shreestone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-gray-200/80 dark:border-charcoal-700 shadow-card flex items-start gap-5 hover:border-gold/50 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Commitment */}
        <div className="p-8 sm:p-12 rounded-3xl bg-charcoal-950 text-white border border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Sustainable Luxury
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl">
              Zero-Waste & Closed-Loop Water Recycling
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Unlike traditional marble quarrying which exhausts natural mountains, our vitrified manufacturing process recycles 99.4% of industrial water and uses zero heavy chemical resins.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-gold">
                <CheckCircle2 className="w-4 h-4" />
                <span>LEED Certified Material</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gold">
                <CheckCircle2 className="w-4 h-4" />
                <span>ISO 9001:2026 Quality</span>
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <div className="p-6 rounded-2xl bg-charcoal-900 border border-charcoal-800 text-center space-y-2">
              <Building2 className="w-10 h-10 text-gold mx-auto" />
              <span className="text-sm font-bold text-white block">Visit Our Headquarters</span>
              <span className="text-xs text-gray-400 block max-w-xs">
                Shreestone Towers, Worli Sea Face, Mumbai - 400030
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
