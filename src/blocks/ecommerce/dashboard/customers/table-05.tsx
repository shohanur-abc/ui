import {
	AlertCircle,
	CheckCircle2,
	ChevronDown,
	Clock,
	Download,
	Mail,
	MessageSquare,
	MoreHorizontal,
	Phone,
	Search,
	Ticket,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SupportTicket {
	id: string;
	ticketId: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	subject: string;
	priority: 'low' | 'medium' | 'high' | 'urgent';
	status: 'open' | 'in-progress' | 'resolved' | 'closed';
	category: string;
	created: string;
	lastUpdate: string;
	assignee?: string;
}

const HeaderActions = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-4 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex flex-wrap items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Status
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All</DropdownMenuItem>
					<DropdownMenuItem>Open</DropdownMenuItem>
					<DropdownMenuItem>In Progress</DropdownMenuItem>
					<DropdownMenuItem>Resolved</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Priority
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All</DropdownMenuItem>
					<DropdownMenuItem>Urgent</DropdownMenuItem>
					<DropdownMenuItem>High</DropdownMenuItem>
					<DropdownMenuItem>Medium</DropdownMenuItem>
					<DropdownMenuItem>Low</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
		<div className="flex items-center gap-2">
			<div className="relative">
				<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
				<Input placeholder={searchPlaceholder} className="w-full pl-9 @sm:w-64" />
			</div>
			<Button variant="outline" size="icon-sm">
				<Download className="size-4" />
			</Button>
		</div>
	</div>
);

const PriorityBadge = ({ priority }: { priority: SupportTicket['priority'] }) => {
	const config = {
		low: { label: 'Low', className: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
		medium: { label: 'Medium', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		high: { label: 'High', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
		urgent: { label: 'Urgent', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
	};
	return (
		<Badge variant="outline" className={config[priority].className}>
			{config[priority].label}
		</Badge>
	);
};

const StatusIcon = ({ status }: { status: SupportTicket['status'] }) => {
	const icons = {
		open: <AlertCircle className="size-4 text-amber-500" />,
		'in-progress': <Clock className="size-4 text-blue-500" />,
		resolved: <CheckCircle2 className="size-4 text-emerald-500" />,
		closed: <XCircle className="text-muted-foreground size-4" />,
	};
	return icons[status];
};

const TicketRow = ({ ticket }: { ticket: SupportTicket }) => (
	<TableRow className="group">
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-2">
				<StatusIcon status={ticket.status} />
				<span className="font-mono text-sm">{ticket.ticketId}</span>
			</div>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-8">
					<AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{ticket.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{ticket.customer.name}</p>
					<p className="text-muted-foreground hidden text-xs @lg:block">
						{ticket.customer.email}
					</p>
				</div>
			</div>
		</TableCell>
		<TableCell className="max-w-[200px]">
			<p className="truncate font-medium">{ticket.subject}</p>
			<p className="text-muted-foreground text-xs">{ticket.category}</p>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<PriorityBadge priority={ticket.priority} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground text-sm">
			{ticket.created}
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{ticket.lastUpdate}
		</TableCell>
		<TableCell className="hidden @xl:table-cell">
			{ticket.assignee ? (
				<Badge variant="secondary" className="font-normal">
					{ticket.assignee}
				</Badge>
			) : (
				<span className="text-muted-foreground text-sm">Unassigned</span>
			)}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon-sm"
						className="opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<MessageSquare className="mr-2 size-4" />
						Reply
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Phone className="mr-2 size-4" />
						Call customer
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Mail className="mr-2 size-4" />
						Send email
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Assign to me</DropdownMenuItem>
					<DropdownMenuItem>Mark as resolved</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive">Close ticket</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

const SummaryStats = ({
	stats,
}: {
	stats: { label: string; value: number; color: string }[];
}) => (
	<div className="flex flex-wrap gap-4 border-b px-6 py-3">
		{stats.map((stat, i) => (
			<div key={i} className="flex items-center gap-2">
				<div className={`size-2 rounded-full ${stat.color}`} />
				<span className="text-muted-foreground text-sm">{stat.label}:</span>
				<span className="font-semibold">{stat.value}</span>
			</div>
		))}
	</div>
);

export default function Main() {
	const tickets: SupportTicket[] = [
		{
			id: '1',
			ticketId: '#TKT-2024-156',
			customer: { name: 'Rachel Green', email: 'rachel.g@email.com', initials: 'RG' },
			subject: 'Order not received after 7 days',
			priority: 'high',
			status: 'open',
			category: 'Shipping',
			created: '2h ago',
			lastUpdate: '30m ago',
			assignee: 'John D.',
		},
		{
			id: '2',
			ticketId: '#TKT-2024-155',
			customer: { name: 'Tom Hardy', email: 'tom.h@email.com', initials: 'TH' },
			subject: 'Request for product refund',
			priority: 'medium',
			status: 'in-progress',
			category: 'Returns',
			created: '5h ago',
			lastUpdate: '1h ago',
			assignee: 'Sarah M.',
		},
		{
			id: '3',
			ticketId: '#TKT-2024-154',
			customer: { name: 'Lisa Park', email: 'lisa.p@email.com', initials: 'LP' },
			subject: 'Wrong item delivered',
			priority: 'urgent',
			status: 'open',
			category: 'Order Issue',
			created: '1d ago',
			lastUpdate: '3h ago',
		},
		{
			id: '4',
			ticketId: '#TKT-2024-153',
			customer: { name: 'Mark Chen', email: 'mark.c@email.com', initials: 'MC' },
			subject: 'Question about product warranty',
			priority: 'low',
			status: 'resolved',
			category: 'Product Info',
			created: '2d ago',
			lastUpdate: '1d ago',
			assignee: 'John D.',
		},
		{
			id: '5',
			ticketId: '#TKT-2024-152',
			customer: { name: 'Emma Wilson', email: 'emma.w@email.com', initials: 'EW' },
			subject: 'Payment failed but money deducted',
			priority: 'urgent',
			status: 'in-progress',
			category: 'Billing',
			created: '3d ago',
			lastUpdate: '2h ago',
			assignee: 'Mike R.',
		},
	];

	const summaryStats = [
		{ label: 'Open', value: 24, color: 'bg-amber-500' },
		{ label: 'In Progress', value: 12, color: 'bg-blue-500' },
		{ label: 'Resolved', value: 156, color: 'bg-emerald-500' },
		{ label: 'Closed', value: 89, color: 'bg-muted-foreground' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="bg-primary/10 text-primary rounded-lg p-2.5">
							<Ticket className="size-5" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
							<p className="text-muted-foreground text-sm">
								Manage customer support requests
							</p>
						</div>
					</div>
					<Button className="gap-2">
						<MessageSquare className="size-4" />
						<span className="hidden @sm:inline">New Ticket</span>
					</Button>
				</div>

				<div className="overflow-hidden rounded-xl border bg-card">
					<SummaryStats stats={summaryStats} />
					<HeaderActions searchPlaceholder="Search tickets..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								<TableHead>Ticket</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Subject</TableHead>
								<TableHead className="hidden @md:table-cell">Priority</TableHead>
								<TableHead className="hidden @lg:table-cell">Created</TableHead>
								<TableHead className="hidden @xl:table-cell">Last Update</TableHead>
								<TableHead className="hidden @xl:table-cell">Assignee</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{tickets.map((ticket) => (
								<TicketRow key={ticket.id} ticket={ticket} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
