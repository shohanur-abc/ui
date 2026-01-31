import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Activity,
	MousePointer,
	Clock,
	Eye,
	ShoppingCart,
	CreditCard,
	ChevronRight,
	type LucideIcon,
} from 'lucide-react';

interface UserSession {
	id: string;
	user: {
		name?: string;
		email?: string;
		avatar?: string;
		initials: string;
		isAnonymous?: boolean;
	};
	currentPage: string;
	actions: {
		type: 'view' | 'click' | 'cart' | 'purchase';
		label: string;
		timestamp: string;
	}[];
	sessionDuration: string;
	pageViews: number;
	cartValue?: string;
	isActive: boolean;
}

interface SessionTrackerProps {
	title: string;
	sessions: UserSession[];
	stats: {
		activeSessions: number;
		avgDuration: string;
		conversionRate: string;
	};
}

const ActionIcon = ({ type }: { type: UserSession['actions'][0]['type'] }) => {
	const icons: Record<string, LucideIcon> = {
		view: Eye,
		click: MousePointer,
		cart: ShoppingCart,
		purchase: CreditCard,
	};
	const Icon = icons[type];
	return <Icon className="size-3" />;
};

const SessionCard = ({ session }: { session: UserSession }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			session.isActive
				? 'border-emerald-500/30 bg-emerald-500/5'
				: 'border-border/50 bg-card/80'
		}`}
	>
		<div className="flex items-start gap-4">
			<div className="relative">
				<Avatar className="size-10">
					<AvatarImage src={session.user.avatar} alt={session.user.name} />
					<AvatarFallback className="bg-secondary text-sm">
						{session.user.initials}
					</AvatarFallback>
				</Avatar>
				{session.isActive && (
					<div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-background" />
				)}
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<div className="flex items-center gap-2">
							<span className="font-medium text-foreground">
								{session.user.isAnonymous
									? 'Anonymous Visitor'
									: session.user.name}
							</span>
							{session.isActive && (
								<Badge
									variant="outline"
									className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
								>
									<span className="relative flex size-1.5 mr-1">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
										<span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
									</span>
									Live
								</Badge>
							)}
						</div>
						{session.user.email && (
							<span className="text-xs text-muted-foreground">
								{session.user.email}
							</span>
						)}
					</div>
					<Button variant="ghost" size="icon-sm" className="size-7">
						<ChevronRight className="size-4" />
					</Button>
				</div>

				<div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
					<span className="flex items-center gap-1">
						<Clock className="size-3" />
						{session.sessionDuration}
					</span>
					<span className="flex items-center gap-1">
						<Eye className="size-3" />
						{session.pageViews} pages
					</span>
					{session.cartValue && (
						<span className="flex items-center gap-1 text-emerald-400">
							<ShoppingCart className="size-3" />
							{session.cartValue}
						</span>
					)}
				</div>

				<div className="p-2 rounded-lg bg-muted/30 mb-2">
					<span className="text-xs text-muted-foreground">Currently on:</span>
					<span className="text-sm text-foreground block truncate">
						{session.currentPage}
					</span>
				</div>

				<div className="flex items-center gap-2 flex-wrap">
					{session.actions.slice(0, 3).map((action, index) => (
						<Badge
							key={index}
							variant="outline"
							className="text-xs gap-1 bg-muted/50"
						>
							<ActionIcon type={action.type} />
							{action.label}
						</Badge>
					))}
					{session.actions.length > 3 && (
						<span className="text-xs text-muted-foreground">
							+{session.actions.length - 3} more
						</span>
					)}
				</div>
			</div>
		</div>
	</div>
);

const TrackerStats = ({ stats }: { stats: SessionTrackerProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<Activity className="size-4 text-emerald-400 mb-2" />
			<span className="text-2xl font-bold text-emerald-400 block">
				{stats.activeSessions}
			</span>
			<span className="text-xs text-muted-foreground">Active</span>
		</div>
		<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
			<Clock className="size-4 text-muted-foreground mb-2" />
			<span className="text-2xl font-bold text-foreground block">
				{stats.avgDuration}
			</span>
			<span className="text-xs text-muted-foreground">Avg Duration</span>
		</div>
		<div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
			<CreditCard className="size-4 text-primary mb-2" />
			<span className="text-2xl font-bold text-primary block">
				{stats.conversionRate}
			</span>
			<span className="text-xs text-muted-foreground">Conversion</span>
		</div>
	</div>
);

const SessionTracker = ({ title, sessions, stats }: SessionTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Activity className="size-5" />
				{title}
				<Badge className="bg-emerald-500 text-white">
					{stats.activeSessions} Live
				</Badge>
			</CardTitle>
			<Button variant="outline" size="sm">
				View All
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<TrackerStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{sessions.map((session) => (
						<SessionCard key={session.id} session={session} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const sessions: UserSession[] = [
		{
			id: '1',
			user: {
				name: 'Sarah Chen',
				email: 'sarah@example.com',
				initials: 'SC',
			},
			currentPage: '/products/premium-wireless-headphones',
			actions: [
				{ type: 'view', label: 'Viewed headphones', timestamp: '1m ago' },
				{ type: 'click', label: 'Added to cart', timestamp: '30s ago' },
				{ type: 'cart', label: 'Cart updated', timestamp: '10s ago' },
			],
			sessionDuration: '12:45',
			pageViews: 8,
			cartValue: '$299',
			isActive: true,
		},
		{
			id: '2',
			user: { initials: 'AV', isAnonymous: true },
			currentPage: '/collections/new-arrivals',
			actions: [
				{ type: 'view', label: 'Browsing new', timestamp: '5m ago' },
				{ type: 'click', label: 'Filter applied', timestamp: '2m ago' },
			],
			sessionDuration: '5:30',
			pageViews: 4,
			isActive: true,
		},
		{
			id: '3',
			user: {
				name: 'Mike Johnson',
				email: 'mike.j@email.com',
				initials: 'MJ',
			},
			currentPage: '/checkout/payment',
			actions: [
				{ type: 'cart', label: '3 items', timestamp: '10m ago' },
				{ type: 'purchase', label: 'Checkout started', timestamp: '2m ago' },
			],
			sessionDuration: '18:22',
			pageViews: 12,
			cartValue: '$847',
			isActive: true,
		},
		{
			id: '4',
			user: { initials: 'AV', isAnonymous: true },
			currentPage: '/support/faq',
			actions: [
				{ type: 'view', label: 'FAQ viewed', timestamp: '15m ago' },
			],
			sessionDuration: '2:15',
			pageViews: 2,
			isActive: false,
		},
		{
			id: '5',
			user: {
				name: 'Emily Davis',
				email: 'emily.d@company.com',
				initials: 'ED',
			},
			currentPage: '/account/orders',
			actions: [
				{ type: 'view', label: 'Order history', timestamp: '30m ago' },
				{ type: 'click', label: 'Track order', timestamp: '25m ago' },
			],
			sessionDuration: '8:45',
			pageViews: 5,
			isActive: false,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<SessionTracker
					title="Session Tracker"
					sessions={sessions}
					stats={{
						activeSessions: 47,
						avgDuration: '6:32',
						conversionRate: '3.2%',
					}}
				/>
			</div>
		</section>
	);
}
