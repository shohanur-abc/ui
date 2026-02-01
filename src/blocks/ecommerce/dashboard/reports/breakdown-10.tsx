'use client';

import {
	Package,
	AlertCircle,
	CheckCircle,
	Clock,
	Archive,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type StockStatusProps = {
	status: string;
	icon: React.ElementType;
	count: string;
	value: string;
	percentage: number;
	color: string;
};

const StockStatus = ({
	status,
	icon: Icon,
	count,
	value,
	percentage,
	color,
}: StockStatusProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-center gap-3">
				<div
					className="rounded-lg p-2"
					style={{ backgroundColor: `${color}20` }}
				>
					<Icon className="size-4" style={{ color }} />
				</div>
				<div>
					<p className="text-sm font-medium">{status}</p>
					<p className="text-xs text-muted-foreground">{count} SKUs</p>
				</div>
			</div>
			<p className="mt-3 text-xl font-bold">{value}</p>
			<Progress value={percentage} className="mt-2 h-1.5" />
			<p className="mt-1 text-xs text-muted-foreground">
				{percentage}% of inventory
			</p>
		</CardContent>
	</Card>
);

type CategoryStockProps = {
	category: string;
	inStock: number;
	lowStock: number;
	outOfStock: number;
	totalValue: string;
};

export default function Main() {
	const statuses: StockStatusProps[] = [
		{
			status: 'In Stock',
			icon: CheckCircle,
			count: '2,845',
			value: '$1.24M',
			percentage: 68,
			color: 'oklch(0.7 0.15 145)',
		},
		{
			status: 'Low Stock',
			icon: Clock,
			count: '456',
			value: '$185K',
			percentage: 12,
			color: 'oklch(0.7 0.15 85)',
		},
		{
			status: 'Out of Stock',
			icon: AlertCircle,
			count: '128',
			value: '$0',
			percentage: 3,
			color: 'oklch(0.65 0.2 25)',
		},
		{
			status: 'Overstock',
			icon: Archive,
			count: '285',
			value: '$342K',
			percentage: 17,
			color: 'oklch(0.6 0.15 280)',
		},
	];

	const categories: CategoryStockProps[] = [
		{
			category: 'Electronics',
			inStock: 520,
			lowStock: 85,
			outOfStock: 22,
			totalValue: '$485,200',
		},
		{
			category: 'Clothing',
			inStock: 845,
			lowStock: 124,
			outOfStock: 45,
			totalValue: '$312,400',
		},
		{
			category: 'Home & Garden',
			inStock: 420,
			lowStock: 68,
			outOfStock: 18,
			totalValue: '$198,500',
		},
		{
			category: 'Sports',
			inStock: 380,
			lowStock: 52,
			outOfStock: 12,
			totalValue: '$168,300',
		},
		{
			category: 'Beauty',
			inStock: 680,
			lowStock: 127,
			outOfStock: 31,
			totalValue: '$285,600',
		},
	];

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
									Inventory Status Breakdown
								</CardTitle>
								<CardDescription>
									Stock levels and value distribution
								</CardDescription>
							</div>
						</div>
						<Badge variant="outline">3,714 Total SKUs</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{statuses.map((s, i) => (
								<StockStatus key={i} {...s} />
							))}
						</div>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								<p className="mb-4 text-sm font-medium">
									Stock Status by Category
								</p>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Category</TableHead>
												<TableHead className="text-right">In Stock</TableHead>
												<TableHead className="text-right">Low Stock</TableHead>
												<TableHead className="text-right">
													Out of Stock
												</TableHead>
												<TableHead className="text-right">
													Total Value
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{categories.map((c, i) => (
												<TableRow key={i}>
													<TableCell className="font-medium">
														{c.category}
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
														>
															{c.inStock}
														</Badge>
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className="border-amber-500/20 bg-amber-500/10 text-amber-500"
														>
															{c.lowStock}
														</Badge>
													</TableCell>
													<TableCell className="text-right">
														<Badge
															variant="outline"
															className="border-rose-500/20 bg-rose-500/10 text-rose-500"
														>
															{c.outOfStock}
														</Badge>
													</TableCell>
													<TableCell className="text-right font-medium">
														{c.totalValue}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
