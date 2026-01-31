import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Activity,
	ShoppingCart,
	CreditCard,
	Eye,
	Heart,
	MessageSquare,
	Package,
	TrendingUp,
	Users,
	Pause,
	Play,
	type LucideIcon,
} from 'lucide-react';

interface LiveActivity {
	id: string;
	type: 'purchase' | 'view' | 'cart' | 'wishlist' | 'review' | 'order';
	user: {
		name: string;
		avatar?: string;
		initials: string;
		location?: string;
	};
	product?: {
		name: string;
		price: string;
	};
	message: string;
	timestamp: string;
}

interface LiveStreamProps {
	title: string;
	activities: LiveActivity[];
	stats: {
		activeVisitors: number;
		todayRevenue: string;
		ordersToday: number;
	};
	isLive: boolean;
}

const ActivityIcon = ({ type }: { type: LiveActivity['type'] }) => {
	const config: Record<
		LiveActivity['type'],
		{ icon: LucideIcon; className: string }
	> = {
		purchase: { icon: CreditCard, className: 'bg-emerald-500/20 text-emerald-400' },
		view: { icon: Eye, className: 'bg-blue-500/20 text-blue-400' },
		cart: { icon: ShoppingCart, className: 'bg-purple-500/20 text-purple-400' },
		wishlist: { icon: Heart, className: 'bg-pink-500/20 text-pink-400' },
		review: { icon: MessageSquare, className: 'bg-amber-500/20 text-amber-400' },
		order: { icon: Package, className: 'bg-primary/20 text-primary' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-4" />
		</div>
	);
};

const LiveIndicator = ({ isLive }: { isLive: boolean }) => (
	<div className="flex items-center gap-2">
		<div className="relative">
			<div
				className={`size-2 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-muted-foreground'}`}
			/>
			{isLive && (
				<div className="absolute inset-0 size-2 rounded-full bg-emerald-400 animate-ping" />
			)}
		</div>
		<span className={`text-xs font-medium ${isLive ? 'text-emerald-400' : 'text-muted-foreground'}`}>
			{isLive ? 'LIVE' : 'PAUSED'}
		</span>
	</div>
);

const ActivityItem = ({ activity }: { activity: LiveActivity }) => (
	<div className="group flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-muted/50 animate-in slide-in-from-left-5 duration-300">
		<ActivityIcon type={activity.type} />
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				<Avatar className="size-5">
					<AvatarImage src={activity.user.avatar} alt={activity.user.name} />
					<AvatarFallback className="text-[9px] bg-secondary">
						{activity.user.initials}
					</AvatarFallback>
				</Avatar>
				<span className="text-sm font-medium text-foreground truncate">
					{activity.user.name}
				</span>
				{activity.user.location && (
					<span className="text-xs text-muted-foreground">
						from {activity.user.location}
					</span>
				)}
			</div>
			<p className="text-sm text-muted-foreground">
				{activity.message}
				{activity.product && (
					<span className="text-foreground font-medium">
						{' '}
						{activity.product.name}
					</span>
				)}
			</p>
			{activity.product?.price && (
				<Badge variant="outline" className="mt-1 text-xs">
					{activity.product.price}
				</Badge>
			)}
		</div>
		<span className="text-xs text-muted-foreground shrink-0">{activity.timestamp}</span>
	</div>
);

const StatsBar = ({
	activeVisitors,
	todayRevenue,
	ordersToday,
}: LiveStreamProps['stats']) => (
	<div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex items-center gap-2">
			<Users className="size-4 text-emerald-400" />
			<div>
				<p className="text-lg font-bold text-foreground">{activeVisitors}</p>
				<p className="text-xs text-muted-foreground">Active Now</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<TrendingUp className="size-4 text-primary" />
			<div>
				<p className="text-lg font-bold text-foreground">{todayRevenue}</p>
				<p className="text-xs text-muted-foreground">Today</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Package className="size-4 text-blue-400" />
			<div>
				<p className="text-lg font-bold text-foreground">{ordersToday}</p>
				<p className="text-xs text-muted-foreground">Orders</p>
			</div>
		</div>
	</div>
);

const LiveStream = ({
	title,
	activities,
	stats,
	isLive,
}: LiveStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-3">
				<Activity className="size-5" />
				{title}
				<LiveIndicator isLive={isLive} />
			</CardTitle>
			<Button variant="outline" size="sm" className="gap-2">
				{isLive ? (
					<>
						<Pause className="size-4" />
						Pause
					</>
				) : (
					<>
						<Play className="size-4" />
						Resume
					</>
				)}
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<StatsBar
				activeVisitors={stats.activeVisitors}
				todayRevenue={stats.todayRevenue}
				ordersToday={stats.ordersToday}
			/>
			<div className="space-y-1 max-h-[400px] overflow-y-auto">
				{activities.map((activity) => (
					<ActivityItem key={activity.id} activity={activity} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const liveActivities: LiveActivity[] = [
		{
			id: '1',
			type: 'purchase',
			user: { name: 'Sarah C.', initials: 'SC', location: 'California' },
			product: { name: 'Premium Headphones', price: '$249.99' },
			message: 'just purchased',
			timestamp: 'now',
		},
		{
			id: '2',
			type: 'cart',
			user: { name: 'Mike J.', initials: 'MJ', location: 'New York' },
			product: { name: 'Smart Watch Pro', price: '$399.00' },
			message: 'added to cart',
			timestamp: '10s ago',
		},
		{
			id: '3',
			type: 'view',
			user: { name: 'Emily D.', initials: 'ED', location: 'Texas' },
			product: { name: '4K Ultra HD Monitor' },
			message: 'is viewing',
			timestamp: '25s ago',
		},
		{
			id: '4',
			type: 'wishlist',
			user: { name: 'Alex K.', initials: 'AK', location: 'Florida' },
			product: { name: 'Mechanical Keyboard' },
			message: 'added to wishlist',
			timestamp: '1m ago',
		},
		{
			id: '5',
			type: 'review',
			user: { name: 'Jordan L.', initials: 'JL', location: 'Washington' },
			product: { name: 'Wireless Earbuds' },
			message: 'left a 5-star review on',
			timestamp: '2m ago',
		},
		{
			id: '6',
			type: 'order',
			user: { name: 'Lisa A.', initials: 'LA', location: 'Oregon' },
			product: { name: 'Smart Home Bundle', price: '$899.00' },
			message: 'order shipped for',
			timestamp: '3m ago',
		},
		{
			id: '7',
			type: 'purchase',
			user: { name: 'David K.', initials: 'DK', location: 'Colorado' },
			product: { name: 'Gaming Mouse', price: '$79.99' },
			message: 'just purchased',
			timestamp: '4m ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<LiveStream
					title="Live Activity"
					activities={liveActivities}
					stats={{
						activeVisitors: 847,
						todayRevenue: '$24,567',
						ordersToday: 127,
					}}
					isLive={true}
				/>
			</div>
		</section>
	);
}
