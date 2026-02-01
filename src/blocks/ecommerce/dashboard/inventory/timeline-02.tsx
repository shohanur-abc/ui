'use client';

import * as React from 'react';
import {
	Package,
	Clock,
	User,
	ArrowRight,
	ArrowLeft,
	AlertTriangle,
	CheckCircle,
	Edit,
	Trash2,
	ShoppingCart,
	Truck,
	RotateCcw,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ActivityType =
	| 'stock-in'
	| 'stock-out'
	| 'adjustment'
	| 'transfer'
	| 'alert'
	| 'return';

type Activity = {
	id: string;
	type: ActivityType;
	title: string;
	description: string;
	timestamp: string;
	user: { name: string; avatar?: string };
	product?: { name: string; sku: string };
	quantity?: number;
	location?: string;
};

type ActivityItemProps = {
	activity: Activity;
};

const ActivityItem = ({ activity }: ActivityItemProps) => {
	const typeConfig = {
		'stock-in': {
			icon: ArrowRight,
			color: 'text-emerald-500',
			bg: 'bg-emerald-500/10',
		},
		'stock-out': {
			icon: ArrowLeft,
			color: 'text-blue-500',
			bg: 'bg-blue-500/10',
		},
		adjustment: { icon: Edit, color: 'text-amber-500', bg: 'bg-amber-500/10' },
		transfer: { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
		alert: {
			icon: AlertTriangle,
			color: 'text-destructive',
			bg: 'bg-destructive/10',
		},
		return: { icon: RotateCcw, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
	};

	const config = typeConfig[activity.type];
	const Icon = config.icon;

	return (
		<div className="relative flex gap-4 pb-8 last:pb-0">
			<div className="absolute left-5 top-12 bottom-0 w-px bg-border last:hidden" />
			<div
				className={`relative flex size-10 shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div>
						<p className="font-medium">{activity.title}</p>
						<p className="text-sm text-muted-foreground">
							{activity.description}
						</p>
					</div>
					<span className="text-xs text-muted-foreground whitespace-nowrap">
						{activity.timestamp}
					</span>
				</div>
				{activity.product && (
					<div className="mt-2 flex items-center gap-2 rounded-lg border bg-muted/30 p-2">
						<Package className="size-4 text-muted-foreground" />
						<span className="text-sm font-medium">{activity.product.name}</span>
						<span className="text-xs text-muted-foreground">
							({activity.product.sku})
						</span>
						{activity.quantity !== undefined && (
							<Badge variant="outline" className="ml-auto">
								{activity.quantity > 0 ? '+' : ''}
								{activity.quantity}
							</Badge>
						)}
					</div>
				)}
				<div className="mt-2 flex items-center gap-2">
					<Avatar className="size-5">
						<AvatarImage src={activity.user.avatar} />
						<AvatarFallback className="text-xs">
							{activity.user.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<span className="text-xs text-muted-foreground">
						{activity.user.name}
					</span>
					{activity.location && (
						<>
							<span className="text-xs text-muted-foreground">•</span>
							<span className="text-xs text-muted-foreground">
								{activity.location}
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const activities: Activity[] = [
		{
			id: '1',
			type: 'stock-in',
			title: 'Stock Received',
			description: 'Shipment from TechPro Electronics arrived',
			timestamp: '10 min ago',
			user: { name: 'John Smith' },
			product: { name: 'Wireless Earbuds Pro', sku: 'WEP-001' },
			quantity: 500,
			location: 'Main Warehouse',
		},
		{
			id: '2',
			type: 'alert',
			title: 'Low Stock Alert',
			description: 'Product reached reorder point',
			timestamp: '1 hour ago',
			user: { name: 'System' },
			product: { name: 'USB-C Fast Charger', sku: 'UFC-001' },
		},
		{
			id: '3',
			type: 'transfer',
			title: 'Stock Transfer Initiated',
			description: 'Transfer from Main Warehouse to East Distribution',
			timestamp: '2 hours ago',
			user: { name: 'Sarah Johnson' },
			product: { name: 'Phone Case Premium', sku: 'PCP-001' },
			quantity: -200,
		},
		{
			id: '4',
			type: 'stock-out',
			title: 'Order Fulfilled',
			description: 'Order #ORD-12345 shipped',
			timestamp: '3 hours ago',
			user: { name: 'Mike Wilson' },
			product: { name: 'Laptop Stand', sku: 'LS-001' },
			quantity: -5,
			location: 'Fulfillment Center',
		},
		{
			id: '5',
			type: 'adjustment',
			title: 'Cycle Count Adjustment',
			description: 'Physical count variance corrected',
			timestamp: '5 hours ago',
			user: { name: 'Emily Chen' },
			product: { name: 'Wireless Mouse', sku: 'WM-001' },
			quantity: -3,
		},
		{
			id: '6',
			type: 'return',
			title: 'Customer Return Processed',
			description: 'Return #RET-789 added back to inventory',
			timestamp: 'Yesterday',
			user: { name: 'Alex Brown' },
			product: { name: 'Keyboard Mechanical', sku: 'KM-001' },
			quantity: 2,
			location: 'Returns Processing',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Activity Timeline
								</CardTitle>
								<CardDescription>
									Recent inventory movements and events
								</CardDescription>
							</div>
							<Button variant="outline" size="sm">
								View All Activity
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[500px] pr-4">
							<div className="space-y-2">
								{activities.map((activity) => (
									<ActivityItem key={activity.id} activity={activity} />
								))}
							</div>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
