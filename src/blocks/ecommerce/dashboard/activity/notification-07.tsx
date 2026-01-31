import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Shield,
	AlertTriangle,
	Lock,
	Unlock,
	UserX,
	Globe,
	Monitor,
	CheckCircle2,
	XCircle,
	Eye,
	type LucideIcon,
} from 'lucide-react';

interface SecurityAlert {
	id: string;
	type:
		| 'login_failed'
		| 'login_success'
		| 'password_change'
		| 'suspicious_activity'
		| 'new_device'
		| 'blocked_ip';
	severity: 'critical' | 'warning' | 'info';
	title: string;
	description: string;
	location?: string;
	device?: string;
	ipAddress?: string;
	timestamp: string;
	resolved?: boolean;
}

interface SecurityAlertsProps {
	title: string;
	alerts: SecurityAlert[];
	stats: {
		activeThreats: number;
		blockedAttempts: number;
		resolvedToday: number;
	};
}

const TypeConfig: Record<
	SecurityAlert['type'],
	{ icon: LucideIcon; className: string }
> = {
	login_failed: { icon: XCircle, className: 'bg-rose-500/20 text-rose-400' },
	login_success: { icon: CheckCircle2, className: 'bg-emerald-500/20 text-emerald-400' },
	password_change: { icon: Lock, className: 'bg-blue-500/20 text-blue-400' },
	suspicious_activity: { icon: AlertTriangle, className: 'bg-orange-500/20 text-orange-400' },
	new_device: { icon: Monitor, className: 'bg-purple-500/20 text-purple-400' },
	blocked_ip: { icon: UserX, className: 'bg-rose-500/20 text-rose-400' },
};

const SeverityBadge = ({ severity }: { severity: SecurityAlert['severity'] }) => {
	const config = {
		critical: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	};

	return (
		<Badge variant="outline" className={`uppercase text-xs ${config[severity]}`}>
			{severity}
		</Badge>
	);
};

const AlertCard = ({ alert }: { alert: SecurityAlert }) => {
	const config = TypeConfig[alert.type];
	const Icon = config.icon;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				alert.severity === 'critical'
					? 'border-rose-500/30 bg-rose-500/5'
					: alert.severity === 'warning'
						? 'border-amber-500/30 bg-amber-500/5'
						: 'border-border/50 bg-card/80'
			} ${alert.resolved ? 'opacity-60' : ''}`}
		>
			<div className="flex items-start gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config.className}`}
				>
					<Icon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div className="flex items-center gap-2">
							<h4 className="font-medium text-foreground">{alert.title}</h4>
							<SeverityBadge severity={alert.severity} />
							{alert.resolved && (
								<Badge
									variant="outline"
									className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
								>
									Resolved
								</Badge>
							)}
						</div>
						<span className="text-xs text-muted-foreground shrink-0">
							{alert.timestamp}
						</span>
					</div>
					<p className="text-sm text-muted-foreground mb-3">
						{alert.description}
					</p>
					<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
						{alert.ipAddress && (
							<span className="flex items-center gap-1 font-mono bg-muted/50 px-2 py-0.5 rounded">
								<Globe className="size-3" />
								{alert.ipAddress}
							</span>
						)}
						{alert.location && (
							<span className="flex items-center gap-1">
								<Globe className="size-3" />
								{alert.location}
							</span>
						)}
						{alert.device && (
							<span className="flex items-center gap-1">
								<Monitor className="size-3" />
								{alert.device}
							</span>
						)}
					</div>
					{!alert.resolved && alert.severity !== 'info' && (
						<div className="flex gap-2 mt-3">
							<Button size="sm" className="h-7">
								Investigate
							</Button>
							<Button variant="outline" size="sm" className="h-7">
								Dismiss
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const SecurityStats = ({ stats }: { stats: SecurityAlertsProps['stats'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<AlertTriangle className="size-4 text-rose-400 mb-2" />
			<span className="text-2xl font-bold text-rose-400 block">
				{stats.activeThreats}
			</span>
			<span className="text-xs text-muted-foreground">Active Threats</span>
		</div>
		<div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<UserX className="size-4 text-amber-400 mb-2" />
			<span className="text-2xl font-bold text-amber-400 block">
				{stats.blockedAttempts}
			</span>
			<span className="text-xs text-muted-foreground">Blocked</span>
		</div>
		<div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
			<CheckCircle2 className="size-4 text-emerald-400 mb-2" />
			<span className="text-2xl font-bold text-emerald-400 block">
				{stats.resolvedToday}
			</span>
			<span className="text-xs text-muted-foreground">Resolved</span>
		</div>
	</div>
);

const SecurityAlerts = ({ title, alerts, stats }: SecurityAlertsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Shield className="size-5" />
				{title}
				{stats.activeThreats > 0 && (
					<Badge className="bg-rose-500 text-white animate-pulse">
						{stats.activeThreats} Active
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm" className="gap-1">
				<Eye className="size-4" />
				Security Center
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<SecurityStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{alerts.map((alert) => (
						<AlertCard key={alert.id} alert={alert} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const alerts: SecurityAlert[] = [
		{
			id: '1',
			type: 'suspicious_activity',
			severity: 'critical',
			title: 'Unusual Login Pattern Detected',
			description:
				'Multiple failed login attempts from different locations within 5 minutes. Account may be under attack.',
			location: 'Russia',
			ipAddress: '185.234.72.xxx',
			timestamp: '5 min ago',
		},
		{
			id: '2',
			type: 'blocked_ip',
			severity: 'warning',
			title: 'Malicious IP Blocked',
			description:
				'IP address automatically blocked after 10 consecutive failed login attempts.',
			ipAddress: '45.33.32.xxx',
			location: 'China',
			timestamp: '15 min ago',
		},
		{
			id: '3',
			type: 'new_device',
			severity: 'info',
			title: 'New Device Login',
			description:
				'Admin user "john.admin" logged in from a new device.',
			device: 'MacBook Pro - Chrome 122',
			location: 'San Francisco, CA',
			timestamp: '1 hour ago',
		},
		{
			id: '4',
			type: 'password_change',
			severity: 'info',
			title: 'Password Changed',
			description:
				'Password was successfully changed for user "sarah.manager".',
			device: 'Windows 11 - Edge',
			timestamp: '2 hours ago',
			resolved: true,
		},
		{
			id: '5',
			type: 'login_failed',
			severity: 'warning',
			title: 'Failed Admin Login',
			description:
				'3 failed login attempts for admin account from unknown location.',
			ipAddress: '91.234.123.xxx',
			location: 'Unknown',
			timestamp: '3 hours ago',
			resolved: true,
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<SecurityAlerts
					title="Security Alerts"
					alerts={alerts}
					stats={{
						activeThreats: 2,
						blockedAttempts: 47,
						resolvedToday: 12,
					}}
				/>
			</div>
		</section>
	);
}
