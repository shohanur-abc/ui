'use client';

import { MapPin, MoreVertical, TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type RegionReportItem = {
	region: string;
	country: string;
	revenue: string;
	orders: number;
	growth: number;
	marketShare: number;
	trend: 'up' | 'down';
};

type RegionCardProps = RegionReportItem;

const RegionCard = ({
	region,
	country,
	revenue,
	orders,
	growth,
	marketShare,
	trend,
}: RegionCardProps) => (
	<Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<CardContent className="relative p-4 @sm:p-5">
			<div className="flex items-start justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-accent/50 p-2.5">
						<MapPin className="size-5 text-primary" />
					</div>
					<div>
						<h3 className="font-semibold">{region}</h3>
						<p className="text-sm text-muted-foreground">{country}</p>
					</div>
				</div>
				<Badge
					variant="outline"
					className={
						trend === 'up'
							? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
							: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					}
				>
					{trend === 'up' ? (
						<TrendingUp className="mr-1 size-3" />
					) : (
						<TrendingDown className="mr-1 size-3" />
					)}
					{growth > 0 ? '+' : ''}
					{growth}%
				</Badge>
			</div>

			<div className="mt-4 grid grid-cols-2 gap-4">
				<div>
					<p className="text-xs text-muted-foreground">Revenue</p>
					<p className="text-lg font-bold">{revenue}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Orders</p>
					<p className="text-lg font-bold">{orders.toLocaleString()}</p>
				</div>
			</div>

			<div className="mt-4">
				<div className="mb-1.5 flex items-center justify-between text-xs">
					<span className="text-muted-foreground">Market Share</span>
					<span className="font-medium">{marketShare}%</span>
				</div>
				<Progress value={marketShare} className="h-2" />
			</div>
		</CardContent>
	</Card>
);

type HeaderProps = {
	title: string;
	description: string;
};

const ReportHeader = ({ title, description }: HeaderProps) => (
	<div className="mb-6 flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
		<div>
			<h2 className="text-xl font-bold @sm:text-2xl">{title}</h2>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Button variant="outline" size="sm" className="w-fit">
			<MoreVertical className="mr-2 size-4" />
			View All Regions
		</Button>
	</div>
);

export default function Main() {
	const headerProps: HeaderProps = {
		title: 'Regional Sales Report',
		description: 'Performance breakdown by geographic region',
	};

	const regions: RegionReportItem[] = [
		{
			region: 'North America',
			country: 'United States',
			revenue: '$124,500',
			orders: 4521,
			growth: 18.5,
			marketShare: 42,
			trend: 'up',
		},
		{
			region: 'Western Europe',
			country: 'Germany',
			revenue: '$89,200',
			orders: 3245,
			growth: 12.3,
			marketShare: 30,
			trend: 'up',
		},
		{
			region: 'Asia Pacific',
			country: 'Japan',
			revenue: '$67,800',
			orders: 2876,
			growth: 24.7,
			marketShare: 23,
			trend: 'up',
		},
		{
			region: 'Latin America',
			country: 'Brazil',
			revenue: '$34,500',
			orders: 1234,
			growth: -5.2,
			marketShare: 12,
			trend: 'down',
		},
		{
			region: 'Middle East',
			country: 'UAE',
			revenue: '$28,900',
			orders: 987,
			growth: 8.9,
			marketShare: 10,
			trend: 'up',
		},
		{
			region: 'Oceania',
			country: 'Australia',
			revenue: '$22,100',
			orders: 756,
			growth: -2.1,
			marketShare: 8,
			trend: 'down',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<ReportHeader {...headerProps} />
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3 @xl:gap-6">
					{regions.map((region, i) => (
						<RegionCard key={i} {...region} />
					))}
				</div>
			</div>
		</section>
	);
}
