const SUPABASE_URL = 'https://caqtxoiihlgfsxraawwn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcXR4b2lpaGxnZnN4cmFhd3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDYzMTUsImV4cCI6MjA5ODMyMjMxNX0.UTp-E7vaigpQ_UwvNPoX3ijmJBpIBz0_bAvOB2SQBaI';

// التأكد من Supabase URL
console.log('🔍 Supabase URL:', SUPABASE_URL);
console.log('🔍 Current Domain:', window.location.origin);

// Initialize Supabase client
let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    });
} catch (e) {
    console.error('Supabase initialization failed:', e);
    supabase = {
        auth: {
            getSession: async () => ({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            signInWithOAuth: async () => ({ error: new Error('Supabase not configured') }),
            signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
            signUp: async () => ({ error: new Error('Supabase not configured') }),
            signOut: async () => ({ error: null }),
            updateUser: async () => ({ error: new Error('Supabase not configured') })
        },
        from: () => ({
            select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
            update: () => ({ eq: async () => ({ error: null }) }),
            insert: async () => ({ error: null })
        }),
        storage: {
            from: () => ({
                upload: async () => ({ error: null }),
                getPublicUrl: () => ({ data: { publicUrl: '' } })
            })
        }
    };
}

// ===== Supabase Init Helper =====
function initSupabase() {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        });
        console.log('✅ Supabase initialized');
    } catch (e) {
        console.error('❌ Supabase init failed:', e);
    }
}

// ============================================
// PRODUCTS DATA
// ============================================
const products = [
        {
        id: 1,
        name: 'Adobe Creative Cloud',
        desc: 'جميع برامج Adobe Creative Cloud الكاملة في اشتراك واحد',
        durations: [
            { period: '1 شهر', price: 350, oldPrice: 500, available: true },
            { period: '6 شهور', price: 1500, oldPrice: 2100, available: true },
            { period: '12 شهر', price: 2100, oldPrice: 4200, available: true }
        ],
        defaultDuration: '1 شهر',
        category: 'design',
        icon: '',
        iconImage: 'creative.png',
        iconClass: 'adobe',
        badge: 'hot',
        badgeText: 'الأكثر طلباً',
        features: ['Photoshop + Illustrator', 'Premiere Pro + After Effects', '100GB تخزين سحابي', 'جميع التحديثات'],
        details: {
            fullDesc: 'اشتراك Adobe Creative Cloud الكامل يمنحك وصولاً غير محدود إلى أكثر من 20 برنامج احترافي بما فيها Photoshop, Illustrator, Premiere Pro, After Effects, وغيرها مع 100GB تخزين سحابي وتحديثات مستمرة.',
            duration: 'حسب المدة المختارة',
            delivery: 'خلال 5-15 دقيقة',
            warranty: 'ضمان 24 ساعة',
            support: 'دعم فني 24/7'
        },
        hidden: false
    },
        {
        id: 2,
        name: 'Canva Pro',
        desc: 'Canva Pro مع جميع القوالب والأدوات المتقدمة',
        durations: [
            { period: '1 شهر', price: 150, oldPrice: 500, available: true },
            { period: '6 شهور', price: 550, oldPrice: 2100, available: true },
            { period: '12 شهر', price: 950, oldPrice: 4200, available: true }
        ],
        defaultDuration: '1 شهر',
        category: 'design',
        icon: '',
        iconImage: 'canva.png',
        iconClass: 'canva',
        badge: 'sale',
        badgeText: 'خصم 40%',
        features: ['75 مليون صورة', '100+ مليون مخزون', 'Brand Kit', 'خلفية شفافة'],
        details: {
            fullDesc: 'Canva Pro يمنحك وصولاً غير محدود إلى 75 مليون صورة وفيديو، Brand Kit للعلامة التجارية، وخلفية شفافة للتصاميم.',
            duration: 'حسب المدة المختارة',
            delivery: 'خلال 5-15 دقيقة',
            warranty: 'ضمان 24 ساعة',
            support: 'دعم فني 24/7'
        },
        hidden: false
    },
       {
        id: 3,
        name: 'Figma Pro',
        desc: 'Figma Professional للتصميم التعاوني',
        durations: [
            { period: '1 شهر', price: 250, oldPrice: 350, available: false },
            { period: '6 شهور', price: 1100, oldPrice: 1500, available: false },
            { period: '12 شهر', price: 750, oldPrice: 3000, available: true }
        ],
        defaultDuration: '1 شهر',
        category: 'design',
        icon: '',
        iconImage: 'figma.png',
        iconClass: 'figma',
        badge: null,
        badgeText: '',
        features: ['ملفات غير محدودة', 'مكتبات مشتركة', 'تعليقات متقدمة', 'تاريخ الإصدارات'],
        details: {
            fullDesc: 'Figma Professional يوفر ملفات تصميم غير محدودة، مكتبات مشتركة للفريق، وأدوات تعاون متقدمة في الوقت الفعلي.',
            duration: 'حسب المدة المختارة',
            delivery: 'خلال 5-15 دقيقة',
            warranty: 'ضمان 24 ساعة',
            support: 'دعم فني 24/7'
        },
        hidden: false
    },
    {
        id: 4,
        name: 'CapCut Pro',
        desc: 'اشتراك CapCut Pro الأدوات المتقدمة لتحرير الفيديو',
        durations: [
            { period: '1 شهر', price: 350, oldPrice: 900, available: true },
            { period: '3 شهور', price: 450, oldPrice: 2200, available: true },
            { period: '6 شهور', price: 650, oldPrice: 3500, available: true },
            { period: '12 شهر', price: 1700, oldPrice: 5400, available: true }
        ],
        defaultDuration: '1 شهر',
        category: 'design',
        icon: '',
        iconImage: 'capcut.png',
        iconClass: 'design',
        badge: 'new',
        badgeText: 'جديد',
        features: ['مؤثرات احترافية', 'تصدير بدون علامة مائية', 'مكتبة موسيقى كاملة', 'تحرير 4K'],
        details: {
            fullDesc: 'CapCut Pro يمنحك وصولاً غير محدود إلى جميع المؤثرات الاحترافية، التصدير بدون علامة مائية، مكتبة الموسيقى الكاملة، وتحرير الفيديو بدقة 4K. الاشتراك أصلي 100% ويتم تفعيله فوراً.',
            duration: 'حسب المدة المختارة',
            delivery: 'خلال 5-15 دقيقة',
            warranty: 'ضمان 24 ساعة',
            support: 'دعم فني 24/7'
        },
        hidden: false
    },
    {
        id: 5,
        name: 'Gemini Advanced',
        desc: 'Google Gemini Advanced مع 2TB تخزين سحابي',
        durations: [
            { period: '1 شهر', price: 300, oldPrice: 600, available: true },
            { period: '3 شهور', price: 450, oldPrice: 1000, available: true },
            { period: '12 شهر', price: 2700, oldPrice: 3000, available: true }
        ],
        defaultDuration: '1 شهر',
        category: 'ai',
        icon: '',
        iconImage: 'gemini.png',
        iconClass: 'gemini',
        badge: 'new',
        badgeText: 'جديد',
        features: ['Gemini 1.5 Pro', '2TB Google Drive', 'Gmail مميز', 'بدون إعلانات'],
        details: {
            fullDesc: 'Google One AI Premium يتضمن Gemini Advanced مع 2TB تخزين سحابي، Gmail بدون إعلانات، ووصول مبكر للميزات الجديدة.',
            duration: 'حسب المدة المختارة',
            delivery: 'خلال 5-15 دقيقة',
            warranty: 'ضمان 24 ساعة',
            support: 'دعم فني 24/7'
        },
        hidden: false
    },
       {
        id: 6,
        name: 'ChatGPT Go',
        desc: 'اشتراك ChatGPT Plus مع جميع المميزات المتقدمة',
        durations: [
            { period: '1 شهر', price: 400, oldPrice: 600, available: true },
            { period: '6 شهور', price: 2100, oldPrice: 2700, available: false },
            { period: '12 شهر', price: 3600, oldPrice: 5400, available: false }
        ],
        defaultDuration: '1 شهر',
        category: 'ai',
        icon: '',
        iconImage: 'GPT.png',
        iconClass: 'chatgpt',
        badge: 'hot',
        badgeText: 'الأكثر مبيعاً',
        features: ['GPT-4o متاح', 'DALL-E 3 للصور', 'بدون حدود', 'أولوية الوصول'],
        details: {
            fullDesc: 'ChatGPT Plus يمنحك وصولاً غير محدود إلى GPT-4o، DALL-E 3 لتوليد الصور، وتحليل الملفات. الاشتراك أصلي 100% ويتم تفعيله فوراً.',
            duration: 'حسب المدة المختارة',
            delivery: 'خلال 5-15 دقيقة',
            warranty: 'ضمان 24 ساعة',
            support: 'دعم فني 24/7'
        },
        hidden: false
    }
];

// Payment Methods Data
const paymentMethods = {
    vodafone: {
        name: 'فودافون كاش',
        icon: 'fa-mobile-alt',
        iconClass: 'vodafone',
        number: '201018484572',
        nameDisplay: 'Stack Store',
        instructions: [
            'افتح تطبيق فودافون كاش',
            'اختر "تحويل فلوس"',
            'أدخل الرقم: 201018484572',
            'أدخل المبلغ المطلوب',
            'أرسل إيصال التحويل على واتساب'
        ],
        whatsapp: '201018484572'
    },
    instapay: {
        name: 'إنستا باي',
        icon: 'fa-university',
        iconClass: 'instapay',
        number: 'stackstore@instapay',
        nameDisplay: 'Stack Store',
        instructions: [
            'افتح تطبيق إنستا باي',
            'اختر "تحويل"',
            'أدخل الـ Username: stackstore',
            'أدخل المبلغ المطلوب',
            'أرسل إيصال التحويل على واتساب'
        ],
        whatsapp: '201000000000'
    },
    fawry: {
        name: 'فوري',
        icon: 'fa-store',
        iconClass: 'fawry',
        number: 'كود: 123456',
        nameDisplay: 'Stack Store',
        instructions: [
            'اذهب لأقرب منفذ فوري',
            'اطلب دفع فاتورة',
            'أدخل الكود: 123456',
            'ادفع المبلغ المطلوب',
            'أرسل إيصال الدفع على واتساب'
        ],
        whatsapp: '201000000000'
    },
    orange: {
        name: 'أورانج كاش',
        icon: 'fa-mobile',
        iconClass: 'orange',
        number: '0120 000 0000',
        nameDisplay: 'Stack Store',
        instructions: [
            'افتح تطبيق أورانج كاش',
            'اختر "تحويل"',
            'أدخل الرقم: 0120 000 0000',
            'أدخل المبلغ المطلوب',
            'أرسل إيصال التحويل على واتساب'
        ],
        whatsapp: '201000000000'
    },
    we: {
        name: 'WE Pay',
        icon: 'fa-signal',
        iconClass: 'we',
        number: '0150 000 0000',
        nameDisplay: 'Stack Store',
        instructions: [
            'افتح تطبيق WE Pay',
            'اختر "تحويل"',
            'أدخل الرقم: 0150 000 0000',
            'أدخل المبلغ المطلوب',
            'أرسل إيصال التحويل على واتساب'
        ],
        whatsapp: '201000000000'
    },
    bank: {
        name: 'تحويل بنكي',
        icon: 'fa-landmark',
        iconClass: 'bank',
        number: 'EG910002000000000000000000000',
        nameDisplay: 'Stack Store',
        instructions: [
            'اذهب لأقرب فرع بنكي',
            'اطلب تحويل على الحساب البنكي',
            'أدخل رقم الحساب الموضح',
            'ادفع المبلغ المطلوب',
            'أرسل إيصال التحويل على واتساب'
        ],
        whatsapp: '201000000000'
    }
};

// ============================================
// CURRENCY SYSTEM
// ============================================

const CURRENCY_RATES = {
    EGP: { rate: 1, symbol: 'ج.م', flag: '🇪🇬', name: 'جنيه مصري' },
    SAR: { rate: 0.077, symbol: 'ر.س', flag: '🇸🇦', name: 'ريال سعودي' },
    AED: { rate: 0.075, symbol: 'د.إ', flag: '🇦🇪', name: 'درهم إماراتي' },
    KWD: { rate: 0.00625, symbol: 'د.ك', flag: '🇰🇼', name: 'دينار كويتي' },
    USD: { rate: 0.020, symbol: '$', flag: '🇺🇸', name: 'دولار أمريكي' }
};

let currentCurrency = localStorage.getItem('stackStoreCurrency') || 'EGP';

// Initialize currency
function initCurrency() {
    const saved = localStorage.getItem('stackStoreCurrency');
    if (saved && CURRENCY_RATES[saved]) currentCurrency = saved;
    updateCurrencyUI();
    updateAllPrices();
}

// Toggle dropdown
function toggleCurrencyDropdown(event) {
    event.stopPropagation();
    document.getElementById('currencyDropdown').classList.toggle('active');
    document.getElementById('currencyBtn').classList.toggle('active');
}

// Close on outside click
document.addEventListener('click', (e) => {
    const selector = document.getElementById('currencySelector');
    if (selector && !selector.contains(e.target)) {
        document.getElementById('currencyDropdown').classList.remove('active');
        document.getElementById('currencyBtn').classList.remove('active');
    }
});

// Select currency
function selectCurrency(currency) {
    // ✅ FIX: Validate currency exists
    if (!CURRENCY_RATES[currency]) {
        console.warn('Invalid currency selected:', currency);
        showToast('❌ العملة غير صالحة');
        return;
    }
    
    currentCurrency = currency;
    localStorage.setItem('stackStoreCurrency', currency);

    document.querySelectorAll('.currency-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.currency === currency);
    });

    updateCurrencyUI();
    updateAllPrices();

    document.getElementById('currencyDropdown').classList.remove('active');
    document.getElementById('currencyBtn').classList.remove('active');

    showToast(`تم تغيير العملة إلى ${CURRENCY_RATES[currency].name}`);
}

// Update UI
function updateCurrencyUI() {
    const c = CURRENCY_RATES[currentCurrency];
    if (!c) return;
    document.getElementById('currencyFlag').textContent = c.flag;
    document.getElementById('currencyCode').textContent = currentCurrency;
}

// Convert EGP to current currency
function convertPrice(egp) {
    // ✅ FIX: Guard against undefined, null, NaN, or non-numeric values
    if (egp === undefined || egp === null || egp === '' || isNaN(Number(egp))) {
        console.warn('convertPrice received invalid value:', egp, '- returning 0');
        return '0';
    }
    const numEgp = Number(egp);
    const rate = CURRENCY_RATES[currentCurrency]?.rate || 1;
    const converted = numEgp * rate;
    if (currentCurrency === 'KWD') return converted.toFixed(3);
    if (currentCurrency === 'USD') return converted.toFixed(2);
    return Math.round(converted).toLocaleString('en-US');
}

// Format price as HTML
function formatPrice(egp, showOriginal = false) {
    const c = CURRENCY_RATES[currentCurrency];
    // ✅ FIX: Check if currency exists
    if (!c) {
        console.warn('Currency not found:', currentCurrency);
        return `<span class="price-converted">${egp || 0} ج.م</span>`;
    }
    const converted = convertPrice(egp);
    let html = `<span class="price-converted">${converted} ${c.symbol}</span>`;
    if (showOriginal && currentCurrency !== 'EGP') {
        const originalPrice = (egp !== undefined && egp !== null && !isNaN(Number(egp))) ? Number(egp) : 0;
        html += `<span class="price-original">${originalPrice} ج.م</span>`;
    }
    return html;
}

// Get plain text price
function getFormattedPrice(egp) {
    const c = CURRENCY_RATES[currentCurrency];
    // ✅ FIX: Check if currency exists
    if (!c) {
        console.warn('Currency not found for getFormattedPrice:', currentCurrency);
        return `${egp || 0} ج.م`;
    }
    return `${convertPrice(egp)} ${c.symbol}`;
}

// Update all prices on page
function updateAllPrices() {
    // ✅ FIX: Validate currency is set and valid
    if (!CURRENCY_RATES[currentCurrency]) {
        console.warn('Invalid currency, resetting to EGP:', currentCurrency);
        currentCurrency = 'EGP';
        localStorage.setItem('stackStoreCurrency', 'EGP');
        updateCurrencyUI();
    }

    // Product cards
    document.querySelectorAll('.product-card').forEach(card => {
        const p = products.find(x => x.id === parseInt(card.dataset.id));
        if (!p) return;
        
        // ✅ FIX: Get current price based on selected duration
        const { price, oldPrice } = getProductPrice(p);
        
        const pc = card.querySelector('.price-current');
        const po = card.querySelector('.price-old');
        if (pc) pc.innerHTML = formatPrice(price, true);
        if (po) po.innerHTML = formatPrice(oldPrice);
    });

    // Cart
    updateCart();

    // Payment modal
    if (document.getElementById('paymentModal')?.classList.contains('active')) {
        renderOrderSummary();
    }

    // Credits
    updateCreditsTotal();
}

// Add click handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.currency-option').forEach(opt => {
        opt.addEventListener('click', () => selectCurrency(opt.dataset.currency));
    });
});

// Cart State
let cart = [];
let currentUser = null;
let userCredits = 0;
let pendingCreditsAmount = 0;
let pendingCreditsPrice = 0;

// ===== AUTH STATE MANAGEMENT =====
// Prevents UI flicker on page refresh
let authState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
    error: null
};

// Helper: show loading state in UI while auth is being determined
function showAuthLoadingState() {
    const avatar = document.getElementById('userAvatar');
    const dropdownUsername = document.getElementById('dropdownUsername');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const creditsOption = document.getElementById('creditsPaymentOption');
    const adminPanelLink = document.getElementById('adminPanelLink');
    
    // Show spinner in avatar while loading
    if (avatar) {
        avatar.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    }
    if (dropdownUsername) dropdownUsername.textContent = '...';
    if (dropdownEmail) dropdownEmail.textContent = '';
    if (creditsOption) creditsOption.style.display = 'none';
    if (adminPanelLink) adminPanelLink.style.display = 'none';
}

// ===== LocalStorage Cart =====
function saveCart() {
    localStorage.setItem('stackStoreCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('stackStoreCart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
            updateCart();
        } catch (e) {
            cart = [];
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

// ===== DOM Elements =====
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');
const paymentModal = document.getElementById('paymentModal');
const paymentClose = document.getElementById('paymentClose');
const paymentDetailsModal = document.getElementById('paymentDetailsModal');
const paymentDetailsClose = document.getElementById('paymentDetailsClose');
const paymentDetailsContent = document.getElementById('paymentDetailsContent');
const manualPaymentModal = document.getElementById('manualPaymentModal');
const manualPaymentClose = document.getElementById('manualPaymentClose');
const paymentMethodsList = document.getElementById('paymentMethodsList');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const contactForm = document.getElementById('contactForm');
const creditsPaymentModal = document.getElementById('creditsPaymentModal');

// ============================================
// SUPABASE AUTH FUNCTIONS
// ============================================

// Format credits number with commas
function formatCredits(num) {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString('en-US');
}

// Check auth state on load - FINAL FIX for refresh issue
async function initAuth() {
    try {
        console.log('🔍 Checking auth state...');
        
        // Set loading state FIRST
        authState = { isLoading: true, isAuthenticated: false, user: null, error: null };
        showAuthLoadingState();
        
        // ✅ تأكد إن supabase initialized
        if (!supabase) {
            console.error('❌ Supabase not initialized!');
            try {
                supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                    auth: {
                        autoRefreshToken: true,
                        persistSession: true,
                        detectSessionInUrl: true
                    }
                });
                console.log('✅ Supabase re-initialized');
            } catch (e) {
                console.error('❌ Failed to re-initialize Supabase:', e);
                authState = { isLoading: false, isAuthenticated: false, user: null, error: e };
                updateUIForAuth();
                return;
            }
        }
        
        const url = new URL(window.location.href);
        const authSuccess = url.searchParams.get('auth');
        const authError = url.searchParams.get('auth_error');
        
        if (authSuccess === 'success') {
            window.history.replaceState({}, document.title, window.location.pathname);
            showToast('✅ تم تسجيل الدخول بنجاح!');
        }
        
        if (authError) {
            window.history.replaceState({}, document.title, window.location.pathname);
            showToast('❌ خطأ في تسجيل الدخول: ' + decodeURIComponent(authError));
        }
        
        // 🔥 الحل: استنى onAuthStateChange يخلص الأول (500ms) عشان Supabase يحمل الـ session
        // ده بيحل مشكلة الـ refresh لأن Supabase بياخد وقت يقرا الـ session من localStorage
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 🔄 جرب تجيب الـ session بعد ما تستنى
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
            console.error('❌ Session error:', sessionError);
            authState = { isLoading: false, isAuthenticated: false, user: null, error: sessionError };
            currentUser = null;
            updateUIForAuth();
            return;
        }
        
        if (session && session.user) {
            console.log('✅ User logged in:', session.user.email);
            currentUser = session.user;
            authState = { isLoading: false, isAuthenticated: true, user: session.user, error: null };
            
            // ✅ جلب البيانات من Supabase
            try {
                await loadUserData(currentUser.id);
            } catch (loadError) {
                console.error('⚠️ loadUserData failed:', loadError);
                loadUserDataFromLocalStorage(currentUser.id);
            }
            
            // ✅ Sync Credits
            try {
                await syncCreditsFromDatabase();
            } catch (syncError) {
                console.error('⚠️ syncCredits failed:', syncError);
            }
            
        } else {
            console.log('ℹ️ No active session');
            currentUser = null;
            userCredits = 0;
            authState = { isLoading: false, isAuthenticated: false, user: null, error: null };
        }
        
    } catch (e) {
        console.error('❌ Auth init error:', e.message);
        currentUser = null;
        userCredits = 0;
        authState = { isLoading: false, isAuthenticated: false, user: null, error: e };
    }
    
    // ✅ حدّث الـ UI بعد ما تخلص
    updateUIForAuth();
}

// Listen for auth changes - FINAL FIX
// ⚠️ مهم: onAuthStateChange بيطلق EVENTS بس، مش بيرجع الـ session الحالي
// الـ session الحالي بنجيبه من getSession() في initAuth()
let authStateChangeHandled = false;

supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔔 Auth state change:', event, 'session:', session?.user?.email || 'none');
    
    // منع التكرار - لو initAuth() لسه شغالة، سيبها تكمل
    if (authState.isLoading) {
        console.log('⏳ initAuth() still running, skipping onAuthStateChange');
        return;
    }
    
    if (event === 'SIGNED_IN' && session) {
        authState = { isLoading: false, isAuthenticated: true, user: session.user, error: null };
        currentUser = session.user;
        
        // جلب البيانات
        try {
            await loadUserData(currentUser.id);
        } catch (e) {
            loadUserDataFromLocalStorage(currentUser.id);
        }
        
        updateUIForAuth();
        closeAuthModal();
        showToast('تم تسجيل الدخول بنجاح!');
        
    } else if (event === 'SIGNED_OUT') {
        authState = { isLoading: false, isAuthenticated: false, user: null, error: null };
        currentUser = null;
        userCredits = 0;
        updateUIForAuth();
        showToast('تم تسجيل الخروج');
        
    } else if (event === 'INITIAL_SESSION') {
        // ده بيطلق لما Supabase يلاقي session قديم
        // بس احنا بنتعامل معاه في initAuth() عشان نضمن الترتيب
        console.log('ℹ️ INITIAL_SESSION - will be handled by initAuth()');
    } else if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed');
    }
});

// ===== Load user data from LocalStorage (fallback) =====
function loadUserDataFromLocalStorage(userId) {
    const savedData = localStorage.getItem('stackStoreUserData_' + userId);
    if (!savedData) return;
    
    try {
        const parsed = JSON.parse(savedData);
        userCredits = parsed.credits || 0;
        
        const dropdownUsername = document.getElementById('dropdownUsername');
        const dropdownEmail = document.getElementById('dropdownEmail');
        const profilePic = document.getElementById('profilePicture');
        
        if (dropdownUsername) {
            dropdownUsername.textContent = parsed.username || parsed.display_name || 'مستخدم';
        }
        if (dropdownEmail) {
            dropdownEmail.textContent = parsed.email || '';
        }
        if (profilePic && parsed.photo_url) {
            profilePic.innerHTML = `<img src="${parsed.photo_url}" alt="Profile">`;
        }
        
        updateWalletDisplay();
        console.log('✅ Loaded user data from LocalStorage');
    } catch (e) {
        console.error('❌ Error loading from LocalStorage:', e);
    }
}

async function loadUserData(userId) {
    try {
        let displayName = '';
        let username = '';
        let birthDate = '';
        let photoUrl = '';
        let credits = 0;
        
        // 1. جرب تجيب من Supabase
        const { data: dbUser, error: dbError } = await supabase
            .from('users')
            .select('username, display_name, birth_date, photo_url, credits')
            .eq('id', userId)
            .single();
            
        if (dbUser && !dbError) {
            username = dbUser.username || '';
            displayName = dbUser.display_name || '';
            birthDate = dbUser.birth_date || '';
            photoUrl = dbUser.photo_url || '';
            credits = dbUser.credits || 0;
            console.log('✅ Loaded from Supabase:', { username, credits, photoUrl });
        } else {
            throw new Error('Supabase load failed: ' + (dbError?.message || 'no data'));
        }

        // 2. 🔥 تحديث الصورة في كل الأماكن (باستخدام updateProfileImages)
        if (photoUrl) {
            updateProfileImages(photoUrl);
        }

        // 3. تحديث الحقول
        const displayNameInput = document.getElementById('accountDisplayName');
        if (displayNameInput) displayNameInput.value = displayName;

        const usernameInput = document.getElementById('accountUsername');
        if (usernameInput) usernameInput.value = username;

        const birthDateInput = document.getElementById('accountBirthDate');
        if (birthDateInput) birthDateInput.value = birthDate;

        // 4. تحديث الـ dropdown
        const dropdownUsername = document.getElementById('dropdownUsername');
        const dropdownEmail = document.getElementById('dropdownEmail');
        if (dropdownUsername) {
            dropdownUsername.textContent = username || displayName || 'مستخدم';
        }
        if (dropdownEmail) {
            dropdownEmail.textContent = currentUser?.email || '';
        }

        // 5. تحديث Credits
        if (!isAdmin()) {
            userCredits = credits;
        } else {
            userCredits = credits || 100000000;
        }
        
        updateWalletDisplay();

        // 6. حفظ في LocalStorage (sync)
        const userData = {
            display_name: displayName,
            username: username,
            birth_date: birthDate,
            photo_url: photoUrl,
            credits: userCredits,
            email: currentUser?.email,
            saved_at: new Date().toISOString()
        };
        localStorage.setItem('stackStoreUserData_' + userId, JSON.stringify(userData));

    } catch (error) {
        console.error('❌ Error in loadUserData:', error);
        throw error;
    }
}

function updateUIForAuth() {
    const avatar = document.getElementById('userAvatar');
    const dropdownUsername = document.getElementById('dropdownUsername');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const creditsOption = document.getElementById('creditsPaymentOption');
    const creditsBalance = document.getElementById('creditsBalance');
    const adminPanelLink = document.getElementById('adminPanelLink');

    console.log('🔄 updateUIForAuth called, authState:', authState);

    // ⏳ لو لسه في حالة تحميل، متعملش حاجة (showAuthLoadingState خلاص شغال)
    if (authState.isLoading) {
        console.log('⏳ Auth still loading...');
        return;
    }

    if (authState.isAuthenticated && currentUser) {
        // ✅ User مسجل دخول
        let displayName = '';
        let username = '';
        let credits = 0;
        
        // جرب LocalStorage أولاً (أسرع)
        const savedData = localStorage.getItem('stackStoreUserData_' + currentUser.id);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                displayName = parsed.display_name || '';
                username = parsed.username || '';
                credits = parsed.credits || 0;
            } catch (e) {}
        }

        // لو مفيش، جرب من user_metadata
        if (!displayName) {
            displayName = currentUser.user_metadata?.display_name || '';
        }
        if (!username) {
            username = currentUser.user_metadata?.username || '';
        }

         // الصورة - جرب LocalStorage الأول (أسرع وأكثر موثوقية)
        if (avatar) {
            const savedData = localStorage.getItem('stackStoreUserData_' + currentUser.id);
            let photoUrl = null;
            
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    photoUrl = parsed.photo_url;
                } catch (e) {}
            }
            
            // لو مفيش في LocalStorage، جرب من user_metadata
            if (!photoUrl) {
                photoUrl = currentUser.user_metadata?.avatar_url;
            }
            
            if (photoUrl) {
                updateProfileImages(photoUrl);
            } else {
                avatar.innerHTML = '<i class="fas fa-user"></i>';
            }
        }

        // الـ dropdown
        if (dropdownUsername) {
            dropdownUsername.textContent = username || displayName || 'مستخدم';
        }
        if (dropdownEmail) {
            dropdownEmail.textContent = currentUser.email || '';
        }

        // Admin panels
        if (adminPanelLink) {
            adminPanelLink.style.display = isAdmin() ? 'flex' : 'none';
        }
        const ordersPanelLink = document.getElementById('ordersPanelLink');
        if (ordersPanelLink) {
            ordersPanelLink.style.display = isAdmin() ? 'flex' : 'none';
        }

        // Credits
        if (isAdmin()) {
            userCredits = credits || 100000000;
        } else {
            userCredits = credits;
        }

        if (creditsOption) creditsOption.style.display = 'block';
        if (creditsBalance) creditsBalance.textContent = formatCredits(userCredits);
        
        updateWalletDisplay();

        console.log('✅ UI updated for logged in user');

    } else {
        // ✅ Guest
        console.log('ℹ️ Showing guest UI');
        if (avatar) avatar.innerHTML = '<i class="fas fa-user"></i>';
        if (dropdownUsername) dropdownUsername.textContent = 'زائر';
        if (dropdownEmail) dropdownEmail.textContent = '';
        if (creditsOption) creditsOption.style.display = 'none';
        if (adminPanelLink) adminPanelLink.style.display = 'none';
    }
}

function updateWalletDisplay() {
    const walletBalance = document.getElementById('walletBalance');
    const creditsBalance = document.getElementById('creditsBalance');
    
    const formattedCredits = formatCredits(userCredits);
    
    if (walletBalance) walletBalance.textContent = formattedCredits;
    if (creditsBalance) creditsBalance.textContent = formattedCredits;
    
    console.log('💰 Wallet updated:', formattedCredits);
}

// ===== Account Dropdown =====
function toggleAccountMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('accountDropdown');

    if (!currentUser) {
        openAuthModal();
        return;
    }

    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const account = document.getElementById('userAccount');
    const dropdown = document.getElementById('accountDropdown');
    if (account && dropdown && !account.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// ===== Auth Modal =====
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

    if (tab === 'login') {
        document.querySelectorAll('.auth-tab')[0].classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelectorAll('.auth-tab')[1].classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }
}

// ===== Password Toggle =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const btn = input.parentElement.parentElement.querySelector('.toggle-password');
    const icon = btn.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ===== Google Login =====
async function loginWithGoogle() {
    try {
        console.log('🔐 Starting Google login...');
        
        // نحدد رابط الـ callback بوضوح
        const redirectTo = window.location.origin + '/auth-callback.html';
        console.log('Redirect to:', redirectTo);
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectTo,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'select_account'
                }
            }
        });
        
        if (error) {
            console.error('Google login error:', error);
            throw error;
        }
        
        // data.url هو رابط Google لتسجيل الدخول
        if (data?.url) {
            console.log('✅ Redirecting to Google...');
            window.location.href = data.url;
        }
        
    } catch (error) {
        console.error('❌ Google login error:', error);
        showToast('❌ حدث خطأ: ' + error.message);
    }
}

// ===== Email Login =====
async function loginWithEmail() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showToast('يرجى ملء جميع الحقول');
        return;
    }

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) throw error;
    } catch (error) {
        if (error.message.includes('Invalid login')) {
            showToast('البريد أو كلمة المرور غير صحيحة');
        } else {
            showToast('حدث خطأ: ' + error.message);
        }
    }
}

// ===== Email Registration =====
async function registerWithEmail() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    if (!email || !password || !passwordConfirm) {
        showToast('يرجى ملء جميع الحقول');
        return;
    }

    if (!validateEmail(email)) {
        showToast('يرجى إدخال إيميل صحيح');
        return;
    }

    if (password.length < 6) {
        showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
    }

    if (password !== passwordConfirm) {
        showToast('كلمتا المرور غير متطابقتين');
        return;
    }

    try {
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        if (error) throw error;
        showToast('تم إنشاء الحساب! يرجى تأكيد الإيميل');
    } catch (error) {
        if (error.message.includes('already registered')) {
            showToast('هذا الإيميل مستخدم بالفعل');
        } else {
            showToast('حدث خطأ: ' + error.message);
        }
    }
}

// ===== Logout =====
async function logoutUser() {
    try {
        console.log('🚪 Logging out...');
        
        // 1. مسح بيانات المستخدم من LocalStorage
        if (currentUser && currentUser.id) {
            localStorage.removeItem('stackStoreUserData_' + currentUser.id);
        }
        
        // 2. تسجيل الخروج من Supabase
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Supabase logout error:', error);
        }
        
        // 3. مسح المتغيرات المحلية
        currentUser = null;
        userCredits = 0;
        
        // 4. إغلاق الـ dropdown
        const dropdown = document.getElementById('accountDropdown');
        if (dropdown) dropdown.classList.remove('active');
        
        // 5. تحديث الـ UI
        updateUIForAuth();
        
        // 6. رسالة نجاح
        showToast('👋 تم تسجيل الخروج بنجاح');
        
        // 7. إعادة تحميل الصفحة بعد ثانية
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    } catch (error) {
        console.error('❌ Logout error:', error);
        showToast('❌ حدث خطأ أثناء تسجيل الخروج');
    }
}

// ===== Account Page =====
function openAccountPage() {
    if (!currentUser) {
        openAuthModal();
        return;
    }
    document.getElementById('accountDropdown').classList.remove('active');
    document.getElementById('accountPageModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAccountPage() {
    document.getElementById('accountPageModal').classList.remove('active');
    document.body.style.overflow = '';
}

async function uploadProfilePicture(input) {
    const file = input.files[0];
    if (!file) {
        console.log('No file selected');
        return;
    }
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول أولاً');
        return;
    }

    console.log('📸 Uploading:', file.name, 'Size:', file.size);

    try {
        // التحقق من نوع الملف
        if (!file.type.startsWith('image/')) {
            showToast('❌ يرجى اختيار ملف صورة');
            return;
        }

        // التحقق من حجم الملف (أقصى 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showToast('❌ حجم الصورة كبير جداً (أقصى 2MB)');
            return;
        }

        const fileExt = file.name.split('.').pop().toLowerCase();
        const fileName = `${currentUser.id}_${Date.now()}.${fileExt}`;

        console.log('Uploading to avatars bucket...');

        // رفع الصورة
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, file, { 
                upsert: true,
                contentType: file.type
            });

        if (uploadError) {
            console.error('❌ Upload error:', uploadError);
            throw uploadError;
        }

        console.log('✅ Uploaded to storage:', uploadData);

        // جلب الـ Public URL
        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;
        console.log('🔗 Public URL:', publicUrl);

        // 🔥 تحديث الصورة في الـ UI فوراً
        updateProfileImages(publicUrl);

        // 🔥 حفظ في Supabase DB
        const { error: updateError } = await supabase
            .from('users')
            .update({ photo_url: publicUrl })
            .eq('id', currentUser.id);

        if (updateError) {
            console.error('❌ DB update error:', updateError);
        } else {
            console.log('✅ Saved to DB');
        }

        // 🔥 حفظ في LocalStorage
        const savedData = localStorage.getItem('stackStoreUserData_' + currentUser.id);
        let userData = savedData ? JSON.parse(savedData) : {};
        userData.photo_url = publicUrl;
        localStorage.setItem('stackStoreUserData_' + currentUser.id, JSON.stringify(userData));

        // 🔥 تحديث currentUser.user_metadata
        if (currentUser.user_metadata) {
            currentUser.user_metadata.avatar_url = publicUrl;
        }

        showToast('✅ تم تحديث الصورة بنجاح!');

    } catch (error) {
        console.error('❌ Upload error:', error);
        showToast('❌ خطأ في رفع الصورة: ' + error.message);
    }
}

// دالة منفصلة لتحديث الصور
function updateProfileImages(imageUrl) {
    console.log('🔄 Updating images to:', imageUrl);
    
    if (!imageUrl) {
        console.log('⚠️ No image URL provided');
        return;
    }
    
    // تحديث في إعدادات الحساب (Account Page)
    const profilePic = document.getElementById('profilePicture');
    if (profilePic) {
        profilePic.innerHTML = '';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Profile';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center';
        img.style.borderRadius = '50%';
        img.onload = () => console.log('✅ Account page image loaded');
        img.onerror = () => {
            console.log('❌ Account image failed, reverting to icon');
            profilePic.innerHTML = '<i class="fas fa-user"></i>';
        };
        profilePic.appendChild(img);
    }

    // تحديث في الـ navbar
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        userAvatar.innerHTML = '';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Profile';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center';
        img.style.borderRadius = '50%';
        img.onload = () => console.log('✅ Navbar image loaded');
        img.onerror = () => {
            console.log('❌ Navbar image failed, reverting to icon');
            userAvatar.innerHTML = '<i class="fas fa-user"></i>';
        };
        userAvatar.appendChild(img);
    }
}

async function saveAccountSettings() {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول أولاً');
        return;
    }

    const displayName = document.getElementById('accountDisplayName').value.trim();
    const username = document.getElementById('accountUsername').value.trim().toLowerCase();
    const birthDate = document.getElementById('accountBirthDate').value;

    if (!displayName) {
        showToast('⚠️ يرجى إدخال اسمك');
        return;
    }

    if (username && !/^[a-z0-9_]{4,15}$/.test(username)) {
        showToast('⚠️ اسم المستخدم غير صالح');
        return;
    }

    try {
        // ✅ تأكد إن supabase شغال
        if (!supabase) {
            showToast('❌ خطأ في الاتصال');
            return;
        }

        // 1. حفظ في Supabase
        const { data, error } = await supabase.rpc('update_user_profile', {
            p_username: username,
            p_display_name: displayName,
            p_birth_date: birthDate || null
        });

        if (error) {
            console.error('❌ RPC error:', error);
            showToast('⚠️ فشل: ' + error.message);
            return;
        }

        console.log('✅ Profile updated in DB');

        // 2. تحديث LocalStorage
        const savedData = localStorage.getItem('stackStoreUserData_' + currentUser.id);
        let existingData = savedData ? JSON.parse(savedData) : {};
        
        const userData = {
            ...existingData,
            display_name: displayName,
            username: username,
            birth_date: birthDate,
            email: currentUser.email,
            credits: existingData.credits || 0,
            saved_at: new Date().toISOString()
        };
        localStorage.setItem('stackStoreUserData_' + currentUser.id, JSON.stringify(userData));

        // 3. تحديث الـ UI
        const dropdownUsername = document.getElementById('dropdownUsername');
        if (dropdownUsername) {
            dropdownUsername.textContent = username || displayName || 'مستخدم';
        }

        showToast('✅ تم حفظ التغييرات بنجاح!');

    } catch (error) {
        console.error('Save error:', error);
        showToast('❌ حدث خطأ: ' + error.message);
    }
}

// ===== Account Page Username Validation =====
function validateAccountUsername(value) {
    const input = document.getElementById('accountUsername');
    const status = document.getElementById('accountUsernameStatus');
    const errorMsg = document.getElementById('accountUsernameError');
    const hintMsg = document.getElementById('accountUsernameHint');

    if (!input || !status) return;

    const trimmed = value.trim().toLowerCase();

    // Empty - just show hint, no error
    if (!trimmed) {
        input.classList.remove('valid', 'invalid', 'checking');
        status.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        status.className = 'username-status checking';
        if (errorMsg) errorMsg.classList.remove('show');
        if (hintMsg) hintMsg.style.display = 'flex';
        return;
    }

    // Check format
    const isValidFormat = /^[a-z0-9_]{4,15}$/.test(trimmed);

    if (!isValidFormat) {
        input.classList.add('invalid');
        input.classList.remove('valid', 'checking');
        status.innerHTML = '<i class="fas fa-times-circle"></i>';
        status.className = 'username-status invalid';
        if (errorMsg) errorMsg.classList.add('show');
        if (hintMsg) hintMsg.style.display = 'none';
        return;
    }

    // Valid format
    input.classList.add('valid');
    input.classList.remove('invalid', 'checking');
    status.innerHTML = '<i class="fas fa-check-circle"></i>';
    status.className = 'username-status available';
    if (errorMsg) errorMsg.classList.remove('show');
    if (hintMsg) hintMsg.style.display = 'none';
}

async function changePassword() {
    if (!currentUser) return;

    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirm = document.getElementById('newPasswordConfirm').value;

    if (!newPassword || !newPasswordConfirm) {
        showToast('يرجى ملء جميع حقول كلمة المرور');
        return;
    }

    if (newPassword !== newPasswordConfirm) {
        showToast('كلمتا المرور غير متطابقتين');
        return;
    }

    if (newPassword.length < 6) {
        showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
    }

    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;

        showToast('تم تغيير كلمة المرور!');
        document.getElementById('newPassword').value = '';
        document.getElementById('newPasswordConfirm').value = '';
        document.getElementById('oldPassword').value = '';
    } catch (error) {
        showToast('حدث خطأ: ' + error.message);
    }
}

// ===== Theme =====
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.theme-btn').classList.add('active');
}

// ===== Wallet Page =====
function openWalletPage() {
    if (!currentUser) {
        openAuthModal();
        return;
    }
    document.getElementById('accountDropdown').classList.remove('active');
    document.getElementById('walletPageModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    updateWalletDisplay();
}

function closeWalletPage() {
    document.getElementById('walletPageModal').classList.remove('active');
    document.body.style.overflow = '';
}

function setCreditsAmount(amount) {
    document.getElementById('creditsAmount').value = amount;
    updateCreditsTotal();
}

function updateCreditsTotal() {
    const input = document.getElementById('creditsAmount');
    let amount = parseInt(input.value) || 0;

    const rounded = Math.round(amount / 5) * 5;
    if (rounded !== amount && amount > 0) {
        input.value = rounded;
        amount = rounded;
    }

    const price = (amount / 5).toFixed(2);
    const totalEl = document.getElementById('creditsTotalPrice');
    if (totalEl) totalEl.textContent = price + ' EGP';
}

// Attach event listener for credits input
const creditsAmountInput = document.getElementById('creditsAmount');
if (creditsAmountInput) {
    creditsAmountInput.addEventListener('input', updateCreditsTotal);
}

// ===== Credits Payment Flow =====
function addCredits() {
    if (!currentUser) {
        openAuthModal();
        return;
    }

    const amount = parseInt(document.getElementById('creditsAmount').value) || 0;
    if (amount < 5) {
        showToast('الحد الأدنى للشحن هو 5 Credits');
        return;
    }

    // التقريب لأقرب 5
    const rounded = Math.round(amount / 5) * 5;
    const price = (rounded / 5).toFixed(2);
    
    pendingCreditsAmount = rounded;
    pendingCreditsPrice = price;

    // نغلق محفظة الرصيد
    closeWalletPage();

    // نملأ واجهة الدفع الجديدة
    const creditsOrderSummary = document.getElementById('creditsOrderSummary');
    const creditsPaymentTotal = document.getElementById('creditsPaymentTotal');

    if (creditsOrderSummary) {
        creditsOrderSummary.innerHTML = `
            <div class="order-item" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 15px; margin-bottom: 15px;">
                <div class="order-item-info">
                    <div class="order-item-icon" style="background: rgba(255,215,0,0.1); color: #FFD700; width: 50px; height: 50px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                        <i class="fas fa-coins"></i>
                    </div>
                    <div class="order-item-details">
                        <h4 style="font-size: 1.1rem; margin-bottom: 5px;">شحن رصيد Credits</h4>
                        <span class="order-item-price" style="color: var(--secondary); font-weight: 600;">${pendingCreditsAmount} Credits</span>
                    </div>
                </div>
            </div>
            <div class="credits-rate-display">
                <i class="fas fa-exchange-alt"></i>
                <span>5 Credits = 1 EGP</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 0.9rem; color: var(--gray-light);">
                <span>الكمية:</span>
                <span>${pendingCreditsAmount} Credits</span>
            </div>
        `;
    }

    if (creditsPaymentTotal) {
        creditsPaymentTotal.textContent = pendingCreditsPrice + ' EGP';
    }

    // نفتح واجهة الدفع الجديدة
    const modal = document.getElementById('creditsPaymentModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCreditsPaymentModal() {
    const modal = document.getElementById('creditsPaymentModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== NEW: Credits Manual Payment Selector =====
function openCreditsManualSelector() {
    closeCreditsPaymentModal();

    const visibleMethods = ['vodafone', 'instapay'];

    paymentMethodsList.innerHTML = visibleMethods.map(key => {
        const method = paymentMethods[key];
        return `
            <div class="payment-method-card" onclick="selectCreditsManualMethod('${key}')">
                <div class="pm-icon ${method.iconClass}">
                    <i class="fas ${method.icon}"></i>
                </div>
                <div class="pm-info">
                    <h4>${method.name}</h4>
                    <p>الدفع عبر ${method.name}</p>
                </div>
                <i class="fas fa-chevron-left"></i>
            </div>
        `;
    }).join('');

    manualPaymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function selectCreditsManualMethod(methodKey) {
    // ❌ لا تستخدم closeManualPaymentSelector() — هي بتفتح paymentModal
    // بدلاً من كده، نغلق manualPaymentModal مباشرة
    manualPaymentModal.classList.remove('active');
    
    const method = paymentMethods[methodKey];
    const totalPrice = pendingCreditsPrice;
    const creditsAmount = pendingCreditsAmount;

    // التحقق من البيانات
    if (!creditsAmount || creditsAmount <= 0) {
        showToast('خطأ: لم يتم تحديد كمية الرصيد');
        closePaymentDetailsModal();
        return;
    }

    // نفتح واجهة الدفع اليدوي مع بيانات الرصيد
    paymentDetailsContent.innerHTML = `
        <div class="pd-header">
            <div class="pd-icon ${method.iconClass}">
                <i class="fas ${method.icon}"></i>
            </div>
            <h3>شحن رصيد Credits</h3>
            <p>اتبع الخطوات التالية لإتمام شحن الرصيد</p>
        </div>
        
        <div class="pd-details">
            <div class="pd-row">
                <span>نوع العملية:</span>
                <span>شحن رصيد Credits</span>
            </div>
            <div class="pd-row">
                <span>الكمية:</span>
                <span style="color: #FFD700; font-weight: 700;">${creditsAmount} Credits</span>
            </div>
            <div class="pd-row">
                <span>اسم المستلم:</span>
                <span>${method.nameDisplay}</span>
            </div>
            <div class="pd-row">
                <span>رقم التحويل:</span>
                <div class="copyable">
                    <span id="copyNumber">${method.number}</span>
                    <button class="btn-copy" onclick="copyToClipboard('copyNumber', this)">نسخ</button>
                </div>
            </div>
        </div>
        
        <div class="pd-total credits-gold-total">
            <span>المبلغ المطلوب:</span>
            <span>${totalPrice} EGP</span>
        </div>
        
        <div class="pd-instructions">
            <h4><i class="fas fa-list-ol"></i> خطوات الدفع:</h4>
            <ol>
                ${method.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
        </div>
        
        <div class="credits-warning-box">
            <p>
                <i class="fas fa-exclamation-circle"></i>
                مهم: اكتب في رسالة الواتساب "شحن رصيد" + عدد الـ Credits
            </p>
        </div>
        
        <a href="https://wa.me/${method.whatsapp}?text=مرحباً%20Stack%20Store%0A%0A✅%20طلب%20شحن%20رصيد%20Credits%0A📦%20الكمية:%20${creditsAmount}%20Credits%0A💰%20المبلغ:%20${totalPrice}%20EGP%0A👤%20User:%20@${encodeURIComponent(currentUser?.user_metadata?.username || currentUser?.email?.split('@')[0] || 'user')}%0A📧%20إيميلي:%20${encodeURIComponent(currentUser?.email || '')}" 
           target="_blank" class="pd-whatsapp">
            <i class="fab fa-whatsapp"></i>
            <span>إرسال إيصال الدفع على واتساب</span>
        </a>
    `;

    paymentDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openCreditsManualPayment() {
    // نغلق واجهة اختيار طريقة الدفع
    closeCreditsPaymentModal();

    const method = paymentMethods.vodafone; // نستخدم فودافون كاش كافتراضي
    const totalPrice = pendingCreditsPrice;
    const creditsAmount = pendingCreditsAmount;

    // نفتح نفس واجهة الدفع اليدوي المعتادة ولكن مع بيانات الرصيد
    paymentDetailsContent.innerHTML = `
        <div class="pd-header">
            <div class="pd-icon ${method.iconClass}">
                <i class="fas ${method.icon}"></i>
            </div>
            <h3>شحن رصيد Credits</h3>
            <p>اتبع الخطوات التالية لإتمام شحن الرصيد</p>
        </div>
        
        <div class="pd-details">
            <div class="pd-row">
                <span>نوع العملية:</span>
                <span>شحن رصيد Credits</span>
            </div>
            <div class="pd-row">
                <span>الكمية:</span>
                <span style="color: #FFD700; font-weight: 700;">${creditsAmount} Credits</span>
            </div>
            <div class="pd-row">
                <span>اسم المستلم:</span>
                <span>${method.nameDisplay}</span>
            </div>
            <div class="pd-row">
                <span>رقم التحويل:</span>
                <div class="copyable">
                    <span id="copyNumber">${method.number}</span>
                    <button class="btn-copy" onclick="copyToClipboard('copyNumber', this)">نسخ</button>
                </div>
            </div>
        </div>
        
        <div class="pd-total" style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #1a1a1a;">
            <span style="font-weight: 600;">المبلغ المطلوب:</span>
            <span style="font-size: 1.3rem; font-weight: 800;">${totalPrice} EGP</span>
        </div>
        
        <div class="pd-instructions">
            <h4><i class="fas fa-list-ol"></i> خطوات الدفع:</h4>
            <ol>
                ${method.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
        </div>
        
        <div style="background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.2); border-radius: var(--radius-md); padding: 15px; margin-bottom: 20px;">
            <p style="font-size: 0.9rem; color: #FFD700; text-align: center; margin: 0;">
                <i class="fas fa-exclamation-circle"></i>
               مهم: ارسل صورة ايصال الدفع من خلال الزر أعلاه مع الرسالة التلقائية
            </p>
        </div>
        
        <a href="https://wa.me/${method.whatsapp}?text=مرحباً%20Stack%20Store%0A%0A✅%20طلب%20شحن%20رصيد%20Credits%0A📦%20الكمية:%20${creditsAmount}%20Credits%0A💰%20المبلغ:%20${totalPrice}%20EGP%0A📧%20إيميلي:%20${encodeURIComponent(currentUser?.email || '')}" 
           target="_blank" class="pd-whatsapp">
            <i class="fab fa-whatsapp"></i>
            <span>إرسال إيصال الدفع على واتساب</span>
        </a>
    `;

    paymentDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== Pay with Credits =====
async function payWithCredits() {
    if (!currentUser) {
        openAuthModal();
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const creditsNeeded = total * 5;

    if (!isAdmin() && userCredits < creditsNeeded) {
        showToast(`❌ رصيدك غير كافي. تحتاج ${formatCredits(creditsNeeded)} Credits`);
        return;
    }

    // ✅ فتح واجهة التأكيد (بدل confirm() native)
    openCreditsConfirmModal(total, creditsNeeded);
}

// ✅ دالة جديدة: فتح واجهة التأكيد
function openCreditsConfirmModal(total, creditsNeeded) {
    const remaining = userCredits - creditsNeeded;
    
    document.getElementById('confirmTotalPrice').textContent = total + ' ج.م';
    document.getElementById('confirmCreditsNeeded').textContent = formatCredits(creditsNeeded) + ' Credits';
    document.getElementById('confirmCurrentBalance').textContent = formatCredits(userCredits) + ' Credits';
    document.getElementById('confirmRemainingBalance').textContent = formatCredits(remaining) + ' Credits';
    
    const modal = document.getElementById('creditsConfirmModal');
    modal.classList.add('active');
    // ❌ لا نغلق paymentModal - نخليها مفتوحة ورا
}

// ✅ دالة جديدة: إغلاق واجهة التأكيد
function closeCreditsConfirmModal() {
    const modal = document.getElementById('creditsConfirmModal');
    modal.classList.remove('active');
}

// ✅ دالة جديدة: تأكيد الدفع (بعد الضغط على "نعم")
async function confirmCreditsPayment() {
    closeCreditsConfirmModal(); // نغلق واجهة التأكيد بس
    
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const creditsNeeded = total * 5;

    try {
        // 🔥 استخدم RPC عشان نخصم الرصيد بأمان
        const { data, error } = await supabase.rpc('deduct_credits', {
            p_user_id: currentUser.id,
            p_amount: creditsNeeded
        });

        if (error) {
            console.error('❌ RPC error:', error);
            throw error;
        }

        if (!data.success) {
            showToast('❌ ' + data.error);
            return;
        }

        // ✅ تحديث الرصيد المحلي
        userCredits = data.new_balance;
        updateWalletDisplay();

        // ✅ حفظ في LocalStorage
        const savedData = localStorage.getItem('stackStoreUserData_' + currentUser.id);
        let userData = savedData ? JSON.parse(savedData) : {};
        userData.credits = userCredits;
        localStorage.setItem('stackStoreUserData_' + currentUser.id, JSON.stringify(userData));

        const orderId = window.currentOrderId || generateOrderId();

        // ✅ إرسال للـ Google Sheets
        const orderData = {
            orderId: orderId,
            customerName: currentUser.user_metadata?.display_name || 'عميل',
            customerEmail: currentUser.email || '',
            customerPhone: '01xxxxxxxx',
            product: cart.map(item => `${item.name} (x${item.quantity || 1})`).join(', '),
            amount: total,
            paymentMethod: 'credits',
            creditsUsed: creditsNeeded
        };

        fetch('https://script.google.com/macros/s/AKfycbwRbfy755weIk81gyKIgzxPSRNXzvFAT0zVQq98V72w0MM4yTio2SgYqSU837nEWj0V/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        }).catch(() => {});

        // ✅ إرسال إيميل إشعار للأدمن
        sendAdminEmailNotification(orderId, creditsNeeded, total);
        
        // ✅ حفظ الطلب
        await saveOrderToDatabase(orderId, cart, total, creditsNeeded, 'credits');
        
        // ✅ إغلاق paymentModal وإظهار واجهة النجاح
        closePaymentModal();
        showOrderSuccessModal(orderId, creditsNeeded, total);
        
        // ✅ مسح السلة
        clearCart();

    } catch (error) {
        console.error('❌ Pay with credits error:', error);
        showToast('❌ حدث خطأ: ' + error.message);
    }
}

// ============================================
// ADMIN PANEL FUNCTIONS
// ============================================

const ADMIN_EMAIL = 'supportstackstore@gmail.com';

function isAdmin() {
    return currentUser && currentUser.email === ADMIN_EMAIL;
}

function openAdminPanel() {
    if (!isAdmin()) {
        showToast('⛔ غير مصرح لك بالدخول');
        return;
    }
    document.getElementById('accountDropdown').classList.remove('active');
    document.getElementById('adminPanelModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update admin stats
    const adminTotalCredits = document.getElementById('adminTotalCredits');
    if (adminTotalCredits) {
        adminTotalCredits.textContent = '100,000,000';
    }
    
    // Load recent transactions
    loadAdminTransactions();
}

function closeAdminPanel() {
    document.getElementById('adminPanelModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Admin adds credits to a user
async function addCreditsToUser() {
    if (!isAdmin()) {
        showToast('⛔ غير مصرح');
        return;
    }

    const targetUsername = document.getElementById('adminTargetUsername').value.trim().toLowerCase().replace(/^@/, '');
    const creditsAmount = parseInt(document.getElementById('adminCreditsAmount').value) || 0;

    if (!targetUsername) {
        showToast('⚠️ أدخل اسم المستخدم');
        return;
    }

    if (creditsAmount < 1) {
        showToast('⚠️ أدخل عدد Credits صحيح');
        return;
    }

    try {
        // استخدم الـ Function الجديدة
        const { data, error } = await supabase.rpc('transfer_credits', {
            p_to_username: targetUsername,
            p_amount: creditsAmount
        });

        if (error) {
            console.error('❌ Transfer error:', error);
            showToast('❌ خطأ: ' + error.message);
            return;
        }

        console.log('✅ Transfer result:', data);

        if (data.success) {
            showToast('✅ ' + data.message);
            
            // تحديث الرصيد المحلي
            userCredits -= creditsAmount;
            updateWalletDisplay();
            
            // مسح الحقول
            document.getElementById('adminTargetUsername').value = '';
            document.getElementById('adminCreditsAmount').value = '';
            
            // تسجيل العملية
            const transaction = {
                id: 'TXN-' + Date.now(),
                targetUsername: targetUsername,
                creditsAmount: creditsAmount,
                timestamp: new Date().toISOString(),
                status: 'completed'
            };
            
            let transactions = JSON.parse(localStorage.getItem('stackStoreAdminTransactions') || '[]');
            transactions.unshift(transaction);
            localStorage.setItem('stackStoreAdminTransactions', JSON.stringify(transactions));
            addTransactionToDisplay(transaction);
            
        } else {
            showToast('❌ ' + data.error);
        }

    } catch (error) {
        console.error('❌ Admin error:', error);
        showToast('❌ حدث خطأ: ' + error.message);
    }
}

// ===== Load Admin Orders - LOCALSTORAGE ONLY =====
async function loadAdminOrders() {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;
    
    let orders = [];
    
    try {
        const localOrders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        orders = localOrders;
        console.log('📦 Orders from localStorage:', orders.length);
    } catch (e) {
        console.error('❌ Error:', e);
    }
    
    // Sort
    orders.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
    
    // Render empty state
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="orders-empty">
                <i class="fas fa-inbox"></i>
                <p>لا توجد طلبات جديدة</p>
                <small style="color: var(--gray); display: block; margin-top: 10px;">
                    تأكد من وجود طلبات في localStorage
                </small>
            </div>
        `;
        return;
    }
    
    // Render orders
    container.innerHTML = orders.map((order, index) => {
        const isPending = order.status === 'pending';
        const statusClass = isPending ? 'pending' : 'completed';
        const statusText = isPending ? 'Pending' : 'Completed';
        
        // Parse items safely
        let items = [];
        try {
            if (typeof order.items === 'string') {
                items = JSON.parse(order.items);
            } else if (Array.isArray(order.items)) {
                items = order.items;
            } else if (order.items && typeof order.items === 'object') {
                items = Object.values(order.items);
            }
        } catch (e) {
            items = [];
        }
        
        const userEmail = order.customer_email || order.user_email || 'غير معروف';
        const userName = order.customer_name || order.user_username || 'غير معروف';
        const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const orderTotal = order.total_price || order.total || 0;
        
        // Build delivery form for pending orders
        let deliveryFormHTML = '';
        
        if (isPending) {
            const inputs = items.map((item, idx) => `
                <div class="delivery-account-input" id="existing-account-${order.id || order.order_number}-${idx}">
                    <label>
                        <i class="fas fa-box"></i> 
                        ${item.name || 'منتج'} 
                        ${item.quantity > 1 ? `(الحساب #${idx + 1})` : ''}
                    </label>
                    <input type="text" 
                           id="deliver-email-${order.id || order.order_number}-${idx}" 
                           placeholder="Email" 
                           value="">
                    <input type="text" 
                           id="deliver-pass-${order.id || order.order_number}-${idx}" 
                           placeholder="Password" 
                           value="">
                </div>
            `).join('');
            
            deliveryFormHTML = `
                <div class="delivery-form" id="delivery-form-${order.id || order.order_number}">
                    <h4>
                        <i class="fas fa-paper-plane"></i> 
                        تسليم الحسابات
                    </h4>
                    <div class="delivery-accounts-list" id="accounts-list-${order.id || order.order_number}">
                        ${inputs}
                    </div>
                    <button class="btn btn-primary btn-full" 
                            onclick="deliverOrder('${order.id || order.order_number}')" 
                            style="margin-top: 15px;">
                        <i class="fas fa-check"></i> 
                        تأكيد التسليم وإرسال للعميل
                    </button>
                </div>
            `;
        } 
        // Show delivered accounts for completed orders
        else if (order.delivered_accounts) {
            let accounts = [];
            try {
                if (typeof order.delivered_accounts === 'string') {
                    accounts = JSON.parse(order.delivered_accounts);
                } else if (Array.isArray(order.delivered_accounts)) {
                    accounts = order.delivered_accounts;
                }
            } catch (e) {
                accounts = [];
            }
                
            if (accounts.length > 0) {
                deliveryFormHTML = `
                    <div class="delivery-form">
                        <h4>
                            <i class="fas fa-check-circle" style="color: #10B981;"></i> 
                            تم التسليم
                        </h4>
                        ${accounts.map((acc, idx) => `
                            <div class="delivery-account" style="background: rgba(16,185,129,0.05); border-color: rgba(16,185,129,0.2);">
                                <div class="delivery-account-type">
                                    <i class="fas fa-key"></i> 
                                    ${acc.name || 'حساب'}
                                    ${acc.quantity > 1 ? `
                                        <span class="accounts-badge">
                                            <i class="fas fa-layer-group"></i> ×${acc.quantity}
                                        </span>
                                    ` : ''}
                                </div>
                                <div class="delivery-account-details">
                                    <span>
                                        <strong style="color: var(--primary);">Email:</strong> 
                                        ${acc.email || '-'}
                                    </span>
                                    <span>
                                        <strong style="color: var(--primary);">Password:</strong> 
                                        ${acc.password || '-'}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }
        
        // Build order card
        return `
            <div class="admin-order-card" 
                 id="admin-order-${index}" 
                 data-order-id="${order.id || order.order_number}" 
                 data-expanded="true">
                
                <!-- Header -->
                <div class="admin-order-header">
                    <div class="admin-order-info" style="display: flex; align-items: center; gap: 10px;">
                        <button class="order-toggle-btn" 
                                onclick="toggleOrderCard('admin-order-${index}')" 
                                title="تصغير/تكبير">
                            <i class="fas fa-chevron-up"></i>
                        </button>
                        <div>
                            <h4>
                                <i class="fas fa-shopping-bag" style="color: var(--primary);"></i>
                                طلب #${order.order_number || order.id}
                            </h4>
                            <p style="margin-top: 5px;">
                                <i class="fas fa-user" style="color: var(--gray);"></i> 
                                ${userName}
                                <span style="color: var(--glass-border); margin: 0 8px;">|</span>
                                <i class="fas fa-envelope" style="color: var(--gray);"></i> 
                                ${userEmail}
                            </p>
                            <p style="margin-top: 3px; font-size: 0.8rem; color: var(--gray);">
                                <i class="fas fa-clock"></i> 
                                ${new Date(order.created_at).toLocaleString('ar-EG')}
                            </p>
                        </div>
                    </div>
                    <span class="admin-order-status ${statusClass}">
                        <i class="fas ${isPending ? 'fa-clock' : 'fa-check-circle'}"></i>
                        ${statusText}
                    </span>
                </div>
                
                <!-- Compact Summary -->
                <div class="order-summary-compact">
                    <span>
                        <i class="fas fa-cube"></i> 
                        ${items.length} منتج
                    </span>
                    <span style="color: var(--glass-border);">•</span>
                    <span>
                        <i class="fas fa-layer-group"></i> 
                        ${totalItems} حساب
                    </span>
                    <span style="color: var(--glass-border);">•</span>
                    <span style="color: var(--secondary); font-weight: 700;">
                        ${orderTotal} ج.م
                    </span>
                </div>
                
                <!-- Products List -->
                <div class="admin-order-products">
                    ${items.map(item => `
                        <div class="admin-order-product">
                            <i class="fas fa-caret-left" style="color: var(--primary); margin-left: 8px;"></i>
                            ${item.name || 'منتج'} 
                            <span style="color: var(--gray);">× ${item.quantity || 1}</span>
                            <span style="color: var(--secondary); margin-right: auto;">
                                ${(item.price || 0) * (item.quantity || 1)} ج.م
                            </span>
                        </div>
                    `).join('')}
                    
                    <div class="admin-order-product" 
                         style="border-top: 1px solid var(--glass-border); 
                                margin-top: 10px; 
                                padding-top: 10px; 
                                font-weight: 700;
                                color: var(--secondary);">
                        <i class="fas fa-calculator" style="margin-left: 8px;"></i>
                        الإجمالي: ${orderTotal} ج.م
                    </div>
                </div>
                
                <!-- Delivery Form -->
                ${deliveryFormHTML}
                
            </div>
        `;
    }).join('');
    
    console.log('✅ Admin orders rendered:', orders.length);
}

function addTransactionToDisplay(transaction) {
    const transactionsList = document.getElementById('adminTransactionsList');
    if (!transactionsList) return;

    // Remove empty state if exists
    const emptyState = transactionsList.querySelector('.transaction-empty');
    if (emptyState) emptyState.remove();

    const txnHTML = `
        <div class="transaction-item">
            <div class="transaction-info">
                <i class="fas fa-check-circle"></i>
                <span>إضافة <strong>${transaction.creditsAmount} Credits</strong> لـ @${transaction.targetUsername}</span>
            </div>
            <span class="transaction-time">${new Date(transaction.timestamp).toLocaleTimeString('ar-EG')}</span>
        </div>
    `;

    transactionsList.insertAdjacentHTML('afterbegin', txnHTML);
}

// ===== Credits Success Modal (Delivery Confirmation) =====
function showOrderSuccessModal(orderId, creditsUsed, totalPrice) {
    // نغلق أي مودال مفتوح
    closePaymentModal();
    closePaymentDetailsModal();
    closeCreditsPaymentModal();
    
    // نعمل المودال ديناميكياً
    let modal = document.getElementById('orderSuccessModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'orderSuccessModal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal" style="max-width: 480px; text-align: center; padding: 0; overflow: hidden; max-height: 90vh; overflow-y: auto;">
            <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 50px 30px 30px; position: relative;">
                <div style="width: 90px; height: 90px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 3rem; animation: successPop 0.5s ease;">
                    <i class="fas fa-check" style="color: white;"></i>
                </div>
                <h2 style="color: white; font-size: 1.6rem; margin-bottom: 8px;">تم الدفع بنجاح! 🎉</h2>
                <p style="color: rgba(255,255,255,0.9); font-size: 0.95rem;">تم خصم ${formatCredits(creditsUsed)} Credits من رصيدك</p>
            </div>
            
            <div style="padding: 30px;">
                <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 16px; padding: 25px; margin-bottom: 25px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px;">
                        <i class="fas fa-truck-fast" style="color: #10B981; font-size: 1.5rem;"></i>
                        <span style="font-size: 1.2rem; font-weight: 700; color: var(--white);">سيتم التسليم في أقل من 30 دقيقة</span>
                    </div>
                    <p style="color: var(--gray-light); font-size: 0.9rem; margin: 0;">
                        <i class="fas fa-envelope" style="color: var(--primary); margin-left: 5px;"></i>
                        سيتم إرسال بيانات الاشتراك على إيميلك: <strong style="color: var(--primary);">${currentUser?.email || ''}</strong>
                    </p>
                </div>
                
                <div style="background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: right;">
                    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--glass-border);">
                        <span style="color: var(--gray-light);">رقم الطلب:</span>
                        <span style="font-family: monospace; color: var(--primary); font-weight: 600;">${orderId}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--glass-border);">
                        <span style="color: var(--gray-light);">المنتجات:</span>
                        <span style="color: var(--white); font-weight: 600;">${cart.length} منتج</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--glass-border);">
                        <span style="color: var(--gray-light);">Credits المستخدمة:</span>
                        <span style="color: #FFD700; font-weight: 700;"><i class="fas fa-coins"></i> ${formatCredits(creditsUsed)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                        <span style="color: var(--gray-light);">الرصيد المتبقي:</span>
                        <span style="color: var(--secondary); font-weight: 700;"><i class="fas fa-wallet"></i> ${formatCredits(userCredits)}</span>
                    </div>
                </div>
                
                <!-- ✅ لينك تفقد الطلبات -->
                <div style="background: rgba(0,132,255,0.1); border: 1px solid rgba(0,132,255,0.2); border-radius: 12px; padding: 20px; margin-bottom: 25px; cursor: pointer; transition: all 0.3s ease;" 
                     onmouseover="this.style.transform='translateY(-3px)'; this.style.borderColor='var(--primary)'" 
                     onmouseout="this.style.transform=''; this.style.borderColor='rgba(0,132,255,0.2)'"
                     onclick="closeOrderSuccessModal(); openOrdersPage();">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="text-align: right;">
                            <h3 style="color: var(--primary); font-size: 1.1rem; margin-bottom: 5px;">
                                <i class="fas fa-box-open"></i> تفقد طلباتك
                            </h3>
                            <p style="color: var(--gray-light); font-size: 0.85rem; margin: 0;">
                                اضغط هنا لرؤية حالة طلبك وتفاصيله
                            </p>
                        </div>
                        <i class="fas fa-chevron-left" style="color: var(--primary); font-size: 1.5rem;"></i>
                    </div>
                </div>
                
                <button class="btn btn-primary btn-full" onclick="closeOrderSuccessModal()" style="background: linear-gradient(135deg, #0084FF, #00D4AA);">
                    <span>حسناً، فهمت</span>
                    <i class="fas fa-check"></i>
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // نضيف animation لو مش موجود
    if (!document.getElementById('successPopStyle')) {
        const style = document.createElement('style');
        style.id = 'successPopStyle';
        style.textContent = `
            @keyframes successPop {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeOrderSuccessModal() {
    const modal = document.getElementById('orderSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeCreditsSuccessModal() {
    closeOrderSuccessModal(); // نستخدم نفس الدالة الجديدة
}

// ===== Admin Email Notification =====
function sendAdminEmailNotification(orderId, creditsUsed, totalPrice) {
    // جلب بيانات المستخدم
    const userEmail = currentUser?.email || 'غير معروف';
    const userUsername = currentUser?.user_metadata?.username || 
                         localStorage.getItem('stackStoreUserData_' + currentUser?.id)?.username || 
                         'غير معروف';
    const userDisplayName = currentUser?.user_metadata?.display_name || 
                            localStorage.getItem('stackStoreUserData_' + currentUser?.id)?.display_name || 
                            'غير معروف';
    
    // تفاصيل المنتجات
    const productsDetails = cart.map(item => {
        const qty = item.quantity || 1;
        return `- ${item.name} (الكمية: ${qty}) - السعر: ${item.price * qty} ج.م`;
    }).join('\n');
    
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    const emailBody = `
طلب دفع جديد بالرصيد (Credits) - Stack Store

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 رقم الطلب: ${orderId}
👤 اسم العميل: ${userDisplayName}
📧 إيميل العميل: ${userEmail}
🏷️ يوزرنييم العميل: @${userUsername}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛒 تفاصيل المنتجات:
${productsDetails}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 إجمالي السعر: ${totalPrice} ج.م
🪙 Credits المستخدمة: ${formatCredits(creditsUsed)} Credits
📦 عدد الحسابات/المنتجات: ${totalItems}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ وقت الطلب: ${new Date().toLocaleString('ar-EG')}
💳 طريقة الدفع: Credits (رصيد المحفظة)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

يرجى مراجعة الطلب وإرسال بيانات الاشتراكات للعميل في أقرب وقت.
    `.trim();

    // إرسال الإيميل عبر Formspree (أو أي خدمة إيميل)
    // لو عندك Formspree endpoint حطه هنا، أو استخدم mailto كـ fallback
    const adminEmail = 'supportstackstore@gmail.com';
    
    // طريقة 1: فتح إيميل جاهز (mailto)
    const mailtoLink = `mailto:${adminEmail}?subject=طلب دفع جديد بالرصيد - ${orderId}&body=${encodeURIComponent(emailBody)}`;
    
    // نفتح الإيميل في تاب جديد (اختياري - ممكن تشيله لو مش عايز يفتح إيميل كل مرة)
    // window.open(mailtoLink, '_blank');
    
    // طريقة 2: إرسال عبر Formspree (أفضل - لو عندك endpoint)
    // استبدل الرابط ده بـ Formspree endpoint بتاعك لو عندك
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqevlbeo'; // غيره لو عندك endpoint تاني للأدمن
    
    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: 'Stack Store - نظام الدفع بالرصيد',
            email: 'noreply@stackstore.com',
            message: emailBody,
            subject: `طلب دفع جديد بالرصيد - ${orderId}`,
            _replyto: userEmail
        })
    })
    .then(response => {
        console.log('✅ Admin email sent:', response.status);
    })
    .catch(error => {
        console.error('❌ Failed to send admin email:', error);
        // fallback: نفتح mailto
        // window.open(mailtoLink, '_blank');
    });
}

// ============================================
// ORDERS SYSTEM
// ============================================

// ===== Save Order to Database - ULTRA FIX =====
async function saveOrderToDatabase(orderId, items, totalPrice, creditsUsed, paymentMethod) {
    
    const customerName = document.getElementById('customerName')?.value?.trim() || 
                         currentUser?.user_metadata?.display_name || 
                         currentUser?.user_metadata?.username || 'عميل';
                         
    const customerEmail = document.getElementById('customerEmail')?.value?.trim() || 
                          currentUser?.email || 'غير معروف';
                          
    const customerPhone = document.getElementById('customerPhone')?.value?.trim() || '01xxxxxxxx';
    
    let currentUsername = '';
    if (currentUser) {
        const savedData = localStorage.getItem('stackStoreUserData_' + currentUser.id);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                currentUsername = parsed.username || '';
            } catch (e) {}
        }
        if (!currentUsername) {
            currentUsername = currentUser.user_metadata?.username || 
                             currentUser.user_metadata?.display_name || '';
        }
    }

    // ═══════════════════════════════════════════════════════
    // BUILD ORDER DATA - items as ARRAY (Supabase handles jsonb)
    // ═══════════════════════════════════════════════════════
    const orderItems = items.map(item => ({
        product_id: item.id || 0,
        name: item.name || 'منتج',
        quantity: item.quantity || 1,
        price: item.price || 0
    }));

    const orderData = {
        user_id: currentUser ? currentUser.id : null,
        order_number: orderId,
        items: orderItems,  // ARRAY - Supabase converts to jsonb automatically
        total: totalPrice,
        total_price: totalPrice,
        payment_method: paymentMethod,
        status: 'pending',
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        user_email: currentUser?.email || null,
        user_username: currentUsername || null,
        created_at: new Date().toISOString(),
        delivered_accounts: null,
        delivered_at: null
    };

    let supabaseSuccess = false;
    let supabaseError = null;

    // ═══════════════════════════════════════════════════════
    // STEP 1: SAVE TO SUPABASE
    // ═══════════════════════════════════════════════════════
    try {
        if (!supabase) {
            throw new Error('Supabase client not initialized');
        }
        
        console.log('📤 SENDING TO SUPABASE:', orderData);
        
        // 🔥 KEY FIX: Pass items as ARRAY, not JSON string
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData])
            .select();
            
        if (error) {
            console.error('❌ SUPABASE ERROR:', error);
            console.error('❌ Error code:', error.code);
            console.error('❌ Error message:', error.message);
            console.error('❌ Error details:', error.details);
            supabaseError = error;
            throw error;
        }
        
        console.log('✅ SUPABASE SUCCESS:', data);
        supabaseSuccess = true;
        
        if (data && data[0] && data[0].id) {
            orderData.supabase_id = data[0].id;
        }
        
    } catch (e) {
        console.error('❌ SUPABASE FAILED:', e.message);
        supabaseError = e;
    }

    // ═══════════════════════════════════════════════════════
    // STEP 2: ALWAYS SAVE TO LOCALSTORAGE
    // ═══════════════════════════════════════════════════════
    try {
        // General storage for admin
        let allOrders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        const existingIdx = allOrders.findIndex(o => o.order_number === orderId);
        
        if (existingIdx !== -1) {
            allOrders[existingIdx] = { ...orderData, _source: supabaseSuccess ? 'supabase' : 'local' };
        } else {
            allOrders.unshift({ ...orderData, _source: supabaseSuccess ? 'supabase' : 'local' });
        }
        localStorage.setItem('stackStoreOrders', JSON.stringify(allOrders));
        
        // User-specific storage
        if (currentUser) {
            const userOrdersKey = 'stackStoreUserOrders_' + currentUser.id;
            let userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
            const userIdx = userOrders.findIndex(o => o.order_number === orderId);
            
            if (userIdx !== -1) {
                userOrders[userIdx] = { ...orderData, _source: supabaseSuccess ? 'supabase' : 'local' };
            } else {
                userOrders.unshift({ ...orderData, _source: supabaseSuccess ? 'supabase' : 'local' });
            }
            localStorage.setItem(userOrdersKey, JSON.stringify(userOrders));
        }
        
        console.log('✅ LOCALSTORAGE SAVED');
        
    } catch (e) {
        console.error('❌ LOCALSTORAGE FAILED:', e);
    }

    // ═══════════════════════════════════════════════════════
    // RESULT
    // ═══════════════════════════════════════════════════════
    if (!supabaseSuccess) {
        console.warn('⚠️ Supabase failed:', supabaseError?.message);
        showToast('⚠️ تم حفظ الطلب محلياً');
    } else {
        console.log('✅ Order saved to Supabase + localStorage');
    }
    
    return { supabaseSuccess, orderData, error: supabaseError };
}

function saveOrderToLocalStorage(orderData) {
    let orders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
    
    // Check if order already exists
    const existingIndex = orders.findIndex(o => o.id === orderData.id || o.order_number === orderData.order_number);
    
    if (existingIndex !== -1) {
        // Update existing
        orders[existingIndex] = { ...orders[existingIndex], ...orderData };
    } else {
        // Add new
        orders.unshift(orderData);
    }
    
    localStorage.setItem('stackStoreOrders', JSON.stringify(orders));
}

// ===== Customer Orders Page =====
function openOrdersPage() {
    if (!currentUser) {
        openAuthModal();
        return;
    }
    document.getElementById('accountDropdown').classList.remove('active');
    loadCustomerOrders();
    document.getElementById('ordersPageModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrdersPage() {
    document.getElementById('ordersPageModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Load Customer Orders - COMPLETE FIX =====
async function loadCustomerOrders() {
    const container = document.getElementById('customerOrdersList');
    if (!container) return;
    
    let allOrders = [];
    
    // ═══════════════════════════════════════════════════════
    // STEP 1: Get user identifiers
    // ═══════════════════════════════════════════════════════
    const userId = currentUser?.id;
    const userEmail = currentUser?.email?.toLowerCase()?.trim();
    
    console.log('🔍 Loading orders for:', { userId, userEmail });

    // ═══════════════════════════════════════════════════════
    // STEP 2: Load from Supabase
    // ═══════════════════════════════════════════════════════
    try {
        if (supabase && userId) {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .or(`user_id.eq.${userId},customer_email.ilike.${userEmail},user_email.ilike.${userEmail}`)
                .order('created_at', { ascending: false });
                
            if (data && !error) {
                data.forEach(o => o._source = 'supabase');
                allOrders = [...allOrders, ...data];
                console.log('✅ Supabase orders:', data.length);
            }
        }
    } catch (e) {
        console.error('❌ Supabase failed:', e);
    }

    // ═══════════════════════════════════════════════════════
    // STEP 3: Load from localStorage AND MERGE
    // ═══════════════════════════════════════════════════════
    try {
        let localOrders = [];
        
        // User-specific storage
        if (userId) {
            const userOrdersKey = 'stackStoreUserOrders_' + userId;
            const userSpecific = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
            localOrders = [...localOrders, ...userSpecific];
        }
        
        // General storage - filter by email
        const generalOrders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        const emailMatched = generalOrders.filter(o => {
            const orderEmail = (o.customer_email || o.user_email || '').toLowerCase().trim();
            return orderEmail === userEmail;
        });
        localOrders = [...localOrders, ...emailMatched];
        
        // Email-based storage (from admin-created orders)
        if (userEmail) {
            const emailKey = 'stackStoreOrdersByEmail_' + userEmail.replace(/[^a-z0-9]/g, '_');
            const emailOrders = JSON.parse(localStorage.getItem(emailKey) || '[]');
            localOrders = [...localOrders, ...emailOrders];
            console.log('📧 Email key:', emailKey, 'Orders:', emailOrders.length);
        }
        
        // Remove duplicates
        const seen = new Set();
        localOrders = localOrders.filter(o => {
            const key = o.order_number || o.id;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        
        // Merge with Supabase results
        const existingKeys = new Set(allOrders.map(o => o.order_number || o.id));
        
        localOrders.forEach(o => {
            const key = o.order_number || o.id;
            if (!existingKeys.has(key)) {
                o._source = o._source || 'localStorage';
                allOrders.push(o);
            }
        });
        
        console.log('✅ Merged orders. Total:', allOrders.length);
        
    } catch (e) {
        console.error('❌ localStorage error:', e);
    }

    // ═══════════════════════════════════════════════════════
    // STEP 4: Sort (pending first, then newest)
    // ═══════════════════════════════════════════════════════
    allOrders.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

    // ═══════════════════════════════════════════════════════
    // STEP 5: Render
    // ═══════════════════════════════════════════════════════
    if (allOrders.length === 0) {
        container.innerHTML = `
            <div class="orders-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>لا توجد طلبات حتى الآن</p>
                <small style="color: var(--gray); display: block; margin-top: 10px;">
                    ${userEmail ? 'جاري البحث عن طلبات لـ: ' + userEmail : ''}
                </small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = allOrders.map((order, index) => {
        const isCompleted = order.status === 'completed';
        const statusClass = isCompleted ? 'completed' : 'pending';
        const statusText = isCompleted ? 'مكتمل' : 'قيد المعالجة';
        const statusIcon = isCompleted ? 'fa-check-circle' : 'fa-clock';
        
        let items = [];
        try {
            if (typeof order.items === 'string') {
                items = JSON.parse(order.items);
            } else if (Array.isArray(order.items)) {
                items = order.items;
            } else if (order.items && typeof order.items === 'object') {
                items = Object.values(order.items);
            }
        } catch (e) {
            items = [];
        }
        
        const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        let deliveryHTML = '';
        if (isCompleted && order.delivered_accounts) {
            let accounts = [];
            try {
                if (typeof order.delivered_accounts === 'string') {
                    accounts = JSON.parse(order.delivered_accounts);
                } else if (Array.isArray(order.delivered_accounts)) {
                    accounts = order.delivered_accounts;
                }
            } catch (e) {
                accounts = [];
            }
                
            if (accounts.length > 0) {
                deliveryHTML = `
                    <div class="order-delivery-info">
                        <h4><i class="fas fa-key"></i> بيانات الحسابات</h4>
                        ${accounts.map((acc, idx) => `
                            <div class="delivery-account">
                                <div class="delivery-account-type">${acc.name || 'حساب'} ${acc.quantity > 1 ? `#${idx + 1}` : ''}</div>
                                <div class="delivery-account-details">
                                    <span><strong>Email:</strong> ${acc.email || '-'}</span>
                                    <span><strong>Password:</strong> ${acc.password || '-'}</span>
                                </div>
                            </div>
                        `).join('')}
                        <p style="color: #10B981; font-size: 0.85rem; margin-top: 10px; text-align: center;">
                            <i class="fas fa-envelope"></i> تم إرسال بيانات الحسابات على إيميلك أيضاً
                        </p>
                    </div>
                `;
            }
        }
        
        return `
            <div class="order-card" id="customer-order-${index}" data-expanded="true">
                <div class="order-card-header" style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button class="order-toggle-btn" onclick="toggleOrderCard('customer-order-${index}')" title="تصغير/تكبير">
                            <i class="fas fa-chevron-up"></i>
                        </button>
                        <span class="order-card-id">#${order.order_number || order.id}</span>
                        ${order._source === 'localStorage' ? '<span style="font-size: 0.7rem; color: var(--accent);">[محلي]</span>' : ''}
                    </div>
                    <span class="order-status ${statusClass}">
                        <i class="fas ${statusIcon}"></i> ${statusText}
                    </span>
                </div>
                
                <div class="order-summary-compact">
                    <span><i class="fas fa-cube"></i> ${items.length} منتج</span>
                    <span style="color: var(--glass-border);">•</span>
                    <span><i class="fas fa-layer-group"></i> ${totalItems} حساب</span>
                    <span style="color: var(--glass-border);">•</span>
                    <span style="color: var(--secondary); font-weight: 700;">${order.total || order.total_price || 0} ج.م</span>
                </div>
                
                <div class="order-products">
                    ${items.map(item => `
                        <div class="order-product-item">
                            <i class="fas fa-cube"></i>
                            <span>${item.name || 'منتج'} × ${item.quantity || 1}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="order-meta">
                    <span><i class="fas fa-calendar"></i> ${new Date(order.created_at).toLocaleDateString('ar-EG')}</span>
                    <span class="order-price">${order.total || order.total_price || 0} ج.م</span>
                </div>
                
                ${deliveryHTML}
            </div>
        `;
    }).join('');
}

// ===== Admin Orders Panel =====
function openOrdersPanel() {
    if (!isAdmin()) {
        showToast('⛔ غير مصرح');
        return;
    }
    document.getElementById('accountDropdown').classList.remove('active');
    loadAdminOrders();
    document.getElementById('ordersPanelModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrdersPanel() {
    document.getElementById('ordersPanelModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Load Admin Orders - COMPLETE FIXED VERSION =====
async function loadAdminOrders() {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;
    
    let allOrders = [];
    
    // ═══════════════════════════════════════════════════════
    // STEP 1: Load from Supabase
    // ═══════════════════════════════════════════════════════
    try {
        if (supabase) {
            console.log('🔍 Loading from Supabase...');
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });
                
            if (error) {
                console.error('❌ Supabase error:', error.message);
            } else if (data && data.length > 0) {
                // Mark source
                data.forEach(o => o._source = 'supabase');
                allOrders = [...allOrders, ...data];
                console.log('✅ Supabase orders:', data.length);
            }
        }
    } catch (e) {
        console.error('❌ Supabase failed:', e.message);
    }
    
    // ═══════════════════════════════════════════════════════
    // STEP 2: Load from localStorage AND MERGE
    // ═══════════════════════════════════════════════════════
    try {
        const localOrders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        console.log('📦 localStorage orders:', localOrders.length);
        
        if (localOrders.length > 0) {
            // Get existing order_numbers to avoid duplicates
            const existingOrderNumbers = new Set(allOrders.map(o => o.order_number));
            const existingIds = new Set(allOrders.map(o => o.id));
            
            localOrders.forEach(localOrder => {
                // Skip if already in Supabase results
                const alreadyExists = existingOrderNumbers.has(localOrder.order_number) || 
                                      existingIds.has(localOrder.id);
                
                if (!alreadyExists) {
                    localOrder._source = 'localStorage';
                    allOrders.push(localOrder);
                }
            });
            
            console.log('✅ Merged. Total orders:', allOrders.length);
        }
    } catch (e) {
        console.error('❌ localStorage error:', e);
    }
    
    // ═══════════════════════════════════════════════════════
    // STEP 3: Sort (pending first, then newest)
    // ═══════════════════════════════════════════════════════
    allOrders.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
    
    // ═══════════════════════════════════════════════════════
    // STEP 4: Render
    // ═══════════════════════════════════════════════════════
    if (allOrders.length === 0) {
        container.innerHTML = `
            <div class="orders-empty">
                <i class="fas fa-inbox"></i>
                <p>لا توجد طلبات جديدة</p>
                <small style="color: var(--gray); display: block; margin-top: 10px;">
                    تأكد من وجود طلبات في localStorage
                </small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = allOrders.map((order, index) => {
        const isPending = order.status === 'pending';
        const statusClass = isPending ? 'pending' : 'completed';
        const statusText = isPending ? 'Pending' : 'Completed';
        
        // Parse items safely
        let items = [];
        try {
            if (typeof order.items === 'string') {
                items = JSON.parse(order.items);
            } else if (Array.isArray(order.items)) {
                items = order.items;
            } else if (order.items && typeof order.items === 'object') {
                items = Object.values(order.items);
            }
        } catch (e) {
            items = [];
        }
        
        const userEmail = order.customer_email || order.user_email || 'غير معروف';
        const userName = order.customer_name || order.user_username || 'غير معروف';
        const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const orderTotal = order.total_price || order.total || 0;
        
        // Build delivery form for pending orders
        let deliveryFormHTML = '';
        
        if (isPending) {
            const inputs = items.map((item, idx) => `
                <div class="delivery-account-input" id="existing-account-${order.id || order.order_number}-${idx}">
                    <label>
                        <i class="fas fa-box"></i> 
                        ${item.name || 'منتج'} 
                        ${item.quantity > 1 ? `(الحساب #${idx + 1})` : ''}
                    </label>
                    <input type="text" 
                           id="deliver-email-${order.id || order.order_number}-${idx}" 
                           placeholder="Email" 
                           value="">
                    <input type="text" 
                           id="deliver-pass-${order.id || order.order_number}-${idx}" 
                           placeholder="Password" 
                           value="">
                </div>
            `).join('');
            
            deliveryFormHTML = `
                <div class="delivery-form" id="delivery-form-${order.id || order.order_number}">
                    <h4>
                        <i class="fas fa-paper-plane"></i> 
                        تسليم الحسابات
                    </h4>
                    <div class="delivery-accounts-list" id="accounts-list-${order.id || order.order_number}">
                        ${inputs}
                    </div>
                    <button class="btn btn-primary btn-full" 
                            onclick="deliverOrder('${order.id || order.order_number}')" 
                            style="margin-top: 15px;">
                        <i class="fas fa-check"></i> 
                        تأكيد التسليم وإرسال للعميل
                    </button>
                </div>
            `;
        } 
        // Show delivered accounts for completed orders
        else if (order.delivered_accounts) {
            let accounts = [];
            try {
                if (typeof order.delivered_accounts === 'string') {
                    accounts = JSON.parse(order.delivered_accounts);
                } else if (Array.isArray(order.delivered_accounts)) {
                    accounts = order.delivered_accounts;
                }
            } catch (e) {
                accounts = [];
            }
                
            if (accounts.length > 0) {
                deliveryFormHTML = `
                    <div class="delivery-form">
                        <h4>
                            <i class="fas fa-check-circle" style="color: #10B981;"></i> 
                            تم التسليم
                        </h4>
                        ${accounts.map((acc, idx) => `
                            <div class="delivery-account" style="background: rgba(16,185,129,0.05); border-color: rgba(16,185,129,0.2);">
                                <div class="delivery-account-type">
                                    <i class="fas fa-key"></i> 
                                    ${acc.name || 'حساب'}
                                    ${acc.quantity > 1 ? `
                                        <span class="accounts-badge">
                                            <i class="fas fa-layer-group"></i> ×${acc.quantity}
                                        </span>
                                    ` : ''}
                                </div>
                                <div class="delivery-account-details">
                                    <span>
                                        <strong style="color: var(--primary);">Email:</strong> 
                                        ${acc.email || '-'}
                                    </span>
                                    <span>
                                        <strong style="color: var(--primary);">Password:</strong> 
                                        ${acc.password || '-'}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }
        
        // Build order card
        return `
            <div class="admin-order-card" 
                 id="admin-order-${index}" 
                 data-order-id="${order.id || order.order_number}" 
                 data-expanded="true">
                
                <!-- Header -->
                <div class="admin-order-header">
                    <div class="admin-order-info" style="display: flex; align-items: center; gap: 10px;">
                        <button class="order-toggle-btn" 
                                onclick="toggleOrderCard('admin-order-${index}')" 
                                title="تصغير/تكبير">
                            <i class="fas fa-chevron-up"></i>
                        </button>
                        <div>
                            <h4>
                                <i class="fas fa-shopping-bag" style="color: var(--primary);"></i>
                                طلب #${order.order_number || order.id}
                                ${order._source === 'localStorage' ? '<span style="font-size: 0.7rem; color: var(--accent); margin-right: 8px;">[local]</span>' : ''}
                            </h4>
                            <p style="margin-top: 5px;">
                                <i class="fas fa-user" style="color: var(--gray);"></i> 
                                ${userName}
                                <span style="color: var(--glass-border); margin: 0 8px;">|</span>
                                <i class="fas fa-envelope" style="color: var(--gray);"></i> 
                                ${userEmail}
                            </p>
                            <p style="margin-top: 3px; font-size: 0.8rem; color: var(--gray);">
                                <i class="fas fa-clock"></i> 
                                ${new Date(order.created_at).toLocaleString('ar-EG')}
                            </p>
                        </div>
                    </div>
                    <span class="admin-order-status ${statusClass}">
                        <i class="fas ${isPending ? 'fa-clock' : 'fa-check-circle'}"></i>
                        ${statusText}
                    </span>
                </div>
                
                <!-- Compact Summary -->
                <div class="order-summary-compact">
                    <span>
                        <i class="fas fa-cube"></i> 
                        ${items.length} منتج
                    </span>
                    <span style="color: var(--glass-border);">•</span>
                    <span>
                        <i class="fas fa-layer-group"></i> 
                        ${totalItems} حساب
                    </span>
                    <span style="color: var(--glass-border);">•</span>
                    <span style="color: var(--secondary); font-weight: 700;">
                        ${orderTotal} ج.م
                    </span>
                </div>
                
                <!-- Products List -->
                <div class="admin-order-products">
                    ${items.map(item => `
                        <div class="admin-order-product">
                            <i class="fas fa-caret-left" style="color: var(--primary); margin-left: 8px;"></i>
                            ${item.name || 'منتج'} 
                            <span style="color: var(--gray);">× ${item.quantity || 1}</span>
                            <span style="color: var(--secondary); margin-right: auto;">
                                ${(item.price || 0) * (item.quantity || 1)} ج.م
                            </span>
                        </div>
                    `).join('')}
                    
                    <div class="admin-order-product" 
                         style="border-top: 1px solid var(--glass-border); 
                                margin-top: 10px; 
                                padding-top: 10px; 
                                font-weight: 700;
                                color: var(--secondary);">
                        <i class="fas fa-calculator" style="margin-left: 8px;"></i>
                        الإجمالي: ${orderTotal} ج.م
                    </div>
                </div>
                
                <!-- Delivery Form -->
                ${deliveryFormHTML}
                
            </div>
        `;
    }).join('');
    
    console.log('✅ Admin orders rendered:', allOrders.length);
}

// ===== Deliver Order (Admin) - COMPLETE FIX =====
async function deliverOrder(orderId) {
    if (!isAdmin()) {
        showToast('⛔ غير مصرح');
        return;
    }
    
    console.log('🔍 Delivering order:', orderId);
    
    // ═══════════════════════════════════════════════════════
    // STEP 1: Find order EVERYWHERE (Supabase + localStorage)
    // ═══════════════════════════════════════════════════════
    let order = null;
    let foundInSupabase = false;
    let supabaseId = null;
    
    // Try Supabase first - search by order_number OR id
    try {
        if (supabase) {
            console.log('🔍 Searching Supabase for order:', orderId);
            
            // Try by order_number
            let { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('order_number', orderId)
                .maybeSingle(); // Use maybeSingle instead of single to avoid errors
                
            if (error) {
                console.error('❌ Supabase query error (order_number):', error.message);
            }
            
            // If not found, try by id
            if (!data) {
                console.log('🔍 Trying by ID...');
                ({ data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('id', orderId)
                    .maybeSingle());
                    
                if (error) {
                    console.error('❌ Supabase query error (id):', error.message);
                }
            }
                
            if (data) {
                order = data;
                foundInSupabase = true;
                supabaseId = data.id;
                console.log('✅ Order found in Supabase:', data);
            } else {
                console.log('ℹ️ Order not found in Supabase');
            }
        }
    } catch (e) {
        console.error('❌ Supabase query failed:', e.message);
    }
    
    // Fallback to localStorage - search by order_number OR id
    if (!order) {
        console.log('📦 Searching in localStorage...');
        try {
            const localOrders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
            console.log('📦 Total local orders:', localOrders.length);
            
            // Try by order_number first, then by id
            order = localOrders.find(o => o.order_number === orderId);
            if (!order) {
                order = localOrders.find(o => o.id === orderId);
            }
            
            if (order) {
                console.log('✅ Order found in localStorage:', order);
            } else {
                console.error('❌ Order not found anywhere. Searched for:', orderId);
                console.log('📦 Available local orders:', localOrders.map(o => ({ id: o.id, order_number: o.order_number })));
            }
        } catch (e) {
            console.error('❌ Error loading from localStorage:', e);
        }
    }
    
    if (!order) {
        showToast('❌ الطلب غير موجود - رقم الطلب: ' + orderId);
        console.error('❌ FINAL: Order not found:', orderId);
        return;
    }
    
    // ═══════════════════════════════════════════════════════
    // STEP 2: Parse items safely
    // ═══════════════════════════════════════════════════════
    let items = [];
    try {
        if (typeof order.items === 'string') {
            items = JSON.parse(order.items);
        } else if (Array.isArray(order.items)) {
            items = order.items;
        } else if (order.items && typeof order.items === 'object') {
            items = Object.values(order.items);
        }
    } catch (e) {
        console.warn('⚠️ Failed to parse items:', e);
        items = [];
    }
    
    console.log('📦 Items to deliver:', items.length);
    
    // ═══════════════════════════════════════════════════════
    // STEP 3: Collect account details from inputs
    // ═══════════════════════════════════════════════════════
    const deliveredAccounts = [];
    
    for (let i = 0; i < items.length; i++) {
        const emailInput = document.getElementById(`deliver-email-${orderId}-${i}`);
        const passInput = document.getElementById(`deliver-pass-${orderId}-${i}`);
        
        const email = emailInput?.value?.trim();
        const password = passInput?.value?.trim();
        
        if (!email || !password) {
            showToast(`⚠️ يرجى ملء بيانات الحساب رقم ${i + 1}`);
            return;
        }
        
        deliveredAccounts.push({
            name: items[i].name || 'حساب',
            email: email,
            password: password,
            quantity: items[i].quantity || 1
        });
    }
    
    console.log('✅ Collected accounts:', deliveredAccounts.length);
    
    // ═══════════════════════════════════════════════════════
    // STEP 4: Update order status EVERYWHERE
    // ═══════════════════════════════════════════════════════
    const updateData = {
        status: 'completed',
        delivered_accounts: JSON.stringify(deliveredAccounts),
        delivered_at: new Date().toISOString()
    };
    
    // Update in Supabase (if found there)
    if (foundInSupabase && supabaseId) {
        try {
            console.log('📤 Updating Supabase order:', supabaseId);
            const { error } = await supabase
                .from('orders')
                .update(updateData)
                .eq('id', supabaseId); // Use the actual Supabase ID
                
            if (error) {
                console.error('❌ Failed to update in Supabase:', error);
                throw error;
            }
            console.log('✅ Order updated in Supabase');
        } catch (e) {
            console.error('❌ Supabase update failed:', e.message);
            // Continue to update localStorage
        }
    }
    
    // ALWAYS update in localStorage (primary source for display)
    try {
        let orders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        const idx = orders.findIndex(o => o.order_number === orderId || o.id === orderId);
        
        if (idx !== -1) {
            orders[idx] = { ...orders[idx], ...updateData, status: 'completed' };
            localStorage.setItem('stackStoreOrders', JSON.stringify(orders));
            console.log('✅ Order updated in localStorage (all orders)');
        } else {
            // If not found, add it (shouldn't happen but just in case)
            orders.unshift({ ...order, ...updateData, status: 'completed' });
            localStorage.setItem('stackStoreOrders', JSON.stringify(orders));
        }
        
        // Also update user-specific storage
        const userId = order.user_id;
        if (userId) {
            const userOrdersKey = 'stackStoreUserOrders_' + userId;
            let userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
            const userIdx = userOrders.findIndex(o => o.order_number === orderId || o.id === orderId);
            
            if (userIdx !== -1) {
                userOrders[userIdx] = { ...userOrders[userIdx], ...updateData, status: 'completed' };
                localStorage.setItem(userOrdersKey, JSON.stringify(userOrders));
                console.log('✅ Order updated in user-specific storage');
            }
        }
    } catch (e) {
        console.error('❌ Failed to update localStorage:', e);
    }
    
    // ═══════════════════════════════════════════════════════
    // STEP 5: Send email to customer
    // ═══════════════════════════════════════════════════════
    try {
        await sendDeliveryEmail(order, deliveredAccounts);
        console.log('✅ Delivery email sent');
    } catch (e) {
        console.error('❌ Failed to send email:', e);
    }
    
    showToast('✅ تم التسليم وإرسال الإيميل للعميل');
    
    // Refresh the panel
    await loadAdminOrders();
}

// ===== Send Delivery Email to Customer =====
async function sendDeliveryEmail(order, accounts) {
    const customerEmail = order.customer_email || order.user_email;
    if (!customerEmail) return;
    
    // Handle items
    let items = [];
    try {
        if (typeof order.items === 'string') {
            items = JSON.parse(order.items);
        } else if (Array.isArray(order.items)) {
            items = order.items;
        }
    } catch (e) {
        items = [];
    }
    
    const accountsHTML = accounts.map((acc, idx) => `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
            <h3 style="color: #1e293b; margin-bottom: 10px;">${acc.name || 'حساب'} ${acc.quantity > 1 ? `#${idx + 1}` : ''}</h3>
            <p style="margin: 5px 0;"><strong>Email:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${acc.email}</code></p>
            <p style="margin: 5px 0;"><strong>Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${acc.password}</code></p>
        </div>
    `).join('');
    
    const emailBody = `
طلبك #${order.order_number || order.id} - تم التسليم! 🎉

مرحباً،

تم تسليم طلبك بنجاح. إليك بيانات الحسابات:

${accounts.map(acc => `
${acc.name || 'حساب'}:
Email: ${acc.email}
Password: ${acc.password}
`).join('\n')}

ملاحظات مهمة:
- لا تشارك بيانات الحساب مع أي شخص
- في حالة وجود أي مشكلة، تواصل معنا فوراً

شكراً لثقتك بـ Stack Store!
    `.trim();
    
    // Send via Formspree
    fetch('https://formspree.io/f/xqevlbeo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: 'Stack Store - تسليم الطلب',
            email: 'noreply@stackstore.com',
            _replyto: customerEmail,
            subject: `تم تسليم طلبك #${order.order_number || order.id} - Stack Store`,
            message: emailBody
        })
    }).catch(() => {});
}

// ===== Update UI for Auth (Add Orders Panel Link) =====
// Add this inside updateUIForAuth() where adminPanelLink is set:

// ===== VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^01[0-2,5]{1}[0-9]{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function showFieldError(fieldId, errorId, show) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field && error) {
        if (show) {
            field.classList.add('error');
            error.classList.add('show');
        } else {
            field.classList.remove('error');
            error.classList.remove('show');
        }
    }
}

function clearFieldErrors() {
    showFieldError('customerEmail', 'emailError', false);
    showFieldError('customerPhone', 'phoneError', false);
}

// ===== ORDER ID =====
function generateOrderId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return 'SS-' + timestamp + '-' + random;
}


// ===== EMAIL CONFIRMATION =====
function showEmailConfirmation(orderId, email) {
    const modal = document.getElementById('emailConfirmModal');
    const confirmOrderId = document.getElementById('confirmOrderId');
    const confirmEmail = document.getElementById('confirmEmail');
    const summary = document.getElementById('emailConfirmSummary');

    if (confirmOrderId) confirmOrderId.textContent = orderId;
    if (confirmEmail) confirmEmail.textContent = email;

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    let summaryHTML = '';
    cart.forEach(item => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        summaryHTML += `
            <div class="confirm-item">
                <span class="item-name">${item.name} × ${qty}</span>
                <span class="item-price">${itemTotal} ج.م</span>
            </div>
        `;
    });
    summaryHTML += `
        <div class="confirm-total">
            <span>الإجمالي</span>
            <span>${total} ج.م</span>
        </div>
    `;
    if (summary) summary.innerHTML = summaryHTML;

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeEmailConfirmModal() {
    const modal = document.getElementById('emailConfirmModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    clearCart();
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    // ✅ تأكد إن supabase initialized الأول
    if (!supabase) {
        initSupabase();
    }
    
    renderProducts();
    loadCart();
    animateCounters();
    initScrollReveal();
    
    // 🔥 استنى initAuth تخلص بالكامل (بتستنى 800ms عشان Supabase يحمل الـ session)
    await initAuth();
    
    console.log('✅ App initialized, auth state:', authState);
});

// ===== Loading Screen =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2200);
});

// ===== Navbar Scroll =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Render Products =====
function renderProducts(filter = 'all') {
    let filtered = products.filter(p => !p.hidden);
    if (filter !== 'all') {
        filtered = filtered.filter(p => p.category === filter);
    }

    productsGrid.innerHTML = filtered.map(product => {
        const durationSelector = renderDurationSelector(product);
        const { price, oldPrice } = getProductPrice(product);
        
        return `
        <div class="product-card ${product.hidden ? 'hidden-product' : ''}" data-id="${product.id}" data-category="${product.category}">
            ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badgeText}</span>` : ''}
            <div class="product-icon ${product.iconClass}">
                ${product.iconImage 
                    ? `<img src="images/${product.iconImage}" alt="${product.name}">` 
                    : `<i class="fas ${product.icon}"></i>`
                }
            </div>
            <h3>${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            
            ${durationSelector}
            
            <div class="product-features">
                ${product.features.map(f => `<div class="product-feature"><i class="fas fa-check"></i><span>${f}</span></div>`).join('')}
            </div>
            <div class="product-footer">
                <div class="product-price">
                    <span class="price-current">${formatPrice(price, true)}</span>
                    <span class="price-old">${formatPrice(oldPrice)}</span>
                </div>
                <button class="btn-buy" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i>
                    <span>شراء</span>
                </button>
            </div>
        </div>
    `}).join('');

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openProductModal(id);
        });
    });

    document.querySelectorAll('.product-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
}

// ===== Filter Products =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

// ===== Product Modal =====
function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const { price, oldPrice, period } = getProductPrice(product);

    // بناء selector المدة للمودال
     // بناء selector المدة للمودال
    let modalDurationHTML = '';
    if (product.durations && product.durations.length > 1) {
        const currentSelection = selectedDurations[product.id] || product.defaultDuration;
        const currentD = product.durations.find(d => d.period === currentSelection) || product.durations.find(d => d.available);
        
        // Calculate savings
        const getSavings = (d) => {
            if (!d.available) return '';
            const monthlyEquivalent = product.durations.find(x => x.period === '1 شهر')?.price || d.price;
            const periodMonths = d.period.includes('12') ? 12 : d.period.includes('6') ? 6 : d.period.includes('3') ? 3 : 1;
            const expectedPrice = monthlyEquivalent * periodMonths;
            const savings = expectedPrice - d.price;
            if (savings > 0 && periodMonths > 1) {
                return `وفر ${savings} ج.م`;
            }
            return '';
        };
        
        modalDurationHTML = `
            <div class="modal-duration-dropdown-container" id="modal-duration-dropdown-${product.id}">
                <button class="modal-duration-dropdown-btn" onclick="toggleModalDurationDropdown(${product.id}, event)">
                    <div class="duration-selected-info">
                        <span class="selected-period">📅 ${currentD?.period || ''}</span>
                        <span class="selected-price">${currentD?.price || 0} ج.م</span>
                    </div>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="modal-duration-dropdown-menu" id="modal-duration-menu-${product.id}">
                    ${product.durations.map(d => {
                        const isActive = d.period === currentSelection && d.available;
                        const isDisabled = !d.available;
                        const savingsText = getSavings(d);
                        
                        return `
                        <div class="modal-duration-option ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}" 
                             onclick="${isDisabled ? '' : `selectModalDuration(${product.id}, '${d.period}')`}">
                            <div class="modal-option-left">
                                <span class="modal-option-period">${d.period}</span>
                                ${savingsText ? `<span class="modal-option-save">💰 ${savingsText}</span>` : ''}
                            </div>
                            <div class="modal-option-prices">
                                ${d.available ? `
                                    <span class="modal-option-price-current">${d.price} ج.م</span>
                                ` : '<span style="color: var(--gray);">غير متاح</span>'}
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    modalContent.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-icon ${product.iconClass}">
                ${product.iconImage 
                    ? `<img src="images/${product.iconImage}" alt="${product.name}">` 
                    : `<i class="fas ${product.icon}"></i>`
                }
            </div>
            <h2>${product.name}</h2>
            <p class="modal-product-desc">${product.details.fullDesc}</p>
            
            ${modalDurationHTML}
            
            <div class="modal-product-details">
                <div class="detail-row"><i class="fas fa-clock"></i><span>المدة: ${product.details.duration}</span></div>
                <div class="detail-row"><i class="fas fa-shipping-fast"></i><span>التوصيل: ${product.details.delivery}</span></div>
                <div class="detail-row"><i class="fas fa-shield-alt"></i><span>الضمان: ${product.details.warranty}</span></div>
                <div class="detail-row"><i class="fas fa-headset"></i><span>الدعم: ${product.details.support}</span></div>
            </div>
            <div class="modal-product-price">
                <span class="price-current">${getFormattedPrice(price)}</span>
                <span class="price-old">${getFormattedPrice(oldPrice)}</span>
            </div>
            <button class="btn btn-primary btn-full" onclick="addToCart(${product.id}); closeProductModal();">
                <i class="fas fa-cart-plus"></i>
                <span>أضف للسلة (${period})</span>
            </button>
        </div>
    `;

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProductModal);
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
});

// ===== Cart Functions =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const period = selectedDurations[id] || product.defaultDuration;
    const durationData = product.durations.find(d => d.period === period);
    
    if (!durationData || !durationData.available) {
        showToast('هذه المدة غير متاحة لهذا المنتج');
        return;
    }

    const existingIndex = cart.findIndex(item => item.id === id && item.selectedPeriod === period);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
        saveCart();
        updateCart();
        showToast(`تم تحديث الكمية: ${cart[existingIndex].quantity} ${product.name} (${period})`);
        return;
    }

    const cartItem = { 
        ...product, 
        quantity: 1,
        selectedPeriod: period,
        price: durationData.price,
        oldPrice: durationData.oldPrice
    };
    cart.push(cartItem);
    saveCart();
    updateCart();
    showToast(`تمت إضافة ${product.name} (${period}) للسلة!`);

    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = '', 200);
}

function updateCartItemQty(index, change) {
    const item = cart[index];
    if (!item) return;

    const currentQty = item.quantity || 1;
    const newQty = currentQty + change;

    if (newQty < 1 || newQty > 10) return;

    item.quantity = newQty;
    saveCart();
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
    showToast('تم الحذف من السلة');
}

function updateCart() {
    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCount.textContent = totalQty;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>السلة فارغة</p>
            </div>
        `;
        cartTotal.textContent = getFormattedPrice(0);
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => {
        const qty = item.quantity || 1;
        const itemTotalEGP = item.price * qty;
        return `
            <div class="cart-item">
                <div class="cart-item-icon ${item.iconClass}">
                    ${item.iconImage 
                        ? `<img src="images/${item.iconImage}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain;padding:3px;">` 
                        : `<i class="fas ${item.icon}"></i>`
                    }
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${getFormattedPrice(itemTotalEGP)} (${getFormattedPrice(item.price)} × ${qty}) ${item.selectedPeriod ? `| ${item.selectedPeriod}` : ''}</span>
                </div>
                <div class="cart-item-qty-control">
                    <button class="qty-btn" onclick="updateCartItemQty(${index}, -1)" ${qty <= 1 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-value">${qty}</span>
                    <button class="qty-btn" onclick="updateCartItemQty(${index}, 1)" ${qty >= 10 ? 'disabled' : ''}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    const totalEGP = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    cartTotal.textContent = getFormattedPrice(totalEGP);
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = '1';

    // Currency display in cart
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter) {
        let bar = cartFooter.querySelector('.cart-currency-display');
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 'cart-currency-display';
            cartFooter.insertBefore(bar, cartFooter.firstChild);
        }
        const c = CURRENCY_RATES[currentCurrency];
        bar.innerHTML = `<span class="flag">${c.flag}</span><span>العملة: <strong>${c.name}</strong></span>`;
    }
}

function updateCartItemQty(index, change) {
    const item = cart[index];
    if (!item) return;

    const currentQty = item.quantity || 1;
    const newQty = currentQty + change;

    if (newQty < 1 || newQty > 10) return;

    item.quantity = newQty;
    saveCart();
    updateCart();
}

// ===== Cart Sidebar =====
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ===== Render Order Summary =====
function renderOrderSummary() {
    const summaryContainer = document.getElementById('orderSummary');
    const subtotalEl = document.getElementById('subtotalAmount');
    const grandTotalEl = document.getElementById('grandTotalAmount');
    const orderIdBox = document.getElementById('orderIdBox');
    const displayOrderId = document.getElementById('displayOrderId');

    const orderId = generateOrderId();
    window.currentOrderId = orderId;
    if (orderIdBox && displayOrderId) {
        orderIdBox.style.display = 'flex';
        displayOrderId.textContent = orderId;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const creditsNeeded = total * 5;

    // عرض المنتجات
    summaryContainer.innerHTML = cart.map(item => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        const itemCredits = itemTotal * 5;
        return `
            <div class="order-item">
                <div class="order-item-info">
                    <div class="order-item-icon ${item.iconClass}">
                        ${item.iconImage 
                            ? `<img src="images/${item.iconImage}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain;padding:3px;">` 
                            : `<i class="fas ${item.icon}"></i>`
                        }
                    </div>
                    <div class="order-item-details">
                        <h4>${item.name}</h4>
                        <div class="order-item-prices">
                            <span class="order-item-price-egp">${itemTotal} ج.م</span>
                            <span class="order-item-price-credits">
                                <i class="fas fa-coins"></i> ${formatCredits(itemCredits)}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="order-item-qty">
                    <span>× ${qty}</span>
                </div>
            </div>
        `;
    }).join('');

    // الإجمالي
    subtotalEl.innerHTML = `
        <span>${total} ج.م</span>
        <span class="subtotal-credits"><i class="fas fa-coins"></i> ${formatCredits(creditsNeeded)}</span>
    `;
    
    grandTotalEl.innerHTML = `
        <span>${total} ج.م</span>
        <span class="grandtotal-credits"><i class="fas fa-coins"></i> ${formatCredits(creditsNeeded)}</span>
    `;

    // ✅ زر الدفع بالرصيد - مضغوط
    const creditsPayBtn = document.getElementById('creditsPayBtn');
    
    if (creditsPayBtn) {
        const canAfford = userCredits >= creditsNeeded;
        const isAdminUser = isAdmin();
        
        creditsPayBtn.innerHTML = `
            <div class="credits-btn-content">
                <div class="credits-btn-main">
                    <i class="fas fa-coins"></i>
                    <span>دفع بالرصيد</span>
                </div>
                <div class="credits-btn-details">
                    <span class="credits-amount">${formatCredits(creditsNeeded)}</span>
                    <span class="credits-equals">=</span>
                    <span class="credits-egp">${total} ج.م</span>
                </div>
                <div class="credits-btn-balance">
                    <span>رصيدك: ${formatCredits(userCredits)}</span>
                    ${!canAfford && !isAdminUser ? '<span class="credits-shortage">(غير كافي)</span>' : ''}
                </div>
            </div>
        `;
        
        creditsPayBtn.disabled = !canAfford && !isAdminUser;
        creditsPayBtn.style.opacity = (canAfford || isAdminUser) ? '1' : '0.5';
        creditsPayBtn.style.cursor = (canAfford || isAdminUser) ? 'pointer' : 'not-allowed';
        
        if (!canAfford && !isAdminUser) {
            creditsPayBtn.title = `رصيدك غير كافي. تحتاج ${formatCredits(creditsNeeded)} Credits`;
        } else {
            creditsPayBtn.title = 'اضغط للدفع بالرصيد';
        }
    }

    // ✅ نخفي customer-info-box
    const customerInfoBox = document.querySelector('.customer-info-box');
    if (customerInfoBox) {
        customerInfoBox.style.display = 'none';
    }

    updateUIForAuth();
}

// ===== Checkout Button =====
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('السلة فارغة!');
        return;
    }

    if (!currentUser) {
        closeCart();
        openAuthModal();
        showToast('يرجى تسجيل الدخول أولاً لإتمام الشراء');
        return;
    }

    closeCart();
    renderOrderSummary();
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// ===== Opay Payment (Disabled) =====
document.getElementById('opayPayBtn').addEventListener('click', () => {
    showToast('الدفع عبر Opay غير متاح حالياً - سيتم تحويلك للدفع اليدوي');
    setTimeout(() => {
        closePaymentModal();
        openManualPaymentSelector();
    }, 1500);
});

// ===== Check Payment Success =====
function checkPaymentCallback() {
    const pendingOrder = localStorage.getItem('pendingOrder');
    if (pendingOrder) {
        localStorage.removeItem('pendingOrder');
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('orderId') || urlParams.has('status')) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

checkPaymentCallback();

// ===== Manual Payment =====
function openManualPaymentSelector() {
    closePaymentModal();

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const visibleMethods = ['vodafone', 'instapay'];

    paymentMethodsList.innerHTML = visibleMethods.map(key => {
        const method = paymentMethods[key];
        return `
            <div class="payment-method-card" onclick="selectManualPaymentMethod('${key}')">
                <div class="pm-icon ${method.iconClass}">
                    <i class="fas ${method.icon}"></i>
                </div>
                <div class="pm-info">
                    <h4>${method.name}</h4>
                    <p>الدفع عبر ${method.name}</p>
                </div>
                <i class="fas fa-chevron-left"></i>
            </div>
        `;
    }).join('');

    manualPaymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function selectManualPaymentMethod(methodKey) {
    closeManualPaymentSelector();

    const method = paymentMethods[methodKey];
    const totalEGP = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    window.currentOrderTotal = totalEGP;
    const total = getFormattedPrice(totalEGP);
    const productsList = cart.map(i => `${i.name} (×${i.quantity || 1})`).join(', ');

    paymentDetailsContent.innerHTML = `
        <div class="pd-header">
            <div class="pd-icon ${method.iconClass}">
                <i class="fas ${method.icon}"></i>
            </div>
            <h3>الدفع عبر ${method.name}</h3>
            <p>اتبع الخطوات التالية</p>
        </div>
        <div class="pd-details">
            <div class="pd-row">
                <span>اسم المستلم:</span>
                <span>${method.nameDisplay}</span>
            </div>
            <div class="pd-row">
                <span>رقم/كود التحويل:</span>
                <div class="copyable">
                    <span id="copyNumber">${method.number}</span>
                    <button class="btn-copy" onclick="copyToClipboard('copyNumber', this)">نسخ</button>
                </div>
            </div>
        </div>
        <div class="pd-total">
            <span>المبلغ المطلوب:</span>
            <span>${total}</span>
        </div>
        <div class="pd-instructions">
            <h4><i class="fas fa-list-ol"></i> خطوات الدفع:</h4>
            <ol>
                ${method.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
        </div>
        <a href="https://wa.me/${method.whatsapp}?text=مرحباً%20Stack%20Store%0A%0A✅%20تم%20الدفع%20يدوياً%0A📦%20المنتج:%20${encodeURIComponent(productsList)}%0A💰%20المبلغ:%20${total}%0A📧%20إيميلي:%20(اكتب%20إيميلك)" 
           target="_blank" class="pd-whatsapp">
            <i class="fab fa-whatsapp"></i>
            <span>إرسال إيصال الدفع على واتساب</span>
        </a>
    `;

    paymentDetailsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeManualPaymentSelector() {
    manualPaymentModal.classList.remove('active');
    document.body.style.overflow = '';
}

function closePaymentModal() {
    paymentModal.classList.remove('active');
    document.body.style.overflow = '';
}

manualPaymentClose.addEventListener('click', () => {
    manualPaymentModal.classList.remove('active');
    document.body.style.overflow = '';
});manualPaymentModal.addEventListener('click', (e) => {
    if (e.target === manualPaymentModal) closeManualPaymentSelector();
});

paymentClose.addEventListener('click', closePaymentModal);
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) closePaymentModal();
});

function closePaymentDetailsModal() {
    paymentDetailsModal.classList.remove('active');
    document.body.style.overflow = '';
    // نمسح القيم المؤقتة بعد ما يقفل
    pendingCreditsAmount = 0;
    pendingCreditsPrice = 0;
}

paymentDetailsClose.addEventListener('click', closePaymentDetailsModal);
paymentDetailsModal.addEventListener('click', (e) => {
    if (e.target === paymentDetailsModal) closePaymentDetailsModal();
});

// ===== Copy to Clipboard =====
function copyToClipboard(elementId, btn) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'تم النسخ!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'نسخ';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// ===== SUBMIT ORDER - COMPLETE FIX =====
async function submitOrder(paymentMethod) {
    
    // ═══════════════════════════════════════════════════════
    // VALIDATION
    // ═══════════════════════════════════════════════════════
    const customerName = document.getElementById('customerName')?.value?.trim();
    const customerEmail = document.getElementById('customerEmail')?.value?.trim();
    const customerPhone = document.getElementById('customerPhone')?.value?.trim();

    if (!customerEmail || !validateEmail(customerEmail)) {
        showFieldError('customerEmail', 'emailError', true);
        showToast('⚠️ يرجى إدخال إيميل صحيح');
        return;
    }
    
    if (!customerPhone || !validatePhone(customerPhone)) {
        showFieldError('customerPhone', 'phoneError', true);
        showToast('⚠️ يرجى إدخال رقم واتساب صحيح');
        return;
    }
    
    clearFieldErrors();

    const orderId = window.currentOrderId || generateOrderId();
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const productsList = cart.map(item => `${item.name} (x${item.quantity || 1})`).join(', ');

    // ═══════════════════════════════════════════════════════
    // STEP 1: SAVE ORDER (Supabase + localStorage)
    // ═══════════════════════════════════════════════════════
    console.log('💾 Starting order save...');
    let saveResult;
    
    try {
        saveResult = await saveOrderToDatabase(orderId, cart, cartTotal, 0, paymentMethod);
        console.log('💾 Save result:', saveResult);
    } catch (err) {
        console.error('❌ Save failed:', err);
        // Continue anyway - localStorage should have it
    }

    // ═══════════════════════════════════════════════════════
    // STEP 2: SEND TO GOOGLE SHEETS (backup)
    // ═══════════════════════════════════════════════════════
    const orderData = {
        orderId: orderId,
        customerName: customerName || 'عميل',
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        product: productsList,
        amount: cartTotal,
        paymentMethod: paymentMethod,
        supabaseSaved: saveResult?.supabaseSuccess || false
    };

    try {
        await fetch('https://script.google.com/macros/s/AKfycbwRbfy755weIk81gyKIgzxPSRNXzvFAT0zVQq98V72w0MM4yTio2SgYqSU837nEWj0V/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        console.log('✅ Google Sheets sent');
    } catch (err) {
        console.error('❌ Google Sheets error:', err);
    }
    
    // ═══════════════════════════════════════════════════════
    // STEP 3: SHOW CONFIRMATION
    // ═══════════════════════════════════════════════════════
    showEmailConfirmation(orderId, customerEmail);
    showToast('✅ تم إرسال طلبك! سنتواصل معك قريباً');
    
    // Clear cart
    clearCart();
}

// ===== Toast =====
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-header, .feature-card, .step-card, .testimonial-card, .faq-item-static, .contact-method, .footer-col');
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closePaymentModal();
        closePaymentDetailsModal();
        closeAuthModal();
        closeAccountPage();
        closeWalletPage();
        closeEmailConfirmModal();
        closeCreditsPaymentModal();
    }
});

// ===== SYNC CREDITS FROM DATABASE =====
async function syncCreditsFromDatabase() {
    if (!currentUser) return;
    
    try {
        const { data, error } = await supabase
            .from('users')
            .select('credits, username, display_name')
            .eq('id', currentUser.id)
            .single();
            
        if (data && !error) {
            userCredits = data.credits || 0;
            updateWalletDisplay();
            
            const creditsBalance = document.getElementById('creditsBalance');
            if (creditsBalance) creditsBalance.textContent = formatCredits(userCredits);
            
            const adminTotalCredits = document.getElementById('adminTotalCredits');
            if (adminTotalCredits) adminTotalCredits.textContent = formatCredits(userCredits);
            
            // تحديث LocalStorage
            const savedData = localStorage.getItem('stackStoreUserData_' + currentUser.id);
            let userData = savedData ? JSON.parse(savedData) : {};
            userData.credits = userCredits;
            userData.username = data.username || userData.username;
            userData.display_name = data.display_name || userData.display_name;
            localStorage.setItem('stackStoreUserData_' + currentUser.id, JSON.stringify(userData));
            
            console.log('✅ Synced from DB:', { credits: userCredits });
        }
    } catch (e) {
        console.error('⚠️ Sync error:', e);
    }
}

// مزامنة الرصيد كل 30 ثانية
setInterval(syncCreditsFromDatabase, 10000);

// ===== Toggle Create Order Form =====
function toggleCreateOrderForm() {
    const form = document.getElementById('createOrderForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
        resetProductFields(); // Reset when opening
    } else {
        form.style.display = 'none';
    }
}

// ===== Create Order for Customer - COMPLETE =====
async function createOrderForCustomer() {
    if (!isAdmin()) {
        showToast('⛔ غير مصرح');
        return;
    }

    const customerEmail = document.getElementById('newOrderCustomerEmail')?.value?.trim();
    
    if (!customerEmail) {
        showToast('⚠️ يرجى إدخال إيميل العميل');
        document.getElementById('newOrderCustomerEmail')?.focus();
        return;
    }

    // Collect all products
    const productEntries = document.querySelectorAll('#newOrderProductsList .product-entry');
    const items = [];
    const deliveredAccounts = [];
    
    for (const entry of productEntries) {
        const index = entry.dataset.index;
        
        const productNameInput = entry.querySelector('.new-order-product-name');
        const accountEmailInput = entry.querySelector('.new-order-account-email');
        const accountPassInput = entry.querySelector('.new-order-account-pass');
        
        const productName = productNameInput?.value?.trim();
        const accountEmail = accountEmailInput?.value?.trim();
        const accountPass = accountPassInput?.value?.trim();
        
        if (!productName) {
            showToast(`⚠️ يرجى إدخال اسم المنتج رقم ${parseInt(index) + 1}`);
            productNameInput?.focus();
            return;
        }
        
        if (!accountEmail) {
            showToast(`⚠️ يرجى إدخال Email للحساب رقم ${parseInt(index) + 1}`);
            accountEmailInput?.focus();
            return;
        }
        
        if (!accountPass) {
            showToast(`⚠️ يرجى إدخال Password للحساب رقم ${parseInt(index) + 1}`);
            accountPassInput?.focus();
            return;
        }
        
        items.push({
            product_id: 0,
            name: productName,
            quantity: 1,
            price: 0
        });
        
        deliveredAccounts.push({
            name: productName,
            email: accountEmail,
            password: accountPass,
            quantity: 1
        });
    }

    if (items.length === 0) {
        showToast('⚠️ يرجى إضافة منتج واحد على الأقل');
        return;
    }

    // Generate order ID
    const orderId = generateOrderId();

    // Find user by email
    let userId = null;
    let userUsername = 'عميل';
    
    try {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, username, display_name')
            .eq('email', customerEmail)
            .single();
            
        if (userData && !userError) {
            userId = userData.id;
            userUsername = userData.username || userData.display_name || 'عميل';
        }
    } catch (e) {
        console.log('User not found in database, using email only');
    }

    const orderData = {
        user_id: userId,
        order_number: orderId,
        items: items,
        total: 0,
        total_price: 0,
        payment_method: 'manual',
        status: 'completed',
        customer_name: userUsername,
        customer_email: customerEmail,
        customer_phone: '',
        user_email: customerEmail,
        user_username: userUsername,
        created_at: new Date().toISOString(),
        delivered_accounts: JSON.stringify(deliveredAccounts),
        delivered_at: new Date().toISOString()
    };

    // Save to Supabase
    let supabaseSuccess = false;
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData])
            .select();

        if (error) {
            console.error('❌ Supabase error:', error);
        } else {
            supabaseSuccess = true;
            console.log('✅ Order saved to Supabase:', data);
        }
    } catch (e) {
        console.error('❌ Supabase failed:', e);
    }

    // ═══════════════════════════════════════════════════════
    // SAVE TO LOCALSTORAGE (MULTIPLE LOCATIONS FOR LOOKUP)
    // ═══════════════════════════════════════════════════════
    try {
        // 1. General storage (for Admin Panel)
        let allOrders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        allOrders.unshift({ ...orderData, _source: supabaseSuccess ? 'supabase' : 'local' });
        localStorage.setItem('stackStoreOrders', JSON.stringify(allOrders));
        
        // 2. User-specific storage (by user_id)
        if (userId) {
            const userOrdersKey = 'stackStoreUserOrders_' + userId;
            let userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
            userOrders.unshift({ ...orderData, _source: supabaseSuccess ? 'supabase' : 'local' });
            localStorage.setItem(userOrdersKey, JSON.stringify(userOrders));
        }
        
        // 3. Email-based storage (for email lookup when user_id is null)
        const emailKey = 'stackStoreOrdersByEmail_' + customerEmail.toLowerCase().replace(/[^a-z0-9]/g, '_');
        let emailOrders = JSON.parse(localStorage.getItem(emailKey) || '[]');
        emailOrders.unshift({ ...orderData, _source: supabaseSuccess ? 'supabase' : 'local' });
        localStorage.setItem(emailKey, JSON.stringify(emailOrders));
        
        console.log('✅ Saved to 3 locations: general, user_id, email');
        
    } catch (e) {
        console.error('❌ localStorage error:', e);
    }

    // Send email
    try {
        await sendDeliveryEmail(orderData, deliveredAccounts);
    } catch (e) {
        console.error('❌ Email failed:', e);
    }

    // Reset form
    document.getElementById('newOrderCustomerEmail').value = '';
    resetProductFields();
    document.getElementById('createOrderForm').style.display = 'none';

    showToast('✅ تم إنشاء الطلب وإرساله للعميل!');
    
    // Refresh admin orders
    await loadAdminOrders();
}

// ===== Toggle Order Card (Expand/Collapse) =====
function toggleOrderCard(cardId) {
    const card = document.getElementById(cardId);
    if (!card) {
        console.warn('⚠️ Card not found:', cardId);
        return;
    }
    
    const isExpanded = card.getAttribute('data-expanded') === 'true';
    const btn = card.querySelector('.order-toggle-btn i');
    
    if (isExpanded) {
        // Collapse
        card.classList.add('compact');
        card.setAttribute('data-expanded', 'false');
        if (btn) btn.className = 'fas fa-chevron-down';
    } else {
        // Expand
        card.classList.remove('compact');
        card.setAttribute('data-expanded', 'true');
        if (btn) btn.className = 'fas fa-chevron-up';
    }
}

// ===== Toggle Add More Form =====
function toggleAddMore(orderId) {
    const form = document.getElementById(`add-more-form-${orderId}`);
    if (!form) return;
    
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// ===== Add More Product/Account to Order =====
async function addMoreToOrder(orderId) {
    if (!isAdmin()) return;
    
    const productName = document.getElementById(`add-product-name-${orderId}`)?.value.trim();
    const accountEmail = document.getElementById(`add-account-email-${orderId}`)?.value.trim();
    const accountPass = document.getElementById(`add-account-pass-${orderId}`)?.value.trim();
    
    if (!productName || !accountEmail || !accountPass) {
        showToast('⚠️ يرجى ملء جميع الحقول');
        return;
    }
    
    // Find order
    let order = null;
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .or(`order_number.eq.${orderId},id.eq.${orderId}`)
            .single();
            
        if (data && !error) {
            order = data;
        }
    } catch (e) {
        const orders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        order = orders.find(o => o.id === orderId || o.order_number === orderId);
    }
    
    if (!order) {
        showToast('❌ الطلب غير موجود');
        return;
    }
    
    // Parse existing items and accounts
    let items = [];
    let accounts = [];
    
    try {
        if (typeof order.items === 'string') {
            items = JSON.parse(order.items);
        } else if (Array.isArray(order.items)) {
            items = order.items;
        }
    } catch (e) {}
    
    try {
        if (typeof order.delivered_accounts === 'string') {
            accounts = JSON.parse(order.delivered_accounts);
        } else if (Array.isArray(order.delivered_accounts)) {
            accounts = order.delivered_accounts;
        }
    } catch (e) {}
    
    // Add new item
    items.push({
        product_id: 0,
        name: productName,
        quantity: 1,
        price: 0
    });
    
    // Add new account (but keep pending since we're adding more)
    // Actually, for pending orders, we just add inputs to the form
    // The accounts will be saved when deliverOrder is called
    
    // Update order in database
    const updateData = {
        items: JSON.stringify(items),
        total: items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0),
        total_price: items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0)
    };
    
    try {
        await supabase
            .from('orders')
            .update(updateData)
            .or(`order_number.eq.${orderId},id.eq.${orderId}`);
    } catch (e) {
        // Fallback to localStorage
        let orders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        const idx = orders.findIndex(o => o.id === orderId || o.order_number === orderId);
        if (idx !== -1) {
            orders[idx] = { ...orders[idx], ...updateData };
            localStorage.setItem('stackStoreOrders', JSON.stringify(orders));
        }
    }
    
    // Add new input fields to the form
    const accountsList = document.getElementById(`accounts-list-${orderId}`);
    if (accountsList) {
        const newIdx = accountsList.children.length;
        const newInput = document.createElement('div');
        newInput.className = 'delivery-account-input';
        newInput.id = `existing-account-${orderId}-${newIdx}`;
        newInput.innerHTML = `
            <label>${productName}</label>
            <input type="text" id="deliver-email-${orderId}-${newIdx}" placeholder="Email" value="${accountEmail}">
            <input type="text" id="deliver-pass-${orderId}-${newIdx}" placeholder="Password" value="${accountPass}">
        `;
        accountsList.appendChild(newInput);
    }
    
    // Clear add more form
    document.getElementById(`add-product-name-${orderId}`).value = '';
    document.getElementById(`add-account-email-${orderId}`).value = '';
    document.getElementById(`add-account-pass-${orderId}`).value = '';
    document.getElementById(`add-more-form-${orderId}`).style.display = 'none';
    
    showToast('✅ تم إضافة المنتج والحساب');
}

// ===== Updated deliverOrder to handle multiple accounts =====
async function deliverOrder(orderId) {
    if (!isAdmin()) return;
    
    // Find order
    let order = null;
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .or(`order_number.eq.${orderId},id.eq.${orderId}`)
            .single();
            
        if (data && !error) {
            order = data;
        }
    } catch (e) {
        const orders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        order = orders.find(o => o.id === orderId || o.order_number === orderId);
    }
    
    if (!order) {
        showToast('❌ الطلب غير موجود');
        return;
    }
    
    let items = [];
    try {
        if (typeof order.items === 'string') {
            items = JSON.parse(order.items);
        } else if (Array.isArray(order.items)) {
            items = order.items;
        } else if (order.items && typeof order.items === 'object') {
            items = Object.values(order.items);
        }
    } catch (e) {
        items = [];
    }
    
    const deliveredAccounts = [];
    
    // Collect all account details from inputs
    for (let i = 0; i < items.length; i++) {
        const emailInput = document.getElementById(`deliver-email-${orderId}-${i}`);
        const passInput = document.getElementById(`deliver-pass-${orderId}-${i}`);
        
        const email = emailInput?.value.trim();
        const password = passInput?.value.trim();
        
        if (!email || !password) {
            showToast(`⚠️ يرجى ملء بيانات الحساب رقم ${i + 1}`);
            return;
        }
        
        deliveredAccounts.push({
            name: items[i].name || 'حساب',
            email: email,
            password: password,
            quantity: items[i].quantity || 1
        });
    }
    
    // Update order status
    const updateData = {
        status: 'completed',
        delivered_accounts: JSON.stringify(deliveredAccounts),
        delivered_at: new Date().toISOString()
    };
    
    try {
        await supabase
            .from('orders')
            .update(updateData)
            .or(`order_number.eq.${orderId},id.eq.${orderId}`);
    } catch (e) {
        let orders = JSON.parse(localStorage.getItem('stackStoreOrders') || '[]');
        const idx = orders.findIndex(o => o.id === orderId || o.order_number === orderId);
        if (idx !== -1) {
            orders[idx] = { ...orders[idx], ...updateData };
            localStorage.setItem('stackStoreOrders', JSON.stringify(orders));
        }
    }
    
    await sendDeliveryEmail(order, deliveredAccounts);
    
    showToast('✅ تم التسليم وإرسال الإيميل للعميل');
    loadAdminOrders();
}

// ===== Add Product Field in Create Order =====
let productCount = 1;

// ===== Add Product Field - FIXED =====
function addProductField() {
    const container = document.getElementById('newOrderProductsList');
    const productEntries = container.querySelectorAll('.product-entry');
    const index = productEntries.length; // الرقم الجديد

    const newProduct = document.createElement('div');
    newProduct.className = 'product-entry';
    newProduct.dataset.index = index;
    newProduct.style.cssText = 'margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); animation: fadeIn 0.3s ease;';
    
    newProduct.innerHTML = `
        <div style="border-top: 1px dashed var(--glass-border); margin-bottom: 15px;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h4 style="font-size: 0.9rem; color: var(--primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-box"></i> 
                منتج #${index + 1}
            </h4>
            <button onclick="removeProductField(this)" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #EF4444; padding: 5px 12px; border-radius: var(--radius-sm); font-family: inherit; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                <i class="fas fa-trash"></i>
                حذف
            </button>
        </div>

        <!-- اسم المنتج -->
        <div style="margin-bottom: 15px;">
            <label style="display: block; font-size: 0.85rem; color: var(--gray-light); margin-bottom: 8px;">
                <i class="fas fa-tag" style="color: var(--primary); margin-left: 5px;"></i>
                اسم المنتج
            </label>
            <input type="text" class="new-order-product-name" data-index="${index}" placeholder="مثال: ChatGPT Plus" 
                   style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--white); font-family: inherit; font-size: 0.9rem; outline: none; transition: all 0.3s ease;">
        </div>

        <!-- بيانات الحساب -->
        <div style="background: rgba(0,0,0,0.2); border-radius: var(--radius-sm); padding: 15px;">
            <h5 style="font-size: 0.8rem; color: var(--gray-light); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                <i class="fas fa-key" style="color: var(--secondary);"></i>
                بيانات الحساب
            </h5>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <input type="text" class="new-order-account-email" data-index="${index}" placeholder="Email" 
                       style="padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--white); font-family: inherit; font-size: 0.85rem; outline: none;">
                <input type="text" class="new-order-account-pass" data-index="${index}" placeholder="Password" 
                       style="padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--white); font-family: inherit; font-size: 0.85rem; outline: none;">
            </div>
        </div>
    `;
    
    container.appendChild(newProduct);
    
    // Focus on the new product name input
    setTimeout(() => {
        const newInput = newProduct.querySelector('.new-order-product-name');
        if (newInput) newInput.focus();
    }, 100);
}

// ===== Remove Product Field =====
function removeProductField(btn) {
    const entry = btn.closest('.product-entry');
    if (!entry) return;
    
    // Don't remove if it's the only product
    const allEntries = document.querySelectorAll('#newOrderProductsList .product-entry');
    if (allEntries.length <= 1) {
        showToast('⚠️ يجب أن يكون هناك منتج واحد على الأقل');
        return;
    }
    
    entry.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        entry.remove();
        // Re-number remaining products
        const remaining = document.querySelectorAll('#newOrderProductsList .product-entry');
        remaining.forEach((entry, idx) => {
            entry.dataset.index = idx;
            const title = entry.querySelector('h4');
            if (title) title.innerHTML = `<i class="fas fa-box"></i> منتج #${idx + 1}`;
            
            // Update data-index on inputs
            entry.querySelectorAll('[data-index]').forEach(input => {
                input.dataset.index = idx;
            });
        });
    }, 300);
}

// Add fadeOut animation if not exists
if (!document.getElementById('fadeOutStyle')) {
    const style = document.createElement('style');
    style.id = 'fadeOutStyle';
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// ===== Reset Product Fields =====
function resetProductFields() {
    const container = document.getElementById('newOrderProductsList');
    
    container.innerHTML = `
        <!-- المنتج الأول -->
        <div class="product-entry" data-index="0" style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md);">
            
            <h4 style="font-size: 0.9rem; color: var(--primary); margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-box"></i> 
                منتج #1
            </h4>

            <!-- اسم المنتج -->
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: 0.85rem; color: var(--gray-light); margin-bottom: 8px;">
                    <i class="fas fa-tag" style="color: var(--primary); margin-left: 5px;"></i>
                    اسم المنتج
                </label>
                <input type="text" class="new-order-product-name" data-index="0" placeholder="مثال: ChatGPT Plus" 
                       style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--white); font-family: inherit; font-size: 0.9rem; outline: none; transition: all 0.3s ease;">
            </div>

            <!-- بيانات الحساب -->
            <div style="background: rgba(0,0,0,0.2); border-radius: var(--radius-sm); padding: 15px;">
                <h5 style="font-size: 0.8rem; color: var(--gray-light); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                    <i class="fas fa-key" style="color: var(--secondary);"></i>
                    بيانات الحساب
                </h5>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <input type="text" class="new-order-account-email" data-index="0" placeholder="Email" 
                           style="padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--white); font-family: inherit; font-size: 0.85rem; outline: none;">
                    <input type="text" class="new-order-account-pass" data-index="0" placeholder="Password" 
                           style="padding: 10px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--white); font-family: inherit; font-size: 0.85rem; outline: none;">
                </div>
            </div>
        </div>
    `;
}

// ===== Duration System =====
let selectedDurations = {};

function getProductPrice(product) {
    const duration = selectedDurations[product.id] || product.defaultDuration;
    const d = product.durations.find(x => x.period === duration);
    if (d && d.available) return { price: d.price, oldPrice: d.oldPrice, period: duration };
    const first = product.durations.find(x => x.available);
    return { price: first?.price || 0, oldPrice: first?.oldPrice || 0, period: first?.period || '' };
}

function renderDurationSelector(product) {
    if (!product.durations || product.durations.length <= 1) return '';
    const current = selectedDurations[product.id] || product.defaultDuration;
    const currentDuration = product.durations.find(d => d.period === current) || product.durations.find(d => d.available);
    
    if (!currentDuration) return '';
    
    // Calculate savings for display
    const getSavings = (d) => {
        if (!d.available) return '';
        const monthlyEquivalent = product.durations.find(x => x.period === '1 شهر')?.price || d.price;
        const periodMonths = d.period.includes('12') ? 12 : d.period.includes('6') ? 6 : d.period.includes('3') ? 3 : 1;
        const expectedPrice = monthlyEquivalent * periodMonths;
        const savings = expectedPrice - d.price;
        if (savings > 0 && periodMonths > 1) {
            return `وفر ${savings} ج.م`;
        }
        return '';
    };
    
    return `
    <div class="duration-dropdown-container" id="duration-dropdown-${product.id}">
        <button class="duration-dropdown-btn" onclick="toggleDurationDropdown(${product.id}, event)">
            <div class="duration-selected">
                <span>📅 ${currentDuration.period}</span>
                <span class="current-price">${currentDuration.price} ج.م</span>
            </div>
            <i class="fas fa-chevron-down"></i>
        </button>
        <div class="duration-dropdown-menu" id="duration-menu-${product.id}">
            ${product.durations.map(d => {
                const isActive = d.period === current && d.available;
                const isDisabled = !d.available;
                const savingsText = getSavings(d);
                
                return `
                <div class="duration-option ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}" 
                     onclick="${isDisabled ? '' : `selectDuration(${product.id}, '${d.period}', event)`}">
                    <div class="option-left">
                        <span class="option-period">${d.period}</span>
                        ${savingsText ? `<span class="option-badge">${savingsText}</span>` : ''}
                    </div>
                    <div class="option-prices">
                        ${d.available ? `
                            <span class="option-price-current">${d.price} ج.م</span>
                        ` : '<span style="color: var(--gray); font-size: 0.85rem;">غير متاح</span>'}
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    </div>`;
}

function toggleDurationDropdown(productId, event) {
    event.stopPropagation();
    
    // Close all other dropdowns first
    document.querySelectorAll('.duration-dropdown-menu.open').forEach(menu => {
        if (menu.id !== `duration-menu-${productId}`) {
            menu.classList.remove('open');
            menu.previousElementSibling?.classList.remove('open');
        }
    });
    
    const menu = document.getElementById(`duration-menu-${productId}`);
    const btn = document.querySelector(`#duration-dropdown-${productId} .duration-dropdown-btn`);
    
    if (menu && btn) {
        menu.classList.toggle('open');
        btn.classList.toggle('open');
    }
}

function toggleModalDurationDropdown(productId, event) {
    event.stopPropagation();
    
    // Close all other modal dropdowns
    document.querySelectorAll('.modal-duration-dropdown-menu.open').forEach(menu => {
        if (menu.id !== `modal-duration-menu-${productId}`) {
            menu.classList.remove('open');
            menu.previousElementSibling?.classList.remove('open');
        }
    });
    
    const menu = document.getElementById(`modal-duration-menu-${productId}`);
    const btn = document.querySelector(`#modal-duration-dropdown-${productId} .modal-duration-dropdown-btn`);
    
    if (menu && btn) {
        menu.classList.toggle('open');
        btn.classList.toggle('open');
    }
}

// Close modal dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.modal-duration-dropdown-container')) {
        document.querySelectorAll('.modal-duration-dropdown-menu.open').forEach(menu => {
            menu.classList.remove('open');
            menu.previousElementSibling?.classList.remove('open');
        });
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.duration-dropdown-container')) {
        document.querySelectorAll('.duration-dropdown-menu.open').forEach(menu => {
            menu.classList.remove('open');
            menu.previousElementSibling?.classList.remove('open');
        });
    }
});

function selectDuration(productId, period, event) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    const d = product.durations.find(x => x.period === period);
    if (!d || !d.available) return;
    selectedDurations[productId] = period;
    
    // Close dropdown
    const menu = document.getElementById(`duration-menu-${productId}`);
    const btn = document.querySelector(`#duration-dropdown-${productId} .duration-dropdown-btn`);
    if (menu) menu.classList.remove('open');
    if (btn) btn.classList.remove('open');
    
    // Re-render the card to update dropdown display
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (card) {
        const dropdownContainer = card.querySelector('.duration-dropdown-container');
        if (dropdownContainer) {
            dropdownContainer.outerHTML = renderDurationSelector(product);
        }
        
        // Update prices
        const { price, oldPrice } = getProductPrice(product);
        const priceCurrent = card.querySelector('.price-current');
        const priceOld = card.querySelector('.price-old');
        if (priceCurrent) priceCurrent.innerHTML = formatPrice(price, true);
        if (priceOld) priceOld.innerHTML = formatPrice(oldPrice);
    }
    
    // Update cart if exists
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.selectedPeriod = period;
        item.price = d.price;
        item.oldPrice = d.oldPrice;
        saveCart(); updateCart();
    }
}

function selectModalDuration(productId, period) {
    const product = products.find(p => p.id === productId);
    const d = product.durations.find(x => x.period === period);
    if (!d || !d.available) return;
    selectedDurations[productId] = period;
    
    // Close dropdown and reopen modal to refresh
    const menu = document.getElementById(`modal-duration-menu-${productId}`);
    const btn = document.querySelector(`#modal-duration-dropdown-${productId} .modal-duration-dropdown-btn`);
    if (menu) menu.classList.remove('open');
    if (btn) btn.classList.remove('open');
    
    openProductModal(productId);
}
