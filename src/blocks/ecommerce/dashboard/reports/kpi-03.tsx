'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type SparklineData = {
	value: number;
};

type SparkKPIProps = {
	title: string;
	value: string;
	change: string;
	changeType: 'positive' | 'negative';
	sparkData: SparklineData[];
	color: string;
};

const SparkKPI = ({
	title,
	value,
	change,
	changeType,
	sparkData,
	color,
}: SparkKPIProps) => (
	<Card className="border-border/30 bg-card/60 backdrop-blur-sm">
		<CardContent className="p-5">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="mt-1 text-2xl font-bold">{value}</p>
					<p
						className={`mt-1 flex items-center text-xs ${
							changeType === 'positive' ? 'text-emerald-500' : 'text-rose-500'
						}`}
					>
						{changeType === 'positive' ? (
							<TrendingUp className="mr-1 size-3" />
						) : (
							<TrendingDown className="mr-1 size-3" />
						)}
						{change} vs last week
					</p>
				</div>
				<div className="h-12 w-20">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={sparkData}>
							<Line
								type="monotone"
								dataKey="value"
								stroke={color}
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const sparklines: SparkKPIProps[] = [
		{
			title: 'Daily Revenue',
			value: '$42.5K',
			change: '+8.2%',
			changeType: 'positive',
			sparkData: [
				{ value: 35 },
				{ value: 38 },
				{ value: 32 },
				{ value: 45 },
				{ value: 40 },
				{ value: 42 },
				{ value: 48 },
			],
			color: 'oklch(0.7 0.2 280)',
		},
		{
			title: 'Orders Today',
			value: '284',
			change: '+12.5%',
			changeType: 'positive',
			sparkData: [
				{ value: 220 },
				{ value: 245 },
				{ value: 230 },
				{ value: 260 },
				{ value: 255 },
				{ value: 275 },
				{ value: 284 },
			],
			color: 'oklch(0.7 0.18 160)',
		},
		{
			title: 'Avg Order Value',
			value: '$149.50',
			change: '-2.1%',
			changeType: 'negative',
			sparkData: [
				{ value: 155 },
				{ value: 158 },
				{ value: 152 },
				{ value: 148 },
				{ value: 145 },
				{ value: 150 },
				{ value: 149 },
			],
			color: 'oklch(0.62 0.24 25)',
		},
		{
			title: 'Active Sessions',
			value: '1,842',
			change: '+15.8%',
			changeType: 'positive',
			sparkData: [
				{ value: 1200 },
				{ value: 1350 },
				{ value: 1420 },
				{ value: 1580 },
				{ value: 1650 },
				{ value: 1720 },
				{ value: 1842 },
			],
			color: 'oklch(0.72 0.16 200)',
		},
		{
			title: 'Cart Abandonment',
			value: '24.5%',
			change: '-3.2%',
			changeType: 'positive',
			sparkData: [
				{ value: 28 },
				{ value: 27 },
				{ value: 26 },
				{ value: 25 },
				{ value: 26 },
				{ value: 25 },
				{ value: 24 },
			],
			color: 'oklch(0.7 0.18 160)',
		},
		{
			title: 'Support Tickets',
			value: '18',
			change: '+4',
			changeType: 'negative',
			sparkData: [
				{ value: 12 },
				{ value: 15 },
				{ value: 14 },
				{ value: 16 },
				{ value: 18 },
				{ value: 17 },
				{ value: 18 },
			],
			color: 'oklch(0.75 0.15 55)',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Live Metrics Dashboard
						</CardTitle>
						<CardDescription>
							Real-time performance indicators with trend sparklines
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
							{sparklines.map((spark, i) => (
								<SparkKPI key={i} {...spark} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
