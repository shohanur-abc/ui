'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { RotateCcw, AlertTriangle } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type ReasonProps = {
	reason: string;
	count: string;
	percentage: number;
	value: string;
	color: string;
};

const ReasonRow = ({
	reason,
	count,
	percentage,
	value,
	color,
}: ReasonProps) => (
	<div className="flex items-center gap-4 border-b border-border/30 py-3 last:border-0">
		<div
			className="size-3 shrink-0 rounded-full"
			style={{ backgroundColor: color }}
		/>
		<div className="flex-1">
			<p className="font-medium">{reason}</p>
			<p className="text-xs text-muted-foreground">{count} returns</p>
		</div>
		<div className="w-24">
			<Progress value={percentage} className="h-1.5" />
		</div>
		<div className="w-20 text-right">
			<p className="font-medium">{value}</p>
			<p className="text-xs text-muted-foreground">{percentage}%</p>
		</div>
	</div>
);

type CategoryReturnProps = {
	category: string;
	returns: string;
	rate: string;
	status: 'high' | 'medium' | 'low';
};

const CategoryReturn = ({
	category,
	returns,
	rate,
	status,
}: CategoryReturnProps) => (
	<div className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/20 p-3">
		<div>
			<p className="font-medium">{category}</p>
			<p className="text-xs text-muted-foreground">{returns} returns</p>
		</div>
		<Badge
			variant="outline"
			className={
				status === 'high'
					? 'border-rose-500/20 bg-rose-500/10 text-rose-500'
					: status === 'medium'
						? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
						: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
			}
		>
			{rate}
		</Badge>
	</div>
);

const chartConfig: ChartConfig = {
	returns: {
		label: 'Returns',
	},
};

export default function Main() {
	const reasons: ReasonProps[] = [
		{
			reason: 'Wrong Size/Fit',
			count: '1,245',
			percentage: 32,
			value: '$89,400',
			color: 'var(--chart-1)',
		},
		{
			reason: 'Product Defect',
			count: '856',
			percentage: 22,
			value: '$65,200',
			color: 'var(--chart-2)',
		},
		{
			reason: 'Not as Described',
			count: '624',
			percentage: 16,
			value: '$48,500',
			color: 'var(--chart-3)',
		},
		{
			reason: 'Changed Mind',
			count: '545',
			percentage: 14,
			value: '$38,200',
			color: 'var(--chart-4)',
		},
		{
			reason: 'Better Price Found',
			count: '312',
			percentage: 8,
			value: '$24,800',
			color: 'var(--chart-5)',
		},
		{
			reason: 'Other',
			count: '298',
			percentage: 8,
			value: '$18,500',
			color: 'var(--muted-foreground)',
		},
	];

	const categories: CategoryReturnProps[] = [
		{ category: 'Clothing', returns: '1,820', rate: '12.5%', status: 'high' },
		{ category: 'Shoes', returns: '1,245', rate: '10.2%', status: 'high' },
		{ category: 'Electronics', returns: '420', rate: '3.8%', status: 'low' },
		{ category: 'Home & Garden', returns: '285', rate: '4.2%', status: 'low' },
		{ category: 'Beauty', returns: '110', rate: '2.1%', status: 'low' },
	];

	const chartData = reasons.map((r) => ({
		name: r.reason,
		value: r.percentage,
		fill: r.color,
	}));

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<RotateCcw className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Return Reason Breakdown
								</CardTitle>
								<CardDescription>
									Analysis of product returns by reason
								</CardDescription>
							</div>
						</div>
						<Badge
							variant="outline"
							className="border-amber-500/20 bg-amber-500/10 text-amber-500"
						>
							<AlertTriangle className="mr-1 size-3" />
							3,880 Total Returns
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-6 @lg:grid-cols-2">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[280px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Pie
										data={chartData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={100}
										paddingAngle={2}
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div>
								{reasons.map((r, i) => (
									<ReasonRow key={i} {...r} />
								))}
							</div>
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">
									Return Rate by Category
								</p>
								<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-5">
									{categories.map((c, i) => (
										<CategoryReturn key={i} {...c} />
									))}
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
