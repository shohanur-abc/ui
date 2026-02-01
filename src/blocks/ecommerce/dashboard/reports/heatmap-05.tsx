'use client';

import {
	Gauge,
	Server,
	Cpu,
	HardDrive,
	Wifi,
	AlertTriangle,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type ServerData = {
	name: string;
	region: string;
	metrics: {
		cpu: number;
		memory: number;
		disk: number;
		network: number;
	};
	status: 'healthy' | 'warning' | 'critical';
};

type MetricBarProps = {
	value: number;
	label: string;
};

const getBarColor = (value: number) => {
	if (value > 90) return 'bg-rose-500';
	if (value > 75) return 'bg-amber-500';
	return 'bg-primary';
};

const MetricBar = ({ value, label }: MetricBarProps) => (
	<div className="space-y-1">
		<div className="flex justify-between text-xs">
			<span className="text-muted-foreground">{label}</span>
			<span className={value > 75 ? 'font-medium text-rose-500' : ''}>
				{value}%
			</span>
		</div>
		<div className="h-2 overflow-hidden rounded-full bg-muted/30">
			<div
				className={`h-full rounded-full ${getBarColor(value)}`}
				style={{ width: `${value}%` }}
			/>
		</div>
	</div>
);

const statusConfig = {
	healthy: {
		label: 'Healthy',
		color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
	},
	warning: {
		label: 'Warning',
		color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
	},
	critical: {
		label: 'Critical',
		color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
	},
};

export default function Main() {
	const servers: ServerData[] = [
		{
			name: 'prod-web-01',
			region: 'US-East',
			metrics: { cpu: 45, memory: 62, disk: 38, network: 28 },
			status: 'healthy',
		},
		{
			name: 'prod-web-02',
			region: 'US-East',
			metrics: { cpu: 78, memory: 85, disk: 52, network: 45 },
			status: 'warning',
		},
		{
			name: 'prod-api-01',
			region: 'US-West',
			metrics: { cpu: 32, memory: 48, disk: 25, network: 18 },
			status: 'healthy',
		},
		{
			name: 'prod-api-02',
			region: 'US-West',
			metrics: { cpu: 92, memory: 88, disk: 72, network: 65 },
			status: 'critical',
		},
		{
			name: 'prod-db-01',
			region: 'EU-West',
			metrics: { cpu: 55, memory: 72, disk: 68, network: 35 },
			status: 'healthy',
		},
		{
			name: 'prod-db-02',
			region: 'EU-West',
			metrics: { cpu: 48, memory: 58, disk: 45, network: 22 },
			status: 'healthy',
		},
		{
			name: 'prod-cache-01',
			region: 'AP-South',
			metrics: { cpu: 82, memory: 78, disk: 35, network: 52 },
			status: 'warning',
		},
		{
			name: 'prod-worker-01',
			region: 'AP-South',
			metrics: { cpu: 38, memory: 42, disk: 28, network: 15 },
			status: 'healthy',
		},
	];

	const overallStats = [
		{ icon: Server, label: 'Total Servers', value: '8', status: '6 healthy' },
		{ icon: Cpu, label: 'Avg CPU', value: '58.8%', status: 'Normal load' },
		{
			icon: HardDrive,
			label: 'Avg Memory',
			value: '66.6%',
			status: '2 high usage',
		},
		{ icon: AlertTriangle, label: 'Alerts', value: '3', status: '1 critical' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Gauge className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									System Performance Heatmap
								</CardTitle>
								<CardDescription>
									Server resource utilization overview
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-emerald-500/20 text-emerald-500">
							<span className="mr-2 inline-flex size-2 animate-pulse rounded-full bg-emerald-500" />
							Live Monitoring
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{overallStats.map((s, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="flex items-center gap-3 p-4">
										<div className="rounded-lg bg-primary/10 p-2">
											<s.icon className="size-5 text-primary" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">{s.label}</p>
											<p className="text-xl font-bold">{s.value}</p>
											<p className="text-xs text-muted-foreground">
												{s.status}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{servers.map((server, i) => (
								<Card
									key={i}
									className={`border ${server.status === 'critical' ? 'border-rose-500/50' : server.status === 'warning' ? 'border-amber-500/30' : 'border-border/30'} bg-card/60`}
								>
									<CardContent className="p-4">
										<div className="mb-3 flex items-center justify-between">
											<div>
												<p className="font-medium">{server.name}</p>
												<p className="text-xs text-muted-foreground">
													{server.region}
												</p>
											</div>
											<Badge
												variant="outline"
												className={statusConfig[server.status].color}
											>
												{statusConfig[server.status].label}
											</Badge>
										</div>
										<div className="space-y-3">
											<MetricBar value={server.metrics.cpu} label="CPU" />
											<MetricBar value={server.metrics.memory} label="Memory" />
											<MetricBar value={server.metrics.disk} label="Disk" />
											<MetricBar
												value={server.metrics.network}
												label="Network"
											/>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="flex items-center justify-center gap-6 text-sm">
							<div className="flex items-center gap-2">
								<div className="size-3 rounded-full bg-primary" />
								<span className="text-muted-foreground">Normal (&lt;75%)</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="size-3 rounded-full bg-amber-500" />
								<span className="text-muted-foreground">Warning (75-90%)</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="size-3 rounded-full bg-rose-500" />
								<span className="text-muted-foreground">
									Critical (&gt;90%)
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
