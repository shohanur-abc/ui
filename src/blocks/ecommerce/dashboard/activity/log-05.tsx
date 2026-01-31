import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Globe,
	Shield,
	Key,
	AlertTriangle,
	CheckCircle,
	XCircle,
	MapPin,
	Monitor,
	Smartphone,
	Filter,
	Download,
	type LucideIcon,
} from 'lucide-react';

interface AccessLog {
	id: string;
	status: 'success' | 'failed' | 'blocked';
	method: string;
	endpoint: string;
	userAgent: string;
	device: 'desktop' | 'mobile' | 'tablet' | 'unknown';
	location: {
		country: string;
		city: string;
		flag: string;
	};
	ipAddress: string;
	userId?: string;
	responseCode: number;
	responseTime: string;
	timestamp: string;
	reason?: string;
}

interface AccessLogProps {
	title: string;
	logs: AccessLog[];
	stats: {
		totalRequests: string;
		successRate: number;
		blockedCount: number;
	};
}

const StatusIcon = ({ status }: { status: AccessLog['status'] }) => {
	const config = {
		success: { icon: CheckCircle, className: 'text-emerald-400' },
		failed: { icon: XCircle, className: 'text-rose-400' },
		blocked: { icon: Shield, className: 'text-amber-400' },
	};

	const { icon: Icon, className } = config[status];

	return <Icon className={`size-4 ${className}`} />;
};

const DeviceIcon = ({ device }: { device: AccessLog['device'] }) => {
	const config: Record<AccessLog['device'], LucideIcon> = {
		desktop: Monitor,
		mobile: Smartphone,
		tablet: Smartphone,
		unknown: Globe,
	};

	const Icon = config[device];
	return <Icon className="size-3.5 text-muted-foreground" />;
};

const StatusBadge = ({ status, code }: { status: AccessLog['status']; code: number }) => {
	const config = {
		success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		failed: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		blocked: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
	};

	return (
		<Badge variant="outline" className={`font-mono text-xs ${config[status]}`}>
			{code}
		</Badge>
	);
};

const MethodBadge = ({ method }: { method: string }) => {
	const config: Record<string, string> = {
		GET: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		POST: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		PUT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		PATCH: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		DELETE: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	};

	return (
		<Badge
			variant="outline"
			className={`font-mono text-xs ${config[method] || 'bg-muted text-muted-foreground'}`}
		>
			{method}
		</Badge>
	);
};

const AccessEntry = ({ log }: { log: AccessLog }) => (
	<div
		className={`p-3 rounded-lg border font-mono text-xs transition-colors hover:bg-muted/50 ${
			log.status === 'blocked'
				? 'border-amber-500/30 bg-amber-500/5'
				: log.status === 'failed'
					? 'border-rose-500/30 bg-rose-500/5'
					: 'border-border/50 bg-card/50'
		}`}
	>
		<div className="flex items-start gap-3">
			<StatusIcon status={log.status} />
			<div className="flex-1 min-w-0 space-y-2">
				<div className="flex items-center gap-2 flex-wrap">
					<MethodBadge method={log.method} />
					<span className="text-foreground truncate">{log.endpoint}</span>
					<StatusBadge status={log.status} code={log.responseCode} />
					<span className="text-muted-foreground">{log.responseTime}</span>
				</div>
				<div className="flex items-center gap-4 text-muted-foreground">
					<span className="flex items-center gap-1.5">
						<MapPin className="size-3" />
						{log.location.flag} {log.location.city}, {log.location.country}
					</span>
					<span className="flex items-center gap-1.5">
						<DeviceIcon device={log.device} />
						{log.device}
					</span>
					<span>{log.ipAddress}</span>
					{log.userId && <span>User: {log.userId}</span>}
				</div>
				{log.reason && (
					<p className="text-amber-400/80">
						<AlertTriangle className="size-3 inline mr-1" />
						{log.reason}
					</p>
				)}
				<p className="text-muted-foreground/60">{log.timestamp}</p>
			</div>
		</div>
	</div>
);

const AccessStats = ({
	stats,
}: { stats: AccessLogProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-4">
		<div className="flex flex-col p-3 rounded-lg bg-muted/30 border border-border/50">
			<span className="text-xs text-muted-foreground">Total Requests</span>
			<span className="text-xl font-bold text-foreground">{stats.totalRequests}</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<span className="text-xs text-muted-foreground">Success Rate</span>
			<span className="text-xl font-bold text-emerald-400">{stats.successRate}%</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<span className="text-xs text-muted-foreground">Blocked</span>
			<span className="text-xl font-bold text-amber-400">{stats.blockedCount}</span>
		</div>
	</div>
);

const AccessLogViewer = ({ title, logs, stats }: AccessLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Key className="size-5" />
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
			<AccessStats stats={stats} />
			<ScrollArea className="h-[400px]">
				<div className="space-y-2 pr-4">
					{logs.map((log) => (
						<AccessEntry key={log.id} log={log} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const accessLogs: AccessLog[] = [
		{
			id: '1',
			status: 'success',
			method: 'POST',
			endpoint: '/api/v1/orders/checkout',
			userAgent: 'Mozilla/5.0 Chrome/122.0',
			device: 'desktop',
			location: { country: 'US', city: 'San Francisco', flag: '🇺🇸' },
			ipAddress: '192.168.1.45',
			userId: 'usr_abc123',
			responseCode: 201,
			responseTime: '234ms',
			timestamp: '2024-03-15 14:32:45 UTC',
		},
		{
			id: '2',
			status: 'blocked',
			method: 'POST',
			endpoint: '/api/v1/auth/login',
			userAgent: 'curl/7.68.0',
			device: 'unknown',
			location: { country: 'RU', city: 'Moscow', flag: '🇷🇺' },
			ipAddress: '185.220.101.45',
			responseCode: 403,
			responseTime: '12ms',
			timestamp: '2024-03-15 14:31:22 UTC',
			reason: 'Blocked by geo-restriction policy',
		},
		{
			id: '3',
			status: 'success',
			method: 'GET',
			endpoint: '/api/v1/products?category=electronics',
			userAgent: 'Mozilla/5.0 Safari/17.3',
			device: 'mobile',
			location: { country: 'GB', city: 'London', flag: '🇬🇧' },
			ipAddress: '82.12.45.67',
			userId: 'usr_def456',
			responseCode: 200,
			responseTime: '89ms',
			timestamp: '2024-03-15 14:30:15 UTC',
		},
		{
			id: '4',
			status: 'failed',
			method: 'DELETE',
			endpoint: '/api/v1/users/12345',
			userAgent: 'PostmanRuntime/7.36.0',
			device: 'desktop',
			location: { country: 'DE', city: 'Berlin', flag: '🇩🇪' },
			ipAddress: '45.67.89.12',
			userId: 'usr_ghi789',
			responseCode: 403,
			responseTime: '45ms',
			timestamp: '2024-03-15 14:29:00 UTC',
			reason: 'Insufficient permissions',
		},
		{
			id: '5',
			status: 'success',
			method: 'PUT',
			endpoint: '/api/v1/inventory/SKU-12345',
			userAgent: 'Mozilla/5.0 Firefox/123.0',
			device: 'desktop',
			location: { country: 'CA', city: 'Toronto', flag: '🇨🇦' },
			ipAddress: '72.45.123.89',
			userId: 'usr_jkl012',
			responseCode: 200,
			responseTime: '156ms',
			timestamp: '2024-03-15 14:28:30 UTC',
		},
		{
			id: '6',
			status: 'blocked',
			method: 'POST',
			endpoint: '/api/v1/comments',
			userAgent: 'Mozilla/5.0 Chrome/122.0',
			device: 'desktop',
			location: { country: 'CN', city: 'Shanghai', flag: '🇨🇳' },
			ipAddress: '116.234.56.78',
			responseCode: 429,
			responseTime: '8ms',
			timestamp: '2024-03-15 14:27:00 UTC',
			reason: 'Rate limit exceeded (100 req/min)',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<AccessLogViewer
					title="Access Log"
					logs={accessLogs}
					stats={{
						totalRequests: '1.2M',
						successRate: 98.7,
						blockedCount: 234,
					}}
				/>
			</div>
		</section>
	);
}
