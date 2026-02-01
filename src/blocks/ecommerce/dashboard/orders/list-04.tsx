import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Calendar,
	DollarSign,
	ShoppingBag,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
	Filter,
} from 'lucide-react';

interface DailyOrder {
	date: string;
	dayName: string;
	orderCount: number;
	revenue: string;
	avgOrderValue: string;
	trend: 'up' | 'down' | 'neutral';
	trendPercent: string;
	topProduct: string;
}

interface DailyOrderRowProps {
	day: DailyOrder;
	maxOrders: number;
	labels: { orders: string; revenue: string; avg: string; topProduct: string };
}

const TrendIndicator = ({
	trend,
	percent,
}: {
	trend: DailyOrder['trend'];
	percent: string;
}) => {
	if (trend === 'neutral')
		return <span className="text-muted-foreground">—</span>;
	const isUp = trend === 'up';
	return (
		<span
			className={`flex items-center gap-1 text-sm ${isUp ? 'text-accent' : 'text-destructive'}`}
		>
			{isUp ? (
				<TrendingUp className="size-4" />
			) : (
				<TrendingDown className="size-4" />
			)}
			{percent}
		</span>
	);
};

const DailyOrderRow = ({ day, maxOrders, labels }: DailyOrderRowProps) => (
	<div className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors rounded-lg group">
		<div className="min-w-[100px]">
			<p className="font-semibold">{day.dayName}</p>
			<p className="text-xs text-muted-foreground">{day.date}</p>
		</div>

		<div className="flex-1 space-y-2">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-1.5">
					<ShoppingBag className="size-4 text-primary" />
					<span className="font-semibold">{day.orderCount}</span>
					<span className="text-sm text-muted-foreground">{labels.orders}</span>
				</div>
				<Separator orientation="vertical" className="h-4" />
				<div className="flex items-center gap-1.5">
					<DollarSign className="size-4 text-accent" />
					<span className="font-semibold">{day.revenue}</span>
				</div>
				<Separator orientation="vertical" className="h-4" />
				<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
					<span>
						{labels.avg}: {day.avgOrderValue}
					</span>
				</div>
			</div>
			<Progress value={(day.orderCount / maxOrders) * 100} className="h-1.5" />
		</div>

		<TrendIndicator trend={day.trend} percent={day.trendPercent} />

		<Badge variant="secondary" className="text-xs max-w-[120px] truncate">
			{day.topProduct}
		</Badge>

		<Button
			variant="ghost"
			size="icon-sm"
			className="opacity-0 group-hover:opacity-100 transition-opacity"
		>
			<ArrowUpRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const labels = {
		orders: 'orders',
		revenue: 'Revenue',
		avg: 'Avg',
		topProduct: 'Top',
	};

	const days: DailyOrder[] = [
		{
			date: 'Jan 30, 2024',
			dayName: 'Tuesday',
			orderCount: 156,
			revenue: '$12,450',
			avgOrderValue: '$79.81',
			trend: 'up',
			trendPercent: '+12%',
			topProduct: 'Wireless Headphones',
		},
		{
			date: 'Jan 29, 2024',
			dayName: 'Monday',
			orderCount: 142,
			revenue: '$10,820',
			avgOrderValue: '$76.20',
			trend: 'up',
			trendPercent: '+8%',
			topProduct: 'USB-C Hub',
		},
		{
			date: 'Jan 28, 2024',
			dayName: 'Sunday',
			orderCount: 98,
			revenue: '$7,350',
			avgOrderValue: '$75.00',
			trend: 'down',
			trendPercent: '-15%',
			topProduct: 'Phone Case',
		},
		{
			date: 'Jan 27, 2024',
			dayName: 'Saturday',
			orderCount: 187,
			revenue: '$15,230',
			avgOrderValue: '$81.44',
			trend: 'up',
			trendPercent: '+22%',
			topProduct: 'Smart Watch',
		},
		{
			date: 'Jan 26, 2024',
			dayName: 'Friday',
			orderCount: 165,
			revenue: '$13,120',
			avgOrderValue: '$79.52',
			trend: 'up',
			trendPercent: '+5%',
			topProduct: 'Laptop Stand',
		},
		{
			date: 'Jan 25, 2024',
			dayName: 'Thursday',
			orderCount: 128,
			revenue: '$9,850',
			avgOrderValue: '$76.95',
			trend: 'neutral',
			trendPercent: '0%',
			topProduct: 'Keyboard',
		},
	];

	const maxOrders = Math.max(...days.map((d) => d.orderCount));

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
							<Calendar className="size-5 text-primary" />
						</div>
						<div>
							<h2 className="text-lg font-semibold">Daily Orders</h2>
							<p className="text-sm text-muted-foreground">
								Last 7 days overview
							</p>
						</div>
					</div>
					<Button variant="outline" size="sm" className="gap-1.5">
						<Filter className="size-4" />
						Filter
					</Button>
				</div>
				<div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm divide-y divide-border/50">
					{days.map((day) => (
						<DailyOrderRow
							key={day.date}
							day={day}
							maxOrders={maxOrders}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
