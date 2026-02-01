import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Gift,
	Percent,
	Clock,
	Users,
	DollarSign,
	TrendingUp,
	TrendingDown,
	Calendar,
	Tag,
	Copy,
	type LucideIcon,
} from 'lucide-react';

interface Promotion {
	id: string;
	code: string;
	name: string;
	type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo';
	discount: string;
	status: 'active' | 'scheduled' | 'expired' | 'paused';
	usageCount: number;
	usageLimit?: number;
	revenueGenerated: string;
	startDate: string;
	endDate: string;
	daysRemaining?: number;
}

interface PromotionTrackerProps {
	title: string;
	promotions: Promotion[];
	stats: {
		activePromotions: number;
		totalRedeemed: number;
		revenueImpact: string;
		avgDiscountRate: string;
	};
}

const TypeConfig: Record<
	Promotion['type'],
	{ icon: LucideIcon; className: string }
> = {
	percentage: { icon: Percent, className: 'bg-purple-500/20 text-purple-400' },
	fixed: { icon: DollarSign, className: 'bg-emerald-500/20 text-emerald-400' },
	free_shipping: { icon: Gift, className: 'bg-blue-500/20 text-blue-400' },
	bogo: { icon: Tag, className: 'bg-orange-500/20 text-orange-400' },
};

const StatusConfig: Record<
	Promotion['status'],
	{ label: string; className: string }
> = {
	active: {
		label: 'Active',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
	},
	scheduled: {
		label: 'Scheduled',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	},
	expired: {
		label: 'Expired',
		className: 'bg-muted text-muted-foreground border-border',
	},
	paused: {
		label: 'Paused',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
	},
};

const PromotionCard = ({ promotion }: { promotion: Promotion }) => {
	const typeConfig = TypeConfig[promotion.type];
	const statusConfig = StatusConfig[promotion.status];
	const TypeIcon = typeConfig.icon;
	const usageProgress = promotion.usageLimit
		? (promotion.usageCount / promotion.usageLimit) * 100
		: null;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				promotion.status === 'active'
					? 'border-emerald-500/30 bg-emerald-500/5'
					: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-3">
					<div
						className={`flex size-10 items-center justify-center rounded-lg ${typeConfig.className}`}
					>
						<TypeIcon className="size-5" />
					</div>
					<div>
						<h4 className="font-medium text-foreground">{promotion.name}</h4>
						<div className="flex items-center gap-2">
							<code className="text-xs font-mono px-2 py-0.5 rounded bg-muted/50 text-foreground">
								{promotion.code}
							</code>
							<Button
								variant="ghost"
								size="icon-sm"
								className="size-5 hover:bg-muted"
							>
								<Copy className="size-3" />
							</Button>
						</div>
					</div>
				</div>
				<Badge variant="outline" className={statusConfig.className}>
					{statusConfig.label}
				</Badge>
			</div>

			<div className="flex items-center gap-4 mb-3">
				<div className="text-2xl font-bold text-primary">
					{promotion.discount}
				</div>
				<div className="flex-1 text-right">
					<span className="text-lg font-semibold text-emerald-400 block">
						{promotion.revenueGenerated}
					</span>
					<span className="text-xs text-muted-foreground">
						Revenue Generated
					</span>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-muted/30 text-xs mb-3">
				<div className="flex items-center gap-1">
					<Calendar className="size-3 text-muted-foreground" />
					<span className="text-muted-foreground">Start:</span>
					<span className="text-foreground">{promotion.startDate}</span>
				</div>
				<div className="flex items-center gap-1">
					<Clock className="size-3 text-muted-foreground" />
					<span className="text-muted-foreground">End:</span>
					<span className="text-foreground">{promotion.endDate}</span>
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground flex items-center gap-1">
						<Users className="size-3" />
						Usage
					</span>
					<span className="text-foreground">
						{promotion.usageCount.toLocaleString()}
						{promotion.usageLimit &&
							` / ${promotion.usageLimit.toLocaleString()}`}
					</span>
				</div>
				{usageProgress !== null && (
					<Progress
						value={usageProgress}
						className={`h-1.5 ${
							usageProgress >= 90
								? '[&>[data-slot=indicator]]:bg-amber-500'
								: '[&>[data-slot=indicator]]:bg-primary'
						}`}
					/>
				)}
				{promotion.daysRemaining !== undefined &&
					promotion.status === 'active' && (
						<span
							className={`text-xs ${
								promotion.daysRemaining <= 3
									? 'text-amber-400'
									: 'text-muted-foreground'
							}`}
						>
							{promotion.daysRemaining} days remaining
						</span>
					)}
			</div>
		</div>
	);
};

const PromotionStats = ({
	stats,
}: {
	stats: PromotionTrackerProps['stats'];
}) => (
	<div className="grid grid-cols-4 gap-2">
		<div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
			<Gift className="size-4 text-primary mx-auto mb-1" />
			<span className="text-lg font-bold text-foreground block">
				{stats.activePromotions}
			</span>
			<span className="text-xs text-muted-foreground">Active</span>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-center">
			<Users className="size-4 text-muted-foreground mx-auto mb-1" />
			<span className="text-lg font-bold text-foreground block">
				{stats.totalRedeemed}
			</span>
			<span className="text-xs text-muted-foreground">Redeemed</span>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
			<TrendingUp className="size-4 text-emerald-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-emerald-400 block">
				{stats.revenueImpact}
			</span>
			<span className="text-xs text-muted-foreground">Revenue</span>
		</div>
		<div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
			<Percent className="size-4 text-purple-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-purple-400 block">
				{stats.avgDiscountRate}
			</span>
			<span className="text-xs text-muted-foreground">Avg Discount</span>
		</div>
	</div>
);

const PromotionTracker = ({
	title,
	promotions,
	stats,
}: PromotionTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Gift className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				Create New
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<PromotionStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{promotions.map((promotion) => (
						<PromotionCard key={promotion.id} promotion={promotion} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const promotions: Promotion[] = [
		{
			id: '1',
			code: 'SPRING24',
			name: 'Spring Sale 2024',
			type: 'percentage',
			discount: '25% OFF',
			status: 'active',
			usageCount: 847,
			usageLimit: 1000,
			revenueGenerated: '$42,350',
			startDate: 'Mar 1',
			endDate: 'Mar 31',
			daysRemaining: 12,
		},
		{
			id: '2',
			code: 'FREESHIP',
			name: 'Free Shipping Weekend',
			type: 'free_shipping',
			discount: 'Free Shipping',
			status: 'active',
			usageCount: 234,
			revenueGenerated: '$18,920',
			startDate: 'Mar 15',
			endDate: 'Mar 17',
			daysRemaining: 2,
		},
		{
			id: '3',
			code: 'SAVE50',
			name: 'New Customer Discount',
			type: 'fixed',
			discount: '$50 OFF',
			status: 'active',
			usageCount: 156,
			usageLimit: 500,
			revenueGenerated: '$23,400',
			startDate: 'Jan 1',
			endDate: 'Dec 31',
			daysRemaining: 289,
		},
		{
			id: '4',
			code: 'SUMMER24',
			name: 'Early Summer Preview',
			type: 'percentage',
			discount: '30% OFF',
			status: 'scheduled',
			usageCount: 0,
			usageLimit: 2000,
			revenueGenerated: '$0',
			startDate: 'Jun 1',
			endDate: 'Jun 15',
		},
		{
			id: '5',
			code: 'BOGO2024',
			name: 'Buy One Get One',
			type: 'bogo',
			discount: 'BOGO 50%',
			status: 'expired',
			usageCount: 1523,
			usageLimit: 1500,
			revenueGenerated: '$89,120',
			startDate: 'Feb 1',
			endDate: 'Feb 14',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<PromotionTracker
					title="Promotion Tracker"
					promotions={promotions}
					stats={{
						activePromotions: 5,
						totalRedeemed: 2760,
						revenueImpact: '$173K',
						avgDiscountRate: '22%',
					}}
				/>
			</div>
		</section>
	);
}
