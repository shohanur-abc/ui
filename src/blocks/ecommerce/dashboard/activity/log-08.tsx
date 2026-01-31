import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Globe,
	CheckCircle2,
	XCircle,
	Clock,
	Zap,
	Database,
	ArrowUpDown,
	Filter,
	Download,
	Activity,
	type LucideIcon,
} from 'lucide-react';

interface ApiLog {
	id: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	endpoint: string;
	status: number;
	success: boolean;
	latency: number;
	requestSize: string;
	responseSize: string;
	source: string;
	timestamp: string;
	error?: string;
}

interface ApiLogProps {
	title: string;
	logs: ApiLog[];
	stats: {
		totalRequests: string;
		avgLatency: string;
		errorRate: string;
		throughput: string;
	};
}

const MethodBadge = ({ method }: { method: ApiLog['method'] }) => {
	const config: Record<ApiLog['method'], string> = {
		GET: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		POST: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		PUT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		PATCH: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		DELETE: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge variant="outline" className={`font-mono text-xs w-16 justify-center ${config[method]}`}>
			{method}
		</Badge>
	);
};

const StatusBadge = ({ status, success }: { status: number; success: boolean }) => {
	const className = success
		? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
		: status >= 500
			? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
			: 'bg-amber-500/20 text-amber-400 border-amber-500/30';

	return (
		<Badge variant="outline" className={`font-mono text-xs ${className}`}>
			{status}
		</Badge>
	);
};

const LatencyIndicator = ({ latency }: { latency: number }) => {
	const getColor = () => {
		if (latency < 100) return 'text-emerald-400';
		if (latency < 500) return 'text-amber-400';
		return 'text-rose-400';
	};

	return (
		<span className={`font-mono text-xs ${getColor()}`}>{latency}ms</span>
	);
};

const ApiEntry = ({ log }: { log: ApiLog }) => (
	<div
		className={`p-3 rounded-lg border font-mono text-xs transition-colors hover:bg-muted/50 ${
			!log.success
				? 'border-rose-500/30 bg-rose-500/5'
				: 'border-border/50 bg-card/50'
		}`}
	>
		<div className="flex items-center gap-3">
			<div className="flex items-center gap-2 shrink-0">
				{log.success ? (
					<CheckCircle2 className="size-4 text-emerald-400" />
				) : (
					<XCircle className="size-4 text-rose-400" />
				)}
				<MethodBadge method={log.method} />
			</div>
			<span className="text-foreground truncate flex-1">{log.endpoint}</span>
			<div className="flex items-center gap-3 shrink-0">
				<StatusBadge status={log.status} success={log.success} />
				<div className="flex items-center gap-1 text-muted-foreground">
					<Clock className="size-3" />
					<LatencyIndicator latency={log.latency} />
				</div>
				<div className="flex items-center gap-1 text-muted-foreground">
					<ArrowUpDown className="size-3" />
					<span>{log.requestSize}/{log.responseSize}</span>
				</div>
			</div>
		</div>
		{log.error && (
			<div className="mt-2 p-2 rounded bg-rose-500/10 text-rose-400">
				{log.error}
			</div>
		)}
		<div className="flex items-center gap-4 mt-2 text-muted-foreground/70">
			<span>Source: {log.source}</span>
			<span>{log.timestamp}</span>
		</div>
	</div>
);

const StatCard = ({
	label,
	value,
	icon: Icon,
	trend,
}: {
	label: string;
	value: string;
	icon: LucideIcon;
	trend?: 'up' | 'down' | 'neutral';
}) => {
	const trendColors = {
		up: 'text-emerald-400',
		down: 'text-rose-400',
		neutral: 'text-muted-foreground',
	};

	return (
		<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
			<Icon className={`size-5 ${trend ? trendColors[trend] : 'text-primary'}`} />
			<div>
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="font-semibold text-foreground">{value}</p>
			</div>
		</div>
	);
};

const ApiLogViewer = ({ title, logs, stats }: ApiLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Globe className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<Filter className="size-4" />
					Filter
				</Button>
				<Button variant="outline" size="sm" className="gap-1">
					<Download className="size-4" />
					Export
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<div className="grid grid-cols-4 gap-3">
				<StatCard
					label="Total Requests"
					value={stats.totalRequests}
					icon={Database}
				/>
				<StatCard
					label="Avg Latency"
					value={stats.avgLatency}
					icon={Clock}
					trend="up"
				/>
				<StatCard
					label="Error Rate"
					value={stats.errorRate}
					icon={XCircle}
					trend="down"
				/>
				<StatCard
					label="Throughput"
					value={stats.throughput}
					icon={Activity}
					trend="up"
				/>
			</div>
			<ScrollArea className="h-[400px]">
				<div className="space-y-2 pr-4">
					{logs.map((log) => (
						<ApiEntry key={log.id} log={log} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const apiLogs: ApiLog[] = [
		{
			id: '1',
			method: 'POST',
			endpoint: '/api/v1/orders/checkout',
			status: 201,
			success: true,
			latency: 234,
			requestSize: '2.4KB',
			responseSize: '1.8KB',
			source: 'web-client',
			timestamp: '2024-03-15 14:32:45',
		},
		{
			id: '2',
			method: 'GET',
			endpoint: '/api/v1/products?category=electronics&limit=50',
			status: 200,
			success: true,
			latency: 45,
			requestSize: '128B',
			responseSize: '24.5KB',
			source: 'mobile-app',
			timestamp: '2024-03-15 14:32:40',
		},
		{
			id: '3',
			method: 'PUT',
			endpoint: '/api/v1/inventory/SKU-12345',
			status: 500,
			success: false,
			latency: 1250,
			requestSize: '512B',
			responseSize: '256B',
			source: 'admin-panel',
			timestamp: '2024-03-15 14:32:35',
			error: 'Database connection timeout after 1000ms',
		},
		{
			id: '4',
			method: 'DELETE',
			endpoint: '/api/v1/cart/items/abc123',
			status: 204,
			success: true,
			latency: 89,
			requestSize: '64B',
			responseSize: '0B',
			source: 'web-client',
			timestamp: '2024-03-15 14:32:30',
		},
		{
			id: '5',
			method: 'GET',
			endpoint: '/api/v1/users/me',
			status: 401,
			success: false,
			latency: 12,
			requestSize: '256B',
			responseSize: '128B',
			source: 'mobile-app',
			timestamp: '2024-03-15 14:32:25',
			error: 'Invalid or expired authentication token',
		},
		{
			id: '6',
			method: 'PATCH',
			endpoint: '/api/v1/orders/ORD-2024-0892/status',
			status: 200,
			success: true,
			latency: 156,
			requestSize: '128B',
			responseSize: '512B',
			source: 'admin-panel',
			timestamp: '2024-03-15 14:32:20',
		},
		{
			id: '7',
			method: 'POST',
			endpoint: '/api/v1/webhooks/stripe',
			status: 200,
			success: true,
			latency: 23,
			requestSize: '1.2KB',
			responseSize: '64B',
			source: 'stripe-webhook',
			timestamp: '2024-03-15 14:32:15',
		},
		{
			id: '8',
			method: 'GET',
			endpoint: '/api/v1/analytics/dashboard',
			status: 200,
			success: true,
			latency: 890,
			requestSize: '256B',
			responseSize: '156KB',
			source: 'admin-panel',
			timestamp: '2024-03-15 14:32:10',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-5xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ApiLogViewer
					title="API Log"
					logs={apiLogs}
					stats={{
						totalRequests: '1.2M',
						avgLatency: '145ms',
						errorRate: '0.3%',
						throughput: '2.4K/min',
					}}
				/>
			</div>
		</section>
	);
}
