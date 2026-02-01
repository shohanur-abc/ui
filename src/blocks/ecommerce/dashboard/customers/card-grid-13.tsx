import {
	CheckCircle,
	ChevronRight,
	Clock,
	ExternalLink,
	Headphones,
	MessageSquare,
	MoreHorizontal,
	Phone,
	RotateCcw,
	ThumbsUp,
	Timer,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SupportCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	supportTier: 'standard' | 'priority' | 'premium';
	activeTickets: Array<{
		id: string;
		subject: string;
		status: 'open' | 'pending' | 'resolved';
		priority: 'low' | 'medium' | 'high' | 'urgent';
		age: string;
	}>;
	totalTickets: number;
	resolvedTickets: number;
	avgResolutionTime: string;
	satisfactionScore: number;
	lastContact: string;
	preferredChannel: 'email' | 'phone' | 'chat';
}

const SupportTierBadge = ({
	tier,
}: {
	tier: SupportCustomer['supportTier'];
}) => {
	const config = {
		standard: {
			label: 'Standard',
			className: 'bg-slate-500/10 text-slate-400',
		},
		priority: { label: 'Priority', className: 'bg-blue-500/10 text-blue-500' },
		premium: {
			label: 'Premium',
			className: 'bg-violet-500/10 text-violet-500',
		},
	};
	return (
		<Badge variant="outline" className={config[tier].className}>
			<Headphones className="mr-1 size-3" />
			{config[tier].label}
		</Badge>
	);
};

const TicketStatusBadge = ({
	status,
}: {
	status: 'open' | 'pending' | 'resolved';
}) => {
	const config = {
		open: { label: 'Open', className: 'bg-blue-500/10 text-blue-500' },
		pending: { label: 'Pending', className: 'bg-amber-500/10 text-amber-500' },
		resolved: {
			label: 'Resolved',
			className: 'bg-emerald-500/10 text-emerald-500',
		},
	};
	return (
		<Badge variant="outline" className={`${config[status].className} text-xs`}>
			{config[status].label}
		</Badge>
	);
};

const PriorityIndicator = ({
	priority,
}: {
	priority: 'low' | 'medium' | 'high' | 'urgent';
}) => {
	const config = {
		low: 'bg-slate-400',
		medium: 'bg-blue-500',
		high: 'bg-amber-500',
		urgent: 'bg-red-500 animate-pulse',
	};
	return <div className={`size-2 rounded-full ${config[priority]}`} />;
};

const TicketItem = ({
	ticket,
}: {
	ticket: SupportCustomer['activeTickets'][0];
}) => (
	<div className="flex items-start gap-2 rounded-lg border bg-muted/30 p-2.5">
		<PriorityIndicator priority={ticket.priority} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<p className="text-sm font-medium truncate">{ticket.subject}</p>
				<TicketStatusBadge status={ticket.status} />
			</div>
			<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
				<span className="font-mono">#{ticket.id}</span>
				<span>•</span>
				<Clock className="size-3" />
				<span>{ticket.age}</span>
			</div>
		</div>
	</div>
);

const SatisfactionScore = ({ score }: { score: number }) => (
	<div className="flex items-center gap-2">
		<div className="flex gap-0.5">
			{[1, 2, 3, 4, 5].map((level) => (
				<ThumbsUp
					key={level}
					className={`size-3.5 ${
						score >= level * 20
							? 'text-emerald-500 fill-emerald-500'
							: 'text-muted-foreground/30'
					}`}
				/>
			))}
		</div>
		<span className="text-sm font-medium">{score}%</span>
	</div>
);

const ChannelIcon = ({
	channel,
}: {
	channel: SupportCustomer['preferredChannel'];
}) => {
	const icons = {
		email: MessageSquare,
		phone: Phone,
		chat: MessageSquare,
	};
	const Icon = icons[channel];
	return <Icon className="size-4" />;
};

const SupportCard = ({ customer }: { customer: SupportCustomer }) => {
	const hasUrgentTicket = customer.activeTickets.some(
		(t) => t.priority === 'urgent',
	);
	return (
		<Card
			className={`group transition-shadow hover:shadow-lg ${hasUrgentTicket ? 'border-red-500/30' : ''}`}
		>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<Avatar className="size-11">
							<AvatarImage src={customer.avatar} alt={customer.name} />
							<AvatarFallback className="bg-primary/10 text-primary">
								{customer.initials}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-semibold">{customer.name}</p>
							<p className="text-muted-foreground text-xs">{customer.email}</p>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon-sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<ExternalLink className="mr-2 size-4" />
								View all tickets
							</DropdownMenuItem>
							<DropdownMenuItem>Create new ticket</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Escalate account</DropdownMenuItem>
							<DropdownMenuItem>Upgrade support tier</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<SupportTierBadge tier={customer.supportTier} />
					<SatisfactionScore score={customer.satisfactionScore} />
				</div>
				<div className="grid grid-cols-3 gap-2 text-center">
					<div className="rounded-lg bg-muted/50 p-2">
						<p className="text-lg font-bold">{customer.activeTickets.length}</p>
						<p className="text-muted-foreground text-xs">Active</p>
					</div>
					<div className="rounded-lg bg-muted/50 p-2">
						<p className="text-lg font-bold text-emerald-500">
							{customer.resolvedTickets}
						</p>
						<p className="text-muted-foreground text-xs">Resolved</p>
					</div>
					<div className="rounded-lg bg-muted/50 p-2">
						<p className="text-lg font-bold">{customer.totalTickets}</p>
						<p className="text-muted-foreground text-xs">Total</p>
					</div>
				</div>
				{customer.activeTickets.length > 0 && (
					<div className="space-y-2">
						<p className="text-muted-foreground text-xs font-medium">
							Active Tickets
						</p>
						{customer.activeTickets.slice(0, 2).map((ticket) => (
							<TicketItem key={ticket.id} ticket={ticket} />
						))}
						{customer.activeTickets.length > 2 && (
							<Button variant="ghost" size="sm" className="w-full text-xs">
								+{customer.activeTickets.length - 2} more tickets
								<ChevronRight className="ml-1 size-3" />
							</Button>
						)}
					</div>
				)}
				<div className="grid grid-cols-2 gap-3 text-sm">
					<div className="flex items-center gap-2">
						<Timer className="text-muted-foreground size-4" />
						<div>
							<p className="text-muted-foreground text-xs">Avg Resolution</p>
							<p className="font-medium">{customer.avgResolutionTime}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="text-muted-foreground size-4" />
						<div>
							<p className="text-muted-foreground text-xs">Last Contact</p>
							<p className="font-medium">{customer.lastContact}</p>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
					<ChannelIcon channel={customer.preferredChannel} />
					<span className="text-muted-foreground">Prefers:</span>
					<span className="font-medium capitalize">
						{customer.preferredChannel}
					</span>
				</div>
			</CardContent>
			<CardFooter className="border-t bg-muted/20 px-4 py-3">
				<Button variant="outline" size="sm" className="w-full gap-1.5">
					<MessageSquare className="size-4" />
					Contact Customer
				</Button>
			</CardFooter>
		</Card>
	);
};

export default function Main() {
	const customers: SupportCustomer[] = [
		{
			id: '1',
			name: 'Zachary Moore',
			email: 'zachary.m@email.com',
			initials: 'ZM',
			supportTier: 'premium',
			activeTickets: [
				{
					id: 'TKT-5001',
					subject: 'Order delivery delay',
					status: 'open',
					priority: 'high',
					age: '2h ago',
				},
				{
					id: 'TKT-5002',
					subject: 'Refund not received',
					status: 'pending',
					priority: 'urgent',
					age: '1d ago',
				},
			],
			totalTickets: 15,
			resolvedTickets: 13,
			avgResolutionTime: '4.2h',
			satisfactionScore: 92,
			lastContact: '2h ago',
			preferredChannel: 'phone',
		},
		{
			id: '2',
			name: 'Alice Turner',
			email: 'alice.t@email.com',
			initials: 'AT',
			supportTier: 'priority',
			activeTickets: [
				{
					id: 'TKT-4998',
					subject: 'Product exchange request',
					status: 'pending',
					priority: 'medium',
					age: '3h ago',
				},
			],
			totalTickets: 8,
			resolvedTickets: 7,
			avgResolutionTime: '6.5h',
			satisfactionScore: 85,
			lastContact: '1d ago',
			preferredChannel: 'email',
		},
		{
			id: '3',
			name: 'Benjamin Scott',
			email: 'benjamin.s@email.com',
			initials: 'BS',
			supportTier: 'standard',
			activeTickets: [],
			totalTickets: 3,
			resolvedTickets: 3,
			avgResolutionTime: '12h',
			satisfactionScore: 100,
			lastContact: '2w ago',
			preferredChannel: 'chat',
		},
		{
			id: '4',
			name: 'Catherine Wells',
			email: 'catherine.w@email.com',
			initials: 'CW',
			supportTier: 'premium',
			activeTickets: [
				{
					id: 'TKT-4995',
					subject: 'Account access issue',
					status: 'open',
					priority: 'urgent',
					age: '30m ago',
				},
				{
					id: 'TKT-4990',
					subject: 'Billing discrepancy',
					status: 'open',
					priority: 'high',
					age: '4h ago',
				},
				{
					id: 'TKT-4985',
					subject: 'Missing items in order',
					status: 'pending',
					priority: 'medium',
					age: '1d ago',
				},
			],
			totalTickets: 22,
			resolvedTickets: 19,
			avgResolutionTime: '3.8h',
			satisfactionScore: 78,
			lastContact: '30m ago',
			preferredChannel: 'phone',
		},
		{
			id: '5',
			name: 'Daniel Foster',
			email: 'daniel.f@email.com',
			initials: 'DF',
			supportTier: 'priority',
			activeTickets: [
				{
					id: 'TKT-4992',
					subject: 'Warranty claim',
					status: 'pending',
					priority: 'low',
					age: '2d ago',
				},
			],
			totalTickets: 12,
			resolvedTickets: 11,
			avgResolutionTime: '8h',
			satisfactionScore: 90,
			lastContact: '2d ago',
			preferredChannel: 'email',
		},
		{
			id: '6',
			name: 'Elizabeth Hayes',
			email: 'elizabeth.h@email.com',
			initials: 'EH',
			supportTier: 'standard',
			activeTickets: [
				{
					id: 'TKT-4988',
					subject: 'How to track my order?',
					status: 'open',
					priority: 'low',
					age: '5h ago',
				},
			],
			totalTickets: 5,
			resolvedTickets: 4,
			avgResolutionTime: '10h',
			satisfactionScore: 95,
			lastContact: '5h ago',
			preferredChannel: 'chat',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center gap-3">
					<div className="bg-primary/10 text-primary rounded-lg p-2.5">
						<Headphones className="size-5" />
					</div>
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Support Cases</h1>
						<p className="text-muted-foreground text-sm">
							Monitor customer support tickets and satisfaction
						</p>
					</div>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
					{customers.map((customer) => (
						<SupportCard key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
