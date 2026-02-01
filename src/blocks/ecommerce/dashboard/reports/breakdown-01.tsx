'use client';

import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import { Package } from 'lucide-react';

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

type CategoryProps = {
	category: string;
	revenue: string;
	percentage: number;
	products: number;
	color: string;
};

const CategoryBreakdown = ({
	category,
	revenue,
	percentage,
	products,
	color,
}: CategoryProps) => (
	<div className="flex items-center gap-4 border-b border-border/30 py-3 last:border-0">
		<div
			className="size-3 shrink-0 rounded-full"
			style={{ backgroundColor: color }}
		/>
		<div className="flex-1">
			<p className="font-medium">{category}</p>
			<p className="text-xs text-muted-foreground">{products} products</p>
		</div>
		<div className="text-right">
			<p className="font-bold">{revenue}</p>
			<p className="text-xs text-muted-foreground">{percentage}%</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	revenue: {
		label: 'Revenue',
	},
};

export default function Main() {
	const categories: CategoryProps[] = [
		{
			category: 'Electronics',
			revenue: '$485,200',
			percentage: 35,
			products: 245,
			color: 'var(--chart-1)',
		},
		{
			category: 'Clothing',
			revenue: '$312,400',
			percentage: 22,
			products: 520,
			color: 'var(--chart-2)',
		},
		{
			category: 'Home & Garden',
			revenue: '$198,500',
			percentage: 14,
			products: 180,
			color: 'var(--chart-3)',
		},
		{
			category: 'Sports & Outdoors',
			revenue: '$168,300',
			percentage: 12,
			products: 145,
			color: 'var(--chart-4)',
		},
		{
			category: 'Beauty & Health',
			revenue: '$142,800',
			percentage: 10,
			products: 210,
			color: 'var(--chart-5)',
		},
		{
			category: 'Other',
			revenue: '$98,500',
			percentage: 7,
			products: 320,
			color: 'var(--muted-foreground)',
		},
	];

	const chartData = categories.map((c) => ({
		name: c.category,
		value: c.percentage,
		fill: c.color,
	}));

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Package className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Revenue by Category
								</CardTitle>
								<CardDescription>
									Breakdown of revenue across product categories
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">Total: $1.41M</Badge>
					</CardHeader>
					<CardContent>
						<div className="grid gap-6 @lg:grid-cols-2">
							<ChartContainer
								config={chartConfig}
								className="mx-auto aspect-square h-[300px]"
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
							<div className="space-y-1">
								{categories.map((c, i) => (
									<CategoryBreakdown key={i} {...c} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
