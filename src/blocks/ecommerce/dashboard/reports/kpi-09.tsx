'use client';

import { Package, Star, Eye, ShoppingCart, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ProductKPIProps = {
	rank: number;
	name: string;
	image: string;
	category: string;
	revenue: string;
	units: string;
	views: string;
	conversion: string;
	rating: number;
	trend: 'up' | 'down' | 'stable';
};

const ProductKPI = ({
	rank,
	name,
	image,
	category,
	revenue,
	units,
	views,
	conversion,
	rating,
	trend,
}: ProductKPIProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<div className="flex items-start gap-3">
				<div className="relative">
					<Avatar className="size-12 rounded-lg">
						<AvatarImage src={image} alt={name} />
						<AvatarFallback className="rounded-lg">
							<Package className="size-5" />
						</AvatarFallback>
					</Avatar>
					<div
						className={`absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full text-xs font-bold ${
							rank === 1
								? 'bg-amber-500 text-amber-950'
								: rank === 2
									? 'bg-slate-400 text-slate-950'
									: rank === 3
										? 'bg-amber-700 text-amber-50'
										: 'bg-muted text-muted-foreground'
						}`}
					>
						{rank}
					</div>
				</div>
				<div className="flex-1">
					<div className="flex items-start justify-between">
						<div>
							<p className="font-medium">{name}</p>
							<p className="text-xs text-muted-foreground">{category}</p>
						</div>
						<Badge
							variant="outline"
							className={
								trend === 'up'
									? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
									: trend === 'down'
										? 'border-rose-500/20 bg-rose-500/10 text-rose-500'
										: 'border-border bg-muted'
							}
						>
							{trend === 'up' && <TrendingUp className="mr-1 size-3" />}
							{trend === 'up'
								? 'Rising'
								: trend === 'down'
									? 'Falling'
									: 'Stable'}
						</Badge>
					</div>
					<div className="mt-3 grid grid-cols-4 gap-2">
						<div>
							<p className="text-xs text-muted-foreground">Revenue</p>
							<p className="font-medium">{revenue}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Units</p>
							<p className="font-medium">{units}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Views</p>
							<p className="font-medium">{views}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground">Conv.</p>
							<p className="font-medium">{conversion}</p>
						</div>
					</div>
					<div className="mt-2 flex items-center gap-1">
						<Star className="size-3.5 fill-amber-500 text-amber-500" />
						<span className="text-sm font-medium">{rating}</span>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const products: ProductKPIProps[] = [
		{
			rank: 1,
			name: 'Wireless Pro Headphones',
			image: '',
			category: 'Electronics',
			revenue: '$48.5K',
			units: '324',
			views: '12.4K',
			conversion: '2.6%',
			rating: 4.8,
			trend: 'up',
		},
		{
			rank: 2,
			name: 'Smart Watch Ultra',
			image: '',
			category: 'Electronics',
			revenue: '$42.2K',
			units: '186',
			views: '8.9K',
			conversion: '2.1%',
			rating: 4.7,
			trend: 'up',
		},
		{
			rank: 3,
			name: 'Premium Yoga Mat',
			image: '',
			category: 'Sports',
			revenue: '$28.4K',
			units: '892',
			views: '15.2K',
			conversion: '5.9%',
			rating: 4.9,
			trend: 'stable',
		},
		{
			rank: 4,
			name: 'Organic Skincare Set',
			image: '',
			category: 'Beauty',
			revenue: '$24.8K',
			units: '412',
			views: '9.8K',
			conversion: '4.2%',
			rating: 4.6,
			trend: 'up',
		},
		{
			rank: 5,
			name: 'Cotton T-Shirt Pack',
			image: '',
			category: 'Clothing',
			revenue: '$18.9K',
			units: '756',
			views: '22.1K',
			conversion: '3.4%',
			rating: 4.4,
			trend: 'down',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Top Products Report
						</CardTitle>
						<CardDescription>
							Best performing products with detailed KPIs
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @lg:grid-cols-2">
							{products.map((product, i) => (
								<ProductKPI key={i} {...product} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
