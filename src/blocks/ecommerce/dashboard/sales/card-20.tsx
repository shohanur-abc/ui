'use client';

import { AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type AlertData = {
	title: string;
	description: string;
	severity: 'high' | 'medium' | 'low';
	metric: string;
	action: string;
	href: string;
};

const severityConfig = {
	high: { color: 'destructive' as const, label: 'High' },
	medium: { color: 'secondary' as const, label: 'Medium' },
	low: { color: 'outline' as const, label: 'Low' },
};

type SalesAlertCardProps = {
	title: string;
	alerts: AlertData[];
};

const SalesAlertCard = ({ title, alerts }: SalesAlertCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-4">
			<div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
				<AlertTriangle className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
			<Badge variant="secondary" className="ml-auto">
				{alerts.length} alerts
			</Badge>
		</CardHeader>
		<CardContent className="space-y-4">
			{alerts.map((alert, idx) => (
				<div
					key={idx}
					className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
				>
					<div className="flex items-start justify-between gap-4 mb-3">
						<div>
							<div className="flex items-center gap-2 mb-1">
								<span className="font-semibold">{alert.title}</span>
								<Badge variant={severityConfig[alert.severity].color}>
									{severityConfig[alert.severity].label}
								</Badge>
							</div>
							<p className="text-sm text-muted-foreground">
								{alert.description}
							</p>
						</div>
						<div className="text-right">
							<div className="flex items-center gap-1 text-destructive">
								<TrendingDown className="size-4" />
								<span className="font-semibold">{alert.metric}</span>
							</div>
						</div>
					</div>
					<Button variant="outline" size="sm" className="gap-1" asChild>
						<a href={alert.href}>
							{alert.action}
							<ArrowRight className="size-3" />
						</a>
					</Button>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const alerts: AlertData[] = [
		{
			title: 'Cart Abandonment Spike',
			description: 'Cart abandonment rate increased significantly in the last 24 hours',
			severity: 'high',
			metric: '+15.2%',
			action: 'View Analytics',
			href: '#cart-analytics',
		},
		{
			title: 'Low Stock Alert',
			description: '12 products are running low on inventory',
			severity: 'medium',
			metric: '12 items',
			action: 'Manage Inventory',
			href: '#inventory',
		},
		{
			title: 'Revenue Below Target',
			description: 'Weekly revenue is 8% below the projected target',
			severity: 'medium',
			metric: '-8%',
			action: 'View Report',
			href: '#revenue-report',
		},
		{
			title: 'Slow Shipping Times',
			description: 'Average delivery time increased by 0.5 days',
			severity: 'low',
			metric: '+0.5 days',
			action: 'Check Logistics',
			href: '#logistics',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<SalesAlertCard title="Sales Alerts" alerts={alerts} />
				</div>
			</div>
		</section>
	);
}
