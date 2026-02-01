import Link from 'next/link';
import { Heart, ShoppingCart, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	selected: boolean;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const CompactItem = ({ item }: { item: WishlistItem }) => (
	<div
		className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${item.selected ? 'bg-primary/5' : 'hover:bg-muted'}`}
	>
		<Checkbox checked={item.selected} className="flex-shrink-0" />
		<div className="size-10 flex-shrink-0 rounded overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<Link href={item.href}>
				<p className="text-sm font-medium truncate hover:text-primary transition-colors">
					{item.name}
				</p>
			</Link>
		</div>
		<span className="text-sm font-bold flex-shrink-0">
			${item.price.toFixed(2)}
		</span>
		<Button
			variant="ghost"
			size="icon-sm"
			className="text-destructive hover:text-destructive flex-shrink-0"
		>
			<X className="size-3.5" />
		</Button>
	</div>
);

const CompactList = ({ items }: CompactProps) => (
	<div className="space-y-1">
		{items.map((item) => (
			<CompactItem key={item.id} item={item} />
		))}
	</div>
);

const SelectionBar = ({
	selected,
	total,
	totalPrice,
}: {
	selected: number;
	total: number;
	totalPrice: number;
}) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-muted mb-4">
		<div className="flex items-center gap-3">
			<Checkbox checked={selected === total} />
			<span className="text-sm">
				{selected > 0 ? `${selected} selected` : 'Select all'}
			</span>
		</div>
		{selected > 0 && (
			<div className="flex items-center gap-3">
				<span className="text-sm font-medium">
					Total: ${totalPrice.toFixed(2)}
				</span>
				<Button size="sm" className="gap-1">
					<ShoppingCart className="size-4" />
					Add Selected
				</Button>
			</div>
		)}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Minimalist Watch',
			price: 249.0,
			image:
				'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=100&h=100&fit=crop',
			selected: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Leather Belt',
			price: 59.0,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
			selected: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Silk Tie',
			price: 75.0,
			image:
				'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=100&h=100&fit=crop',
			selected: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Cufflinks Set',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=100&h=100&fit=crop',
			selected: false,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Pocket Square',
			price: 35.0,
			image:
				'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=100&h=100&fit=crop',
			selected: true,
			href: '/product/5',
		},
	];

	const selectedItems = wishlistItems.filter((item) => item.selected);
	const selectedTotal = selectedItems.reduce(
		(sum, item) => sum + item.price,
		0,
	);

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 py-6 @md:py-8">
				<h1 className="text-lg font-bold mb-4">Select Items</h1>
				<SelectionBar
					selected={selectedItems.length}
					total={wishlistItems.length}
					totalPrice={selectedTotal}
				/>
				<CompactList items={wishlistItems} />
			</div>
		</section>
	);
}
