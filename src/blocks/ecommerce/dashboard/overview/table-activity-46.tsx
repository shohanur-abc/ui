import {
	ArrowRight,
	Bell,
	MessageSquare,
	Package,
	ShoppingCart,
	Star,
	User,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ActivitySummary = {
	label: string;
	count: number;
	icon: LucideIcon;
	color: string;
};

type ActivityRow = {
	id: string;
	type: 'order' | 'review' | 'customer' | 'stock' | 'message';
	title: string;
	description: string;
	user: string;
	userInitials: string;
	time: string;
	read: boolean;
};

const ActivitySummaryCard = ({ label, count, icon: Icon, color }: ActivitySummary) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className={`rounded-lg p-2 ${color}`}>
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-2xl font-bold">{count}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</div>
	</div>
);

const getTypeIcon = (type: ActivityRow['type']) => {
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

const getTypeBadge = (type: ActivityRow['type']) => {
	switch (type) {
		case 'order':
			return 'bg-primary/10 text-primary';
		case 'review':
			return 'bg-amber-500/10 text-amber-500';
		case 'customer':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'stock':
			return 'bg-red-500/10 text-red-500';
		case 'message':
			return 'bg-blue-500/10 text-blue-500';
	}
};

export default function Main() {
	const summaries: ActivitySummary[] = [
		{ label: 'New Orders', count: 42, icon: ShoppingCart, color: 'bg-primary/10 text-primary' },
		{ label: 'New Reviews', count: 18, icon: Star, color: 'bg-amber-500/10 text-amber-500' },
		{ label: 'New Customers', count: 24, icon: User, color: 'bg-emerald-500/10 text-emerald-500' },
		{ label: 'Messages', count: 7, icon: MessageSquare, color: 'bg-blue-500/10 text-blue-500' },
	];

	const activities: ActivityRow[] = [
		{ id: '1', type: 'order', title: 'New order received', description: 'Order #4521 - $234.50', user: 'John Doe', userInitials: 'JD', time: '2 min ago', read: false },
		{ id: '2', type: 'review', title: '5-star review', description: 'Wireless Headphones Pro - "Amazing quality!"', user: 'Jane Smith', userInitials: 'JS', time: '15 min ago', read: false },
		{ id: '3', type: 'customer', title: 'New customer signup', description: 'Joined from referral program', user: 'Sarah Wilson', userInitials: 'SW', time: '45 min ago', read: true },
		{ id: '4', type: 'stock', title: 'Low stock alert', description: 'Smart Watch Ultra - Only 12 units left', user: 'System', userInitials: 'SY', time: '1 hour ago', read: false },
		{ id: '5', type: 'message', title: 'New support ticket', description: 'Question about shipping - #TKT-892', user: 'Mike Johnson', userInitials: 'MJ', time: '2 hours ago', read: true },
		{ id: '6', type: 'order', title: 'Order shipped', description: 'Order #4519 shipped via FedEx', user: 'System', userInitials: 'SY', time: '3 hours ago', read: true },
		{ id: '7', type: 'review', title: '4-star review', description: 'USB-C Hub - "Good but could be faster"', user: 'Emma Davis', userInitials: 'ED', time: '4 hours ago', read: true },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{summaries.map((item, i) => (
							<ActivitySummaryCard key={i} {...item} />
						))}
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<div className="flex items-center gap-2">
								<CardTitle className="text-base">Activity Log</CardTitle>
								<Badge variant="secondary">3 unread</Badge>
							</div>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/activity">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Activity</TableHead>
										<TableHead className="hidden @lg:table-cell">User</TableHead>
										<TableHead>Type</TableHead>
										<TableHead className="hidden @xl:table-cell">Time</TableHead>
										<TableHead className="w-10"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{activities.map((activity) => (
										<TableRow key={activity.id} className={activity.read ? '' : 'bg-primary/5'}>
											<TableCell>
												<div className="flex items-center gap-3">
													<div className="rounded-full bg-muted p-2">
														{getTypeIcon(activity.type)}
													</div>
													<div>
														<p className={`font-medium ${activity.read ? '' : 'text-primary'}`}>
															{activity.title}
														</p>
														<p className="text-sm text-muted-foreground">{activity.description}</p>
													</div>
												</div>
											</TableCell>
											<TableCell className="hidden @lg:table-cell">
												<div className="flex items-center gap-2">
													<Avatar className="size-7">
														<AvatarFallback className="text-xs">{activity.userInitials}</AvatarFallback>
													</Avatar>
													<span className="text-sm">{activity.user}</span>
												</div>
											</TableCell>
											<TableCell>
												<Badge variant="secondary" className={getTypeBadge(activity.type)}>
													{activity.type}
												</Badge>
											</TableCell>
											<TableCell className="hidden @xl:table-cell text-muted-foreground">{activity.time}</TableCell>
											<TableCell>
												{!activity.read && (
													<div className="size-2 rounded-full bg-primary" />
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
