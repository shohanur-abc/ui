import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Truck, Package, XCircle, RotateCcw } from 'lucide-react';

interface StatusSummaryProps {
	statuses: {
		status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
		count: number;
		percentage: number;
		value: string;
	}[];
	total: { orders: number; value: string };
}

const statusConfig = {
	pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-500', label: 'Pending' },
	processing: { icon: Package, color: 'text-blue-500', bg: 'bg-blue-500', label: 'Processing' },
	shipped: { icon: Truck, color: 'text-primary', bg: 'bg-primary', label: 'Shipped' },
	delivered: { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent', label: 'Delivered' },
	cancelled: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive', label: 'Cancelled' },
	returned: { icon: RotateCcw, color: 'text-purple-500', bg: 'bg-purple-500', label: 'Returned' },
};

const StatusRow = ({ item }: { item: StatusSummaryProps['statuses'][0] }) => {
	const config = statusConfig[item.status];
	const Icon = config.icon;

	return (
		<div className="flex items-center gap-4">
			<div className={`size-10 rounded-lg bg-opacity-10 flex items-center justify-center ${config.color}`} style={{ backgroundColor: `color-mix(in srgb, currentColor 10%, transparent)` }}>
				<Icon className="size-5" />
			</div>
			<div className="flex-1">
				<div className="flex items-center justify-between mb-1">
					<span className="font-medium">{config.label}</span>
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">{item.count} orders</span>
						<Badge variant="secondary" className="text-xs">{item.value}</Badge>
					</div>
				</div>
				<Progress value={item.percentage} className={`h-2 [&>div]:${config.bg}`} />
			</div>
		</div>
	);
};

const StatusSummary = ({ statuses, total }: StatusSummaryProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<CardTitle className="text-lg">Order Status Breakdown</CardTitle>
				<div className="text-right">
					<p className="text-2xl font-bold">{total.orders}</p>
					<p className="text-sm text-muted-foreground">{total.value} total</p>
				</div>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{statuses.map((item, i) => (
				<StatusRow key={i} item={item} />
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const statuses = [
		{ status: 'delivered' as const, count: 847, percentage: 68, value: '$67,234' },
		{ status: 'shipped' as const, count: 156, percentage: 12, value: '$12,890' },
		{ status: 'processing' as const, count: 124, percentage: 10, value: '$9,876' },
		{ status: 'pending' as const, count: 87, percentage: 7, value: '$6,543' },
		{ status: 'returned' as const, count: 25, percentage: 2, value: '$2,100' },
		{ status: 'cancelled' as const, count: 8, percentage: 1, value: '$789' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<StatusSummary statuses={statuses} total={{ orders: 1247, value: '$99,432' }} />
			</div>
		</section>
	);
}
