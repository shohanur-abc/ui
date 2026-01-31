import {
	Activity,
	Calendar,
	ChevronRight,
	Clock,
	Edit2,
	Eye,
	Globe,
	Heart,
	Mail,
	MapPin,
	MessageSquare,
	MoreHorizontal,
	MousePointerClick,
	Package,
	Phone,
	Search,
	ShoppingCart,
	Star,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ActivityProfile {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	status: 'online' | 'away' | 'offline';
	lastSeen: string;
	session: {
		current: {
			startTime: string;
			duration: string;
			device: string;
			browser: string;
			location: string;
		};
		stats: {
			totalSessions: number;
			avgDuration: string;
			pageViews: number;
			bounceRate: number;
		};
	};
	realtimeActivity: Array<{
		id: string;
		action: string;
		page: string;
		timestamp: string;
		type: 'view' | 'click' | 'search' | 'cart' | 'wishlist';
	}>;
	interests: Array<{
		category: string;
		score: number;
	}>;
	engagementScore: number;
}

const StatusIndicator = ({ status }: { status: ActivityProfile['status'] }) => {
	const config: Record<string, { label: string; color: string }> = {
		online: { label: 'Online', color: 'bg-emerald-500 animate-pulse' },
		away: { label: 'Away', color: 'bg-amber-500' },
		offline: { label: 'Offline', color: 'bg-slate-400' },
	};
	return (
		<div className="flex items-center gap-1.5">
			<span className={`size-2.5 rounded-full ${config[status].color}`} />
			<span className="text-sm">{config[status].label}</span>
		</div>
	);
};

const ActivityIcon = ({ type }: { type: string }) => {
	const icons: Record<string, React.ElementType> = {
		view: Eye,
		click: MousePointerClick,
		search: Search,
		cart: ShoppingCart,
		wishlist: Heart,
	};
	const Icon = icons[type] || Eye;
	return <Icon className="size-4" />;
};

const ActivityItem = ({ activity }: { activity: ActivityProfile['realtimeActivity'][0] }) => (
	<div className="flex items-start gap-3 text-sm">
		<div className="size-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground mt-0.5">
			<ActivityIcon type={activity.type} />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{activity.action}</p>
			<p className="text-muted-foreground text-xs truncate">{activity.page}</p>
		</div>
		<span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
	</div>
);

const InterestBar = ({ interest }: { interest: ActivityProfile['interests'][0] }) => (
	<div>
		<div className="flex items-center justify-between mb-1 text-sm">
			<span>{interest.category}</span>
			<span className="text-muted-foreground">{interest.score}%</span>
		</div>
		<Progress value={interest.score} className="h-1.5" />
	</div>
);

const EngagementMeter = ({ score }: { score: number }) => {
	const getLevel = (s: number) => {
		if (s >= 80) return { label: 'Highly Engaged', color: 'text-emerald-500' };
		if (s >= 60) return { label: 'Engaged', color: 'text-blue-500' };
		if (s >= 40) return { label: 'Moderate', color: 'text-amber-500' };
		return { label: 'Low', color: 'text-red-500' };
	};
	const level = getLevel(score);
	return (
		<div className="text-center">
			<div className="relative inline-flex items-center justify-center">
				<svg className="size-32">
					<circle
						cx="64"
						cy="64"
						r="56"
						fill="none"
						stroke="currentColor"
						strokeWidth="8"
						className="text-muted"
					/>
					<circle
						cx="64"
						cy="64"
						r="56"
						fill="none"
						stroke="currentColor"
						strokeWidth="8"
						strokeDasharray={`${score * 3.52} 352`}
						strokeLinecap="round"
						className="text-primary -rotate-90 origin-center"
						style={{ transition: 'stroke-dasharray 0.5s' }}
					/>
				</svg>
				<div className="absolute">
					<p className="text-3xl font-bold">{score}</p>
					<p className="text-xs text-muted-foreground">Score</p>
				</div>
			</div>
			<p className={`font-medium mt-2 ${level.color}`}>{level.label}</p>
		</div>
	);
};

const ProfileHeader = ({ profile }: { profile: ActivityProfile }) => (
	<div className="flex flex-col @md:flex-row gap-4 items-start">
		<div className="relative">
			<Avatar className="size-16">
				<AvatarImage src={profile.avatar} alt={profile.name} />
				<AvatarFallback className="bg-primary/10 text-primary text-xl">
					{profile.initials}
				</AvatarFallback>
			</Avatar>
			<div className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-background ${profile.status === 'online' ? 'bg-emerald-500' : profile.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'}`} />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-3 mb-1">
				<h1 className="text-2xl font-bold">{profile.name}</h1>
				<StatusIndicator status={profile.status} />
			</div>
			<p className="text-muted-foreground text-sm mb-2">{profile.email}</p>
			{profile.status === 'online' && profile.session.current && (
				<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
					<span className="flex items-center gap-1">
						<Clock className="size-3" />
						Session: {profile.session.current.duration}
					</span>
					<span className="flex items-center gap-1">
						<Globe className="size-3" />
						{profile.session.current.browser}
					</span>
					<span className="flex items-center gap-1">
						<MapPin className="size-3" />
						{profile.session.current.location}
					</span>
				</div>
			)}
		</div>
		<Button variant="outline" size="sm">
			<MessageSquare className="size-4 mr-1.5" />
			Send Message
		</Button>
	</div>
);

export default function Main() {
	const profile: ActivityProfile = {
		id: '1',
		name: 'Sophia Anderson',
		email: 'sophia.a@email.com',
		initials: 'SA',
		status: 'online',
		lastSeen: 'Now',
		session: {
			current: {
				startTime: '2:15 PM',
				duration: '18 min',
				device: 'Desktop',
				browser: 'Chrome on macOS',
				location: 'San Francisco, CA',
			},
			stats: {
				totalSessions: 234,
				avgDuration: '12 min',
				pageViews: 1456,
				bounceRate: 23,
			},
		},
		realtimeActivity: [
			{ id: '1', action: 'Viewing product', page: 'Wireless Headphones Pro', timestamp: 'Just now', type: 'view' },
			{ id: '2', action: 'Added to wishlist', page: 'Smart Watch Series 5', timestamp: '2 min ago', type: 'wishlist' },
			{ id: '3', action: 'Searched for', page: '"bluetooth speakers"', timestamp: '5 min ago', type: 'search' },
			{ id: '4', action: 'Added to cart', page: 'USB-C Hub Adapter', timestamp: '8 min ago', type: 'cart' },
			{ id: '5', action: 'Clicked on', page: 'Electronics category', timestamp: '10 min ago', type: 'click' },
			{ id: '6', action: 'Started session', page: 'Homepage', timestamp: '18 min ago', type: 'view' },
		],
		interests: [
			{ category: 'Electronics', score: 85 },
			{ category: 'Audio', score: 72 },
			{ category: 'Smart Home', score: 58 },
			{ category: 'Accessories', score: 45 },
		],
		engagementScore: 78,
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader profile={profile} />

				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<Card>
						<CardContent className="p-4">
							<p className="text-muted-foreground text-sm mb-1">Total Sessions</p>
							<p className="text-2xl font-bold">{profile.session.stats.totalSessions}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<p className="text-muted-foreground text-sm mb-1">Avg Duration</p>
							<p className="text-2xl font-bold">{profile.session.stats.avgDuration}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<p className="text-muted-foreground text-sm mb-1">Page Views</p>
							<p className="text-2xl font-bold">{profile.session.stats.pageViews.toLocaleString()}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<p className="text-muted-foreground text-sm mb-1">Bounce Rate</p>
							<p className="text-2xl font-bold">{profile.session.stats.bounceRate}%</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<Card className="@lg:col-span-2">
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Activity className="size-4" />
								Real-time Activity
								<Badge variant="outline" className="ml-auto bg-emerald-500/10 text-emerald-500">
									Live
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{profile.realtimeActivity.map((activity) => (
								<ActivityItem key={activity.id} activity={activity} />
							))}
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base flex items-center gap-2">
									<TrendingUp className="size-4" />
									Engagement
								</CardTitle>
							</CardHeader>
							<CardContent className="flex justify-center py-4">
								<EngagementMeter score={profile.engagementScore} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base flex items-center gap-2">
									<Star className="size-4" />
									Interests
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{profile.interests.map((interest) => (
									<InterestBar key={interest.category} interest={interest} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
