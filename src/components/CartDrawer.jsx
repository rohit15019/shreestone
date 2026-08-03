import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

/**
 * CartDrawer Component
 * Luxury slide-over shopping cart and showroom quote concierge drawer.
 * Runs 100% client-side with localStorage persistence.
 */
const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalSqFt,
    cartTotalPrice
  } = useCart();

  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isCartOpen) return null;

  const handleRequestQuote = () => {
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      clearCart();
      closeCart();
    }, 3500);
  };

  const isTradeDiscountEligible = cartTotalSqFt >= 1000;
  const discountAmount = isTradeDiscountEligible ? Math.round(cartTotalPrice * 0.12) : 0;
  const finalPrice = cartTotalPrice - discountAmount;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Slide-over Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-charcoal-900 shadow-luxury z-50 flex flex-col border-l border-gray-200 dark:border-charcoal-800"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-200 dark:border-charcoal-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-charcoal-900 dark:text-white">
                Showroom Cart
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {cartItems.length} {cartItems.length === 1 ? 'Surface Slab' : 'Surface Slabs'} Selected
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-xl bg-gray-100 dark:bg-charcoal-800 text-gray-500 dark:text-gray-400 hover:text-charcoal-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-2xl text-charcoal-900 dark:text-white">
                Quote Request Dispatched!
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 max-w-xs leading-relaxed">
                Our architectural concierge desk at Worli Sea Face has received your order for <span className="font-bold text-gold">{cartTotalSqFt} sq.ft</span>. A dedicated advisor will contact you within 15 minutes.
              </p>
              <span className="px-4 py-1.5 rounded-full bg-gold/15 text-gold text-[11px] font-semibold uppercase tracking-wider">
                Ref ID: #SHR-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </motion.div>
          ) : cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-charcoal-800 text-gray-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-charcoal-900 dark:text-white">
                  Your Showroom Cart is Empty
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mt-1">
                  Browse our Italian Carrara and vitrified surface collection or preview tiles in the AI Visualizer to add items.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                if (!item || !item.tile) return null;
                const imgUrl = item.tile.images && item.tile.images.length > 0
                  ? item.tile.images[0]
                  : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
                const price = Number(item.pricePerSqFt || item.tile.pricePerSqFt || item.tile.price || 185);
                const itemTotal = (Number(item.quantitySqFt) || 0) * price;

                return (
                  <div
                    key={item.id || item.tile._id}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-800/70 border border-gray-200/80 dark:border-charcoal-700 flex gap-4 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 dark:bg-charcoal-900 flex-shrink-0 border border-gray-200 dark:border-charcoal-700">
                      <img
                        src={imgUrl}
                        alt={item.tile.name || 'Tile'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal-900 dark:text-white truncate">
                        {item.tile.name || 'Shreestone Tile Slab'}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        <span>{item.tile.size || '800×1600 mm'}</span>
                        <span>•</span>
                        <span>{item.tile.finish || 'Polished'}</span>
                      </div>
                      <span className="text-xs font-bold text-gold block mt-1">
                        ₹{price.toLocaleString('en-IN')} / sq.ft
                      </span>
                    </div>

                    {/* Quantity Controls & Total */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-white dark:bg-charcoal-900 rounded-lg p-1 border border-gray-200 dark:border-charcoal-700">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantitySqFt - 50)}
                          className="w-6 h-6 rounded bg-gray-100 dark:bg-charcoal-800 hover:bg-gold/20 hover:text-gold flex items-center justify-center text-xs font-bold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-12 text-center text-charcoal-900 dark:text-white">
                          {item.quantitySqFt} sq.ft
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantitySqFt + 50)}
                          className="w-6 h-6 rounded bg-gray-100 dark:bg-charcoal-800 hover:bg-gold/20 hover:text-gold flex items-center justify-center text-xs font-bold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-charcoal-900 dark:text-gray-200">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Trade Discount Badge Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-gold/15 via-gold/10 to-transparent border border-gold/30 flex items-center gap-3">
                <Award className="w-5 h-5 text-gold flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-charcoal-900 dark:text-white block">
                    {isTradeDiscountEligible
                      ? '12% Trade Architect Discount Applied!'
                      : 'Order over 1,000 sq.ft for 12% Trade Discount'}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-[11px]">
                    {isTradeDiscountEligible
                      ? `You save ₹${discountAmount.toLocaleString('en-IN')} on this order.`
                      : `Add ${Math.max(0, 1000 - cartTotalSqFt)} more sq.ft to unlock trade pricing.`}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout Bar */}
        {cartItems.length > 0 && !orderSubmitted && (
          <div className="p-6 border-t border-gray-200 dark:border-charcoal-800 bg-gray-50/50 dark:bg-charcoal-900/50 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span>Total Surface Area:</span>
                <span className="font-bold text-charcoal-900 dark:text-white">{cartTotalSqFt.toLocaleString('en-IN')} sq.ft</span>
              </div>
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span>Subtotal:</span>
                <span>₹{cartTotalPrice.toLocaleString('en-IN')}</span>
              </div>
              {isTradeDiscountEligible && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Trade Discount (12%):</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-base font-display font-bold text-charcoal-900 dark:text-white pt-2 border-t border-gray-200 dark:border-charcoal-800">
                <span>Estimated Showroom Price:</span>
                <span className="text-gold">₹{finalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleRequestQuote}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 font-bold text-sm shadow-luxury hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Request Showroom Quote & Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartDrawer;
