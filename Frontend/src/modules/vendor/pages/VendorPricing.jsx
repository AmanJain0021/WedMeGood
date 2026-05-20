import { useState, useEffect } from 'react';
import { useVendorState } from '../useVendorState';
import Icon from '../../../components/ui/Icon';

const VendorPricing = () => {
  const { vendorState, updateVendorState } = useVendorState();
  const [showModal, setShowModal] = useState(false);
  
  const [tempPricing, setTempPricing] = useState({
    range: '',
    notes: ''
  });

  useEffect(() => {
    if (showModal) { 
      document.body.style.overflow = 'hidden'; 
      document.body.classList.add('modal-open');
    } else { 
      document.body.style.overflow = 'unset'; 
      document.body.classList.remove('modal-open');
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  const handleOpenModal = () => {
    setTempPricing({
      range: vendorState?.pricing?.range || '',
      notes: vendorState?.pricing?.notes || ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    updateVendorState({ 
      pricing: {
        range: tempPricing.range,
        notes: tempPricing.notes
      }
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Card - Solid Pastel Rose */}
      <div className="vendor-surface rounded-xl p-3 sm:p-5 relative overflow-hidden bg-[#FDF2F8] border border-rose-100">
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)'
        }}></div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7c3aed]">Financials</p>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">Pricing Strategy</h2>
            <p className="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5">Define your service value and market rates.</p>
          </div>
          <button 
            type="button" 
            className="vendor-cta rounded-lg px-5 py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-rose-200"
            onClick={handleOpenModal}
          >
            <Icon name="edit" size="xs" /> Update rates
          </button>
        </div>
      </div>

      {/* Stats Mini Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Avg. Rate', value: vendorState?.pricing?.range || 'Not set', bg: '#FFFBEB', border: '#FEF3C7' },
          { label: 'Live Plans', value: vendorState.services.flatMap(s => s.packages).length, bg: '#F0F9FF', border: '#E0F2FE' },
          { label: 'Market Visibility', value: 'Top 10%', bg: '#F0FDF4', border: '#DCFCE7' }
        ].map((stat, i) => (
          <div key={i} className="vendor-surface rounded-xl p-2 sm:p-3 border shadow-none flex flex-col items-center justify-center text-center transition-all hover:scale-[1.02]" style={{ background: stat.bg, borderColor: stat.border }}>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">{stat.label}</p>
            <p className="text-xs sm:text-sm font-black text-slate-900 tracking-tight truncate w-full px-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Pricing Grid - Solid Pastel Cards */}
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1fr_1.2fr]">
        
        {/* Base Pricing Card - Solid Amber Pastel */}
        <div className="vendor-surface rounded-2xl p-5 relative overflow-hidden transition-all hover:shadow-md border border-amber-100" style={{ backgroundColor: '#FFFBEB' }}>
           <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center text-amber-500 shadow-sm">
                <Icon name="money" size="sm" />
              </div>
              <Icon name="edit" size="xs" className="opacity-20 text-amber-600" />
           </div>
           
           <div className="space-y-4">
              <div>
                 <p className="text-[10px] font-black text-amber-900/30 uppercase tracking-[0.2em] mb-1">Starting Range</p>
                 <p className="text-2xl font-black text-slate-900 tracking-tighter">{vendorState?.pricing?.range || 'Price Not Set'}</p>
              </div>

              {vendorState?.pricing?.notes && (
                <div className="pt-4 border-t border-amber-200/50">
                  <p className="text-[10px] font-black text-amber-900/30 uppercase tracking-[0.2em] mb-2">Strategy Notes</p>
                  <p className="text-xs font-bold text-amber-900/60 leading-relaxed italic">"{vendorState?.pricing?.notes}"</p>
                </div>
              )}
           </div>
        </div>

        {/* Detailed Packages Card - Solid Rose Pastel */}
        <div className="vendor-surface rounded-2xl p-5 relative overflow-hidden transition-all hover:shadow-md border border-rose-100" style={{ backgroundColor: '#f3e8ff' }}>
           <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-8 rounded-lg bg-white/60 flex items-center justify-center text-rose-500 shadow-sm">
                <Icon name="plan" size="sm" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-white/40 rounded text-rose-600">Active Plans</span>
           </div>

           <div className="grid gap-2">
             {vendorState.services.flatMap((service) => service.packages).length > 0 ? (
               vendorState.services.flatMap((service) => service.packages).map((pkg, index) => (
                 <div key={`${pkg.name}-${index}`} className="flex items-center justify-between bg-white/40 rounded-xl p-3 border border-rose-100 transition-all hover:bg-white/60 group">
                    <div className="flex items-center gap-3">
                       <div className="h-1.5 w-1.5 rounded-full bg-rose-400"></div>
                       <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{pkg.name}</span>
                    </div>
                    <span className="text-sm font-black text-rose-600 tracking-tight">₹{pkg.price.toLocaleString()}</span>
                 </div>
               ))
             ) : (
               <div className="text-center py-10 bg-white/30 rounded-2xl border border-dashed border-rose-200">
                  <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">No plans defined</p>
                  <p className="text-[10px] font-bold text-rose-300 mt-1">Add services to populate rates.</p>
               </div>
             )}
           </div>
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Update Pricing</h3>
                  <p className="text-xs font-bold text-slate-500">Set your market starting rates</p>
                </div>
                <button onClick={() => setShowModal(false)} className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <Icon name="close" size="sm" />
                </button>
             </div>

             <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Starting Range</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 50k - 2L"
                    className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black focus:outline-none focus:border-rose-400 transition-all"
                    value={tempPricing.range}
                    onChange={(e) => setTempPricing({...tempPricing, range: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pricing Notes</label>
                  <textarea 
                    placeholder="Details about inclusions..."
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-rose-400 transition-all resize-none"
                    value={tempPricing.notes}
                    onChange={(e) => setTempPricing({...tempPricing, notes: e.target.value})}
                  />
                </div>

                <div className="pt-2">
                   <button onClick={handleSave} className="w-full vendor-cta h-12 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-200">
                      Save Rates
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPricing;
