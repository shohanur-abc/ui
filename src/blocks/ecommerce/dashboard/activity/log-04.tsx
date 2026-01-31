import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Shield,
	Edit,
	Trash2,
	Plus,
	Eye,
	Download,
	Settings,
	Lock,
	Unlock,
	UserCog,
	Filter,
	Calendar,
	type LucideIcon,
} from 'lucide-react';

interface AuditLog {
	id: string;
	action: 'create' | 'update' | 'delete' | 'view' | 'export' | 'permission' | 'lock' | 'unlock';
	user: {
		name: string;
		email: string;
		avatar?: string;
		initials: string;
		role: string;
	};
	resource: string;
	resourceType: string;
	details: string;
	oldValue?: string;
	newValue?: string;
	timestamp: string;
	ipAddress: string;
}

interface AuditLogProps {
	title: string;
	logs: AuditLog[];
	totalActions: string;
	dateRange: string;
}

const ActionIcon = ({ action }: { action: AuditLog['action'] }) => {
	const config: Record<
		AuditLog['action'],
		{ icon: LucideIcon; className: string }
	> = {
		create: { icon: Plus, className: 'bg-emerald-500/20 text-emerald-400' },
		update: { icon: Edit, className: 'bg-blue-500/20 text-blue-400' },
		delete: { icon: Trash2, className: 'bg-rose-500/20 text-rose-400' },
		view: { icon: Eye, className: 'bg-purple-500/20 text-purple-400' },
		export: { icon: Download, className: 'bg-amber-500/20 text-amber-400' },
		permission: { icon: UserCog, className: 'bg-pink-500/20 text-pink-400' },
		lock: { icon: Lock, className: 'bg-rose-500/20 text-rose-400' },
		unlock: { icon: Unlock, className: 'bg-emerald-500/20 text-emerald-400' },
	};

	const { icon: Icon, className } = config[action];

	return (
		<div
			className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-4" />
		</div>
	);
};

const ActionLabel = ({ action }: { action: AuditLog['action'] }) => {
	const labels = {
		create: 'Created',
		update: 'Updated',
		delete: 'Deleted',
		view: 'Viewed',
		export: 'Exported',
		permission: 'Changed permissions',
		lock: 'Locked',
		unlock: 'Unlocked',
	};

	return <span className="font-medium text-foreground">{labels[action]}</span>;
};

const ChangeIndicator = ({
	oldValue,
	newValue,
}: {
	oldValue?: string;
	newValue?: string;
}) => {
	if (!oldValue || !newValue) return null;

	return (
		<div className="flex items-center gap-2 text-xs mt-2 p-2 rounded bg-muted/50">
			<span className="line-through text-rose-400/70">{oldValue}</span>
			<span className="text-muted-foreground">→</span>
			<span className="text-emerald-400">{newValue}</span>
		</div>
	);
};

const AuditEntry = ({ log }: { log: AuditLog }) => (
	<div className="group p-4 rounded-xl border border-border/50 bg-card/50 transition-all hover:bg-muted/50 hover:border-border">
		<div className="flex gap-3">
			<ActionIcon action={log.action} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div className="flex items-center gap-2 flex-wrap">
						<Avatar className="size-5">
							<AvatarImage src={log.user.avatar} alt={log.user.name} />
							<AvatarFallback className="text-[9px] bg-secondary">
								{log.user.initials}
							</AvatarFallback>
						</Avatar>
						<span className="font-medium text-sm text-foreground">
							{log.user.name}
						</span>
						<Badge variant="outline" className="text-xs">
							{log.user.role}
						</Badge>
					</div>
					<span className="text-xs text-muted-foreground shrink-0">
						{log.timestamp}
					</span>
				</div>
				<p className="text-sm text-muted-foreground">
					<ActionLabel action={log.action} />{' '}
					<span className="text-foreground">{log.resourceType}</span>:{' '}
					<span className="font-mono text-xs text-primary">{log.resource}</span>
				</p>
				<p className="text-xs text-muted-foreground mt-1">{log.details}</p>
				<ChangeIndicator oldValue={log.oldValue} newValue={log.newValue} />
				<p className="text-xs text-muted-foreground/60 mt-2">
					IP: {log.ipAddress}
				</p>
			</div>
		</div>
	</div>
);

const AuditHeader = ({
	totalActions,
	dateRange,
}: {
	totalActions: string;
	dateRange: string;
}) => (
	<div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
		<div className="flex items-center gap-3">
			<Shield className="size-5 text-primary" />
			<div>
				<p className="text-sm text-muted-foreground">Audit Trail</p>
				<p className="font-semibold text-foreground">{totalActions} actions</p>
			</div>
		</div>
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<Calendar className="size-4" />
			<span>{dateRange}</span>
		</div>
	</div>
);

const AuditLogViewer = ({
	title,
	logs,
	totalActions,
	dateRange,
}: AuditLogProps) => (
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
			<AuditHeader totalActions={totalActions} dateRange={dateRange} />
			<ScrollArea className="h-[420px]">
				<div className="space-y-3 pr-4">
					{logs.map((log) => (
						<AuditEntry key={log.id} log={log} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const auditLogs: AuditLog[] = [
		{
			id: '1',
			action: 'update',
			user: { name: 'Sarah Chen', email: 'sarah@company.com', initials: 'SC', role: 'Admin' },
			resource: 'PROD-12345',
			resourceType: 'Product',
			details: 'Updated product pricing and inventory count',
			oldValue: '$99.99',
			newValue: '$89.99',
			timestamp: '10 min ago',
			ipAddress: '192.168.1.45',
		},
		{
			id: '2',
			action: 'permission',
			user: { name: 'Mike Johnson', email: 'mike@company.com', initials: 'MJ', role: 'Manager' },
			resource: 'emily@company.com',
			resourceType: 'User',
			details: 'Changed user role from Viewer to Editor',
			oldValue: 'Viewer',
			newValue: 'Editor',
			timestamp: '25 min ago',
			ipAddress: '10.0.0.23',
		},
		{
			id: '3',
			action: 'delete',
			user: { name: 'Emily Davis', email: 'emily@company.com', initials: 'ED', role: 'Editor' },
			resource: 'CAT-456',
			resourceType: 'Category',
			details: 'Removed deprecated category "Summer 2023"',
			timestamp: '1 hour ago',
			ipAddress: '172.16.0.89',
		},
		{
			id: '4',
			action: 'create',
			user: { name: 'Alex Kim', email: 'alex@company.com', initials: 'AK', role: 'Admin' },
			resource: 'PROMO-789',
			resourceType: 'Promotion',
			details: 'Created new spring sale promotion with 25% discount',
			timestamp: '2 hours ago',
			ipAddress: '192.168.1.100',
		},
		{
			id: '5',
			action: 'export',
			user: { name: 'Jordan Lee', email: 'jordan@company.com', initials: 'JL', role: 'Manager' },
			resource: 'orders_q1_2024.csv',
			resourceType: 'Report',
			details: 'Exported Q1 2024 orders report (12,450 records)',
			timestamp: '3 hours ago',
			ipAddress: '10.0.0.45',
		},
		{
			id: '6',
			action: 'lock',
			user: { name: 'Lisa Anderson', email: 'lisa@company.com', initials: 'LA', role: 'Admin' },
			resource: 'user_5678',
			resourceType: 'User Account',
			details: 'Locked account due to suspicious activity',
			timestamp: '4 hours ago',
			ipAddress: '192.168.1.45',
		},
		{
			id: '7',
			action: 'view',
			user: { name: 'David Kim', email: 'david@company.com', initials: 'DK', role: 'Viewer' },
			resource: 'financial_summary',
			resourceType: 'Dashboard',
			details: 'Accessed sensitive financial dashboard',
			timestamp: '5 hours ago',
			ipAddress: '172.16.0.12',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<AuditLogViewer
					title="Audit Log"
					logs={auditLogs}
					totalActions="2,847"
					dateRange="Last 30 days"
				/>
			</div>
		</section>
	);
}
