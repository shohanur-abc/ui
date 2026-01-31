import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Crown, TrendingUp, ShoppingBag, DollarSign, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerSummaryProps {
	overview: {
		total: number;
		new: number;
		returning: number;
		avgLTV: string;
	};
	topCustomers: {
		name: string;
		initials: string;
		orders: number;
		spent: string;
		tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	}[];
	segments: {
		segment: string;
		count: number;
		percentage: number;
		revenue: string;
	}[];
}

const tierColors = {
	bronze: 'bg-orange-100 text-orange-700',
	silver: 'bg-gray-100 text-gray-700',
	gold: 'bg-yellow-100 text-yellow-700',
	platinum: 'bg-purple-100 text-purple-700',
};

const CustomerSummary = ({ overview, topCustomers, segments }: CustomerSummaryProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<CardTitle className="text-lg">Customer Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-6">
			<div className="grid grid-cols-4 gap-3">
				<div className="p-4 rounded-xl bg-muted/20 text-center">
					<Users className="size-6 text-primary mx-auto mb-2" />
					<p className="text-2xl font-bold">{overview.total}</p>
					<p className="text-xs text-muted-foreground">Total Customers</p>
				</div>
				<div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-center">
					<TrendingUp className="size-6 text-accent mx-auto mb-2" />
					<p className="text-2xl font-bold text-accent">{overview.new}</p>
					<p className="text-xs text-muted-foreground">New This Month</p>
				</div>
				<div className="p-4 rounded-xl bg-muted/20 text-center">
					<ShoppingBag className="size-6 text-blue-500 mx-auto mb-2" />
					<p className="text-2xl font-bold">{overview.returning}</p>
					<p className="text-xs text-muted-foreground">Returning</p>
				</div>
				<div className="p-4 rounded-xl bg-muted/20 text-center">
					<DollarSign className="size-6 text-primary mx-auto mb-2" />
					<p className="text-2xl font-bold">{overview.avgLTV}</p>
					<p className="text-xs text-muted-foreground">Avg LTV</p>
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between mb-3">
					<p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
						<Crown className="size-4 text-yellow-500" />
						Top Customers
					</p>
					<Button variant="ghost" size="sm" className="text-xs gap-1">
						View All <ArrowRight className="size-3" />
					</Button>
				</div>
				<div className="space-y-2">
					{topCustomers.map((customer, i) => (
						<div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
							<span className="text-sm font-medium text-muted-foreground w-4">{i + 1}</span>
							<Avatar className="size-9">
								<AvatarFallback className="bg-primary/10 text-primary text-sm">{customer.initials}</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<p className="font-medium">{customer.name}</p>
								<p className="text-xs text-muted-foreground">{customer.orders} orders</p>
							</div>
							<Badge className={`${tierColors[customer.tier]} capitalize`}>{customer.tier}</Badge>
							<p className="font-semibold">{customer.spent}</p>
						</div>
					))}
				</div>
			</div>

			<div>
				<p className="text-sm font-semibold text-muted-foreground mb-3">Customer Segments</p>
				<div className="space-y-3">
					{segments.map((segment, i) => (
						<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
							<div>
								<p className="font-medium">{segment.segment}</p>
								<p className="text-xs text-muted-foreground">{segment.count} customers ({segment.percentage}%)</p>
							</div>
							<div className="text-right">
								<p className="font-semibold">{segment.revenue}</p>
								<p className="text-xs text-muted-foreground">Revenue</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const overview = { total: 4892, new: 347, returning: 892, avgLTV: '$487' };

	const topCustomers = [
		{ name: 'Sarah Johnson', initials: 'SJ', orders: 47, spent: '$4,892', tier: 'platinum' as const },
		{ name: 'Michael Chen', initials: 'MC', orders: 38, spent: '$3,654', tier: 'gold' as const },
		{ name: 'Emily Davis', initials: 'ED', orders: 31, spent: '$2,987', tier: 'gold' as const },
		{ name: 'James Wilson', initials: 'JW', orders: 28, spent: '$2,456', tier: 'silver' as const },
	];

	const segments = [
		{ segment: 'VIP Customers', count: 234, percentage: 4.8, revenue: '$45,678' },
		{ segment: 'Regular Buyers', count: 1456, percentage: 29.8, revenue: '$67,890' },
		{ segment: 'Occasional', count: 2102, percentage: 43.0, revenue: '$34,567' },
		{ segment: 'One-time', count: 1100, percentage: 22.4, revenue: '$12,345' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<CustomerSummary overview={overview} topCustomers={topCustomers} segments={segments} />
			</div>
		</section>
	);
}
