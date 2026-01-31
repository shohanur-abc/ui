import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Headphones, MessageSquare, Clock, CheckCircle, AlertCircle, Star, ThumbsUp, ThumbsDown, ExternalLink, Phone, Mail } from 'lucide-react';

interface SupportDetailProps {
	ticket: {
		id: string;
		orderId: string;
		subject: string;
		status: 'open' | 'in-progress' | 'resolved' | 'closed';
		priority: 'low' | 'medium' | 'high' | 'urgent';
		category: string;
		created: string;
		updated: string;
		customer: { name: string; email: string; avatar?: string; initials: string };
		agent?: { name: string; avatar?: string; initials: string };
		messages: { sender: 'customer' | 'agent'; name: string; message: string; time: string }[];
		resolution?: { rating: number; feedback: string };
	};
	labels: {
		customer: string;
		agent: string;
		conversation: string;
		resolution: string;
		reply: string;
		call: string;
		resolve: string;
		escalate: string;
	};
}

const StatusBadge = ({ status }: { status: SupportDetailProps['ticket']['status'] }) => {
	const config = {
		open: { className: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'Open' },
		'in-progress': { className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30', label: 'In Progress' },
		resolved: { className: 'bg-accent/10 text-accent border-accent/30', label: 'Resolved' },
		closed: { className: 'bg-muted text-muted-foreground border-border', label: 'Closed' },
	};
	const { className, label } = config[status];
	return <Badge variant="outline" className={className}>{label}</Badge>;
};

const PriorityBadge = ({ priority }: { priority: SupportDetailProps['ticket']['priority'] }) => {
	const config = {
		low: 'bg-muted text-muted-foreground',
		medium: 'bg-blue-500/10 text-blue-500',
		high: 'bg-primary/10 text-primary',
		urgent: 'bg-destructive text-white',
	};
	return <Badge className={`capitalize ${config[priority]}`}>{priority}</Badge>;
};

const MessageBubble = ({ message, sender, name, time, isCustomer }: { message: string; sender: string; name: string; time: string; isCustomer: boolean }) => (
	<div className={`flex gap-3 ${isCustomer ? 'flex-row' : 'flex-row-reverse'}`}>
		<Avatar className="size-8">
			<AvatarFallback className={isCustomer ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
		</Avatar>
		<div className={`flex-1 max-w-md ${isCustomer ? '' : 'text-right'}`}>
			<div className={`inline-block p-3 rounded-xl ${isCustomer ? 'bg-muted/50 rounded-tl-none' : 'bg-primary/10 rounded-tr-none'}`}>
				<p className="text-sm">{message}</p>
			</div>
			<p className="text-xs text-muted-foreground mt-1">{name} • {time}</p>
		</div>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{[...Array(5)].map((_, i) => (
			<Star key={i} className={`size-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
		))}
	</div>
);

const SupportDetail = ({ ticket, labels }: SupportDetailProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4 border-b border-border/50">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<Headphones className="size-5 text-primary" />
					</div>
					<div>
						<CardTitle className="text-lg">{ticket.subject}</CardTitle>
						<p className="text-sm text-muted-foreground font-mono">{ticket.id} • Order {ticket.orderId}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<PriorityBadge priority={ticket.priority} />
					<StatusBadge status={ticket.status} />
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="p-3 rounded-lg bg-muted/20">
					<p className="text-xs text-muted-foreground mb-2">{labels.customer}</p>
					<div className="flex items-center gap-3">
						<Avatar className="size-10">
							<AvatarImage src={ticket.customer.avatar} />
							<AvatarFallback className="bg-primary/10 text-primary">{ticket.customer.initials}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">{ticket.customer.name}</p>
							<p className="text-xs text-muted-foreground">{ticket.customer.email}</p>
						</div>
					</div>
				</div>

				{ticket.agent && (
					<div className="p-3 rounded-lg bg-muted/20">
						<p className="text-xs text-muted-foreground mb-2">{labels.agent}</p>
						<div className="flex items-center gap-3">
							<Avatar className="size-10">
								<AvatarImage src={ticket.agent.avatar} />
								<AvatarFallback className="bg-accent/10 text-accent">{ticket.agent.initials}</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-medium">{ticket.agent.name}</p>
								<p className="text-xs text-muted-foreground">Support Agent</p>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
				<span className="flex items-center gap-1"><Clock className="size-3" /> Created: {ticket.created}</span>
				<span className="flex items-center gap-1"><Clock className="size-3" /> Updated: {ticket.updated}</span>
				<Badge variant="secondary" className="text-xs">{ticket.category}</Badge>
			</div>
		</CardHeader>

		<CardContent className="py-6 space-y-6">
			<div>
				<p className="text-sm font-semibold text-muted-foreground mb-4">{labels.conversation}</p>
				<div className="space-y-4">
					{ticket.messages.map((msg, i) => (
						<MessageBubble key={i} {...msg} isCustomer={msg.sender === 'customer'} />
					))}
				</div>
			</div>

			{ticket.resolution && (
				<>
					<Separator />
					<div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
						<div className="flex items-center justify-between mb-3">
							<p className="font-semibold text-accent flex items-center gap-2">
								<CheckCircle className="size-4" />
								{labels.resolution}
							</p>
							<StarRating rating={ticket.resolution.rating} />
						</div>
						<p className="text-sm text-muted-foreground italic">"{ticket.resolution.feedback}"</p>
					</div>
				</>
			)}
		</CardContent>

		<CardFooter className="gap-3 border-t border-border/50">
			<Button variant="outline" className="gap-1.5">
				<Phone className="size-4" />
				{labels.call}
			</Button>
			<Button variant="outline" className="flex-1 gap-1.5">
				<AlertCircle className="size-4" />
				{labels.escalate}
			</Button>
			<Button variant="outline" className="flex-1 gap-1.5">
				<CheckCircle className="size-4" />
				{labels.resolve}
			</Button>
			<Button className="flex-1 gap-1.5">
				<MessageSquare className="size-4" />
				{labels.reply}
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		customer: 'Customer',
		agent: 'Assigned Agent',
		conversation: 'Conversation',
		resolution: 'Resolution',
		reply: 'Reply',
		call: 'Call',
		resolve: 'Mark Resolved',
		escalate: 'Escalate',
	};

	const ticket = {
		id: 'TKT-2024-001',
		orderId: 'ORD-2024-001',
		subject: 'Item received damaged - requesting replacement',
		status: 'in-progress' as const,
		priority: 'high' as const,
		category: 'Damaged Item',
		created: 'Jan 30, 2024',
		updated: '2 hours ago',
		customer: { name: 'John Smith', email: 'john@email.com', initials: 'JS' },
		agent: { name: 'Sarah Johnson', initials: 'SJ' },
		messages: [
			{ sender: 'customer' as const, name: 'John Smith', message: 'I received my order today but the headphones box was crushed and the product inside has visible damage. The left ear cup has a crack.', time: 'Jan 30, 10:00 AM' },
			{ sender: 'agent' as const, name: 'Sarah Johnson', message: 'I\'m so sorry to hear about the damage to your order. I\'ve reviewed the photos you sent and I can confirm we\'ll send a replacement right away. No need to return the damaged item.', time: 'Jan 30, 10:30 AM' },
			{ sender: 'customer' as const, name: 'John Smith', message: 'Thank you so much for the quick response! When can I expect the replacement?', time: 'Jan 30, 11:00 AM' },
			{ sender: 'agent' as const, name: 'Sarah Johnson', message: 'The replacement is being processed now and should ship within 24 hours. You\'ll receive tracking information via email once it\'s on its way!', time: 'Jan 30, 11:15 AM' },
		],
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<SupportDetail ticket={ticket} labels={labels} />
			</div>
		</section>
	);
}
