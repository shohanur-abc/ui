import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	MessageSquare,
	Headphones,
	Mail,
	MessageCircle,
	Phone,
	Clock,
	CheckCircle2,
	AlertCircle,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';

interface SupportTicket {
	id: string;
	channel: 'chat' | 'email' | 'phone' | 'social';
	priority: 'urgent' | 'high' | 'medium' | 'low';
	subject: string;
	customer: {
		name: string;
		avatar?: string;
		initials: string;
		isVip?: boolean;
	};
	assignee?: {
		name: string;
		avatar?: string;
		initials: string;
	};
	status: 'open' | 'in_progress' | 'waiting' | 'resolved';
	waitTime: string;
	lastMessage: string;
	timestamp: string;
}

interface SupportStreamProps {
	title: string;
	tickets: SupportTicket[];
	stats: {
		openTickets: number;
		avgResponseTime: string;
		resolvedToday: number;
	};
}

const ChannelIcon = ({ channel }: { channel: SupportTicket['channel'] }) => {
	const config: Record<
		SupportTicket['channel'],
		{ icon: LucideIcon; className: string }
	> = {
		chat: { icon: MessageCircle, className: 'bg-blue-500/20 text-blue-400' },
		email: { icon: Mail, className: 'bg-purple-500/20 text-purple-400' },
		phone: { icon: Phone, className: 'bg-emerald-500/20 text-emerald-400' },
		social: { icon: MessageSquare, className: 'bg-pink-500/20 text-pink-400' },
	};

	const { icon: Icon, className } = config[channel];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const PriorityBadge = ({ priority }: { priority: SupportTicket['priority'] }) => {
	const config = {
		urgent: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
		medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		low: 'bg-muted text-muted-foreground border-border',
	};

	return (
		<Badge variant="outline" className={`text-xs uppercase ${config[priority]}`}>
			{priority}
		</Badge>
	);
};

const StatusBadge = ({ status }: { status: SupportTicket['status'] }) => {
	const config = {
		open: { label: 'Open', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
		in_progress: { label: 'In Progress', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
		waiting: { label: 'Waiting', className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
		resolved: { label: 'Resolved', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
	};

	return (
		<Badge variant="outline" className={config[status].className}>
			{config[status].label}
		</Badge>
	);
};

const TicketCard = ({ ticket }: { ticket: SupportTicket }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			ticket.priority === 'urgent'
				? 'border-rose-500/30 bg-rose-500/5'
				: 'border-border/50 bg-card/80 hover:border-primary/30'
		}`}
	>
		<div className="flex gap-4">
			<ChannelIcon channel={ticket.channel} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex items-center gap-2">
						<PriorityBadge priority={ticket.priority} />
						<StatusBadge status={ticket.status} />
					</div>
					<span className="text-xs text-muted-foreground">{ticket.timestamp}</span>
				</div>
				<h4 className="font-medium text-foreground mb-1 line-clamp-1">
					{ticket.subject}
				</h4>
				<p className="text-sm text-muted-foreground line-clamp-1 mb-3">
					{ticket.lastMessage}
				</p>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<Avatar className="size-6">
								<AvatarImage
									src={ticket.customer.avatar}
									alt={ticket.customer.name}
								/>
								<AvatarFallback className="text-[10px] bg-secondary">
									{ticket.customer.initials}
								</AvatarFallback>
							</Avatar>
							<span className="text-sm text-foreground">
								{ticket.customer.name}
							</span>
							{ticket.customer.isVip && (
								<Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
									VIP
								</Badge>
							)}
						</div>
						{ticket.assignee && (
							<>
								<ArrowRight className="size-3 text-muted-foreground" />
								<Avatar className="size-6">
									<AvatarImage
										src={ticket.assignee.avatar}
										alt={ticket.assignee.name}
									/>
									<AvatarFallback className="text-[10px] bg-primary/20 text-primary">
										{ticket.assignee.initials}
									</AvatarFallback>
								</Avatar>
							</>
						)}
					</div>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<Clock className="size-3" />
						<span>{ticket.waitTime}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const SupportStats = ({ stats }: { stats: SupportStreamProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex flex-col p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<AlertCircle className="size-4 text-rose-400 mb-1" />
			<span className="text-xl font-bold text-rose-400">{stats.openTickets}</span>
			<span className="text-xs text-muted-foreground">Open</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<Clock className="size-4 text-blue-400 mb-1" />
			<span className="text-xl font-bold text-blue-400">{stats.avgResponseTime}</span>
			<span className="text-xs text-muted-foreground">Avg Response</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<CheckCircle2 className="size-4 text-emerald-400 mb-1" />
			<span className="text-xl font-bold text-emerald-400">{stats.resolvedToday}</span>
			<span className="text-xs text-muted-foreground">Resolved</span>
		</div>
	</div>
);

const SupportStream = ({ title, tickets, stats }: SupportStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Headphones className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				View Queue
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<SupportStats stats={stats} />
			<div className="space-y-3 max-h-[400px] overflow-y-auto">
				{tickets.map((ticket) => (
					<TicketCard key={ticket.id} ticket={ticket} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const tickets: SupportTicket[] = [
		{
			id: '1',
			channel: 'chat',
			priority: 'urgent',
			subject: 'Order not delivered - 5 days overdue',
			customer: { name: 'Sarah Chen', initials: 'SC', isVip: true },
			assignee: { name: 'Alex Kim', initials: 'AK' },
			status: 'in_progress',
			waitTime: '2 min',
			lastMessage: "I've been waiting for my order for over a week now...",
			timestamp: 'now',
		},
		{
			id: '2',
			channel: 'email',
			priority: 'high',
			subject: 'Refund request for damaged item',
			customer: { name: 'Mike Johnson', initials: 'MJ' },
			status: 'open',
			waitTime: '15 min',
			lastMessage: 'The product arrived broken and I need a refund or replacement.',
			timestamp: '15m ago',
		},
		{
			id: '3',
			channel: 'phone',
			priority: 'medium',
			subject: 'Question about warranty coverage',
			customer: { name: 'Emily Davis', initials: 'ED' },
			assignee: { name: 'Jordan Lee', initials: 'JL' },
			status: 'waiting',
			waitTime: '1 hour',
			lastMessage: 'Customer is waiting for warranty documentation.',
			timestamp: '1h ago',
		},
		{
			id: '4',
			channel: 'social',
			priority: 'low',
			subject: 'Product recommendation request',
			customer: { name: 'Lisa Anderson', initials: 'LA' },
			status: 'open',
			waitTime: '30 min',
			lastMessage: 'Looking for suggestions for a gift under $100.',
			timestamp: '30m ago',
		},
		{
			id: '5',
			channel: 'chat',
			priority: 'high',
			subject: 'Payment issue - double charged',
			customer: { name: 'David Kim', initials: 'DK', isVip: true },
			assignee: { name: 'Nina Patel', initials: 'NP' },
			status: 'in_progress',
			waitTime: '5 min',
			lastMessage: 'My card was charged twice for the same order.',
			timestamp: '5m ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<SupportStream
					title="Support Queue"
					tickets={tickets}
					stats={{
						openTickets: 12,
						avgResponseTime: '4m',
						resolvedToday: 47,
					}}
				/>
			</div>
		</section>
	);
}
