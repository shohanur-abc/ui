'use client';

import * as React from 'react';
import {
	Package,
	AlertTriangle,
	CheckCircle,
	XCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type StockLevel = 'in-stock' | 'low-stock' | 'out-of-stock';

type StatusData = {
	status: StockLevel;
	count: number;
	value: number;
	percentage: number;
};

type GaugeChartProps = {
	value: number;
	max: number;
	label: string;
	color: string;
};

const GaugeChart = ({ value, max, label, color }: GaugeChartProps) => {
	const percentage = (value / max) * 100;
	const circumference = 2 * Math.PI * 45;
	const offset = circumference - (percentage / 100) * (circumference * 0.75);

	return (
		<div className="relative w-32 h-32">
			<svg viewBox="0 0 100 100" className="w-full h-full -rotate-[135deg]">
				<circle
					cx="50"
					cy="50"
					r="45"
					fill="none"
					className="stroke-muted"
					strokeWidth="10"
					strokeDasharray={circumference * 0.75}
					strokeLinecap="round"
				/>
				<circle
					cx="50"
					cy="50"
					r="45"
					fill="none"
					className={color}
					strokeWidth="10"
					strokeDasharray={circumference * 0.75}
					strokeDashoffset={offset}
					strokeLinecap="round"
				/>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<span className="text-2xl font-bold">{value}%</span>
				<span className="text-xs text-muted-foreground">{label}</span>
			</div>
		</div>
	);
};

type StatusCardProps = {
	data: StatusData;
	icon: React.ReactNode;
	color: string;
};

const StatusCard = ({ data, icon, color }: StatusCardProps) => (
	<div className={`rounded-lg border p-4 ${color}`}>
		<div className="flex items-center gap-2">
			{icon}
			<span className="text-sm font-medium capitalize">{data.status.replace('-', ' ')}</span>
		</div>
		<div className="mt-3 grid grid-cols-2 gap-4">
			<div>
				<p className="text-2xl font-bold">{data.count.toLocaleString()}</p>
				<p className="text-xs text-muted-foreground">Products</p>
			</div>
			<div>
				<p className="text-2xl font-bold">${(data.value / 1000).toFixed(0)}K</p>
				<p className="text-xs text-muted-foreground">Value</p>
			</div>
		</div>
		<div className="mt-3">
			<div className="flex justify-between text-xs mb-1">
				<span className="text-muted-foreground">% of Inventory</span>
				<span className="font-medium">{data.percentage}%</span>
			</div>
			<div className="relative h-2 overflow-hidden rounded-full bg-muted/50">
				<div
					className="absolute inset-y-0 left-0 bg-current rounded-full"
					style={{ width: `${data.percentage}%` }}
				/>
			</div>
		</div>
	</div>
);

export default function Main() {
	const statusData: StatusData[] = [
		{ status: 'in-stock', count: 2156, value: 892000, percentage: 76 },
		{ status: 'low-stock', count: 487, value: 156000, percentage: 17 },
		{ status: 'out-of-stock', count: 198, value: 78000, percentage: 7 },
	];

	const healthScore = Math.round((statusData[0].percentage + statusData[1].percentage * 0.5) / 1.5);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Inventory Health</CardTitle>
						<CardDescription>Stock level distribution and health score</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 @lg:grid-cols-4">
							<div className="flex flex-col items-center justify-center rounded-lg border p-6">
								<GaugeChart
									value={healthScore}
									max={100}
									label="Health Score"
									color="stroke-emerald-500"
								/>
								<p className="mt-4 text-sm text-center text-muted-foreground">
									Based on stock availability
								</p>
							</div>
							<div className="@lg:col-span-3 grid gap-4 @sm:grid-cols-3">
								<StatusCard
									data={statusData[0]}
									icon={<CheckCircle className="size-5 text-emerald-500" />}
									color="border-emerald-500/30 bg-emerald-500/5 text-emerald-500"
								/>
								<StatusCard
									data={statusData[1]}
									icon={<AlertTriangle className="size-5 text-amber-500" />}
									color="border-amber-500/30 bg-amber-500/5 text-amber-500"
								/>
								<StatusCard
									data={statusData[2]}
									icon={<XCircle className="size-5 text-destructive" />}
									color="border-destructive/30 bg-destructive/5 text-destructive"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
