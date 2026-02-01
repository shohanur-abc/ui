import {
	ArrowDownRight,
	ArrowRight,
	ArrowUpRight,
	BarChart3,
	Bell,
	Calendar,
	CircleDollarSign,
	Clock,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type HighlightKpi = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	color: string;
};

type QuickAction = {
	label: string;
	icon: LucideIcon;
	href: string;
};

type Notification = {
	title: string;
	time: string;
	type: 'order' | 'alert' | 'info';
};

const HighlightCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	color,
}: HighlightKpi) => (
	<Card
		className={`group relative overflow-hidden border-transparent transition-all duration-300 hover:shadow-lg ${color}`}
	>
		<div className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-white/10" />
		<CardContent className="relative p-5">
			<Icon className="size-8 text-white/80" />
			<div className="mt-4">
				<p className="text-sm text-white/70">{title}</p>
				<p className="text-3xl font-bold text-white">{value}</p>
			</div>
			<div className="mt-2 flex items-center gap-1 text-sm text-white/80">
				{trend === 'up' ? (
					<ArrowUpRight className="size-4" />
				) : (
					<ArrowDownRight className="size-4" />
				)}
				{change} vs last month
			</div>
		</CardContent>
	</Card>
);

const QuickActionButton = ({ label, icon: Icon, href }: QuickAction) => (
	<Button
		variant="outline"
		className="h-auto flex-col gap-2 py-4 hover:bg-primary/10 hover:border-primary/50"
		asChild
	>
		<Link href={href}>
			<Icon className="size-5 text-primary" />
			<span className="text-xs">{label}</span>
		</Link>
	</Button>
);

const getNotificationIcon = (type: Notification['type']) => {
	switch (type) {
		case 'order':
			return <ShoppingCart className="size-4 text-primary" />;
		case 'alert':
			return <Bell className="size-4 text-amber-500" />;
		case 'info':
			return <TrendingUp className="size-4 text-emerald-500" />;
	}
};

const NotificationRow = ({ title, time, type }: Notification) => (
	<div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
		<div className="rounded-full bg-muted p-2">{getNotificationIcon(type)}</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm">{title}</p>
			<p className="text-xs text-muted-foreground">{time}</p>
		</div>
	</div>
);

export default function Main() {
	const highlightKpis: HighlightKpi[] = [
		{
			title: 'Total Revenue',
			value: '$89,432',
			change: '+24.5%',
			trend: 'up',
			icon: CircleDollarSign,
			color: 'bg-gradient-to-br from-primary to-primary/80',
		},
		{
			title: 'Total Orders',
			value: '2,847',
			change: '+18.2%',
			trend: 'up',
			icon: ShoppingCart,
			color: 'bg-gradient-to-br from-emerald-600 to-emerald-500',
		},
	];

	const quickActions: QuickAction[] = [
		{ label: 'Add Product', icon: Package, href: '/products/new' },
		{ label: 'View Orders', icon: ShoppingCart, href: '/orders' },
		{ label: 'Analytics', icon: BarChart3, href: '/analytics' },
		{ label: 'Customers', icon: Users, href: '/customers' },
	];

	const notifications: Notification[] = [
		{ title: 'New order #ORD-4521 received', time: '2 min ago', type: 'order' },
		{
			title: 'Low stock alert: Wireless Headphones',
			time: '15 min ago',
			type: 'alert',
		},
		{ title: 'Sales target reached for Q1', time: '1 hour ago', type: 'info' },
		{
			title: 'New order #ORD-4520 received',
			time: '2 hours ago',
			type: 'order',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @lg:grid-cols-3 @xl:gap-6">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:col-span-2">
						{highlightKpis.map((kpi, i) => (
							<HighlightCard key={i} {...kpi} />
						))}
					</div>
					<Card className="row-span-2">
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Notifications</CardTitle>
								<Badge variant="secondary">4 new</Badge>
							</div>
						</CardHeader>
						<CardContent className="space-y-1 pt-0">
							{notifications.map((notification, i) => (
								<NotificationRow key={i} {...notification} />
							))}
						</CardContent>
					</Card>
					<Card className="@lg:col-span-2">
						<CardHeader className="pb-3">
							<CardTitle className="text-base">Quick Actions</CardTitle>
						</CardHeader>
						<CardContent className="pt-0">
							<div className="grid grid-cols-4 gap-3">
								{quickActions.map((action, i) => (
									<QuickActionButton key={i} {...action} />
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
