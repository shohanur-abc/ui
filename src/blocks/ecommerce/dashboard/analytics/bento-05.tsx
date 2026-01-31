'use client';

import {
	ArrowUpRight,
	Clock,
	type LucideIcon,
	MousePointerClick,
	Search,
	Share2,
	Tag,
	Target,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SourceCardProps = {
	icon: LucideIcon;
	source: string;
	visitors: string;
	percentage: number;
	color: string;
};

const SourceCard = ({ icon: Icon, source, visitors, percentage, color }: SourceCardProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className={`rounded-lg p-2 ring-1 ring-current/20 ${color}`}>
					<Icon className="size-4" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium">{source}</p>
					<p className="text-xs text-muted-foreground">{visitors} visitors</p>
				</div>
				<div className="text-right">
					<p className="text-lg font-bold">{percentage}%</p>
				</div>
			</div>
			<div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
				<div className={`h-full rounded-full ${color.replace('text-', 'bg-').replace('/80', '')}`} style={{ width: `${percentage}%` }} />
			</div>
		</CardContent>
	</Card>
);

type KeywordRowProps = {
	keyword: string;
	clicks: string;
	impressions: string;
	ctr: string;
	position: string;
};

const KeywordsCard = ({ keywords }: { keywords: KeywordRowProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<Search className="size-4 text-primary" />
				<CardTitle className="text-sm font-medium">Top Keywords</CardTitle>
			</div>
			<Badge variant="secondary">SEO</Badge>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground pb-2 border-b border-border/30">
				<span className="col-span-1">Keyword</span>
				<span className="text-right">Clicks</span>
				<span className="text-right">Impr.</span>
				<span className="text-right">CTR</span>
				<span className="text-right">Pos.</span>
			</div>
			<div className="space-y-2 mt-2">
				{keywords.map((kw, i) => (
					<div key={i} className="grid grid-cols-5 gap-2 text-sm py-1.5 border-b border-border/20 last:border-0">
						<span className="font-medium truncate">{kw.keyword}</span>
						<span className="text-right">{kw.clicks}</span>
						<span className="text-right text-muted-foreground">{kw.impressions}</span>
						<span className="text-right text-muted-foreground">{kw.ctr}</span>
						<span className="text-right">{kw.position}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

type CampaignRowProps = {
	name: string;
	status: 'active' | 'paused' | 'ended';
	spend: string;
	conversions: string;
	roi: string;
};

const CampaignsCard = ({ campaigns }: { campaigns: CampaignRowProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2 row-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<Target className="size-4 text-primary" />
				<CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
			</div>
			<Badge variant="outline">Marketing</Badge>
		</CardHeader>
		<CardContent className="space-y-4">
			{campaigns.map((campaign, i) => (
				<div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/30 space-y-3">
					<div className="flex items-center justify-between">
						<span className="font-medium">{campaign.name}</span>
						<Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'paused' ? 'secondary' : 'outline'}>
							{campaign.status}
						</Badge>
					</div>
					<div className="grid grid-cols-3 gap-4 text-sm">
						<div>
							<p className="text-xs text-muted-foreground">Spend</p>
							<p className="font-semibold">{campaign.spend}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Conversions</p>
							<p className="font-semibold">{campaign.conversions}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">ROI</p>
							<p className="font-semibold text-emerald-500">{campaign.roi}</p>
						</div>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

type ReferrerRowProps = {
	referrer: string;
	sessions: string;
	bounceRate: string;
};

const ReferrersCard = ({ referrers }: { referrers: ReferrerRowProps[] }) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Share2 className="size-4 text-primary" />
				<CardTitle className="text-sm font-medium">Top Referrers</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{referrers.map((ref, i) => (
				<div key={i} className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
					<span className="text-sm">{ref.referrer}</span>
					<div className="flex items-center gap-3 text-sm">
						<span className="font-semibold">{ref.sessions}</span>
						<span className="text-xs text-muted-foreground">{ref.bounceRate}</span>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const sources: SourceCardProps[] = [
	{ icon: Search, source: 'Organic Search', visitors: '8,456', percentage: 42, color: 'text-emerald-500/80 bg-emerald-500/10' },
	{ icon: MousePointerClick, source: 'Direct', visitors: '5,234', percentage: 26, color: 'text-blue-500/80 bg-blue-500/10' },
	{ icon: Share2, source: 'Social', visitors: '3,123', percentage: 16, color: 'text-purple-500/80 bg-purple-500/10' },
	{ icon: Tag, source: 'Paid Ads', visitors: '2,456', percentage: 12, color: 'text-orange-500/80 bg-orange-500/10' },
];

const keywords: KeywordRowProps[] = [
	{ keyword: 'wireless headphones', clicks: '2,345', impressions: '45,678', ctr: '5.1%', position: '2.3' },
	{ keyword: 'bluetooth speaker', clicks: '1,890', impressions: '38,234', ctr: '4.9%', position: '3.1' },
	{ keyword: 'usb hub', clicks: '1,456', impressions: '28,567', ctr: '5.1%', position: '1.8' },
	{ keyword: 'laptop stand', clicks: '1,234', impressions: '25,432', ctr: '4.8%', position: '2.5' },
];

const campaigns: CampaignRowProps[] = [
	{ name: 'Summer Sale 2024', status: 'active', spend: '$2,450', conversions: '234', roi: '+156%' },
	{ name: 'New Product Launch', status: 'active', spend: '$1,890', conversions: '189', roi: '+142%' },
	{ name: 'Brand Awareness', status: 'paused', spend: '$3,200', conversions: '456', roi: '+98%' },
];

const referrers: ReferrerRowProps[] = [
	{ referrer: 'google.com', sessions: '4,567', bounceRate: '32%' },
	{ referrer: 'facebook.com', sessions: '2,345', bounceRate: '45%' },
	{ referrer: 'twitter.com', sessions: '1,234', bounceRate: '38%' },
	{ referrer: 'linkedin.com', sessions: '890', bounceRate: '28%' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{sources.map((source, i) => (
						<SourceCard key={i} {...source} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-4 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<KeywordsCard keywords={keywords} />
					<CampaignsCard campaigns={campaigns} />
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<ReferrersCard referrers={referrers} />
					<ReferrersCard referrers={[
						{ referrer: 'youtube.com', sessions: '1,567', bounceRate: '41%' },
						{ referrer: 'reddit.com', sessions: '987', bounceRate: '52%' },
						{ referrer: 'medium.com', sessions: '654', bounceRate: '35%' },
						{ referrer: 'pinterest.com', sessions: '432', bounceRate: '48%' },
					]} />
					<ReferrersCard referrers={[
						{ referrer: 'bing.com', sessions: '876', bounceRate: '36%' },
						{ referrer: 'duckduckgo.com', sessions: '543', bounceRate: '29%' },
						{ referrer: 'yahoo.com', sessions: '321', bounceRate: '42%' },
						{ referrer: 'baidu.com', sessions: '234', bounceRate: '55%' },
					]} />
				</div>
			</div>
		</section>
	);
}
