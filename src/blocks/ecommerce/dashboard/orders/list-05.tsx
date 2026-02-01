import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	AlertTriangle,
	Clock,
	RefreshCw,
	X,
	ChevronRight,
	MessageSquare,
} from 'lucide-react';

interface IssueOrder {
	id: string;
	customer: { name: string; avatar: string; initials: string };
	issue: {
		type: 'delayed' | 'missing_item' | 'wrong_item' | 'damaged' | 'cancelled';
		title: string;
		description: string;
		reportedAt: string;
	};
	priority: 'low' | 'medium' | 'high' | 'urgent';
	status: 'open' | 'in_progress' | 'resolved';
	orderTotal: string;
}

interface IssueOrderRowProps {
	order: IssueOrder;
	labels: { resolve: string; contact: string };
}

const PriorityBadge = ({ priority }: { priority: IssueOrder['priority'] }) => {
	const config: Record<
		IssueOrder['priority'],
		{ className: string; label: string }
	> = {
		low: { className: 'bg-muted text-muted-foreground', label: 'Low' },
		medium: { className: 'bg-yellow-500/10 text-yellow-600', label: 'Medium' },
		high: { className: 'bg-orange-500/10 text-orange-600', label: 'High' },
		urgent: {
			className: 'bg-destructive/10 text-destructive',
			label: 'Urgent',
		},
	};
	const { className, label } = config[priority];
	return <Badge className={className}>{label}</Badge>;
};

const IssueTypeIcon = ({ type }: { type: IssueOrder['issue']['type'] }) => {
	const icons: Record<
		IssueOrder['issue']['type'],
		{ icon: typeof Clock; className: string }
	> = {
		delayed: { icon: Clock, className: 'text-yellow-500 bg-yellow-500/10' },
		missing_item: {
			icon: AlertTriangle,
			className: 'text-orange-500 bg-orange-500/10',
		},
		wrong_item: { icon: RefreshCw, className: 'text-blue-500 bg-blue-500/10' },
		damaged: {
			icon: AlertTriangle,
			className: 'text-destructive bg-destructive/10',
		},
		cancelled: { icon: X, className: 'text-muted-foreground bg-muted' },
	};
	const { icon: Icon, className } = icons[type];
	return (
		<div
			className={`size-10 rounded-lg flex items-center justify-center ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const StatusIndicator = ({ status }: { status: IssueOrder['status'] }) => {
	const config: Record<
		IssueOrder['status'],
		{ dotClass: string; label: string }
	> = {
		open: { dotClass: 'bg-destructive', label: 'Open' },
		in_progress: { dotClass: 'bg-yellow-500', label: 'In Progress' },
		resolved: { dotClass: 'bg-accent', label: 'Resolved' },
	};
	const { dotClass, label } = config[status];
	return (
		<span className="flex items-center gap-1.5 text-sm text-muted-foreground">
			<span className={`size-2 rounded-full ${dotClass}`} />
			{label}
		</span>
	);
};

const IssueOrderRow = ({ order, labels }: IssueOrderRowProps) => (
	<div
		className={`p-4 rounded-xl border transition-all hover:shadow-md ${order.priority === 'urgent' ? 'border-destructive/30 bg-destructive/5' : 'border-border/50 bg-card/50'}`}
	>
		<div className="flex items-start gap-4">
			<IssueTypeIcon type={order.issue.type} />

			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<span className="font-semibold">{order.issue.title}</span>
					<span className="text-xs text-muted-foreground font-mono">
						{order.id}
					</span>
				</div>
				<p className="text-sm text-muted-foreground mb-2">
					{order.issue.description}
				</p>

				<div className="flex items-center gap-3">
					<Avatar className="size-6">
						<AvatarImage
							src={order.customer.avatar}
							alt={order.customer.name}
						/>
						<AvatarFallback className="text-xs">
							{order.customer.initials}
						</AvatarFallback>
					</Avatar>
					<span className="text-sm">{order.customer.name}</span>
					<Separator orientation="vertical" className="h-4" />
					<span className="text-sm text-muted-foreground">
						{order.orderTotal}
					</span>
					<Separator orientation="vertical" className="h-4" />
					<span className="text-xs text-muted-foreground">
						{order.issue.reportedAt}
					</span>
				</div>
			</div>

			<div className="flex flex-col items-end gap-2">
				<div className="flex items-center gap-2">
					<PriorityBadge priority={order.priority} />
					<StatusIndicator status={order.status} />
				</div>
				<div className="flex items-center gap-2 mt-2">
					<Button variant="outline" size="sm" className="gap-1.5">
						<MessageSquare className="size-4" />
						{labels.contact}
					</Button>
					<Button size="sm" className="gap-1.5">
						{labels.resolve}
						<ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	</div>
);

export default function Main() {
	const labels = { resolve: 'Resolve', contact: 'Contact' };

	const orders: IssueOrder[] = [
		{
			id: '#ORD-001',
			customer: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' },
			issue: {
				type: 'delayed',
				title: 'Delivery Delayed',
				description: 'Package stuck in transit for 5 days',
				reportedAt: '2 hours ago',
			},
			priority: 'high',
			status: 'in_progress',
			orderTotal: '$189.00',
		},
		{
			id: '#ORD-002',
			customer: { name: 'Mike Chen', avatar: '', initials: 'MC' },
			issue: {
				type: 'wrong_item',
				title: 'Wrong Item Received',
				description: 'Customer received blue variant instead of black',
				reportedAt: '5 hours ago',
			},
			priority: 'medium',
			status: 'open',
			orderTotal: '$79.00',
		},
		{
			id: '#ORD-003',
			customer: { name: 'Emily Davis', avatar: '', initials: 'ED' },
			issue: {
				type: 'damaged',
				title: 'Damaged Package',
				description:
					'Product arrived with visible damage to packaging and item',
				reportedAt: '1 day ago',
			},
			priority: 'urgent',
			status: 'open',
			orderTotal: '$459.00',
		},
		{
			id: '#ORD-004',
			customer: { name: 'Alex Brown', avatar: '', initials: 'AB' },
			issue: {
				type: 'missing_item',
				title: 'Missing Item',
				description: 'One item from the order was not included',
				reportedAt: '2 days ago',
			},
			priority: 'medium',
			status: 'resolved',
			orderTotal: '$234.00',
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<div className="space-y-3">
					{orders.map((order) => (
						<IssueOrderRow key={order.id} order={order} labels={labels} />
					))}
				</div>
			</div>
		</section>
	);
}
