import Link from 'next/link';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const CategoryGroup = ({
	category,
	items,
}: {
	category: string;
	items: WishlistItem[];
}) => (
	<div className="mb-4 last:mb-0">
		<div className="flex items-center justify-between mb-2">
			<h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
			<Badge variant="outline" className="text-[10px]">
				{items.length}
			</Badge>
		</div>
		<div className="flex gap-2 overflow-x-auto pb-1">
			{items.map((item) => (
				<Link key={item.id} href={item.href} className="flex-shrink-0">
					<div className="relative size-14 rounded-lg overflow-hidden bg-muted hover:ring-2 hover:ring-primary transition-all">
						<img
							src={item.image}
							alt={item.name}
							className="size-full object-cover"
						/>
					</div>
				</Link>
			))}
			<button className="flex-shrink-0 size-14 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
				<ChevronRight className="size-4" />
			</button>
		</div>
	</div>
);

const groupByCategory = (items: WishlistItem[]) => {
	return items.reduce(
		(acc, item) => {
			if (!acc[item.category]) acc[item.category] = [];
			acc[item.category].push(item);
			return acc;
		},
		{} as Record<string, WishlistItem[]>,
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Leather Jacket',
			price: 299,
			image:
				'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop',
			category: 'Clothing',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Denim Jeans',
			price: 89,
			image:
				'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
			category: 'Clothing',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Wool Sweater',
			price: 125,
			image:
				'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=100&fit=crop',
			category: 'Clothing',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Running Shoes',
			price: 145,
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			category: 'Footwear',
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Loafers',
			price: 165,
			image:
				'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=100&h=100&fit=crop',
			category: 'Footwear',
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Watch',
			price: 249,
			image:
				'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=100&h=100&fit=crop',
			category: 'Accessories',
			href: '/product/6',
		},
		{
			id: '7',
			name: 'Sunglasses',
			price: 175,
			image:
				'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&h=100&fit=crop',
			category: 'Accessories',
			href: '/product/7',
		},
	];

	const grouped = groupByCategory(wishlistItems);

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-sm px-4 py-6">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-lg font-bold">By Category</h1>
					<Button size="sm" variant="outline" className="gap-1">
						<ShoppingCart className="size-4" />
						Add All
					</Button>
				</div>
				{Object.entries(grouped).map(([category, items]) => (
					<CategoryGroup key={category} category={category} items={items} />
				))}
			</div>
		</section>
	);
}
