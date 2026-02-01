'use client';

import { Package, DollarSign, TrendingUp, Boxes, Target } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type MetricItem = {
	label: string;
	value: string;
	target: string;
	progress: number;
	icon: React.ElementType;
};

type CircularProgressProps = {
	value: number;
	size: number;
	strokeWidth: number;
};

const CircularProgress = ({
	value,
	size,
	strokeWidth,
}: CircularProgressProps) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - (value / 100) * circumference;

	return (
		<div className="relative" style={{ width: size, height: size }}>
			<svg className="rotate-[-90deg]" width={size} height={size}>
				<circle
					className="text-muted"
					strokeWidth={strokeWidth}
					stroke="currentColor"
					fill="transparent"
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
				<circle
					className="text-primary transition-all duration-500"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					stroke="currentColor"
					fill="transparent"
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-lg font-bold">{value}%</span>
			</div>
		</div>
	);
};

type MetricCardProps = {
	item: MetricItem;
	targetLabel: string;
};

const MetricCard = ({ item, targetLabel }: MetricCardProps) => (
	<Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
		<CardContent className="flex items-center gap-6 p-6">
			<CircularProgress value={item.progress} size={80} strokeWidth={8} />
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<item.icon className="size-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">{item.label}</span>
				</div>
				<p className="mt-1 text-2xl font-bold">{item.value}</p>
				<div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
					<Target className="size-3" />
					<span>
						{targetLabel}: {item.target}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: MetricItem[] = [
		{
			label: 'Stock Accuracy',
			value: '98.5%',
			target: '99%',
			progress: 98,
			icon: Package,
		},
		{
			label: 'Inventory Value',
			value: '$2.4M',
			target: '$2.5M',
			progress: 96,
			icon: DollarSign,
		},
		{
			label: 'Fill Rate',
			value: '94.2%',
			target: '95%',
			progress: 94,
			icon: TrendingUp,
		},
		{
			label: 'Warehouse Utilization',
			value: '78%',
			target: '85%',
			progress: 78,
			icon: Boxes,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
					{metrics.map((metric, i) => (
						<MetricCard key={i} item={metric} targetLabel="Target" />
					))}
				</div>
			</div>
		</section>
	);
}
