'use client';

import * as React from 'react';
import {
	AlertTriangle,
	CheckCircle2,
	XCircle,
	Clock,
	ArrowRight,
	Bell,
	Settings,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type AlertType = 'critical' | 'warning' | 'info' | 'success';

type Alert = {
	id: string;
	type: AlertType;
	title: string;
	message: string;
	timestamp: string;
	actionLabel?: string;
	count?: number;
};

type AlertItemProps = {
	alert: Alert;
};

const AlertItem = ({ alert }: AlertItemProps) => {
	const config: Record<AlertType, { icon: React.ElementType; color: string; bgColor: string }> = {
		critical: { icon: XCircle, color: 'text-destructive', bgColor: 'bg-destructive/10' },
		warning: { icon: AlertTriangle, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
		info: { icon: Clock, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
		success: { icon: CheckCircle2, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
	};

	const { icon: Icon, color, bgColor } = config[alert.type];

	return (
		<div className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
			<div className={`rounded-lg p-2 ${bgColor}`}>
				<Icon className={`size-5 ${color}`} />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<span className="font-medium">{alert.title}</span>
					{alert.count && alert.count > 1 && (
						<Badge variant="secondary" className="text-xs">
							{alert.count}
						</Badge>
					)}
				</div>
				<p className="mt-0.5 text-sm text-muted-foreground">{alert.message}</p>
				<p className="mt-1 text-xs text-muted-foreground">
					{new Date(alert.timestamp).toLocaleString()}
				</p>
			</div>
			{alert.actionLabel && (
				<Button variant="ghost" size="sm" className="shrink-0">
					{alert.actionLabel}
					<ArrowRight className="ml-1 size-4" />
				</Button>
			)}
		</div>
	);
};

type AlertSummaryProps = {
	counts: Record<AlertType, number>;
	labels: Record<AlertType, string>;
};

const AlertSummary = ({ counts, labels }: AlertSummaryProps) => (
	<div className="grid gap-3 @sm:grid-cols-4">
		{(['critical', 'warning', 'info', 'success'] as AlertType[]).map((type) => {
			const colors: Record<AlertType, string> = {
				critical: 'border-destructive/50 bg-destructive/5',
				warning: 'border-amber-500/50 bg-amber-500/5',
				info: 'border-blue-500/50 bg-blue-500/5',
				success: 'border-emerald-500/50 bg-emerald-500/5',
			};

			const textColors: Record<AlertType, string> = {
				critical: 'text-destructive',
				warning: 'text-amber-500',
				info: 'text-blue-500',
				success: 'text-emerald-500',
			};

			return (
				<div key={type} className={`rounded-lg border p-3 ${colors[type]}`}>
					<p className={`text-2xl font-bold ${textColors[type]}`}>{counts[type]}</p>
					<p className="text-sm text-muted-foreground">{labels[type]}</p>
				</div>
			);
		})}
	</div>
);

export default function Main() {
	const alerts: Alert[] = [
		{
			id: '1',
			type: 'critical',
			title: 'Out of Stock',
			message: 'Wireless Earbuds Pro (WEP-001) is now out of stock',
			timestamp: '2024-01-18T14:30:00',
			actionLabel: 'Reorder',
			count: 3,
		},
		{
			id: '2',
			type: 'warning',
			title: 'Low Stock Alert',
			message: 'USB-C Fast Charger (UFC-003) has 15 units remaining',
			timestamp: '2024-01-18T12:15:00',
			actionLabel: 'View',
		},
		{
			id: '3',
			type: 'warning',
			title: 'Expiring Soon',
			message: 'Batch #B2024-089 expires in 30 days',
			timestamp: '2024-01-18T10:00:00',
			actionLabel: 'Details',
			count: 5,
		},
		{
			id: '4',
			type: 'info',
			title: 'Incoming Shipment',
			message: 'PO #12345 expected to arrive tomorrow',
			timestamp: '2024-01-17T16:45:00',
		},
		{
			id: '5',
			type: 'success',
			title: 'Stock Replenished',
			message: 'Smart Watch Ultra (SWU-002) restocked with 500 units',
			timestamp: '2024-01-17T09:30:00',
		},
	];

	const counts: Record<AlertType, number> = {
		critical: alerts.filter((a) => a.type === 'critical').length,
		warning: alerts.filter((a) => a.type === 'warning').length,
		info: alerts.filter((a) => a.type === 'info').length,
		success: alerts.filter((a) => a.type === 'success').length,
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Inventory Alerts</CardTitle>
								<CardDescription>Real-time notifications for stock issues</CardDescription>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm">
									<Bell className="mr-2 size-4" />
									Notification Settings
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<AlertSummary
							counts={counts}
							labels={{
								critical: 'Critical',
								warning: 'Warnings',
								info: 'Info',
								success: 'Resolved',
							}}
						/>
						<div className="space-y-3">
							{alerts.map((alert) => (
								<AlertItem key={alert.id} alert={alert} />
							))}
						</div>
						<div className="flex justify-center">
							<Button variant="outline">View All Alerts</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
