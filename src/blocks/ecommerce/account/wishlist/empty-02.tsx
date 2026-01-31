import Link from 'next/link';
import { Heart, ShoppingBag, Gift, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SuggestedItem {
	id: string;
	name: string;
	price: number;
	image: string;
	rating: number;
	href: string;
}

interface EmptyProps {
	suggestions: SuggestedItem[];
}

const SuggestionCard = ({ item }: { item: SuggestedItem }) => (
	<div className="group rounded-xl overflow-hidden bg-card border hover:border-primary transition-colors">
		<div className="aspect-square relative overflow-hidden bg-muted">
			<img src={item.image} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform" />
			<Button
				variant="ghost"
				size="icon"
				className="absolute top-2 right-2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<Heart className="size-4" />
			</Button>
		</div>
		<div className="p-3">
			<p className="font-medium text-sm truncate">{item.name}</p>
			<div className="flex items-center gap-1 mt-1">
				<Star className="size-3 fill-amber-400 text-amber-400" />
				<span className="text-xs text-muted-foreground">{item.rating}</span>
			</div>
			<p className="font-bold mt-1">${item.price.toFixed(2)}</p>
		</div>
	</div>
);

export default function Main() {
	const suggestions: SuggestedItem[] = [
		{ id: '1', name: 'Wireless Earbuds', price: 149, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', rating: 4.8, href: '/product/1' },
		{ id: '2', name: 'Smart Watch', price: 299, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop', rating: 4.7, href: '/product/2' },
		{ id: '3', name: 'Leather Wallet', price: 79, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop', rating: 4.9, href: '/product/3' },
		{ id: '4', name: 'Sunglasses', price: 175, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop', rating: 4.6, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8 @md:py-12">
				<div className="text-center mb-12">
					<div className="inline-flex items-center justify-center size-20 rounded-full bg-muted mb-6">
						<ShoppingBag className="size-10 text-muted-foreground" />
					</div>
					<h1 className="text-2xl font-bold">Nothing saved yet</h1>
					<p className="text-muted-foreground mt-2">
						When you find something you love, tap the{' '}
						<Heart className="inline size-4 text-primary fill-primary" /> to save it here.
					</p>
				</div>

				<div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-6 @md:p-8 mb-12">
					<div className="flex flex-col @md:flex-row items-center gap-6">
						<div className="flex-shrink-0">
							<div className="size-16 rounded-full bg-primary/20 flex items-center justify-center">
								<Gift className="size-8 text-primary" />
							</div>
						</div>
						<div className="flex-1 text-center @md:text-left">
							<h2 className="text-lg font-bold">Create a gift wishlist</h2>
							<p className="text-muted-foreground text-sm mt-1">
								Share your wishlist with friends and family for special occasions.
							</p>
						</div>
						<Button className="gap-2">
							<Sparkles className="size-4" />
							Create Wishlist
						</Button>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-bold">You might like</h2>
						<Button variant="ghost" size="sm">See All</Button>
					</div>
					<div className="grid grid-cols-2 @sm:grid-cols-4 gap-4">
						{suggestions.map((item) => (
							<SuggestionCard key={item.id} item={item} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
