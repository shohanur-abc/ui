import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
	Gift,
	Tag,
	Percent,
	DollarSign,
	Calendar,
	Clock,
	AlertTriangle,
	CheckCircle,
	Copy,
	Share2,
	BarChart3,
	Edit,
	Trash2,
} from 'lucide-react';

interface PromotionDetailProps {
	promotion: {
		id: string;
		name: string;
		code: string;
		type: 'percentage' | 'fixed' | 'shipping' | 'bogo';
		value: string;
		status: 'active' | 'scheduled' | 'expired' | 'paused';
		usage: { current: number; limit: number; percentage: number };
		dates: { start: string; end: string };
		conditions: {
			minOrder?: string;
			products?: string;
			customers?: string;
			maxUses?: string;
		};
		orders: { count: number; revenue: string; avgDiscount: string };
		performance: { redemptions: number; conversionRate: string };
	};
	labels: {
		code: string;
		usage: string;
		conditions: string;
		performance: string;
		orders: string;
		revenue: string;
		avgDiscount: string;
		edit: string;
		pause: string;
		delete: string;
		copy: string;
		share: string;
	};
}

const StatusBadge = ({
	status,
}: {
	status: PromotionDetailProps['promotion']['status'];
}) => {
	const config = {
		active: {
			icon: CheckCircle,
			className: 'bg-accent/10 text-accent border-accent/30',
			label: 'Active',
		},
		scheduled: {
			icon: Clock,
			className: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
			label: 'Scheduled',
		},
		expired: {
			icon: AlertTriangle,
			className: 'bg-muted text-muted-foreground border-border',
			label: 'Expired',
		},
		paused: {
			icon: Clock,
			className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
			label: 'Paused',
		},
	};
	const { icon: Icon, className, label } = config[status];
	return (
		<Badge variant="outline" className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const TypeIcon = ({
	type,
}: {
	type: PromotionDetailProps['promotion']['type'];
}) => {
	const icons = {
		percentage: Percent,
		fixed: DollarSign,
		shipping: Gift,
		bogo: Tag,
	};
	const Icon = icons[type];
	return (
		<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
			<Icon className="size-6 text-primary" />
		</div>
	);
};

const StatCard = ({
	icon: Icon,
	label,
	value,
	trend,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	trend?: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
		<div className="flex items-center gap-2 text-muted-foreground mb-2">
			<Icon className="size-4" />
			<span className="text-sm">{label}</span>
		</div>
		<p className="text-2xl font-bold">{value}</p>
		{trend && <p className="text-xs text-accent mt-1">{trend}</p>}
	</div>
);

const PromotionDetail = ({ promotion, labels }: PromotionDetailProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<TypeIcon type={promotion.type} />
					<div>
						<CardTitle className="text-xl">{promotion.name}</CardTitle>
						<p className="text-sm text-muted-foreground font-mono">
							{promotion.id}
						</p>
					</div>
				</div>
				<StatusBadge status={promotion.status} />
			</div>
		</CardHeader>

		<CardContent className="space-y-6">
			<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-muted-foreground mb-1">{labels.code}</p>
						<div className="flex items-center gap-3">
							<code className="text-2xl font-bold font-mono tracking-wide">
								{promotion.code}
							</code>
							<Button variant="ghost" size="icon-sm">
								<Copy className="size-4" />
							</Button>
						</div>
					</div>
					<div className="text-right">
						<p className="text-sm text-muted-foreground mb-1">Discount</p>
						<p className="text-3xl font-bold text-primary">{promotion.value}</p>
					</div>
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between mb-2">
					<p className="text-sm font-semibold text-muted-foreground">
						{labels.usage}
					</p>
					<span className="text-sm font-medium">
						{promotion.usage.current} / {promotion.usage.limit}
					</span>
				</div>
				<Progress value={promotion.usage.percentage} className="h-3" />
				<p className="text-xs text-muted-foreground mt-1">
					{promotion.usage.percentage}% of limit used
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="p-3 rounded-lg bg-muted/30">
					<div className="flex items-center gap-2 text-muted-foreground mb-1">
						<Calendar className="size-4" />
						<span className="text-xs">Starts</span>
					</div>
					<p className="font-medium">{promotion.dates.start}</p>
				</div>
				<div className="p-3 rounded-lg bg-muted/30">
					<div className="flex items-center gap-2 text-muted-foreground mb-1">
						<Calendar className="size-4" />
						<span className="text-xs">Ends</span>
					</div>
					<p className="font-medium">{promotion.dates.end}</p>
				</div>
			</div>

			<div className="p-4 rounded-xl bg-muted/20 border border-border/50">
				<p className="text-sm font-semibold text-muted-foreground mb-3">
					{labels.conditions}
				</p>
				<div className="space-y-2">
					{promotion.conditions.minOrder && (
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Minimum Order</span>
							<span className="font-medium">
								{promotion.conditions.minOrder}
							</span>
						</div>
					)}
					{promotion.conditions.products && (
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Applies To</span>
							<span className="font-medium">
								{promotion.conditions.products}
							</span>
						</div>
					)}
					{promotion.conditions.customers && (
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Customer Limit</span>
							<span className="font-medium">
								{promotion.conditions.customers}
							</span>
						</div>
					)}
					{promotion.conditions.maxUses && (
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">
								Max Uses per Customer
							</span>
							<span className="font-medium">
								{promotion.conditions.maxUses}
							</span>
						</div>
					)}
				</div>
			</div>

			<Separator />

			<div>
				<p className="text-sm font-semibold text-muted-foreground mb-3">
					{labels.performance}
				</p>
				<div className="grid grid-cols-3 gap-4">
					<StatCard
						icon={Tag}
						label={labels.orders}
						value={promotion.orders.count.toString()}
						trend={`${promotion.performance.conversionRate} conversion`}
					/>
					<StatCard
						icon={DollarSign}
						label={labels.revenue}
						value={promotion.orders.revenue}
					/>
					<StatCard
						icon={BarChart3}
						label={labels.avgDiscount}
						value={promotion.orders.avgDiscount}
					/>
				</div>
			</div>
		</CardContent>

		<CardFooter className="gap-3 border-t border-border/50">
			<Button variant="ghost" size="icon" className="text-destructive">
				<Trash2 className="size-4" />
			</Button>
			<Button variant="outline" className="gap-1.5">
				<Share2 className="size-4" />
				{labels.share}
			</Button>
			<Button variant="outline" className="flex-1 gap-1.5">
				<Clock className="size-4" />
				{labels.pause}
			</Button>
			<Button className="flex-1 gap-1.5">
				<Edit className="size-4" />
				{labels.edit}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		code: 'Promo Code',
		usage: 'Usage',
		conditions: 'Conditions',
		performance: 'Performance',
		orders: 'Orders',
		revenue: 'Revenue',
		avgDiscount: 'Avg Discount',
		edit: 'Edit',
		pause: 'Pause',
		delete: 'Delete',
		copy: 'Copy',
		share: 'Share',
	};

	const promotion = {
		id: 'PROMO-2024-001',
		name: 'Winter Sale 2024',
		code: 'WINTER25',
		type: 'percentage' as const,
		value: '25% OFF',
		status: 'active' as const,
		usage: { current: 847, limit: 1000, percentage: 85 },
		dates: { start: 'Jan 15, 2024', end: 'Feb 28, 2024' },
		conditions: {
			minOrder: '$50.00',
			products: 'All Products',
			customers: 'New & Existing',
			maxUses: '1 per customer',
		},
		orders: { count: 847, revenue: '$125,430', avgDiscount: '$37.00' },
		performance: { redemptions: 847, conversionRate: '24.5%' },
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<PromotionDetail promotion={promotion} labels={labels} />
			</div>
		</section>
	);
}
