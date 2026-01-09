interface Stat {
    label: string;
    value: string;
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 backdrop-blur-sm p-5 shadow-sm"
                >
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        {stat.label}
                    </div>
                    <div className="mt-2 text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                    </div>
                </div>
            ))}
        </div>
    );
}
