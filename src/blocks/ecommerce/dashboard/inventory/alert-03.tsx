'use client';

import * as React from 'react';
import {
	AlertTriangle,
	AlertCircle,
	CheckCircle,
	Info,
	X,
	Bell,
	ExternalLink,
	Clock,
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

type AlertItem = {
	id: string;
	type: 'critical' | 'warning' | 'success' | 'info';
	title: string;
	message: string;
	time: string;
	actionLabel?: string;
	actionUrl?: string;
	isRead?: boolean;
};

type AlertRowProps = {
	alert: AlertItem;
	onDismiss: (id: string) => void;
	onAction?: (id: string) => void;
};

const AlertRow = ({ alert, onDismiss, onAction }: AlertRowProps) => {
	const typeConfig = {
		critical: {
			icon: AlertCircle,
			bg: 'bg-destructive/10',
			border: 'border-destructive/30',
			text: 'text-destructive',
		},
		warning: {
			icon: AlertTriangle,
			bg: 'bg-amber-500/10',
			border: 'border-amber-500/30',
			text: 'text-amber-500',
		},
		success: {
			icon: CheckCircle,
			bg: 'bg-emerald-500/10',
			border: 'border-emerald-500/30',
			text: 'text-emerald-500',
		},
		info: {
			icon: Info,
			bg: 'bg-primary/10',
			border: 'border-primary/30',
			text: 'text-primary',
		},
	};

	const config = typeConfig[alert.type];
	const Icon = config.icon;

	return (
		<div
			className={`relative rounded-lg border p-4 ${config.bg} ${config.border} ${!alert.isRead ? 'ring-1 ring-primary/20' : ''}`}
		>
			<div className="flex gap-4">
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-full ${config.text} bg-background`}
				>
					<Icon className="size-5" />
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<p className="font-medium">{alert.title}</p>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<Clock className="size-3" />
							{alert.time}
						</div>
					</div>
					<p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
					{alert.actionLabel && (
						<Button
							variant="link"
							size="sm"
							className="mt-2 h-auto p-0 text-sm"
							onClick={() => onAction?.(alert.id)}
						>
							{alert.actionLabel}
							<ExternalLink className="ml-1 size-3" />
						</Button>
					)}
				</div>
				<Button
					variant="ghost"
					size="icon-sm"
					className="shrink-0"
					onClick={() => onDismiss(alert.id)}
				>
					<X className="size-4" />
				</Button>
			</div>
			{!alert.isRead && (
				<div className="absolute left-2 top-2 size-2 rounded-full bg-primary" />
			)}
		</div>
	);
};

export default function Main() {
	const [alerts, setAlerts] = React.useState<AlertItem[]>([
		{
			id: '1',
			type: 'critical',
			title: 'Stock Critically Low',
			message:
				'5 products have reached critical stock levels and need immediate attention.',
			time: '5 min ago',
			actionLabel: 'View Products',
			isRead: false,
		},
		{
			id: '2',
			type: 'warning',
			title: 'Reorder Point Reached',
			message:
				'12 products have reached their reorder point. Consider placing purchase orders.',
			time: '1 hour ago',
			actionLabel: 'Create PO',
			isRead: false,
		},
		{
			id: '3',
			type: 'success',
			title: 'Shipment Received',
			message:
				'PO-2024-001 has been received and 156 items added to inventory.',
			time: '2 hours ago',
			isRead: true,
		},
		{
			id: '4',
			type: 'info',
			title: 'Sync Complete',
			message: 'Inventory sync with external systems completed successfully.',
			time: '3 hours ago',
			isRead: true,
		},
		{
			id: '5',
			type: 'warning',
			title: 'Expiring Items',
			message: '8 batches will expire within the next 30 days.',
			time: '5 hours ago',
			actionLabel: 'View Batches',
			isRead: true,
		},
	]);

	const handleDismiss = (id: string) => {
		setAlerts((prev) => prev.filter((a) => a.id !== id));
	};

	const unreadCount = alerts.filter((a) => !a.isRead).length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<CardTitle className="text-xl @lg:text-2xl">
									Notifications
								</CardTitle>
								{unreadCount > 0 && (
									<Badge variant="destructive">{unreadCount} new</Badge>
								)}
							</div>
							<Button variant="ghost" size="sm">
								Mark all as read
							</Button>
						</div>
						<CardDescription>
							Recent inventory alerts and notifications
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-96">
							<div className="space-y-3 pr-4">
								{alerts.map((alert) => (
									<AlertRow
										key={alert.id}
										alert={alert}
										onDismiss={handleDismiss}
										onAction={(id) => console.log('Action', id)}
									/>
								))}
							</div>
						</ScrollArea>
					</CardContent>
					<CardFooter className="border-t pt-4">
						<Button variant="outline" className="w-full">
							<Bell className="mr-2 size-4" />
							View All Notifications
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
