import {
	AlertCircle,
	Bell,
	BellOff,
	Check,
	Clock,
	Filter,
	Mail,
	MessageSquare,
	MoreVertical,
	RefreshCw,
	Search,
	Smartphone,
	Trash2,
	X,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

type NotificationLog = {
	id: string;
	recipient: {
		name: string;
		email: string;
		avatar?: string;
	};
	subject: string;
	channel: 'email' | 'push' | 'sms';
	status: 'delivered' | 'failed' | 'pending' | 'bounced';
	sentAt: string;
	openedAt?: string;
};

const ChannelIcon = ({ channel }: { channel: string }) => {
	const icons = {
		email: Mail,
		push: Bell,
		sms: Smartphone,
	};
	const Icon = icons[channel as keyof typeof icons] || Bell;
	return <Icon className="size-4" />;
};

const StatusBadge = ({ status }: { status: NotificationLog['status'] }) => {
	const styles = {
		delivered: 'bg-emerald-500/10 text-emerald-500 border-0',
		failed: 'bg-destructive/10 text-destructive border-0',
		pending: 'bg-amber-500/10 text-amber-500 border-0',
		bounced: 'bg-destructive/10 text-destructive border-0',
	};

	return (
		<Badge className={styles[status]}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
};

const NotificationLogRow = ({
	recipient,
	subject,
	channel,
	status,
	sentAt,
	openedAt,
}: NotificationLog) => (
	<div className="flex items-center gap-4 py-4">
		<Checkbox />
		<Avatar className="size-10">
			<AvatarImage src={recipient.avatar} />
			<AvatarFallback>
				{recipient.name.split(' ').map((n) => n[0]).join('')}
			</AvatarFallback>
		</Avatar>
		<div className="min-w-0 flex-1">
			<div className="flex items-center gap-2">
				<h4 className="font-medium truncate">{recipient.name}</h4>
				<div className="flex size-6 items-center justify-center rounded bg-muted">
					<ChannelIcon channel={channel} />
				</div>
			</div>
			<p className="text-sm text-muted-foreground truncate">{subject}</p>
		</div>
		<div className="hidden @lg:block text-right">
			<p className="text-sm text-muted-foreground">{sentAt}</p>
			{openedAt && (
				<p className="text-xs text-muted-foreground">Opened: {openedAt}</p>
			)}
		</div>
		<StatusBadge status={status} />
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon-sm">
					<MoreVertical className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<RefreshCw className="mr-2 size-4" />
					Resend
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Search className="mr-2 size-4" />
					View Details
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-destructive">
					<Trash2 className="mr-2 size-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

export default function Main() {
	const logs: NotificationLog[] = [
		{
			id: '1',
			recipient: { name: 'John Doe', email: 'john@example.com', avatar: 'https://avatars.githubusercontent.com/u/252440198?v=4' },
			subject: 'Your order #12345 has been shipped',
			channel: 'email',
			status: 'delivered',
			sentAt: '2 mins ago',
			openedAt: '1 min ago',
		},
		{
			id: '2',
			recipient: { name: 'Jane Smith', email: 'jane@example.com' },
			subject: 'Flash Sale: 50% off everything!',
			channel: 'push',
			status: 'delivered',
			sentAt: '15 mins ago',
		},
		{
			id: '3',
			recipient: { name: 'Bob Wilson', email: 'bob@example.com' },
			subject: 'Your password has been changed',
			channel: 'email',
			status: 'failed',
			sentAt: '1 hour ago',
		},
		{
			id: '4',
			recipient: { name: 'Alice Brown', email: 'alice@example.com' },
			subject: 'Welcome to our store!',
			channel: 'email',
			status: 'bounced',
			sentAt: '2 hours ago',
		},
		{
			id: '5',
			recipient: { name: 'Mike Johnson', email: 'mike@example.com' },
			subject: 'Order confirmation: #12346',
			channel: 'sms',
			status: 'pending',
			sentAt: '3 hours ago',
		},
	];

	const stats = [
		{ label: 'Total Sent', value: '1,247', color: '' },
		{ label: 'Delivered', value: '1,198', color: 'text-emerald-500' },
		{ label: 'Failed', value: '23', color: 'text-destructive' },
		{ label: 'Pending', value: '26', color: 'text-amber-500' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
						{stats.map((stat) => (
							<Card key={stat.label}>
								<CardContent className="pt-6 text-center">
									<p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
									<p className="text-sm text-muted-foreground">{stat.label}</p>
								</CardContent>
							</Card>
						))}
					</div>

					<Card>
						<CardHeader className="border-b">
							<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<Clock className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Notification History</CardTitle>
										<CardDescription>
											View and manage sent notifications
										</CardDescription>
									</div>
								</div>
								<div className="flex flex-wrap gap-2">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input placeholder="Search..." className="w-48 pl-9" />
									</div>
									<Select defaultValue="all">
										<SelectTrigger className="w-32">
											<SelectValue placeholder="Channel" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Channels</SelectItem>
											<SelectItem value="email">Email</SelectItem>
											<SelectItem value="push">Push</SelectItem>
											<SelectItem value="sms">SMS</SelectItem>
										</SelectContent>
									</Select>
									<Select defaultValue="all">
										<SelectTrigger className="w-32">
											<SelectValue placeholder="Status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All Status</SelectItem>
											<SelectItem value="delivered">Delivered</SelectItem>
											<SelectItem value="failed">Failed</SelectItem>
											<SelectItem value="pending">Pending</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardHeader>
						<CardContent className="divide-y">
							{logs.map((log) => (
								<NotificationLogRow key={log.id} {...log} />
							))}
						</CardContent>
					</Card>

					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">Showing 5 of 1,247 notifications</p>
						<div className="flex gap-2">
							<Button variant="outline" size="sm" disabled>
								Previous
							</Button>
							<Button variant="outline" size="sm">
								Next
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
