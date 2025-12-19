import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  ShieldAlert, 
  RefreshCw,
  UserCircle,
  Info,
  Sparkles
} from 'lucide-react';

/**
 * --- Configuration & Constants ---
 */
const apiKey = ""; 
const UNIVERSAL_CATEGORIES = [
  "Quality", 
  "Environment", 
  "Cleanliness", 
  "Speed", 
  "Staff Professionalism", 
  "Pricing", 
  "Communication"
];

/**
 * --- Logic Section: Deterministic Processing ---
 */
const processDeterministicInsights = (currentRaw: any, previousRaw: any) => {
  const pCounts = currentRaw?.positiveCounts || {};
  const nCounts = currentRaw?.negativeCounts || {};
  const prevP = previousRaw?.positiveCounts || {};
  const prevN = previousRaw?.negativeCounts || {};

  const results = { happy: [] as any[], unhappy: [] as any[] };

  UNIVERSAL_CATEGORIES.forEach(cat => {
    const p = Number(pCounts[cat]) || 0;
    const n = Number(nCounts[cat]) || 0;

    if (p === 0 && n === 0) return;

    // Trend Logic: Deterministic comparison
    let trend = "stable";
    if (previousRaw) {
      const oldP = Number(prevP[cat]) || 0;
      const oldN = Number(prevN[cat]) || 0;
      
      // improving → negative frequency ↓ OR positive frequency ↑
      if (n < oldN || p > oldP) trend = "improving";
      // worsening → negative frequency ↑ OR positive frequency ↓
      else if (n > oldN || p < oldP) trend = "worsening";
    }

    // Conflict Resolution: Higher frequency side wins.
    if (p >= n) {
      results.happy.push({ reason: cat, trend, score: p });
    } else {
      results.unhappy.push({ reason: cat, trend, score: n });
    }
  });

  const finalizeList = (list: any[]) => [...list].sort((a, b) => b.score - a.score).slice(0, 5);

  return {
    happy: finalizeList(results.happy),
    unhappy: finalizeList(results.unhappy),
    confidenceScore: Math.min(1, Math.max(0, Number(currentRaw?.confidenceScore) || 0))
  };
};

/**
 * --- UI Components ---
 */
const InsightList = ({ title, items, type }: { title: string; items: any[]; type: 'happy' | 'unhappy' }) => (
  <div className="flex-1 min-w-[300px]">
    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-1">
      {title}
    </h3>
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {items.length > 0 ? (
        <ul className="divide-y divide-slate-100">
          {items.map((item, index) => (
            <li key={item.reason} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  type === 'happy' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {index + 1}
                </span>
                <span className="text-slate-700 font-medium text-base">{item.reason}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                item.trend === 'improving' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                item.trend === 'worsening' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                'bg-slate-100 text-slate-500 border-slate-200'
              }`}>
                {item.trend}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-8 text-center text-slate-400 italic">No patterns detected.</div>
      )}
    </div>
  </div>
);

const FeedbackInsightsPanel = ({ userRole }: { userRole: string }) => {
  const [insights, setInsights] = useState({ happy: [] as any[], unhappy: [] as any[] });
  const [confidence, setConfidence] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const isAnalyzing = useRef(false);

  /**
   * DEVELOPER DEMO DATA SEEDING
   * We mock a previous state so the developer can see all three trend possibilities.
   */
  const performDemoAnalysis = useCallback(() => {
    isAnalyzing.current = true;
    setLoading(true);

    // Mock Current Extraction Results
    const currentRaw = {
      positiveCounts: { 
        "Staff Professionalism": 10, // Increased (Improving)
        "Quality": 8,               // Same (Stable)
        "Cleanliness": 3            // Decreased (Worsening)
      },
      negativeCounts: { 
        "Speed": 12,                // Increased (Worsening)
        "Pricing": 2                // Decreased (Improving)
      },
      confidenceScore: 0.85
    };

    // Mock Previous Extraction Results (for comparison)
    const previousRaw = {
      positiveCounts: { 
        "Staff Professionalism": 5, 
        "Quality": 8, 
        "Cleanliness": 7 
      },
      negativeCounts: { 
        "Speed": 4, 
        "Pricing": 9 
      }
    };

    const processed = processDeterministicInsights(currentRaw, previousRaw);
    
    // Artificial delay to show loading state
    setTimeout(() => {
      setInsights(processed);
      setConfidence(processed.confidenceScore);
      setLoading(false);
      isAnalyzing.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    if (['Owner', 'Manager', 'owner', 'manager', 'admin'].includes(userRole)) {
      performDemoAnalysis();
    }
  }, [userRole, performDemoAnalysis]);

  return (
    <section className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-blue-600/70">
        <Info size={14} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Internal Informational Use Only</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">What Customers Are Saying</h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} className="text-indigo-400" />
              AI Reputation Signals Active
            </p>
            {confidence < 0.5 && (
              <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold border border-amber-100 uppercase tracking-tighter">
                Low data volume — insights are directional
              </span>
            )}
          </div>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-indigo-600">
            <RefreshCw size={16} className="animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Processing</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InsightList title="Top Reasons Customers Are Happy" items={insights.happy} type="happy" />
        <InsightList title="Top Reasons Customers Are Unhappy" items={insights.unhappy} type="unhappy" />
      </div>
    </section>
  );
};

interface AnalyticsViewProps {
  userRole?: string;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ userRole = 'owner' }) => (
  <div className="space-y-8">
    <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Customer Feedback Insights</h1>

    {/* Statistics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {[
        { label: 'Avg Rating', value: '4.8', color: 'text-emerald-600' },
        { label: 'Open Reputation Chats', value: '12', color: 'text-blue-600' },
        { label: 'Feedback Loop Health', value: 'High', color: 'text-indigo-600' }
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
          <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>

    {/* Customer Feedback Insights Panel */}
    <FeedbackInsightsPanel userRole={userRole} />

    {/* Reputation Management Activity */}
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Reputation Management Activity</h2>
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-400 text-center text-sm border-dashed">
        Standard system logs and reputation activity remain unchanged.
      </div>
    </div>
  </div>
);
