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
import { Progress } from '@/components/ui/progress';

type RegionKPIProps = {
	region: string;
	flag: string;
	revenue: string;
	orders: string;
	growth: number;
	marketShare: number;
};

const RegionKPI = ({
	region,
	flag,
	revenue,
	orders,
	growth,
	marketShare,
}: RegionKPIProps) => (
	<Card className="border-border/30 bg-card/60 transition-all hover:border-primary/30 hover:shadow-md">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="text-2xl">{flag}</span>
					<div>
						<p className="font-medium">{region}</p>
						<p className="text-xs text-muted-foreground">{orders} orders</p>
					</div>
				</div>
				<Badge
					variant="outline"
					className={
						growth >= 0
							? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
							: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					}
				>
					{growth >= 0 ? (
						<TrendingUp className="mr-1 size-3" />
					) : (
						<TrendingDown className="mr-1 size-3" />
					)}
					{growth >= 0 ? '+' : ''}
					{growth}%
				</Badge>
			</div>
			<div className="mt-4">
				<div className="flex items-baseline justify-between">
					<span className="text-2xl font-bold">{revenue}</span>
					<span className="text-xs text-muted-foreground">
						{marketShare}% market
					</span>
				</div>
				<Progress value={marketShare} className="mt-2 h-1.5" />
			</div>
		</CardContent>
	</Card>
);

type SummaryProps = {
	label: string;
	value: string;
};

const Summary = ({ label, value }: SummaryProps) => (
	<div className="text-center">
		<p className="text-xs text-muted-foreground">{label}</p>
		<p className="text-lg font-bold">{value}</p>
	</div>
);

export default function Main() {
	const regions: RegionKPIProps[] = [
		{
			region: 'United States',
			flag: '🇺🇸',
			revenue: '$485K',
			orders: '3,250',
			growth: 18.5,
			marketShare: 42,
		},
		{
			region: 'United Kingdom',
			flag: '🇬🇧',
			revenue: '$185K',
			orders: '1,420',
			growth: 12.3,
			marketShare: 16,
		},
		{
			region: 'Germany',
			flag: '🇩🇪',
			revenue: '$142K',
			orders: '980',
			growth: 8.7,
			marketShare: 12,
		},
		{
			region: 'Canada',
			flag: '🇨🇦',
			revenue: '$125K',
			orders: '890',
			growth: 22.1,
			marketShare: 11,
		},
		{
			region: 'Australia',
			flag: '🇦🇺',
			revenue: '$98K',
			orders: '720',
			growth: -2.4,
			marketShare: 8,
		},
		{
			region: 'France',
			flag: '🇫🇷',
			revenue: '$85K',
			orders: '640',
			growth: 5.2,
			marketShare: 7,
		},
	];

	const summaries: SummaryProps[] = [
		{ label: 'Total Markets', value: '24' },
		{ label: 'Global Revenue', value: '$1.24M' },
		{ label: 'Avg Growth', value: '+10.7%' },
		{ label: 'Top Growth', value: 'Canada' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<MapPin className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Regional Performance
								</CardTitle>
								<CardDescription>
									Sales performance by geographic region
								</CardDescription>
							</div>
						</div>
						<div className="flex gap-6 rounded-lg bg-muted/30 px-4 py-2">
							{summaries.map((s, i) => (
								<Summary key={i} {...s} />
							))}
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{regions.map((region, i) => (
								<RegionKPI key={i} {...region} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
