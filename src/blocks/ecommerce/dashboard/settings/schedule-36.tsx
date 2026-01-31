import {
	Bell,
	Calendar,
	Check,
	ChevronRight,
	Clock,
	Edit2,
	Mail,
	MessageSquare,
	MoreVertical,
	Plus,
	Repeat,
	Trash2,
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
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type ScheduledNotification = {
	id: string;
	title: string;
	message: string;
	channel: 'email' | 'push' | 'sms';
	schedule: string;
	nextRun: string;
	recurring: boolean;
	active: boolean;
};

type NotificationTemplate = {
	id: string;
	name: string;
	type: string;
	lastUsed: string;
};

const ChannelIcon = ({ channel }: { channel: string }) => {
	const icons = {
		email: Mail,
		push: Bell,
		sms: MessageSquare,
	};
	const Icon = icons[channel as keyof typeof icons] || Bell;
	return <Icon className="size-4" />;
};

const ScheduledNotificationCard = ({
	title,
	message,
	channel,
	schedule,
	nextRun,
	recurring,
	active,
}: ScheduledNotification) => (
	<div
		className={`rounded-lg border p-4 transition-all ${
			active ? 'border-primary/30 bg-primary/5' : 'opacity-60'
		}`}
	>
		<div className="flex items-start justify-between">
			<div className="flex items-start gap-3">
				<div
					className={`flex size-10 items-center justify-center rounded-lg ${
						active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
					}`}
				>
					<ChannelIcon channel={channel} />
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h4 className="font-medium">{title}</h4>
						{recurring && (
							<Badge variant="secondary" className="text-xs gap-1">
								<Repeat className="size-3" />
								Recurring
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground line-clamp-1">{message}</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Switch defaultChecked={active} />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Edit2 className="mr-2 size-4" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Repeat className="mr-2 size-4" />
							Duplicate
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 size-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
		<div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
			<span className="flex items-center gap-1">
				<Calendar className="size-3" />
				{schedule}
			</span>
			<span className="flex items-center gap-1">
				<Clock className="size-3" />
				Next: {nextRun}
			</span>
		</div>
	</div>
);

const TemplateRow = ({ name, type, lastUsed }: NotificationTemplate) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<h4 className="font-medium">{name}</h4>
			<p className="text-xs text-muted-foreground">{type}</p>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-xs text-muted-foreground">{lastUsed}</span>
			<Button variant="ghost" size="sm">
				Use
			</Button>
		</div>
	</div>
);

export default function Main() {
	const scheduledNotifications: ScheduledNotification[] = [
		{
			id: '1',
			title: 'Weekly Sales Report',
			message: 'Your weekly sales summary is ready to view',
			channel: 'email',
			schedule: 'Every Monday at 9:00 AM',
			nextRun: 'Mon, Jan 27',
			recurring: true,
			active: true,
		},
		{
			id: '2',
			title: 'Inventory Check Reminder',
			message: 'Time to review your inventory levels',
			channel: 'push',
			schedule: 'Daily at 6:00 PM',
			nextRun: 'Today, 6:00 PM',
			recurring: true,
			active: true,
		},
		{
			id: '3',
			title: 'Flash Sale Announcement',
			message: 'Upcoming flash sale starting in 1 hour',
			channel: 'email',
			schedule: 'Feb 14, 2026 at 10:00 AM',
			nextRun: 'Feb 14, 10:00 AM',
			recurring: false,
			active: true,
		},
		{
			id: '4',
			title: 'Monthly Newsletter',
			message: 'Monthly product updates and tips',
			channel: 'email',
			schedule: 'First of every month',
			nextRun: 'Feb 1',
			recurring: true,
			active: false,
		},
	];

	const templates: NotificationTemplate[] = [
		{ id: '1', name: 'Order Confirmation', type: 'Transactional', lastUsed: '2 hours ago' },
		{ id: '2', name: 'Shipping Update', type: 'Transactional', lastUsed: '1 day ago' },
		{ id: '3', name: 'Promotional Offer', type: 'Marketing', lastUsed: '1 week ago' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Calendar className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Scheduled Notifications</CardTitle>
											<CardDescription>
												Automate notifications on a schedule
											</CardDescription>
										</div>
									</div>
									<Button className="gap-2">
										<Plus className="size-4" />
										Schedule New
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{scheduledNotifications.map((notification) => (
									<ScheduledNotificationCard key={notification.id} {...notification} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Quick Stats</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Active schedules</span>
									<span className="font-semibold">3</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Sent this week</span>
									<span className="font-semibold">24</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Pending</span>
									<span className="font-semibold">5</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Templates</CardTitle>
								<CardDescription>
									Quick-start templates
								</CardDescription>
							</CardHeader>
							<CardContent className="divide-y">
								{templates.map((template) => (
									<TemplateRow key={template.id} {...template} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
