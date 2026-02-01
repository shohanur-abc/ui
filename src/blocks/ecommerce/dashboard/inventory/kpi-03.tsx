'use client';

import {
	Package,
	AlertTriangle,
	Clock,
	CheckCircle2,
	XCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatusItem = {
	label: string;
	count: number;
	icon: React.ElementType;
	color: string;
	bgColor: string;
};

type StatusCardProps = {
	title: string;
	total: number;
	items: StatusItem[];
};

const StatusCard = ({ title, total, items }: StatusCardProps) => (
	<Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<CardTitle className="text-base font-medium">{title}</CardTitle>
				<span className="text-2xl font-bold">{total.toLocaleString()}</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item) => {
				const percentage = ((item.count / total) * 100).toFixed(1);
				return (
					<div key={item.label} className="flex items-center gap-3">
						<div className={`rounded-lg p-2 ${item.bgColor}`}>
							<item.icon className={`size-4 ${item.color}`} />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">{item.label}</span>
								<span className="text-sm font-semibold tabular-nums">
									{item.count.toLocaleString()}
								</span>
							</div>
							<div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
								<div
									className={`h-full rounded-full ${item.bgColor.replace('/10', '')}`}
									style={{ width: `${percentage}%` }}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</CardContent>
	</Card>
);

type SummaryCardProps = {
	icon: React.ElementType;
	title: string;
	value: string;
	subtitle: string;
	color: string;
	bgColor: string;
};

const SummaryCard = ({
	icon: Icon,
	title,
	value,
	subtitle,
	color,
	bgColor,
}: SummaryCardProps) => (
	<Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
		<CardContent className="flex items-center gap-4 p-6">
			<div className={`rounded-xl p-4 ${bgColor}`}>
				<Icon className={`size-8 ${color}`} />
			</div>
			<div>
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-3xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">{subtitle}</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const stockStatus: StatusItem[] = [
		{
			label: 'In Stock',
			count: 1245,
			icon: CheckCircle2,
			color: 'text-emerald-500',
			bgColor: 'bg-emerald-500/10',
		},
		{
			label: 'Low Stock',
			count: 89,
			icon: AlertTriangle,
			color: 'text-yellow-500',
			bgColor: 'bg-yellow-500/10',
		},
		{
			label: 'Out of Stock',
			count: 23,
			icon: XCircle,
			color: 'text-red-500',
			bgColor: 'bg-red-500/10',
		},
		{
			label: 'Incoming',
			count: 156,
			icon: Clock,
			color: 'text-blue-500',
			bgColor: 'bg-blue-500/10',
		},
	];

	const orderStatus: StatusItem[] = [
		{
			label: 'Pending',
			count: 45,
			icon: Clock,
			color: 'text-yellow-500',
			bgColor: 'bg-yellow-500/10',
		},
		{
			label: 'Processing',
			count: 128,
			icon: Package,
			color: 'text-blue-500',
			bgColor: 'bg-blue-500/10',
		},
		{
			label: 'Completed',
			count: 892,
			icon: CheckCircle2,
			color: 'text-emerald-500',
			bgColor: 'bg-emerald-500/10',
		},
		{
			label: 'Cancelled',
			count: 12,
			icon: XCircle,
			color: 'text-red-500',
			bgColor: 'bg-red-500/10',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
						<SummaryCard
							icon={Package}
							title="Total SKUs"
							value="1,513"
							subtitle="Active products"
							color="text-primary"
							bgColor="bg-primary/10"
						/>
						<SummaryCard
							icon={AlertTriangle}
							title="Alerts"
							value="112"
							subtitle="Require attention"
							color="text-yellow-500"
							bgColor="bg-yellow-500/10"
						/>
						<SummaryCard
							icon={Clock}
							title="Pending Orders"
							value="45"
							subtitle="Awaiting fulfillment"
							color="text-blue-500"
							bgColor="bg-blue-500/10"
						/>
						<SummaryCard
							icon={CheckCircle2}
							title="Fulfilled Today"
							value="234"
							subtitle="Orders shipped"
							color="text-emerald-500"
							bgColor="bg-emerald-500/10"
						/>
					</div>
					<div className="grid gap-4 @lg:grid-cols-2">
						<StatusCard
							title="Stock Status"
							total={stockStatus.reduce((sum, item) => sum + item.count, 0)}
							items={stockStatus}
						/>
						<StatusCard
							title="Order Status"
							total={orderStatus.reduce((sum, item) => sum + item.count, 0)}
							items={orderStatus}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
