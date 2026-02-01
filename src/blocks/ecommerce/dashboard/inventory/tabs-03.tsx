'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Layers,
	Clock,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

type MetricCard = {
	title: string;
	value: string;
	change: number;
	icon: React.ReactNode;
};

type MetricGridProps = {
	metrics: MetricCard[];
};

const MetricGrid = ({ metrics }: MetricGridProps) => (
	<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
		{metrics.map((metric) => (
			<Card key={metric.title}>
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
							{metric.icon}
						</div>
						<Badge variant={metric.change >= 0 ? 'default' : 'destructive'}>
							{metric.change >= 0 ? '+' : ''}
							{metric.change}%
						</Badge>
					</div>
					<p className="mt-4 text-2xl font-bold">{metric.value}</p>
					<p className="text-sm text-muted-foreground">{metric.title}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

type CategoryProgress = {
	name: string;
	value: number;
	max: number;
};

type CategoryListProps = {
	categories: CategoryProgress[];
};

const CategoryList = ({ categories }: CategoryListProps) => (
	<div className="space-y-4">
		{categories.map((category) => (
			<div key={category.name} className="space-y-2">
				<div className="flex justify-between text-sm">
					<span className="font-medium">{category.name}</span>
					<span className="text-muted-foreground">
						{category.value.toLocaleString()} / {category.max.toLocaleString()}
					</span>
				</div>
				<Progress value={(category.value / category.max) * 100} />
			</div>
		))}
	</div>
);

export default function Main() {
	const dailyMetrics: MetricCard[] = [
		{
			title: 'Units Sold',
			value: '1,234',
			change: 12,
			icon: <Package className="size-5" />,
		},
		{
			title: 'Revenue',
			value: '$45.6K',
			change: 8,
			icon: <DollarSign className="size-5" />,
		},
		{
			title: 'Avg Order Value',
			value: '$37',
			change: -3,
			icon: <Layers className="size-5" />,
		},
		{
			title: 'Processing Time',
			value: '2.4h',
			change: -15,
			icon: <Clock className="size-5" />,
		},
	];

	const weeklyMetrics: MetricCard[] = [
		{
			title: 'Units Sold',
			value: '8,456',
			change: 18,
			icon: <Package className="size-5" />,
		},
		{
			title: 'Revenue',
			value: '$312K',
			change: 22,
			icon: <DollarSign className="size-5" />,
		},
		{
			title: 'Avg Order Value',
			value: '$42',
			change: 5,
			icon: <Layers className="size-5" />,
		},
		{
			title: 'Processing Time',
			value: '2.1h',
			change: -8,
			icon: <Clock className="size-5" />,
		},
	];

	const monthlyMetrics: MetricCard[] = [
		{
			title: 'Units Sold',
			value: '34,567',
			change: 15,
			icon: <Package className="size-5" />,
		},
		{
			title: 'Revenue',
			value: '$1.2M',
			change: 25,
			icon: <DollarSign className="size-5" />,
		},
		{
			title: 'Avg Order Value',
			value: '$45',
			change: 8,
			icon: <Layers className="size-5" />,
		},
		{
			title: 'Processing Time',
			value: '1.9h',
			change: -12,
			icon: <Clock className="size-5" />,
		},
	];

	const categories: CategoryProgress[] = [
		{ name: 'Electronics', value: 12456, max: 15000 },
		{ name: 'Accessories', value: 8234, max: 10000 },
		{ name: 'Apparel', value: 5678, max: 8000 },
		{ name: 'Home & Garden', value: 3456, max: 5000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Performance Overview
						</CardTitle>
						<CardDescription>View metrics by time period</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="weekly" className="space-y-6">
							<TabsList>
								<TabsTrigger value="daily">Daily</TabsTrigger>
								<TabsTrigger value="weekly">Weekly</TabsTrigger>
								<TabsTrigger value="monthly">Monthly</TabsTrigger>
							</TabsList>
							<TabsContent value="daily" className="space-y-6">
								<MetricGrid metrics={dailyMetrics} />
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">
											Category Performance
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CategoryList categories={categories} />
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="weekly" className="space-y-6">
								<MetricGrid metrics={weeklyMetrics} />
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">
											Category Performance
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CategoryList categories={categories} />
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="monthly" className="space-y-6">
								<MetricGrid metrics={monthlyMetrics} />
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">
											Category Performance
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CategoryList categories={categories} />
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
