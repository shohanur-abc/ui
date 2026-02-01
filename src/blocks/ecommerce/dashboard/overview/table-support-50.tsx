import {
	ArrowRight,
	CheckCircle2,
	Clock,
	HelpCircle,
	MessageSquare,
	MoreHorizontal,
	XCircle,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type SupportKpi = {
	title: string;
	value: string;
	icon: LucideIcon;
	color: string;
};

type TicketRow = {
	id: string;
	subject: string;
	customer: string;
	customerEmail: string;
	customerInitials: string;
	priority: 'low' | 'medium' | 'high' | 'urgent';
	status: 'open' | 'in-progress' | 'resolved' | 'closed';
	category: string;
	created: string;
	lastUpdate: string;
};

const SupportKpiCard = ({ title, value, icon: Icon, color }: SupportKpi) => (
	<Card>
		<CardContent className="flex items-center gap-4 p-4">
			<div className={`rounded-lg p-2.5 ${color}`}>
				<Icon className="size-5" />
			</div>
			<div>
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
		</CardContent>
	</Card>
);

const getPriorityStyle = (priority: TicketRow['priority']) => {
	switch (priority) {
		case 'low':
			return 'bg-muted text-muted-foreground';
		case 'medium':
			return 'bg-blue-500/10 text-blue-500';
		case 'high':
			return 'bg-amber-500/10 text-amber-500';
		case 'urgent':
			return 'bg-red-500/10 text-red-500';
	}
};

const getStatusStyle = (status: TicketRow['status']) => {
	switch (status) {
		case 'open':
			return 'bg-primary/10 text-primary';
		case 'in-progress':
			return 'bg-amber-500/10 text-amber-500';
		case 'resolved':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'closed':
			return 'bg-muted text-muted-foreground';
	}
};

export default function Main() {
	const kpis: SupportKpi[] = [
		{
			title: 'Open Tickets',
			value: '24',
			icon: HelpCircle,
			color: 'bg-primary/10 text-primary',
		},
		{
			title: 'In Progress',
			value: '12',
			icon: Clock,
			color: 'bg-amber-500/10 text-amber-500',
		},
		{
			title: 'Resolved Today',
			value: '18',
			icon: CheckCircle2,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			title: 'Avg Response',
			value: '2.4h',
			icon: MessageSquare,
			color: 'bg-blue-500/10 text-blue-500',
		},
	];

	const tickets: TicketRow[] = [
		{
			id: 'TKT-892',
			subject: 'Shipping delay on order #4521',
			customer: 'John Doe',
			customerEmail: 'john@example.com',
			customerInitials: 'JD',
			priority: 'high',
			status: 'in-progress',
			category: 'Shipping',
			created: 'Dec 12, 2024',
			lastUpdate: '2 hours ago',
		},
		{
			id: 'TKT-891',
			subject: 'Wrong item received',
			customer: 'Jane Smith',
			customerEmail: 'jane@example.com',
			customerInitials: 'JS',
			priority: 'urgent',
			status: 'open',
			category: 'Orders',
			created: 'Dec 12, 2024',
			lastUpdate: '30 min ago',
		},
		{
			id: 'TKT-890',
			subject: 'Request for refund',
			customer: 'Bob Wilson',
			customerEmail: 'bob@example.com',
			customerInitials: 'BW',
			priority: 'medium',
			status: 'in-progress',
			category: 'Refunds',
			created: 'Dec 11, 2024',
			lastUpdate: '1 day ago',
		},
		{
			id: 'TKT-889',
			subject: 'Product not as described',
			customer: 'Alice Brown',
			customerEmail: 'alice@example.com',
			customerInitials: 'AB',
			priority: 'medium',
			status: 'resolved',
			category: 'Products',
			created: 'Dec 11, 2024',
			lastUpdate: '1 day ago',
		},
		{
			id: 'TKT-888',
			subject: 'Account access issue',
			customer: 'Mike Johnson',
			customerEmail: 'mike@example.com',
			customerInitials: 'MJ',
			priority: 'low',
			status: 'closed',
			category: 'Account',
			created: 'Dec 10, 2024',
			lastUpdate: '2 days ago',
		},
		{
			id: 'TKT-887',
			subject: 'Payment failed',
			customer: 'Sarah Davis',
			customerEmail: 'sarah@example.com',
			customerInitials: 'SD',
			priority: 'high',
			status: 'open',
			category: 'Payments',
			created: 'Dec 12, 2024',
			lastUpdate: '1 hour ago',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<SupportKpiCard key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Support Tickets</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/support">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Ticket</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Customer
										</TableHead>
										<TableHead>Priority</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Category
										</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Last Update
										</TableHead>
										<TableHead className="w-10"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{tickets.map((ticket) => (
										<TableRow key={ticket.id}>
											<TableCell>
												<div>
													<p className="font-medium">{ticket.subject}</p>
													<p className="text-xs text-muted-foreground">
														{ticket.id}
													</p>
												</div>
											</TableCell>
											<TableCell className="hidden @lg:table-cell">
												<div className="flex items-center gap-2">
													<Avatar className="size-7">
														<AvatarFallback className="text-xs">
															{ticket.customerInitials}
														</AvatarFallback>
													</Avatar>
													<div>
														<p className="text-sm">{ticket.customer}</p>
														<p className="text-xs text-muted-foreground">
															{ticket.customerEmail}
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className={getPriorityStyle(ticket.priority)}
												>
													{ticket.priority}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className={getStatusStyle(ticket.status)}
												>
													{ticket.status.replace('-', ' ')}
												</Badge>
											</TableCell>
											<TableCell className="hidden @xl:table-cell text-muted-foreground">
												{ticket.category}
											</TableCell>
											<TableCell className="hidden @lg:table-cell text-muted-foreground">
												{ticket.lastUpdate}
											</TableCell>
											<TableCell>
												<Button variant="ghost" size="icon" className="size-8">
													<MoreHorizontal className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
