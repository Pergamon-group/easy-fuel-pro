export interface ForecourtCanopyIllustrationProps {
  className?: string;
}

export function ForecourtCanopyIllustration({ className = 'w-full h-auto' }: ForecourtCanopyIllustrationProps) {
  return (
    <svg
      role="img"
      aria-label="EasyFuel Pro Petrol Station Canopy Illustration"
      viewBox="0 0 600 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background blueprint grid */}
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#00a3e0" strokeWidth="0.75" strokeOpacity="0.25" />
        </pattern>
        <linearGradient id="canopyRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="canopyFasciaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* Grid Pattern in Top-Right Corner */}
      <rect x="320" y="10" width="260" height="180" fill="url(#grid)" rx="12" />

      {/* Forecourt Ground Apron */}
      <path d="M 40 330 L 560 330" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
      <path d="M 60 338 L 540 338" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 6" />

      {/* Station Canopy Structure */}
      {/* Canopy Pillars */}
      <rect x="130" y="140" width="14" height="190" fill="#334155" rx="3" stroke="#0f172a" strokeWidth="2.5" />
      <rect x="360" y="140" width="14" height="190" fill="#334155" rx="3" stroke="#0f172a" strokeWidth="2.5" />
      <rect x="470" y="140" width="14" height="190" fill="#334155" rx="3" stroke="#0f172a" strokeWidth="2.5" />

      {/* Canopy Roof Underside */}
      <polygon points="70,140 550,140 520,165 100,165" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />

      {/* Canopy Fascia (Front) */}
      <polygon points="60,95 560,95 550,140 70,140" fill="url(#canopyFasciaGrad)" stroke="#0f172a" strokeWidth="3.5" />
      {/* Fascia Accent Top Stripe */}
      <polygon points="55,80 565,80 560,95 60,95" fill="url(#canopyRoofGrad)" stroke="#0f172a" strokeWidth="3.5" />

      {/* Station Brand Mark on Fascia */}
      <rect x="230" y="105" width="140" height="24" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      <text x="300" y="122" textAnchor="middle" fill="#00658d" fontSize="11" fontWeight="800" fontFamily="sans-serif" letterSpacing="1">
        EASYFUEL PRO
      </text>

      {/* Fuel Pump Island 1 (Left) */}
      <rect x="160" y="318" width="80" height="12" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2.5" rx="3" />
      {/* Dispenser Body */}
      <rect x="175" y="195" width="50" height="123" rx="6" fill="#f8fafc" stroke="#0f172a" strokeWidth="3" />
      {/* Dispenser Display */}
      <rect x="185" y="210" width="30" height="20" rx="3" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
      <rect x="187" y="213" width="26" height="6" fill="#38bdf8" />
      <rect x="187" y="221" width="26" height="6" fill="#38bdf8" />
      {/* Dispenser Nozzle & Hose */}
      <path d="M 175 240 Q 160 260 172 290" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      <rect x="168" y="285" width="6" height="14" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" rx="1" />

      {/* Fuel Pump Island 2 (Center-Right) */}
      <rect x="390" y="318" width="80" height="12" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2.5" rx="3" />
      {/* Dispenser Body */}
      <rect x="405" y="195" width="50" height="123" rx="6" fill="#f8fafc" stroke="#0f172a" strokeWidth="3" />
      {/* Dispenser Display */}
      <rect x="415" y="210" width="30" height="20" rx="3" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
      <rect x="417" y="213" width="26" height="6" fill="#38bdf8" />
      <rect x="417" y="221" width="26" height="6" fill="#38bdf8" />
      {/* Dispenser Hose */}
      <path d="M 455 240 Q 470 260 458 290" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      <rect x="456" y="285" width="6" height="14" fill="#10b981" stroke="#0f172a" strokeWidth="1.5" rx="1" />

      {/* Attendant Figure at Island 1 */}
      {/* Head */}
      <circle cx="270" cy="225" r="11" fill="#fbcfe8" stroke="#0f172a" strokeWidth="2" />
      {/* Cap */}
      <path d="M 259 220 Q 270 212 281 220 L 285 222 L 257 222 Z" fill="#0284c7" stroke="#0f172a" strokeWidth="2" />
      {/* Body / Overalls */}
      <path d="M 260 236 L 280 236 L 283 295 L 257 295 Z" fill="#0369a1" stroke="#0f172a" strokeWidth="2.5" rx="4" />
      {/* Legs */}
      <rect x="261" y="295" width="7" height="33" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      <rect x="272" y="295" width="7" height="33" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />

      {/* Attendant Figure at Island 2 */}
      {/* Head */}
      <circle cx="505" cy="225" r="11" fill="#fbcfe8" stroke="#0f172a" strokeWidth="2" />
      {/* Cap */}
      <path d="M 494 220 Q 505 212 516 220 L 520 222 L 492 222 Z" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
      {/* Body / Overalls */}
      <path d="M 495 236 L 515 236 L 518 295 L 492 295 Z" fill="#d97706" stroke="#0f172a" strokeWidth="2.5" rx="4" />
      {/* Legs */}
      <rect x="496" y="295" width="7" height="33" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      <rect x="507" y="295" width="7" height="33" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />

      {/* Floating eTIMS Validation Badge */}
      <g transform="translate(80, 50)">
        <rect width="130" height="28" rx="14" fill="#ffffff" stroke="#00a3e0" strokeWidth="2" />
        <circle cx="16" cy="14" r="6" fill="#10b981" />
        <text x="32" y="18" fill="#00354b" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          eTIMS READY
        </text>
      </g>
    </svg>
  );
}
