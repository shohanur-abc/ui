'use client';

import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type ProductData = {
	name: string;
	image: string;
	initials: string;
	category: string;
	sales: number;
	revenue: string;
};

type TopProductsCardProps = {
	title: string;
	products: ProductData[];
};

const TopProductsCard = ({ title, products }: TopProductsCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-4">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Package className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{products.map((product, idx) => (
				<div
					key={idx}
					className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
				>
					<div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
						{idx + 1}
					</div>
					<Avatar className="size-10 rounded-lg">
						<AvatarImage src={product.image} alt={product.name} />
						<AvatarFallback className="rounded-lg bg-secondary">
							{product.initials}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="font-medium truncate">{product.name}</p>
						<p className="text-xs text-muted-foreground">{product.category}</p>
					</div>
					<div className="text-right">
						<p className="font-semibold">{product.revenue}</p>
						<Badge variant="secondary" className="text-xs">
							{product.sales} sold
						</Badge>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const products: ProductData[] = [
		{
			name: 'Premium Wireless Headphones',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
			initials: 'PH',
			category: 'Electronics',
			sales: 1247,
			revenue: '$124,700',
		},
		{
			name: 'Smart Watch Pro',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
			initials: 'SW',
			category: 'Electronics',
			sales: 892,
			revenue: '$89,200',
		},
		{
			name: 'Ergonomic Office Chair',
			image:
				'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100',
			initials: 'OC',
			category: 'Furniture',
			sales: 654,
			revenue: '$65,400',
		},
		{
			name: 'Mechanical Keyboard',
			image:
				'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100',
			initials: 'MK',
			category: 'Accessories',
			sales: 543,
			revenue: '$54,300',
		},
		{
			name: 'USB-C Hub Adapter',
			image:
				'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100',
			initials: 'UH',
			category: 'Accessories',
			sales: 421,
			revenue: '$21,050',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<TopProductsCard title="Top Selling Products" products={products} />
				</div>
			</div>
		</section>
	);
}
