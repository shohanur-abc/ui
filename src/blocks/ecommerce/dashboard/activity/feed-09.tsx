import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Webhook,
	Globe,
	Server,
	Database,
	Zap,
	AlertCircle,
	CheckCircle2,
	Clock,
	RefreshCw,
	ArrowRight,
	type LucideIcon,
} from 'lucide-react';

interface IntegrationEvent {
	id: string;
	integration: {
		name: string;
		type: 'api' | 'webhook' | 'database' | 'service';
		icon?: string;
	};
	event: string;
	status: 'success' | 'failed' | 'pending' | 'warning';
	details?: string;
	dataTransferred?: string;
	responseTime?: string;
	timestamp: string;
}

interface IntegrationFeedProps {
	title: string;
	events: IntegrationEvent[];
	stats: {
		successRate: number;
		totalCalls: string;
		avgResponse: string;
	};
}

const IntegrationIcon = ({
	type,
}: { type: IntegrationEvent['integration']['type'] }) => {
	const config: Record<
		IntegrationEvent['integration']['type'],
		{ icon: LucideIcon; className: string }
	> = {
		api: { icon: Globe, className: 'bg-blue-500/20 text-blue-400' },
		webhook: { icon: Webhook, className: 'bg-purple-500/20 text-purple-400' },
		database: { icon: Database, className: 'bg-emerald-500/20 text-emerald-400' },
		service: { icon: Server, className: 'bg-amber-500/20 text-amber-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const StatusIndicator = ({ status }: { status: IntegrationEvent['status'] }) => {
	const config = {
		success: {
			icon: CheckCircle2,
			label: 'Success',
			className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		},
		failed: {
			icon: AlertCircle,
			label: 'Failed',
			className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		},
		pending: {
			icon: Clock,
			label: 'Pending',
			className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		},
		warning: {
			icon: AlertCircle,
			label: 'Warning',
			className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
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

const EventCard = ({ event }: { event: IntegrationEvent }) => (
	<div
		className={`group rounded-xl border p-4 backdrop-blur-sm transition-all ${
			event.status === 'failed'
				? 'border-rose-500/30 bg-rose-500/5'
				: 'border-border/50 bg-card/80 hover:border-primary/30'
		}`}
	>
		<div className="flex gap-4">
			<IntegrationIcon type={event.integration.type} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<h4 className="font-medium text-foreground">
							{event.integration.name}
						</h4>
						<p className="text-sm text-muted-foreground">{event.event}</p>
					</div>
					<StatusIndicator status={event.status} />
				</div>
				{event.details && (
					<p className="text-xs text-muted-foreground mb-2 line-clamp-2">
						{event.details}
					</p>
				)}
				<div className="flex items-center gap-4 text-xs text-muted-foreground">
					<span>{event.timestamp}</span>
					{event.responseTime && (
						<>
							<span>•</span>
							<span className="flex items-center gap-1">
								<Clock className="size-3" />
								{event.responseTime}
							</span>
						</>
					)}
					{event.dataTransferred && (
						<>
							<span>•</span>
							<span>{event.dataTransferred}</span>
						</>
					)}
				</div>
			</div>
		</div>
	</div>
);

const StatsOverview = ({ stats }: { stats: IntegrationFeedProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex flex-col items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<div className="flex items-center gap-1 mb-1">
				<CheckCircle2 className="size-4 text-emerald-400" />
			</div>
			<span className="text-xl font-bold text-emerald-400">
				{stats.successRate}%
			</span>
			<span className="text-xs text-muted-foreground">Success Rate</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<div className="flex items-center gap-1 mb-1">
				<Zap className="size-4 text-blue-400" />
			</div>
			<span className="text-xl font-bold text-blue-400">{stats.totalCalls}</span>
			<span className="text-xs text-muted-foreground">API Calls</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-muted/50 border border-border/50">
			<div className="flex items-center gap-1 mb-1">
				<Clock className="size-4 text-muted-foreground" />
			</div>
			<span className="text-xl font-bold text-foreground">
				{stats.avgResponse}
			</span>
			<span className="text-xs text-muted-foreground">Avg Response</span>
		</div>
	</div>
);

const IntegrationFeed = ({ title, events, stats }: IntegrationFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<RefreshCw className="size-4" />
					Refresh
				</Button>
				<Button variant="outline" size="sm" className="gap-1">
					Settings
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<StatsOverview stats={stats} />
			<ScrollArea className="h-[400px]">
				<div className="space-y-3 pr-4">
					{events.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const integrationEvents: IntegrationEvent[] = [
		{
			id: '1',
			integration: { name: 'Stripe Payments', type: 'api' },
			event: 'Payment webhook received',
			status: 'success',
			details: 'Successfully processed payment confirmation for order #ORD-2024-0892',
			dataTransferred: '2.4 KB',
			responseTime: '124ms',
			timestamp: '1 min ago',
		},
		{
			id: '2',
			integration: { name: 'Inventory Sync', type: 'database' },
			event: 'Stock level update failed',
			status: 'failed',
			details: 'Connection timeout - unable to sync inventory levels with warehouse system',
			responseTime: '30000ms',
			timestamp: '5 min ago',
		},
		{
			id: '3',
			integration: { name: 'Shippo Shipping', type: 'service' },
			event: 'Label generation request',
			status: 'success',
			details: 'Generated shipping label for 3 packages',
			dataTransferred: '15.2 KB',
			responseTime: '892ms',
			timestamp: '12 min ago',
		},
		{
			id: '4',
			integration: { name: 'Slack Notifications', type: 'webhook' },
			event: 'Order notification sent',
			status: 'success',
			details: 'New order alert posted to #orders channel',
			dataTransferred: '1.1 KB',
			responseTime: '234ms',
			timestamp: '15 min ago',
		},
		{
			id: '5',
			integration: { name: 'Google Analytics', type: 'api' },
			event: 'Event tracking batch',
			status: 'warning',
			details: 'Partial success - 847/850 events processed',
			dataTransferred: '156 KB',
			responseTime: '1.2s',
			timestamp: '30 min ago',
		},
		{
			id: '6',
			integration: { name: 'Mailchimp', type: 'api' },
			event: 'Subscriber sync pending',
			status: 'pending',
			details: 'Queued 234 new subscribers for sync',
			timestamp: '45 min ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<IntegrationFeed
					title="Integration Activity"
					events={integrationEvents}
					stats={{
						successRate: 98.5,
						totalCalls: '24.5K',
						avgResponse: '342ms',
					}}
				/>
			</div>
		</section>
	);
}
