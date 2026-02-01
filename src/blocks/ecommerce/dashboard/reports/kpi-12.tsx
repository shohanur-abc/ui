'use client';

import {
	Megaphone,
	Eye,
	MousePointer,
	ShoppingCart,
	DollarSign,
	BarChart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type CampaignMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	benchmark: string;
	status: 'above' | 'below' | 'at';
};

const CampaignMetric = ({
	icon: Icon,
	label,
	value,
	benchmark,
	status,
}: CampaignMetricProps) => {
	const statusConfig = {
		above: {
			badge: 'Above',
			class: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
		},
		below: {
			badge: 'Below',
			class: 'border-rose-500/20 bg-rose-500/10 text-rose-500',
		},
		at: {
			badge: 'At Target',
			class: 'border-amber-500/20 bg-amber-500/10 text-amber-500',
		},
	};

	return (
		<div className="flex items-center gap-4 rounded-lg border border-border/30 bg-muted/20 p-4">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-sm text-muted-foreground">{label}</p>
				<p className="text-xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">Benchmark: {benchmark}</p>
			</div>
			<Badge variant="outline" className={statusConfig[status].class}>
				{statusConfig[status].badge}
			</Badge>
		</div>
	);
};

type CampaignSummaryProps = {
	campaign: string;
	spend: string;
	revenue: string;
	roas: string;
	status: 'active' | 'paused' | 'completed';
};

const CampaignSummary = ({
	campaign,
	spend,
	revenue,
	roas,
	status,
}: CampaignSummaryProps) => (
	<div className="flex items-center justify-between border-b border-border/30 py-3 last:border-0">
		<div className="flex items-center gap-3">
			<div
				className={`size-2 rounded-full ${
					status === 'active'
						? 'bg-emerald-500'
						: status === 'paused'
							? 'bg-amber-500'
							: 'bg-muted-foreground'
				}`}
			/>
			<span className="font-medium">{campaign}</span>
		</div>
		<div className="flex items-center gap-6 text-sm">
			<span className="text-muted-foreground">{spend}</span>
			<span className="font-medium">{revenue}</span>
			<span className="font-bold text-primary">{roas}</span>
		</div>
	</div>
);

export default function Main() {
	const metrics: CampaignMetricProps[] = [
		{
			icon: Eye,
			label: 'Impressions',
			value: '2.4M',
			benchmark: '2.0M',
			status: 'above',
		},
		{
			icon: MousePointer,
			label: 'Click Rate',
			value: '2.8%',
			benchmark: '3.0%',
			status: 'below',
		},
		{
			icon: ShoppingCart,
			label: 'Conversions',
			value: '4,280',
			benchmark: '4,000',
			status: 'above',
		},
		{
			icon: DollarSign,
			label: 'Cost per Conv.',
			value: '$24.50',
			benchmark: '$25.00',
			status: 'at',
		},
	];

	const campaigns: CampaignSummaryProps[] = [
		{
			campaign: 'Summer Sale 2024',
			spend: '$12,500',
			revenue: '$68,420',
			roas: '5.47x',
			status: 'active',
		},
		{
			campaign: 'New Arrivals',
			spend: '$8,200',
			revenue: '$42,180',
			roas: '5.14x',
			status: 'active',
		},
		{
			campaign: 'Flash Sale',
			spend: '$5,800',
			revenue: '$28,940',
			roas: '4.99x',
			status: 'completed',
		},
		{
			campaign: 'Brand Awareness',
			spend: '$15,000',
			revenue: '$52,500',
			roas: '3.50x',
			status: 'paused',
		},
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
									Marketing KPI Report
								</CardTitle>
								<CardDescription>
									Campaign performance and marketing metrics
								</CardDescription>
							</div>
						</div>
						<Badge>4 Active Campaigns</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{metrics.map((metric, i) => (
								<CampaignMetric key={i} {...metric} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Campaign Performance</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="mb-2 flex justify-between text-xs text-muted-foreground">
									<span>Campaign</span>
									<div className="flex gap-6">
										<span>Spend</span>
										<span>Revenue</span>
										<span>ROAS</span>
									</div>
								</div>
								{campaigns.map((c, i) => (
									<CampaignSummary key={i} {...c} />
								))}
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
