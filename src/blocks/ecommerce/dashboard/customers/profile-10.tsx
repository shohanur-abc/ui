import {
	CheckCircle,
	Clock,
	Edit2,
	Headphones,
	Mail,
	MessageSquare,
	MoreHorizontal,
	Phone,
	Star,
	ThumbsDown,
	ThumbsUp,
	Ticket,
	User,
	XCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SupportProfile {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar?: string;
	initials: string;
	supportStats: {
		totalTickets: number;
		openTickets: number;
		resolvedTickets: number;
		avgResolutionTime: string;
	};
	satisfaction: {
		score: number;
		totalRatings: number;
		breakdown: {
			positive: number;
			neutral: number;
			negative: number;
		};
	};
	preferredChannel: 'email' | 'phone' | 'chat' | 'self-service';
	recentTickets: Array<{
		id: string;
		subject: string;
		status: 'open' | 'in-progress' | 'resolved' | 'closed';
		priority: 'low' | 'medium' | 'high' | 'urgent';
		created: string;
		agent?: string;
	}>;
	notes: Array<{
		id: string;
		content: string;
		author: string;
		date: string;
	}>;
	tags: string[];
}

const TicketStatusBadge = ({
	status,
}: {
	status: 'open' | 'in-progress' | 'resolved' | 'closed';
}) => {
	const config: Record<
		string,
		{ label: string; className: string; icon: React.ElementType }
	> = {
		open: {
			label: 'Open',
			className: 'bg-blue-500/10 text-blue-500',
			icon: Clock,
		},
		'in-progress': {
			label: 'In Progress',
			className: 'bg-amber-500/10 text-amber-500',
			icon: Clock,
		},
		resolved: {
			label: 'Resolved',
			className: 'bg-emerald-500/10 text-emerald-500',
			icon: CheckCircle,
		},
		closed: {
			label: 'Closed',
			className: 'bg-slate-500/10 text-slate-400',
			icon: XCircle,
		},
	};
	const { label, className, icon: Icon } = config[status];
	return (
		<Badge variant="outline" className={`${className} gap-1`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const PriorityBadge = ({
	priority,
}: {
	priority: 'low' | 'medium' | 'high' | 'urgent';
}) => {
	const config: Record<string, string> = {
		low: 'bg-slate-500/10 text-slate-400',
		medium: 'bg-blue-500/10 text-blue-500',
		high: 'bg-orange-500/10 text-orange-500',
		urgent: 'bg-red-500/10 text-red-500',
	};
	return (
		<Badge variant="outline" className={`${config[priority]} capitalize`}>
			{priority}
		</Badge>
	);
};

const ChannelIcon = ({ channel }: { channel: string }) => {
	const icons: Record<string, React.ElementType> = {
		email: Mail,
		phone: Phone,
		chat: MessageSquare,
		'self-service': User,
	};
	const Icon = icons[channel] || Mail;
	return <Icon className="size-4" />;
};

const SatisfactionMeter = ({
	satisfaction,
}: {
	satisfaction: SupportProfile['satisfaction'];
}) => {
	const getColor = (score: number) => {
		if (score >= 80) return 'text-emerald-500';
		if (score >= 60) return 'text-amber-500';
		return 'text-red-500';
	};
	return (
		<div className="text-center">
			<div className="inline-flex items-center gap-1 mb-2">
				<Star
					className={`size-6 ${getColor(satisfaction.score)} fill-current`}
				/>
				<span className={`text-3xl font-bold ${getColor(satisfaction.score)}`}>
					{satisfaction.score}%
				</span>
			</div>
			<p className="text-sm text-muted-foreground">
				{satisfaction.totalRatings} ratings
			</p>
			<div className="flex justify-center gap-4 mt-3">
				<div className="flex items-center gap-1 text-emerald-500">
					<ThumbsUp className="size-4" />
					<span className="text-sm font-medium">
						{satisfaction.breakdown.positive}%
					</span>
				</div>
				<div className="flex items-center gap-1 text-slate-400">
					<span className="text-sm font-medium">
						{satisfaction.breakdown.neutral}%
					</span>
				</div>
				<div className="flex items-center gap-1 text-red-500">
					<ThumbsDown className="size-4" />
					<span className="text-sm font-medium">
						{satisfaction.breakdown.negative}%
					</span>
				</div>
			</div>
		</div>
	);
};

const StatCard = ({
	label,
	value,
	className,
}: {
	label: string;
	value: string | number;
	className?: string;
}) => (
	<div className="text-center">
		<p className={`text-2xl font-bold ${className || ''}`}>{value}</p>
		<p className="text-xs text-muted-foreground">{label}</p>
	</div>
);

const TicketCard = ({
	ticket,
}: {
	ticket: SupportProfile['recentTickets'][0];
}) => (
	<div className="flex items-start gap-3 rounded-lg border p-3">
		<Ticket className="size-4 text-muted-foreground mt-0.5" />
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-mono text-xs text-muted-foreground">
					{ticket.id}
				</span>
				<TicketStatusBadge status={ticket.status} />
				<PriorityBadge priority={ticket.priority} />
			</div>
			<p className="font-medium text-sm truncate">{ticket.subject}</p>
			<div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
				<span>{ticket.created}</span>
				{ticket.agent && (
					<>
						<span>•</span>
						<span>Agent: {ticket.agent}</span>
					</>
				)}
			</div>
		</div>
		<Button variant="ghost" size="icon-sm">
			<MoreHorizontal className="size-4" />
		</Button>
	</div>
);

const ProfileHeader = ({ profile }: { profile: SupportProfile }) => (
	<div className="flex flex-col @md:flex-row gap-4 items-start">
		<Avatar className="size-16">
			<AvatarImage src={profile.avatar} alt={profile.name} />
			<AvatarFallback className="bg-primary/10 text-primary text-xl">
				{profile.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
			<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
				<span className="flex items-center gap-1">
					<Mail className="size-3.5" />
					{profile.email}
				</span>
				<span className="flex items-center gap-1">
					<Phone className="size-3.5" />
					{profile.phone}
				</span>
			</div>
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-1.5 text-sm">
					<span className="text-muted-foreground">Preferred:</span>
					<Badge variant="secondary" className="gap-1 capitalize">
						<ChannelIcon channel={profile.preferredChannel} />
						{profile.preferredChannel.replace('-', ' ')}
					</Badge>
				</div>
				<div className="flex flex-wrap gap-1">
					{profile.tags.map((tag) => (
						<Badge key={tag} variant="outline" className="text-xs">
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Button variant="default" size="sm" className="gap-1.5">
				<Ticket className="size-3.5" />
				New Ticket
			</Button>
			<Button variant="outline" size="sm" className="gap-1.5">
				<MessageSquare className="size-3.5" />
				Message
			</Button>
		</div>
	</div>
);

export default function Main() {
	const profile: SupportProfile = {
		id: '1',
		name: 'Jennifer Adams',
		email: 'jennifer.a@email.com',
		phone: '+1 555-0567',
		initials: 'JA',
		supportStats: {
			totalTickets: 18,
			openTickets: 2,
			resolvedTickets: 16,
			avgResolutionTime: '4.2 hours',
		},
		satisfaction: {
			score: 85,
			totalRatings: 14,
			breakdown: { positive: 78, neutral: 14, negative: 8 },
		},
		preferredChannel: 'chat',
		recentTickets: [
			{
				id: 'TKT-4521',
				subject: 'Order not received - tracking shows delivered',
				status: 'in-progress',
				priority: 'high',
				created: '2 hours ago',
				agent: 'Mike S.',
			},
			{
				id: 'TKT-4489',
				subject: 'Request for invoice copy',
				status: 'open',
				priority: 'low',
				created: '1 day ago',
			},
			{
				id: 'TKT-4423',
				subject: 'Product exchange inquiry',
				status: 'resolved',
				priority: 'medium',
				created: '1 week ago',
				agent: 'Sarah L.',
			},
			{
				id: 'TKT-4398',
				subject: 'Account login issues',
				status: 'closed',
				priority: 'medium',
				created: '2 weeks ago',
				agent: 'Tom K.',
			},
		],
		notes: [
			{
				id: '1',
				content: 'VIP customer - prioritize all requests',
				author: 'Admin',
				date: 'Jan 10, 2024',
			},
			{
				id: '2',
				content: 'Prefers callbacks over email',
				author: 'Mike S.',
				date: 'Dec 15, 2023',
			},
		],
		tags: ['VIP', 'Loyalty Member', 'High Value'],
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<ProfileHeader profile={profile} />

				<div className="grid @lg:grid-cols-3 gap-6">
					<Card className="@lg:col-span-2">
						<CardContent className="p-6">
							<div className="grid grid-cols-4 gap-4">
								<StatCard
									label="Total Tickets"
									value={profile.supportStats.totalTickets}
								/>
								<StatCard
									label="Open"
									value={profile.supportStats.openTickets}
									className="text-blue-500"
								/>
								<StatCard
									label="Resolved"
									value={profile.supportStats.resolvedTickets}
									className="text-emerald-500"
								/>
								<StatCard
									label="Avg Resolution"
									value={profile.supportStats.avgResolutionTime}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<SatisfactionMeter satisfaction={profile.satisfaction} />
						</CardContent>
					</Card>
				</div>

				<div className="grid @lg:grid-cols-3 gap-6">
					<Card className="@lg:col-span-2">
						<CardHeader>
							<CardTitle className="text-base flex items-center gap-2">
								<Ticket className="size-4" />
								Recent Tickets
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{profile.recentTickets.map((ticket) => (
								<TicketCard key={ticket.id} ticket={ticket} />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<CardTitle className="text-base flex items-center gap-2">
								<MessageSquare className="size-4" />
								Internal Notes
							</CardTitle>
							<Button variant="ghost" size="icon-sm">
								<Edit2 className="size-3.5" />
							</Button>
						</CardHeader>
						<CardContent className="space-y-4">
							{profile.notes.map((note) => (
								<div
									key={note.id}
									className="rounded-lg border bg-muted/30 p-3"
								>
									<p className="text-sm">{note.content}</p>
									<div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
										<span>{note.author}</span>
										<span>{note.date}</span>
									</div>
								</div>
							))}
							<Button variant="outline" size="sm" className="w-full">
								Add Note
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
