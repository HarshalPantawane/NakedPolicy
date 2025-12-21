import React from 'react';
import { Shield, Settings, ExternalLink } from 'lucide-react';

export const Header = () => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Shield className="w-5 h-5 text-brand-500" />
                    <div className="absolute inset-0 bg-brand-500/20 blur-lg rounded-full" />
                </div>
                <h1 className="font-semibold text-slate-100 text-sm tracking-wide">Privacy Analyzer</h1>
            </div>
            <button className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-200">
                <Settings className="w-4 h-4" />
            </button>
        </div>
    );
};
