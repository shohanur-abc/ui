'use client';

import { Bar, BarChart, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	Percent,
	TrendingUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CategoryMetric = {
	name: string;
	revenue: string;
	products: number;
	growth: string;
	share: number;
	color: string;
};

const CategoryCard = ({ name, revenue, products, growth, share, color }: CategoryMetric) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div className={`size-3 rounded-full ${color}`} />
				<span className="font-medium">{name}</span>
			</div>
			<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
				<ArrowUpRight className="mr-0.5 size-3" />
				{growth}
			</Badge>
		</div>
		<div className="mt-3 grid grid-cols-2 gap-4">
			<div>
				<p className="text-xs text-muted-foreground">Revenue</p>
				<p className="text-lg font-bold">{revenue}</p>
			</div>
			<div>
				<p className="text-xs text-muted-foreground">Products</p>
				<p className="text-lg font-bold">{products}</p>
			</div>
		</div>
		<div className="mt-3 space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">Market Share</span>
				<span className="font-medium">{share}%</span>
			</div>
			<Progress value={share} className="h-1.5" />
		</div>
	</div>
);

const barConfig: ChartConfig = {
	value: { label: 'Revenue', color: 'var(--chart-1)' },
};

const pieConfig: ChartConfig = {
	value: { label: 'Share' },
};

export default function Main() {
	const electronics: CategoryMetric[] = [
		{ name: 'Headphones', revenue: '$56,157', products: 24, growth: '+28%', share: 32, color: 'bg-primary' },
		{ name: 'Smartwatches', revenue: '$97,197', products: 18, growth: '+24%', share: 45, color: 'bg-emerald-500' },
		{ name: 'Keyboards', revenue: '$24,958', products: 12, growth: '+12%', share: 18, color: 'bg-amber-500' },
	];

	const accessories: CategoryMetric[] = [
		{ name: 'Stands', revenue: '$22,957', products: 15, growth: '+18%', share: 28, color: 'bg-primary' },
		{ name: 'Hubs', revenue: '$25,595', products: 22, growth: '+22%', share: 35, color: 'bg-emerald-500' },
		{ name: 'Cables', revenue: '$18,234', products: 45, growth: '+15%', share: 25, color: 'bg-amber-500' },
	];

	const barData = [
		{ category: 'Electronics', value: 178312 },
		{ category: 'Accessories', value: 66786 },
		{ category: 'Home', value: 42500 },
		{ category: 'Sports', value: 28000 },
	];

	const pieData = [
		{ name: 'Electronics', value: 45, fill: 'var(--chart-1)' },
		{ name: 'Accessories', value: 28, fill: 'var(--chart-2)' },
		{ name: 'Home', value: 15, fill: 'var(--chart-3)' },
		{ name: 'Sports', value: 12, fill: 'var(--chart-4)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle>Category Performance</CardTitle>
						<CardDescription>Revenue and metrics by product category</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="electronics" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="electronics">Electronics</TabsTrigger>
								<TabsTrigger value="accessories">Accessories</TabsTrigger>
								<TabsTrigger value="overview">Overview</TabsTrigger>
							</TabsList>
							<TabsContent value="electronics">
								<div className="grid gap-4 @lg:grid-cols-3">
									{electronics.map((cat, i) => (
										<CategoryCard key={i} {...cat} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="accessories">
								<div className="grid gap-4 @lg:grid-cols-3">
									{accessories.map((cat, i) => (
										<CategoryCard key={i} {...cat} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="overview">
								<div className="grid gap-6 @xl:grid-cols-2">
									<div>
										<p className="mb-4 text-sm font-medium">Revenue by Category</p>
										<ChartContainer config={barConfig} className="h-[220px] w-full">
											<BarChart data={barData} layout="vertical">
												<XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}K`} />
												<YAxis dataKey="category" type="category" tickLine={false} axisLine={false} width={80} />
												<ChartTooltip content={<ChartTooltipContent />} />
												<Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
											</BarChart>
										</ChartContainer>
									</div>
									<div>
										<p className="mb-4 text-sm font-medium">Market Share Distribution</p>
										<div className="flex items-center gap-6">
											<ChartContainer config={pieConfig} className="size-[180px]">
												<PieChart>
													<Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
														{pieData.map((entry, index) => (
															<Cell key={`cell-${index}`} fill={entry.fill} />
														))}
													</Pie>
												</PieChart>
											</ChartContainer>
											<div className="space-y-3">
												{pieData.map((item, i) => (
													<div key={i} className="flex items-center gap-2">
														<div className="size-3 rounded-full" style={{ backgroundColor: item.fill }} />
														<span className="text-sm">{item.name}</span>
														<span className="text-sm font-medium">{item.value}%</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
