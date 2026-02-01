import {
	AlertCircle,
	ArrowDownUp,
	Check,
	Clock,
	Cloud,
	Database,
	ExternalLink,
	Loader2,
	MoreVertical,
	Pause,
	Play,
	RefreshCw,
	Settings2,
	Trash2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type SyncConnection = {
	id: string;
	name: string;
	icon: string;
	type: string;
	status: 'syncing' | 'synced' | 'error' | 'paused';
	lastSync: string;
	nextSync: string;
	itemsSynced: number;
	progress?: number;
};

type SyncLog = {
	id: string;
	action: string;
	items: number;
	timestamp: string;
	status: 'success' | 'error';
};

const SyncConnectionCard = ({
	name,
	icon,
	type,
	status,
	lastSync,
	nextSync,
	itemsSynced,
	progress,
}: SyncConnection) => {
	const statusStyles = {
		syncing: 'bg-primary/10 text-primary',
		synced: 'bg-emerald-500/10 text-emerald-500',
		error: 'bg-destructive/10 text-destructive',
		paused: 'bg-amber-500/10 text-amber-500',
	};

	const statusLabels = {
		syncing: 'Syncing...',
		synced: 'Synced',
		error: 'Error',
		paused: 'Paused',
	};

	return (
		<div
			className={`rounded-lg border p-4 ${status === 'synced' ? 'border-primary/30' : ''}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<div
						className={`flex size-12 items-center justify-center rounded-lg text-2xl ${
							status === 'synced' ? 'bg-primary/10' : 'bg-muted'
						}`}
					>
						{icon}
					</div>
					<div>
						<div className="flex items-center gap-2">
							<h4 className="font-semibold">{name}</h4>
							<Badge className={`${statusStyles[status]} border-0 text-xs`}>
								{status === 'syncing' && (
									<Loader2 className="mr-1 size-3 animate-spin" />
								)}
								{statusLabels[status]}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{type}</p>
						<div className="mt-2 grid grid-cols-3 gap-4 text-xs">
							<div>
								<p className="text-muted-foreground">Last Sync</p>
								<p className="font-medium">{lastSync}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Next Sync</p>
								<p className="font-medium">{nextSync}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Items</p>
								<p className="font-medium">{itemsSynced.toLocaleString()}</p>
							</div>
						</div>
						{progress !== undefined && (
							<div className="mt-3">
								<Progress value={progress} className="h-1.5" />
								<p className="text-xs text-muted-foreground mt-1">
									{progress}% complete
								</p>
							</div>
						)}
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<RefreshCw className="mr-2 size-4" />
							Sync Now
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings2 className="mr-2 size-4" />
							Configure
						</DropdownMenuItem>
						{status === 'paused' ? (
							<DropdownMenuItem>
								<Play className="mr-2 size-4" />
								Resume
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem>
								<Pause className="mr-2 size-4" />
								Pause
							</DropdownMenuItem>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 size-4" />
							Disconnect
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

const SyncLogRow = ({ action, items, timestamp, status }: SyncLog) => (
	<div className="flex items-center justify-between py-2">
		<div className="flex items-center gap-3">
			<div
				className={`flex size-6 items-center justify-center rounded-full ${
					status === 'success'
						? 'bg-emerald-500/10 text-emerald-500'
						: 'bg-destructive/10 text-destructive'
				}`}
			>
				{status === 'success' ? (
					<Check className="size-3" />
				) : (
					<AlertCircle className="size-3" />
				)}
			</div>
			<div>
				<p className="text-sm font-medium">{action}</p>
				<p className="text-xs text-muted-foreground">{items} items</p>
			</div>
		</div>
		<p className="text-xs text-muted-foreground">{timestamp}</p>
	</div>
);

export default function Main() {
	const connections: SyncConnection[] = [
		{
			id: '1',
			name: 'Shopify',
			icon: '🛍️',
			type: 'Products & Orders',
			status: 'synced',
			lastSync: '5 min ago',
			nextSync: 'In 25 min',
			itemsSynced: 1234,
		},
		{
			id: '2',
			name: 'QuickBooks',
			icon: '📗',
			type: 'Orders & Invoices',
			status: 'syncing',
			lastSync: '1 hour ago',
			nextSync: 'Now',
			itemsSynced: 892,
			progress: 68,
		},
		{
			id: '3',
			name: 'Mailchimp',
			icon: '🐵',
			type: 'Customers',
			status: 'paused',
			lastSync: '2 days ago',
			nextSync: 'Paused',
			itemsSynced: 5420,
		},
	];

	const logs: SyncLog[] = [
		{
			id: '1',
			action: 'Products synced from Shopify',
			items: 45,
			timestamp: '5 min ago',
			status: 'success',
		},
		{
			id: '2',
			action: 'Orders synced to QuickBooks',
			items: 12,
			timestamp: '1 hour ago',
			status: 'success',
		},
		{
			id: '3',
			action: 'Inventory update failed',
			items: 0,
			timestamp: '2 hours ago',
			status: 'error',
		},
		{
			id: '4',
			action: 'Customers synced to Mailchimp',
			items: 156,
			timestamp: '2 days ago',
			status: 'success',
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<ArrowDownUp className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Data Sync</CardTitle>
											<CardDescription>
												Keep your data synchronized across platforms
											</CardDescription>
										</div>
									</div>
									<Button variant="outline" className="gap-2">
										<RefreshCw className="size-4" />
										Sync All
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								{connections.map((connection) => (
									<SyncConnectionCard key={connection.id} {...connection} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Sync Schedule</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Frequency</label>
									<Select defaultValue="30">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="5">Every 5 minutes</SelectItem>
											<SelectItem value="15">Every 15 minutes</SelectItem>
											<SelectItem value="30">Every 30 minutes</SelectItem>
											<SelectItem value="60">Every hour</SelectItem>
											<SelectItem value="manual">Manual only</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Auto-sync</p>
										<p className="text-xs text-muted-foreground">
											Sync automatically
										</p>
									</div>
									<Switch defaultChecked />
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">Sync Log</CardTitle>
									<Button variant="ghost" size="sm">
										View All
									</Button>
								</div>
							</CardHeader>
							<CardContent className="divide-y">
								{logs.map((log) => (
									<SyncLogRow key={log.id} {...log} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
