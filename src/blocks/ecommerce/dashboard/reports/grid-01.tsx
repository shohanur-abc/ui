'use client';

import { MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ProductReportItem = {
	id: string;
	name: string;
	category: string;
	revenue: string;
	units: number;
	trend: 'up' | 'down';
	change: string;
};

type ReportHeaderProps = {
	title: string;
	description: string;
};

const ReportHeader = ({ title, description }: ReportHeaderProps) => (
	<CardHeader className="flex flex-row items-center justify-between">
		<div>
			<CardTitle className="text-lg @sm:text-xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</div>
		<Button variant="ghost" size="icon" className="shrink-0">
			<MoreHorizontal className="size-4" />
		</Button>
	</CardHeader>
);

type ProductRowProps = ProductReportItem;

const ProductRow = ({
	id,
	name,
	category,
	revenue,
	units,
	trend,
	change,
}: ProductRowProps) => (
	<TableRow className="group transition-colors hover:bg-muted/50">
		<TableCell className="font-medium">{id}</TableCell>
		<TableCell>
			<div className="flex flex-col">
				<span className="font-medium">{name}</span>
				<span className="text-xs text-muted-foreground">{category}</span>
			</div>
		</TableCell>
		<TableCell className="text-right font-medium">{revenue}</TableCell>
		<TableCell className="text-right">{units.toLocaleString()}</TableCell>
		<TableCell className="text-right">
			<div
				className={`inline-flex items-center gap-1 ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
			>
				{trend === 'up' ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				<span className="text-sm font-medium">{change}</span>
			</div>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const headerProps: ReportHeaderProps = {
		title: 'Product Performance Report',
		description: 'Top performing products by revenue this quarter',
	};

	const products: ProductReportItem[] = [
		{ id: 'PRD-001', name: 'Wireless Headphones Pro', category: 'Electronics', revenue: '$24,500', units: 245, trend: 'up', change: '+12.5%' },
		{ id: 'PRD-002', name: 'Smart Watch Series X', category: 'Electronics', revenue: '$18,300', units: 183, trend: 'up', change: '+8.3%' },
		{ id: 'PRD-003', name: 'Ergonomic Office Chair', category: 'Furniture', revenue: '$15,200', units: 76, trend: 'down', change: '-2.1%' },
		{ id: 'PRD-004', name: 'Mechanical Keyboard RGB', category: 'Electronics', revenue: '$12,800', units: 256, trend: 'up', change: '+15.7%' },
		{ id: 'PRD-005', name: 'Premium Laptop Stand', category: 'Accessories', revenue: '$9,400', units: 188, trend: 'down', change: '-4.2%' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<ReportHeader {...headerProps} />
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<TableHead className="w-24">ID</TableHead>
									<TableHead>Product</TableHead>
									<TableHead className="text-right">Revenue</TableHead>
									<TableHead className="text-right">Units</TableHead>
									<TableHead className="text-right">Change</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<ProductRow key={product.id} {...product} />
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
