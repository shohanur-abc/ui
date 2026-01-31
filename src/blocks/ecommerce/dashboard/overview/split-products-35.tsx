'use client';

import { Bar, BarChart, XAxis } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	Box,
	DollarSign,
	Package,
	Star,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type ProductKpi = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

type TopProduct = {
	name: string;
	category: string;
	sold: number;
	revenue: string;
	stock: number;
	rating: number;
	image: string;
};

type CategoryStat = {
	name: string;
	products: number;
	percentage: number;
};

const ProductKpiCard = ({ title, value, change, trend, icon: Icon }: ProductKpi) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="flex items-center gap-3">
			<div className="rounded-lg bg-primary/10 p-2">
				<Icon className="size-4 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-xs text-muted-foreground">{title}</p>
				<p className="text-xl font-bold">{value}</p>
			</div>
			<span
				className={`flex items-center text-xs ${
					trend === 'up' ? 'text-emerald-500' : 'text-red-500'
				}`}
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
);

const ProductRow = ({
	name,
	category,
	sold,
	revenue,
	stock,
	rating,
	image,
}: TopProduct) => (
	<div className="flex items-center gap-4 rounded-lg border bg-card/50 p-3 transition-all hover:bg-card">
		<div className="size-14 overflow-hidden rounded-lg bg-muted">
			<img src={image} alt={name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{category}</p>
			<div className="mt-1 flex items-center gap-2">
				<div className="flex items-center gap-0.5 text-xs text-amber-500">
					<Star className="size-3 fill-current" />
					{rating}
				</div>
				<span className="text-xs text-muted-foreground">• {sold} sold</span>
			</div>
		</div>
		<div className="text-right">
			<p className="font-semibold">{revenue}</p>
			<Badge
				variant="secondary"
				className={stock < 20 ? 'bg-red-500/10 text-red-500' : 'bg-muted'}
			>
				{stock} in stock
			</Badge>
		</div>
	</div>
);

const CategoryRow = ({ name, products, percentage }: CategoryStat) => (
	<div className="space-y-1.5">
		<div className="flex justify-between text-sm">
			<span>{name}</span>
			<span className="font-medium">{products}</span>
		</div>
		<Progress value={percentage} className="h-1.5" />
	</div>
);

const chartConfig: ChartConfig = {
	sales: { label: 'Sales', color: 'var(--chart-1)' },
};

export default function Main() {
	const productKpis: ProductKpi[] = [
		{ title: 'Total Products', value: '1,247', change: '+12', trend: 'up', icon: Package },
		{ title: 'Total Sales', value: '$89.4k', change: '+24%', trend: 'up', icon: DollarSign },
		{ title: 'Avg Rating', value: '4.6', change: '+0.2', trend: 'up', icon: Star },
		{ title: 'Low Stock', value: '18', change: '-5', trend: 'up', icon: Box },
	];

	const topProducts: TopProduct[] = [
		{ name: 'Wireless Headphones Pro', category: 'Electronics', sold: 432, revenue: '$25.9k', stock: 45, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80' },
		{ name: 'Smart Watch Ultra', category: 'Electronics', sold: 324, revenue: '$19.4k', stock: 12, rating: 4.7, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80' },
		{ name: 'Ergonomic Laptop Stand', category: 'Accessories', sold: 287, revenue: '$14.3k', stock: 78, rating: 4.9, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80' },
	];

	const categories: CategoryStat[] = [
		{ name: 'Electronics', products: 456, percentage: 37 },
		{ name: 'Clothing', products: 342, percentage: 27 },
		{ name: 'Home & Garden', products: 234, percentage: 19 },
		{ name: 'Sports', products: 156, percentage: 12 },
		{ name: 'Other', products: 59, percentage: 5 },
	];

	const salesData = [
		{ month: 'Jan', sales: 124 },
		{ month: 'Feb', sales: 156 },
		{ month: 'Mar', sales: 142 },
		{ month: 'Apr', sales: 189 },
		{ month: 'May', sales: 234 },
		{ month: 'Jun', sales: 278 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							{productKpis.map((kpi, i) => (
								<ProductKpiCard key={i} {...kpi} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Products by Category</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-0">
								{categories.map((cat, i) => (
									<CategoryRow key={i} {...cat} />
								))}
							</CardContent>
						</Card>
					</div>
					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Top Selling Products</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 pt-0">
								{topProducts.map((product, i) => (
									<ProductRow key={i} {...product} />
								))}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Monthly Sales</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={chartConfig} className="h-[160px] w-full">
									<BarChart data={salesData}>
										<XAxis dataKey="month" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
