import Link from 'next/link';
import { Heart, ShoppingCart, X, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	notes?: string;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const ItemNotes = ({ notes, itemId }: { notes?: string; itemId: string }) => (
	<div className="mt-3 pt-3 border-t">
		<div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
			<MessageSquare className="size-3" />
			<span>Personal Notes</span>
		</div>
		{notes ? (
			<p className="text-sm bg-muted/50 p-2 rounded-lg">{notes}</p>
		) : (
			<div className="flex gap-2">
				<Textarea
					placeholder="Add a note (size, color preference, gift for...)"
					className="min-h-[60px] text-sm resize-none"
				/>
				<Button size="icon" variant="ghost">
					<Send className="size-4" />
				</Button>
			</div>
		)}
	</div>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card className="p-4">
		<div className="flex gap-4">
			<div className="relative size-20 @sm:size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<Heart className="absolute top-2 left-2 size-4 fill-primary text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
							{item.name}
						</h3>
					</Link>
					<Button variant="ghost" size="icon-sm" className="text-destructive">
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-2">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					<Button size="sm" className="gap-1.5">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
		<ItemNotes notes={item.notes} itemId={item.id} />
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-4">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const NotesHint = () => (
	<div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20 mb-6">
		<MessageSquare className="size-5 text-primary" />
		<div>
			<p className="font-medium">Add Personal Notes</p>
			<p className="text-sm text-muted-foreground">
				Keep track of sizes, colors, or gift ideas
			</p>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Merino Wool Cardigan',
			price: 145.0,
			image:
				'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop',
			notes: 'Size M, prefer the navy color. Birthday gift for Mom.',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Leather Crossbody Bag',
			price: 189.0,
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop',
			notes: 'Wait for 20% off sale',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Silk Scarf Collection',
			price: 79.0,
			image:
				'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Cashmere Beanie',
			price: 65.0,
			image:
				'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=200&h=200&fit=crop',
			notes: 'Christmas gift for Jake',
			href: '/product/4',
		},
	];

	const notesCount = wishlistItems.filter((item) => item.notes).length;

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl @md:text-3xl font-bold">
						Wishlist with Notes
					</h1>
					<Badge variant="secondary">{notesCount} with notes</Badge>
				</div>
				<NotesHint />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
