import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Scale,
	CheckCircle2,
	XCircle,
	AlertTriangle,
	Clock,
	FileText,
	MessageSquare,
	DollarSign,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';

interface Dispute {
	id: string;
	orderId: string;
	customer: string;
	reason:
		| 'product_quality'
		| 'not_received'
		| 'wrong_item'
		| 'unauthorized'
		| 'other';
	amount: string;
	status: 'open' | 'under_review' | 'won' | 'lost' | 'closed';
	priority: 'low' | 'medium' | 'high';
	dueDate?: string;
	daysRemaining?: number;
	messages: number;
	documents: number;
	createdAt: string;
}

interface DisputeTrackerProps {
	title: string;
	disputes: Dispute[];
	stats: {
		openDisputes: number;
		totalAmount: string;
		winRate: string;
		avgResolution: string;
	};
}

const StatusConfig: Record<
	Dispute['status'],
	{ label: string; className: string; icon: LucideIcon }
> = {
	open: {
		label: 'Open',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		icon: AlertTriangle,
	},
	under_review: {
		label: 'Under Review',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		icon: Clock,
	},
	won: {
		label: 'Won',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		icon: CheckCircle2,
	},
	lost: {
		label: 'Lost',
		className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		icon: XCircle,
	},
	closed: {
		label: 'Closed',
		className: 'bg-muted text-muted-foreground border-border',
		icon: CheckCircle2,
	},
};

const ReasonLabels: Record<Dispute['reason'], string> = {
	product_quality: 'Product Quality',
	not_received: 'Not Received',
	wrong_item: 'Wrong Item',
	unauthorized: 'Unauthorized',
	other: 'Other',
};

const PriorityConfig: Record<Dispute['priority'], { className: string }> = {
	low: { className: 'bg-muted text-muted-foreground' },
	medium: { className: 'bg-amber-500/20 text-amber-400' },
	high: { className: 'bg-rose-500/20 text-rose-400' },
};

const DisputeCard = ({ dispute }: { dispute: Dispute }) => {
	const statusConfig = StatusConfig[dispute.status];
	const priorityConfig = PriorityConfig[dispute.priority];
	const StatusIcon = statusConfig.icon;
	const isActive = ['open', 'under_review'].includes(dispute.status);

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				dispute.priority === 'high' && isActive
					? 'border-rose-500/30 bg-rose-500/5'
					: isActive
						? 'border-amber-500/30 bg-amber-500/5'
						: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start justify-between mb-3">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<span className="font-mono text-sm font-semibold text-foreground">
							{dispute.id}
						</span>
						<Badge variant="outline" className={statusConfig.className}>
							<StatusIcon className="size-3 mr-1" />
							{statusConfig.label}
						</Badge>
					</div>
					<span className="text-xs text-muted-foreground">
						Order: {dispute.orderId} • {dispute.customer}
					</span>
				</div>
				<div className="text-right">
					<span className="text-lg font-bold text-foreground block">
						{dispute.amount}
					</span>
					<Badge className={priorityConfig.className}>
						{dispute.priority} priority
					</Badge>
				</div>
			</div>

			<div className="p-2 rounded-lg bg-muted/30 mb-3">
				<span className="text-xs text-muted-foreground">Reason:</span>
				<span className="text-sm text-foreground block">
					{ReasonLabels[dispute.reason]}
				</span>
			</div>

			<div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
				<div className="flex items-center gap-4">
					<span className="flex items-center gap-1">
						<MessageSquare className="size-3" />
						{dispute.messages} messages
					</span>
					<span className="flex items-center gap-1">
						<FileText className="size-3" />
						{dispute.documents} documents
					</span>
				</div>
				<span>Created: {dispute.createdAt}</span>
			</div>

			{isActive && dispute.daysRemaining !== undefined && (
				<div
					className={`flex items-center justify-between p-2 rounded-lg ${
						dispute.daysRemaining <= 3
							? 'bg-rose-500/10 text-rose-400'
							: 'bg-amber-500/10 text-amber-400'
					}`}
				>
					<span className="flex items-center gap-1 text-xs">
						<Clock className="size-3" />
						Response due: {dispute.dueDate}
					</span>
					<span className="text-xs font-medium">
						{dispute.daysRemaining} days left
					</span>
				</div>
			)}

			{isActive && (
				<Button size="sm" className="w-full h-8 mt-3 gap-1">
					Respond
					<ArrowRight className="size-3" />
				</Button>
			)}
		</div>
	);
};

const DisputeStats = ({ stats }: { stats: DisputeTrackerProps['stats'] }) => (
	<div className="grid grid-cols-4 gap-2">
		<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
			<Scale className="size-4 text-amber-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-amber-400 block">
				{stats.openDisputes}
			</span>
			<span className="text-xs text-muted-foreground">Open</span>
		</div>
		<div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-center">
			<DollarSign className="size-4 text-rose-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-rose-400 block">
				{stats.totalAmount}
			</span>
			<span className="text-xs text-muted-foreground">At Risk</span>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
			<CheckCircle2 className="size-4 text-emerald-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-emerald-400 block">
				{stats.winRate}
			</span>
			<span className="text-xs text-muted-foreground">Win Rate</span>
		</div>
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-center">
			<Clock className="size-4 text-muted-foreground mx-auto mb-1" />
			<span className="text-lg font-bold text-foreground block">
				{stats.avgResolution}
			</span>
			<span className="text-xs text-muted-foreground">Avg Time</span>
		</div>
	</div>
);

const DisputeTracker = ({ title, disputes, stats }: DisputeTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Scale className="size-5" />
				{title}
				{stats.openDisputes > 0 && (
					<Badge className="bg-amber-500 text-white">
						{stats.openDisputes} Open
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm">
				View All
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<DisputeStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{disputes.map((dispute) => (
						<DisputeCard key={dispute.id} dispute={dispute} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const disputes: Dispute[] = [
		{
			id: 'DIS-2024-0892',
			orderId: 'ORD-2024-0756',
			customer: 'John Smith',
			reason: 'product_quality',
			amount: '$299.99',
			status: 'open',
			priority: 'high',
			dueDate: 'Mar 20',
			daysRemaining: 2,
			messages: 5,
			documents: 3,
			createdAt: 'Mar 10',
		},
		{
			id: 'DIS-2024-0891',
			orderId: 'ORD-2024-0734',
			customer: 'Sarah Chen',
			reason: 'not_received',
			amount: '$149.00',
			status: 'under_review',
			priority: 'medium',
			dueDate: 'Mar 25',
			daysRemaining: 7,
			messages: 8,
			documents: 5,
			createdAt: 'Mar 5',
		},
		{
			id: 'DIS-2024-0890',
			orderId: 'ORD-2024-0698',
			customer: 'Mike Johnson',
			reason: 'unauthorized',
			amount: '$599.00',
			status: 'won',
			priority: 'high',
			messages: 12,
			documents: 8,
			createdAt: 'Feb 28',
		},
		{
			id: 'DIS-2024-0889',
			orderId: 'ORD-2024-0654',
			customer: 'Emily Davis',
			reason: 'wrong_item',
			amount: '$89.99',
			status: 'lost',
			priority: 'low',
			messages: 4,
			documents: 2,
			createdAt: 'Feb 20',
		},
		{
			id: 'DIS-2024-0888',
			orderId: 'ORD-2024-0612',
			customer: 'Alex Kim',
			reason: 'other',
			amount: '$199.00',
			status: 'closed',
			priority: 'medium',
			messages: 6,
			documents: 4,
			createdAt: 'Feb 15',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<DisputeTracker
					title="Dispute Tracker"
					disputes={disputes}
					stats={{
						openDisputes: 5,
						totalAmount: '$1,336',
						winRate: '78%',
						avgResolution: '12 days',
					}}
				/>
			</div>
		</section>
	);
}
