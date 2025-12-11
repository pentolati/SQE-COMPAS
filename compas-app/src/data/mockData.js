// ============================================
// COMPAS Mock Data - Rich & Interactive
// ============================================

// === ENTITIES with detailed metrics ===
export const entities = [
  {
    id: 1,
    name: 'Bank Sinarmas',
    code: 'BSIM',
    type: 'Banking',
    score: 94,
    trend: '+3%',
    trendDirection: 'up',
    employees: 4500,
    revenue: 'Rp 8.2T',
    riskExposure: 'Rp 120M',
    lastAudit: '2024-10-15',
    auditResult: 'Pass',
    keyMetrics: {
      amlScore: 96,
      kycCompletion: 98,
      reportingOnTime: 92,
      trainingCompletion: 88
    }
  },
  {
    id: 2,
    name: 'Asuransi Sinar Mas',
    code: 'ASM',
    type: 'Insurance',
    score: 89,
    trend: '+5%',
    trendDirection: 'up',
    employees: 2800,
    revenue: 'Rp 12.5T',
    riskExposure: 'Rp 85M',
    lastAudit: '2024-09-20',
    auditResult: 'Pass',
    keyMetrics: {
      amlScore: 91,
      kycCompletion: 87,
      reportingOnTime: 94,
      trainingCompletion: 82
    }
  },
  {
    id: 3,
    name: 'Sinarmas Multifinance',
    code: 'SMMF',
    type: 'Multifinance',
    score: 78,
    trend: '-2%',
    trendDirection: 'down',
    employees: 1200,
    revenue: 'Rp 3.1T',
    riskExposure: 'Rp 650M',
    lastAudit: '2024-11-01',
    auditResult: 'Conditional',
    keyMetrics: {
      amlScore: 75,
      kycCompletion: 72,
      reportingOnTime: 81,
      trainingCompletion: 68
    }
  },
  {
    id: 4,
    name: 'Sinarmas Sekuritas',
    code: 'SMS',
    type: 'Securities',
    score: 92,
    trend: '+1%',
    trendDirection: 'up',
    employees: 650,
    revenue: 'Rp 1.8T',
    riskExposure: 'Rp 45M',
    lastAudit: '2024-08-30',
    auditResult: 'Pass',
    keyMetrics: {
      amlScore: 94,
      kycCompletion: 95,
      reportingOnTime: 90,
      trainingCompletion: 91
    }
  },
  {
    id: 5,
    name: 'Golden Energy Mines',
    code: 'GEMS',
    type: 'Mining',
    score: 71,
    trend: '-5%',
    trendDirection: 'down',
    employees: 8500,
    revenue: 'USD 3.2B',
    riskExposure: 'Rp 1.2B',
    lastAudit: '2024-07-15',
    auditResult: 'Needs Improvement',
    keyMetrics: {
      environmentalScore: 68,
      safetyScore: 74,
      reportingOnTime: 65,
      trainingCompletion: 72
    }
  },
];

// === RISK HEATMAP with clickable details ===
export const riskHeatmap = [
  {
    entity: 'Bank Sinarmas',
    code: 'BSIM',
    aml: 'low',
    kyc: 'low',
    reporting: 'medium',
    operational: 'low',
    details: {
      aml: { score: 96, issues: 2, trend: 'improving' },
      kyc: { score: 98, issues: 5, trend: 'stable' },
      reporting: { score: 85, issues: 8, trend: 'declining' },
      operational: { score: 92, issues: 3, trend: 'improving' }
    }
  },
  {
    entity: 'Asuransi Sinar Mas',
    code: 'ASM',
    aml: 'low',
    kyc: 'medium',
    reporting: 'low',
    operational: 'medium',
    details: {
      aml: { score: 91, issues: 4, trend: 'stable' },
      kyc: { score: 78, issues: 15, trend: 'improving' },
      reporting: { score: 94, issues: 2, trend: 'stable' },
      operational: { score: 76, issues: 12, trend: 'declining' }
    }
  },
  {
    entity: 'Sinarmas Multifinance',
    code: 'SMMF',
    aml: 'medium',
    kyc: 'high',
    reporting: 'medium',
    operational: 'medium',
    details: {
      aml: { score: 75, issues: 18, trend: 'declining' },
      kyc: { score: 62, issues: 247, trend: 'critical' },
      reporting: { score: 78, issues: 11, trend: 'stable' },
      operational: { score: 72, issues: 22, trend: 'declining' }
    }
  },
  {
    entity: 'Sinarmas Sekuritas',
    code: 'SMS',
    aml: 'low',
    kyc: 'low',
    reporting: 'low',
    operational: 'low',
    details: {
      aml: { score: 94, issues: 3, trend: 'stable' },
      kyc: { score: 95, issues: 4, trend: 'improving' },
      reporting: { score: 90, issues: 5, trend: 'stable' },
      operational: { score: 93, issues: 2, trend: 'improving' }
    }
  },
  {
    entity: 'Golden Energy Mines',
    code: 'GEMS',
    aml: 'low',
    kyc: 'low',
    reporting: 'high',
    operational: 'high',
    details: {
      aml: { score: 88, issues: 5, trend: 'stable' },
      kyc: { score: 85, issues: 8, trend: 'stable' },
      reporting: { score: 58, issues: 34, trend: 'critical' },
      operational: { score: 62, issues: 45, trend: 'critical' }
    }
  },
];

// === C-LEVEL EXECUTIVE METRICS ===
export const executiveMetrics = {
  overallScore: 85,
  scoreTrend: '+2.3%',
  totalRiskExposure: 2350000000, // Rp 2.35B
  riskTrend: '-8%',
  complianceRate: 91,
  complianceTrend: '+4%',
  auditReadiness: 88,
  monthlyTrend: [
    { month: 'Jul', score: 78, risk: 3200 },
    { month: 'Aug', score: 80, risk: 2900 },
    { month: 'Sep', score: 82, risk: 2700 },
    { month: 'Oct', score: 83, risk: 2600 },
    { month: 'Nov', score: 84, risk: 2450 },
    { month: 'Dec', score: 85, risk: 2350 },
  ],
  riskByCategory: [
    { name: 'KYC Gaps', value: 650, color: '#FF6B9D' },
    { name: 'Reporting Delays', value: 850, color: '#C850C0' },
    { name: 'Environmental', value: 500, color: '#6366F1' },
    { name: 'AML Issues', value: 350, color: '#22D3EE' },
  ],
  regulatoryHealth: {
    ojk: { score: 92, status: 'good', pendingItems: 3 },
    bi: { score: 88, status: 'good', pendingItems: 5 },
    moe: { score: 68, status: 'warning', pendingItems: 12 },
    moemr: { score: 74, status: 'warning', pendingItems: 8 },
  }
};

// === ALERTS with more detail ===
export const alerts = [
  {
    id: 1,
    title: 'KYC Document Expiration - High Volume',
    description: '247 dokumen KYC nasabah akan kedaluwarsa dalam 30 hari. Perlu tindakan segera.',
    severity: 'high',
    confidence: 94,
    entity: 'Sinarmas Multifinance',
    entityCode: 'SMMF',
    category: 'KYC Compliance',
    timestamp: '2024-12-11T08:30:00',
    aiExplanation: 'Analisis database menunjukkan 247 dokumen KYC dengan tanggal kedaluwarsa antara 11 Des - 11 Jan. Data historis menunjukkan 15% tingkat keterlambatan perpanjangan yang dapat memicu sanksi OJK. Estimasi denda: Rp 500M jika tidak ditangani.',
    status: 'open',
    potentialFine: 500000000,
    affectedCustomers: 247,
    recommendedAction: 'Kirim reminder batch ke 247 nasabah dan assign tim khusus untuk follow-up'
  },
  {
    id: 2,
    title: 'Environmental Monitoring Gap - Critical',
    description: 'Data monitoring air tanah Site Kalimantan-3 tidak ada selama 7 hari.',
    severity: 'critical',
    confidence: 98,
    entity: 'Golden Energy Mines',
    entityCode: 'GEMS',
    category: 'Environmental',
    timestamp: '2024-12-11T07:15:00',
    aiExplanation: 'Regulasi MOE 20/2025 mewajibkan monitoring air tanah kontinyu. Site K-3 belum submit data sejak 4 Des. Diduga sensor malfunction. Risiko: Denda Rp 1.2B + potensi penghentian operasi sementara.',
    status: 'in_progress',
    potentialFine: 1200000000,
    affectedSites: 1,
    recommendedAction: 'Dispatch tim teknis ke Site K-3 untuk perbaikan sensor dalam 24 jam'
  },
  {
    id: 3,
    title: 'Transaction Pattern Anomaly',
    description: 'Pola transaksi tidak biasa terdeteksi di Cabang Jakarta Selatan.',
    severity: 'medium',
    confidence: 76,
    entity: 'Bank Sinarmas',
    entityCode: 'BSIM',
    category: 'AML Monitoring',
    timestamp: '2024-12-11T06:45:00',
    aiExplanation: 'Model ML mendeteksi 3 akun dengan pola transaksi menyimpang 2.5 std dari baseline. Pola mirip dengan structuring behavior. Confidence 76% - belum konklusif, rekomendasikan human review sebelum eskalasi ke PPATK.',
    status: 'open',
    potentialFine: 250000000,
    suspiciousAccounts: 3,
    recommendedAction: 'Assign ke AML Investigation Unit untuk review manual dalam 48 jam'
  },
  {
    id: 4,
    title: 'Quarterly Report Submission Deadline',
    description: 'Laporan OJK Q4 harus disubmit dalam 20 hari.',
    severity: 'medium',
    confidence: 100,
    entity: 'All Financial Entities',
    entityCode: 'ALL',
    category: 'Regulatory Reporting',
    timestamp: '2024-12-11T00:00:00',
    aiExplanation: 'Deadline laporan OJK quarterly: 31 Desember 2024. Status: BSIM (85% ready), ASM (78% ready), SMMF (62% ready), SMS (90% ready). SMMF berisiko terlambat.',
    status: 'open',
    potentialFine: 100000000,
    entitiesAtRisk: ['SMMF'],
    recommendedAction: 'Prioritaskan penyelesaian laporan SMMF, assign additional resources'
  },
];

// === DEADLINES with urgency ===
export const deadlines = [
  {
    id: 1,
    title: 'Laporan Triwulan OJK Q4',
    dueDate: '2024-12-31',
    daysLeft: 20,
    entity: 'All Financial',
    priority: 'high',
    progress: 78,
    status: 'on_track',
    owner: 'Compliance Division'
  },
  {
    id: 2,
    title: 'Laporan Lingkungan MOE',
    dueDate: '2025-01-15',
    daysLeft: 35,
    entity: 'GEMS',
    priority: 'high',
    progress: 45,
    status: 'at_risk',
    owner: 'Environmental Team'
  },
  {
    id: 3,
    title: 'Audit AML Tahunan',
    dueDate: '2025-01-31',
    daysLeft: 51,
    entity: 'BSIM',
    priority: 'medium',
    progress: 92,
    status: 'on_track',
    owner: 'Internal Audit'
  },
  {
    id: 4,
    title: 'Sertifikasi SMKP Update',
    dueDate: '2025-02-28',
    daysLeft: 79,
    entity: 'GEMS',
    priority: 'medium',
    progress: 30,
    status: 'on_track',
    owner: 'Safety Division'
  },
  {
    id: 5,
    title: 'Review SOP Kredit',
    dueDate: '2025-01-20',
    daysLeft: 40,
    entity: 'SMMF',
    priority: 'high',
    progress: 55,
    status: 'at_risk',
    owner: 'Credit Division'
  },
];

// === GAMIFICATION DATA ===
export const userProfile = {
  name: 'Tata Ariesta',
  role: 'Senior Compliance Manager',
  entity: 'SQE (S-Quantum Engine)',
  avatar: null,
  level: 12,
  levelName: 'Compliance Champion',
  xp: 2450,
  xpToNextLevel: 3000,
  score: 95,
  rank: 3,
  streak: 32,
  longestStreak: 45,
  totalPoints: 12500,
  badges: [
    { id: 1, name: 'SOP Master', icon: '📚', description: 'Selesaikan 50 review SOP', earned: '2024-11-15', rarity: 'gold' },
    { id: 2, name: 'Perfect Quarter', icon: '🏆', description: 'Skor 100% selama 1 kuartal', earned: '2024-10-01', rarity: 'legendary' },
    { id: 3, name: '30-Day Streak', icon: '🔥', description: 'Login 30 hari berturut-turut', earned: '2024-12-01', rarity: 'silver' },
    { id: 4, name: 'Quick Learner', icon: '⚡', description: 'Selesaikan training dalam 1 hari', earned: '2024-09-20', rarity: 'bronze' },
    { id: 5, name: 'Team Player', icon: '🤝', description: 'Bantu 10 rekan kerja', earned: '2024-08-15', rarity: 'silver' },
    { id: 6, name: 'Night Owl', icon: '🦉', description: 'Selesaikan quiz setelah jam 10 malam', earned: '2024-07-22', rarity: 'bronze' },
  ],
  achievements: [
    { id: 1, name: 'First Quiz', progress: 100, total: 1, icon: '🎯' },
    { id: 2, name: 'Quiz Master', progress: 48, total: 100, icon: '🧠' },
    { id: 3, name: 'Perfect Score', progress: 12, total: 25, icon: '💯' },
    { id: 4, name: 'Helper', progress: 15, total: 50, icon: '🙋' },
  ],
  stats: {
    completedTrainings: 24,
    pendingTrainings: 2,
    quizzesTaken: 48,
    quizAvgScore: 94,
    helpGiven: 15,
    sopReviewed: 67,
  },
  weeklyActivity: [
    { day: 'Sen', points: 150 },
    { day: 'Sel', points: 200 },
    { day: 'Rab', points: 80 },
    { day: 'Kam', points: 300 },
    { day: 'Jum', points: 250 },
    { day: 'Sab', points: 50 },
    { day: 'Min', points: 0 },
  ]
};

export const leaderboard = [
  { rank: 1, name: 'Ahmad Rizki', department: 'Compliance', entity: 'BSIM', score: 98, badges: 12, streak: 45, avatar: '👨‍💼', level: 15 },
  { rank: 2, name: 'Siti Nurhaliza', department: 'Operations', entity: 'ASM', score: 96, badges: 10, streak: 38, avatar: '👩‍💼', level: 14 },
  { rank: 3, name: 'Tata Ariesta', department: 'PM', entity: 'SQE', score: 95, badges: 6, streak: 32, avatar: '👩‍🔬', level: 12, isCurrentUser: true },
  { rank: 4, name: 'Budi Santoso', department: 'Risk', entity: 'SMMF', score: 93, badges: 11, streak: 42, avatar: '👨‍💻', level: 13 },
  { rank: 5, name: 'Dewi Lestari', department: 'Credit', entity: 'SMMF', score: 92, badges: 9, streak: 30, avatar: '👩‍🏫', level: 11 },
  { rank: 6, name: 'Eko Prasetyo', department: 'AML', entity: 'BSIM', score: 91, badges: 8, streak: 28, avatar: '🧑‍💼', level: 10 },
  { rank: 7, name: 'Fitri Handayani', department: 'Legal', entity: 'SMS', score: 90, badges: 7, streak: 25, avatar: '👩‍⚖️', level: 10 },
  { rank: 8, name: 'Gunawan Wibowo', department: 'IT', entity: 'SQE', score: 89, badges: 8, streak: 22, avatar: '👨‍💻', level: 9 },
];

export const pendingQuizzes = [
  {
    id: 1,
    title: 'OJK Circular 15/2024 Update',
    category: 'Credit',
    dueDate: '2024-12-15',
    duration: '10 min',
    points: 50,
    difficulty: 'medium',
    questions: 15,
    description: 'Pelajari perubahan terbaru dalam regulasi kredit OJK',
    completedBy: 234,
    avgScore: 82
  },
  {
    id: 2,
    title: 'Q4 AML Refresher',
    category: 'AML',
    dueDate: '2024-12-20',
    duration: '15 min',
    points: 75,
    difficulty: 'hard',
    questions: 20,
    description: 'Review prosedur AML dan case study terbaru',
    completedBy: 189,
    avgScore: 78
  },
  {
    id: 3,
    title: 'Data Privacy Basics',
    category: 'PDP',
    dueDate: '2024-12-25',
    duration: '8 min',
    points: 40,
    difficulty: 'easy',
    questions: 10,
    description: 'Pengenalan UU PDP dan implementasi dasar',
    completedBy: 456,
    avgScore: 91
  },
];

export const dailyChallenges = [
  { id: 1, title: 'Review 1 SOP hari ini', points: 25, completed: false, icon: '📋' },
  { id: 2, title: 'Bantu 1 rekan dengan pertanyaan', points: 15, completed: true, icon: '🤝' },
  { id: 3, title: 'Selesaikan 1 quiz', points: 30, completed: false, icon: '📝' },
];

export const rewards = [
  { id: 1, name: 'Coffee Voucher', points: 500, icon: '☕', claimed: false },
  { id: 2, name: 'Extra Day Off', points: 5000, icon: '🏖️', claimed: false },
  { id: 3, name: 'Lunch with CEO', points: 10000, icon: '🍽️', claimed: false },
  { id: 4, name: 'Training Budget', points: 7500, icon: '📚', claimed: false },
];

// === CHAT HISTORY ===
export const chatHistory = [
  {
    id: 1,
    type: 'user',
    message: 'Apa syarat KYC untuk nasabah korporasi?',
    timestamp: '2024-12-11T09:00:00'
  },
  {
    id: 2,
    type: 'assistant',
    message: `Berdasarkan SOP-KYC-001 v4.0, syarat KYC untuk nasabah korporasi:

**Dokumen Wajib:**
1. Akta Pendirian & Perubahan Terakhir
2. NPWP Perusahaan
3. NIB (Nomor Induk Berusaha)
4. KTP Direktur/Pemegang Saham >25%
5. Struktur Kepemilikan (Beneficial Owner)

**Verifikasi Tambahan (limit >Rp 1M):**
- Laporan Keuangan 2 tahun terakhir
- Referensi Bank
- Site Visit (untuk limit >Rp 5M)

💡 **Tips:** Gunakan checklist digital di COMPAS untuk memastikan kelengkapan dokumen.`,
    timestamp: '2024-12-11T09:00:15',
    sources: ['SOP-KYC-001', 'POJK 12/2017']
  },
];

export const suggestedQuestions = [
  'Apa syarat KYC untuk nasabah korporasi?',
  'Bagaimana prosedur pelaporan OJK quarterly?',
  'Jelaskan alur eskalasi compliance violation',
  'Apa sanksi keterlambatan laporan MOE?',
  'Bagaimana cara update SOP yang sudah expired?',
  'Siapa yang harus approve perubahan limit kredit?',
];
