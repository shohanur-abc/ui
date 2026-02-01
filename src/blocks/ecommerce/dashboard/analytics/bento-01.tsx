'use client';

import {
	ArrowUpRight,
	DollarSign,
	type LucideIcon,
	ShoppingCart,
	TrendingUp,
	Users,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type MetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
};

const MetricSmall = ({ icon: Icon, label, value, change }: MetricProps) => (
	<Card className="border-border/50 bg-card/80">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
					<Icon className="size-4 text-primary" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-xs text-muted-foreground truncate">{label}</p>
					<p className="text-lg font-bold">{value}</p>
				</div>
				<span className="text-xs font-medium text-emerald-500">{change}</span>
			</div>
		</CardContent>
	</Card>
);

type ChartPlaceholderProps = {
	title: string;
	value: string;
	subtitle: string;
};

const AreaChartPlaceholder = ({
	title,
	value,
	subtitle,
}: ChartPlaceholderProps) => (
	<Card className="border-border/50 bg-card/80 row-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<p className="text-3xl font-bold">{value}</p>
				<p className="text-sm text-muted-foreground">{subtitle}</p>
			</div>
			<div className="h-32 flex items-end gap-1">
				{[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
					<div
						key={i}
						className="flex-1 bg-gradient-to-t from-primary/20 to-primary/60 rounded-t"
						style={{ height: `${h}%` }}
					/>
				))}
			</div>
		</CardContent>
	</Card>
);

type ProgressItemProps = {
	label: string;
	value: number;
	target: string;
};

const ProgressCard = ({ items }: { items: ProgressItemProps[] }) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{items.map((item, i) => (
				<div key={i} className="space-y-1.5">
					<div className="flex items-center justify-between text-sm">
						<span>{item.label}</span>
						<span className="text-muted-foreground">{item.target}</span>
					</div>
					<Progress value={item.value} className="h-1.5" />
				</div>
			))}
		</CardContent>
	</Card>
);

const metrics: MetricProps[] = [
	{ icon: DollarSign, label: 'Revenue', value: '$45.2K', change: '+12%' },
	{ icon: ShoppingCart, label: 'Orders', value: '2,345', change: '+8%' },
	{ icon: Users, label: 'Customers', value: '1,234', change: '+5%' },
	{ icon: TrendingUp, label: 'Growth', value: '23.5%', change: '+2%' },
];

const progressItems: ProgressItemProps[] = [
	{ label: 'Sales Target', value: 78, target: '$100K' },
	{ label: 'New Users', value: 65, target: '2,000' },
	{ label: 'Conversion', value: 45, target: '5%' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{metrics.map((metric, i) => (
						<MetricSmall key={i} {...metric} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-3 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<AreaChartPlaceholder
						title="Revenue Overview"
						value="$284,532"
						subtitle="Total revenue this year"
					/>
					<div className="@lg:col-span-2 grid grid-cols-1 @md:grid-cols-2 gap-4 @lg:gap-6">
						<ProgressCard items={progressItems} />
						<ProgressCard
							items={[
								{ label: 'Customer Retention', value: 92, target: '95%' },
								{ label: 'Response Time', value: 88, target: '<1hr' },
								{ label: 'NPS Score', value: 72, target: '80+' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
