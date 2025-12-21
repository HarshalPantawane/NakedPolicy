import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
}

export const Button = ({ children, variant = 'primary', icon, className = '', ...props }: ButtonProps) => {
    const baseStyles = "relative group overflow-hidden px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 active:scale-[0.98]";

    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.5)] hover:scale-[1.02]",
        secondary: "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-750 hover:border-slate-600 hover:text-white",
        danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {variant === 'primary' && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
            )}
            <span className="relative flex items-center justify-center gap-2 z-20">
                {children}
                {icon && <span className="group-hover:translate-x-0.5 transition-transform">{icon}</span>}
            </span>
        </button>
    );
};
