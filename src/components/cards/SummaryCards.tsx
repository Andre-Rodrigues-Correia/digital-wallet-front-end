import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
    title: string;
    value: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
}

export function SummaryCard({
                                title,
                                value,
                                subtitle,
                                icon: Icon,
                                color,
                            }: SummaryCardProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>

                <div className={`${color} rounded-lg p-3 text-white`}>
                    <Icon size={18} />
                </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight">
                {value}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
                {subtitle}
            </p>
        </div>
    );
}