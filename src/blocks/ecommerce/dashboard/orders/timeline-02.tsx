import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Clock,
	Package,
	Truck,
	CheckCircle2,
	MessageSquare,
	AlertCircle,
	Edit,
	Eye,
} from 'lucide-react';

interface ActivityEvent {
	id: string;
	type:
		| 'status_change'
		| 'note_added'
		| 'customer_contact'
		| 'issue_reported'
		| 'edit';
	user: { name: string; avatar: string; initials: string };
	title: string;
	description: string;
	timestamp: string;
	metadata?: Record<string, string>;
}

interface ActivityTimelineProps {
	events: ActivityEvent[];
	labels: { viewAll: string };
}

interface ActivityItemProps {
	event: ActivityEvent;
	isLast: boolean;
}

const EventTypeConfig: Record<
	ActivityEvent['type'],
	{ icon: typeof Clock; className: string; bgClass: string }
> = {
	status_change: {
		icon: Package,
		className: 'text-primary',
		bgClass: 'bg-primary/10',
	},
	note_added: {
		icon: Edit,
		className: 'text-blue-500',
		bgClass: 'bg-blue-500/10',
	},
	customer_contact: {
		icon: MessageSquare,
		className: 'text-accent',
		bgClass: 'bg-accent/10',
	},
	issue_reported: {
		icon: AlertCircle,
		className: 'text-destructive',
		bgClass: 'bg-destructive/10',
	},
	edit: { icon: Edit, className: 'text-muted-foreground', bgClass: 'bg-muted' },
};

const ActivityItem = ({ event, isLast }: ActivityItemProps) => {
	const { icon: Icon, className, bgClass } = EventTypeConfig[event.type];
	return (
		<div className="flex gap-4 group">
			<div className="flex flex-col items-center">
				<Avatar className="size-8 ring-2 ring-background">
					<AvatarImage src={event.user.avatar} alt={event.user.name} />
					<AvatarFallback className="text-xs bg-primary/10 text-primary">
						{event.user.initials}
					</AvatarFallback>
				</Avatar>
				{!isLast && <div className="w-0.5 flex-1 bg-border my-2" />}
			</div>

			<div className={`flex-1 ${isLast ? '' : 'pb-6'}`}>
				<div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors">
					<div
						className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${bgClass}`}
					>
						<Icon className={`size-4 ${className}`} />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium">{event.user.name}</span>
							<span className="text-muted-foreground">•</span>
							<span className="text-xs text-muted-foreground">
								{event.timestamp}
							</span>
						</div>
						<p className="font-medium text-sm mb-0.5">{event.title}</p>
						<p className="text-sm text-muted-foreground">{event.description}</p>
						{event.metadata && (
							<div className="flex flex-wrap gap-2 mt-2">
								{Object.entries(event.metadata).map(([key, value]) => (
									<Badge key={key} variant="secondary" className="text-xs">
										{key}: {value}
									</Badge>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const events: ActivityEvent[] = [
		{
			id: '1',
			type: 'status_change',
			user: { name: 'John Smith', avatar: '', initials: 'JS' },
			title: 'Status updated to Shipped',
			description: 'Order has been shipped via UPS Express',
			timestamp: '2 hours ago',
			metadata: { Tracking: '1Z999AA1012345' },
		},
		{
			id: '2',
			type: 'customer_contact',
			user: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' },
			title: 'Customer contacted',
			description: 'Called customer to confirm shipping address',
			timestamp: '5 hours ago',
		},
		{
			id: '3',
			type: 'note_added',
			user: { name: 'Mike Chen', avatar: '', initials: 'MC' },
			title: 'Note added',
			description: 'Customer requested gift wrapping - added to package',
			timestamp: 'Yesterday',
		},
		{
			id: '4',
			type: 'issue_reported',
			user: { name: 'Emily Davis', avatar: '', initials: 'ED' },
			title: 'Issue reported',
			description: 'Item temporarily out of stock, waiting for restock',
			timestamp: '2 days ago',
			metadata: { Resolution: 'Pending' },
		},
		{
			id: '5',
			type: 'status_change',
			user: { name: 'System', avatar: '', initials: 'SY' },
			title: 'Order received',
			description: 'New order received and added to processing queue',
			timestamp: '3 days ago',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-semibold">Activity Log</h2>
					<Button variant="outline" size="sm">
						<Eye className="size-4 mr-1.5" />
						View All
					</Button>
				</div>
				<div>
					{events.map((event, i) => (
						<ActivityItem
							key={event.id}
							event={event}
							isLast={i === events.length - 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
