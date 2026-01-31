import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Zap,
	Server,
	Activity,
	CheckCircle2,
	XCircle,
	AlertTriangle,
	Clock,
	Globe,
	RefreshCw,
	type LucideIcon,
} from 'lucide-react';

interface IntegrationStatus {
	id: string;
	name: string;
	type: 'payment' | 'shipping' | 'marketing' | 'analytics' | 'crm' | 'erp';
	status: 'operational' | 'degraded' | 'down' | 'maintenance';
	uptime: number;
	lastSync: string;
	syncFrequency: string;
	pendingSyncs?: number;
	errorCount?: number;
	latency?: number;
}

interface IntegrationTrackerProps {
	title: string;
	integrations: IntegrationStatus[];
	stats: {
		totalIntegrations: number;
		operational: number;
		issues: number;
		avgUptime: string;
	};
}

const StatusConfig: Record<
	IntegrationStatus['status'],
	{ label: string; className: string; icon: LucideIcon }
> = {
	operational: {
		label: 'Operational',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		icon: CheckCircle2,
	},
	degraded: {
		label: 'Degraded',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		icon: AlertTriangle,
	},
	down: {
		label: 'Down',
		className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		icon: XCircle,
	},
	maintenance: {
		label: 'Maintenance',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		icon: Clock,
	},
};

const TypeConfig: Record<IntegrationStatus['type'], { className: string }> = {
	payment: { className: 'bg-emerald-500/20 text-emerald-400' },
	shipping: { className: 'bg-blue-500/20 text-blue-400' },
	marketing: { className: 'bg-purple-500/20 text-purple-400' },
	analytics: { className: 'bg-orange-500/20 text-orange-400' },
	crm: { className: 'bg-pink-500/20 text-pink-400' },
	erp: { className: 'bg-cyan-500/20 text-cyan-400' },
};

const IntegrationCard = ({ integration }: { integration: IntegrationStatus }) => {
	const statusConfig = StatusConfig[integration.status];
	const typeConfig = TypeConfig[integration.type];
	const StatusIcon = statusConfig.icon;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				integration.status === 'down'
					? 'border-rose-500/30 bg-rose-500/5'
					: integration.status === 'degraded'
						? 'border-amber-500/30 bg-amber-500/5'
						: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-3">
					<div className={`flex size-10 items-center justify-center rounded-lg ${typeConfig.className}`}>
						<Zap className="size-5" />
					</div>
					<div>
						<h4 className="font-medium text-foreground">{integration.name}</h4>
						<span className="text-xs text-muted-foreground capitalize">
							{integration.type}
						</span>
					</div>
				</div>
				<Badge variant="outline" className={statusConfig.className}>
					<StatusIcon className="size-3 mr-1" />
					{statusConfig.label}
				</Badge>
			</div>

			<div className="space-y-2 mb-3">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Uptime</span>
					<span
						className={`font-medium ${
							integration.uptime >= 99.9
								? 'text-emerald-400'
								: integration.uptime >= 99
									? 'text-amber-400'
									: 'text-rose-400'
						}`}
					>
						{integration.uptime.toFixed(2)}%
					</span>
				</div>
				<Progress
					value={integration.uptime}
					className={`h-1.5 ${
						integration.uptime >= 99.9
							? '[&>[data-slot=indicator]]:bg-emerald-500'
							: integration.uptime >= 99
								? '[&>[data-slot=indicator]]:bg-amber-500'
								: '[&>[data-slot=indicator]]:bg-rose-500'
					}`}
				/>
			</div>

			<div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-muted/30 text-xs">
				<div>
					<span className="text-muted-foreground block">Last Sync</span>
					<span className="text-foreground font-medium">
						{integration.lastSync}
					</span>
				</div>
				<div>
					<span className="text-muted-foreground block">Frequency</span>
					<span className="text-foreground font-medium">
						{integration.syncFrequency}
					</span>
				</div>
			</div>

			{(integration.pendingSyncs || integration.errorCount || integration.latency) && (
				<div className="flex items-center gap-3 mt-3 text-xs">
					{integration.pendingSyncs !== undefined && integration.pendingSyncs > 0 && (
						<span className="flex items-center gap-1 text-amber-400">
							<Clock className="size-3" />
							{integration.pendingSyncs} pending
						</span>
					)}
					{integration.errorCount !== undefined && integration.errorCount > 0 && (
						<span className="flex items-center gap-1 text-rose-400">
							<XCircle className="size-3" />
							{integration.errorCount} errors
						</span>
					)}
					{integration.latency !== undefined && (
						<span className="flex items-center gap-1 text-muted-foreground ml-auto">
							<Activity className="size-3" />
							{integration.latency}ms
						</span>
					)}
				</div>
			)}

			{integration.status !== 'operational' && (
				<Button
					size="sm"
					variant="outline"
					className="w-full h-8 mt-3 gap-1 text-xs"
				>
					<RefreshCw className="size-3" />
					Retry Connection
				</Button>
			)}
		</div>
	);
};

const IntegrationStats = ({ stats }: { stats: IntegrationTrackerProps['stats'] }) => (
	<div className="grid grid-cols-4 gap-2">
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-center">
			<Server className="size-4 text-muted-foreground mx-auto mb-1" />
			<span className="text-lg font-bold text-foreground block">
				{stats.totalIntegrations}
			</span>
			<span className="text-xs text-muted-foreground">Total</span>
		</div>
		<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
			<CheckCircle2 className="size-4 text-emerald-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-emerald-400 block">
				{stats.operational}
			</span>
			<span className="text-xs text-muted-foreground">Healthy</span>
		</div>
		<div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-center">
			<AlertTriangle className="size-4 text-rose-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-rose-400 block">
				{stats.issues}
			</span>
			<span className="text-xs text-muted-foreground">Issues</span>
		</div>
		<div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
			<Activity className="size-4 text-primary mx-auto mb-1" />
			<span className="text-lg font-bold text-primary block">
				{stats.avgUptime}
			</span>
			<span className="text-xs text-muted-foreground">Uptime</span>
		</div>
	</div>
);

const IntegrationTracker = ({ title, integrations, stats }: IntegrationTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Zap className="size-5" />
				{title}
				{stats.issues > 0 && (
					<Badge className="bg-rose-500 text-white animate-pulse">
						{stats.issues} Issues
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm">
				Manage
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<IntegrationStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{integrations.map((integration) => (
						<IntegrationCard key={integration.id} integration={integration} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const integrations: IntegrationStatus[] = [
		{
			id: '1',
			name: 'Stripe',
			type: 'payment',
			status: 'operational',
			uptime: 99.99,
			lastSync: '2 min ago',
			syncFrequency: 'Real-time',
			latency: 45,
		},
		{
			id: '2',
			name: 'Shippo',
			type: 'shipping',
			status: 'degraded',
			uptime: 99.12,
			lastSync: '15 min ago',
			syncFrequency: 'Every 5 min',
			pendingSyncs: 3,
			errorCount: 2,
			latency: 320,
		},
		{
			id: '3',
			name: 'Mailchimp',
			type: 'marketing',
			status: 'operational',
			uptime: 99.95,
			lastSync: '1 hour ago',
			syncFrequency: 'Hourly',
			latency: 89,
		},
		{
			id: '4',
			name: 'Google Analytics',
			type: 'analytics',
			status: 'operational',
			uptime: 99.98,
			lastSync: '5 min ago',
			syncFrequency: 'Real-time',
			latency: 23,
		},
		{
			id: '5',
			name: 'Salesforce',
			type: 'crm',
			status: 'down',
			uptime: 98.45,
			lastSync: '2 hours ago',
			syncFrequency: 'Every 15 min',
			errorCount: 15,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<IntegrationTracker
					title="Integration Tracker"
					integrations={integrations}
					stats={{
						totalIntegrations: 12,
						operational: 10,
						issues: 2,
						avgUptime: '99.5%',
					}}
				/>
			</div>
		</section>
	);
}
