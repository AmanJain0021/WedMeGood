import { Outlet, useLocation } from 'react-router-dom';
import '../vendorTheme.css';

const VendorPublicLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/vendor/login' || location.pathname === '/vendor/register';
  return (
    <div className="vendor-shell min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #f3e8ff 100%)'
    }}>
      {/* Background decoration removed for clean white aesthetic */}


      <div className="absolute top-8 sm:top-12 left-0 right-0 flex justify-center w-full z-50 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-5 sm:gap-8 cursor-pointer group" onClick={() => window.location.href = '/'}>
          <div className="relative">
            <img src="/assets/vendor/logo_theme.png" alt="Utsavo Logo" className="h-12 sm:h-20 w-auto hover:scale-105 transition-all duration-500 rounded-2xl shadow-lg ring-1 ring-white/20" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-3xl font-black italic tracking-tighter bg-clip-text text-transparent drop-shadow-sm leading-tight" style={{
              fontFamily: "'Playfair Display', serif",
              backgroundImage: 'linear-gradient(135deg, #7c3aed, #6d28d9, #5b21b6)'
            }}>Utsavo</h1>
            {isAuthPage && (
              <div className="mt-1 flex items-center gap-2">
                <div className="h-[1px] w-8 bg-gradient-to-r from-rose-700/40 to-transparent"></div>
                <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-rose-800/80 drop-shadow-sm">
                  Elite Wedding Network
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col relative z-10 pt-20 sm:pt-28 pb-10 px-2 sm:px-3">
        <div className="flex-1 flex items-center justify-center">
          <div className="mx-auto max-w-6xl w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPublicLayout;
