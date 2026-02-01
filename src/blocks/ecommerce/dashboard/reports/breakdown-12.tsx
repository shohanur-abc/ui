'use client';

import {
	Megaphone,
	MousePointer,
	Eye,
	ShoppingCart,
	DollarSign,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ChannelProps = {
	channel: string;
	spend: string;
	impressions: string;
	clicks: string;
	conversions: string;
	revenue: string;
	roas: number;
};

type MetricCardProps = {
	label: string;
	value: string;
	icon: React.ElementType;
	percentage: number;
};

const MetricCard = ({
	label,
	value,
	icon: Icon,
	percentage,
}: MetricCardProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<Badge variant="outline" className="text-xs">
					{percentage}%
				</Badge>
			</div>
			<p className="mt-3 text-2xl font-bold">{value}</p>
			<p className="text-sm text-muted-foreground">{label}</p>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: MetricCardProps[] = [
		{
			label: 'Total Ad Spend',
			value: '$185,400',
			icon: DollarSign,
			percentage: 100,
		},
		{ label: 'Impressions', value: '12.5M', icon: Eye, percentage: 100 },
		{
			label: 'Total Clicks',
			value: '425K',
			icon: MousePointer,
			percentage: 3.4,
		},
		{
			label: 'Conversions',
			value: '12,450',
			icon: ShoppingCart,
			percentage: 2.9,
		},
	];

	const channels: ChannelProps[] = [
		{
			channel: 'Google Ads',
			spend: '$68,500',
			impressions: '4.2M',
			clicks: '156K',
			conversions: '4,850',
			revenue: '$285,400',
			roas: 4.2,
		},
		{
			channel: 'Facebook Ads',
			spend: '$42,800',
			impressions: '5.8M',
			clicks: '142K',
			conversions: '3,420',
			revenue: '$168,500',
			roas: 3.9,
		},
		{
			channel: 'Instagram',
			spend: '$28,500',
			impressions: '1.8M',
			clicks: '68K',
			conversions: '2,180',
			revenue: '$112,300',
			roas: 3.9,
		},
		{
			channel: 'TikTok',
			spend: '$22,400',
			impressions: '3.2M',
			clicks: '45K',
			conversions: '1,250',
			revenue: '$68,400',
			roas: 3.1,
		},
		{
			channel: 'LinkedIn',
			spend: '$12,800',
			impressions: '420K',
			clicks: '8.5K',
			conversions: '480',
			revenue: '$42,500',
			roas: 3.3,
		},
		{
			channel: 'YouTube',
			spend: '$10,400',
			impressions: '1.1M',
			clicks: '5.5K',
			conversions: '270',
			revenue: '$28,200',
			roas: 2.7,
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
									Marketing Channel Breakdown
								</CardTitle>
								<CardDescription>
									Ad spend and performance by channel
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-primary/20 text-primary">Avg ROAS: 3.8x</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{metrics.map((m, i) => (
								<MetricCard key={i} {...m} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">
									Performance by Channel
								</p>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Channel</TableHead>
												<TableHead className="text-right">Spend</TableHead>
												<TableHead className="text-right">
													Impressions
												</TableHead>
												<TableHead className="text-right">Clicks</TableHead>
												<TableHead className="text-right">
													Conversions
												</TableHead>
												<TableHead className="text-right">Revenue</TableHead>
												<TableHead className="text-right">ROAS</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{channels.map((c, i) => (
												<TableRow key={i}>
													<TableCell className="font-medium">
														{c.channel}
													</TableCell>
													<TableCell className="text-right">
														{c.spend}
													</TableCell>
													<TableCell className="text-right text-muted-foreground">
														{c.impressions}
													</TableCell>
													<TableCell className="text-right text-muted-foreground">
														{c.clicks}
													</TableCell>
													<TableCell className="text-right">
														{c.conversions}
													</TableCell>
													<TableCell className="text-right font-medium">
														{c.revenue}
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className={
																c.roas >= 4
																	? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
																	: c.roas >= 3
																		? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
																		: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
															}
														>
															{c.roas}x
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
