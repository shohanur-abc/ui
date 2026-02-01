'use client';

import {
	AlertCircle,
	ArrowUpRight,
	CheckCircle2,
	Clock,
	type LucideIcon,
	Server,
	Shield,
	Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type SystemMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	status: 'healthy' | 'warning' | 'critical';
	uptime: string;
};

const SystemMetric = ({
	icon: Icon,
	label,
	value,
	status,
	uptime,
}: SystemMetricProps) => {
	const statusConfig = {
		healthy: {
			color: 'text-emerald-500',
			bg: 'bg-emerald-500/10',
			icon: CheckCircle2,
		},
		warning: {
			color: 'text-amber-500',
			bg: 'bg-amber-500/10',
			icon: AlertCircle,
		},
		critical: {
			color: 'text-rose-500',
			bg: 'bg-rose-500/10',
			icon: AlertCircle,
		},
	};
	const StatusIcon = statusConfig[status].icon;

	return (
		<Card className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30">
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-3">
					<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
						<Icon className="size-4 text-primary" />
					</div>
					<div
						className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${statusConfig[status].bg}`}
					>
						<StatusIcon className={`size-3 ${statusConfig[status].color}`} />
						<span
							className={`text-xs font-medium ${statusConfig[status].color}`}
						>
							{status}
						</span>
					</div>
				</div>
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="text-2xl font-bold mt-1">{value}</p>
				<p className="text-xs text-muted-foreground mt-1">Uptime: {uptime}</p>
			</CardContent>
		</Card>
	);
};

type ResponseTimeProps = {
	endpoint: string;
	avg: string;
	p95: string;
	p99: string;
	status: 'fast' | 'normal' | 'slow';
};

const ResponseTimesCard = ({
	endpoints,
}: {
	endpoints: ResponseTimeProps[];
}) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<Zap className="size-4 text-primary" />
				<CardTitle className="text-sm font-medium">
					API Response Times
				</CardTitle>
			</div>
			<Badge variant="outline">Last 24h</Badge>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground pb-2 border-b border-border/30">
				<span className="col-span-2">Endpoint</span>
				<span className="text-right">Avg</span>
				<span className="text-right">P95</span>
				<span className="text-right">P99</span>
			</div>
			<div className="space-y-3 mt-3">
				{endpoints.map((ep, i) => (
					<div key={i} className="grid grid-cols-5 gap-2 text-sm">
						<span className="col-span-2 font-medium truncate flex items-center gap-2">
							<div
								className={`size-2 rounded-full ${ep.status === 'fast' ? 'bg-emerald-500' : ep.status === 'normal' ? 'bg-amber-500' : 'bg-rose-500'}`}
							/>
							{ep.endpoint}
						</span>
						<span className="text-right">{ep.avg}</span>
						<span className="text-right text-muted-foreground">{ep.p95}</span>
						<span className="text-right text-muted-foreground">{ep.p99}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

type ErrorRateProps = {
	service: string;
	rate: number;
	count: number;
	trend: 'up' | 'down';
};

const ErrorRatesCard = ({ errors }: { errors: ErrorRateProps[] }) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Error Rates</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{errors.map((error, i) => (
				<div key={i} className="space-y-1.5">
					<div className="flex items-center justify-between text-sm">
						<span>{error.service}</span>
						<span
							className={`font-semibold ${error.rate > 1 ? 'text-rose-500' : 'text-emerald-500'}`}
						>
							{error.rate}%
						</span>
					</div>
					<Progress
						value={error.rate * 10}
						className={`h-1 ${error.rate > 1 ? '[&>div]:bg-rose-500' : ''}`}
					/>
					<p className="text-xs text-muted-foreground">{error.count} errors</p>
				</div>
			))}
		</CardContent>
	</Card>
);

type SecurityEventProps = {
	type: string;
	count: number;
	severity: 'low' | 'medium' | 'high';
	lastSeen: string;
};

const SecurityCard = ({ events }: { events: SecurityEventProps[] }) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				<Shield className="size-4 text-primary" />
				<CardTitle className="text-sm font-medium">Security Events</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{events.map((event, i) => (
				<div
					key={i}
					className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0"
				>
					<div className="flex-1">
						<p className="text-sm font-medium">{event.type}</p>
						<p className="text-xs text-muted-foreground">{event.lastSeen}</p>
					</div>
					<div className="text-right">
						<Badge
							variant={
								event.severity === 'high'
									? 'destructive'
									: event.severity === 'medium'
										? 'secondary'
										: 'outline'
							}
						>
							{event.severity}
						</Badge>
						<p className="text-xs text-muted-foreground mt-1">
							{event.count} events
						</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

type UptimeData = {
	hour: string;
	status: 'up' | 'degraded' | 'down';
};

const UptimeCard = ({ data }: { data: UptimeData[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium">
				System Uptime (Last 24 Hours)
			</CardTitle>
			<Badge variant="default" className="bg-emerald-500">
				99.9%
			</Badge>
		</CardHeader>
		<CardContent>
			<div className="flex gap-0.5">
				{data.map((item, i) => (
					<div
						key={i}
						className={`flex-1 h-8 rounded-sm ${item.status === 'up' ? 'bg-emerald-500' : item.status === 'degraded' ? 'bg-amber-500' : 'bg-rose-500'}`}
						title={`${item.hour}: ${item.status}`}
					/>
				))}
			</div>
			<div className="flex items-center justify-center gap-6 mt-4">
				<div className="flex items-center gap-2">
					<div className="size-3 rounded bg-emerald-500" />
					<span className="text-xs text-muted-foreground">Operational</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-3 rounded bg-amber-500" />
					<span className="text-xs text-muted-foreground">Degraded</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-3 rounded bg-rose-500" />
					<span className="text-xs text-muted-foreground">Down</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const systemMetrics: SystemMetricProps[] = [
	{
		icon: Server,
		label: 'API Server',
		value: '45ms',
		status: 'healthy',
		uptime: '99.99%',
	},
	{
		icon: Server,
		label: 'Database',
		value: '12ms',
		status: 'healthy',
		uptime: '99.95%',
	},
	{
		icon: Server,
		label: 'CDN',
		value: '8ms',
		status: 'healthy',
		uptime: '100%',
	},
	{
		icon: Server,
		label: 'Cache',
		value: '2ms',
		status: 'warning',
		uptime: '99.8%',
	},
];

const endpoints: ResponseTimeProps[] = [
	{
		endpoint: '/api/products',
		avg: '45ms',
		p95: '120ms',
		p99: '250ms',
		status: 'fast',
	},
	{
		endpoint: '/api/checkout',
		avg: '180ms',
		p95: '450ms',
		p99: '800ms',
		status: 'normal',
	},
	{
		endpoint: '/api/search',
		avg: '95ms',
		p95: '200ms',
		p99: '350ms',
		status: 'fast',
	},
	{
		endpoint: '/api/users',
		avg: '320ms',
		p95: '850ms',
		p99: '1.2s',
		status: 'slow',
	},
];

const errors: ErrorRateProps[] = [
	{ service: 'API Gateway', rate: 0.12, count: 45, trend: 'down' },
	{ service: 'Payment Service', rate: 0.08, count: 12, trend: 'down' },
	{ service: 'Inventory', rate: 1.5, count: 234, trend: 'up' },
];

const securityEvents: SecurityEventProps[] = [
	{
		type: 'Failed Login Attempts',
		count: 156,
		severity: 'medium',
		lastSeen: '5 min ago',
	},
	{
		type: 'Rate Limit Exceeded',
		count: 45,
		severity: 'low',
		lastSeen: '1 hour ago',
	},
	{
		type: 'Suspicious Activity',
		count: 3,
		severity: 'high',
		lastSeen: '2 hours ago',
	},
];

const uptimeData: UptimeData[] = Array.from({ length: 24 }, (_, i) => ({
	hour: `${i}:00`,
	status: i === 14 ? 'degraded' : 'up',
}));

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{systemMetrics.map((metric, i) => (
						<SystemMetric key={i} {...metric} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<ResponseTimesCard endpoints={endpoints} />
					<UptimeCard data={uptimeData} />
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<ErrorRatesCard errors={errors} />
					<SecurityCard events={securityEvents} />
				</div>
			</div>
		</section>
	);
}
