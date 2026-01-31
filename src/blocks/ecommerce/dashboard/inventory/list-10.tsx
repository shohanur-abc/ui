'use client';

import * as React from 'react';
import {
	Package,
	Link2,
	Unlink,
	Settings,
	Check,
	AlertTriangle,
	RefreshCw,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type Integration = {
	id: string;
	name: string;
	type: 'erp' | 'ecommerce' | 'shipping' | 'accounting';
	status: 'connected' | 'disconnected' | 'error';
	lastSync?: string;
	itemsSynced?: number;
	enabled: boolean;
};

type IntegrationRowProps = {
	integration: Integration;
	onToggle: (id: string) => void;
};

const IntegrationRow = ({ integration, onToggle }: IntegrationRowProps) => {
	const statusConfig = {
		connected: { icon: <Check className="size-4 text-emerald-500" />, label: 'Connected', color: 'text-emerald-500' },
		disconnected: { icon: <Unlink className="size-4 text-muted-foreground" />, label: 'Disconnected', color: 'text-muted-foreground' },
		error: { icon: <AlertTriangle className="size-4 text-destructive" />, label: 'Error', color: 'text-destructive' },
	};

	const typeConfig = {
		erp: 'ERP System',
		ecommerce: 'E-commerce',
		shipping: 'Shipping',
		accounting: 'Accounting',
	};

	const { icon, label, color } = statusConfig[integration.status];

	return (
		<div className="flex items-center gap-4 border-b py-4 last:border-0">
			<div className={`flex size-10 items-center justify-center rounded-lg ${integration.status === 'connected' ? 'bg-primary/10' : 'bg-muted'}`}>
				<Link2 className={`size-5 ${integration.status === 'connected' ? 'text-primary' : 'text-muted-foreground'}`} />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<p className="truncate font-medium">{integration.name}</p>
					<Badge variant="secondary">{typeConfig[integration.type]}</Badge>
				</div>
				<div className="flex items-center gap-1 text-sm">
					{icon}
					<span className={color}>{label}</span>
				</div>
			</div>
			{integration.lastSync && (
				<div className="hidden text-center @sm:block">
					<p className="text-xs text-muted-foreground">Last Sync</p>
					<p className="font-medium">{integration.lastSync}</p>
				</div>
			)}
			{integration.itemsSynced !== undefined && (
				<div className="hidden text-center @sm:block">
					<p className="text-xs text-muted-foreground">Items Synced</p>
					<p className="font-medium">{integration.itemsSynced.toLocaleString()}</p>
				</div>
			)}
			<div className="flex items-center gap-2">
				<Switch checked={integration.enabled} onCheckedChange={() => onToggle(integration.id)} />
			</div>
			<Button variant="ghost" size="icon-sm">
				<RefreshCw className="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm">
				<Settings className="size-4" />
			</Button>
		</div>
	);
};

type SummaryProps = {
	connected: number;
	total: number;
	totalSynced: number;
};

const Summary = ({ connected, total, totalSynced }: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="rounded-lg border p-4 text-center">
			<Link2 className="mx-auto size-6 text-primary" />
			<p className="mt-2 text-2xl font-bold">{connected}/{total}</p>
			<p className="text-sm text-muted-foreground">Active Integrations</p>
		</div>
		<div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
			<Check className="mx-auto size-6 text-emerald-500" />
			<p className="mt-2 text-2xl font-bold text-emerald-500">{totalSynced.toLocaleString()}</p>
			<p className="text-sm text-muted-foreground">Items Synced</p>
		</div>
		<div className="rounded-lg border p-4 text-center">
			<RefreshCw className="mx-auto size-6 text-muted-foreground" />
			<p className="mt-2 text-2xl font-bold">Real-time</p>
			<p className="text-sm text-muted-foreground">Sync Frequency</p>
		</div>
	</div>
);

export default function Main() {
	const [integrations, setIntegrations] = React.useState<Integration[]>([
		{ id: '1', name: 'SAP Business One', type: 'erp', status: 'connected', lastSync: '2 mins ago', itemsSynced: 15420, enabled: true },
		{ id: '2', name: 'Shopify', type: 'ecommerce', status: 'connected', lastSync: '5 mins ago', itemsSynced: 8940, enabled: true },
		{ id: '3', name: 'Amazon Seller Central', type: 'ecommerce', status: 'connected', lastSync: '10 mins ago', itemsSynced: 12350, enabled: true },
		{ id: '4', name: 'ShipStation', type: 'shipping', status: 'error', lastSync: '1 hour ago', itemsSynced: 0, enabled: true },
		{ id: '5', name: 'QuickBooks', type: 'accounting', status: 'disconnected', enabled: false },
		{ id: '6', name: 'WooCommerce', type: 'ecommerce', status: 'connected', lastSync: '15 mins ago', itemsSynced: 4230, enabled: true },
	]);

	const handleToggle = (id: string) => {
		setIntegrations((prev) =>
			prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i))
		);
	};

	const connectedCount = integrations.filter((i) => i.status === 'connected').length;
	const totalSynced = integrations.reduce((sum, i) => sum + (i.itemsSynced || 0), 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Integrations</CardTitle>
								<CardDescription>Connected systems and sync status</CardDescription>
							</div>
							<Button>
								<Link2 className="mr-2 size-4" />
								Add Integration
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary connected={connectedCount} total={integrations.length} totalSynced={totalSynced} />
						<div>
							{integrations.map((integration) => (
								<IntegrationRow key={integration.id} integration={integration} onToggle={handleToggle} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
