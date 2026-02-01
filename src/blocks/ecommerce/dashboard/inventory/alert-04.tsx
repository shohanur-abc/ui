'use client';

import * as React from 'react';
import {
	AlertTriangle,
	AlertCircle,
	XCircle,
	RefreshCw,
	Wifi,
	WifiOff,
	Database,
	Cloud,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type SystemStatus = 'operational' | 'degraded' | 'down';

type SystemStatusCardProps = {
	name: string;
	status: SystemStatus;
	uptime: string;
	lastCheck: string;
	icon: React.ReactNode;
	details?: string;
};

const SystemStatusCard = ({
	name,
	status,
	uptime,
	lastCheck,
	icon,
	details,
}: SystemStatusCardProps) => {
	const statusConfig = {
		operational: {
			color: 'text-emerald-500',
			bg: 'bg-emerald-500',
			label: 'Operational',
		},
		degraded: {
			color: 'text-amber-500',
			bg: 'bg-amber-500',
			label: 'Degraded',
		},
		down: { color: 'text-destructive', bg: 'bg-destructive', label: 'Down' },
	};

	const config = statusConfig[status];

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div
							className={`flex size-10 items-center justify-center rounded-lg bg-muted ${config.color}`}
						>
							{icon}
						</div>
						<div>
							<p className="font-medium">{name}</p>
							<p className="text-xs text-muted-foreground">{details}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<span className={`size-2 rounded-full ${config.bg}`} />
						<span className={`text-sm font-medium ${config.color}`}>
							{config.label}
						</span>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
					<span>Uptime: {uptime}</span>
					<span>Last check: {lastCheck}</span>
				</div>
			</CardContent>
		</Card>
	);
};

type IncidentBannerProps = {
	severity: 'critical' | 'warning';
	title: string;
	message: string;
	startTime: string;
	onRefresh: () => void;
};

const IncidentBanner = ({
	severity,
	title,
	message,
	startTime,
	onRefresh,
}: IncidentBannerProps) => {
	const isCritical = severity === 'critical';
	const bgColor = isCritical ? 'bg-destructive/10' : 'bg-amber-500/10';
	const borderColor = isCritical
		? 'border-destructive/30'
		: 'border-amber-500/30';
	const textColor = isCritical ? 'text-destructive' : 'text-amber-500';
	const Icon = isCritical ? XCircle : AlertTriangle;

	return (
		<div className={`rounded-lg border ${bgColor} ${borderColor} p-4`}>
			<div className="flex items-start gap-4">
				<Icon className={`size-6 shrink-0 ${textColor}`} />
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<h3 className="font-semibold">{title}</h3>
						<Badge variant={isCritical ? 'destructive' : 'secondary'}>
							{isCritical ? 'Critical' : 'Warning'}
						</Badge>
					</div>
					<p className="mt-1 text-sm text-muted-foreground">{message}</p>
					<p className="mt-2 text-xs text-muted-foreground">
						Started: {startTime}
					</p>
				</div>
				<Button variant="outline" size="sm" onClick={onRefresh}>
					<RefreshCw className="mr-2 size-4" />
					Refresh
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const systems: SystemStatusCardProps[] = [
		{
			name: 'Inventory Database',
			status: 'operational',
			uptime: '99.99%',
			lastCheck: '1 min ago',
			icon: <Database className="size-5" />,
			details: 'Primary + Replica',
		},
		{
			name: 'API Gateway',
			status: 'operational',
			uptime: '99.95%',
			lastCheck: '2 min ago',
			icon: <Cloud className="size-5" />,
			details: '42ms avg response',
		},
		{
			name: 'Warehouse Sync',
			status: 'degraded',
			uptime: '98.5%',
			lastCheck: '5 min ago',
			icon: <RefreshCw className="size-5" />,
			details: 'High latency detected',
		},
		{
			name: 'External Integrations',
			status: 'operational',
			uptime: '99.8%',
			lastCheck: '3 min ago',
			icon: <Wifi className="size-5" />,
			details: '3 active connections',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold @lg:text-2xl">
								System Status
							</h2>
							<p className="text-sm text-muted-foreground">
								Real-time monitoring of inventory systems
							</p>
						</div>
						<Badge variant="outline" className="gap-2">
							<span className="size-2 rounded-full bg-emerald-500" />
							All Systems Operational
						</Badge>
					</div>

					<IncidentBanner
						severity="warning"
						title="Warehouse Sync Delay"
						message="Synchronization with East Distribution Center is experiencing delays. Stock levels may be up to 15 minutes behind."
						startTime="Today, 2:45 PM"
						onRefresh={() => console.log('Refresh')}
					/>

					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{systems.map((system) => (
							<SystemStatusCard key={system.name} {...system} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
