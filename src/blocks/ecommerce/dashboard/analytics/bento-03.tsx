'use client';

import {
	Activity,
	ArrowUpRight,
	CreditCard,
	type LucideIcon,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type MetricCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	subtitle: string;
};

const MetricCard = ({ icon: Icon, label, value, subtitle }: MetricCardProps) => (
	<Card className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
		<CardContent className="p-5">
			<div className="flex items-start justify-between">
				<div className="rounded-xl bg-primary/10 p-2.5 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-5 text-primary" />
				</div>
				<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
			</div>
			<div className="mt-4">
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="text-2xl font-bold mt-1">{value}</p>
				<p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
			</div>
		</CardContent>
	</Card>
);

type RealtimeCardProps = {
	title: string;
	value: string;
	data: number[];
};

const RealtimeCard = ({ title, value, data }: RealtimeCardProps) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
			</div>
			<Badge variant="secondary">Live</Badge>
		</CardHeader>
		<CardContent>
			<p className="text-4xl font-bold mb-4">{value}</p>
			<div className="h-24 flex items-end gap-0.5">
				{data.map((h, i) => (
					<div
						key={i}
						className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-500/80 rounded-t transition-all duration-300"
						style={{ height: `${h}%` }}
					/>
				))}
			</div>
		</CardContent>
	</Card>
);

type ActiveUserProps = {
	avatar: string;
	initials: string;
	name: string;
	action: string;
	time: string;
};

const ActiveUsersCard = ({ users }: { users: ActiveUserProps[] }) => (
	<Card className="border-border/50 bg-card/80 row-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Active Users</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{users.map((user, i) => (
				<div key={i} className="flex items-center gap-3">
					<Avatar className="size-8 ring-2 ring-background">
						<AvatarImage src={user.avatar} />
						<AvatarFallback className="bg-primary/10 text-xs">{user.initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{user.name}</p>
						<p className="text-xs text-muted-foreground truncate">{user.action}</p>
					</div>
					<span className="text-xs text-muted-foreground shrink-0">{user.time}</span>
				</div>
			))}
		</CardContent>
	</Card>
);

type GoalCardProps = {
	title: string;
	current: number;
	target: number;
	unit: string;
};

const GoalCard = ({ title, current, target, unit }: GoalCardProps) => {
	const progress = (current / target) * 100;
	return (
		<Card className="border-border/50 bg-card/80">
			<CardContent className="p-5">
				<div className="flex items-center justify-between mb-3">
					<p className="text-sm font-medium">{title}</p>
					<span className="text-xs text-muted-foreground">{progress.toFixed(0)}%</span>
				</div>
				<Progress value={progress} className="h-2 mb-3" />
				<div className="flex items-center justify-between text-sm">
					<span className="font-semibold">{current.toLocaleString()} {unit}</span>
					<span className="text-muted-foreground">/ {target.toLocaleString()}</span>
				</div>
			</CardContent>
		</Card>
	);
};

const metrics: MetricCardProps[] = [
	{ icon: CreditCard, label: 'Total Sales', value: '$23,456', subtitle: '+12% from yesterday' },
	{ icon: TrendingUp, label: 'Conversion', value: '3.24%', subtitle: '+0.5% improvement' },
];

const realtimeData = [65, 72, 68, 85, 78, 92, 88, 95, 82, 89, 94, 91, 87, 93, 96, 89, 92, 88, 95, 91];

const activeUsers: ActiveUserProps[] = [
	{ avatar: 'https://i.pravatar.cc/100?img=1', initials: 'JD', name: 'John Doe', action: 'Added to cart', time: 'Now' },
	{ avatar: 'https://i.pravatar.cc/100?img=2', initials: 'SM', name: 'Sarah Miller', action: 'Completed purchase', time: '2m' },
	{ avatar: 'https://i.pravatar.cc/100?img=3', initials: 'MW', name: 'Mike Wilson', action: 'Browsing products', time: '5m' },
	{ avatar: 'https://i.pravatar.cc/100?img=4', initials: 'EJ', name: 'Emily Johnson', action: 'Left review', time: '8m' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-1 @lg:grid-cols-4 gap-4 @lg:gap-6">
					<RealtimeCard title="Real-time Visitors" value="1,247" data={realtimeData} />
					{metrics.map((metric, i) => (
						<MetricCard key={i} {...metric} />
					))}
				</div>
				<div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<ActiveUsersCard users={activeUsers} />
					<div className="@lg:col-span-3 grid grid-cols-1 @md:grid-cols-3 gap-4 @lg:gap-6">
						<GoalCard title="Daily Sales Goal" current={8450} target={10000} unit="$" />
						<GoalCard title="Orders Target" current={245} target={300} unit="orders" />
						<GoalCard title="New Signups" current={89} target={100} unit="users" />
						<GoalCard title="Page Views" current={45200} target={50000} unit="views" />
						<GoalCard title="Cart Adds" current={1234} target={1500} unit="items" />
						<GoalCard title="Checkouts" current={456} target={500} unit="completed" />
					</div>
				</div>
			</div>
		</section>
	);
}
