'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import { Package, Boxes, ArrowRight, TrendingUp } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ProductData = {
	month: string;
	launches: number;
	discontinued: number;
	active: number;
};

type LaunchItemProps = {
	name: string;
	date: string;
	category: string;
	status: 'success' | 'moderate' | 'new';
};

const LaunchItem = ({ name, date, category, status }: LaunchItemProps) => {
	const statusConfig = {
		success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
		moderate: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
		new: 'bg-primary/10 text-primary border-primary/20',
	};

	return (
		<div className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/10 p-3">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Package className="size-4 text-primary" />
				</div>
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-xs text-muted-foreground">
						{category} • {date}
					</p>
				</div>
			</div>
			<Badge variant="outline" className={statusConfig[status]}>
				{status === 'success'
					? 'High Performer'
					: status === 'moderate'
						? 'Moderate'
						: 'New Launch'}
			</Badge>
		</div>
	);
};

const chartConfig: ChartConfig = {
	launches: {
		label: 'New Launches',
		color: 'var(--chart-1)',
	},
	discontinued: {
		label: 'Discontinued',
		color: 'var(--chart-5)',
	},
};

export default function Main() {
	const chartData: ProductData[] = [
		{ month: 'Jan', launches: 8, discontinued: 3, active: 245 },
		{ month: 'Feb', launches: 5, discontinued: 2, active: 248 },
		{ month: 'Mar', launches: 12, discontinued: 4, active: 256 },
		{ month: 'Apr', launches: 6, discontinued: 5, active: 257 },
		{ month: 'May', launches: 9, discontinued: 2, active: 264 },
		{ month: 'Jun', launches: 15, discontinued: 6, active: 273 },
		{ month: 'Jul', launches: 7, discontinued: 3, active: 277 },
		{ month: 'Aug', launches: 11, discontinued: 4, active: 284 },
		{ month: 'Sep', launches: 8, discontinued: 5, active: 287 },
		{ month: 'Oct', launches: 14, discontinued: 3, active: 298 },
		{ month: 'Nov', launches: 10, discontinued: 2, active: 306 },
		{ month: 'Dec', launches: 6, discontinued: 4, active: 308 },
	];

	const recentLaunches: LaunchItemProps[] = [
		{
			name: 'Premium Wireless Earbuds Pro',
			date: 'Dec 15, 2024',
			category: 'Electronics',
			status: 'new',
		},
		{
			name: 'Eco-Friendly Water Bottle',
			date: 'Dec 8, 2024',
			category: 'Lifestyle',
			status: 'success',
		},
		{
			name: 'Smart Fitness Tracker V3',
			date: 'Nov 28, 2024',
			category: 'Electronics',
			status: 'success',
		},
		{
			name: 'Organic Coffee Beans Blend',
			date: 'Nov 20, 2024',
			category: 'Food & Beverage',
			status: 'moderate',
		},
		{
			name: 'Portable Solar Charger',
			date: 'Nov 12, 2024',
			category: 'Electronics',
			status: 'success',
		},
	];

	const stats = [
		{ label: 'Total Launches (YTD)', value: '111' },
		{ label: 'Discontinued', value: '43' },
		{ label: 'Active Products', value: '308' },
		{ label: 'Success Rate', value: '78%' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Boxes className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Product Launch Timeline
								</CardTitle>
								<CardDescription>
									Monthly product launches and lifecycle
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-primary/20 text-primary">
							<TrendingUp className="mr-1 size-3" />
							+25% YoY
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{stats.map((s, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-sm text-muted-foreground">{s.label}</p>
										<p className="mt-1 text-2xl font-bold">{s.value}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[280px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis tickLine={false} axisLine={false} tickMargin={8} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar
									dataKey="launches"
									fill="var(--color-launches)"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="discontinued"
									fill="var(--color-discontinued)"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ChartContainer>
						<Card className="border-border/30 bg-muted/10">
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Recent Launches</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{recentLaunches.map((l, i) => (
									<LaunchItem key={i} {...l} />
								))}
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
