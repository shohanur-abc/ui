'use client';

import { TrendingUp, TrendingDown, DollarSign, Target, ShoppingBag, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

type PrimaryMetric = {
	title: string;
	value: string;
	change: number;
	target: number;
	progress: number;
	chartData: { value: number }[];
};

type SecondaryMetric = {
	title: string;
	value: string;
	change: number;
	icon: React.ReactNode;
};

type BentoLayout2Props = {
	primary: PrimaryMetric;
	secondary: SecondaryMetric[];
};

const PrimaryCard = ({ title, value, change, target, progress, chartData }: PrimaryMetric) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @lg:col-span-2 @lg:row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
				<div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-primary' : 'text-destructive'}`}>
					{change >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
					{Math.abs(change)}%
				</div>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<div className="text-4xl @xl:text-5xl font-bold">{value}</div>
				<p className="text-sm text-muted-foreground mt-1">Target: ${target.toLocaleString()}</p>
			</div>
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span>Progress to goal</span>
					<span className="font-medium">{progress}%</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
			<div className="h-[100px] mt-4">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={chartData}>
						<defs>
							<linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="oklch(0.70 0.18 155)" stopOpacity={0.3} />
								<stop offset="95%" stopColor="oklch(0.70 0.18 155)" stopOpacity={0} />
							</linearGradient>
						</defs>
						<Area
							type="monotone"
							dataKey="value"
							stroke="oklch(0.70 0.18 155)"
							strokeWidth={2}
							fill="url(#primaryGradient)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</CardContent>
	</Card>
);

const SecondaryCard = ({ title, value, change, icon }: SecondaryMetric) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="text-2xl font-bold mt-1">{value}</p>
					<div className={`flex items-center gap-1 text-sm mt-2 ${change >= 0 ? 'text-primary' : 'text-destructive'}`}>
						{change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
						{Math.abs(change)}%
					</div>
				</div>
				<div className="p-3 rounded-lg bg-muted">{icon}</div>
			</div>
		</CardContent>
	</Card>
);

const BentoLayout2 = ({ primary, secondary }: BentoLayout2Props) => (
	<div className="grid grid-cols-1 @lg:grid-cols-4 gap-4">
		<PrimaryCard {...primary} />
		<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-1 gap-4 @lg:col-span-2">
			{secondary.map((metric, idx) => (
				<SecondaryCard key={idx} {...metric} />
			))}
		</div>
	</div>
);

export default function Main() {
	const primary: PrimaryMetric = {
		title: 'Monthly Revenue',
		value: '$142,580',
		change: 12.5,
		target: 175000,
		progress: 81,
		chartData: [
			{ value: 40 }, { value: 55 }, { value: 45 }, { value: 60 },
			{ value: 50 }, { value: 75 }, { value: 65 }, { value: 85 },
		],
	};

	const secondary: SecondaryMetric[] = [
		{ title: 'Daily Average', value: '$4,752', change: 8.3, icon: <DollarSign className="size-5" /> },
		{ title: 'Weekly Target', value: '82%', change: 5.2, icon: <Target className="size-5" /> },
		{ title: 'Orders Today', value: '48', change: -2.4, icon: <ShoppingBag className="size-5" /> },
		{ title: 'Growth Rate', value: '15.2%', change: 3.1, icon: <BarChart className="size-5" /> },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout2 primary={primary} secondary={secondary} />
			</div>
		</section>
	);
}
