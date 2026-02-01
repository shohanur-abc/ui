import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Megaphone,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Target,
	Percent,
	MousePointer,
	Eye,
	CheckCircle2,
	AlertTriangle,
	type LucideIcon,
} from 'lucide-react';

interface CampaignAlert {
	id: string;
	campaignName: string;
	type: 'milestone' | 'budget_warning' | 'performance' | 'ended' | 'started';
	platform: 'google' | 'facebook' | 'instagram' | 'email' | 'tiktok';
	message: string;
	metrics?: {
		spend?: string;
		budget?: string;
		roas?: string;
		ctr?: string;
		conversions?: number;
	};
	trend?: 'up' | 'down';
	timestamp: string;
}

interface CampaignAlertsProps {
	title: string;
	alerts: CampaignAlert[];
	stats: {
		activeCount: number;
		totalSpend: string;
		avgRoas: string;
	};
}

const TypeConfig: Record<
	CampaignAlert['type'],
	{ icon: LucideIcon; className: string }
> = {
	milestone: { icon: Target, className: 'bg-emerald-500/20 text-emerald-400' },
	budget_warning: {
		icon: AlertTriangle,
		className: 'bg-amber-500/20 text-amber-400',
	},
	performance: { icon: TrendingUp, className: 'bg-blue-500/20 text-blue-400' },
	ended: { icon: CheckCircle2, className: 'bg-purple-500/20 text-purple-400' },
	started: { icon: Megaphone, className: 'bg-primary/20 text-primary' },
};

const PlatformBadge = ({
	platform,
}: {
	platform: CampaignAlert['platform'];
}) => {
	const config = {
		google: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		facebook: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
		instagram: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
		email: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		tiktok: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge
			variant="outline"
			className={`text-xs capitalize ${config[platform]}`}
		>
			{platform}
		</Badge>
	);
};

const MetricPill = ({
	icon: Icon,
	label,
	value,
	trend,
}: {
	icon: LucideIcon;
	label: string;
	value: string;
	trend?: 'up' | 'down';
}) => (
	<div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-xs">
		<Icon className="size-3 text-muted-foreground" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium text-foreground">{value}</span>
		{trend &&
			(trend === 'up' ? (
				<TrendingUp className="size-3 text-emerald-400" />
			) : (
				<TrendingDown className="size-3 text-rose-400" />
			))}
	</div>
);

const AlertCard = ({ alert }: { alert: CampaignAlert }) => {
	const config = TypeConfig[alert.type];
	const Icon = config.icon;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				alert.type === 'budget_warning'
					? 'border-amber-500/30 bg-amber-500/5'
					: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.className}`}
				>
					<Icon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div className="flex items-center gap-2 flex-wrap">
							<span className="font-medium text-foreground">
								{alert.campaignName}
							</span>
							<PlatformBadge platform={alert.platform} />
						</div>
						<span className="text-xs text-muted-foreground shrink-0">
							{alert.timestamp}
						</span>
					</div>
					<p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
					{alert.metrics && (
						<div className="flex flex-wrap gap-2">
							{alert.metrics.spend && (
								<MetricPill
									icon={DollarSign}
									label="Spend"
									value={alert.metrics.spend}
								/>
							)}
							{alert.metrics.roas && (
								<MetricPill
									icon={TrendingUp}
									label="ROAS"
									value={alert.metrics.roas}
									trend={alert.trend}
								/>
							)}
							{alert.metrics.ctr && (
								<MetricPill
									icon={MousePointer}
									label="CTR"
									value={alert.metrics.ctr}
								/>
							)}
							{alert.metrics.conversions !== undefined && (
								<MetricPill
									icon={Target}
									label="Conv"
									value={alert.metrics.conversions.toString()}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const CampaignStats = ({ stats }: { stats: CampaignAlertsProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
			<Megaphone className="size-4 text-primary mb-2" />
			<span className="text-2xl font-bold text-foreground block">
				{stats.activeCount}
			</span>
			<span className="text-xs text-muted-foreground">Active</span>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
			<DollarSign className="size-4 text-muted-foreground mb-2" />
			<span className="text-2xl font-bold text-foreground block">
				{stats.totalSpend}
			</span>
			<span className="text-xs text-muted-foreground">Spend</span>
		</div>
		<div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<TrendingUp className="size-4 text-emerald-400 mb-2" />
			<span className="text-2xl font-bold text-emerald-400 block">
				{stats.avgRoas}
			</span>
			<span className="text-xs text-muted-foreground">Avg ROAS</span>
		</div>
	</div>
);

const CampaignAlerts = ({ title, alerts, stats }: CampaignAlertsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Megaphone className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				Ad Manager
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<CampaignStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{alerts.map((alert) => (
						<AlertCard key={alert.id} alert={alert} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const alerts: CampaignAlert[] = [
		{
			id: '1',
			campaignName: 'Spring Sale 2024',
			type: 'milestone',
			platform: 'google',
			message: 'Campaign reached 1000 conversions! ROAS exceeds target by 45%.',
			metrics: {
				spend: '$4,500',
				roas: '4.2x',
				conversions: 1000,
			},
			trend: 'up',
			timestamp: '15 min ago',
		},
		{
			id: '2',
			campaignName: 'Retargeting - Cart Abandoners',
			type: 'budget_warning',
			platform: 'facebook',
			message:
				'Campaign has used 85% of daily budget. Consider increasing budget.',
			metrics: {
				spend: '$850',
				budget: '$1,000',
				ctr: '3.2%',
			},
			timestamp: '1 hour ago',
		},
		{
			id: '3',
			campaignName: 'New Product Launch',
			type: 'started',
			platform: 'instagram',
			message: 'Campaign went live and is now collecting initial data.',
			metrics: {
				spend: '$125',
			},
			timestamp: '2 hours ago',
		},
		{
			id: '4',
			campaignName: 'Weekly Newsletter',
			type: 'performance',
			platform: 'email',
			message:
				'Open rate 15% below average. Subject line may need optimization.',
			metrics: {
				ctr: '1.8%',
				conversions: 45,
			},
			trend: 'down',
			timestamp: '4 hours ago',
		},
		{
			id: '5',
			campaignName: 'Gen Z Summer Vibes',
			type: 'ended',
			platform: 'tiktok',
			message:
				'Campaign completed successfully. Final metrics are ready for review.',
			metrics: {
				spend: '$2,000',
				roas: '3.8x',
				conversions: 847,
			},
			trend: 'up',
			timestamp: 'Yesterday',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<CampaignAlerts
					title="Campaign Alerts"
					alerts={alerts}
					stats={{
						activeCount: 12,
						totalSpend: '$24.5K',
						avgRoas: '3.6x',
					}}
				/>
			</div>
		</section>
	);
}
