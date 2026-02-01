'use client';

import * as React from 'react';
import {
	Package,
	Link2,
	ExternalLink,
	RefreshCw,
	MoreHorizontal,
	CheckCircle2,
	AlertCircle,
	Clock,
	Unlink,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface Channel {
	id: string;
	name: string;
	icon: string;
	status: 'synced' | 'pending' | 'error' | 'unlinked';
	lastSync?: string;
	externalId?: string;
}

interface LinkedProduct {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	stock: number;
	channels: Channel[];
}

interface ChannelStatusProps {
	channel: Channel;
}

const ChannelStatus = ({ channel }: ChannelStatusProps) => {
	const config = {
		synced: {
			icon: CheckCircle2,
			color: 'text-emerald-500',
			bg: 'bg-emerald-500/10',
		},
		pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
		error: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
		unlinked: { icon: Unlink, color: 'text-muted-foreground', bg: 'bg-muted' },
	};

	const { icon: Icon, color, bg } = config[channel.status];

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${bg}`}>
					<div className="flex size-8 items-center justify-center rounded bg-background text-lg">
						{channel.icon}
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium">{channel.name}</p>
						{channel.externalId && (
							<p className="truncate text-xs text-muted-foreground">
								{channel.externalId}
							</p>
						)}
					</div>
					<Icon className={`size-4 shrink-0 ${color}`} />
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<div className="text-xs">
					<p className="font-medium capitalize">{channel.status}</p>
					{channel.lastSync && (
						<p className="text-muted-foreground">
							Last sync: {channel.lastSync}
						</p>
					)}
				</div>
			</TooltipContent>
		</Tooltip>
	);
};

interface ChannelsGridProps {
	channels: Channel[];
}

const ChannelsGrid = ({ channels }: ChannelsGridProps) => (
	<div className="grid gap-2 @sm:grid-cols-2 @lg:grid-cols-4">
		{channels.map((channel) => (
			<ChannelStatus key={channel.id} channel={channel} />
		))}
	</div>
);

interface SyncSummaryProps {
	channels: Channel[];
	labels: { synced: string; pending: string; errors: string };
}

const SyncSummary = ({ channels, labels }: SyncSummaryProps) => {
	const synced = channels.filter((c) => c.status === 'synced').length;
	const pending = channels.filter((c) => c.status === 'pending').length;
	const errors = channels.filter((c) => c.status === 'error').length;

	return (
		<div className="flex items-center gap-3 text-xs">
			{synced > 0 && (
				<span className="flex items-center gap-1 text-emerald-500">
					<CheckCircle2 className="size-3" />
					{synced} {labels.synced}
				</span>
			)}
			{pending > 0 && (
				<span className="flex items-center gap-1 text-amber-500">
					<Clock className="size-3" />
					{pending} {labels.pending}
				</span>
			)}
			{errors > 0 && (
				<span className="flex items-center gap-1 text-red-500">
					<AlertCircle className="size-3" />
					{errors} {labels.errors}
				</span>
			)}
		</div>
	);
};

interface ProductRowProps {
	product: LinkedProduct;
	onSync: (id: string) => void;
	actions: {
		label: string;
		icon: React.ElementType;
		onClick: (id: string) => void;
		variant?: 'destructive';
	}[];
	labels: {
		sync: string;
		syncSummary: { synced: string; pending: string; errors: string };
	};
}

const ProductRow = ({ product, onSync, actions, labels }: ProductRowProps) => (
	<div className="group rounded-lg border bg-card p-4 transition-all hover:shadow-md">
		<div className="mb-4 flex items-start gap-4">
			<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				{product.image ? (
					<img
						src={product.image}
						alt={product.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-8 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="font-semibold">{product.name}</h3>
						<p className="text-sm text-muted-foreground">{product.sku}</p>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="gap-2"
							onClick={() => onSync(product.id)}
						>
							<RefreshCw className="size-4" />
							{labels.sync}
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon-sm">
									<MoreHorizontal className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{actions.map((action) => (
									<React.Fragment key={action.label}>
										{action.variant === 'destructive' && (
											<DropdownMenuSeparator />
										)}
										<DropdownMenuItem
											onClick={() => action.onClick(product.id)}
											className={
												action.variant === 'destructive'
													? 'text-destructive'
													: ''
											}
										>
											<action.icon className="mr-2 size-4" />
											{action.label}
										</DropdownMenuItem>
									</React.Fragment>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="mt-2 flex items-center gap-4 text-sm">
					<span className="font-medium">${product.price.toFixed(2)}</span>
					<span className="text-muted-foreground">
						{product.stock} in stock
					</span>
					<SyncSummary
						channels={product.channels}
						labels={labels.syncSummary}
					/>
				</div>
			</div>
		</div>
		<ChannelsGrid channels={product.channels} />
	</div>
);

export default function Main() {
	const products: LinkedProduct[] = [
		{
			id: '1',
			name: 'Wireless Bluetooth Speaker',
			sku: 'SPK-BT-001',
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
			price: 79.99,
			stock: 145,
			channels: [
				{
					id: 'c1',
					name: 'Amazon',
					icon: '🛒',
					status: 'synced',
					lastSync: '2 min ago',
					externalId: 'B09X7K3M2P',
				},
				{
					id: 'c2',
					name: 'eBay',
					icon: '🏷️',
					status: 'synced',
					lastSync: '5 min ago',
					externalId: '394827561234',
				},
				{
					id: 'c3',
					name: 'Shopify',
					icon: '🛍️',
					status: 'pending',
					externalId: '7823456789',
				},
				{ id: 'c4', name: 'Walmart', icon: '🏪', status: 'unlinked' },
			],
		},
		{
			id: '2',
			name: 'Smart LED Light Bulb Pack',
			sku: 'LED-SMT-002',
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
			price: 34.99,
			stock: 289,
			channels: [
				{
					id: 'c1',
					name: 'Amazon',
					icon: '🛒',
					status: 'synced',
					lastSync: '1 hour ago',
					externalId: 'B08Y6K4N3Q',
				},
				{
					id: 'c2',
					name: 'eBay',
					icon: '🏷️',
					status: 'error',
					lastSync: '1 day ago',
					externalId: '394827561235',
				},
				{
					id: 'c3',
					name: 'Shopify',
					icon: '🛍️',
					status: 'synced',
					lastSync: '30 min ago',
					externalId: '7823456790',
				},
				{
					id: 'c4',
					name: 'Walmart',
					icon: '🏪',
					status: 'synced',
					lastSync: '15 min ago',
					externalId: 'WM-5678901',
				},
			],
		},
		{
			id: '3',
			name: 'Portable USB-C Hub',
			sku: 'HUB-USB-003',
			image:
				'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop',
			price: 49.99,
			stock: 67,
			channels: [
				{
					id: 'c1',
					name: 'Amazon',
					icon: '🛒',
					status: 'error',
					lastSync: '3 hours ago',
					externalId: 'B07Z8L5M4R',
				},
				{
					id: 'c2',
					name: 'eBay',
					icon: '🏷️',
					status: 'pending',
					externalId: '394827561236',
				},
				{
					id: 'c3',
					name: 'Shopify',
					icon: '🛍️',
					status: 'synced',
					lastSync: '10 min ago',
					externalId: '7823456791',
				},
				{ id: 'c4', name: 'Walmart', icon: '🏪', status: 'unlinked' },
			],
		},
	];

	const actions = [
		{
			label: 'View Listings',
			icon: ExternalLink,
			onClick: (id: string) => console.log('View', id),
		},
		{
			label: 'Edit Mappings',
			icon: Link2,
			onClick: (id: string) => console.log('Edit', id),
		},
		{
			label: 'Unlink All',
			icon: Unlink,
			onClick: (id: string) => console.log('Unlink', id),
			variant: 'destructive' as const,
		},
	];

	const labels = {
		sync: 'Sync All',
		syncSummary: { synced: 'synced', pending: 'pending', errors: 'errors' },
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						onSync={(id) => console.log('Sync', id)}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
