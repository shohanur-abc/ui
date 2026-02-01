import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Percent,
	Gift,
	Tag,
	Ticket,
	Clock,
	Users,
	TrendingUp,
	Copy,
	MoreVertical,
	type LucideIcon,
} from 'lucide-react';

interface PromoActivity {
	id: string;
	type: 'discount' | 'coupon' | 'gift' | 'flash-sale';
	code: string;
	name: string;
	discount: string;
	status: 'active' | 'scheduled' | 'expired' | 'paused';
	usage: {
		current: number;
		limit?: number;
	};
	revenue: string;
	validUntil: string;
	recentUsers?: {
		name: string;
		initials: string;
	}[];
}

interface PromoFeedProps {
	title: string;
	promotions: PromoActivity[];
	totalSavings: string;
	activePromos: number;
}

const PromoIcon = ({ type }: { type: PromoActivity['type'] }) => {
	const config: Record<
		PromoActivity['type'],
		{ icon: LucideIcon; className: string }
	> = {
		discount: {
			icon: Percent,
			className: 'bg-emerald-500/20 text-emerald-400',
		},
		coupon: { icon: Ticket, className: 'bg-blue-500/20 text-blue-400' },
		gift: { icon: Gift, className: 'bg-pink-500/20 text-pink-400' },
		'flash-sale': { icon: Tag, className: 'bg-amber-500/20 text-amber-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${className}`}
		>
			<Icon className="size-6" />
		</div>
	);
};

const StatusBadge = ({ status }: { status: PromoActivity['status'] }) => {
	const config = {
		active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		expired: 'bg-muted text-muted-foreground border-border',
		paused: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
	};

	return (
		<Badge variant="outline" className={config[status]}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const UsageProgress = ({ usage }: { usage: PromoActivity['usage'] }) => {
	const hasLimit = usage.limit !== undefined;
	const percentage = hasLimit ? (usage.current / usage.limit!) * 100 : 0;

	return (
		<div className="flex items-center gap-2">
			<Users className="size-4 text-muted-foreground" />
			<span className="text-sm text-foreground">
				{usage.current.toLocaleString()}
				{hasLimit && (
					<span className="text-muted-foreground">
						{' '}
						/ {usage.limit!.toLocaleString()}
					</span>
				)}
			</span>
			{hasLimit && (
				<div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
					<div
						className={`h-full ${
							percentage > 90
								? 'bg-rose-500'
								: percentage > 70
									? 'bg-amber-500'
									: 'bg-primary'
						}`}
						style={{ width: `${Math.min(percentage, 100)}%` }}
					/>
				</div>
			)}
		</div>
	);
};

const RecentUsers = ({ users }: { users?: PromoActivity['recentUsers'] }) => {
	if (!users || users.length === 0) return null;

	return (
		<div className="flex -space-x-1.5">
			{users.slice(0, 4).map((user, i) => (
				<Avatar key={i} className="size-6 border-2 border-card">
					<AvatarFallback className="text-[10px] bg-secondary">
						{user.initials}
					</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
};

const PromoCard = ({ promo }: { promo: PromoActivity }) => (
	<div className="group rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
		<div className="flex gap-4">
			<PromoIcon type={promo.type} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<h4 className="font-semibold text-foreground">{promo.name}</h4>
							<StatusBadge status={promo.status} />
						</div>
						<div className="flex items-center gap-2">
							<code className="px-2 py-0.5 rounded bg-muted text-xs font-mono text-primary">
								{promo.code}
							</code>
							<Button
								variant="ghost"
								size="icon-sm"
								className="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<Copy className="size-3" />
							</Button>
							<Badge
								variant="outline"
								className="bg-primary/10 text-primary border-primary/30"
							>
								{promo.discount}
							</Badge>
						</div>
					</div>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</div>

				<div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
					<div className="space-y-2">
						<UsageProgress usage={promo.usage} />
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<Clock className="size-3" />
							<span>Valid until {promo.validUntil}</span>
						</div>
					</div>
					<div className="flex flex-col items-end gap-2">
						<div className="flex items-center gap-1 text-sm">
							<TrendingUp className="size-4 text-emerald-400" />
							<span className="font-semibold text-emerald-400">
								{promo.revenue}
							</span>
						</div>
						<RecentUsers users={promo.recentUsers} />
					</div>
				</div>
			</div>
		</div>
	</div>
);

const SummaryStats = ({
	totalSavings,
	activePromos,
}: {
	totalSavings: string;
	activePromos: number;
}) => (
	<div className="grid grid-cols-2 gap-4">
		<div className="flex flex-col p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<span className="text-sm text-muted-foreground mb-1">
				Revenue Generated
			</span>
			<span className="text-2xl font-bold text-emerald-400">
				{totalSavings}
			</span>
		</div>
		<div className="flex flex-col p-4 rounded-lg bg-primary/10 border border-primary/20">
			<span className="text-sm text-muted-foreground mb-1">Active Promos</span>
			<span className="text-2xl font-bold text-primary">{activePromos}</span>
		</div>
	</div>
);

const PromoFeed = ({
	title,
	promotions,
	totalSavings,
	activePromos,
}: PromoFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button size="sm">Create Promo</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-6">
			<SummaryStats totalSavings={totalSavings} activePromos={activePromos} />
			<div className="space-y-4">
				{promotions.map((promo) => (
					<PromoCard key={promo.id} promo={promo} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const promotions: PromoActivity[] = [
		{
			id: '1',
			type: 'flash-sale',
			code: 'SPRING24',
			name: 'Spring Flash Sale',
			discount: '30% OFF',
			status: 'active',
			usage: { current: 847, limit: 1000 },
			revenue: '$42,350',
			validUntil: 'Mar 31, 2024',
			recentUsers: [
				{ name: 'SC', initials: 'SC' },
				{ name: 'MJ', initials: 'MJ' },
				{ name: 'ED', initials: 'ED' },
				{ name: 'AK', initials: 'AK' },
			],
		},
		{
			id: '2',
			type: 'coupon',
			code: 'WELCOME10',
			name: 'New Customer Discount',
			discount: '10% OFF',
			status: 'active',
			usage: { current: 2341 },
			revenue: '$18,920',
			validUntil: 'Dec 31, 2024',
			recentUsers: [
				{ name: 'JL', initials: 'JL' },
				{ name: 'LA', initials: 'LA' },
			],
		},
		{
			id: '3',
			type: 'gift',
			code: 'FREESHIP',
			name: 'Free Shipping Weekend',
			discount: 'FREE SHIPPING',
			status: 'scheduled',
			usage: { current: 0, limit: 500 },
			revenue: '$0',
			validUntil: 'Apr 5, 2024',
		},
		{
			id: '4',
			type: 'discount',
			code: 'BULK20',
			name: 'Bulk Order Discount',
			discount: '20% OFF',
			status: 'active',
			usage: { current: 156, limit: 200 },
			revenue: '$89,450',
			validUntil: 'Jun 30, 2024',
			recentUsers: [{ name: 'DK', initials: 'DK' }],
		},
		{
			id: '5',
			type: 'coupon',
			code: 'WINTER23',
			name: 'Winter Sale',
			discount: '25% OFF',
			status: 'expired',
			usage: { current: 1000, limit: 1000 },
			revenue: '$67,800',
			validUntil: 'Feb 28, 2024',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<PromoFeed
					title="Promotion Activity"
					promotions={promotions}
					totalSavings="$218,520"
					activePromos={4}
				/>
			</div>
		</section>
	);
}
