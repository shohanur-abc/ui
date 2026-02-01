import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Webhook,
	CheckCircle2,
	XCircle,
	Clock,
	RefreshCw,
	ExternalLink,
	Copy,
	type LucideIcon,
} from 'lucide-react';

interface WebhookEvent {
	id: string;
	eventType: string;
	endpoint: string;
	method: 'POST' | 'PUT' | 'DELETE';
	status: 'success' | 'failed' | 'pending' | 'retrying';
	statusCode?: number;
	latency?: string;
	retryCount?: number;
	payload: string;
	response?: string;
	timestamp: string;
}

interface WebhookStreamProps {
	title: string;
	events: WebhookEvent[];
	stats: {
		totalToday: number;
		successRate: string;
		avgLatency: string;
		failedToday: number;
	};
}

const StatusIcon = ({ status }: { status: WebhookEvent['status'] }) => {
	const config: Record<
		WebhookEvent['status'],
		{ icon: LucideIcon; className: string }
	> = {
		success: { icon: CheckCircle2, className: 'text-emerald-400' },
		failed: { icon: XCircle, className: 'text-rose-400' },
		pending: { icon: Clock, className: 'text-amber-400' },
		retrying: { icon: RefreshCw, className: 'text-blue-400 animate-spin' },
	};

	const { icon: Icon, className } = config[status];
	return <Icon className={`size-5 ${className}`} />;
};

const MethodBadge = ({ method }: { method: WebhookEvent['method'] }) => {
	const config = {
		POST: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		PUT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		DELETE: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge variant="outline" className={`font-mono text-xs ${config[method]}`}>
			{method}
		</Badge>
	);
};

const StatusCodeBadge = ({ code }: { code?: number }) => {
	if (!code) return null;

	const getClass = () => {
		if (code >= 200 && code < 300)
			return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
		if (code >= 400 && code < 500)
			return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
		if (code >= 500) return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
		return 'bg-muted text-muted-foreground border-border';
	};

	return (
		<Badge variant="outline" className={`font-mono text-xs ${getClass()}`}>
			{code}
		</Badge>
	);
};

const WebhookCard = ({ event }: { event: WebhookEvent }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all ${
			event.status === 'failed'
				? 'border-rose-500/30 bg-rose-500/5'
				: event.status === 'retrying'
					? 'border-blue-500/30 bg-blue-500/5'
					: 'border-border/50 bg-card/80'
		}`}
	>
		<div className="flex items-start gap-4">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/50">
				<StatusIcon status={event.status} />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1 flex-wrap">
							<span className="font-medium text-foreground">
								{event.eventType}
							</span>
							<MethodBadge method={event.method} />
							<StatusCodeBadge code={event.statusCode} />
						</div>
						<div className="flex items-center gap-2">
							<span className="text-xs text-muted-foreground font-mono truncate max-w-xs">
								{event.endpoint}
							</span>
							<Button
								variant="ghost"
								size="icon-sm"
								className="size-5 shrink-0"
							>
								<Copy className="size-3" />
							</Button>
						</div>
					</div>
					<span className="text-xs text-muted-foreground shrink-0">
						{event.timestamp}
					</span>
				</div>

				<div className="p-2 rounded-md bg-muted/50 mb-2">
					<div className="flex items-center justify-between mb-1">
						<span className="text-xs text-muted-foreground">Payload</span>
						<Button variant="ghost" size="icon-sm" className="size-5">
							<Copy className="size-3" />
						</Button>
					</div>
					<code className="text-xs text-foreground font-mono line-clamp-2">
						{event.payload}
					</code>
				</div>

				{event.status === 'failed' && event.response && (
					<div className="p-2 rounded-md bg-rose-500/10 mb-2">
						<span className="text-xs text-rose-400 font-mono">
							{event.response}
						</span>
					</div>
				)}

				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<div className="flex items-center gap-3">
						{event.latency && (
							<div className="flex items-center gap-1">
								<Clock className="size-3" />
								<span>{event.latency}</span>
							</div>
						)}
						{event.retryCount !== undefined && event.retryCount > 0 && (
							<div className="flex items-center gap-1">
								<RefreshCw className="size-3" />
								<span>Retry {event.retryCount}/3</span>
							</div>
						)}
					</div>
					<Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
						<ExternalLink className="size-3" />
						Details
					</Button>
				</div>
			</div>
		</div>
	</div>
);

const WebhookStats = ({ stats }: { stats: WebhookStreamProps['stats'] }) => (
	<div className="grid grid-cols-4 gap-3">
		<div className="flex flex-col p-3 rounded-lg bg-muted/30 border border-border/50">
			<Webhook className="size-4 text-primary mb-1" />
			<span className="text-xl font-bold text-foreground">
				{stats.totalToday}
			</span>
			<span className="text-xs text-muted-foreground">Today</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<CheckCircle2 className="size-4 text-emerald-400 mb-1" />
			<span className="text-xl font-bold text-emerald-400">
				{stats.successRate}
			</span>
			<span className="text-xs text-muted-foreground">Success</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<Clock className="size-4 text-blue-400 mb-1" />
			<span className="text-xl font-bold text-blue-400">
				{stats.avgLatency}
			</span>
			<span className="text-xs text-muted-foreground">Avg Latency</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<XCircle className="size-4 text-rose-400 mb-1" />
			<span className="text-xl font-bold text-rose-400">
				{stats.failedToday}
			</span>
			<span className="text-xs text-muted-foreground">Failed</span>
		</div>
	</div>
);

const WebhookStream = ({ title, events, stats }: WebhookStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Webhook className="size-5" />
				{title}
			</CardTitle>
			<Button variant="outline" size="sm">
				Manage Webhooks
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<WebhookStats stats={stats} />
			<div className="space-y-3 max-h-[400px] overflow-y-auto">
				{events.map((event) => (
					<WebhookCard key={event.id} event={event} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const events: WebhookEvent[] = [
		{
			id: '1',
			eventType: 'order.created',
			endpoint: 'https://api.warehouse.com/orders',
			method: 'POST',
			status: 'success',
			statusCode: 201,
			latency: '145ms',
			payload: '{"order_id": "ORD-2024-0892", "items": [...], "total": 249.99}',
			timestamp: '10s ago',
		},
		{
			id: '2',
			eventType: 'customer.updated',
			endpoint: 'https://crm.example.com/customers',
			method: 'PUT',
			status: 'success',
			statusCode: 200,
			latency: '89ms',
			payload: '{"customer_id": "cust_123", "email": "updated@email.com"}',
			timestamp: '1m ago',
		},
		{
			id: '3',
			eventType: 'inventory.low_stock',
			endpoint: 'https://api.supplier.com/alerts',
			method: 'POST',
			status: 'retrying',
			retryCount: 2,
			payload: '{"sku": "SKU-12345", "current_stock": 5, "threshold": 10}',
			timestamp: '3m ago',
		},
		{
			id: '4',
			eventType: 'payment.failed',
			endpoint: 'https://accounting.internal/transactions',
			method: 'POST',
			status: 'failed',
			statusCode: 500,
			latency: '2.3s',
			payload:
				'{"payment_id": "pay_456", "amount": 89.99, "error": "declined"}',
			response: 'Internal Server Error: Database connection timeout',
			timestamp: '5m ago',
		},
		{
			id: '5',
			eventType: 'product.deleted',
			endpoint: 'https://cdn.images.com/products',
			method: 'DELETE',
			status: 'success',
			statusCode: 204,
			latency: '67ms',
			payload: '{"product_id": "prod_789", "images": ["img1.jpg", "img2.jpg"]}',
			timestamp: '10m ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<WebhookStream
					title="Webhook Events"
					events={events}
					stats={{
						totalToday: 847,
						successRate: '98.7%',
						avgLatency: '124ms',
						failedToday: 11,
					}}
				/>
			</div>
		</section>
	);
}
