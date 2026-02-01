'use client';

import {
	Star,
	TrendingUp,
	TrendingDown,
	Package,
	ShoppingBag,
	Eye,
	Heart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type TopProduct = {
	name: string;
	image: string;
	category: string;
	sales: number;
	revenue: number;
	rating: number;
	change: number;
};

type ProductStats = {
	label: string;
	value: string;
	icon: React.ReactNode;
	trend: number;
};

type BentoLayout5Props = {
	topProducts: TopProduct[];
	stats: ProductStats[];
};

const ProductCard = ({
	product,
	rank,
}: {
	product: TopProduct;
	rank: number;
}) => (
	<div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
		<div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
			{rank}
		</div>
		<Avatar className="size-12 rounded-lg">
			<AvatarImage src={product.image} alt={product.name} />
			<AvatarFallback className="rounded-lg">
				{product.name.slice(0, 2)}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.category}</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">${product.revenue.toLocaleString()}</p>
			<div
				className={`flex items-center justify-end gap-1 text-xs ${product.change >= 0 ? 'text-primary' : 'text-destructive'}`}
			>
				{product.change >= 0 ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				{Math.abs(product.change)}%
			</div>
		</div>
	</div>
);

const TopProductsCard = ({ products }: { products: TopProduct[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @lg:col-span-2 @xl:row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Package className="size-4 text-muted-foreground" />
					<CardTitle className="text-sm font-medium">Top Products</CardTitle>
				</div>
				<Badge variant="secondary">This Month</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-1">
			{products.map((product, idx) => (
				<ProductCard key={idx} product={product} rank={idx + 1} />
			))}
		</CardContent>
	</Card>
);

const StatsCard = ({ stat }: { stat: ProductStats }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{stat.label}</p>
					<p className="text-2xl font-bold mt-1">{stat.value}</p>
				</div>
				<div className="p-3 rounded-lg bg-primary/10 text-primary">
					{stat.icon}
				</div>
			</div>
			<div
				className={`flex items-center gap-1 mt-2 text-sm ${stat.trend >= 0 ? 'text-primary' : 'text-destructive'}`}
			>
				{stat.trend >= 0 ? (
					<TrendingUp className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				{Math.abs(stat.trend)}% vs last month
			</div>
		</CardContent>
	</Card>
);

const BentoLayout5 = ({ topProducts, stats }: BentoLayout5Props) => (
	<div className="grid grid-cols-1 @lg:grid-cols-3 @xl:grid-cols-4 gap-4">
		<TopProductsCard products={topProducts} />
		<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-1 @xl:grid-cols-2 gap-4 @xl:col-span-2">
			{stats.map((stat, idx) => (
				<StatsCard key={idx} stat={stat} />
			))}
		</div>
	</div>
);

export default function Main() {
	const topProducts: TopProduct[] = [
		{
			name: 'Wireless Headphones Pro',
			image: '/placeholder.svg',
			category: 'Electronics',
			sales: 1250,
			revenue: 248750,
			rating: 4.8,
			change: 12.5,
		},
		{
			name: 'Smart Watch Ultra',
			image: '/placeholder.svg',
			category: 'Electronics',
			sales: 890,
			revenue: 310610,
			rating: 4.7,
			change: 8.3,
		},
		{
			name: 'Laptop Stand Premium',
			image: '/placeholder.svg',
			category: 'Accessories',
			sales: 2100,
			revenue: 165900,
			rating: 4.9,
			change: -2.1,
		},
		{
			name: 'USB-C Hub Pro',
			image: '/placeholder.svg',
			category: 'Accessories',
			sales: 1680,
			revenue: 99120,
			rating: 4.6,
			change: 15.7,
		},
		{
			name: 'Mechanical Keyboard RGB',
			image: '/placeholder.svg',
			category: 'Electronics',
			sales: 720,
			revenue: 107280,
			rating: 4.5,
			change: -5.2,
		},
	];

	const stats: ProductStats[] = [
		{
			label: 'Total Products',
			value: '2,458',
			icon: <Package className="size-5" />,
			trend: 12,
		},
		{
			label: 'Units Sold',
			value: '18,420',
			icon: <ShoppingBag className="size-5" />,
			trend: 8.5,
		},
		{
			label: 'Page Views',
			value: '245K',
			icon: <Eye className="size-5" />,
			trend: 22.3,
		},
		{
			label: 'Wishlisted',
			value: '8,920',
			icon: <Heart className="size-5" />,
			trend: -3.2,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout5 topProducts={topProducts} stats={stats} />
			</div>
		</section>
	);
}
