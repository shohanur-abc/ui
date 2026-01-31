import {
	ArrowDownRight,
	ArrowUpRight,
	BarChart3,
	CircleDollarSign,
	ShoppingBag,
	Wallet,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	badge: string;
	icon: LucideIcon;
	chartData: number[];
};

const MiniSparkline = ({ data }: { data: number[] }) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	return (
		<div className="flex h-10 items-end gap-0.5">
			{data.map((val, i) => (
				<div
					key={i}
					className="w-1.5 rounded-t bg-primary/60 transition-all hover:bg-primary"
					style={{ height: `${((val - min) / range) * 100}%`, minHeight: '4px' }}
				/>
			))}
		</div>
	);
};

const KpiCardWithSparkline = ({
	title,
	value,
	change,
	trend,
	badge,
	icon: Icon,
	chartData,
}: KpiItem) => (
	<Card className="group transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<Badge variant="secondary" className="text-xs">
					{badge}
				</Badge>
				<Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
			</div>
		</CardHeader>
		<CardContent className="space-y-3 pt-0">
			<div>
				<CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
				<div className="mt-1 flex items-baseline gap-2">
					<span className="text-2xl font-bold @sm:text-3xl">{value}</span>
					<span
						className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
					>
						{trend === 'up' ? (
							<ArrowUpRight className="size-3" />
						) : (
							<ArrowDownRight className="size-3" />
						)}
						{change}
					</span>
				</div>
			</div>
			<MiniSparkline data={chartData} />
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Total Sales',
			value: '$89,432',
			change: '+18.2%',
			trend: 'up',
			badge: 'This Month',
			icon: CircleDollarSign,
			chartData: [45, 52, 48, 61, 55, 67, 72, 78, 85, 89],
		},
		{
			title: 'Net Profit',
			value: '$23,156',
			change: '+12.5%',
			trend: 'up',
			badge: 'This Month',
			icon: Wallet,
			chartData: [20, 25, 22, 28, 30, 27, 32, 35, 38, 41],
		},
		{
			title: 'Orders Completed',
			value: '1,842',
			change: '-3.2%',
			trend: 'down',
			badge: 'This Week',
			icon: ShoppingBag,
			chartData: [180, 195, 188, 172, 168, 175, 165, 158, 162, 155],
		},
		{
			title: 'Avg Basket Size',
			value: '$48.52',
			change: '+7.8%',
			trend: 'up',
			badge: 'This Week',
			icon: BarChart3,
			chartData: [42, 44, 43, 45, 46, 47, 48, 47, 49, 52],
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCardWithSparkline key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
