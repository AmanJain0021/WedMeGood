import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icon';
import { useVendorState } from '../useVendorState';
import { vendorApi } from '../vendorApi';
import { adminApi } from '../../admin/services/adminApi';

// Bespoke, high-fidelity vector illustrations matching the target mockup exactly.
const getCategoryMockupDetails = (catName) => {
  switch (catName) {
    case 'Wedding Planners':
    case 'Wedding Planning':
      return {
        label: 'Wedding Planning',
        color: '#4F35C3',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="8" width="24" height="30" rx="3.5" stroke="#4F35C3" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M17 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke="#4F35C3" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M17 16h10M17 22h10M17 28h6" stroke="#4F35C3" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M13 16h.01M13 22h.01M13 28h.01" stroke="#4F35C3" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        )
      };
    case 'Decorators':
    case 'Decoration':
      return {
        label: 'Decoration',
        color: '#10B981',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 36V18C8 11.373 13.373 6 20 6s12 5.373 12 12v18" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <path d="M5 36h6M29 36h6" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            <circle cx="20" cy="6" r="3.5" fill="#EC4899" />
            <circle cx="11" cy="15" r="3.5" fill="#EC4899" />
            <circle cx="29" cy="15" r="3.5" fill="#EC4899" />
            <path d="M8 24h3M29 24h3" stroke="#F43F5E" strokeWidth="2.5" />
          </svg>
        )
      };
    case 'Photographers':
    case 'Photography & Media':
      return {
        label: 'Photography & Media',
        color: '#475569',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="12" width="30" height="20" rx="4" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
            <path d="M15 12V9h14v3" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="22" cy="22" r="7.5" stroke="#334155" strokeWidth="3" fill="#F8FAFC" />
            <circle cx="22" cy="22" r="3.5" fill="#334155" />
            <rect x="10" y="9" width="3" height="3" rx="0.5" fill="#EF4444" />
          </svg>
        )
      };
    case 'Makeup Artists':
    case 'Beauty & Fashion':
      return {
        label: 'Beauty & Fashion',
        color: '#D97706',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="18" width="8" height="18" rx="1.5" stroke="#D97706" strokeWidth="2.5" fill="#FEF3C7" />
            <rect x="10" y="13" width="6" height="5" fill="#EF4444" rx="1" stroke="#EF4444" strokeWidth="1.5" />
            <path d="M32 8l-4 4-15 15 3 3 15-15 4-4" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M31 9c1-1 3.5-2 5 0s1 4 0 5-4.5.5-5-5z" fill="#EC4899" />
            <path d="M26 14l3 3" stroke="#FBBF24" strokeWidth="3" />
          </svg>
        )
      };
    case 'Catering':
    case 'Catering & Food':
      return {
        label: 'Catering & Food',
        color: '#10B981',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 31h30c1.5 0 2 1 2 2s-.5 2-2 2H6c-1.5 0-2-1-2-2s.5-2 2-2z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
            <path d="M8 31c0-8 6.5-13.5 14-13.5s14 5.5 14 13.5H8z" fill="#E6F4EA" stroke="#10B981" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="22" cy="14" r="3.5" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          </svg>
        )
      };
    case 'Choreographers':
    case 'Entertainment':
      return {
        label: 'Entertainment',
        color: '#4F35C3',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="28" r="5" stroke="#4F35C3" strokeWidth="2.5" fill="#EEF2FF" />
            <circle cx="28" cy="24" r="5" stroke="#4F35C3" strokeWidth="2.5" fill="#EEF2FF" />
            <path d="M17 28V10l16-3v17" stroke="#4F35C3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 14l16-3V7L17 10v4z" fill="#4F35C3" />
          </svg>
        )
      };
    case 'Mehendi Artists':
    case 'Traditional Services':
      return {
        label: 'Traditional Services',
        color: '#EA580C',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 22c0 8 7.5 12 16 12s16-4 16-12c0 0-4 3-16 3S6 22 6 22z" fill="#FFEFE2" stroke="#EA580C" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M16 34c1 2.5 3 4 6 4s5-1.5 6-4" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 6c-3 5 0 11 0 11s3-6 0-11z" fill="#EF4444" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
        )
      };
    case 'Wedding Invitations':
    case 'Invitations & Printing':
      return {
        label: 'Invitations & Printing',
        color: '#E11D48',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="10" width="30" height="22" rx="3" stroke="#F43F5E" strokeWidth="2.5" fill="#FFF5F5" />
            <path d="M7 11l15 11 15-11" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 22.5c-.5-.5-1.5-1.2-2.5-.7s-1 2 0 3l2.5 2.2 2.5-2.2c1-1 1-2.5 0-3s-2 .2-2.5.7z" fill="#EF4444" />
          </svg>
        )
      };
    case 'Groom Wear':
    case 'Travel & Hospitality':
      return {
        label: 'Travel & Hospitality',
        color: '#2563EB',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="30" width="6" height="6" rx="1.5" fill="#1E293B" />
            <rect x="29" y="30" width="6" height="6" rx="1.5" fill="#1E293B" />
            <path d="M8 20h28v10a2 2 0 01-2 2H10a2 2 0 01-2-2V20z" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" />
            <path d="M11 20l3-8h16l3 8H11z" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="12" cy="25" r="2.5" fill="#FBBF24" />
            <circle cx="32" cy="25" r="2.5" fill="#FBBF24" />
          </svg>
        )
      };
    case 'Music & DJs':
    case 'Event Setup & Rentals':
      return {
        label: 'Event Setup & Rentals',
        color: '#6366F1',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 6L6 20h32L22 6z" fill="#EEF2FF" stroke="#4F35C3" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M22 6v14M14 13v7M30 13v7" stroke="#4F35C3" strokeWidth="2" />
            <path d="M8 20v14M36 20v14" stroke="#4F35C3" strokeWidth="2.5" />
            <path d="M22 6V3l4 1.5-4 1.5z" fill="#EC4899" />
            <path d="M14 34v-8a8 8 0 0116 0v8" stroke="#4F35C3" strokeWidth="2.5" fill="#FFF" />
          </svg>
        )
      };
    case 'Bridal Wear':
    case 'Gifts & Shopping':
      return {
        label: 'Gifts & Shopping',
        color: '#EF4444',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="14" width="28" height="22" rx="3" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
            <path d="M22 14v22M8 25h28" stroke="#EF4444" strokeWidth="3" />
            <path d="M22 14c-4-4-6-1-3 2s3-2 3-2z" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
            <path d="M22 14c4-4 6-1 3 2s-3-2-3-2z" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
          </svg>
        )
      };
    case 'Venues':
    case 'Corporate Events':
      return {
        label: 'Corporate Events',
        color: '#0284c7',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="12" width="12" height="26" rx="2" fill="#E0F2FE" stroke="#0284c7" strokeWidth="2.5" />
            <rect x="21" y="6" width="16" height="32" rx="2.5" fill="#F0F9FF" stroke="#0284c7" strokeWidth="2.5" />
            <path d="M11 16h4M11 21h4M11 26h4M11 31h4M25 10h8M25 15h8M25 20h8M25 25h8M25 30h8" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      };
    case 'Jewellery':
    default:
      return {
        label: 'Jewellery',
        color: '#D97706',
        icon: (
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="26" r="10" stroke="#D97706" strokeWidth="3" fill="#FEF3C7" />
            <circle cx="18" cy="16" r="3.5" stroke="#D97706" strokeWidth="2.5" fill="#E0F2FE" />
            <circle cx="26" cy="22" r="10" stroke="#EC4899" strokeWidth="3" fill="#FCE7F3" />
          </svg>
        )
      };
  }
};

// Custom sub-categories lists mapped for all possible main categories, matching the Photography & Media mockup exactly.
const subCategoriesData = {
  'Wedding Planners': [
    { name: 'Full Wedding Planner', desc: 'Vendor bookings, decor curation & complete sangeet execution.', icon: 'plan' },
    { name: 'Partial Wedding Planner', desc: 'Day-of guest management, coordinator helper & checklist helper.', icon: 'checkList' },
    { name: 'Wedding Consultant', desc: 'Budget allocation advisor, expert review sessions.', icon: 'help' }
  ],
  'Decorators': [
    { name: 'Floral Designer', desc: 'Traditional mandaps, entrance florals & stage setup.', icon: 'decoration' },
    { name: 'Thematic Decorator', desc: 'Premium LED backdrops, customized seating & designer sets.', icon: 'star' },
    { name: 'Audio & Truss Stage Rentals', desc: 'Line arrays, DJ setups, heavy trussing setups.', icon: 'store' }
  ],
  'Photographers': [
    { name: 'Photographer', desc: 'Candid, Traditional, Pre-wedding etc.', icon: 'camera' },
    { name: 'Videographer', desc: 'Wedding Films, Cinematic Videos etc.', icon: 'video' },
    { name: 'Drone Photography', desc: 'Aerial Photography & Videography', icon: 'globe' },
    { name: 'Live Streaming', desc: 'Live Telecast, Multi Camera Setup', icon: 'chat' },
    { name: 'Wedding Reel Creator', desc: 'Short Videos, Reels, Highlights', icon: 'play' }
  ],
  'Makeup Artists': [
    { name: 'Bridal Makeup Artist', desc: 'Airbrush setups, high-definition makeup, hairdressing.', icon: 'makeup' },
    { name: 'Groom Styling Stylist', desc: 'Groom shaves, designer haircuts & clothing fitting support.', icon: 'user' },
    { name: 'Sari & Dupatta Drapist', desc: 'Classic draping, saree patterns, and entry adjustments.', icon: 'bag' }
  ],
  'Catering': [
    { name: 'Buffet Wedding Caterer', desc: 'Premium multi-cuisine counters, live stations & cocktails.', icon: 'cart' },
    { name: 'Fine Dining Planner', desc: 'Sit-down silver service, custom menu prints & luxury staff.', icon: 'bank' },
    { name: 'Baker & Sweets Creator', desc: 'Multi-tier floral wedding cakes & traditional dessert platters.', icon: 'star' }
  ],
  'Choreographers': [
    { name: 'Sangeet Choreographer', desc: 'First sangeet couples dance, group dances, background audio edits.', icon: 'party' },
    { name: 'Wedding DJ & Lighting', desc: 'Sizzling beats, dance floor setups, custom laser projections.', icon: 'settings' },
    { name: 'Live Wedding Band', desc: 'Acoustic welcome players, Sufi sangeet players & classic shehnai.', icon: 'bell' }
  ]
};

const getSubCategoriesForMain = (mainCat) => {
  const normalized = mainCat === 'Photography & Media' ? 'Photographers' : mainCat;
  return subCategoriesData[normalized] || [
    { name: `${mainCat} Lead Planner`, desc: 'Bespoke high-quality setups and professional assistance.', icon: 'star' },
    { name: `${mainCat} Standard Vendor`, desc: 'Standard wedding support, basic equipment package.', icon: 'checkList' },
    { name: `${mainCat} Independent Consultant`, desc: 'Remote consultations, budget assistance, basic reviews.', icon: 'help' }
  ];
};

const renderSubCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'camera': // Photographer
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="14" width="36" height="26" rx="6" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M16 14v-3a2 2 0 012-2h12a2 2 0 012 2v3" stroke="#3A4D6B" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="24" cy="27" r="7" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="2" />
          <circle cx="24" cy="27" r="3" fill="#4F35C3" />
          <circle cx="35" cy="19" r="1.5" fill="#EF4444" />
        </svg>
      );
    case 'video': // Videographer
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="18" width="24" height="20" rx="4" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M30 23.5l11-6.5v22l-11-6.5v-9z" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="4" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="2" />
          <circle cx="24" cy="12" r="4" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M12 12h12" stroke="#3A4D6B" strokeWidth="2" />
        </svg>
      );
    case 'globe': // Drone
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="5" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M8 8l11.5 11.5M40 8L28.5 19.5M8 40l11.5-11.5M40 40L28.5 28.5" stroke="#3A4D6B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8" cy="8" r="3" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="1.5" />
          <circle cx="40" cy="8" r="3" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="1.5" />
          <circle cx="8" cy="40" r="3" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="3" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="2" fill="#4F35C3" />
        </svg>
      );
    case 'chat': // Live Streaming
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 40V22M14 40h20" stroke="#3A4D6B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="18" r="3.5" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M17 11.5a9 9 0 000 13M31 11.5a9 9 0 010 13M12.5 7a15 15 0 000 22M35.5 7a15 15 0 010 22" stroke="#4F35C3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'play': // Reel Creator
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="6" width="20" height="36" rx="4" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <circle cx="24" cy="20" r="5" fill="#FFFFFF" stroke="#3A4D6B" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="2" fill="#4F35C3" />
          <circle cx="24" cy="32" r="2" fill="#EF4444" />
          <path d="M19 10h10M24 40h.01" stroke="#3A4D6B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'plan':
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="28" height="32" rx="4" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M16 8V6a2 2 0 012-2h12a2 2 0 012 2v2M16 16h16M16 22h16M16 28h10" stroke="#3A4D6B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'checkList':
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="28" height="32" rx="4" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M18 18l4 4 8-8" stroke="#4F35C3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 28h16M16 34h10" stroke="#3A4D6B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'decoration':
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 40V24c0-8.8 7.2-16 16-16s16 7.2 16 16v16" stroke="#3A4D6B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="8" r="3" fill="#EF4444" />
          <circle cx="12" cy="18" r="3" fill="#FBBF24" />
          <circle cx="36" cy="18" r="3" fill="#FBBF24" />
          <path d="M16 40h16" stroke="#3A4D6B" strokeWidth="2" />
        </svg>
      );
    case 'makeup':
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="22" width="10" height="18" rx="2" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <rect x="12" y="14" width="6" height="8" fill="#EF4444" rx="1" />
          <path d="M34 10l-4 4-16 16 4 4 16-16 4-4z" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
        </svg>
      );
    case 'cart':
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 34h36c1 0 2-1 2-2s-1-2-2-2H6c-1 0-2 1-2 2s1 2 2 2z" fill="#3A4D6B" />
          <path d="M8 30c0-10 8-18 16-18s16 8 16 18H8z" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <circle cx="24" cy="12" r="2.5" fill="#EF4444" />
        </svg>
      );
    case 'party':
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="30" r="6" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <circle cx="32" cy="26" r="6" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M22 30V12l16-4v18" stroke="#3A4D6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="16" fill="#F0EFFC" stroke="#3A4D6B" strokeWidth="2" />
          <path d="M24 14l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#4F35C3" />
        </svg>
      );
  }
};

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
    subCategory: vendorState?.registration?.subCategory || '',
    password: vendorState?.registration?.password || '',
    emailOtp: '',
    phoneOtp: ''
  });
  
  const [selectedCategory, setSelectedCategory] = useState(vendorState?.registration?.category || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState(vendorState?.registration?.subCategory || '');
  
  // Clean multi-step navigation controller:
  // Step 1: Main Category Selection
  // Step 2: Sub Category Selection (Same as user's first image!)
  // Step 3: Registration Profile Details Form
  const [currentStep, setCurrentStep] = useState(
    vendorState?.registration?.subCategory ? 3 : vendorState?.registration?.category ? 2 : 1
  );

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

  const handleSubCategorySelect = (subCategory) => {
    handleChange('subCategory', subCategory);
    setSelectedSubCategory(subCategory);
  };

  const handleBackNavigation = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      navigate(-1);
    }
  };

  const requiredFields = ['fullName', 'businessName', 'email', 'phone', 'city', 'category', 'subCategory', 'password', 'emailOtp', 'phoneOtp'];
  const progressCount = requiredFields.filter(f => formState[f] && formState[f].length > 0).length;
  const progressPercent = Math.round((progressCount / 10) * 100);

  return (
    <div className="w-full max-w-xl mx-auto py-1 px-1 font-sans">
      {/* Super Compact Card wrapper */}
      <div className="bg-white rounded-[28px] shadow-[0_12px_40px_rgba(124,58,237,0.08)] border border-slate-100 overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Clean Mockup Navigation Bar */}
        <div className="flex items-center justify-between px-4 py-2 relative select-none">
          <button 
            type="button"
            onClick={handleBackNavigation} 
            className="p-1 rounded-xl text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center"
          >
            {/* Elegant Back Arrow matching mockup */}
            <svg className="w-6 h-6 text-slate-900 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h2 className="text-base sm:text-[17px] font-extrabold text-slate-900 tracking-tight">Vendor Registration</h2>
          <div className="w-8" />
        </div>

        {/* Mockup Connected Stepper Circles 1-2-3-4-5-7 */}
        <div className="relative flex items-center justify-between w-full max-w-[270px] mx-auto my-2.5 px-1 select-none">
          {/* Horizontal Line behind */}
          <div className="absolute top-1/2 left-3 right-3 h-[1px] bg-slate-200 -translate-y-1/2 z-0" />
          
          {[1, 2, 3, 4, 5, 7].map((num) => {
            const isActive = currentStep === num;
            const isCompleted = currentStep > num ? true : (num === 7 && currentStep === 3);

            return (
              <div key={num} className="relative z-10 flex items-center justify-center">
                <div className={`h-7.5 w-7.5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#4F35C3] text-white shadow-sm ring-4 ring-[#4F35C3]/10 scale-105'
                    : isCompleted
                      ? 'bg-violet-100 text-[#4F35C3] border border-violet-200'
                      : 'bg-white text-slate-800 border border-slate-200'
                }`}>
                  {num}
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Content Wrapper */}
        <div className="px-4 pb-4 flex-1">
          {currentStep === 1 ? (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
              {/* Titles Step 1 */}
              <div className="text-center px-3 mb-2 select-none">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                  Choose Your Main Category
                </h2>
                <p className="mt-0.5 text-[10.5px] sm:text-[11.5px] text-slate-400 max-w-[280px] mx-auto font-semibold leading-normal">
                  Select the category that best describes your business
                </p>
              </div>

              {/* 2-Column Grid with highly optimized gaps */}
              <div className="grid gap-1.5 grid-cols-2">
                {categories.length > 0 ? (
                  categories.map((cat) => {
                    const details = getCategoryMockupDetails(cat.name);
                    const isSelected = selectedCategory === cat.name;

                    return (
                      <button
                        key={cat._id || cat.name}
                        type="button"
                        onClick={() => handleCategorySelect(cat.name)}
                        className={`group relative flex items-center gap-2 rounded-xl border p-1 sm:p-1.5 text-left transition-all duration-200 ${
                          isSelected 
                            ? 'border-[#4F35C3] bg-[#4F35C3]/[0.01] shadow-[0_1.5px_6px_rgba(79,53,195,0.03)]' 
                            : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                          {details.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[10px] sm:text-[11.5px] font-bold leading-tight tracking-tight text-slate-800 transition-colors ${
                            isSelected ? 'text-[#4F35C3] font-extrabold' : ''
                          }`}>
                            {details.label}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-2 rounded-xl border border-dashed border-slate-200 p-6 text-center text-slate-500 font-semibold text-xs">
                    <div className="w-5 h-5 rounded-full border-2 border-[#4F35C3]/30 border-t-[#4F35C3] animate-spin mx-auto mb-2" />
                    Loading categories...
                  </div>
                )}
              </div>

              {/* Next Button for Step 1 */}
              <div className="mt-4">
                <button
                  type="button"
                  disabled={!selectedCategory}
                  onClick={() => setCurrentStep(2)}
                  className={`w-full rounded-2xl py-3 text-sm sm:text-base font-extrabold text-white shadow-sm transition-all duration-200 ${
                    !selectedCategory 
                      ? 'bg-[#4F35C3]/40 cursor-not-allowed text-white/80' 
                      : 'bg-[#4F35C3] hover:shadow-[0_4px_12px_rgba(79,53,195,0.15)] hover:brightness-105 active:scale-95'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="flex flex-col h-full animate-in fade-in duration-300 select-none">
              
              {/* Central circular category badge */}
              <div className="flex justify-center mb-3">
                <div className="h-16 w-16 rounded-full bg-[#F0EFFC] flex items-center justify-center shadow-[0_4px_12px_rgba(79,53,195,0.06)] relative border border-violet-100/50">
                  <div className="scale-110 flex items-center justify-center">
                    {getCategoryMockupDetails(selectedCategory)?.icon}
                  </div>
                </div>
              </div>

              {/* Dynamic Header titles matching mockup */}
              <div className="text-center px-3 mb-4">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                  {getCategoryMockupDetails(selectedCategory)?.label || selectedCategory}
                </h2>
                <p className="mt-0.5 text-xs sm:text-[13px] text-slate-500 font-semibold max-w-[320px] mx-auto leading-normal">
                  Select the option that best matches your business
                </p>
              </div>

              {/* Sub-categories Vertical List matching mockup image perfectly */}
              <div className="space-y-2.5 max-w-md mx-auto w-full">
                {getSubCategoriesForMain(selectedCategory).map((subOption) => {
                  const isSelected = selectedSubCategory === subOption.name;

                  return (
                    <button
                      key={subOption.name}
                      type="button"
                      onClick={() => handleSubCategorySelect(subOption.name)}
                      className={`w-full text-left rounded-[20px] border p-3 sm:p-3.5 flex items-center gap-3.5 transition-all duration-200 ${
                        isSelected 
                          ? 'border-[#4F35C3] border-2 bg-[#F5F3FF]/30 shadow-[0_4px_16px_rgba(79,53,195,0.05)]' 
                          : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.01)]'
                      }`}
                    >
                      {/* Left colored high-fidelity icon */}
                      <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center [&>svg]:w-9 [&>svg]:h-9">
                        {renderSubCategoryIcon(subOption.icon)}
                      </div>

                      {/* Middle description texts */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-tight">
                          {subOption.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-snug mt-0.5">
                          {subOption.desc}
                        </p>
                      </div>

                      {/* Right Chevron arrow */}
                      <div className="flex-shrink-0 text-slate-400">
                        <svg className={`w-5 h-5 transition-transform duration-200 ${isSelected ? 'text-[#4F35C3] translate-x-0.5' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Button for Step 2 */}
              <div className="mt-4 max-w-md mx-auto w-full px-1">
                <button
                  type="button"
                  disabled={!selectedSubCategory}
                  onClick={() => setCurrentStep(3)}
                  className={`w-full rounded-2xl py-3.5 text-sm sm:text-base font-extrabold text-white shadow-sm transition-all duration-200 ${
                    !selectedSubCategory 
                      ? 'bg-[#4F35C3]/40 cursor-not-allowed text-white/80' 
                      : 'bg-[#4F35C3] hover:shadow-[0_4px_16px_rgba(79,53,195,0.2)] hover:brightness-105 active:scale-95'
                  }`}
                >
                  Next
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-1.5 animate-in fade-in duration-300">
              
              {/* Title Step 3 */}
              <div className="text-center px-3 mb-1.5 select-none">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                  Register Your Business
                </h2>
                <p className="mt-0.5 text-[9.5px] sm:text-[10px] text-slate-400 max-w-[280px] mx-auto font-semibold leading-normal">
                  Enter your professional details to set up your profile.
                </p>
              </div>

              {/* Dynamic Compact Progress Bar */}
              <div className="mb-1.5 mx-1 flex items-center gap-2 bg-slate-50/50 p-1.5 rounded-xl border border-slate-100/80">
                <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider pl-1 select-none">Progress</span>
                <div className="h-1 flex-1 rounded-full overflow-hidden bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${progressPercent}%`,
                      background: 'linear-gradient(90deg, #4F35C3, #db2777)'
                    }}
                  />
                </div>
                <span className="text-[8.5px] font-extrabold text-[#4F35C3] pr-1 select-none">{progressPercent}%</span>
              </div>

              {/* Selected Main and Sub Category Info Pill */}
              <div className="rounded-xl border border-slate-100 p-1.5 bg-slate-50/50 flex items-center justify-between gap-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center scale-75">
                    {getCategoryMockupDetails(selectedCategory)?.icon}
                  </div>
                  <div>
                    <p className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">Selected Role</p>
                    <h3 className="text-[10px] sm:text-[11px] font-extrabold text-slate-900">
                      {getCategoryMockupDetails(selectedCategory)?.label || selectedCategory} • {selectedSubCategory}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubCategory('');
                    handleChange('subCategory', '');
                    setCurrentStep(2);
                  }}
                  className="text-[8px] font-extrabold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[#4F35C3] hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Change
                </button>
              </div>

              {/* Full Name */}
              <div className="space-y-0.5">
                <label className="text-[8.5px] font-extrabold uppercase tracking-wider ml-1 text-slate-400">Full name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#4F35C3]">
                    <Icon name="user" size="xs" color="currentColor" />
                  </div>
                  <input
                    autoFocus
                    className="w-full rounded-lg pl-8 pr-2 py-1.5 text-[11px] sm:text-xs font-bold border border-slate-200 bg-slate-50/20 focus:border-[#4F35C3] focus:bg-white focus:ring-2 focus:ring-[#4F35C3]/5 outline-none transition-all duration-150"
                    value={formState.fullName}
                    onChange={(event) => handleChange('fullName', event.target.value.replace(/[^a-zA-Z ]/g, ''))}
                    placeholder="e.g. Aditi Kapoor"
                  />
                </div>
              </div>

              {/* Business Name */}
              {formState.fullName.length > 2 && (
                <div className="space-y-0.5 animate-in fade-in duration-150">
                  <label className="text-[8.5px] font-extrabold uppercase tracking-wider ml-1 text-slate-400">Business name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#4F35C3]">
                      <Icon name="store" size="xs" color="currentColor" />
                    </div>
                    <input
                      className="w-full rounded-lg pl-8 pr-2 py-1.5 text-[11px] sm:text-xs font-bold border border-slate-200 bg-slate-50/20 focus:border-[#4F35C3] focus:bg-white focus:ring-2 focus:ring-[#4F35C3]/5 outline-none transition-all duration-150"
                      value={formState.businessName}
                      onChange={(event) => handleChange('businessName', event.target.value)}
                      placeholder="e.g. Emerald Studio"
                    />
                  </div>
                </div>
              )}

              {/* Email & OTP */}
              {formState.businessName.length > 2 && (
                <div className="space-y-0.5 animate-in fade-in duration-150">
                  <label className="text-[8.5px] font-extrabold uppercase tracking-wider ml-1 text-slate-400">Email address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#4F35C3]">
                      <Icon name="envelope" size="xs" color="currentColor" />
                    </div>
                    <input
                      type="email"
                      className="w-full rounded-lg pl-8 pr-2 py-1.5 text-[11px] sm:text-xs font-bold border border-slate-200 bg-slate-50/20 focus:border-[#4F35C3] focus:bg-white focus:ring-2 focus:ring-[#4F35C3]/5 outline-none transition-all duration-150"
                      value={formState.email}
                      onChange={(event) => handleChange('email', event.target.value)}
                      placeholder="hello@emeraldstudio.in"
                    />
                  </div>
                  {/* OTP UI */}
                  {formState.email.includes('@') && (
                    <div className="flex gap-2 mt-1 animate-in fade-in duration-150">
                      <input
                        maxLength="4"
                        className="flex-1 rounded-lg px-2.5 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest border border-rose-100/80 focus:border-[#4F35C3] focus:ring-2 focus:ring-[#4F35C3]/5 outline-none bg-rose-50/5 focus:bg-white"
                        value={formState.emailOtp}
                        onChange={(e) => handleChange('emailOtp', e.target.value)}
                        placeholder="Enter 4-digit Email OTP (Type 0000)"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Phone & OTP */}
              {formState.emailOtp === '0000' && (
                <div className="space-y-0.5 animate-in fade-in duration-150">
                  <label className="text-[8.5px] font-extrabold uppercase tracking-wider ml-1 text-slate-400">Phone number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#4F35C3]">
                      <Icon name="phone" size="xs" color="currentColor" />
                    </div>
                    <input
                      className="w-full rounded-lg pl-8 pr-2 py-1.5 text-[11px] sm:text-xs font-bold border border-slate-200 bg-slate-50/20 focus:border-[#4F35C3] focus:bg-white focus:ring-2 focus:ring-[#4F35C3]/5 outline-none transition-all duration-150"
                      value={formState.phone}
                      onChange={(event) => {
                          const val = event.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('phone', val);
                      }}
                      placeholder="9876543210"
                    />
                  </div>
                  {formState.phone.length >= 10 && (
                    <div className="flex gap-2 mt-1 animate-in fade-in duration-150">
                      <input
                        maxLength="4"
                        className="flex-1 rounded-lg px-2.5 py-1.5 text-[10px] sm:text-xs font-bold tracking-widest border border-rose-100/80 focus:border-[#4F35C3] focus:ring-2 focus:ring-[#4F35C3]/5 outline-none bg-rose-50/5 focus:bg-white"
                        value={formState.phoneOtp}
                        onChange={(e) => handleChange('phoneOtp', e.target.value)}
                        placeholder="Enter 4-digit Phone OTP (Type 1234)"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Location & Category */}
              {formState.phoneOtp === '1234' && (
                <div className="grid sm:grid-cols-2 gap-2 animate-in fade-in duration-150">
                  <div className="space-y-0.5">
                    <label className="text-[8.5px] font-extrabold uppercase tracking-wider ml-1 text-slate-400">Location</label>
                    <input
                      className="w-full rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-bold border border-slate-200 bg-slate-50/20 focus:border-[#4F35C3] focus:bg-white focus:ring-2 focus:ring-[#4F35C3]/5 outline-none transition-all duration-150"
                      value={formState.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="e.g. Indore"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[8.5px] font-extrabold uppercase tracking-wider ml-1 text-slate-400">Category</label>
                    <input
                      readOnly
                      className="w-full rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-bold border border-slate-200 outline-none bg-slate-100 text-slate-400"
                      value={selectedSubCategory}
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              {formState.city.length > 2 && formState.category && (
                <div className="space-y-0.5 animate-in fade-in duration-150">
                  <label className="text-[8.5px] font-extrabold uppercase tracking-wider ml-1 text-slate-400">Password</label>
                  <input
                    type="password"
                    className="w-full rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-bold border border-slate-200 bg-slate-50/20 focus:border-[#4F35C3] focus:bg-white focus:ring-2 focus:ring-[#4F35C3]/5 outline-none transition-all duration-150"
                    value={formState.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="At least 8 characters"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Compact Form Footer Controls */}
        <div className="bg-slate-50/75 border-t border-slate-100 px-3 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button 
            type="button"
            onClick={() => navigate('/vendor/login')} 
            className="text-[11px] sm:text-xs font-extrabold text-[#4F35C3] hover:text-[#3f2aa6] transition-colors"
          >
            Already have an account? Sign In
          </button>
          
          {currentStep === 3 && (
            <button
              type="button"
              className={`w-full sm:w-auto rounded-lg px-5 py-2 text-[11px] sm:text-xs font-extrabold text-white shadow-sm transition-all duration-200 ${
                formState.password.length < 8 
                  ? 'bg-slate-300 opacity-70 cursor-not-allowed shadow-none' 
                  : 'bg-[#4F35C3] hover:shadow-[0_2.5px_8px_rgba(79,53,195,0.12)] hover:brightness-105 active:scale-95'
              }`}
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
          )}
        </div>

      </div>
    </div>
  );
};

export default VendorRegister;
