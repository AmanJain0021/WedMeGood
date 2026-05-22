import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';
import { vendorApi } from '../vendorApi';
import { adminApi } from '../../admin/services/adminApi';

const VendorRegister = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { vendorState, updateVendorState } = useVendorState();
  const [formState, setFormState] = useState({
    fullName: vendorState?.registration?.fullName || '',
    businessName: vendorState?.registration?.businessName || '',
    email: vendorState?.registration?.email || '',
    phone: vendorState?.registration?.phone || '',
    city: vendorState?.registration?.city || '',
    category: vendorState?.registration?.category || '',
    password: vendorState?.registration?.password || '',
    emailOtp: '',
    phoneOtp: ''
  });
  const [selectedCategory, setSelectedCategory] = useState(vendorState?.registration?.category || '');

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await adminApi.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error("Categories fetch failed", err);
      }
    };
    fetchCats();
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...formState, [field]: value };
    setFormState(updated);
    updateVendorState({ registration: updated });
  };

  const handleCategorySelect = (category) => {
    handleChange('category', category);
    setSelectedCategory(category);
  };

  const requiredFields = ['fullName', 'businessName', 'email', 'phone', 'city', 'category', 'password', 'emailOtp', 'phoneOtp'];
  const progressCount = requiredFields.filter(f => formState[f] && formState[f].length > 0).length;
  const progressPercent = Math.round((progressCount / 9) * 100);

  return (
    <div className="relative overflow-hidden py-4 px-1" style={{ background: 'transparent' }}>
      <div className="max-w-2xl mx-auto py-2 px-1">
        <div className="rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(124, 58, 237,0.2)] relative overflow-hidden vendor-surface" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(124, 58, 237, 0.1)'
        }}>
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2.5rem]" style={{
            background: 'linear-gradient(90deg, #7c3aed, #f182a5, #f4a0bb, #7c3aed)',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite'
          }}></div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-500 hover:text-violet-700">
                <Icon name="chevronLeft" size="md" />
              </button>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Vendor Registration</h2>
              <div className="h-10 w-10" />
            </div>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div
                  key={step}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border ${step === 1 ? 'border-[#6b21a8] bg-[#6b21a8] text-white' : 'border-slate-200 bg-white text-slate-500'}`}
                >
                  <span className="text-sm font-semibold">{step}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Choose Your Main Category</h2>
              <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">Select the category that best describes your business</p>
            </div>
          </div>

          <div className="mb-4 p-4 sm:p-5 rounded-2xl" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.05)'
          }}>
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#1e293b' }}>
              <span>Onboarding Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(124, 58, 237, 0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #6d28d9, #5b21b6)'
                }}
              />
            </div>
          </div>

          {!selectedCategory ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-3">
                  <div className="rounded-full bg-[#6b21a8] text-white px-4 py-1 text-xs font-bold">STEP 1</div>
                </div>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">Choose Your Main Category</h2>
                <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">Select the category that best describes your business</p>
              </div>

              <div className="grid gap-3 grid-cols-2">
                {categories.length > 0 ? (
                  categories.map((cat) => {
                    const iconMap = {
                      'Venues': 'building',
                      'Photographers': 'camera',
                      'Catering': 'cart',
                      'Makeup Artists': 'makeup',
                      'Decorators': 'decoration',
                      'Wedding Planners': 'plan',
                      'Bridal Wear': 'bag',
                      'Groom Wear': 'briefcase',
                      'Mehendi Artists': 'sparkles',
                      'Jewellery': 'rings',
                      'Wedding Invitations': 'invitation',
                      'Choreographers': 'party',
                      'Music & DJs': 'party'
                    };
                    const iconName = iconMap[cat.name] || 'star';

                    return (
                      <button
                        key={cat._id || cat.name}
                        type="button"
                        onClick={() => handleCategorySelect(cat.name)}
                        className={`group flex items-center gap-4 rounded-3xl border p-3 text-left transition-all duration-200 ease-out ${selectedCategory === cat.name ? 'border-[#7c3aed] bg-[#f5efff] shadow-lg' : 'border-slate-200 bg-white hover:border-[#7c3aed] hover:shadow-sm'}`}
                      >
                        <div className={`flex-shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center ${selectedCategory === cat.name ? 'bg-[#ede7ff]' : 'bg-[#f8f4ff]'}`}>
                          <Icon name={iconName} size="lg" color="#6b21a8" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-2 rounded-3xl border border-dashed border-slate-300 p-8 text-center text-slate-500">Loading categories...</div>
                )}
              </div>

              <div className="space-y-6 pb-28">
                <div className="mt-6" />

                <div className="sticky bottom-0 left-0 right-0 z-20 bg-white/95 pt-4 pb-5 backdrop-blur-xl border-t border-slate-200">
                  <button
                    type="button"
                    disabled={!selectedCategory}
                    onClick={() => { if (selectedCategory) { handleChange('category', selectedCategory); } }}
                    className={`w-full rounded-2xl py-4 text-lg font-bold text-white shadow-xl transition-all ${selectedCategory ? 'bg-gradient-to-r from-[#6a35ff] to-[#7c3aed] hover:brightness-105' : 'bg-[#e9d8fd] opacity-60 cursor-not-allowed'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-3xl border border-[#ede9fe] p-5 bg-white/90 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c3aed]">Selected Category</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{selectedCategory}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('')}
                    className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Change category
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Full name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                    <Icon name="user" size="sm" color="current" />
                  </div>
                  <input
                    autoFocus
                    className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20 outline-none"
                    style={{ border: '1px solid rgba(124, 58, 237, 0.15)', background: 'rgba(255, 255, 255, 0.95)' }}
                    value={formState.fullName}
                    onChange={(event) => handleChange('fullName', event.target.value.replace(/[^a-zA-Z ]/g, ''))}
                    placeholder="e.g. Aditi Kapoor"
                  />
                </div>
              </div>

              {/* Business Name */}
              {formState.fullName.length > 2 && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Business name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                      <Icon name="store" size="sm" color="current" />
                    </div>
                    <input
                      className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20 outline-none"
                      style={{ border: '1px solid rgba(124, 58, 237, 0.15)', background: 'rgba(255, 255, 255, 0.95)' }}
                      value={formState.businessName}
                      onChange={(event) => handleChange('businessName', event.target.value)}
                      placeholder="e.g. Emerald Studio"
                    />
                  </div>
                </div>
              )}

              {/* Email & OTP */}
              {formState.businessName.length > 2 && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Email address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                      <Icon name="envelope" size="sm" color="current" />
                    </div>
                    <input
                      type="email"
                      className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20 outline-none"
                      style={{ border: '1px solid rgba(124, 58, 237, 0.15)', background: 'rgba(255, 255, 255, 0.95)' }}
                      value={formState.email}
                      onChange={(event) => handleChange('email', event.target.value)}
                      placeholder="hello@emeraldstudio.in"
                    />
                  </div>
                  {/* OTP UI Simplified */}
                  {formState.email.includes('@') && (
                    <div className="flex gap-2 mt-2">
                      <input
                        maxLength="4"
                        className="flex-1 rounded-xl px-4 py-3 text-sm font-bold tracking-widest border-rose-100 border outline-none"
                        value={formState.emailOtp}
                        onChange={(e) => handleChange('emailOtp', e.target.value)}
                        placeholder="0000"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Phone & OTP */}
              {formState.emailOtp === '0000' && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Phone number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors" style={{ color: '#64748b' }}>
                      <Icon name="phone" size="sm" color="current" />
                    </div>
                    <input
                      className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold transition-all focus:ring-2 focus:ring-rose-500/20 outline-none"
                      style={{ border: '1px solid rgba(124, 58, 237, 0.15)', background: 'rgba(255, 255, 255, 0.95)' }}
                      value={formState.phone}
                      onChange={(event) => {
                          const val = event.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('phone', val);
                      }}
                      placeholder="9876543210"
                    />
                  </div>
                  {formState.phone.length >= 10 && (
                    <div className="flex gap-2 mt-2">
                      <input
                        maxLength="4"
                        className="flex-1 rounded-xl px-4 py-3 text-sm font-bold tracking-widest border-rose-100 border outline-none"
                        value={formState.phoneOtp}
                        onChange={(e) => handleChange('phoneOtp', e.target.value)}
                        placeholder="1234"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Location & Category Dropdown */}
              {formState.phoneOtp === '1234' && (
                <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Location</label>
                    <input
                      className="w-full rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all border-rose-100 border outline-none"
                      value={formState.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="e.g. Indore"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Category</label>
                    <input
                      readOnly
                      className="w-full rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all border-rose-100 border outline-none bg-slate-50"
                      value={selectedCategory}
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              {formState.city.length > 2 && formState.category && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <label className="text-[11px] font-bold uppercase tracking-wider ml-1" style={{ color: '#1e293b' }}>Password</label>
                  <input
                    type="password"
                    className="w-full rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all border-rose-100 border outline-none"
                    value={formState.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="At least 8 characters"
                  />
                </div>
              )}
            </div>
          )}

          <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-6">
            <button onClick={() => navigate('/vendor/login')} className="text-sm font-bold text-rose-500 hover:underline">
              Already have an account? Sign In
            </button>
            <button
              className={`rounded-2xl px-12 py-4 text-base font-bold bg-rose-500 text-white shadow-xl transition-all ${formState.password.length < 8 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
              onClick={async () => {
                if (formState.password.length < 8) return;
                try {
                  const res = await vendorApi.register(formState);
                  if (res.success) {
                    localStorage.setItem('vendorToken', res.token);
                    updateVendorState({ vendor: res.vendor });
                    navigate('/vendor/onboarding/category');
                  } else alert(res.message);
                } catch (err) { alert('Server error'); }
              }}
            >
              Get Started ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
