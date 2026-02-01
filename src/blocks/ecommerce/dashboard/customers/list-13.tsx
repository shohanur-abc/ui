import {
	Activity,
	Clock,
	Eye,
	Heart,
	MessageSquare,
	MoreHorizontal,
	MousePointerClick,
	Package,
	Search,
	ShoppingCart,
	Star,
	TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EngagementCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	engagement: {
		score: number;
		trend: 'up' | 'down' | 'stable';
		level: 'low' | 'medium' | 'high' | 'very-high';
	};
	activity: {
		pageViews: number;
		productViews: number;
		cartAdds: number;
		wishlistAdds: number;
		reviews: number;
		searches: number;
	};
	session: {
		avgDuration: string;
		frequency: string;
		lastActive: string;
	};
	topInterests: string[];
}

const EngagementScoreBar = ({
	score,
	level,
}: {
	score: number;
	level: EngagementCustomer['engagement']['level'];
}) => {
	const colors: Record<string, string> = {
		low: '[&>div]:bg-red-500',
		medium: '[&>div]:bg-amber-500',
		high: '[&>div]:bg-emerald-500',
		'very-high': '[&>div]:bg-cyan-500',
	};
	return (
		<div className="min-w-[100px]">
			<div className="flex items-center justify-between mb-1">
				<span className="text-xs text-muted-foreground">Score</span>
				<span className="text-xs font-semibold">{score}</span>
			</div>
			<Progress value={score} className={`h-1.5 ${colors[level]}`} />
		</div>
	);
};

const LevelBadge = ({
	level,
}: {
	level: EngagementCustomer['engagement']['level'];
}) => {
	const config: Record<string, { label: string; className: string }> = {
		low: { label: 'Low', className: 'bg-red-500/10 text-red-500' },
		medium: { label: 'Medium', className: 'bg-amber-500/10 text-amber-500' },
		high: { label: 'High', className: 'bg-emerald-500/10 text-emerald-500' },
		'very-high': {
			label: 'Very High',
			className: 'bg-cyan-500/10 text-cyan-500',
		},
	};
	const { label, className } = config[level];
	return (
		<Badge variant="outline" className={className}>
			{label}
		</Badge>
	);
};

const ActivityMetric = ({
	icon: Icon,
	value,
	label,
}: {
	icon: React.ElementType;
	value: number;
	label: string;
}) => (
	<div className="flex items-center gap-1.5 text-sm" title={label}>
		<Icon className="size-3.5 text-muted-foreground" />
		<span className="font-medium">{value}</span>
	</div>
);

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

const EngagementListItem = ({ customer }: { customer: EngagementCustomer }) => (
	<div className="group flex flex-col @lg:flex-row @lg:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-11">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{customer.name}</p>
					<LevelBadge level={customer.engagement.level} />
				</div>
				<p className="text-muted-foreground text-sm truncate">
					{customer.email}
				</p>
			</div>
		</div>
		<EngagementScoreBar
			score={customer.engagement.score}
			level={customer.engagement.level}
		/>
		<div className="flex-1 flex flex-wrap gap-4 @md:gap-6">
			<ActivityMetric
				icon={Eye}
				value={customer.activity.pageViews}
				label="Page Views"
			/>
			<ActivityMetric
				icon={Package}
				value={customer.activity.productViews}
				label="Product Views"
			/>
			<ActivityMetric
				icon={ShoppingCart}
				value={customer.activity.cartAdds}
				label="Cart Adds"
			/>
			<ActivityMetric
				icon={Heart}
				value={customer.activity.wishlistAdds}
				label="Wishlist"
			/>
			<ActivityMetric
				icon={Star}
				value={customer.activity.reviews}
				label="Reviews"
			/>
			<ActivityMetric
				icon={Search}
				value={customer.activity.searches}
				label="Searches"
			/>
		</div>
		<div className="hidden @xl:flex flex-col text-right min-w-[120px]">
			<div className="flex items-center justify-end gap-1 text-sm">
				<Clock className="size-3.5 text-muted-foreground" />
				<span>{customer.session.avgDuration}</span>
			</div>
			<p className="text-muted-foreground text-xs">
				{customer.session.frequency}
			</p>
		</div>
		<div className="hidden @lg:block text-right min-w-[80px]">
			<p className="text-sm">{customer.session.lastActive}</p>
			<p className="text-muted-foreground text-xs">Last active</p>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>View activity timeline</DropdownMenuItem>
				<DropdownMenuItem>View session recordings</DropdownMenuItem>
				<DropdownMenuItem>Send engagement campaign</DropdownMenuItem>
				<DropdownMenuItem>Export activity data</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const customers: EngagementCustomer[] = [
		{
			id: '1',
			name: 'Oliver Brown',
			email: 'oliver.b@email.com',
			initials: 'OB',
			engagement: { score: 92, trend: 'up', level: 'very-high' },
			activity: {
				pageViews: 245,
				productViews: 89,
				cartAdds: 24,
				wishlistAdds: 35,
				reviews: 8,
				searches: 56,
			},
			session: {
				avgDuration: '12m 30s',
				frequency: '5x/week',
				lastActive: '10m ago',
			},
			topInterests: ['Electronics', 'Gaming', 'Audio'],
		},
		{
			id: '2',
			name: 'Penelope White',
			email: 'penelope.w@email.com',
			initials: 'PW',
			engagement: { score: 78, trend: 'up', level: 'high' },
			activity: {
				pageViews: 156,
				productViews: 62,
				cartAdds: 15,
				wishlistAdds: 28,
				reviews: 5,
				searches: 34,
			},
			session: {
				avgDuration: '8m 45s',
				frequency: '4x/week',
				lastActive: '2h ago',
			},
			topInterests: ['Fashion', 'Beauty', 'Accessories'],
		},
		{
			id: '3',
			name: 'Quentin Davis',
			email: 'quentin.d@email.com',
			initials: 'QD',
			engagement: { score: 54, trend: 'stable', level: 'medium' },
			activity: {
				pageViews: 78,
				productViews: 32,
				cartAdds: 8,
				wishlistAdds: 12,
				reviews: 2,
				searches: 18,
			},
			session: {
				avgDuration: '5m 20s',
				frequency: '2x/week',
				lastActive: '1d ago',
			},
			topInterests: ['Sports', 'Outdoor'],
		},
		{
			id: '4',
			name: 'Ruby Anderson',
			email: 'ruby.a@email.com',
			initials: 'RA',
			engagement: { score: 28, trend: 'down', level: 'low' },
			activity: {
				pageViews: 23,
				productViews: 8,
				cartAdds: 1,
				wishlistAdds: 3,
				reviews: 0,
				searches: 5,
			},
			session: {
				avgDuration: '2m 10s',
				frequency: '1x/month',
				lastActive: '2w ago',
			},
			topInterests: ['Home'],
		},
		{
			id: '5',
			name: 'Sebastian Cruz',
			email: 'sebastian.c@email.com',
			initials: 'SC',
			engagement: { score: 85, trend: 'up', level: 'high' },
			activity: {
				pageViews: 189,
				productViews: 74,
				cartAdds: 19,
				wishlistAdds: 22,
				reviews: 6,
				searches: 42,
			},
			session: {
				avgDuration: '10m 15s',
				frequency: '4x/week',
				lastActive: '45m ago',
			},
			topInterests: ['Tech', 'Gadgets', 'Smart Home'],
		},
		{
			id: '6',
			name: 'Tessa Morgan',
			email: 'tessa.m@email.com',
			initials: 'TM',
			engagement: { score: 62, trend: 'up', level: 'medium' },
			activity: {
				pageViews: 98,
				productViews: 45,
				cartAdds: 11,
				wishlistAdds: 18,
				reviews: 3,
				searches: 27,
			},
			session: {
				avgDuration: '6m 50s',
				frequency: '3x/week',
				lastActive: '5h ago',
			},
			topInterests: ['Jewelry', 'Watches'],
		},
		{
			id: '7',
			name: 'Ulysses Park',
			email: 'ulysses.p@email.com',
			initials: 'UP',
			engagement: { score: 95, trend: 'up', level: 'very-high' },
			activity: {
				pageViews: 312,
				productViews: 124,
				cartAdds: 32,
				wishlistAdds: 45,
				reviews: 12,
				searches: 78,
			},
			session: {
				avgDuration: '15m 40s',
				frequency: '6x/week',
				lastActive: '5m ago',
			},
			topInterests: ['Photography', 'Art', 'Collectibles'],
		},
		{
			id: '8',
			name: 'Victoria Lane',
			email: 'victoria.l@email.com',
			initials: 'VL',
			engagement: { score: 41, trend: 'down', level: 'medium' },
			activity: {
				pageViews: 56,
				productViews: 21,
				cartAdds: 5,
				wishlistAdds: 8,
				reviews: 1,
				searches: 12,
			},
			session: {
				avgDuration: '4m 05s',
				frequency: '1x/week',
				lastActive: '4d ago',
			},
			topInterests: ['Kitchen', 'Cooking'],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Customer Engagement"
					subtitle="Activity metrics and engagement scores"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<EngagementListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
