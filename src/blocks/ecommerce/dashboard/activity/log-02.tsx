import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	User,
	LogIn,
	LogOut,
	ShoppingCart,
	CreditCard,
	Heart,
	Search,
	Eye,
	MessageSquare,
	Settings,
	Download,
	Filter,
	type LucideIcon,
} from 'lucide-react';

interface UserActivityLog {
	id: string;
	type:
		| 'login'
		| 'logout'
		| 'purchase'
		| 'cart'
		| 'wishlist'
		| 'search'
		| 'view'
		| 'review'
		| 'settings';
	user: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	action: string;
	details?: string;
	metadata?: Record<string, string>;
	timestamp: string;
	ipAddress?: string;
}

interface UserLogProps {
	title: string;
	logs: UserActivityLog[];
	activeUsers: number;
}

const ActivityIcon = ({ type }: { type: UserActivityLog['type'] }) => {
	const config: Record<
		UserActivityLog['type'],
		{ icon: LucideIcon; className: string }
	> = {
		login: { icon: LogIn, className: 'bg-emerald-500/20 text-emerald-400' },
		logout: { icon: LogOut, className: 'bg-muted text-muted-foreground' },
		purchase: { icon: CreditCard, className: 'bg-primary/20 text-primary' },
		cart: { icon: ShoppingCart, className: 'bg-blue-500/20 text-blue-400' },
		wishlist: { icon: Heart, className: 'bg-pink-500/20 text-pink-400' },
		search: { icon: Search, className: 'bg-amber-500/20 text-amber-400' },
		view: { icon: Eye, className: 'bg-purple-500/20 text-purple-400' },
		review: { icon: MessageSquare, className: 'bg-teal-500/20 text-teal-400' },
		settings: { icon: Settings, className: 'bg-zinc-500/20 text-zinc-400' },
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

const LogEntry = ({ log }: { log: UserActivityLog }) => (
	<div className="group flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50 transition-all hover:bg-muted/50 hover:border-border">
		<ActivityIcon type={log.type} />
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				<Avatar className="size-5">
					<AvatarImage src={log.user.avatar} alt={log.user.name} />
					<AvatarFallback className="text-[9px] bg-secondary">
						{log.user.initials}
					</AvatarFallback>
				</Avatar>
				<span className="font-medium text-sm text-foreground truncate">
					{log.user.name}
				</span>
				<span className="text-xs text-muted-foreground">•</span>
				<span className="text-xs text-muted-foreground">{log.timestamp}</span>
			</div>
			<p className="text-sm text-muted-foreground">
				{log.action}
				{log.details && (
					<span className="text-foreground font-medium"> {log.details}</span>
				)}
			</p>
			{log.metadata && (
				<div className="flex flex-wrap gap-1.5 mt-2">
					{Object.entries(log.metadata).map(([key, value]) => (
						<Badge
							key={key}
							variant="outline"
							className="text-xs bg-muted/50"
						>
							{key}: {value}
						</Badge>
					))}
				</div>
			)}
			{log.ipAddress && (
				<p className="text-xs text-muted-foreground/70 mt-1">
					IP: {log.ipAddress}
				</p>
			)}
		</div>
	</div>
);

const ActiveUsersIndicator = ({ count }: { count: number }) => (
	<div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
		<div className="relative">
			<User className="size-5 text-emerald-400" />
			<div className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-400 animate-pulse" />
		</div>
		<div>
			<p className="text-sm text-muted-foreground">Active Now</p>
			<p className="text-xl font-bold text-emerald-400">{count} users</p>
		</div>
	</div>
);

const UserLogViewer = ({ title, logs, activeUsers }: UserLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<User className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<Filter className="size-4" />
					Filter
				</Button>
				<Button variant="outline" size="sm" className="gap-1">
					<Download className="size-4" />
					Export
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<ActiveUsersIndicator count={activeUsers} />
			<ScrollArea className="h-[420px]">
				<div className="space-y-2 pr-4">
					{logs.map((log) => (
						<LogEntry key={log.id} log={log} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const userLogs: UserActivityLog[] = [
		{
			id: '1',
			type: 'purchase',
			user: { name: 'Sarah Chen', email: 'sarah@email.com', initials: 'SC' },
			action: 'Completed purchase',
			details: 'Order #ORD-2024-0892',
			metadata: { amount: '$149.99', items: '3' },
			timestamp: '2 min ago',
			ipAddress: '192.168.1.45',
		},
		{
			id: '2',
			type: 'login',
			user: { name: 'Mike Johnson', email: 'mike@email.com', initials: 'MJ' },
			action: 'Logged in',
			details: 'via Google OAuth',
			timestamp: '5 min ago',
			ipAddress: '10.0.0.23',
		},
		{
			id: '3',
			type: 'cart',
			user: { name: 'Emily Davis', email: 'emily@email.com', initials: 'ED' },
			action: 'Added to cart',
			details: 'Premium Wireless Headphones',
			metadata: { qty: '1', price: '$299.00' },
			timestamp: '8 min ago',
		},
		{
			id: '4',
			type: 'search',
			user: { name: 'Alex Kim', email: 'alex@email.com', initials: 'AK' },
			action: 'Searched for',
			details: '"wireless earbuds"',
			metadata: { results: '24' },
			timestamp: '12 min ago',
		},
		{
			id: '5',
			type: 'wishlist',
			user: { name: 'Jordan Lee', email: 'jordan@email.com', initials: 'JL' },
			action: 'Added to wishlist',
			details: 'Smart Home Bundle',
			timestamp: '15 min ago',
		},
		{
			id: '6',
			type: 'view',
			user: { name: 'Lisa Anderson', email: 'lisa@email.com', initials: 'LA' },
			action: 'Viewed product',
			details: '4K Ultra HD Monitor',
			timestamp: '18 min ago',
		},
		{
			id: '7',
			type: 'review',
			user: { name: 'David Kim', email: 'david@email.com', initials: 'DK' },
			action: 'Left review',
			details: 'Mechanical Gaming Keyboard',
			metadata: { rating: '5 stars' },
			timestamp: '22 min ago',
		},
		{
			id: '8',
			type: 'settings',
			user: { name: 'Nina Patel', email: 'nina@email.com', initials: 'NP' },
			action: 'Updated profile settings',
			timestamp: '30 min ago',
		},
		{
			id: '9',
			type: 'logout',
			user: { name: 'Tom Wilson', email: 'tom@email.com', initials: 'TW' },
			action: 'Logged out',
			timestamp: '35 min ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<UserLogViewer
					title="User Activity Log"
					logs={userLogs}
					activeUsers={127}
				/>
			</div>
		</section>
	);
}
