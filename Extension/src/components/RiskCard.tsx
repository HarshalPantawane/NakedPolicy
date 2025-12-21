import React from 'react';

interface RiskCardProps {
    title: string;
    icon: React.ReactNode;
    items: string[];
    delay?: number;
}

export const RiskCard = ({ title, icon, items, delay = 0 }: RiskCardProps) => {
    return (
        <div
            className="group relative bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-2xl p-4 hover:bg-slate-800/40 transition-all duration-300 animate-slide-up hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:animate-shine" />
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-slate-800/50 rounded-xl text-slate-400 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-colors shadow-inner">
                    {icon}
                </div>
                <h3 className="font-medium text-slate-200 text-sm tracking-wide">{title}</h3>
            </div>
            <ul className="space-y-2.5">
                {items.map((item, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2.5 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-brand-500 shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};
