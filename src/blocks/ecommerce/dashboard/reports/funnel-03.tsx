'use client';

import {
	Megaphone,
	Eye,
	MousePointer,
	UserCheck,
	ShoppingBag,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FunnelData = {
	channel: string;
	stages: {
		impressions: number;
		clicks: number;
		signups: number;
		purchases: number;
	};
	ctr: number;
	conversionRate: number;
	change: number;
};

type FunnelRowProps = {
	data: FunnelData;
};

const FunnelRow = ({ data }: FunnelRowProps) => {
	const maxValue = data.stages.impressions;
	const getWidth = (val: number) => Math.max((val / maxValue) * 100, 5);

	return (
		<Card className="border-border/30 bg-muted/10">
			<CardContent className="p-4">
				<div className="mb-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="font-semibold">{data.channel}</span>
						<Badge
							variant="outline"
							className={
								data.change >= 0
									? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
									: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
							}
						>
							{data.change >= 0 ? (
								<TrendingUp className="mr-1 size-3" />
							) : (
								<TrendingDown className="mr-1 size-3" />
							)}
							{data.change >= 0 ? '+' : ''}
							{data.change}%
						</Badge>
					</div>
					<div className="flex gap-4 text-sm text-muted-foreground">
						<span>
							CTR:{' '}
							<span className="font-medium text-foreground">{data.ctr}%</span>
						</span>
						<span>
							Conv:{' '}
							<span className="font-medium text-foreground">
								{data.conversionRate}%
							</span>
						</span>
					</div>
				</div>
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<span className="w-24 text-xs text-muted-foreground">
							Impressions
						</span>
						<div className="flex-1 overflow-hidden rounded-full bg-muted/30">
							<div
								className="h-6 rounded-full bg-chart-1/70"
								style={{ width: `${getWidth(data.stages.impressions)}%` }}
							/>
						</div>
						<span className="w-16 text-right text-sm font-medium">
							{(data.stages.impressions / 1000).toFixed(1)}K
						</span>
					</div>
					<div className="flex items-center gap-3">
						<span className="w-24 text-xs text-muted-foreground">Clicks</span>
						<div className="flex-1 overflow-hidden rounded-full bg-muted/30">
							<div
								className="h-6 rounded-full bg-chart-2/70"
								style={{ width: `${getWidth(data.stages.clicks)}%` }}
							/>
						</div>
						<span className="w-16 text-right text-sm font-medium">
							{(data.stages.clicks / 1000).toFixed(1)}K
						</span>
					</div>
					<div className="flex items-center gap-3">
						<span className="w-24 text-xs text-muted-foreground">Signups</span>
						<div className="flex-1 overflow-hidden rounded-full bg-muted/30">
							<div
								className="h-6 rounded-full bg-chart-3/70"
								style={{ width: `${getWidth(data.stages.signups)}%` }}
							/>
						</div>
						<span className="w-16 text-right text-sm font-medium">
							{data.stages.signups.toLocaleString()}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<span className="w-24 text-xs text-muted-foreground">
							Purchases
						</span>
						<div className="flex-1 overflow-hidden rounded-full bg-muted/30">
							<div
								className="h-6 rounded-full bg-chart-4/70"
								style={{ width: `${getWidth(data.stages.purchases)}%` }}
							/>
						</div>
						<span className="w-16 text-right text-sm font-medium">
							{data.stages.purchases.toLocaleString()}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const funnelData: FunnelData[] = [
		{
			channel: 'Google Ads',
			stages: {
				impressions: 850000,
				clicks: 42500,
				signups: 2125,
				purchases: 850,
			},
			ctr: 5.0,
			conversionRate: 2.0,
			change: 12.5,
		},
		{
			channel: 'Facebook Ads',
			stages: {
				impressions: 620000,
				clicks: 24800,
				signups: 1488,
				purchases: 521,
			},
			ctr: 4.0,
			conversionRate: 2.1,
			change: -5.2,
		},
		{
			channel: 'Instagram',
			stages: {
				impressions: 480000,
				clicks: 28800,
				signups: 1728,
				purchases: 518,
			},
			ctr: 6.0,
			conversionRate: 1.8,
			change: 18.4,
		},
		{
			channel: 'Email',
			stages: {
				impressions: 125000,
				clicks: 18750,
				signups: 1125,
				purchases: 563,
			},
			ctr: 15.0,
			conversionRate: 3.0,
			change: 8.2,
		},
	];

	const totals = [
		{ label: 'Total Impressions', value: '2.08M' },
		{ label: 'Total Clicks', value: '114.9K' },
		{ label: 'Total Signups', value: '6,466' },
		{ label: 'Total Purchases', value: '2,452' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Megaphone className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Marketing Channel Funnel
								</CardTitle>
								<CardDescription>
									Conversion performance by marketing channel
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">Last 30 Days</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{totals.map((t, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-sm text-muted-foreground">{t.label}</p>
										<p className="mt-1 text-2xl font-bold">{t.value}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="space-y-4">
							{funnelData.map((d, i) => (
								<FunnelRow key={i} data={d} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
