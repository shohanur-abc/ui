'use client';

import { Cell, Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

type MetricItem = {
	title: string;
	value: string;
	progress: number;
	change: string;
	icon: LucideIcon;
	color: string;
};

type RadialItem = {
	name: string;
	value: number;
	fill: string;
};

const MetricCard = ({
	title,
	value,
	progress,
	change,
	icon: Icon,
	color,
}: MetricItem) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex items-center justify-between">
				<div className={`rounded-lg p-2 ${color}`}>
					<Icon className="size-4" />
				</div>
				<Badge
					variant="secondary"
					className="bg-emerald-500/10 text-emerald-500 text-xs"
				>
					<ArrowUpRight className="mr-0.5 size-3" />
					{change}
				</Badge>
			</div>
			<div className="mt-3">
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">{title}</p>
			</div>
			<div className="mt-3">
				<Progress value={progress} className="h-1.5" />
				<p className="mt-1 text-xs text-muted-foreground">
					{progress}% of target
				</p>
			</div>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	value: { label: 'Progress' },
};

export default function Main() {
	const metrics: MetricItem[] = [
		{
			title: 'Revenue',
			value: '$248K',
			progress: 83,
			change: '+28%',
			icon: DollarSign,
			color: 'bg-primary/10 text-primary',
		},
		{
			title: 'Orders',
			value: '6,842',
			progress: 85,
			change: '+22%',
			icon: ShoppingCart,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			title: 'Customers',
			value: '3,847',
			progress: 96,
			change: '+18%',
			icon: Users,
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			title: 'Products',
			value: '1,247',
			progress: 78,
			change: '+12%',
			icon: Package,
			color: 'bg-amber-500/10 text-amber-500',
		},
	];

	const radialData: RadialItem[] = [
		{ name: 'Revenue', value: 83, fill: 'var(--chart-1)' },
		{ name: 'Orders', value: 85, fill: 'var(--chart-2)' },
		{ name: 'Customers', value: 96, fill: 'var(--chart-3)' },
		{ name: 'Products', value: 78, fill: 'var(--chart-4)' },
	];

	const overallProgress = Math.round(
		radialData.reduce((acc, item) => acc + item.value, 0) / radialData.length,
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @sm:grid-cols-2 @xl:grid-cols-4">
					{metrics.map((metric, i) => (
						<MetricCard key={i} {...metric} />
					))}
				</div>
				<div className="mt-6 grid gap-6 @xl:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Overall Progress</CardTitle>
							<CardDescription>Combined target achievement</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center pb-8">
							<ChartContainer
								config={chartConfig}
								className="h-[220px] w-[220px]"
							>
								<RadialBarChart
									innerRadius="30%"
									outerRadius="100%"
									data={radialData}
									startAngle={180}
									endAngle={0}
								>
									<RadialBar dataKey="value" background cornerRadius={4} />
								</RadialBarChart>
							</ChartContainer>
							<div className="mt-4 text-center">
								<p className="text-4xl font-bold">{overallProgress}%</p>
								<p className="text-sm text-muted-foreground">
									Average completion
								</p>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Category Breakdown</CardTitle>
							<CardDescription>Progress by category</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{radialData.map((item, i) => (
								<div key={i} className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center gap-2">
											<div
												className="size-3 rounded-full"
												style={{ backgroundColor: item.fill }}
											/>
											<span>{item.name}</span>
										</div>
										<span className="font-medium">{item.value}%</span>
									</div>
									<Progress value={item.value} className="h-2" />
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
