import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	MessageSquare,
	Phone,
	Mail,
	Clock,
	CheckCircle2,
	AlertCircle,
	User,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';

interface SupportInteraction {
	id: string;
	channel: 'chat' | 'phone' | 'email';
	customer: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
	};
	subject: string;
	preview: string;
	status: 'waiting' | 'active' | 'resolved';
	waitTime?: string;
	agent?: {
		name: string;
		initials: string;
	};
	timestamp: string;
}

interface SupportFeedProps {
	title: string;
	interactions: SupportInteraction[];
	queueStats: {
		waiting: number;
		active: number;
		avgWaitTime: string;
	};
}

const ChannelIcon = ({
	channel,
}: {
	channel: SupportInteraction['channel'];
}) => {
	const config: Record<
		SupportInteraction['channel'],
		{ icon: LucideIcon; className: string }
	> = {
		chat: { icon: MessageSquare, className: 'bg-blue-500/20 text-blue-400' },
		phone: { icon: Phone, className: 'bg-emerald-500/20 text-emerald-400' },
		email: { icon: Mail, className: 'bg-purple-500/20 text-purple-400' },
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

const StatusIndicator = ({
	status,
}: {
	status: SupportInteraction['status'];
}) => {
	const config = {
		waiting: {
			icon: Clock,
			label: 'Waiting',
			className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		},
		active: {
			icon: MessageSquare,
			label: 'Active',
			className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		},
		resolved: {
			icon: CheckCircle2,
			label: 'Resolved',
			className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		},
	};

	const { icon: Icon, label, className } = config[status];

	return (
		<Badge variant="outline" className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const InteractionCard = ({
	interaction,
}: {
	interaction: SupportInteraction;
}) => (
	<div className="group rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30">
		<div className="flex gap-4">
			<ChannelIcon channel={interaction.channel} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex items-center gap-2 min-w-0">
						<Avatar className="size-6">
							<AvatarImage
								src={interaction.customer.avatar}
								alt={interaction.customer.name}
							/>
							<AvatarFallback className="text-[10px] bg-secondary">
								{interaction.customer.initials}
							</AvatarFallback>
						</Avatar>
						<span className="font-medium text-foreground truncate">
							{interaction.customer.name}
						</span>
					</div>
					<StatusIndicator status={interaction.status} />
				</div>
				<h4 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
					{interaction.subject}
				</h4>
				<p className="text-sm text-muted-foreground line-clamp-2">
					{interaction.preview}
				</p>
				<div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
					<div className="flex items-center gap-3 text-xs text-muted-foreground">
						<span>{interaction.timestamp}</span>
						{interaction.waitTime && interaction.status === 'waiting' && (
							<span className="flex items-center gap-1 text-amber-400">
								<Clock className="size-3" />
								{interaction.waitTime} wait
							</span>
						)}
					</div>
					<div className="flex items-center gap-2">
						{interaction.agent ? (
							<div className="flex items-center gap-1.5 text-xs">
								<Avatar className="size-5 border border-primary/30">
									<AvatarFallback className="text-[10px] bg-primary/20 text-primary">
										{interaction.agent.initials}
									</AvatarFallback>
								</Avatar>
								<span className="text-muted-foreground">
									{interaction.agent.name}
								</span>
							</div>
						) : (
							<Button size="sm" className="h-7 text-xs">
								Take Over
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
);

const QueueStats = ({ stats }: { stats: SupportFeedProps['queueStats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex flex-col items-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<div className="flex items-center gap-1.5 mb-1">
				<AlertCircle className="size-4 text-amber-400" />
				<span className="text-xs text-muted-foreground">Waiting</span>
			</div>
			<span className="text-2xl font-bold text-amber-400">{stats.waiting}</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<div className="flex items-center gap-1.5 mb-1">
				<User className="size-4 text-blue-400" />
				<span className="text-xs text-muted-foreground">Active</span>
			</div>
			<span className="text-2xl font-bold text-blue-400">{stats.active}</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-muted/50 border border-border/50">
			<div className="flex items-center gap-1.5 mb-1">
				<Clock className="size-4 text-muted-foreground" />
				<span className="text-xs text-muted-foreground">Avg Wait</span>
			</div>
			<span className="text-2xl font-bold text-foreground">
				{stats.avgWaitTime}
			</span>
		</div>
	</div>
);

const SupportFeed = ({ title, interactions, queueStats }: SupportFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm" className="gap-2">
				<span>Support Dashboard</span>
				<ArrowRight className="size-4" />
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-6">
			<QueueStats stats={queueStats} />
			<ScrollArea className="h-[450px]">
				<div className="space-y-3 pr-4">
					{interactions.map((interaction) => (
						<InteractionCard key={interaction.id} interaction={interaction} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const supportInteractions: SupportInteraction[] = [
		{
			id: '1',
			channel: 'chat',
			customer: {
				name: 'Jennifer Adams',
				email: 'jennifer@example.com',
				initials: 'JA',
			},
			subject: 'Order tracking not updating',
			preview:
				'Hi, I placed an order 3 days ago and the tracking status still shows "processing". Can you help?',
			status: 'waiting',
			waitTime: '3m',
			timestamp: 'Just now',
		},
		{
			id: '2',
			channel: 'phone',
			customer: {
				name: 'Robert Chen',
				email: 'robert@example.com',
				initials: 'RC',
			},
			subject: 'Refund request for damaged item',
			preview:
				'Customer received damaged product, requesting full refund and return label',
			status: 'active',
			agent: { name: 'Sarah K.', initials: 'SK' },
			timestamp: '5 min ago',
		},
		{
			id: '3',
			channel: 'email',
			customer: {
				name: 'Maria Garcia',
				email: 'maria@example.com',
				initials: 'MG',
			},
			subject: 'Bulk order inquiry for business',
			preview:
				'Hello, we are interested in placing a bulk order for our company. Could you provide wholesale pricing?',
			status: 'waiting',
			waitTime: '12m',
			timestamp: '15 min ago',
		},
		{
			id: '4',
			channel: 'chat',
			customer: {
				name: 'David Park',
				email: 'david@example.com',
				initials: 'DP',
			},
			subject: 'Product warranty question',
			preview: 'Does the extended warranty cover accidental damage?',
			status: 'active',
			agent: { name: 'Mike J.', initials: 'MJ' },
			timestamp: '20 min ago',
		},
		{
			id: '5',
			channel: 'email',
			customer: {
				name: 'Lisa Anderson',
				email: 'lisa@example.com',
				initials: 'LA',
			},
			subject: 'Thank you for the quick resolution!',
			preview:
				'I wanted to thank your support team for resolving my issue so quickly. Great service!',
			status: 'resolved',
			agent: { name: 'Emily D.', initials: 'ED' },
			timestamp: '1 hour ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<SupportFeed
					title="Support Queue"
					interactions={supportInteractions}
					queueStats={{ waiting: 8, active: 5, avgWaitTime: '4m' }}
				/>
			</div>
		</section>
	);
}
