import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	ShoppingCart,
	DollarSign,
	Package,
	TrendingUp,
	TrendingDown,
	Clock,
	CheckCircle,
} from 'lucide-react';

interface OrderSummaryProps {
	stats: {
		label: string;
		value: string;
		change: string;
		trend: 'up' | 'down' | 'neutral';
		icon: 'orders' | 'revenue' | 'items' | 'time';
	}[];
	period: string;
}

const iconMap = {
	orders: ShoppingCart,
	revenue: DollarSign,
	items: Package,
	time: Clock,
};

const StatCard = ({ stat }: { stat: OrderSummaryProps['stats'][0] }) => {
	const Icon = iconMap[stat.icon];
	const TrendIcon =
		stat.trend === 'up'
			? TrendingUp
			: stat.trend === 'down'
				? TrendingDown
				: null;
	const trendColor =
		stat.trend === 'up'
			? 'text-accent'
			: stat.trend === 'down'
				? 'text-destructive'
				: 'text-muted-foreground';

	return (
		<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
			<CardContent className="p-4 @sm:p-6">
				<div className="flex items-start justify-between">
					<div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
						<Icon className="size-5 text-primary" />
					</div>
					{TrendIcon && (
						<Badge variant="outline" className={`gap-1 ${trendColor}`}>
							<TrendIcon className="size-3" />
							{stat.change}
						</Badge>
					)}
				</div>
				<div className="mt-4">
					<p className="text-sm text-muted-foreground">{stat.label}</p>
					<p className="text-2xl @sm:text-3xl font-bold mt-1">{stat.value}</p>
				</div>
			</CardContent>
		</Card>
	);
};

const OrderSummary = ({ stats, period }: OrderSummaryProps) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<h2 className="text-lg font-semibold">Order Summary</h2>
			<Badge variant="secondary">{period}</Badge>
		</div>
		<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
			{stats.map((stat, i) => (
				<StatCard key={i} stat={stat} />
			))}
		</div>
	</div>
);

export default function Main() {
	const stats = [
		{
			label: 'Total Orders',
			value: '1,247',
			change: '+12.5%',
			trend: 'up' as const,
			icon: 'orders' as const,
		},
		{
			label: 'Revenue',
			value: '$89,432',
			change: '+8.2%',
			trend: 'up' as const,
			icon: 'revenue' as const,
		},
		{
			label: 'Items Sold',
			value: '3,891',
			change: '-2.1%',
			trend: 'down' as const,
			icon: 'items' as const,
		},
		{
			label: 'Avg. Fulfillment',
			value: '2.4 days',
			change: '-15%',
			trend: 'up' as const,
			icon: 'time' as const,
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<OrderSummary stats={stats} period="Last 30 days" />
			</div>
		</section>
	);
}
