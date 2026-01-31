import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Users,
	UserPlus,
	UserMinus,
	UserCheck,
	Mail,
	ShoppingBag,
	Heart,
	type LucideIcon,
} from 'lucide-react';

interface CustomerEvent {
	id: string;
	type:
		| 'signup'
		| 'purchase'
		| 'wishlist'
		| 'subscription'
		| 'unsubscribe'
		| 'referral';
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
		isNew?: boolean;
	};
	details: string;
	value?: string;
	timestamp: string;
}

interface CustomerTimelineProps {
	title: string;
	description?: string;
	events: CustomerEvent[];
	totalNewCustomers: number;
	percentChange: number;
}

const EventIcon = ({ type }: { type: CustomerEvent['type'] }) => {
	const config: Record<
		CustomerEvent['type'],
		{ icon: LucideIcon; className: string }
	> = {
		signup: { icon: UserPlus, className: 'bg-emerald-500/20 text-emerald-400' },
		purchase: { icon: ShoppingBag, className: 'bg-blue-500/20 text-blue-400' },
		wishlist: { icon: Heart, className: 'bg-pink-500/20 text-pink-400' },
		subscription: { icon: Mail, className: 'bg-purple-500/20 text-purple-400' },
		unsubscribe: { icon: UserMinus, className: 'bg-rose-500/20 text-rose-400' },
		referral: { icon: UserCheck, className: 'bg-amber-500/20 text-amber-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-8 shrink-0 items-center justify-center rounded-full ${className}`}
		>
			<Icon className="size-4" />
		</div>
	);
};

const CustomerAvatar = ({
	customer,
}: { customer: CustomerEvent['customer'] }) => (
	<div className="relative">
		<Avatar className="size-10 ring-2 ring-background">
			<AvatarImage src={customer.avatar} alt={customer.name} />
			<AvatarFallback className="bg-primary/20 text-primary text-sm">
				{customer.initials}
			</AvatarFallback>
		</Avatar>
		{customer.isNew && (
			<span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
				N
			</span>
		)}
	</div>
);

const EventCard = ({ event }: { event: CustomerEvent }) => (
	<div className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
		<CustomerAvatar customer={event.customer} />
		<div className="flex flex-1 flex-col gap-1 min-w-0">
			<div className="flex items-center gap-2">
				<span className="font-medium text-foreground truncate">
					{event.customer.name}
				</span>
				<EventIcon type={event.type} />
			</div>
			<p className="text-sm text-muted-foreground">{event.details}</p>
			<div className="flex items-center gap-2 mt-1">
				<span className="text-xs text-muted-foreground/70">
					{event.timestamp}
				</span>
				{event.value && (
					<Badge
						variant="outline"
						className="text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
					>
						{event.value}
					</Badge>
				)}
			</div>
		</div>
	</div>
);

const StatsHeader = ({
	totalNewCustomers,
	percentChange,
}: {
	totalNewCustomers: number;
	percentChange: number;
}) => (
	<div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex size-12 items-center justify-center rounded-full bg-primary/20">
			<Users className="size-6 text-primary" />
		</div>
		<div className="flex flex-col">
			<span className="text-2xl font-bold text-foreground">
				{totalNewCustomers}
			</span>
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">New customers</span>
				<Badge
					variant="outline"
					className={`text-xs ${percentChange >= 0 ? 'border-emerald-500/30 text-emerald-400' : 'border-rose-500/30 text-rose-400'}`}
				>
					{percentChange >= 0 ? '+' : ''}
					{percentChange}%
				</Badge>
			</div>
		</div>
	</div>
);

const CustomerTimeline = ({
	title,
	description,
	events,
	totalNewCustomers,
	percentChange,
}: CustomerTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader>
			<div className="flex items-center justify-between">
				<div>
					<CardTitle className="text-lg font-semibold">{title}</CardTitle>
					{description && (
						<p className="text-sm text-muted-foreground mt-1">{description}</p>
					)}
				</div>
				<Button variant="outline" size="sm">
					View All
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<StatsHeader
				totalNewCustomers={totalNewCustomers}
				percentChange={percentChange}
			/>
			<ScrollArea className="h-[400px]">
				<div className="space-y-1">
					{events.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const customerEvents: CustomerEvent[] = [
		{
			id: '1',
			type: 'signup',
			customer: {
				name: 'Emma Thompson',
				email: 'emma@example.com',
				initials: 'ET',
				isNew: true,
			},
			details: 'Created new account via Google OAuth',
			timestamp: '2 min ago',
		},
		{
			id: '2',
			type: 'purchase',
			customer: {
				name: 'James Wilson',
				email: 'james@example.com',
				initials: 'JW',
			},
			details: 'Completed first purchase - Wireless Headphones',
			value: '$299.00',
			timestamp: '15 min ago',
		},
		{
			id: '3',
			type: 'referral',
			customer: {
				name: 'Sarah Martinez',
				email: 'sarah@example.com',
				initials: 'SM',
			},
			details: 'Referred 3 new customers this week',
			value: '+$45 credit',
			timestamp: '1 hour ago',
		},
		{
			id: '4',
			type: 'subscription',
			customer: {
				name: 'Michael Chen',
				email: 'michael@example.com',
				initials: 'MC',
				isNew: true,
			},
			details: 'Subscribed to newsletter and promotions',
			timestamp: '2 hours ago',
		},
		{
			id: '5',
			type: 'wishlist',
			customer: {
				name: 'Lisa Anderson',
				email: 'lisa@example.com',
				initials: 'LA',
			},
			details: 'Added 5 items to wishlist',
			timestamp: '3 hours ago',
		},
		{
			id: '6',
			type: 'purchase',
			customer: {
				name: 'David Kim',
				email: 'david@example.com',
				initials: 'DK',
			},
			details: 'Bulk order - 10 units of Smart Watch Pro',
			value: '$2,490.00',
			timestamp: '4 hours ago',
		},
		{
			id: '7',
			type: 'unsubscribe',
			customer: {
				name: 'Rachel Green',
				email: 'rachel@example.com',
				initials: 'RG',
			},
			details: 'Unsubscribed from promotional emails',
			timestamp: '5 hours ago',
		},
		{
			id: '8',
			type: 'signup',
			customer: {
				name: 'Alex Johnson',
				email: 'alex@example.com',
				initials: 'AJ',
				isNew: true,
			},
			details: 'Signed up during flash sale event',
			timestamp: '6 hours ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<CustomerTimeline
					title="Customer Activity"
					description="Real-time customer engagement tracking"
					events={customerEvents}
					totalNewCustomers={127}
					percentChange={12.5}
				/>
			</div>
		</section>
	);
}
