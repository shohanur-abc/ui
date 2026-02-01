'use client';

import * as React from 'react';
import { Package, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type DataPoint = {
	month: string;
	value: number;
};

type ChartBarProps = {
	data: DataPoint[];
	maxValue: number;
	color: string;
	label: string;
};

const ChartBar = ({ data, maxValue, color, label }: ChartBarProps) => (
	<div className="space-y-3">
		<p className="text-sm font-medium">{label}</p>
		<div className="flex items-end gap-1 h-32">
			{data.map((point, index) => {
				const height = (point.value / maxValue) * 100;
				return (
					<div key={index} className="flex-1 flex flex-col items-center gap-1">
						<div
							className="w-full bg-muted rounded-t relative overflow-hidden"
							style={{ height: `${height}%` }}
						>
							<div className={`absolute inset-0 ${color}`} />
						</div>
					</div>
				);
			})}
		</div>
		<div className="flex justify-between text-xs text-muted-foreground">
			{data.map((point, index) => (
				<span key={index} className="flex-1 text-center">
					{point.month}
				</span>
			))}
		</div>
	</div>
);

type TrendCardProps = {
	title: string;
	value: string;
	change: number;
	data: DataPoint[];
	color: string;
};

const TrendCard = ({ title, value, change, data, color }: TrendCardProps) => {
	const maxValue = Math.max(...data.map((d) => d.value));

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div>
						<p className="text-sm text-muted-foreground">{title}</p>
						<p className="mt-1 text-2xl font-bold">{value}</p>
					</div>
					<Badge
						variant={change >= 0 ? 'default' : 'destructive'}
						className="flex items-center gap-1"
					>
						{change >= 0 ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(change)}%
					</Badge>
				</div>
				<div className="mt-6">
					<ChartBar data={data} maxValue={maxValue} color={color} label="" />
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const stockData: DataPoint[] = [
		{ month: 'Jan', value: 12500 },
		{ month: 'Feb', value: 14200 },
		{ month: 'Mar', value: 13800 },
		{ month: 'Apr', value: 15600 },
		{ month: 'May', value: 16200 },
		{ month: 'Jun', value: 17800 },
	];

	const salesData: DataPoint[] = [
		{ month: 'Jan', value: 8500 },
		{ month: 'Feb', value: 9200 },
		{ month: 'Mar', value: 11000 },
		{ month: 'Apr', value: 10500 },
		{ month: 'May', value: 12800 },
		{ month: 'Jun', value: 14200 },
	];

	const returnData: DataPoint[] = [
		{ month: 'Jan', value: 450 },
		{ month: 'Feb', value: 380 },
		{ month: 'Mar', value: 520 },
		{ month: 'Apr', value: 410 },
		{ month: 'May', value: 350 },
		{ month: 'Jun', value: 290 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div>
						<h2 className="text-xl font-semibold @lg:text-2xl">
							Inventory Trends
						</h2>
						<p className="text-sm text-muted-foreground">
							6-month performance overview
						</p>
					</div>
					<div className="grid gap-4 @lg:grid-cols-3">
						<TrendCard
							title="Stock Level"
							value="17,800"
							change={12.5}
							data={stockData}
							color="bg-primary"
						/>
						<TrendCard
							title="Units Sold"
							value="14,200"
							change={18.2}
							data={salesData}
							color="bg-emerald-500"
						/>
						<TrendCard
							title="Returns"
							value="290"
							change={-17.1}
							data={returnData}
							color="bg-amber-500"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
