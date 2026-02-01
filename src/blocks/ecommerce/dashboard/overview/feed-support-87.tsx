import {
	ArrowUpRight,
	Headphones,
	Mail,
	MessageSquare,
	MoreHorizontal,
	Phone,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type SupportTicket = {
	id: string;
	ticketId: string;
	customer: { name: string; initials: string; email: string };
	subject: string;
	message: string;
	channel: 'email' | 'chat' | 'phone';
	priority: 'urgent' | 'high' | 'normal' | 'low';
	status: 'open' | 'pending' | 'resolved';
	time: string;
};

const getChannelConfig = (channel: SupportTicket['channel']) => {
	switch (channel) {
		case 'email':
			return { icon: Mail, color: 'bg-blue-500/10 text-blue-500' };
		case 'chat':
			return {
				icon: MessageSquare,
				color: 'bg-emerald-500/10 text-emerald-500',
			};
		case 'phone':
			return { icon: Phone, color: 'bg-violet-500/10 text-violet-500' };
	}
};

const getPriorityStyle = (priority: SupportTicket['priority']) => {
	switch (priority) {
		case 'urgent':
			return 'bg-red-500/10 text-red-500 border-red-500/20';
		case 'high':
			return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
		case 'normal':
			return 'bg-primary/10 text-primary border-primary/20';
		case 'low':
			return 'bg-muted text-muted-foreground border-muted';
	}
};

const getStatusStyle = (status: SupportTicket['status']) => {
	switch (status) {
		case 'open':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'resolved':
			return 'bg-muted text-muted-foreground';
	}
};

const SupportTicketCard = ({
	ticketId,
	customer,
	subject,
	message,
	channel,
	priority,
	status,
	time,
}: SupportTicket) => {
	const channelConfig = getChannelConfig(channel);
	const ChannelIcon = channelConfig.icon;

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<Avatar className="size-10">
						<AvatarFallback className="text-sm">
							{customer.initials}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="flex items-center gap-2">
							<p className="font-medium">{customer.name}</p>
							<Badge variant="outline" className={getPriorityStyle(priority)}>
								{priority}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground">{customer.email}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Badge variant="secondary" className={getStatusStyle(status)}>
						{status}
					</Badge>
					<Button variant="ghost" size="icon" className="size-8">
						<MoreHorizontal className="size-4" />
					</Button>
				</div>
			</div>
			<div className="mt-3">
				<div className="flex items-center gap-2">
					<div className={`rounded-full p-1 ${channelConfig.color}`}>
						<ChannelIcon className="size-3" />
					</div>
					<p className="text-sm font-medium">{subject}</p>
				</div>
				<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
					{message}
				</p>
			</div>
			<div className="mt-3 flex items-center justify-between">
				<span className="text-xs text-muted-foreground">
					{ticketId} • {time}
				</span>
				<div className="flex gap-2">
					<Button size="sm" variant="outline">
						View
					</Button>
					{status === 'open' && <Button size="sm">Reply</Button>}
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const tickets: SupportTicket[] = [
		{
			id: '1',
			ticketId: 'TKT-4521',
			customer: { name: 'John Doe', initials: 'JD', email: 'john@example.com' },
			subject: 'Order not received',
			message:
				'I placed an order 5 days ago and it still hasnt arrived. The tracking shows it was delivered but I never received it.',
			channel: 'email',
			priority: 'urgent',
			status: 'open',
			time: '10m ago',
		},
		{
			id: '2',
			ticketId: 'TKT-4520',
			customer: {
				name: 'Jane Smith',
				initials: 'JS',
				email: 'jane@example.com',
			},
			subject: 'Product quality issue',
			message:
				'The headphones I received have a scratched surface. I would like a replacement or refund.',
			channel: 'chat',
			priority: 'high',
			status: 'open',
			time: '25m ago',
		},
		{
			id: '3',
			ticketId: 'TKT-4519',
			customer: {
				name: 'Bob Wilson',
				initials: 'BW',
				email: 'bob@example.com',
			},
			subject: 'Return request',
			message:
				'I want to return the keyboard I purchased last week. It doesnt fit my setup.',
			channel: 'email',
			priority: 'normal',
			status: 'pending',
			time: '1h ago',
		},
		{
			id: '4',
			ticketId: 'TKT-4518',
			customer: {
				name: 'Alice Brown',
				initials: 'AB',
				email: 'alice@example.com',
			},
			subject: 'Billing inquiry',
			message:
				'I was charged twice for my last order. Please help me resolve this issue.',
			channel: 'phone',
			priority: 'high',
			status: 'pending',
			time: '2h ago',
		},
		{
			id: '5',
			ticketId: 'TKT-4517',
			customer: {
				name: 'Mike Johnson',
				initials: 'MJ',
				email: 'mike@example.com',
			},
			subject: 'Product inquiry',
			message:
				'Can you tell me when the Smart Watch Ultra will be back in stock?',
			channel: 'chat',
			priority: 'low',
			status: 'resolved',
			time: '3h ago',
		},
	];

	const openCount = tickets.filter((t) => t.status === 'open').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Headphones className="size-5 text-primary" />
							Support Queue
						</CardTitle>
						<CardDescription>
							{openCount} open tickets require attention
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{tickets.map((ticket) => (
							<SupportTicketCard key={ticket.id} {...ticket} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
