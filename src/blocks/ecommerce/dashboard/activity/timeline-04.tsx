import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Package,
	Users,
	DollarSign,
	TrendingUp,
	TrendingDown,
	AlertTriangle,
	Star,
	type LucideIcon,
} from 'lucide-react';

interface ActivityGroup {
	date: string;
	items: {
		id: string;
		title: string;
		description: string;
		category: 'orders' | 'customers' | 'revenue' | 'inventory' | 'reviews';
		timestamp: string;
		trend?: 'up' | 'down';
		value?: string;
		isAlert?: boolean;
	}[];
}

interface GroupedTimelineProps {
	title: string;
	groups: ActivityGroup[];
}

const CategoryIcon = ({
	category,
	isAlert,
}: {
	category: ActivityGroup['items'][0]['category'];
	isAlert?: boolean;
}) => {
	if (isAlert) {
		return (
			<div className="flex size-9 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
				<AlertTriangle className="size-4" />
			</div>
		);
	}

	const config: Record<
		string,
		{ icon: LucideIcon; className: string }
	> = {
		orders: {
			icon: Package,
			className: 'bg-blue-500/20 text-blue-400',
		},
		customers: {
			icon: Users,
			className: 'bg-emerald-500/20 text-emerald-400',
		},
		revenue: {
			icon: DollarSign,
			className: 'bg-amber-500/20 text-amber-400',
		},
		inventory: {
			icon: Package,
			className: 'bg-purple-500/20 text-purple-400',
		},
		reviews: {
			icon: Star,
			className: 'bg-pink-500/20 text-pink-400',
		},
	};

	const { icon: Icon, className } = config[category];

	return (
		<div
			className={`flex size-9 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-4" />
		</div>
	);
};

const TrendIndicator = ({
	trend,
	value,
}: { trend?: 'up' | 'down'; value?: string }) => {
	if (!trend || !value) return null;

	const isUp = trend === 'up';

	return (
		<div
			className={`flex items-center gap-1 text-sm font-medium ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}
		>
			{isUp ? (
				<TrendingUp className="size-4" />
			) : (
				<TrendingDown className="size-4" />
			)}
			<span>{value}</span>
		</div>
	);
};

const ActivityItem = ({ item }: { item: ActivityGroup['items'][0] }) => (
	<div className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
		<CategoryIcon category={item.category} isAlert={item.isAlert} />
		<div className="flex flex-1 flex-col gap-1">
			<div className="flex items-start justify-between gap-2">
				<h4
					className={`font-medium leading-tight ${item.isAlert ? 'text-destructive' : 'text-foreground'}`}
				>
					{item.title}
				</h4>
				<TrendIndicator trend={item.trend} value={item.value} />
			</div>
			<p className="text-sm text-muted-foreground">{item.description}</p>
			<span className="text-xs text-muted-foreground/70">{item.timestamp}</span>
		</div>
	</div>
);

const DateGroup = ({ group }: { group: ActivityGroup }) => (
	<div className="relative">
		<div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2">
			<Badge
				variant="outline"
				className="border-primary/30 bg-primary/10 text-primary"
			>
				{group.date}
			</Badge>
		</div>
		<div className="space-y-1 pt-2">
			{group.items.map((item) => (
				<ActivityItem key={item.id} item={item} />
			))}
		</div>
	</div>
);

const GroupedTimeline = ({ title, groups }: GroupedTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="ghost" size="sm">
				Mark all read
			</Button>
		</CardHeader>
		<CardContent className="max-h-[500px] overflow-y-auto pt-4">
			<div className="space-y-6">
				{groups.map((group, index) => (
					<DateGroup key={index} group={group} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const activityGroups: ActivityGroup[] = [
		{
			date: 'Today',
			items: [
				{
					id: '1',
					title: 'New bulk order received',
					description: '150 units ordered by Enterprise Corp',
					category: 'orders',
					timestamp: '10 minutes ago',
					trend: 'up',
					value: '+$12,500',
				},
				{
					id: '2',
					title: 'Low stock alert',
					description: 'SKU-2847 "Wireless Headphones" below threshold',
					category: 'inventory',
					timestamp: '45 minutes ago',
					isAlert: true,
				},
				{
					id: '3',
					title: '5-star review received',
					description: 'Customer praised fast shipping and product quality',
					category: 'reviews',
					timestamp: '2 hours ago',
				},
			],
		},
		{
			date: 'Yesterday',
			items: [
				{
					id: '4',
					title: 'Revenue milestone reached',
					description: 'Monthly target of $100k achieved 5 days early',
					category: 'revenue',
					timestamp: '3:45 PM',
					trend: 'up',
					value: '+15%',
				},
				{
					id: '5',
					title: 'New customer segment identified',
					description: '23% increase in 25-34 age demographic',
					category: 'customers',
					timestamp: '11:30 AM',
					trend: 'up',
					value: '+23%',
				},
			],
		},
		{
			date: 'March 14, 2024',
			items: [
				{
					id: '6',
					title: 'Order cancellation spike',
					description: '8 orders cancelled due to shipping delays',
					category: 'orders',
					timestamp: '5:00 PM',
					trend: 'down',
					value: '-$2,340',
					isAlert: true,
				},
				{
					id: '7',
					title: 'Inventory restocked',
					description: '500 units of top-selling items received',
					category: 'inventory',
					timestamp: '9:00 AM',
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<GroupedTimeline
					title="Activity Timeline"
					groups={activityGroups}
				/>
			</div>
		</section>
	);
}
