import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center gap-2 text-3xl font-black tracking-tight text-slate-900 selection:bg-indigo-500">
            <span className="w-4 h-4 rounded-full bg-indigo-600 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.8)]"></span>
            <span>Store<span className="text-indigo-600">Hub</span></span>
        </div>
    );
}