'use client';

import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type RegionData = {
	region: string;
	revenue: number;
	orders: number;
	customers: number;
	growth: number;
	intensity: 'high' | 'medium' | 'low';
};

type RegionCellProps = {
	region: RegionData;
};

const intensityConfig = {
	high: 'bg-primary text-primary-foreground',
	medium: 'bg-primary/60 text-primary-foreground',
	low: 'bg-primary/30 text-foreground',
};

const RegionCell = ({ region }: RegionCellProps) => (
	<div className={`rounded-lg p-4 ${intensityConfig[region.intensity]}`}>
		<p className="font-semibold">{region.region}</p>
		<p className="text-2xl font-bold">
			${(region.revenue / 1000000).toFixed(2)}M
		</p>
		<div className="mt-1 flex items-center gap-1 text-sm opacity-90">
			{region.growth >= 0 ? (
				<TrendingUp className="size-3" />
			) : (
				<TrendingDown className="size-3" />
			)}
			{region.growth >= 0 ? '+' : ''}
			{region.growth}%
		</div>
	</div>
);

export default function Main() {
	const regions: RegionData[] = [
		{
			region: 'North America',
			revenue: 4250000,
			orders: 42500,
			customers: 28500,
			growth: 18.5,
			intensity: 'high',
		},
		{
			region: 'Europe',
			revenue: 3180000,
			orders: 31800,
			customers: 22400,
			growth: 12.2,
			intensity: 'high',
		},
		{
			region: 'Asia Pacific',
			revenue: 2450000,
			orders: 28500,
			customers: 18200,
			growth: 25.8,
			intensity: 'medium',
		},
		{
			region: 'Latin America',
			revenue: 1280000,
			orders: 15200,
			customers: 9800,
			growth: 32.4,
			intensity: 'medium',
		},
		{
			region: 'Middle East',
			revenue: 850000,
			orders: 8500,
			customers: 5200,
			growth: 28.5,
			intensity: 'low',
		},
		{
			region: 'Africa',
			revenue: 420000,
			orders: 4800,
			customers: 3100,
			growth: 45.2,
			intensity: 'low',
		},
	];

	const topMetrics = [
		{ label: 'Total Revenue', value: '$12.43M' },
		{ label: 'Total Orders', value: '131.3K' },
		{ label: 'Total Customers', value: '87.2K' },
		{ label: 'Avg Growth', value: '+27%' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<MapPin className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Geographic Revenue Heatmap
								</CardTitle>
								<CardDescription>
									Regional performance and market penetration
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">YTD 2024</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{topMetrics.map((m, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-sm text-muted-foreground">{m.label}</p>
										<p className="mt-1 text-2xl font-bold">{m.value}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
							{regions.map((r, i) => (
								<RegionCell key={i} region={r} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Region</TableHead>
												<TableHead className="text-right">Revenue</TableHead>
												<TableHead className="text-right">Orders</TableHead>
												<TableHead className="text-right">Customers</TableHead>
												<TableHead className="text-right">Growth</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{regions.map((r, i) => (
												<TableRow key={i}>
													<TableCell className="font-medium">
														{r.region}
													</TableCell>
													<TableCell className="text-right">
														${(r.revenue / 1000000).toFixed(2)}M
													</TableCell>
													<TableCell className="text-right">
														{(r.orders / 1000).toFixed(1)}K
													</TableCell>
													<TableCell className="text-right">
														{(r.customers / 1000).toFixed(1)}K
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className={
																r.growth >= 20
																	? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
																	: 'border-amber-500/20 bg-amber-500/10 text-amber-500'
															}
														>
															+{r.growth}%
														</Badge>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
