import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Calendar,
	Clock,
	Tag,
	Layers,
	Filter,
	RefreshCw,
	ChevronRight,
	Zap,
	type LucideIcon,
} from 'lucide-react';

interface EventLog {
	id: string;
	category: string;
	eventName: string;
	eventType: 'user' | 'system' | 'integration' | 'scheduled' | 'triggered';
	properties: Record<string, string>;
	source: string;
	correlationId?: string;
	duration?: string;
	timestamp: string;
}

interface EventLogProps {
	title: string;
	events: EventLog[];
	recentCount: string;
	lastUpdated: string;
}

const EventTypeBadge = ({ type }: { type: EventLog['eventType'] }) => {
	const config: Record<EventLog['eventType'], string> = {
		user: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		system: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		integration: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		scheduled: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		triggered: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
	};

	return (
		<Badge variant="outline" className={`text-xs capitalize ${config[type]}`}>
			{type}
		</Badge>
	);
};

const CategoryBadge = ({ category }: { category: string }) => (
	<Badge variant="outline" className="text-xs bg-muted/50 gap-1">
		<Tag className="size-3" />
		{category}
	</Badge>
);

const PropertyPill = ({ name, value }: { name: string; value: string }) => (
	<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted/50 text-xs">
		<span className="text-muted-foreground">{name}:</span>
		<span className="text-foreground font-medium">{value}</span>
	</span>
);

const EventEntry = ({ event }: { event: EventLog }) => (
	<div className="group p-4 rounded-xl border border-border/50 bg-card/50 transition-all hover:bg-muted/50 hover:border-border">
		<div className="flex items-start gap-3">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
				<Zap className="size-5 text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex items-center gap-2 flex-wrap">
						<h4 className="font-medium text-foreground">{event.eventName}</h4>
						<EventTypeBadge type={event.eventType} />
						<CategoryBadge category={event.category} />
					</div>
					<span className="text-xs text-muted-foreground shrink-0">
						{event.timestamp}
					</span>
				</div>

				<div className="flex flex-wrap gap-1.5 mb-3">
					{Object.entries(event.properties).map(([key, value]) => (
						<PropertyPill key={key} name={key} value={value} />
					))}
				</div>

				<div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
					<span className="flex items-center gap-1">
						<Layers className="size-3" />
						{event.source}
					</span>
					{event.correlationId && (
						<span className="font-mono">{event.correlationId}</span>
					)}
					{event.duration && (
						<span className="flex items-center gap-1">
							<Clock className="size-3" />
							{event.duration}
						</span>
					)}
				</div>
			</div>
		</div>
	</div>
);

const LogHeader = ({
	recentCount,
	lastUpdated,
}: {
	recentCount: string;
	lastUpdated: string;
}) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex items-center gap-3">
			<Calendar className="size-5 text-primary" />
			<div>
				<p className="text-sm text-muted-foreground">Events (24h)</p>
				<p className="font-semibold text-foreground">{recentCount}</p>
			</div>
		</div>
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<RefreshCw className="size-3 animate-spin" />
			<span>Last updated: {lastUpdated}</span>
		</div>
	</div>
);

const EventLogViewer = ({
	title,
	events,
	recentCount,
	lastUpdated,
}: EventLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Zap className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<Filter className="size-4" />
					Filter
				</Button>
				<Button variant="outline" size="sm" className="gap-1">
					View All
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<LogHeader recentCount={recentCount} lastUpdated={lastUpdated} />
			<ScrollArea className="h-[420px]">
				<div className="space-y-3 pr-4">
					{events.map((event) => (
						<EventEntry key={event.id} event={event} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const eventLogs: EventLog[] = [
		{
			id: '1',
			category: 'checkout',
			eventName: 'order.completed',
			eventType: 'user',
			properties: {
				orderId: 'ORD-2024-0892',
				total: '$249.99',
				items: '3',
				paymentMethod: 'card',
			},
			source: 'web-frontend',
			correlationId: 'corr_abc123',
			duration: '2.3s',
			timestamp: '2024-03-15 14:32:45',
		},
		{
			id: '2',
			category: 'inventory',
			eventName: 'stock.threshold.reached',
			eventType: 'triggered',
			properties: {
				sku: 'SKU-12345',
				current: '5',
				threshold: '10',
				action: 'reorder_triggered',
			},
			source: 'inventory-service',
			timestamp: '2024-03-15 14:30:22',
		},
		{
			id: '3',
			category: 'email',
			eventName: 'campaign.sent',
			eventType: 'scheduled',
			properties: {
				campaignId: 'CAMP-456',
				recipients: '12,450',
				template: 'spring_sale',
			},
			source: 'email-service',
			duration: '45.2s',
			timestamp: '2024-03-15 14:00:00',
		},
		{
			id: '4',
			category: 'integration',
			eventName: 'webhook.received',
			eventType: 'integration',
			properties: {
				provider: 'stripe',
				event: 'payment.succeeded',
				amount: '$149.99',
			},
			source: 'webhook-handler',
			correlationId: 'corr_def456',
			timestamp: '2024-03-15 13:55:30',
		},
		{
			id: '5',
			category: 'cache',
			eventName: 'cache.invalidated',
			eventType: 'system',
			properties: {
				key: 'product_catalog',
				reason: 'ttl_expired',
				entries: '1,234',
			},
			source: 'cache-service',
			timestamp: '2024-03-15 13:45:00',
		},
		{
			id: '6',
			category: 'auth',
			eventName: 'session.created',
			eventType: 'user',
			properties: {
				userId: 'usr_789',
				method: 'oauth',
				provider: 'google',
			},
			source: 'auth-service',
			correlationId: 'corr_ghi789',
			timestamp: '2024-03-15 13:42:15',
		},
		{
			id: '7',
			category: 'analytics',
			eventName: 'report.generated',
			eventType: 'scheduled',
			properties: {
				reportType: 'daily_sales',
				period: '2024-03-14',
				format: 'pdf',
			},
			source: 'analytics-service',
			duration: '12.8s',
			timestamp: '2024-03-15 06:00:00',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<EventLogViewer
					title="Event Log"
					events={eventLogs}
					recentCount="24,567"
					lastUpdated="Just now"
				/>
			</div>
		</section>
	);
}
