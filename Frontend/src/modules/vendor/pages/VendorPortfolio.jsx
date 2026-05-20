import { useState, useEffect, useRef } from 'react';
import { useVendorState } from '../useVendorState';
import { vendorApi } from '../vendorApi';
import Icon from '../../../components/ui/Icon';

/* ─── Static Demo Data ───────────────────────────────────────────── */
const DEMO_PROJECTS = [
  {
    id: 1,
    title: 'Rahul & Sneha Wedding',
    theme: 'Royal Floral Palace Theme',
    venue: 'The Leela Palace, Delhi',
    date: '25 May, 2024',
    cost: '₹4,50,000',
    badge: 'FEATURED',
    badgeColor: '#6D3BFF',
    views: '2.8K', likes: 145, bookmarks: 52,
    category: 'Wedding Decor',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    title: 'Amit & Pooja Wedding',
    theme: 'Luxury Rose Garden Theme',
    venue: 'ITC Maratha, Mumbai',
    date: '18 May, 2024',
    cost: '₹3,20,000',
    badge: 'TRENDING',
    badgeColor: '#F59E0B',
    views: '2.2K', likes: 128, bookmarks: 44,
    category: 'Reception',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 3,
    title: 'Vikram & Anjali Wedding',
    theme: 'Golden Mandap Theme',
    venue: 'Taj Lands End, Mumbai',
    date: '10 May, 2024',
    cost: '₹2,80,000',
    badge: 'FEATURED',
    badgeColor: '#6D3BFF',
    views: '1.9K', likes: 110, bookmarks: 38,
    category: 'Wedding Decor',
    img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600',
  },
];

const DEMO_LATEST = [
  { id: 4, title: 'Neha & Karan Wedding', theme: 'Peach & White Theme', venue: 'JW Marriott, Pune', date: '27 Jun, 2024', views: 960, likes: 44, bookmarks: 32, img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400' },
  { id: 5, title: 'Rohan & Piya Wedding', theme: 'Enchanted Garden Theme', venue: 'The Oberoi, Gurgaon', date: '24 May, 2024', views: '1.4K', likes: 88, bookmarks: 21, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400' },
  { id: 6, title: 'Siddharth & Isha Wedding', theme: 'White & Green Wisdom Theme', venue: 'Grand Lexis, Bengaluru', date: '30 May, 2024', views: '1.1K', likes: 72, bookmarks: 26, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { id: 7, title: 'Kunal & Deepa Wedding', theme: 'Traditional South Indian Decor', venue: 'Leela Palace, Chennai', date: '11 May, 2024', views: '1.5K', likes: 95, bookmarks: 27, img: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=400' },
];

const ALBUMS = [
  { id: 1, label: 'Royal Weddings', count: 18, img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300' },
  { id: 2, label: 'Floral Fantasy', count: 22, img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=300' },
  { id: 3, label: 'Luxury Decor', count: 16, img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=300' },
  { id: 4, label: 'Outdoor Weddings', count: 14, img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=300' },
  { id: 5, label: 'Traditional Decor', count: 12, img: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=300' },
];

const CATEGORIES = ['All Projects', 'Wedding Decor', 'Reception', 'Haldi', 'Mehendi', 'More'];
const CAT_COUNTS = { 'All Projects': 128, 'Wedding Decor': 48, 'Reception': 22, 'Haldi': 15, 'Mehendi': 12, 'More': '···' };

const KPI_CARDS = [
  { value: '128', label: 'Total Projects', trend: '+18% vs last month', icon: '🗂️', color: '#6D3BFF', bg: '#F0EDFF', sparkline: [4,6,5,8,7,9,10,9,11,12,11,13] },
  { value: '85.2K', label: 'Total Views', trend: '+22%', icon: '👁️', color: '#3B82F6', bg: '#EFF6FF', sparkline: [3,5,4,7,8,7,9,10,9,12,11,14] },
  { value: '3.6K', label: 'Total Likes', trend: '+15%', icon: '❤️', color: '#EC4899', bg: '#FDF2F8', sparkline: [5,6,5,7,6,8,9,8,10,9,11,12] },
  { value: '340', label: 'Enquiries Generated', trend: '+20%', icon: '📨', color: '#10B981', bg: '#ECFDF5', sparkline: [2,4,3,5,4,6,7,6,8,7,9,10] },
  { value: '12.5K', label: 'Most Viewed Theme', sub: 'Royal Wedding Theme', icon: '🏆', color: '#F59E0B', bg: '#FFFBEB', sparkline: [6,7,6,8,7,9,10,9,11,12,11,13] },
];

/* ─── Tiny sparkline SVG ─────────────────────────────────────────── */
const Sparkline = ({ points, color }) => {
  const w = 72, h = 24;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const pts = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
};

/* ─── Component ──────────────────────────────────────────────────── */
const VendorPortfolio = () => {
  const { vendorState, refreshData } = useVendorState();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', tag: 'Wedding Decor', type: 'Photo', url: '' });
  const featuredRef = useRef(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  useEffect(() => {
    if (vendorState.portfolio) {
      setPortfolio(vendorState.portfolio);
      setLoading(false);
    } else {
      (async () => {
        const token = localStorage.getItem('vendorToken');
        try {
          const res = await vendorApi.getProfile(token);
          if (res.success) setPortfolio(res.data.portfolio || []);
        } catch (_) {}
        setLoading(false);
      })();
    }
  }, [vendorState.portfolio]);

  const handleImageUpload = async (file) => {
    setIsUploading(true);
    try {
      const token = localStorage.getItem('vendorToken');
      const res = await vendorApi.uploadMedia(file, token);
      if (res.success) setNewItem(p => ({ ...p, url: res.url }));
    } catch (_) {} finally { setIsUploading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.url) return;
    const updated = [...portfolio, { ...newItem }];
    try {
      const token = localStorage.getItem('vendorToken');
      const res = await vendorApi.updatePortfolio(updated, token);
      if (res.success) {
        setPortfolio(res.data);
        setIsModalOpen(false);
        setNewItem({ title: '', tag: 'Wedding Decor', type: 'Photo', url: '' });
        refreshData();
        showToast('Work added to portfolio!');
      }
    } catch (_) {}
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-violet-400 border-t-transparent rounded-full" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Portfolio...</p>
      </div>
    );
  }

  const hasRealPortfolio = portfolio.length > 0;

  return (
    <div className="space-y-0 pb-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .pf-serif { font-family: 'Playfair Display', Georgia, serif; }
        .pf-sans  { font-family: 'Inter', 'Poppins', sans-serif; }
        .pf-card {
          background: rgba(255,255,255,0.97);
          border-radius: 20px;
          border: 1px solid #ECECF4;
          box-shadow: 0 2px 12px -3px rgba(109,59,255,0.06), 0 1px 4px -1px rgba(0,0,0,0.025);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pfFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pf-fadein { animation: pfFadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        .feat-badge {
          font-family: 'Inter', sans-serif;
          font-size: 8px; font-weight: 900;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 3px 8px; border-radius: 999px;
          color: #fff; display: inline-block;
        }
      `}</style>

      {/* ── Hero Banner ──────────────────────────────────────── */}
      <div className="pf-fadein mx-1 mt-1 rounded-2xl px-3.5 pt-3 pb-2.5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #fdf4ff 50%, #f0f4ff 100%)' }}>
        <div className="absolute -top-8 -right-6 w-24 h-24 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6D3BFF, transparent 70%)' }} />
        <div className="relative z-10">
          <p className="pf-sans text-[9px] font-black uppercase tracking-[0.22em] text-[#6D3BFF] mb-0">Showcase</p>
          <h1 className="pf-serif text-[18px] font-black text-slate-900 leading-tight tracking-tight">Portfolio Showcase</h1>
          <p className="pf-sans text-[10px] font-medium text-slate-500 mt-0 leading-tight">Showcase your best work &amp; create lasting impressions</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #6D3BFF, #9333ea)', boxShadow: '0 3px 10px rgba(109,59,255,0.3)' }}
          >
            <Icon name="plus" size="xs" /> Add Work
          </button>
        </div>
      </div>

      {/* ── KPI Horizontal Scroll ─────────────────────────────── */}
      <div className="mt-2 px-1">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {KPI_CARDS.map((kpi, i) => (
            <div key={i} className="pf-fadein shrink-0 rounded-xl p-2 min-w-[108px] flex flex-col justify-between"
              style={{ background: kpi.bg, border: `1px solid ${kpi.color}18`, animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[13px] leading-none">{kpi.icon}</span>
                <Sparkline points={kpi.sparkline} color={kpi.color} />
              </div>
              <div>
                <p className="pf-serif text-[15px] font-black leading-none" style={{ color: kpi.color }}>{kpi.value}</p>
                {kpi.sub && <p className="pf-sans text-[8px] font-bold text-slate-600 leading-tight">{kpi.sub}</p>}
                <p className="pf-sans text-[8px] font-semibold text-slate-500 leading-tight">{kpi.label}</p>
                <p className="pf-sans text-[7.5px] font-bold mt-0.5 leading-none" style={{ color: kpi.color }}>↑ {kpi.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Browse by Categories ───────────────────────────────── */}
      <div className="mt-2.5 px-1">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <h2 className="pf-sans text-[12px] font-black text-slate-800 tracking-tight">Browse by Categories</h2>
          <button className="pf-sans text-[9px] font-black text-[#6D3BFF] uppercase tracking-wider">View All</button>
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 flex flex-col items-center px-2.5 py-1 rounded-xl text-[9px] font-black transition-all active:scale-95"
                style={{
                  background: active ? '#6D3BFF' : '#fff',
                  color: active ? '#fff' : '#475569',
                  border: active ? '1.5px solid #6D3BFF' : '1.5px solid #ECECF4',
                  boxShadow: active ? '0 2px 8px rgba(109,59,255,0.22)' : '0 1px 3px rgba(0,0,0,0.03)',
                }}
              >
                <span className="uppercase tracking-wide">{cat}</span>
                <span className="text-[8px] font-extrabold opacity-80">{CAT_COUNTS[cat]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <div className="mt-2.5 px-1">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <h2 className="pf-sans text-[12px] font-black text-slate-800 tracking-tight">Featured Projects</h2>
          <button className="pf-sans text-[9px] font-black text-[#6D3BFF] uppercase tracking-wider">View All</button>
        </div>
        <div ref={featuredRef} className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {(hasRealPortfolio
            ? portfolio.slice(0, 3).map((p, i) => ({ ...p, id: i, badge: i === 0 ? 'FEATURED' : 'TRENDING', badgeColor: i === 0 ? '#6D3BFF' : '#F59E0B', views: '1.2K', likes: 88, bookmarks: 30, cost: '—', venue: '—', date: '—', theme: p.tag }))
            : DEMO_PROJECTS
          ).map((proj, i) => (
            <div key={proj.id} className="shrink-0 rounded-xl overflow-hidden pf-card pf-fadein"
              style={{ minWidth: 168, maxWidth: 168, animationDelay: `${i * 100}ms` }}>
              <div className="relative h-[115px] overflow-hidden bg-slate-100">
                <img src={proj.img || proj.url} alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="feat-badge absolute top-2 left-2" style={{ background: proj.badgeColor }}>{proj.badge}</span>
                <button className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-all">
                  <Icon name="heart" size="xs" />
                </button>
              </div>
              <div className="p-2">
                <p className="pf-sans text-[10px] font-black text-slate-900 leading-tight truncate">{proj.title}</p>
                <p className="pf-sans text-[8.5px] font-semibold text-violet-500 truncate">{proj.theme}</p>
                <div className="flex items-center gap-0.5 text-[8px] text-slate-400 font-semibold">
                  <Icon name="location" size="xs" className="w-2 h-2 shrink-0" />
                  <span className="truncate">{proj.venue}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[8px] text-slate-400 font-semibold">
                  <Icon name="calendar" size="xs" className="w-2 h-2 shrink-0" />
                  <span>{proj.date}</span>
                </div>
                <p className="pf-sans text-[11px] font-black text-slate-900 mt-1">{proj.cost}</p>
                <p className="pf-sans text-[7.5px] font-black text-slate-400 uppercase tracking-wider leading-none">Decor Cost</p>
                <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-slate-100 text-[8px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-0.5"><Icon name="eye" size="xs" className="w-2 h-2" /> {proj.views}</span>
                  <span>❤️ {proj.likes}</span>
                  <span>🔖 {proj.bookmarks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Project Albums ────────────────────────────────────── */}
      <div className="mt-2.5 px-1">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <h2 className="pf-sans text-[12px] font-black text-slate-800 tracking-tight">Project Albums</h2>
          <button className="pf-sans text-[9px] font-black text-[#6D3BFF] uppercase tracking-wider">View All Albums</button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {ALBUMS.map((album, i) => (
            <div key={album.id} className="shrink-0 flex flex-col items-center pf-fadein" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="relative w-[72px] h-[62px] rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                <img src={album.img} alt={album.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-1 right-1 text-[8px] font-black text-white bg-black/30 backdrop-blur-sm px-1 py-0.5 rounded-full leading-none">
                  {album.count}
                </span>
              </div>
              <p className="pf-sans text-[8px] font-bold text-slate-700 mt-1 text-center leading-tight max-w-[68px] truncate">{album.label}</p>
              <p className="pf-sans text-[7px] font-semibold text-slate-400 leading-none">{album.count} Projects</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Latest Projects Grid ──────────────────────────────── */}
      <div className="mt-2.5 px-1">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <h2 className="pf-sans text-[12px] font-black text-slate-800 tracking-tight">Latest Projects</h2>
          <div className="flex items-center gap-1.5">
            <button className="pf-sans text-[8.5px] font-black text-slate-400 flex items-center gap-0.5 border border-slate-200 rounded-full px-2 py-0.5">
              <Icon name="filter" size="xs" className="w-2 h-2" /> Filter
            </button>
            <button className="pf-sans text-[8.5px] font-black text-slate-400 flex items-center gap-0.5 border border-slate-200 rounded-full px-2 py-0.5">
              Latest First <Icon name="chevronDown" size="xs" className="w-2 h-2" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(hasRealPortfolio
            ? portfolio.map((p, i) => ({ ...p, id: i, views: 860, likes: 44, bookmarks: 22, venue: '—', date: '—', theme: p.tag }))
            : DEMO_LATEST
          ).map((proj, i) => (
            <div key={proj.id} className="rounded-xl overflow-hidden pf-card pf-fadein"
              style={{ animationDelay: `${i * 70}ms` }}>
              <div className="relative h-[90px] bg-slate-100 overflow-hidden">
                <img src={proj.img || proj.url} alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>
              <div className="p-1.5">
                <p className="pf-sans text-[9px] font-black text-slate-900 leading-tight truncate">{proj.title}</p>
                <p className="pf-sans text-[7.5px] font-semibold text-violet-500 truncate">{proj.theme}</p>
                <div className="flex items-center gap-0.5 text-[7px] text-slate-400 font-semibold">
                  <Icon name="location" size="xs" className="w-1.5 h-1.5 shrink-0" />
                  <span className="truncate">{proj.venue}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[7px] text-slate-400 font-semibold">
                  <Icon name="calendar" size="xs" className="w-1.5 h-1.5 shrink-0" />
                  <span>{proj.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 pt-1 border-t border-slate-100 text-[7px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-0.5"><Icon name="eye" size="xs" className="w-1.5 h-1.5" /> {proj.views}</span>
                  <span>❤️ {proj.likes}</span>
                  <span>🔖 {proj.bookmarks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Real uploaded portfolio (if any, shown at bottom) ── */}
      {hasRealPortfolio && (
        <div className="mt-4 px-1">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h2 className="pf-sans text-[13px] font-black text-slate-800 tracking-tight">My Uploads</h2>
            <button onClick={() => setIsModalOpen(true)} className="pf-sans text-[10px] font-black text-[#6D3BFF] uppercase tracking-wider">+ Add More</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {portfolio.map((item, index) => (
              <div key={index} className="rounded-xl overflow-hidden relative group border border-slate-100 shadow-sm">
                <div className="aspect-square bg-slate-100">
                  {item.type === 'Video'
                    ? <video src={item.url} className="w-full h-full object-cover" />
                    : <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-1.5">
                    <p className="text-[7px] font-black text-white truncate uppercase">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Upload Modal ──────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="pf-serif text-xl font-black text-slate-900">Add New Work</h3>
                <p className="pf-sans text-xs font-semibold text-slate-400 mt-0.5">Upload a stunning project to your gallery</p>
              </div>
              <button onClick={() => setIsModalOpen(false)}
                className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90">
                <Icon name="close" size="sm" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="pf-sans text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Title</label>
                <input type="text"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-2xl pf-sans text-sm font-semibold focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  placeholder="e.g. Rahul & Sneha Royal Wedding"
                  value={newItem.title}
                  onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="pf-sans text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                  <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-2xl pf-sans text-sm font-semibold focus:outline-none focus:border-violet-400 transition-all"
                    value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.target.value })}>
                    <option value="Photo">Photo</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="pf-sans text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-2xl pf-sans text-sm font-semibold focus:outline-none focus:border-violet-400 transition-all"
                    value={newItem.tag} onChange={e => setNewItem({ ...newItem, tag: e.target.value })}>
                    {CATEGORIES.filter(c => c !== 'More').map(c => <option key={c}>{c}</option>)}
                    <option>Pre-Wedding</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="pf-sans text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Media Upload</label>
                <div className="relative h-36 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden group cursor-pointer hover:border-violet-300 transition-colors">
                  {newItem.url ? (
                    <div className="absolute inset-0">
                      {newItem.type === 'Video'
                        ? <video src={newItem.url} className="w-full h-full object-cover" />
                        : <img src={newItem.url} alt="Preview" className="w-full h-full object-cover" />}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="pf-sans text-[10px] font-black text-white uppercase tracking-widest">Change Photo</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300">
                      <Icon name="image" size="2xl" />
                      <p className="pf-sans text-[10px] font-black uppercase tracking-widest mt-2 text-slate-400">
                        {isUploading ? 'Uploading...' : 'Tap to upload photo / video'}
                      </p>
                    </div>
                  )}
                  <input type="file" accept={newItem.type === 'Video' ? 'video/*' : 'image/*'}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => handleImageUpload(e.target.files[0])} />
                </div>
              </div>

              <button type="submit"
                disabled={isUploading || !newItem.url || !newItem.title}
                className="w-full h-12 rounded-2xl pf-sans text-xs font-black uppercase tracking-widest text-white active:scale-95 transition-all disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #6D3BFF, #9333ea)', boxShadow: '0 4px 14px rgba(109,59,255,0.3)' }}>
                {isUploading ? 'Uploading...' : 'Add to Portfolio'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Toast Notification ────────────────────────────────── */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-4 py-2 rounded-full bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 border border-slate-800/50 pf-sans">
          <span className="h-2 w-2 rounded-full bg-[#6D3BFF] animate-pulse" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default VendorPortfolio;
