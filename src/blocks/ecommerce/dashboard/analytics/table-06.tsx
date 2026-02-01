'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Campaign = {
	name: string;
	channel: string;
	impressions: number;
	clicks: number;
	conversions: number;
	spend: number;
	revenue: number;
	status: 'active' | 'paused' | 'ended';
};

const CampaignRow = ({ campaign }: { campaign: Campaign }) => {
	const ctr = ((campaign.clicks / campaign.impressions) * 100).toFixed(2);
	const convRate = ((campaign.conversions / campaign.clicks) * 100).toFixed(2);
	const roas = (campaign.revenue / campaign.spend).toFixed(2);

	return (
		<TableRow className="hover:bg-muted/30">
			<TableCell>
				<div className="flex items-center gap-2">
					<div
						className={`size-2 rounded-full ${campaign.status === 'active' ? 'bg-emerald-500' : campaign.status === 'paused' ? 'bg-amber-500' : 'bg-slate-500'}`}
					/>
					<span className="font-medium">{campaign.name}</span>
				</div>
			</TableCell>
			<TableCell>
				<Badge variant="outline" className="text-xs">
					{campaign.channel}
				</Badge>
			</TableCell>
			<TableCell>{campaign.impressions.toLocaleString()}</TableCell>
			<TableCell>
				<div>
					<span>{campaign.clicks.toLocaleString()}</span>
					<span className="text-xs text-muted-foreground ml-1">({ctr}%)</span>
				</div>
			</TableCell>
			<TableCell>
				<div>
					<span>{campaign.conversions}</span>
					<span className="text-xs text-muted-foreground ml-1">
						({convRate}%)
					</span>
				</div>
			</TableCell>
			<TableCell>${campaign.spend.toLocaleString()}</TableCell>
			<TableCell>
				<span
					className={
						parseFloat(roas) >= 2
							? 'text-emerald-500'
							: parseFloat(roas) >= 1
								? 'text-amber-500'
								: 'text-rose-500'
					}
				>
					{roas}x
				</span>
			</TableCell>
		</TableRow>
	);
};

const campaigns: Campaign[] = [
	{
		name: 'Summer Sale 2024',
		channel: 'Google Ads',
		impressions: 1250000,
		clicks: 45000,
		conversions: 1250,
		spend: 15000,
		revenue: 48500,
		status: 'active',
	},
	{
		name: 'Brand Awareness Q1',
		channel: 'Facebook',
		impressions: 890000,
		clicks: 28000,
		conversions: 420,
		spend: 8500,
		revenue: 12800,
		status: 'active',
	},
	{
		name: 'Retargeting Campaign',
		channel: 'Display',
		impressions: 456000,
		clicks: 18500,
		conversions: 890,
		spend: 4200,
		revenue: 28400,
		status: 'active',
	},
	{
		name: 'Product Launch',
		channel: 'Instagram',
		impressions: 320000,
		clicks: 12800,
		conversions: 340,
		spend: 6800,
		revenue: 15200,
		status: 'paused',
	},
	{
		name: 'Holiday Promo 2023',
		channel: 'Google Ads',
		impressions: 2100000,
		clicks: 85000,
		conversions: 3200,
		spend: 28000,
		revenue: 124000,
		status: 'ended',
	},
	{
		name: 'Email Blast March',
		channel: 'Email',
		impressions: 125000,
		clicks: 8500,
		conversions: 680,
		spend: 1200,
		revenue: 18500,
		status: 'ended',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Campaign Performance
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Marketing campaign metrics and ROI
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Campaign</TableHead>
										<TableHead>Channel</TableHead>
										<TableHead>Impressions</TableHead>
										<TableHead>Clicks (CTR)</TableHead>
										<TableHead>Conv. (Rate)</TableHead>
										<TableHead>Spend</TableHead>
										<TableHead>ROAS</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{campaigns.map((campaign, i) => (
										<CampaignRow key={i} campaign={campaign} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
