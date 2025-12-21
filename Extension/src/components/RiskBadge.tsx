import React from 'react';

type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

interface RiskBadgeProps {
    level: RiskLevel;
}

export const RiskBadge = ({ level }: RiskBadgeProps) => {
    const styles = {
        HIGH: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]',
        MEDIUM: 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]',
        LOW: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]',
    };

    return (
        <div className={`
      inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/5 text-xs font-bold tracking-widest uppercase
      ${styles[level]} animate-fade-in backdrop-blur-md shadow-lg relative overflow-hidden group
    `}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] animate-[shine_3s_infinite]" />
            <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${level === 'HIGH' ? 'bg-red-500' : level === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 shadow-[0_0_10px_2px_currentColor] ${level === 'HIGH' ? 'bg-red-500' : level === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></span>
            </span>
            {level} RISK
        </div>
    );
};
