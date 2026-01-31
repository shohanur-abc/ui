import {
	ArrowDownRight,
	ArrowUpRight,
	Globe,
	Smartphone,
	Monitor,
	Tablet,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type KpiItem = {
	title: string;
	value: string;
	percentage: number;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

const CircularProgress = ({
	percentage,
	size = 80,
}: {
	percentage: number;
	size?: number;
}) => {
	const strokeWidth = 6;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - (percentage / 100) * circumference;

	return (
		<div className="relative" style={{ width: size, height: size }}>
			<svg className="rotate-[-90deg]" width={size} height={size}>
				<circle
					className="stroke-muted"
					strokeWidth={strokeWidth}
					fill="transparent"
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
				<circle
					className="stroke-primary transition-all duration-500"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					fill="transparent"
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-sm font-bold">{percentage}%</span>
			</div>
		</div>
	);
};

const KpiCardCircular = ({
	title,
	value,
	percentage,
	change,
	trend,
	icon: Icon,
}: KpiItem) => (
	<Card className="group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="flex items-center justify-between pt-0">
			<div>
				<p className="text-2xl font-bold tracking-tight @sm:text-3xl">{value}</p>
				<div
					className={`mt-1 flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="size-3" />
					) : (
						<ArrowDownRight className="size-3" />
					)}
					{change}
				</div>
			</div>
			<CircularProgress percentage={percentage} />
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Desktop Traffic',
			value: '45,234',
			percentage: 52,
			change: '+12.3%',
			trend: 'up',
			icon: Monitor,
		},
		{
			title: 'Mobile Traffic',
			value: '32,891',
			percentage: 38,
			change: '+28.5%',
			trend: 'up',
			icon: Smartphone,
		},
		{
			title: 'Tablet Traffic',
			value: '8,432',
			percentage: 10,
			change: '-5.2%',
			trend: 'down',
			icon: Tablet,
		},
		{
			title: 'International',
			value: '28,543',
			percentage: 33,
			change: '+18.7%',
			trend: 'up',
			icon: Globe,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCardCircular key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
