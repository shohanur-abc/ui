import {
	AlertCircle,
	Archive,
	ChevronDown,
	Clock,
	Download,
	Eye,
	FileText,
	Inbox,
	Mail,
	MailOpen,
	MessageCircle,
	MoreHorizontal,
	Paperclip,
	Reply,
	Search,
	Send,
	Star,
	Trash2,
	User,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CustomerMessage {
	id: string;
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	subject: string;
	preview: string;
	category: 'inquiry' | 'support' | 'feedback' | 'complaint' | 'order';
	priority: 'low' | 'normal' | 'high' | 'urgent';
	status: 'unread' | 'read' | 'replied' | 'archived';
	starred: boolean;
	hasAttachment: boolean;
	timestamp: string;
	responseTime?: string;
}

const InboxStats = ({
	stats,
}: {
	stats: { label: string; value: number; icon: React.ElementType; color: string }[];
}) => (
	<div className="flex gap-4 border-b px-6 py-3 overflow-x-auto">
		{stats.map((stat, i) => (
			<div key={i} className="flex items-center gap-2 text-sm">
				<stat.icon className={`size-4 ${stat.color}`} />
				<span className="text-muted-foreground">{stat.label}:</span>
				<span className="font-semibold">{stat.value}</span>
			</div>
		))}
	</div>
);

const SearchAndActions = ({
	searchPlaceholder,
}: {
	searchPlaceholder: string;
}) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="relative">
			<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @lg:w-80" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						Category
						<ChevronDown className="size-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All Categories</DropdownMenuItem>
					<DropdownMenuItem>Inquiry</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuItem>Feedback</DropdownMenuItem>
					<DropdownMenuItem>Complaint</DropdownMenuItem>
					<DropdownMenuItem>Order</DropdownMenuItem>
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
					<DropdownMenuItem>Normal</DropdownMenuItem>
					<DropdownMenuItem>Low</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

const CategoryBadge = ({ category }: { category: CustomerMessage['category'] }) => {
	const config = {
		inquiry: { label: 'Inquiry', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
		support: { label: 'Support', className: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
		feedback: { label: 'Feedback', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
		complaint: { label: 'Complaint', className: 'bg-red-500/10 text-red-500 border-red-500/20' },
		order: { label: 'Order', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
	};
	return (
		<Badge variant="outline" className={config[category].className}>
			{config[category].label}
		</Badge>
	);
};

const PriorityDot = ({ priority }: { priority: CustomerMessage['priority'] }) => {
	const colors = {
		low: 'bg-slate-400',
		normal: 'bg-blue-500',
		high: 'bg-amber-500',
		urgent: 'bg-red-500',
	};
	return <div className={`size-2 rounded-full ${colors[priority]}`} />;
};

const StatusIcon = ({ status }: { status: CustomerMessage['status'] }) => {
	if (status === 'unread') return <Mail className="text-primary size-4" />;
	if (status === 'replied') return <Reply className="text-emerald-500 size-4" />;
	return <MailOpen className="text-muted-foreground size-4" />;
};

const MessageRow = ({ message }: { message: CustomerMessage }) => (
	<TableRow className={`group ${message.status === 'unread' ? 'bg-primary/5' : ''}`}>
		<TableCell>
			<Checkbox />
		</TableCell>
		<TableCell>
			<Button
				variant="ghost"
				size="icon-sm"
				className={message.starred ? 'text-amber-400' : 'text-muted-foreground'}
			>
				<Star className={`size-4 ${message.starred ? 'fill-current' : ''}`} />
			</Button>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-9">
					<AvatarImage src={message.customer.avatar} alt={message.customer.name} />
					<AvatarFallback className="bg-primary/10 text-primary text-xs">
						{message.customer.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className={`font-medium ${message.status === 'unread' ? 'font-semibold' : ''}`}>
						{message.customer.name}
					</p>
					<p className="text-muted-foreground text-xs">{message.customer.email}</p>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div className="max-w-[300px] space-y-1">
				<div className="flex items-center gap-2">
					<PriorityDot priority={message.priority} />
					<p className={`truncate text-sm ${message.status === 'unread' ? 'font-semibold' : ''}`}>
						{message.subject}
					</p>
					{message.hasAttachment && (
						<Paperclip className="text-muted-foreground size-3.5 shrink-0" />
					)}
				</div>
				<p className="text-muted-foreground truncate text-xs">{message.preview}</p>
			</div>
		</TableCell>
		<TableCell className="hidden @md:table-cell">
			<CategoryBadge category={message.category} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell">
			<StatusIcon status={message.status} />
		</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground text-sm">
			{message.timestamp}
		</TableCell>
		<TableCell className="hidden @xl:table-cell text-muted-foreground text-sm">
			{message.responseTime || '-'}
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Eye className="mr-2 size-4" />
						View message
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Reply className="mr-2 size-4" />
						Reply
					</DropdownMenuItem>
					<DropdownMenuItem>
						<User className="mr-2 size-4" />
						View customer
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Star className="mr-2 size-4" />
						Toggle star
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Archive className="mr-2 size-4" />
						Archive
					</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive">
						<Trash2 className="mr-2 size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const inboxStats = [
		{ label: 'Unread', value: 12, icon: Mail, color: 'text-primary' },
		{ label: 'Urgent', value: 3, icon: AlertCircle, color: 'text-red-500' },
		{ label: 'Pending Reply', value: 8, icon: Clock, color: 'text-amber-500' },
		{ label: 'Starred', value: 15, icon: Star, color: 'text-amber-400' },
	];

	const messages: CustomerMessage[] = [
		{
			id: '1',
			customer: { name: 'Victoria Chen', email: 'victoria.c@email.com', initials: 'VC' },
			subject: 'Order not received after 2 weeks',
			preview: 'Hi, I placed an order (#12345) two weeks ago and still haven\'t received it...',
			category: 'complaint',
			priority: 'urgent',
			status: 'unread',
			starred: true,
			hasAttachment: false,
			timestamp: '10 min ago',
		},
		{
			id: '2',
			customer: { name: 'William Park', email: 'william.p@email.com', initials: 'WP' },
			subject: 'Question about product specifications',
			preview: 'Could you please clarify the dimensions and weight of the product...',
			category: 'inquiry',
			priority: 'normal',
			status: 'unread',
			starred: false,
			hasAttachment: true,
			timestamp: '1 hour ago',
		},
		{
			id: '3',
			customer: { name: 'Xena Rodriguez', email: 'xena.r@email.com', initials: 'XR' },
			subject: 'Great experience with customer service',
			preview: 'I wanted to share my positive experience with your support team...',
			category: 'feedback',
			priority: 'low',
			status: 'read',
			starred: true,
			hasAttachment: false,
			timestamp: '3 hours ago',
			responseTime: '15 min',
		},
		{
			id: '4',
			customer: { name: 'Yuri Tanaka', email: 'yuri.t@email.com', initials: 'YT' },
			subject: 'Need help with return process',
			preview: 'I\'d like to return an item but I\'m having trouble with the return portal...',
			category: 'support',
			priority: 'high',
			status: 'replied',
			starred: false,
			hasAttachment: true,
			timestamp: 'Yesterday',
			responseTime: '2 hours',
		},
		{
			id: '5',
			customer: { name: 'Zara Ahmed', email: 'zara.a@email.com', initials: 'ZA' },
			subject: 'Order status update request',
			preview: 'Can you please provide an update on my order #67890? It shows...',
			category: 'order',
			priority: 'normal',
			status: 'read',
			starred: false,
			hasAttachment: false,
			timestamp: '2 days ago',
			responseTime: '30 min',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="bg-primary/10 text-primary rounded-lg p-2.5">
							<Inbox className="size-5" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight">Customer Messages</h1>
							<p className="text-muted-foreground text-sm">Manage customer communications</p>
						</div>
					</div>
					<Button className="gap-2">
						<Send className="size-4" />
						Compose
					</Button>
				</div>

				<div className="overflow-hidden rounded-xl border bg-card">
					<InboxStats stats={inboxStats} />
					<SearchAndActions searchPlaceholder="Search messages..." />
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								<TableHead className="w-12" />
								<TableHead>From</TableHead>
								<TableHead>Message</TableHead>
								<TableHead className="hidden @md:table-cell">Category</TableHead>
								<TableHead className="hidden @lg:table-cell">Status</TableHead>
								<TableHead className="hidden @lg:table-cell">Received</TableHead>
								<TableHead className="hidden @xl:table-cell">Response</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{messages.map((message) => (
								<MessageRow key={message.id} message={message} />
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
