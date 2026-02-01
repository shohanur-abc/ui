import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Zap, TrendingUp, TrendingDown, ArrowRight, Clock } from 'lucide-react';

interface RealTimeStatProps {
	label: string;
	value: string;
	trend: 'up' | 'down' | 'stable';
	change: string;
}

interface ActivityStatProps {
	action: string;
	location: string;
	time: string;
}

const RealTimeStat = ({ label, value, trend, change }: RealTimeStatProps) => (
	<div className="text-center">
		<p className="text-3xl font-bold">{value}</p>
		<p className="text-sm text-muted-foreground">{label}</p>
		<Badge
			variant={
				trend === 'up'
					? 'default'
					: trend === 'down'
						? 'destructive'
						: 'secondary'
			}
			className="mt-2"
		>
			{trend === 'up' && <TrendingUp className="mr-1 size-3" />}
			{trend === 'down' && <TrendingDown className="mr-1 size-3" />}
			{change}
		</Badge>
	</div>
);

const ActivityItem = ({ action, location, time }: ActivityStatProps) => (
	<div className="flex items-center gap-3 py-2">
		<div className="size-2 rounded-full bg-accent animate-pulse" />
		<div className="flex-1">
			<p className="text-sm font-medium">{action}</p>
			<p className="text-xs text-muted-foreground">{location}</p>
		</div>
		<span className="text-xs text-muted-foreground">{time}</span>
	</div>
);

export default function Main() {
	const stats: RealTimeStatProps[] = [
		{ label: 'Active Users', value: '2,847', trend: 'up', change: '+124' },
		{ label: 'Carts Active', value: '847', trend: 'up', change: '+48' },
		{ label: 'Checkouts', value: '142', trend: 'stable', change: '—' },
		{ label: 'Orders/Min', value: '8.4', trend: 'down', change: '-0.8' },
	];

	const activities: ActivityStatProps[] = [
		{ action: 'Order placed', location: 'New York, USA', time: '2s ago' },
		{ action: 'Item added to cart', location: 'London, UK', time: '5s ago' },
		{ action: 'New registration', location: 'Toronto, CA', time: '12s ago' },
		{ action: 'Order placed', location: 'Sydney, AU', time: '18s ago' },
		{ action: 'Review submitted', location: 'Berlin, DE', time: '24s ago' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-3">
					<Card className="p-6 @lg:col-span-2">
						<div className="mb-6 flex items-center gap-2">
							<Zap className="size-5 text-primary" />
							<h3 className="font-semibold">Real-Time Dashboard</h3>
							<Badge variant="outline" className="ml-auto animate-pulse">
								Live
							</Badge>
						</div>
						<div className="grid grid-cols-2 gap-6 @md:grid-cols-4">
							{stats.map((stat, i) => (
								<RealTimeStat key={i} {...stat} />
							))}
						</div>
					</Card>
					<Card className="p-6">
						<div className="mb-4 flex items-center gap-2">
							<Clock className="size-4 text-primary" />
							<h3 className="font-semibold">Live Activity</h3>
						</div>
						<Separator className="mb-4" />
						<div className="space-y-1">
							{activities.map((activity, i) => (
								<ActivityItem key={i} {...activity} />
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
