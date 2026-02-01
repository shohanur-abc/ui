import {
	Activity,
	ArrowDownRight,
	ArrowUpRight,
	Calendar,
	Clock,
	CreditCard,
	LogIn,
	LogOut,
	Mail,
	MoreHorizontal,
	MousePointerClick,
	Package,
	ShoppingCart,
	Smartphone,
	User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActivityEvent {
	type:
		| 'login'
		| 'logout'
		| 'purchase'
		| 'cart'
		| 'browse'
		| 'profile'
		| 'email';
	description: string;
	timestamp: string;
	metadata?: {
		value?: string;
		items?: number;
		device?: string;
	};
}

interface ActivityCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	isOnline: boolean;
	lastActivity: ActivityEvent;
	recentEvents: ActivityEvent[];
	sessionCount: number;
	deviceType: 'desktop' | 'mobile' | 'tablet';
}

const EventIcon = ({ type }: { type: ActivityEvent['type'] }) => {
	const icons: Record<string, React.ElementType> = {
		login: LogIn,
		logout: LogOut,
		purchase: CreditCard,
		cart: ShoppingCart,
		browse: MousePointerClick,
		profile: User,
		email: Mail,
	};
	const Icon = icons[type] || Activity;
	return <Icon className="size-4" />;
};

const EventBadge = ({ type }: { type: ActivityEvent['type'] }) => {
	const config: Record<string, { label: string; className: string }> = {
		login: { label: 'Login', className: 'bg-blue-500/10 text-blue-500' },
		logout: { label: 'Logout', className: 'bg-slate-500/10 text-slate-400' },
		purchase: {
			label: 'Purchase',
			className: 'bg-emerald-500/10 text-emerald-500',
		},
		cart: { label: 'Cart', className: 'bg-amber-500/10 text-amber-500' },
		browse: { label: 'Browse', className: 'bg-violet-500/10 text-violet-500' },
		profile: { label: 'Profile', className: 'bg-cyan-500/10 text-cyan-500' },
		email: { label: 'Email', className: 'bg-pink-500/10 text-pink-500' },
	};
	const { label, className } = config[type];
	return (
		<Badge variant="outline" className={`${className} gap-1`}>
			<EventIcon type={type} />
			{label}
		</Badge>
	);
};

const OnlineIndicator = ({ isOnline }: { isOnline: boolean }) => (
	<span
		className={`size-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}
	/>
);

const DeviceBadge = ({
	device,
}: {
	device: ActivityCustomer['deviceType'];
}) => {
	const labels: Record<string, string> = {
		desktop: '🖥️ Desktop',
		mobile: '📱 Mobile',
		tablet: '📱 Tablet',
	};
	return (
		<Badge variant="secondary" className="text-xs">
			{labels[device]}
		</Badge>
	);
};

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-primary/10 text-primary rounded-lg p-2.5">
			<Activity className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const ActivityListItem = ({ customer }: { customer: ActivityCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<div className="relative">
				<Avatar className="size-11">
					<AvatarImage src={customer.avatar} alt={customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary">
						{customer.initials}
					</AvatarFallback>
				</Avatar>
				<div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-background p-0.5">
					<OnlineIndicator isOnline={customer.isOnline} />
				</div>
			</div>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{customer.name}</p>
					{customer.isOnline && (
						<span className="text-emerald-500 text-xs font-medium">Online</span>
					)}
				</div>
				<p className="text-muted-foreground text-sm truncate">
					{customer.email}
				</p>
			</div>
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				<EventBadge type={customer.lastActivity.type} />
				<span className="text-xs text-muted-foreground">
					{customer.lastActivity.timestamp}
				</span>
			</div>
			<p className="text-sm truncate">{customer.lastActivity.description}</p>
			{customer.lastActivity.metadata?.value && (
				<p className="text-primary text-sm font-medium">
					{customer.lastActivity.metadata.value}
				</p>
			)}
		</div>
		<div className="hidden @xl:flex flex-col gap-1 min-w-[140px]">
			<p className="text-muted-foreground text-xs">Recent Activity</p>
			<div className="flex items-center gap-1">
				{customer.recentEvents.slice(0, 4).map((event, index) => (
					<div
						key={index}
						className="size-6 rounded bg-muted flex items-center justify-center"
						title={`${event.type}: ${event.description}`}
					>
						<EventIcon type={event.type} />
					</div>
				))}
			</div>
		</div>
		<div className="flex items-center gap-4">
			<DeviceBadge device={customer.deviceType} />
			<div className="hidden @lg:block text-center min-w-[60px]">
				<p className="font-semibold">{customer.sessionCount}</p>
				<p className="text-muted-foreground text-xs">Sessions</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View full activity</DropdownMenuItem>
					<DropdownMenuItem>View session recordings</DropdownMenuItem>
					<DropdownMenuItem>Send message</DropdownMenuItem>
					<DropdownMenuItem>View profile</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

export default function Main() {
	const customers: ActivityCustomer[] = [
		{
			id: '1',
			name: 'Wesley Adams',
			email: 'wesley.a@email.com',
			initials: 'WA',
			isOnline: true,
			lastActivity: {
				type: 'purchase',
				description: 'Completed order #ORD-8923',
				timestamp: '2 min ago',
				metadata: { value: '$234.50', items: 3 },
			},
			recentEvents: [
				{
					type: 'purchase',
					description: 'Completed order',
					timestamp: '2 min ago',
				},
				{
					type: 'cart',
					description: 'Added items to cart',
					timestamp: '5 min ago',
				},
				{
					type: 'browse',
					description: 'Viewed products',
					timestamp: '8 min ago',
				},
				{ type: 'login', description: 'Logged in', timestamp: '10 min ago' },
			],
			sessionCount: 45,
			deviceType: 'desktop',
		},
		{
			id: '2',
			name: 'Xena Foster',
			email: 'xena.f@email.com',
			initials: 'XF',
			isOnline: true,
			lastActivity: {
				type: 'browse',
				description: 'Viewing Electronics > Gaming',
				timestamp: '1 min ago',
			},
			recentEvents: [
				{
					type: 'browse',
					description: 'Viewing products',
					timestamp: '1 min ago',
				},
				{ type: 'cart', description: 'Added to cart', timestamp: '3 min ago' },
				{ type: 'login', description: 'Logged in', timestamp: '5 min ago' },
			],
			sessionCount: 23,
			deviceType: 'mobile',
		},
		{
			id: '3',
			name: 'Yuri Tanaka',
			email: 'yuri.t@email.com',
			initials: 'YT',
			isOnline: false,
			lastActivity: {
				type: 'logout',
				description: 'Session ended',
				timestamp: '1 hour ago',
			},
			recentEvents: [
				{ type: 'logout', description: 'Logged out', timestamp: '1 hour ago' },
				{
					type: 'profile',
					description: 'Updated profile',
					timestamp: '1 hour ago',
				},
				{
					type: 'browse',
					description: 'Viewed products',
					timestamp: '2 hours ago',
				},
				{ type: 'login', description: 'Logged in', timestamp: '2 hours ago' },
			],
			sessionCount: 67,
			deviceType: 'desktop',
		},
		{
			id: '4',
			name: 'Zara Mitchell',
			email: 'zara.m@email.com',
			initials: 'ZM',
			isOnline: true,
			lastActivity: {
				type: 'cart',
				description: 'Added "Wireless Headphones" to cart',
				timestamp: 'Just now',
				metadata: { items: 1 },
			},
			recentEvents: [
				{ type: 'cart', description: 'Added to cart', timestamp: 'Just now' },
				{
					type: 'browse',
					description: 'Viewed product page',
					timestamp: '1 min ago',
				},
				{
					type: 'browse',
					description: 'Searching products',
					timestamp: '2 min ago',
				},
				{ type: 'login', description: 'Logged in', timestamp: '3 min ago' },
			],
			sessionCount: 12,
			deviceType: 'tablet',
		},
		{
			id: '5',
			name: 'Aaron Brooks',
			email: 'aaron.b@email.com',
			initials: 'AB',
			isOnline: false,
			lastActivity: {
				type: 'email',
				description: 'Clicked promotional email link',
				timestamp: '3 hours ago',
			},
			recentEvents: [
				{ type: 'email', description: 'Email click', timestamp: '3 hours ago' },
				{
					type: 'browse',
					description: 'Viewed landing page',
					timestamp: '3 hours ago',
				},
			],
			sessionCount: 8,
			deviceType: 'mobile',
		},
		{
			id: '6',
			name: 'Bella Chen',
			email: 'bella.c@email.com',
			initials: 'BC',
			isOnline: true,
			lastActivity: {
				type: 'profile',
				description: 'Updated shipping address',
				timestamp: '5 min ago',
			},
			recentEvents: [
				{
					type: 'profile',
					description: 'Updated address',
					timestamp: '5 min ago',
				},
				{
					type: 'browse',
					description: 'Viewed order history',
					timestamp: '7 min ago',
				},
				{ type: 'login', description: 'Logged in', timestamp: '8 min ago' },
			],
			sessionCount: 34,
			deviceType: 'desktop',
		},
		{
			id: '7',
			name: 'Carlos Reyes',
			email: 'carlos.r@email.com',
			initials: 'CR',
			isOnline: false,
			lastActivity: {
				type: 'purchase',
				description: 'Completed order #ORD-8920',
				timestamp: '45 min ago',
				metadata: { value: '$89.99', items: 1 },
			},
			recentEvents: [
				{
					type: 'purchase',
					description: 'Completed order',
					timestamp: '45 min ago',
				},
				{
					type: 'cart',
					description: 'Checkout started',
					timestamp: '48 min ago',
				},
				{ type: 'cart', description: 'Added to cart', timestamp: '50 min ago' },
				{ type: 'login', description: 'Logged in', timestamp: '52 min ago' },
			],
			sessionCount: 56,
			deviceType: 'mobile',
		},
		{
			id: '8',
			name: 'Diana Lopez',
			email: 'diana.l@email.com',
			initials: 'DL',
			isOnline: true,
			lastActivity: {
				type: 'login',
				description: 'New session started from new device',
				timestamp: '30 sec ago',
			},
			recentEvents: [
				{ type: 'login', description: 'Logged in', timestamp: '30 sec ago' },
			],
			sessionCount: 89,
			deviceType: 'desktop',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Live Activity Feed"
					subtitle="Real-time customer activity stream"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<ActivityListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
