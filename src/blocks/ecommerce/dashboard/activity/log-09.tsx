import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Shield,
	AlertTriangle,
	Lock,
	Unlock,
	Key,
	UserX,
	Globe,
	Fingerprint,
	Eye,
	Filter,
	Download,
	AlertCircle,
	type LucideIcon,
} from 'lucide-react';

interface SecurityLog {
	id: string;
	severity: 'critical' | 'high' | 'medium' | 'low';
	type: 'auth' | 'access' | 'intrusion' | 'policy' | 'encryption' | 'audit';
	event: string;
	description: string;
	source: {
		ip: string;
		location?: string;
		device?: string;
	};
	targetUser?: string;
	action?: string;
	timestamp: string;
}

interface SecurityLogProps {
	title: string;
	logs: SecurityLog[];
	threatLevel: 'low' | 'medium' | 'high' | 'critical';
	activeIncidents: number;
}

const SeverityIcon = ({ severity }: { severity: SecurityLog['severity'] }) => {
	const config = {
		critical: 'bg-rose-500/20 text-rose-400',
		high: 'bg-orange-500/20 text-orange-400',
		medium: 'bg-amber-500/20 text-amber-400',
		low: 'bg-blue-500/20 text-blue-400',
	};

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${config[severity]}`}
		>
			<AlertTriangle className="size-5" />
		</div>
	);
};

const TypeIcon = ({ type }: { type: SecurityLog['type'] }) => {
	const config: Record<
		SecurityLog['type'],
		{ icon: LucideIcon; label: string }
	> = {
		auth: { icon: Key, label: 'Authentication' },
		access: { icon: Lock, label: 'Access Control' },
		intrusion: { icon: AlertCircle, label: 'Intrusion Detection' },
		policy: { icon: Shield, label: 'Policy Violation' },
		encryption: { icon: Fingerprint, label: 'Encryption' },
		audit: { icon: Eye, label: 'Audit' },
	};

	return (
		<Badge variant="outline" className="text-xs gap-1">
			{config[type].label}
		</Badge>
	);
};

const SeverityBadge = ({ severity }: { severity: SecurityLog['severity'] }) => {
	const config = {
		critical: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
		medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	};

	return (
		<Badge
			variant="outline"
			className={`uppercase text-xs font-semibold ${config[severity]}`}
		>
			{severity}
		</Badge>
	);
};

const SecurityEntry = ({ log }: { log: SecurityLog }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			log.severity === 'critical'
				? 'border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50'
				: log.severity === 'high'
					? 'border-orange-500/30 bg-orange-500/5 hover:border-orange-500/50'
					: 'border-border/50 bg-card/50 hover:border-border'
		}`}
	>
		<div className="flex gap-4">
			<SeverityIcon severity={log.severity} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex items-center gap-2 flex-wrap">
						<SeverityBadge severity={log.severity} />
						<TypeIcon type={log.type} />
					</div>
					<span className="text-xs text-muted-foreground shrink-0">
						{log.timestamp}
					</span>
				</div>
				<h4 className="font-medium text-foreground mb-1">{log.event}</h4>
				<p className="text-sm text-muted-foreground mb-3">{log.description}</p>
				<div className="flex items-center gap-4 text-xs text-muted-foreground p-2 rounded bg-muted/30">
					<span className="flex items-center gap-1">
						<Globe className="size-3" />
						{log.source.ip}
					</span>
					{log.source.location && <span>{log.source.location}</span>}
					{log.source.device && <span>{log.source.device}</span>}
					{log.targetUser && (
						<>
							<span>•</span>
							<span className="flex items-center gap-1">
								<UserX className="size-3" />
								{log.targetUser}
							</span>
						</>
					)}
				</div>
				{log.action && (
					<div className="mt-2 pt-2 border-t border-border/50">
						<span className="text-xs text-emerald-400">
							Action taken: {log.action}
						</span>
					</div>
				)}
			</div>
		</div>
	</div>
);

const ThreatIndicator = ({
	level,
	incidents,
}: {
	level: SecurityLogProps['threatLevel'];
	incidents: number;
}) => {
	const config = {
		low: {
			color: 'text-emerald-400',
			bg: 'bg-emerald-500/10 border-emerald-500/20',
		},
		medium: {
			color: 'text-amber-400',
			bg: 'bg-amber-500/10 border-amber-500/20',
		},
		high: {
			color: 'text-orange-400',
			bg: 'bg-orange-500/10 border-orange-500/20',
		},
		critical: {
			color: 'text-rose-400',
			bg: 'bg-rose-500/10 border-rose-500/20',
		},
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<div
				className={`flex items-center gap-3 p-4 rounded-lg border ${config[level].bg}`}
			>
				<Shield className={`size-6 ${config[level].color}`} />
				<div>
					<p className="text-sm text-muted-foreground">Threat Level</p>
					<p className={`text-xl font-bold uppercase ${config[level].color}`}>
						{level}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
				<AlertTriangle className="size-6 text-amber-400" />
				<div>
					<p className="text-sm text-muted-foreground">Active Incidents</p>
					<p className="text-xl font-bold text-foreground">{incidents}</p>
				</div>
			</div>
		</div>
	);
};

const SecurityLogViewer = ({
	title,
	logs,
	threatLevel,
	activeIncidents,
}: SecurityLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Shield className="size-5" />
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
			<ThreatIndicator level={threatLevel} incidents={activeIncidents} />
			<ScrollArea className="h-[400px]">
				<div className="space-y-3 pr-4">
					{logs.map((log) => (
						<SecurityEntry key={log.id} log={log} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const securityLogs: SecurityLog[] = [
		{
			id: '1',
			severity: 'critical',
			type: 'intrusion',
			event: 'Brute Force Attack Detected',
			description:
				'Multiple failed login attempts (50+) detected from single IP address targeting admin accounts',
			source: {
				ip: '185.220.101.45',
				location: 'Moscow, Russia',
				device: 'Unknown',
			},
			action: 'IP blocked for 24 hours',
			timestamp: '2024-03-15 14:32:45',
		},
		{
			id: '2',
			severity: 'high',
			type: 'auth',
			event: 'Suspicious Login Activity',
			description:
				'Login from new device and unusual location for user account',
			source: {
				ip: '103.45.67.89',
				location: 'Beijing, China',
				device: 'Chrome on Windows',
			},
			targetUser: 'admin@company.com',
			action: '2FA verification requested',
			timestamp: '2024-03-15 14:28:30',
		},
		{
			id: '3',
			severity: 'medium',
			type: 'policy',
			event: 'Password Policy Violation',
			description:
				'User attempted to set password that does not meet minimum requirements',
			source: {
				ip: '192.168.1.45',
				location: 'San Francisco, US',
				device: 'Safari on macOS',
			},
			targetUser: 'john.doe@company.com',
			timestamp: '2024-03-15 14:25:00',
		},
		{
			id: '4',
			severity: 'high',
			type: 'access',
			event: 'Unauthorized API Access Attempt',
			description: 'Expired API key used to access protected endpoints',
			source: {
				ip: '45.67.89.12',
				device: 'curl/7.68.0',
			},
			action: 'Request blocked, key invalidated',
			timestamp: '2024-03-15 14:20:15',
		},
		{
			id: '5',
			severity: 'low',
			type: 'audit',
			event: 'Privileged Access Review',
			description: 'Quarterly review of admin access permissions completed',
			source: {
				ip: '10.0.0.25',
				location: 'Internal',
				device: 'Admin Panel',
			},
			timestamp: '2024-03-15 14:15:00',
		},
		{
			id: '6',
			severity: 'medium',
			type: 'encryption',
			event: 'SSL Certificate Expiring Soon',
			description: 'SSL certificate for api.example.com expires in 14 days',
			source: {
				ip: 'System',
				device: 'Certificate Monitor',
			},
			timestamp: '2024-03-15 14:00:00',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<SecurityLogViewer
					title="Security Log"
					logs={securityLogs}
					threatLevel="medium"
					activeIncidents={3}
				/>
			</div>
		</section>
	);
}
