'use client';

import { Cell, Pie, PieChart } from 'recharts';
import {
	ArrowRight,
	ArrowUpRight,
	Calendar,
	DollarSign,
	Package,
	ShoppingCart,
	Star,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type SalesKpi = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type ProductSaleRow = {
	rank: number;
	name: string;
	category: string;
	sold: number;
	revenue: string;
	growth: string;
	rating: number;
};

type CategoryData = {
	name: string;
	value: number;
	fill: string;
};

const SalesKpiCard = ({ title, value, change, icon: Icon }: SalesKpi) => (
	<Card>
		<CardContent className="flex items-center gap-4 p-4">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
			<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
				<ArrowUpRight className="mr-1 size-3" />
				{change}
			</Badge>
		</CardContent>
	</Card>
);

const pieConfig: ChartConfig = {
	value: { label: 'Sales' },
};

export default function Main() {
	const kpis: SalesKpi[] = [
		{
			title: 'Total Sales',
			value: '$248,632',
			change: '+28%',
			icon: DollarSign,
		},
		{
			title: 'Total Orders',
			value: '6,842',
			change: '+22%',
			icon: ShoppingCart,
		},
		{ title: 'Products Sold', value: '12,456', change: '+18%', icon: Package },
		{ title: 'Avg Rating', value: '4.7', change: '+0.2', icon: Star },
	];

	const topProducts: ProductSaleRow[] = [
		{
			rank: 1,
			name: 'Wireless Headphones Pro',
			category: 'Electronics',
			sold: 432,
			revenue: '$56,157',
			growth: '+28%',
			rating: 4.8,
		},
		{
			rank: 2,
			name: 'Smart Watch Ultra',
			category: 'Electronics',
			sold: 324,
			revenue: '$97,197',
			growth: '+24%',
			rating: 4.7,
		},
		{
			rank: 3,
			name: 'Ergonomic Laptop Stand',
			category: 'Accessories',
			sold: 287,
			revenue: '$22,957',
			growth: '+18%',
			rating: 4.9,
		},
		{
			rank: 4,
			name: 'USB-C Hub 7-in-1',
			category: 'Accessories',
			sold: 256,
			revenue: '$12,795',
			growth: '+15%',
			rating: 4.5,
		},
		{
			rank: 5,
			name: 'Noise Cancelling Earbuds',
			category: 'Electronics',
			sold: 234,
			revenue: '$21,057',
			growth: '+12%',
			rating: 4.6,
		},
		{
			rank: 6,
			name: 'Mechanical Keyboard',
			category: 'Electronics',
			sold: 198,
			revenue: '$31,678',
			growth: '+8%',
			rating: 4.4,
		},
	];

	const categoryData: CategoryData[] = [
		{ name: 'Electronics', value: 45, fill: 'var(--chart-1)' },
		{ name: 'Accessories', value: 28, fill: 'var(--chart-2)' },
		{ name: 'Home & Garden', value: 15, fill: 'var(--chart-3)' },
		{ name: 'Sports', value: 12, fill: 'var(--chart-4)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<SalesKpiCard key={i} {...kpi} />
						))}
					</div>
					<div className="grid gap-6 @xl:grid-cols-3">
						<Card className="@xl:col-span-2">
							<CardHeader className="flex-row items-center justify-between pb-4">
								<CardTitle className="text-base">
									Top Selling Products
								</CardTitle>
								<Button variant="ghost" size="sm" className="gap-1" asChild>
									<Link href="/sales">
										View All
										<ArrowRight className="size-3" />
									</Link>
								</Button>
							</CardHeader>
							<CardContent className="pt-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-10">#</TableHead>
											<TableHead>Product</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Category
											</TableHead>
											<TableHead>Sold</TableHead>
											<TableHead>Revenue</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Growth
											</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Rating
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{topProducts.map((product) => (
											<TableRow key={product.rank}>
												<TableCell>
													<span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
														{product.rank}
													</span>
												</TableCell>
												<TableCell className="font-medium">
													{product.name}
												</TableCell>
												<TableCell className="hidden @lg:table-cell text-muted-foreground">
													{product.category}
												</TableCell>
												<TableCell>{product.sold}</TableCell>
												<TableCell className="font-medium">
													{product.revenue}
												</TableCell>
												<TableCell className="hidden @lg:table-cell">
													<Badge
														variant="secondary"
														className="bg-emerald-500/10 text-emerald-500"
													>
														{product.growth}
													</Badge>
												</TableCell>
												<TableCell className="hidden @xl:table-cell">
													<div className="flex items-center gap-1 text-amber-500">
														<Star className="size-3 fill-current" />
														{product.rating}
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Sales by Category</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col items-center">
								<ChartContainer
									config={pieConfig}
									className="h-[180px] w-[180px]"
								>
									<PieChart>
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Pie
											data={categoryData}
											dataKey="value"
											nameKey="name"
											innerRadius={50}
											outerRadius={80}
										>
											{categoryData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.fill} />
											))}
										</Pie>
									</PieChart>
								</ChartContainer>
								<div className="mt-4 w-full space-y-2">
									{categoryData.map((item, i) => (
										<div key={i} className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div
													className="size-2.5 rounded-full"
													style={{ backgroundColor: item.fill }}
												/>
												<span className="text-sm">{item.name}</span>
											</div>
											<span className="text-sm font-medium">{item.value}%</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
