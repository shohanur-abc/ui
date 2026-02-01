'use client';

import { Line, LineChart, XAxis } from 'recharts';
import {
	ArrowRight,
	Bell,
	Box,
	CheckCircle2,
	Clock,
	MessageSquare,
	Package,
	ShoppingCart,
	Star,
	TrendingUp,
	User,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type SummaryItem = {
	title: string;
	value: string;
	icon: LucideIcon;
	color: string;
};

type ActivityItem = {
	id: string;
	type: 'order' | 'review' | 'customer' | 'stock' | 'message';
	title: string;
	description: string;
	time: string;
};

type QuickStat = {
	label: string;
	value: string;
	change: string;
};

const SummaryCard = ({ title, value, icon: Icon, color }: SummaryItem) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className={`rounded-lg p-2 ${color}`}>
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-xl font-bold">{value}</p>
		</div>
	</div>
);

const getActivityIcon = (type: ActivityItem['type']) => {
	switch (type) {
		case 'order':
			return <ShoppingCart className="size-4 text-primary" />;
		case 'review':
			return <Star className="size-4 text-amber-500" />;
		case 'customer':
			return <User className="size-4 text-emerald-500" />;
		case 'stock':
			return <Package className="size-4 text-red-500" />;
		case 'message':
			return <MessageSquare className="size-4 text-blue-500" />;
	}
};

const ActivityRow = ({ type, title, description, time }: ActivityItem) => (
	<div className="flex gap-4">
		<div className="flex flex-col items-center">
			<div className="rounded-full bg-muted p-2">{getActivityIcon(type)}</div>
			<div className="flex-1 w-px bg-border" />
		</div>
		<div className="flex-1 pb-6">
			<p className="font-medium">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
			<p className="mt-1 text-xs text-muted-foreground">{time}</p>
		</div>
	</div>
);

const QuickStatRow = ({ label, value, change }: QuickStat) => (
	<div className="flex items-center justify-between py-2">
		<span className="text-sm text-muted-foreground">{label}</span>
		<div className="flex items-center gap-2">
			<span className="font-medium">{value}</span>
			<Badge
				variant="secondary"
				className="bg-emerald-500/10 text-emerald-500 text-xs"
			>
				{change}
			</Badge>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	activity: { label: 'Activity', color: 'var(--chart-1)' },
};

export default function Main() {
	const summaries: SummaryItem[] = [
		{
			title: 'New Orders',
			value: '42',
			icon: ShoppingCart,
			color: 'bg-primary/10 text-primary',
		},
		{
			title: 'New Reviews',
			value: '18',
			icon: Star,
			color: 'bg-amber-500/10 text-amber-500',
		},
		{
			title: 'New Customers',
			value: '24',
			icon: User,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			title: 'Low Stock',
			value: '7',
			icon: Package,
			color: 'bg-red-500/10 text-red-500',
		},
	];

	const activities: ActivityItem[] = [
		{
			id: '1',
			type: 'order',
			title: 'New order received',
			description: 'Order #4521 - $234.50 from John Doe',
			time: '2 min ago',
		},
		{
			id: '2',
			type: 'review',
			title: '5-star review',
			description: 'Wireless Headphones Pro - "Amazing quality!"',
			time: '15 min ago',
		},
		{
			id: '3',
			type: 'customer',
			title: 'New customer signup',
			description: 'Sarah Wilson joined from referral',
			time: '45 min ago',
		},
		{
			id: '4',
			type: 'stock',
			title: 'Low stock alert',
			description: 'Smart Watch Ultra - Only 12 units left',
			time: '1 hour ago',
		},
		{
			id: '5',
			type: 'message',
			title: 'New support ticket',
			description: 'Question about shipping - #TKT-892',
			time: '2 hours ago',
		},
	];

	const quickStats: QuickStat[] = [
		{ label: 'Orders Today', value: '156', change: '+24%' },
		{ label: 'Revenue Today', value: '$8,432', change: '+18%' },
		{ label: 'Active Visitors', value: '342', change: '+12%' },
		{ label: 'Conversion Rate', value: '3.2%', change: '+0.5%' },
	];

	const activityData = [
		{ hour: '9AM', activity: 45 },
		{ hour: '10AM', activity: 62 },
		{ hour: '11AM', activity: 78 },
		{ hour: '12PM', activity: 95 },
		{ hour: '1PM', activity: 82 },
		{ hour: '2PM', activity: 68 },
		{ hour: '3PM', activity: 74 },
		{ hour: '4PM', activity: 88 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-2">
						<div className="grid grid-cols-2 gap-4">
							{summaries.map((item, i) => (
								<SummaryCard key={i} {...item} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Quick Stats</CardTitle>
							</CardHeader>
							<CardContent className="divide-y pt-0">
								{quickStats.map((stat, i) => (
									<QuickStatRow key={i} {...stat} />
								))}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Activity Trend</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={chartConfig}
									className="h-[120px] w-full"
								>
									<LineChart data={activityData}>
										<XAxis
											dataKey="hour"
											tickLine={false}
											axisLine={false}
											fontSize={10}
										/>
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Line
											type="monotone"
											dataKey="activity"
											stroke="var(--color-activity)"
											strokeWidth={2}
											dot={false}
										/>
									</LineChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<Card className="@xl:col-span-3">
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Recent Activity</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/activity">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							{activities.map((activity) => (
								<ActivityRow key={activity.id} {...activity} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
