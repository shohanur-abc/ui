import {
	AlertTriangle,
	Check,
	ChevronRight,
	ExternalLink,
	RefreshCw,
	Settings,
	Trash2,
	X,
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
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

type Integration = {
	id: string;
	name: string;
	description: string;
	icon: string;
	status: 'connected' | 'disconnected' | 'error';
	lastSync?: string;
	usage?: number;
};

type SyncStatus = {
	service: string;
	status: 'synced' | 'syncing' | 'error';
	lastSynced: string;
	itemsSynced?: number;
};

const IntegrationCard = ({
	name,
	description,
	icon,
	status,
	lastSync,
	usage,
}: Integration) => (
	<div className="group relative flex items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/30">
		<div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
			{icon}
		</div>
		<div className="min-w-0 flex-1">
			<div className="flex items-center gap-2">
				<h4 className="font-medium">{name}</h4>
				<Badge
					variant={
						status === 'connected'
							? 'default'
							: status === 'error'
								? 'destructive'
								: 'secondary'
					}
					className={
						status === 'connected'
							? 'bg-emerald-500/10 text-emerald-500 border-0'
							: ''
					}
				>
					{status === 'connected' && <Check className="mr-1 size-3" />}
					{status === 'error' && <X className="mr-1 size-3" />}
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			</div>
			<p className="mt-1 text-sm text-muted-foreground line-clamp-1">
				{description}
			</p>
			{status === 'connected' && (
				<div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
					{lastSync && <span>Last sync: {lastSync}</span>}
					{usage !== undefined && <span>Usage: {usage}%</span>}
				</div>
			)}
		</div>
		<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
			{status === 'connected' ? (
				<>
					<Button variant="ghost" size="icon-sm">
						<RefreshCw className="size-4" />
					</Button>
					<Button variant="ghost" size="icon-sm">
						<Settings className="size-4" />
					</Button>
				</>
			) : (
				<Button size="sm">Connect</Button>
			)}
		</div>
	</div>
);

const SyncStatusRow = ({
	service,
	status,
	lastSynced,
	itemsSynced,
}: SyncStatus) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex items-center gap-3">
			<div
				className={`size-2 rounded-full ${
					status === 'synced'
						? 'bg-emerald-500'
						: status === 'syncing'
							? 'bg-amber-500 animate-pulse'
							: 'bg-destructive'
				}`}
			/>
			<div>
				<p className="text-sm font-medium">{service}</p>
				<p className="text-xs text-muted-foreground">
					{status === 'syncing' ? 'Syncing...' : `Last: ${lastSynced}`}
				</p>
			</div>
		</div>
		{itemsSynced && (
			<span className="text-sm text-muted-foreground">{itemsSynced} items</span>
		)}
	</div>
);

export default function Main() {
	const integrations: Integration[] = [
		{
			id: 'stripe',
			name: 'Stripe',
			description: 'Payment processing and billing',
			icon: '💳',
			status: 'connected',
			lastSync: '2 mins ago',
			usage: 45,
		},
		{
			id: 'shopify',
			name: 'Shopify',
			description: 'E-commerce platform sync',
			icon: '🛒',
			status: 'connected',
			lastSync: '1 hour ago',
			usage: 78,
		},
		{
			id: 'mailchimp',
			name: 'Mailchimp',
			description: 'Email marketing automation',
			icon: '📧',
			status: 'error',
		},
		{
			id: 'slack',
			name: 'Slack',
			description: 'Team notifications and alerts',
			icon: '💬',
			status: 'disconnected',
		},
		{
			id: 'analytics',
			name: 'Google Analytics',
			description: 'Website analytics and tracking',
			icon: '📊',
			status: 'connected',
			lastSync: '5 mins ago',
			usage: 23,
		},
		{
			id: 'zendesk',
			name: 'Zendesk',
			description: 'Customer support ticketing',
			icon: '🎫',
			status: 'disconnected',
		},
	];

	const syncStatuses: SyncStatus[] = [
		{
			service: 'Products',
			status: 'synced',
			lastSynced: '5 mins ago',
			itemsSynced: 1234,
		},
		{
			service: 'Orders',
			status: 'syncing',
			lastSynced: 'In progress',
			itemsSynced: 567,
		},
		{
			service: 'Customers',
			status: 'synced',
			lastSynced: '1 hour ago',
			itemsSynced: 890,
		},
		{ service: 'Inventory', status: 'error', lastSynced: 'Failed 30 mins ago' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold">Integrations</h1>
						<p className="text-muted-foreground">
							Connect third-party services and apps
						</p>
					</div>
					<Button variant="outline" className="gap-2">
						<ExternalLink className="size-4" />
						Browse Marketplace
					</Button>
				</div>

				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Connected Services</CardTitle>
								<CardDescription>
									Manage your active integrations
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								{integrations.map((integration) => (
									<IntegrationCard key={integration.id} {...integration} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Sync Status</CardTitle>
								<CardDescription>Real-time sync overview</CardDescription>
							</CardHeader>
							<CardContent className="divide-y">
								{syncStatuses.map((sync) => (
									<SyncStatusRow key={sync.service} {...sync} />
								))}
							</CardContent>
						</Card>

						<Card className="border-amber-500/20 bg-amber-500/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<AlertTriangle className="size-5 shrink-0 text-amber-500" />
									<div>
										<h4 className="font-medium text-amber-500">Sync Issue</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											Inventory sync failed. Please check your API credentials.
										</p>
										<Button size="sm" variant="outline" className="mt-3">
											Retry Sync
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
