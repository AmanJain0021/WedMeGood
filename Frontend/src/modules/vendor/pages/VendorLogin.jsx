import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { vendorApi } from '../vendorApi';
import { useVendorState } from '../useVendorState';

import loginImg from '../../../assets/login (2).png';

const VendorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { updateVendorState } = useVendorState();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await vendorApi.login(email, password);
        if (res.success) {
          localStorage.setItem('vendorToken', res.token);
          updateVendorState({ vendor: res.vendor });
          navigate('/vendor/dashboard');
        } else {
          alert(res.message || 'Login failed');
        }
      } catch (err) {
        alert('Server error connecting to backend');
      }
    } else {
      alert('Please enter your credentials');
    }
  };

  return (
    <div className="relative overflow-hidden py-8 px-2" style={{
      background: 'transparent'
    }}>
      {/* Decorative blobs removed for clean white aesthetic */}


      <div className="w-full max-w-md relative z-10 px-1">
        <div className="rounded-3xl p-4 sm:p-8 shadow-[0_20px_60px_rgba(124, 58, 237, 0.4)] relative overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(124, 58, 237, 0.1)'
        }}>
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem]" style={{
            background: 'linear-gradient(90deg, #7c3aed, #6d28d9, #a855f7, #7c3aed)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite'
          }}></div>

          <div className="text-center mb-2 mt-2">
            <div className="inline-flex h-16 sm:h-24 w-auto items-center justify-center mb-2 transition-all duration-500 hover:scale-110">
              <img src={loginImg} alt="Logo" className="h-full w-auto rounded-2xl" />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1" style={{ color: '#7c3aed' }}>Vendor Portal</p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 drop-shadow-sm">Welcome Back</h2>
            <p className="text-xs sm:text-sm font-bold mt-1" style={{ color: '#475569' }}>Sign in to manage your wedding business.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5" style={{ color: '#cbd5e1' }}>
                  <Icon name="mail" size="sm" color="current" />
                </span>
                <input
                  type="email"
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(124, 58, 237, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  placeholder="vendor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#94a3b8' }}>Password</label>
                <button type="button" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#7c3aed' }}>Forgot?</button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5" style={{ color: '#cbd5e1' }}>
                  <Icon name="lock" size="sm" color="current" />
                </span>
                <input
                  type="password"
                  className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all"
                  style={{
                    border: '1px solid rgba(124, 58, 237, 0.15)',
                    background: 'rgba(253, 242, 248, 0.3)'
                  }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="vendor-cta w-full rounded-2xl py-3 font-bold text-base tracking-wide mt-1"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm font-bold" style={{ color: '#475569' }}>
              Don't have a vendor account?
              <Link to="/vendor/register" className="ml-1 font-bold underline decoration-rose-200" style={{ color: '#7c3aed' }}>Register Now</Link>
            </p>
          </div>
        </div>

        {/* Trust badges below */}
        <div className="flex justify-center gap-6 mt-6">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>&#128274; Secure Login</span>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#94a3b8' }}>&#9989; Trusted Platform</span>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
