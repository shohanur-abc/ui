'use client';

import {
	ArrowUpRight,
	Boxes,
	CircleDollarSign,
	type LucideIcon,
	Truck,
	Users,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type MiniSparklineProps = {
	data: number[];
	trend: 'up' | 'down';
};

const MiniSparkline = ({ data, trend }: MiniSparklineProps) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	return (
		<div className="flex items-end gap-0.5 h-8">
			{data.map((value, i) => (
				<div
					key={i}
					className={`w-1 rounded-full transition-all duration-300 ${trend === 'up' ? 'bg-emerald-500/60' : 'bg-rose-500/60'}`}
					style={{
						height: `${((value - min) / range) * 100}%`,
						minHeight: '4px',
					}}
				/>
			))}
		</div>
	);
};

type SparkCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	sparkData: number[];
};

const SparkCard = ({
	icon: Icon,
	label,
	value,
	change,
	trend,
	sparkData,
}: SparkCardProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
		<CardContent className="p-4 @sm:p-5 @lg:p-6">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 space-y-3">
					<div className="flex items-center gap-2">
						<div className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/20">
							<Icon className="size-3.5 text-primary" />
						</div>
						<p className="text-xs @sm:text-sm font-medium text-muted-foreground">
							{label}
						</p>
					</div>
					<div>
						<p className="text-2xl @sm:text-3xl font-bold tracking-tight">
							{value}
						</p>
						<p
							className={`text-xs @sm:text-sm font-medium mt-1 ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
						>
							{change}
						</p>
					</div>
				</div>
				<div className="shrink-0">
					<MiniSparkline data={sparkData} trend={trend} />
				</div>
			</div>
		</CardContent>
	</Card>
);

const sparkCards: SparkCardProps[] = [
	{
		icon: CircleDollarSign,
		label: 'Revenue',
		value: '$12,426',
		change: '+12.3% growth',
		trend: 'up',
		sparkData: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90],
	},
	{
		icon: Users,
		label: 'New Users',
		value: '1,245',
		change: '+8.1% increase',
		trend: 'up',
		sparkData: [20, 25, 22, 28, 32, 28, 35, 40, 38, 45, 50, 55],
	},
	{
		icon: Boxes,
		label: 'Inventory',
		value: '3,847',
		change: '-2.4% decrease',
		trend: 'down',
		sparkData: [60, 55, 58, 52, 48, 50, 45, 42, 40, 38, 35, 32],
	},
	{
		icon: Truck,
		label: 'Deliveries',
		value: '892',
		change: '+15.7% faster',
		trend: 'up',
		sparkData: [15, 20, 25, 22, 30, 35, 40, 38, 45, 50, 55, 60],
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @lg:gap-6">
					{sparkCards.map((card, i) => (
						<SparkCard key={i} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
