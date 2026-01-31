import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	MessageSquare,
	Star,
	AlertCircle,
	CheckCircle,
	Clock,
	type LucideIcon,
} from 'lucide-react';

interface SupportTicket {
	id: string;
	ticketId: string;
	subject: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	priority: 'low' | 'medium' | 'high' | 'urgent';
	status: 'open' | 'in-progress' | 'resolved' | 'closed';
	lastUpdate: string;
	assignee?: {
		name: string;
		initials: string;
	};
	messageCount: number;
}

interface SupportTimelineProps {
	title: string;
	subtitle?: string;
	tickets: SupportTicket[];
}

const PriorityBadge = ({ priority }: { priority: SupportTicket['priority'] }) => {
	const config = {
		low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
		medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		high: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		urgent: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge variant="outline" className={config[priority]}>
			{priority.charAt(0).toUpperCase() + priority.slice(1)}
		</Badge>
	);
};

const StatusIcon = ({ status }: { status: SupportTicket['status'] }) => {
	const config: Record<SupportTicket['status'], { icon: LucideIcon; className: string }> = {
		open: { icon: AlertCircle, className: 'text-blue-400' },
		'in-progress': { icon: Clock, className: 'text-amber-400' },
		resolved: { icon: CheckCircle, className: 'text-emerald-400' },
		closed: { icon: CheckCircle, className: 'text-muted-foreground' },
	};

	const { icon: Icon, className } = config[status];

	return <Icon className={`size-5 ${className}`} />;
};

const TicketCard = ({ ticket }: { ticket: SupportTicket }) => (
	<div className="group relative">
		<div className="absolute -left-[21px] top-6 flex size-10 items-center justify-center rounded-full border-2 border-border bg-card">
			<StatusIcon status={ticket.status} />
		</div>
		<div className="ml-8 rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
			<div className="flex flex-col gap-3">
				<div className="flex items-start justify-between gap-2">
					<div className="flex items-center gap-2">
						<span className="text-xs font-mono text-muted-foreground">
							{ticket.ticketId}
						</span>
						<PriorityBadge priority={ticket.priority} />
					</div>
					<span className="text-xs text-muted-foreground">
						{ticket.lastUpdate}
					</span>
				</div>
				<h4 className="font-medium text-foreground line-clamp-1">
					{ticket.subject}
				</h4>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Avatar className="size-6">
							<AvatarImage
								src={ticket.customer.avatar}
								alt={ticket.customer.name}
							/>
							<AvatarFallback className="text-xs bg-secondary">
								{ticket.customer.initials}
							</AvatarFallback>
						</Avatar>
						<span className="text-sm text-muted-foreground">
							{ticket.customer.name}
						</span>
					</div>
					<div className="flex items-center gap-3">
						{ticket.assignee && (
							<div className="flex items-center gap-1">
								<Avatar className="size-5 border border-primary/30">
									<AvatarFallback className="text-[10px] bg-primary/20 text-primary">
										{ticket.assignee.initials}
									</AvatarFallback>
								</Avatar>
							</div>
						)}
						<div className="flex items-center gap-1 text-muted-foreground">
							<MessageSquare className="size-3.5" />
							<span className="text-xs">{ticket.messageCount}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const SupportTimeline = ({ title, subtitle, tickets }: SupportTimelineProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader>
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			{subtitle && (
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			)}
		</CardHeader>
		<CardContent>
			<div className="relative border-l-2 border-border pl-4 space-y-6">
				{tickets.map((ticket) => (
					<TicketCard key={ticket.id} ticket={ticket} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const supportTickets: SupportTicket[] = [
		{
			id: '1',
			ticketId: 'TKT-001847',
			subject: 'Order not delivered - tracking shows delivered',
			customer: {
				name: 'Jennifer Adams',
				email: 'jennifer@example.com',
				initials: 'JA',
			},
			priority: 'urgent',
			status: 'open',
			lastUpdate: '5 min ago',
			messageCount: 3,
		},
		{
			id: '2',
			ticketId: 'TKT-001846',
			subject: 'Request for product exchange - wrong size received',
			customer: {
				name: 'Robert Chen',
				email: 'robert@example.com',
				initials: 'RC',
			},
			priority: 'high',
			status: 'in-progress',
			lastUpdate: '1 hour ago',
			assignee: { name: 'Sarah', initials: 'SK' },
			messageCount: 7,
		},
		{
			id: '3',
			ticketId: 'TKT-001845',
			subject: 'Billing inquiry - duplicate charge on credit card',
			customer: {
				name: 'Maria Garcia',
				email: 'maria@example.com',
				initials: 'MG',
			},
			priority: 'medium',
			status: 'in-progress',
			lastUpdate: '3 hours ago',
			assignee: { name: 'Mike', initials: 'MJ' },
			messageCount: 5,
		},
		{
			id: '4',
			ticketId: 'TKT-001844',
			subject: 'Product warranty claim for defective item',
			customer: {
				name: 'David Park',
				email: 'david@example.com',
				initials: 'DP',
			},
			priority: 'low',
			status: 'resolved',
			lastUpdate: 'Yesterday',
			assignee: { name: 'Emily', initials: 'ED' },
			messageCount: 12,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<SupportTimeline
					title="Support Tickets"
					subtitle="Recent customer support activity"
					tickets={supportTickets}
				/>
			</div>
		</section>
	);
}
