'use client';

import { Tag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type CategoryData = {
	category: string;
	icon: string;
	revenue: number;
	revenueGrowth: number;
	orders: number;
	orderGrowth: number;
	avgMargin: number;
	inventoryLevel: number;
};

type CategoryTableCardProps = {
	title: string;
	description: string;
	categories: CategoryData[];
};

const CategoryTableCard = ({
	title,
	description,
	categories,
}: CategoryTableCardProps) => {
	const maxRevenue = Math.max(...categories.map((c) => c.revenue));

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardHeader className="flex flex-row items-center gap-3 pb-2">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Tag className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Category</TableHead>
								<TableHead>Revenue</TableHead>
								<TableHead className="text-right">Orders</TableHead>
								<TableHead className="text-right">Margin</TableHead>
								<TableHead className="w-[120px]">Inventory</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories.map((cat, idx) => (
								<TableRow key={idx} className="hover:bg-muted/50 transition-colors">
									<TableCell>
										<div className="flex items-center gap-3">
											<span className="text-2xl">{cat.icon}</span>
											<span className="font-medium">{cat.category}</span>
										</div>
									</TableCell>
									<TableCell>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="font-semibold">
													${cat.revenue.toLocaleString()}
												</span>
												<span
													className={`inline-flex items-center text-xs ${
														cat.revenueGrowth >= 0
															? 'text-primary'
															: 'text-destructive'
													}`}
												>
													{cat.revenueGrowth >= 0 ? (
														<ArrowUpRight className="size-3" />
													) : (
														<ArrowDownRight className="size-3" />
													)}
													{Math.abs(cat.revenueGrowth)}%
												</span>
											</div>
											<Progress
												value={(cat.revenue / maxRevenue) * 100}
												className="h-1.5"
											/>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div>
											<span className="font-medium">{cat.orders.toLocaleString()}</span>
											<span
												className={`ml-2 text-xs ${
													cat.orderGrowth >= 0 ? 'text-primary' : 'text-destructive'
												}`}
											>
												{cat.orderGrowth >= 0 ? '+' : ''}
												{cat.orderGrowth}%
											</span>
										</div>
									</TableCell>
									<TableCell className="text-right font-medium">
										{cat.avgMargin}%
									</TableCell>
									<TableCell>
										<div className="space-y-1">
											<Progress
												value={cat.inventoryLevel}
												className="h-2"
											/>
											<span className="text-xs text-muted-foreground">
												{cat.inventoryLevel}%
											</span>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const categories: CategoryData[] = [
		{ category: 'Electronics', icon: '📱', revenue: 158000, revenueGrowth: 12.5, orders: 1250, orderGrowth: 8, avgMargin: 24, inventoryLevel: 72 },
		{ category: 'Clothing', icon: '👕', revenue: 125000, revenueGrowth: 8.2, orders: 2100, orderGrowth: 15, avgMargin: 42, inventoryLevel: 85 },
		{ category: 'Home & Garden', icon: '🏠', revenue: 98000, revenueGrowth: -3.1, orders: 890, orderGrowth: -5, avgMargin: 35, inventoryLevel: 45 },
		{ category: 'Sports', icon: '⚽', revenue: 76000, revenueGrowth: 22.8, orders: 680, orderGrowth: 18, avgMargin: 28, inventoryLevel: 92 },
		{ category: 'Beauty', icon: '💄', revenue: 54000, revenueGrowth: 5.4, orders: 920, orderGrowth: 12, avgMargin: 58, inventoryLevel: 68 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<CategoryTableCard
					title="Category Performance"
					description="Sales metrics by product category"
					categories={categories}
				/>
			</div>
		</section>
	);
}
