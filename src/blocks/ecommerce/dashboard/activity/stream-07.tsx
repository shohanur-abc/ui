import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Globe,
	MapPin,
	Monitor,
	Smartphone,
	Tablet,
	Users,
	Eye,
	Clock,
	TrendingUp,
	BarChart3,
} from 'lucide-react';

interface Visitor {
	id: string;
	sessionId: string;
	location: {
		city: string;
		country: string;
		flag: string;
	};
	device: 'desktop' | 'mobile' | 'tablet';
	currentPage: string;
	source: string;
	duration: string;
	pageViews: number;
	status: 'active' | 'idle' | 'exiting';
}

interface VisitorStreamProps {
	title: string;
	visitors: Visitor[];
	stats: {
		activeNow: number;
		avgSessionDuration: string;
		bounceRate: string;
		topPage: string;
	};
}

const DeviceIcon = ({ device }: { device: Visitor['device'] }) => {
	const config = {
		desktop: { icon: Monitor, className: 'text-blue-400' },
		mobile: { icon: Smartphone, className: 'text-purple-400' },
		tablet: { icon: Tablet, className: 'text-emerald-400' },
	};

	const { icon: Icon, className } = config[device];
	return <Icon className={`size-4 ${className}`} />;
};

const StatusIndicator = ({ status }: { status: Visitor['status'] }) => {
	const config = {
		active: 'bg-emerald-400 shadow-emerald-400/50',
		idle: 'bg-amber-400 shadow-amber-400/50',
		exiting: 'bg-rose-400 shadow-rose-400/50',
	};

	return (
		<div className="relative">
			<div className={`size-2.5 rounded-full shadow-lg ${config[status]}`} />
			{status === 'active' && (
				<div
					className={`absolute inset-0 size-2.5 rounded-full ${config[status]} animate-ping`}
				/>
			)}
		</div>
	);
};

const VisitorCard = ({ visitor }: { visitor: Visitor }) => (
	<div className="group flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-muted/50">
		<StatusIndicator status={visitor.status} />
		<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
			<DeviceIcon device={visitor.device} />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				<span className="text-lg">{visitor.location.flag}</span>
				<span className="text-sm font-medium text-foreground">
					{visitor.location.city}, {visitor.location.country}
				</span>
				<Badge variant="outline" className="text-xs capitalize">
					{visitor.device}
				</Badge>
			</div>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<span className="truncate max-w-32">{visitor.currentPage}</span>
				<span>•</span>
				<span>from {visitor.source}</span>
			</div>
		</div>
		<div className="flex flex-col items-end gap-1 text-xs">
			<div className="flex items-center gap-1 text-muted-foreground">
				<Clock className="size-3" />
				<span>{visitor.duration}</span>
			</div>
			<div className="flex items-center gap-1 text-muted-foreground">
				<Eye className="size-3" />
				<span>{visitor.pageViews} pages</span>
			</div>
		</div>
	</div>
);

const VisitorStats = ({ stats }: { stats: VisitorStreamProps['stats'] }) => (
	<div className="space-y-4">
		<div className="grid grid-cols-2 gap-3">
			<div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20">
				<div className="flex items-center justify-between mb-2">
					<Users className="size-5 text-emerald-400" />
					<div className="relative">
						<div className="size-2 rounded-full bg-emerald-400" />
						<div className="absolute inset-0 size-2 rounded-full bg-emerald-400 animate-ping" />
					</div>
				</div>
				<p className="text-2xl font-bold text-foreground">{stats.activeNow}</p>
				<p className="text-xs text-muted-foreground">Active Now</p>
			</div>
			<div className="p-4 rounded-lg bg-muted/30 border border-border/50">
				<Clock className="size-5 text-primary mb-2" />
				<p className="text-2xl font-bold text-foreground">
					{stats.avgSessionDuration}
				</p>
				<p className="text-xs text-muted-foreground">Avg Session</p>
			</div>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50">
			<div className="flex items-center justify-between mb-2">
				<span className="text-xs text-muted-foreground">Top Page</span>
				<BarChart3 className="size-3 text-muted-foreground" />
			</div>
			<p className="text-sm font-medium text-foreground truncate">
				{stats.topPage}
			</p>
		</div>
	</div>
);

const DeviceBreakdown = ({ visitors }: { visitors: Visitor[] }) => {
	const total = visitors.length;
	const desktop = visitors.filter((v) => v.device === 'desktop').length;
	const mobile = visitors.filter((v) => v.device === 'mobile').length;
	const tablet = visitors.filter((v) => v.device === 'tablet').length;

	return (
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50">
			<div className="flex items-center gap-2 mb-3">
				<TrendingUp className="size-4 text-primary" />
				<span className="text-sm font-medium text-foreground">
					Device Breakdown
				</span>
			</div>
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<Monitor className="size-4 text-blue-400" />
					<span className="text-xs text-muted-foreground w-16">Desktop</span>
					<Progress
						value={(desktop / total) * 100}
						className="flex-1 h-1.5 [&>div]:bg-blue-400"
					/>
					<span className="text-xs text-muted-foreground w-8 text-right">
						{Math.round((desktop / total) * 100)}%
					</span>
				</div>
				<div className="flex items-center gap-2">
					<Smartphone className="size-4 text-purple-400" />
					<span className="text-xs text-muted-foreground w-16">Mobile</span>
					<Progress
						value={(mobile / total) * 100}
						className="flex-1 h-1.5 [&>div]:bg-purple-400"
					/>
					<span className="text-xs text-muted-foreground w-8 text-right">
						{Math.round((mobile / total) * 100)}%
					</span>
				</div>
				<div className="flex items-center gap-2">
					<Tablet className="size-4 text-emerald-400" />
					<span className="text-xs text-muted-foreground w-16">Tablet</span>
					<Progress
						value={(tablet / total) * 100}
						className="flex-1 h-1.5 [&>div]:bg-emerald-400"
					/>
					<span className="text-xs text-muted-foreground w-8 text-right">
						{Math.round((tablet / total) * 100)}%
					</span>
				</div>
			</div>
		</div>
	);
};

const VisitorStream = ({ title, visitors, stats }: VisitorStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Globe className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				View Analytics
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<VisitorStats stats={stats} />
			<DeviceBreakdown visitors={visitors} />
			<div className="space-y-1 max-h-[300px] overflow-y-auto">
				{visitors.map((visitor) => (
					<VisitorCard key={visitor.id} visitor={visitor} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const visitors: Visitor[] = [
		{
			id: '1',
			sessionId: 'sess_123',
			location: { city: 'San Francisco', country: 'USA', flag: '🇺🇸' },
			device: 'desktop',
			currentPage: '/products/wireless-headphones',
			source: 'Google',
			duration: '4:32',
			pageViews: 8,
			status: 'active',
		},
		{
			id: '2',
			sessionId: 'sess_124',
			location: { city: 'London', country: 'UK', flag: '🇬🇧' },
			device: 'mobile',
			currentPage: '/cart',
			source: 'Instagram',
			duration: '2:15',
			pageViews: 5,
			status: 'active',
		},
		{
			id: '3',
			sessionId: 'sess_125',
			location: { city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
			device: 'tablet',
			currentPage: '/checkout',
			source: 'Direct',
			duration: '6:48',
			pageViews: 12,
			status: 'active',
		},
		{
			id: '4',
			sessionId: 'sess_126',
			location: { city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
			device: 'desktop',
			currentPage: '/products',
			source: 'Facebook',
			duration: '1:23',
			pageViews: 3,
			status: 'idle',
		},
		{
			id: '5',
			sessionId: 'sess_127',
			location: { city: 'Sydney', country: 'Australia', flag: '🇦🇺' },
			device: 'mobile',
			currentPage: '/',
			source: 'Google',
			duration: '0:45',
			pageViews: 2,
			status: 'exiting',
		},
		{
			id: '6',
			sessionId: 'sess_128',
			location: { city: 'Paris', country: 'France', flag: '🇫🇷' },
			device: 'desktop',
			currentPage: '/about',
			source: 'Twitter',
			duration: '3:12',
			pageViews: 6,
			status: 'active',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<VisitorStream
					title="Live Visitors"
					visitors={visitors}
					stats={{
						activeNow: 847,
						avgSessionDuration: '4:32',
						bounceRate: '32%',
						topPage: '/products/wireless-headphones',
					}}
				/>
			</div>
		</section>
	);
}
