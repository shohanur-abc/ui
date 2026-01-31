import {
	ArrowDownRight,
	ArrowUpRight,
	Banknote,
	BarChart2,
	Percent,
	Repeat,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type KpiItem = {
	title: string;
	value: string;
	previousValue: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

const GlowingDecorative = () => (
	<div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover:bg-primary/30 group-hover:blur-2xl" />
);

const KpiCardGlow = ({
	title,
	value,
	previousValue,
	change,
	trend,
	icon: Icon,
}: KpiItem) => (
	<Card className="group relative overflow-hidden border-primary/20 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
		<GlowingDecorative />
		<CardContent className="relative p-5 @sm:p-6">
			<div className="flex items-center gap-3">
				<div className="rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 p-3 ring-1 ring-primary/20">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<p className="text-sm font-medium text-muted-foreground">{title}</p>
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-bold tracking-tight @sm:text-3xl">
							{value}
						</span>
					</div>
				</div>
			</div>
			<div className="mt-4 flex items-center justify-between text-sm">
				<span className="text-muted-foreground">
					Previous: {previousValue}
				</span>
				<span
					className={`flex items-center gap-1 font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-4" />
					) : (
						<ArrowDownRight className="size-4" />
					)}
					{change}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Gross Revenue',
			value: '$234,567',
			previousValue: '$198,432',
			change: '+18.2%',
			trend: 'up',
			icon: Banknote,
		},
		{
			title: 'Profit Margin',
			value: '28.4%',
			previousValue: '25.1%',
			change: '+3.3%',
			trend: 'up',
			icon: Percent,
		},
		{
			title: 'Repeat Rate',
			value: '45.7%',
			previousValue: '48.2%',
			change: '-2.5%',
			trend: 'down',
			icon: Repeat,
		},
		{
			title: 'Growth Index',
			value: '1.42x',
			previousValue: '1.28x',
			change: '+10.9%',
			trend: 'up',
			icon: BarChart2,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCardGlow key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
