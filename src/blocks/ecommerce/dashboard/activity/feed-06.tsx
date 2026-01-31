import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Target,
	TrendingUp,
	TrendingDown,
	Megaphone,
	Mail,
	Share2,
	BarChart3,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';

interface CampaignActivity {
	id: string;
	name: string;
	type: 'email' | 'social' | 'ppc' | 'affiliate';
	status: 'active' | 'paused' | 'completed' | 'scheduled';
	metrics: {
		impressions: string;
		clicks: string;
		conversions: string;
		roi: string;
	};
	trend: 'up' | 'down' | 'stable';
	trendValue: string;
	budget: {
		spent: string;
		total: string;
	};
	lastUpdated: string;
}

interface MarketingFeedProps {
	title: string;
	campaigns: CampaignActivity[];
	totalSpend: string;
	totalRevenue: string;
}

const CampaignIcon = ({ type }: { type: CampaignActivity['type'] }) => {
	const config: Record<
		CampaignActivity['type'],
		{ icon: LucideIcon; className: string }
	> = {
		email: { icon: Mail, className: 'bg-blue-500/20 text-blue-400' },
		social: { icon: Share2, className: 'bg-pink-500/20 text-pink-400' },
		ppc: { icon: Target, className: 'bg-amber-500/20 text-amber-400' },
		affiliate: { icon: Megaphone, className: 'bg-purple-500/20 text-purple-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const StatusBadge = ({ status }: { status: CampaignActivity['status'] }) => {
	const config = {
		active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		paused: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		completed: 'bg-muted text-muted-foreground border-border',
		scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	};

	return (
		<Badge variant="outline" className={config[status]}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const BudgetBar = ({
	spent,
	total,
}: {
	spent: string;
	total: string;
}) => {
	const spentNum = parseFloat(spent.replace(/[^0-9.]/g, ''));
	const totalNum = parseFloat(total.replace(/[^0-9.]/g, ''));
	const percentage = Math.min((spentNum / totalNum) * 100, 100);

	return (
		<div className="space-y-1">
			<div className="flex justify-between text-xs">
				<span className="text-muted-foreground">Budget</span>
				<span className="text-foreground">
					{spent} / {total}
				</span>
			</div>
			<div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
				<div
					className={`h-full transition-all ${
						percentage > 90 ? 'bg-rose-500' : percentage > 70 ? 'bg-amber-500' : 'bg-primary'
					}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};

const MetricsRow = ({ metrics }: { metrics: CampaignActivity['metrics'] }) => (
	<div className="grid grid-cols-4 gap-2 text-center">
		<div className="flex flex-col">
			<span className="text-xs text-muted-foreground">Impressions</span>
			<span className="text-sm font-medium text-foreground">
				{metrics.impressions}
			</span>
		</div>
		<div className="flex flex-col">
			<span className="text-xs text-muted-foreground">Clicks</span>
			<span className="text-sm font-medium text-foreground">
				{metrics.clicks}
			</span>
		</div>
		<div className="flex flex-col">
			<span className="text-xs text-muted-foreground">Conversions</span>
			<span className="text-sm font-medium text-foreground">
				{metrics.conversions}
			</span>
		</div>
		<div className="flex flex-col">
			<span className="text-xs text-muted-foreground">ROI</span>
			<span
				className={`text-sm font-medium ${
					parseFloat(metrics.roi) > 0 ? 'text-emerald-400' : 'text-rose-400'
				}`}
			>
				{metrics.roi}
			</span>
		</div>
	</div>
);

const CampaignCard = ({ campaign }: { campaign: CampaignActivity }) => (
	<div className="group rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30">
		<div className="flex flex-col gap-4">
			<div className="flex items-start gap-3">
				<CampaignIcon type={campaign.type} />
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<div>
							<h4 className="font-medium text-foreground">{campaign.name}</h4>
							<div className="flex items-center gap-2 mt-1">
								<span className="text-xs text-muted-foreground capitalize">
									{campaign.type}
								</span>
								<span className="text-xs text-muted-foreground">•</span>
								<span className="text-xs text-muted-foreground">
									{campaign.lastUpdated}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div
								className={`flex items-center gap-1 text-xs ${
									campaign.trend === 'up'
										? 'text-emerald-400'
										: campaign.trend === 'down'
											? 'text-rose-400'
											: 'text-muted-foreground'
								}`}
							>
								{campaign.trend === 'up' && <TrendingUp className="size-3" />}
								{campaign.trend === 'down' && <TrendingDown className="size-3" />}
								<span>{campaign.trendValue}</span>
							</div>
							<StatusBadge status={campaign.status} />
						</div>
					</div>
				</div>
			</div>

			<MetricsRow metrics={campaign.metrics} />
			<BudgetBar spent={campaign.budget.spent} total={campaign.budget.total} />

			<div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
				<Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
					<BarChart3 className="size-3" />
					Analytics
				</Button>
				<Button variant="outline" size="sm" className="h-7 text-xs">
					Edit Campaign
				</Button>
			</div>
		</div>
	</div>
);

const OverviewStats = ({
	totalSpend,
	totalRevenue,
}: {
	totalSpend: string;
	totalRevenue: string;
}) => (
	<div className="grid grid-cols-2 gap-4">
		<div className="flex flex-col p-4 rounded-lg bg-muted/50 border border-border/50">
			<span className="text-sm text-muted-foreground mb-1">Total Spend</span>
			<span className="text-2xl font-bold text-foreground">{totalSpend}</span>
		</div>
		<div className="flex flex-col p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<span className="text-sm text-muted-foreground mb-1">Revenue Generated</span>
			<span className="text-2xl font-bold text-emerald-400">{totalRevenue}</span>
		</div>
	</div>
);

const MarketingFeed = ({
	title,
	campaigns,
	totalSpend,
	totalRevenue,
}: MarketingFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm" className="gap-2">
				<span>All Campaigns</span>
				<ArrowRight className="size-4" />
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-6">
			<OverviewStats totalSpend={totalSpend} totalRevenue={totalRevenue} />
			<div className="space-y-4">
				{campaigns.map((campaign) => (
					<CampaignCard key={campaign.id} campaign={campaign} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const campaigns: CampaignActivity[] = [
		{
			id: '1',
			name: 'Spring Sale Email Blast',
			type: 'email',
			status: 'active',
			metrics: {
				impressions: '45.2K',
				clicks: '3.8K',
				conversions: '412',
				roi: '+342%',
			},
			trend: 'up',
			trendValue: '+18%',
			budget: { spent: '$1,200', total: '$2,000' },
			lastUpdated: '2 hours ago',
		},
		{
			id: '2',
			name: 'Instagram Product Showcase',
			type: 'social',
			status: 'active',
			metrics: {
				impressions: '128K',
				clicks: '8.2K',
				conversions: '234',
				roi: '+185%',
			},
			trend: 'up',
			trendValue: '+24%',
			budget: { spent: '$3,400', total: '$5,000' },
			lastUpdated: '1 hour ago',
		},
		{
			id: '3',
			name: 'Google Shopping Ads',
			type: 'ppc',
			status: 'paused',
			metrics: {
				impressions: '89.5K',
				clicks: '2.1K',
				conversions: '89',
				roi: '+52%',
			},
			trend: 'down',
			trendValue: '-8%',
			budget: { spent: '$4,800', total: '$5,000' },
			lastUpdated: '1 day ago',
		},
		{
			id: '4',
			name: 'Influencer Partnership Q1',
			type: 'affiliate',
			status: 'completed',
			metrics: {
				impressions: '250K',
				clicks: '12.4K',
				conversions: '567',
				roi: '+420%',
			},
			trend: 'stable',
			trendValue: '0%',
			budget: { spent: '$8,000', total: '$8,000' },
			lastUpdated: '1 week ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<MarketingFeed
					title="Marketing Campaigns"
					campaigns={campaigns}
					totalSpend="$17,400"
					totalRevenue="$89,234"
				/>
			</div>
		</section>
	);
}
