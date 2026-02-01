import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	MessageSquare,
	User,
	Mail,
	Phone,
	MoreVertical,
	Reply,
	Archive,
	Star,
	type LucideIcon,
} from 'lucide-react';

interface Message {
	id: string;
	channel: 'email' | 'chat' | 'phone';
	from: {
		name: string;
		email?: string;
		avatar?: string;
		initials: string;
	};
	subject: string;
	preview: string;
	timestamp: string;
	isRead: boolean;
	isStarred?: boolean;
	orderId?: string;
}

interface MessageNotificationsProps {
	title: string;
	messages: Message[];
	unreadCount: number;
}

const ChannelIcon = ({ channel }: { channel: Message['channel'] }) => {
	const config: Record<
		Message['channel'],
		{ icon: LucideIcon; className: string }
	> = {
		email: { icon: Mail, className: 'text-blue-400' },
		chat: { icon: MessageSquare, className: 'text-purple-400' },
		phone: { icon: Phone, className: 'text-emerald-400' },
	};

	const { icon: Icon, className } = config[channel];
	return <Icon className={`size-4 ${className}`} />;
};

const MessageCard = ({ message }: { message: Message }) => (
	<div
		className={`group p-4 rounded-xl border transition-all hover:shadow-lg ${
			!message.isRead
				? 'border-primary/30 bg-primary/5'
				: 'border-border/50 bg-card/80 hover:border-primary/20'
		}`}
	>
		<div className="flex items-start gap-3">
			<Avatar className="size-10">
				<AvatarImage src={message.from.avatar} alt={message.from.name} />
				<AvatarFallback className="bg-secondary text-sm">
					{message.from.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-1">
					<div className="flex items-center gap-2">
						<span
							className={`text-sm ${
								!message.isRead
									? 'font-semibold text-foreground'
									: 'font-medium text-foreground'
							}`}
						>
							{message.from.name}
						</span>
						<ChannelIcon channel={message.channel} />
						{message.orderId && (
							<Badge variant="outline" className="text-xs font-mono">
								{message.orderId}
							</Badge>
						)}
					</div>
					<div className="flex items-center gap-1 shrink-0">
						<Button
							variant="ghost"
							size="icon-sm"
							className={`size-6 ${
								message.isStarred
									? 'text-amber-400'
									: 'opacity-0 group-hover:opacity-100'
							}`}
						>
							<Star
								className={`size-3 ${message.isStarred ? 'fill-current' : ''}`}
							/>
						</Button>
						<Button
							variant="ghost"
							size="icon-sm"
							className="size-6 opacity-0 group-hover:opacity-100"
						>
							<MoreVertical className="size-3" />
						</Button>
					</div>
				</div>
				<h4
					className={`text-sm mb-1 line-clamp-1 ${
						!message.isRead ? 'font-medium text-foreground' : 'text-foreground'
					}`}
				>
					{message.subject}
				</h4>
				<p className="text-sm text-muted-foreground line-clamp-2 mb-2">
					{message.preview}
				</p>
				<div className="flex items-center justify-between">
					<span className="text-xs text-muted-foreground">
						{message.timestamp}
					</span>
					<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
						<Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
							<Reply className="size-3" />
							Reply
						</Button>
						<Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
							<Archive className="size-3" />
							Archive
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const ChannelFilters = () => (
	<div className="flex gap-2">
		<Button variant="secondary" size="sm" className="gap-1">
			All
		</Button>
		<Button variant="ghost" size="sm" className="gap-1">
			<Mail className="size-4 text-blue-400" />
			Email
		</Button>
		<Button variant="ghost" size="sm" className="gap-1">
			<MessageSquare className="size-4 text-purple-400" />
			Chat
		</Button>
		<Button variant="ghost" size="sm" className="gap-1">
			<Phone className="size-4 text-emerald-400" />
			Phone
		</Button>
	</div>
);

const MessageNotifications = ({
	title,
	messages,
	unreadCount,
}: MessageNotificationsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<MessageSquare className="size-5" />
				{title}
				{unreadCount > 0 && (
					<Badge className="bg-primary text-primary-foreground">
						{unreadCount}
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm">
				Compose
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<ChannelFilters />
			<ScrollArea className="h-[420px]">
				<div className="space-y-3 pr-4">
					{messages.map((message) => (
						<MessageCard key={message.id} message={message} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const messages: Message[] = [
		{
			id: '1',
			channel: 'email',
			from: {
				name: 'Sarah Chen',
				email: 'sarah@email.com',
				initials: 'SC',
			},
			subject: 'Question about order #ORD-2024-0892',
			preview:
				"Hi, I wanted to ask about the delivery timeline for my recent order. The tracking shows it's been stuck in transit for 3 days now...",
			timestamp: '5 min ago',
			isRead: false,
			orderId: 'ORD-2024-0892',
		},
		{
			id: '2',
			channel: 'chat',
			from: {
				name: 'Mike Johnson',
				email: 'mike@email.com',
				initials: 'MJ',
			},
			subject: 'Product availability inquiry',
			preview:
				"Is the Smart Watch Pro available in silver color? I've been waiting for it to come back in stock.",
			timestamp: '15 min ago',
			isRead: false,
			isStarred: true,
		},
		{
			id: '3',
			channel: 'phone',
			from: {
				name: 'Emily Davis',
				initials: 'ED',
			},
			subject: 'Callback request - Warranty claim',
			preview:
				'Customer called about warranty claim for gaming mouse purchased 3 months ago. Requested callback at 2:00 PM.',
			timestamp: '1 hour ago',
			isRead: true,
		},
		{
			id: '4',
			channel: 'email',
			from: {
				name: 'Alex Kim',
				email: 'alex@email.com',
				initials: 'AK',
			},
			subject: 'Bulk order inquiry',
			preview:
				"We're interested in placing a bulk order for 50 wireless keyboards. Could you provide pricing information and delivery options?",
			timestamp: '2 hours ago',
			isRead: true,
			isStarred: true,
		},
		{
			id: '5',
			channel: 'chat',
			from: {
				name: 'Jordan Lee',
				initials: 'JL',
			},
			subject: 'Return request',
			preview:
				"I'd like to return the monitor I purchased last week. The screen has a dead pixel.",
			timestamp: '3 hours ago',
			isRead: true,
			orderId: 'ORD-2024-0845',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<MessageNotifications
					title="Messages"
					messages={messages}
					unreadCount={2}
				/>
			</div>
		</section>
	);
}
