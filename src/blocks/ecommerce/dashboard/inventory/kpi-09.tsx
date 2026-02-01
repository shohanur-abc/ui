'use client';

import * as React from 'react';
import {
	Package,
	Warehouse,
	Truck,
	AlertCircle,
	CheckCircle2,
	Clock,
	DollarSign,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type StatusKPIProps = {
	title: string;
	value: string;
	subtitle: string;
	icon: React.ReactNode;
	status: 'healthy' | 'warning' | 'critical' | 'info';
	statusText: string;
};

const StatusKPI = ({
	title,
	value,
	subtitle,
	icon,
	status,
	statusText,
}: StatusKPIProps) => {
	const statusConfig = {
		healthy: {
			bg: 'bg-emerald-500/10',
			border: 'border-emerald-500/30',
			text: 'text-emerald-500',
			icon: CheckCircle2,
		},
		warning: {
			bg: 'bg-amber-500/10',
			border: 'border-amber-500/30',
			text: 'text-amber-500',
			icon: Clock,
		},
		critical: {
			bg: 'bg-destructive/10',
			border: 'border-destructive/30',
			text: 'text-destructive',
			icon: AlertCircle,
		},
		info: {
			bg: 'bg-primary/10',
			border: 'border-primary/30',
			text: 'text-primary',
			icon: CheckCircle2,
		},
	};

	const config = statusConfig[status];
	const StatusIcon = config.icon;

	return (
		<Card className={`${config.bg} ${config.border}`}>
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div
						className={`flex size-10 items-center justify-center rounded-lg bg-background ${config.text}`}
					>
						{icon}
					</div>
					<Badge
						variant="outline"
						className={`gap-1 ${config.text} border-current`}
					>
						<StatusIcon className="size-3" />
						{statusText}
					</Badge>
				</div>
				<div className="mt-4">
					<p className="text-3xl font-bold">{value}</p>
					<p className="mt-1 font-medium">{title}</p>
					<p className="text-sm text-muted-foreground">{subtitle}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const kpis: StatusKPIProps[] = [
		{
			title: 'Total SKUs',
			value: '8,456',
			subtitle: '234 added this month',
			icon: <Package className="size-5" />,
			status: 'healthy',
			statusText: 'Healthy',
		},
		{
			title: 'Warehouse Capacity',
			value: '78%',
			subtitle: '22% available space',
			icon: <Warehouse className="size-5" />,
			status: 'warning',
			statusText: 'Near Limit',
		},
		{
			title: 'Pending Orders',
			value: '156',
			subtitle: 'Awaiting fulfillment',
			icon: <Truck className="size-5" />,
			status: 'critical',
			statusText: 'Backlog',
		},
		{
			title: 'Inventory Value',
			value: '$4.2M',
			subtitle: 'Total valuation',
			icon: <DollarSign className="size-5" />,
			status: 'info',
			statusText: 'Updated',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="mb-6">
					<h2 className="text-xl font-semibold @lg:text-2xl">
						Status Overview
					</h2>
					<p className="text-sm text-muted-foreground">
						Real-time inventory status indicators
					</p>
				</div>
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
					{kpis.map((kpi) => (
						<StatusKPI key={kpi.title} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
