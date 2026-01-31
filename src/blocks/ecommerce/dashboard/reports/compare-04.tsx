'use client';

import { ArrowUpRight, ArrowDownRight, MapPin } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type RegionCompareProps = {
	region: string;
	flag: string;
	revenue: string;
	orders: string;
	avgOrder: string;
	growth: number;
	marketShare: number;
};

const RegionCompare = ({ region, flag, revenue, orders, avgOrder, growth, marketShare }: RegionCompareProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="text-3xl">{flag}</span>
					<div>
						<p className="font-bold">{region}</p>
						<p className="text-xs text-muted-foreground">{marketShare}% market share</p>
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
						<ArrowUpRight className="mr-1 size-3" />
					) : (
						<ArrowDownRight className="mr-1 size-3" />
					)}
					{growth >= 0 ? '+' : ''}{growth}%
				</Badge>
			</div>
			<div className="mt-4 grid grid-cols-3 gap-4">
				<div>
					<p className="text-xs text-muted-foreground">Revenue</p>
					<p className="text-lg font-bold">{revenue}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Orders</p>
					<p className="text-lg font-bold">{orders}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Avg Order</p>
					<p className="text-lg font-bold">{avgOrder}</p>
				</div>
			</div>
			<Progress value={marketShare} className="mt-4 h-1.5" />
		</CardContent>
	</Card>
);

export default function Main() {
	const regions: RegionCompareProps[] = [
		{ region: 'United States', flag: '🇺🇸', revenue: '$485K', orders: '3,250', avgOrder: '$149', growth: 18.5, marketShare: 42 },
		{ region: 'United Kingdom', flag: '🇬🇧', revenue: '$185K', orders: '1,420', avgOrder: '$130', growth: 12.3, marketShare: 16 },
		{ region: 'Germany', flag: '🇩🇪', revenue: '$142K', orders: '980', avgOrder: '$145', growth: 8.7, marketShare: 12 },
		{ region: 'Canada', flag: '🇨🇦', revenue: '$125K', orders: '890', avgOrder: '$140', growth: 22.1, marketShare: 11 },
		{ region: 'Australia', flag: '🇦🇺', revenue: '$98K', orders: '720', avgOrder: '$136', growth: -2.4, marketShare: 8 },
		{ region: 'France', flag: '🇫🇷', revenue: '$85K', orders: '640', avgOrder: '$133', growth: 5.2, marketShare: 7 },
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
									Regional Comparison Report
								</CardTitle>
								<CardDescription>
									Performance comparison across geographic regions
								</CardDescription>
							</div>
						</div>
						<Badge>6 Active Markets</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{regions.map((region, i) => (
								<RegionCompare key={i} {...region} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
