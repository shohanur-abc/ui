import {
	Clock,
	ExternalLink,
	Headphones,
	MessageSquare,
	MoreHorizontal,
	Phone,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SupportCustomer {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	initials: string;
	ticket: {
		id: string;
		subject: string;
		status: 'open' | 'pending' | 'in_progress' | 'resolved';
		priority: 'low' | 'medium' | 'high' | 'urgent';
		category: string;
		createdAt: string;
		lastUpdate: string;
	};
	totalTickets: number;
	satisfactionScore?: number;
	assignedAgent?: string;
}

const StatusConfig = {
	open: {
		label: 'Open',
		className: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
	},
	pending: {
		label: 'Pending',
		className: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
	},
	in_progress: {
		label: 'In Progress',
		className: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
	},
	resolved: {
		label: 'Resolved',
		className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
	},
};

const PriorityConfig = {
	low: { label: 'Low', className: 'bg-slate-500' },
	medium: { label: 'Medium', className: 'bg-blue-500' },
	high: { label: 'High', className: 'bg-amber-500' },
	urgent: { label: 'Urgent', className: 'bg-red-500 animate-pulse' },
};

const StatusBadge = ({
	status,
}: {
	status: SupportCustomer['ticket']['status'];
}) => (
	<Badge variant="outline" className={StatusConfig[status].className}>
		{StatusConfig[status].label}
	</Badge>
);

const PriorityIndicator = ({
	priority,
}: {
	priority: SupportCustomer['ticket']['priority'];
}) => (
	<div className="flex items-center gap-1.5">
		<div
			className={`size-2 rounded-full ${PriorityConfig[priority].className}`}
		/>
		<span className="text-muted-foreground text-xs">
			{PriorityConfig[priority].label}
		</span>
	</div>
);

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="bg-primary/10 text-primary rounded-lg p-2.5">
			<Headphones className="size-5" />
		</div>
		<div>
			<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm">{subtitle}</p>
		</div>
	</div>
);

const SupportListItem = ({ customer }: { customer: SupportCustomer }) => (
	<div
		className={`group flex flex-col @md:flex-row @md:items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50 ${customer.ticket.priority === 'urgent' ? 'border-red-500/30' : ''}`}
	>
		<div className="flex items-center gap-3 min-w-0">
			<Avatar className="size-11">
				<AvatarImage src={customer.avatar} alt={customer.name} />
				<AvatarFallback className="bg-primary/10 text-primary">
					{customer.initials}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<p className="font-semibold truncate">{customer.name}</p>
					<Badge variant="secondary" className="text-xs hidden @sm:inline-flex">
						{customer.totalTickets} tickets
					</Badge>
				</div>
				<p className="text-muted-foreground text-sm truncate">
					{customer.email}
				</p>
			</div>
		</div>
		<div className="flex-1 min-w-0 @md:border-l @md:pl-4">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<p className="font-medium truncate">{customer.ticket.subject}</p>
					<div className="flex items-center gap-3 mt-1 flex-wrap">
						<Badge variant="outline" className="font-mono text-xs">
							#{customer.ticket.id}
						</Badge>
						<Badge variant="secondary" className="text-xs">
							{customer.ticket.category}
						</Badge>
						<PriorityIndicator priority={customer.ticket.priority} />
					</div>
				</div>
				<StatusBadge status={customer.ticket.status} />
			</div>
		</div>
		<div className="flex items-center gap-4 @md:gap-6 text-sm">
			<div className="hidden @lg:block text-center min-w-[100px]">
				<p className="text-muted-foreground text-xs">Assigned to</p>
				<p className="font-medium truncate">
					{customer.assignedAgent || 'Unassigned'}
				</p>
			</div>
			<div className="flex items-center gap-1 text-muted-foreground">
				<Clock className="size-3.5" />
				<span className="text-xs">{customer.ticket.lastUpdate}</span>
			</div>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="icon-sm" title="Call customer">
					<Phone className="size-4" />
				</Button>
				<Button variant="ghost" size="icon-sm" title="Open chat">
					<MessageSquare className="size-4" />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>View ticket</DropdownMenuItem>
						<DropdownMenuItem>View customer profile</DropdownMenuItem>
						<DropdownMenuItem>Assign agent</DropdownMenuItem>
						<DropdownMenuItem>Change priority</DropdownMenuItem>
						<DropdownMenuItem>Mark as resolved</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	</div>
);

export default function Main() {
	const customers: SupportCustomer[] = [
		{
			id: '1',
			name: 'Zachary Moore',
			email: 'zachary.m@email.com',
			initials: 'ZM',
			ticket: {
				id: 'TKT-5001',
				subject: 'Order delivery delay - need urgent resolution',
				status: 'open',
				priority: 'urgent',
				category: 'Shipping',
				createdAt: '2h ago',
				lastUpdate: '30m ago',
			},
			totalTickets: 15,
			satisfactionScore: 92,
			assignedAgent: 'Sarah K.',
		},
		{
			id: '2',
			name: 'Alice Turner',
			email: 'alice.t@email.com',
			initials: 'AT',
			ticket: {
				id: 'TKT-4998',
				subject: 'Product exchange request for wrong size',
				status: 'in_progress',
				priority: 'medium',
				category: 'Returns',
				createdAt: '1d ago',
				lastUpdate: '3h ago',
			},
			totalTickets: 8,
			satisfactionScore: 85,
			assignedAgent: 'Mike T.',
		},
		{
			id: '3',
			name: 'Benjamin Scott',
			email: 'benjamin.s@email.com',
			initials: 'BS',
			ticket: {
				id: 'TKT-4995',
				subject: 'Account login issues after password reset',
				status: 'pending',
				priority: 'high',
				category: 'Account',
				createdAt: '3h ago',
				lastUpdate: '1h ago',
			},
			totalTickets: 3,
			satisfactionScore: 100,
			assignedAgent: 'Emily R.',
		},
		{
			id: '4',
			name: 'Catherine Wells',
			email: 'catherine.w@email.com',
			initials: 'CW',
			ticket: {
				id: 'TKT-4990',
				subject: 'Billing discrepancy on last invoice',
				status: 'open',
				priority: 'high',
				category: 'Billing',
				createdAt: '4h ago',
				lastUpdate: '2h ago',
			},
			totalTickets: 22,
			satisfactionScore: 78,
			assignedAgent: undefined,
		},
		{
			id: '5',
			name: 'Daniel Foster',
			email: 'daniel.f@email.com',
			initials: 'DF',
			ticket: {
				id: 'TKT-4985',
				subject: 'Warranty claim for defective product',
				status: 'pending',
				priority: 'medium',
				category: 'Warranty',
				createdAt: '2d ago',
				lastUpdate: '1d ago',
			},
			totalTickets: 12,
			satisfactionScore: 90,
			assignedAgent: 'John D.',
		},
		{
			id: '6',
			name: 'Elizabeth Hayes',
			email: 'elizabeth.h@email.com',
			initials: 'EH',
			ticket: {
				id: 'TKT-4980',
				subject: 'How to track my order status?',
				status: 'resolved',
				priority: 'low',
				category: 'General',
				createdAt: '1d ago',
				lastUpdate: '5h ago',
			},
			totalTickets: 5,
			satisfactionScore: 95,
			assignedAgent: 'Sarah K.',
		},
		{
			id: '7',
			name: 'Frank Garcia',
			email: 'frank.g@email.com',
			initials: 'FG',
			ticket: {
				id: 'TKT-4975',
				subject: 'Request for bulk order discount',
				status: 'in_progress',
				priority: 'low',
				category: 'Sales',
				createdAt: '3d ago',
				lastUpdate: '1d ago',
			},
			totalTickets: 18,
			satisfactionScore: 88,
			assignedAgent: 'Lisa M.',
		},
		{
			id: '8',
			name: 'Grace Patterson',
			email: 'grace.p@email.com',
			initials: 'GP',
			ticket: {
				id: 'TKT-4970',
				subject: 'Missing items in my order #ORD-8821',
				status: 'open',
				priority: 'urgent',
				category: 'Order Issues',
				createdAt: '1h ago',
				lastUpdate: '15m ago',
			},
			totalTickets: 9,
			satisfactionScore: 72,
			assignedAgent: undefined,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<PageHeader
					title="Support Queue"
					subtitle="Active customer support tickets"
				/>
				<div className="space-y-3">
					{customers.map((customer) => (
						<SupportListItem key={customer.id} customer={customer} />
					))}
				</div>
			</div>
		</section>
	);
}
