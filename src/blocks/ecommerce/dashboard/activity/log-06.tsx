import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	History,
	ArrowRight,
	FileText,
	Package,
	User,
	Settings,
	Database,
	GitBranch,
	Filter,
	Download,
	ChevronRight,
} from 'lucide-react';

interface ChangeLog {
	id: string;
	entityType: 'product' | 'user' | 'order' | 'setting' | 'content' | 'schema';
	entityId: string;
	entityName: string;
	changes: {
		field: string;
		oldValue: string;
		newValue: string;
	}[];
	changedBy: {
		name: string;
		avatar?: string;
		initials: string;
	};
	version?: string;
	timestamp: string;
	comment?: string;
}

interface ChangeLogProps {
	title: string;
	logs: ChangeLog[];
	totalChanges: string;
}

const EntityIcon = ({ type }: { type: ChangeLog['entityType'] }) => {
	const config = {
		product: { icon: Package, className: 'bg-blue-500/20 text-blue-400' },
		user: { icon: User, className: 'bg-purple-500/20 text-purple-400' },
		order: { icon: FileText, className: 'bg-emerald-500/20 text-emerald-400' },
		setting: { icon: Settings, className: 'bg-amber-500/20 text-amber-400' },
		content: { icon: FileText, className: 'bg-pink-500/20 text-pink-400' },
		schema: { icon: Database, className: 'bg-rose-500/20 text-rose-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const ChangeRow = ({ change }: { change: ChangeLog['changes'][0] }) => (
	<div className="flex items-center gap-2 text-xs p-2 rounded bg-muted/30">
		<span className="font-medium text-muted-foreground w-24 shrink-0 truncate">
			{change.field}
		</span>
		<span className="text-rose-400/80 line-through truncate max-w-[100px]">
			{change.oldValue}
		</span>
		<ArrowRight className="size-3 shrink-0 text-muted-foreground" />
		<span className="text-emerald-400 truncate max-w-[100px]">
			{change.newValue}
		</span>
	</div>
);

const ChangeEntry = ({ log }: { log: ChangeLog }) => (
	<div className="group p-4 rounded-xl border border-border/50 bg-card/50 transition-all hover:bg-muted/50 hover:border-border">
		<div className="flex gap-4">
			<EntityIcon type={log.entityType} />
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium text-foreground">
								{log.entityName}
							</span>
							<Badge variant="outline" className="text-xs capitalize">
								{log.entityType}
							</Badge>
							{log.version && (
								<Badge
									variant="outline"
									className="text-xs bg-primary/10 text-primary border-primary/30"
								>
									<GitBranch className="size-3 mr-1" />
									{log.version}
								</Badge>
							)}
						</div>
						<p className="text-xs text-muted-foreground font-mono">
							ID: {log.entityId}
						</p>
					</div>
					<span className="text-xs text-muted-foreground shrink-0">
						{log.timestamp}
					</span>
				</div>

				<div className="space-y-1.5 my-3">
					{log.changes.map((change, i) => (
						<ChangeRow key={i} change={change} />
					))}
				</div>

				{log.comment && (
					<p className="text-xs text-muted-foreground italic mb-2">
						"{log.comment}"
					</p>
				)}

				<div className="flex items-center gap-2 pt-2 border-t border-border/50">
					<Avatar className="size-5">
						<AvatarImage src={log.changedBy.avatar} alt={log.changedBy.name} />
						<AvatarFallback className="text-[9px] bg-secondary">
							{log.changedBy.initials}
						</AvatarFallback>
					</Avatar>
					<span className="text-xs text-muted-foreground">
						Changed by{' '}
						<span className="text-foreground">{log.changedBy.name}</span>
					</span>
				</div>
			</div>
		</div>
	</div>
);

const ChangeLogViewer = ({ title, logs, totalChanges }: ChangeLogProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<History className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Badge variant="outline" className="bg-muted/50">
					{totalChanges} changes
				</Badge>
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
		<CardContent className="pt-6">
			<ScrollArea className="h-[480px]">
				<div className="space-y-4 pr-4">
					{logs.map((log) => (
						<ChangeEntry key={log.id} log={log} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const changeLogs: ChangeLog[] = [
		{
			id: '1',
			entityType: 'product',
			entityId: 'PROD-12345',
			entityName: 'Premium Wireless Headphones',
			changes: [
				{ field: 'price', oldValue: '$299.99', newValue: '$249.99' },
				{ field: 'stock', oldValue: '45', newValue: '120' },
				{ field: 'status', oldValue: 'low_stock', newValue: 'in_stock' },
			],
			changedBy: { name: 'Sarah Chen', initials: 'SC' },
			version: 'v2.4',
			timestamp: '15 min ago',
			comment: 'Price reduction for spring sale',
		},
		{
			id: '2',
			entityType: 'user',
			entityId: 'USR-67890',
			entityName: 'john.doe@email.com',
			changes: [
				{ field: 'role', oldValue: 'customer', newValue: 'vip' },
				{ field: 'tier', oldValue: 'bronze', newValue: 'gold' },
			],
			changedBy: { name: 'Mike Johnson', initials: 'MJ' },
			timestamp: '1 hour ago',
		},
		{
			id: '3',
			entityType: 'setting',
			entityId: 'CFG-001',
			entityName: 'Checkout Settings',
			changes: [
				{ field: 'min_order', oldValue: '$25.00', newValue: '$15.00' },
				{ field: 'free_shipping', oldValue: '$100.00', newValue: '$75.00' },
			],
			changedBy: { name: 'Emily Davis', initials: 'ED' },
			version: 'v1.2',
			timestamp: '2 hours ago',
			comment: 'Lowered thresholds to increase conversions',
		},
		{
			id: '4',
			entityType: 'order',
			entityId: 'ORD-2024-0892',
			entityName: 'Order #ORD-2024-0892',
			changes: [
				{ field: 'status', oldValue: 'pending', newValue: 'shipped' },
				{ field: 'carrier', oldValue: '-', newValue: 'FedEx' },
				{ field: 'tracking', oldValue: '-', newValue: '789456123' },
			],
			changedBy: { name: 'Alex Kim', initials: 'AK' },
			timestamp: '3 hours ago',
		},
		{
			id: '5',
			entityType: 'schema',
			entityId: 'SCH-PRODUCTS',
			entityName: 'Products Table',
			changes: [
				{ field: 'column', oldValue: '-', newValue: 'sustainability_score' },
				{ field: 'type', oldValue: '-', newValue: 'INTEGER' },
			],
			changedBy: { name: 'Jordan Lee', initials: 'JL' },
			version: 'v3.0',
			timestamp: '5 hours ago',
			comment: 'Added sustainability tracking field',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-3xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<ChangeLogViewer
					title="Change Log"
					logs={changeLogs}
					totalChanges="1,247"
				/>
			</div>
		</section>
	);
}
