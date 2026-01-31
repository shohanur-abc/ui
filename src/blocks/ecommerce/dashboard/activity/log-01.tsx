import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	AlertCircle,
	CheckCircle2,
	Info,
	AlertTriangle,
	Terminal,
	Filter,
	Download,
	Search,
	type LucideIcon,
} from 'lucide-react';

interface SystemLog {
	id: string;
	level: 'info' | 'success' | 'warning' | 'error';
	service: string;
	message: string;
	details?: string;
	timestamp: string;
	requestId?: string;
}

interface SystemLogProps {
	title: string;
	logs: SystemLog[];
	errorCount: number;
	warningCount: number;
}

const LevelIcon = ({ level }: { level: SystemLog['level'] }) => {
	const config: Record<
		SystemLog['level'],
		{ icon: LucideIcon; className: string }
	> = {
		info: { icon: Info, className: 'text-blue-400' },
		success: { icon: CheckCircle2, className: 'text-emerald-400' },
		warning: { icon: AlertTriangle, className: 'text-amber-400' },
		error: { icon: AlertCircle, className: 'text-rose-400' },
	};

	const { icon: Icon, className } = config[level];

	return <Icon className={`size-4 shrink-0 ${className}`} />;
};

const LevelBadge = ({ level }: { level: SystemLog['level'] }) => {
	const config = {
		info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		error: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge variant="outline" className={`text-xs uppercase ${config[level]}`}>
			{level}
		</Badge>
	);
};

const LogEntry = ({ log }: { log: SystemLog }) => (
	<div
		className={`font-mono text-xs p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
			log.level === 'error'
				? 'border-rose-500/30 bg-rose-500/5'
				: log.level === 'warning'
					? 'border-amber-500/30 bg-amber-500/5'
					: 'border-border/50 bg-card/50'
		}`}
	>
		<div className="flex items-start gap-2">
			<LevelIcon level={log.level} />
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 flex-wrap mb-1">
					<span className="text-muted-foreground">{log.timestamp}</span>
					<LevelBadge level={log.level} />
					<Badge variant="outline" className="text-xs">
						{log.service}
					</Badge>
				</div>
				<p className="text-foreground break-all">{log.message}</p>
				{log.details && (
					<pre className="mt-2 p-2 rounded bg-muted/50 text-muted-foreground overflow-x-auto">
						{log.details}
					</pre>
				)}
				{log.requestId && (
					<p className="mt-1 text-muted-foreground/70">
						Request ID: {log.requestId}
					</p>
				)}
			</div>
		</div>
	</div>
);

const StatusSummary = ({
	errorCount,
	warningCount,
}: {
	errorCount: number;
	warningCount: number;
}) => (
	<div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex items-center gap-2">
			<Terminal className="size-5 text-primary" />
			<span className="text-sm font-medium text-foreground">System Status</span>
		</div>
		<div className="flex items-center gap-4 ml-auto">
			<div className="flex items-center gap-1.5">
				<AlertCircle className="size-4 text-rose-400" />
				<span className="text-sm">
					<span className="font-semibold text-rose-400">{errorCount}</span>
					<span className="text-muted-foreground"> errors</span>
				</span>
			</div>
			<div className="flex items-center gap-1.5">
				<AlertTriangle className="size-4 text-amber-400" />
				<span className="text-sm">
					<span className="font-semibold text-amber-400">{warningCount}</span>
					<span className="text-muted-foreground"> warnings</span>
				</span>
			</div>
		</div>
	</div>
);

const SystemLogViewer = ({
	title,
	logs,
	errorCount,
	warningCount,
}: SystemLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Terminal className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<Filter className="size-4" />
					Filter
				</Button>
				<Button variant="ghost" size="sm" className="gap-1">
					<Search className="size-4" />
					Search
				</Button>
				<Button variant="outline" size="sm" className="gap-1">
					<Download className="size-4" />
					Export
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<StatusSummary errorCount={errorCount} warningCount={warningCount} />
			<ScrollArea className="h-[450px]">
				<div className="space-y-2 pr-4">
					{logs.map((log) => (
						<LogEntry key={log.id} log={log} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const systemLogs: SystemLog[] = [
		{
			id: '1',
			level: 'error',
			service: 'payment-service',
			message: 'Failed to process payment: Gateway timeout',
			details: 'Error: ETIMEDOUT at PaymentGateway.process()',
			timestamp: '2024-03-15 14:32:45',
			requestId: 'req_8a7b6c5d4e3f',
		},
		{
			id: '2',
			level: 'warning',
			service: 'inventory-service',
			message: 'Low stock threshold reached for SKU-12345',
			timestamp: '2024-03-15 14:31:22',
		},
		{
			id: '3',
			level: 'success',
			service: 'order-service',
			message: 'Order ORD-2024-0892 processed successfully',
			timestamp: '2024-03-15 14:30:15',
			requestId: 'req_2f3e4d5c6b7a',
		},
		{
			id: '4',
			level: 'info',
			service: 'auth-service',
			message: 'User session extended for user_id: 12345',
			timestamp: '2024-03-15 14:29:00',
		},
		{
			id: '5',
			level: 'error',
			service: 'email-service',
			message: 'SMTP connection failed: Connection refused',
			details: 'ECONNREFUSED 10.0.0.25:587',
			timestamp: '2024-03-15 14:28:30',
			requestId: 'req_9c8d7e6f5a4b',
		},
		{
			id: '6',
			level: 'info',
			service: 'cache-service',
			message: 'Cache invalidated for product catalog',
			timestamp: '2024-03-15 14:27:45',
		},
		{
			id: '7',
			level: 'success',
			service: 'shipping-service',
			message: 'Shipment SHIP-789 picked up by carrier',
			timestamp: '2024-03-15 14:26:30',
		},
		{
			id: '8',
			level: 'warning',
			service: 'api-gateway',
			message: 'Rate limit approaching for client_id: abc123',
			timestamp: '2024-03-15 14:25:00',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<SystemLogViewer
					title="System Logs"
					logs={systemLogs}
					errorCount={2}
					warningCount={2}
				/>
			</div>
		</section>
	);
}
