import {
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	Bell,
	Check,
	ChevronRight,
	Clock,
	Eye,
	Mail,
	MoreVertical,
	Smartphone,
	TrendingUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type MetricCard = {
	title: string;
	value: string;
	change: number;
	changeLabel: string;
};

type NotificationMetric = {
	id: string;
	name: string;
	sent: number;
	delivered: number;
	opened: number;
	clicked: number;
	channel: 'email' | 'push' | 'sms';
};

type RecentNotification = {
	id: string;
	title: string;
	channel: string;
	sentAt: string;
	openRate: number;
	status: 'delivered' | 'pending' | 'failed';
};

const StatCard = ({ title, value, change, changeLabel }: MetricCard) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="mt-1 text-2xl font-bold">{value}</p>
				</div>
				<div
					className={`flex items-center gap-1 text-sm ${
						change >= 0 ? 'text-emerald-500' : 'text-destructive'
					}`}
				>
					{change >= 0 ? (
						<ArrowUpRight className="size-4" />
					) : (
						<ArrowDownRight className="size-4" />
					)}
					{Math.abs(change)}%
				</div>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">{changeLabel}</p>
		</CardContent>
	</Card>
);

const ChannelPerformanceRow = ({
	name,
	sent,
	delivered,
	opened,
	clicked,
	channel,
}: NotificationMetric) => {
	const deliveryRate = Math.round((delivered / sent) * 100);
	const openRate = Math.round((opened / delivered) * 100);
	const clickRate = Math.round((clicked / opened) * 100);

	return (
		<TableRow>
			<TableCell>
				<div className="flex items-center gap-2">
					{channel === 'email' && (
						<Mail className="size-4 text-muted-foreground" />
					)}
					{channel === 'push' && (
						<Bell className="size-4 text-muted-foreground" />
					)}
					{channel === 'sms' && (
						<Smartphone className="size-4 text-muted-foreground" />
					)}
					<span className="font-medium">{name}</span>
				</div>
			</TableCell>
			<TableCell>{sent.toLocaleString()}</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Progress value={deliveryRate} className="h-2 w-16" />
					<span className="text-sm text-muted-foreground">{deliveryRate}%</span>
				</div>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Progress value={openRate} className="h-2 w-16" />
					<span className="text-sm text-muted-foreground">{openRate}%</span>
				</div>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<Progress value={clickRate} className="h-2 w-16" />
					<span className="text-sm text-muted-foreground">{clickRate}%</span>
				</div>
			</TableCell>
		</TableRow>
	);
};

const RecentRow = ({
	title,
	channel,
	sentAt,
	openRate,
	status,
}: RecentNotification) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div
				className={`size-2 rounded-full ${
					status === 'delivered'
						? 'bg-emerald-500'
						: status === 'pending'
							? 'bg-amber-500'
							: 'bg-destructive'
				}`}
			/>
			<div>
				<p className="font-medium">{title}</p>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span>{channel}</span>
					<span>•</span>
					<span>{sentAt}</span>
				</div>
			</div>
		</div>
		<div className="flex items-center gap-3">
			<div className="text-right">
				<p className="text-sm font-medium">{openRate}%</p>
				<p className="text-xs text-muted-foreground">Open rate</p>
			</div>
			<Button variant="ghost" size="icon-sm">
				<Eye className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const stats: MetricCard[] = [
		{
			title: 'Total Sent',
			value: '24,847',
			change: 12,
			changeLabel: 'vs last month',
		},
		{
			title: 'Delivery Rate',
			value: '98.5%',
			change: 0.3,
			changeLabel: 'vs last month',
		},
		{
			title: 'Open Rate',
			value: '42.3%',
			change: -2.1,
			changeLabel: 'vs last month',
		},
		{
			title: 'Click Rate',
			value: '8.7%',
			change: 1.5,
			changeLabel: 'vs last month',
		},
	];

	const channelMetrics: NotificationMetric[] = [
		{
			id: '1',
			name: 'Email',
			sent: 15420,
			delivered: 15100,
			opened: 6342,
			clicked: 891,
			channel: 'email',
		},
		{
			id: '2',
			name: 'Push',
			sent: 8240,
			delivered: 8200,
			opened: 4920,
			clicked: 738,
			channel: 'push',
		},
		{
			id: '3',
			name: 'SMS',
			sent: 1187,
			delivered: 1180,
			opened: 1062,
			clicked: 212,
			channel: 'sms',
		},
	];

	const recentNotifications: RecentNotification[] = [
		{
			id: '1',
			title: 'Flash Sale Alert',
			channel: 'Email',
			sentAt: '2 hours ago',
			openRate: 54,
			status: 'delivered',
		},
		{
			id: '2',
			title: 'Order Shipped',
			channel: 'Push',
			sentAt: '4 hours ago',
			openRate: 78,
			status: 'delivered',
		},
		{
			id: '3',
			title: 'Weekly Digest',
			channel: 'Email',
			sentAt: '1 day ago',
			openRate: 32,
			status: 'delivered',
		},
		{
			id: '4',
			title: 'Price Drop Alert',
			channel: 'Email',
			sentAt: '2 days ago',
			openRate: 45,
			status: 'delivered',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
						{stats.map((stat) => (
							<StatCard key={stat.title} {...stat} />
						))}
					</div>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<BarChart3 className="size-5 text-primary" />
								</div>
								<div>
									<CardTitle>Channel Performance</CardTitle>
									<CardDescription>
										Notification metrics by channel
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Channel</TableHead>
										<TableHead>Sent</TableHead>
										<TableHead>Delivery Rate</TableHead>
										<TableHead>Open Rate</TableHead>
										<TableHead>Click Rate</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{channelMetrics.map((metric) => (
										<ChannelPerformanceRow key={metric.id} {...metric} />
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-base">
										Recent Notifications
									</CardTitle>
									<CardDescription>
										Performance of recently sent notifications
									</CardDescription>
								</div>
								<Button variant="outline" size="sm">
									View All
								</Button>
							</div>
						</CardHeader>
						<CardContent className="divide-y pt-2">
							{recentNotifications.map((notification) => (
								<RecentRow key={notification.id} {...notification} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
