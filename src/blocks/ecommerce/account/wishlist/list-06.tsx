import Link from 'next/link';
import { Heart, ShoppingCart, X, ImageIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	href: string;
}

interface WishlistCategory {
	id: string;
	name: string;
	icon: string;
	items: WishlistItem[];
}

interface AccordionListProps {
	categories: WishlistCategory[];
}

const CategoryHeader = ({
	name,
	icon,
	itemCount,
}: {
	name: string;
	icon: string;
	itemCount: number;
}) => (
	<div className="flex items-center gap-3 flex-1">
		<Avatar className="size-10">
			<AvatarImage src={icon} alt={name} />
			<AvatarFallback>
				<ImageIcon className="size-4" />
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<h3 className="font-semibold">{name}</h3>
			<p className="text-sm text-muted-foreground">{itemCount} items</p>
		</div>
	</div>
);

const CategoryItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
		<div className="size-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<Link href={item.href}>
				<p className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</p>
			</Link>
			<p className="text-sm font-bold">${item.price.toFixed(2)}</p>
		</div>
		<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
			<Button size="icon-sm" variant="ghost">
				<ShoppingCart className="size-4" />
			</Button>
			<Button size="icon-sm" variant="ghost" className="text-destructive">
				<X className="size-4" />
			</Button>
		</div>
	</div>
);

const CategoryAccordion = ({ categories }: AccordionListProps) => (
	<Accordion type="multiple" className="space-y-3">
		{categories.map((category) => (
			<AccordionItem
				key={category.id}
				value={category.id}
				className="border rounded-xl px-4"
			>
				<AccordionTrigger className="hover:no-underline py-4">
					<CategoryHeader
						name={category.name}
						icon={category.icon}
						itemCount={category.items.length}
					/>
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-1 pb-2">
						{category.items.map((item) => (
							<CategoryItem key={item.id} item={item} />
						))}
					</div>
					<Button variant="ghost" className="w-full gap-1.5 mt-2">
						View All in {category.name}
						<ChevronRight className="size-4" />
					</Button>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);

const CategoryStats = ({ categories }: { categories: WishlistCategory[] }) => {
	const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
	const totalValue = categories.reduce(
		(sum, cat) =>
			sum + cat.items.reduce((itemSum, item) => itemSum + item.price, 0),
		0,
	);

	return (
		<div className="flex flex-wrap gap-4 mb-6">
			<Badge variant="secondary" className="text-sm py-1.5 px-3">
				{categories.length} Categories
			</Badge>
			<Badge variant="secondary" className="text-sm py-1.5 px-3">
				{totalItems} Items
			</Badge>
			<Badge variant="secondary" className="text-sm py-1.5 px-3">
				${totalValue.toFixed(2)} Total
			</Badge>
		</div>
	);
};

export default function Main() {
	const categories: WishlistCategory[] = [
		{
			id: 'electronics',
			name: 'Electronics',
			icon: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=100&h=100&fit=crop',
			items: [
				{
					id: '1',
					name: 'Wireless Earbuds Pro',
					price: 199.0,
					image:
						'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
					href: '/product/1',
				},
				{
					id: '2',
					name: 'Smart Watch Series 9',
					price: 399.0,
					image:
						'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop',
					href: '/product/2',
				},
			],
		},
		{
			id: 'clothing',
			name: 'Clothing',
			icon: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop',
			items: [
				{
					id: '3',
					name: 'Cashmere Sweater',
					price: 189.0,
					image:
						'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop',
					href: '/product/3',
				},
				{
					id: '4',
					name: 'Leather Jacket',
					price: 350.0,
					image:
						'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop',
					href: '/product/4',
				},
				{
					id: '5',
					name: 'Denim Jeans',
					price: 89.0,
					image:
						'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
					href: '/product/5',
				},
			],
		},
		{
			id: 'home',
			name: 'Home & Living',
			icon: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=100&h=100&fit=crop',
			items: [
				{
					id: '6',
					name: 'Ceramic Vase Set',
					price: 79.0,
					image:
						'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=100&h=100&fit=crop',
					href: '/product/6',
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-2">My Wishlist</h1>
				<p className="text-muted-foreground mb-6">Organized by category</p>
				<CategoryStats categories={categories} />
				<CategoryAccordion categories={categories} />
			</div>
		</section>
	);
}
