import Link from 'next/link';
import { Heart, ShoppingCart, X, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StyleMatch {
	score: number;
	tags: string[];
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
	styleMatch: StyleMatch;
	isAISuggested: boolean;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-44',
	medium: 'h-60',
	tall: 'h-76',
};

const StyleMatchBadge = ({ score }: { score: number }) => {
	const color = score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-amber-500' : 'bg-muted';
	return (
		<div className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
			<div className={`size-2 rounded-full ${color}`} />
			<span className="text-xs font-medium">{score}% match</span>
		</div>
	);
};

const StyleTags = ({ tags }: { tags: string[] }) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{tags.slice(0, 3).map((tag, i) => (
			<Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
				{tag}
			</Badge>
		))}
	</div>
);

const AISuggestedBadge = () => (
	<Badge className="gap-1 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0">
		<Sparkles className="size-3" />
		AI Pick
	</Badge>
);

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card className={`overflow-hidden group ${item.isAISuggested ? 'ring-1 ring-violet-500/30' : ''}`}>
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img src={item.image} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
				<div className="absolute top-2 left-2 flex flex-col gap-1">
					{item.isAISuggested && <AISuggestedBadge />}
				</div>
				<Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				<div className="absolute bottom-2 right-2">
					<StyleMatchBadge score={item.styleMatch.score} />
				</div>
			</div>
			<div className="p-3">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href} className="flex-1">
						<h3 className="font-medium text-sm line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<Button variant="ghost" size="icon-sm" className="flex-shrink-0 text-destructive hover:text-destructive size-6">
						<X className="size-3" />
					</Button>
				</div>
				<StyleTags tags={item.styleMatch.tags} />
				<div className="flex items-center justify-between mt-3">
					<span className="font-bold">${item.price.toFixed(2)}</span>
					<Button size="sm" className="gap-1 h-7">
						<ShoppingCart className="size-3" />
						Add
					</Button>
				</div>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @md:columns-3 @xl:columns-4 gap-4">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

const AIStyleHeader = () => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-violet-500/20 mb-6">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
					<Wand2 className="size-5 text-white" />
				</div>
				<div>
					<p className="font-medium">Your Style Profile</p>
					<p className="text-sm text-muted-foreground">Curated picks based on your preferences</p>
				</div>
			</div>
			<Button variant="outline" size="sm" className="gap-1">
				<RefreshCw className="size-3" />
				Update Profile
			</Button>
		</div>
		<div className="grid grid-cols-3 gap-4 mt-4">
			<div className="text-center">
				<p className="text-2xl font-bold text-primary">Minimalist</p>
				<p className="text-xs text-muted-foreground">Primary Style</p>
			</div>
			<div className="text-center">
				<p className="text-2xl font-bold">Earth Tones</p>
				<p className="text-xs text-muted-foreground">Color Palette</p>
			</div>
			<div className="text-center">
				<p className="text-2xl font-bold">92%</p>
				<p className="text-xs text-muted-foreground">Avg Match</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Linen Blend Blazer', price: 189.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop', height: 'tall', styleMatch: { score: 98, tags: ['Minimalist', 'Earth Tones', 'Classic'] }, isAISuggested: true, href: '/product/1' },
		{ id: '2', name: 'Cotton Trousers', price: 89.00, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=350&fit=crop', height: 'medium', styleMatch: { score: 94, tags: ['Casual', 'Neutral'] }, isAISuggested: false, href: '/product/2' },
		{ id: '3', name: 'Leather Loafers', price: 165.00, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=300&fit=crop', height: 'short', styleMatch: { score: 91, tags: ['Classic', 'Leather'] }, isAISuggested: true, href: '/product/3' },
		{ id: '4', name: 'Merino Sweater', price: 125.00, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', height: 'medium', styleMatch: { score: 96, tags: ['Cozy', 'Earth Tones'] }, isAISuggested: true, href: '/product/4' },
		{ id: '5', name: 'Canvas Tote', price: 75.00, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=450&fit=crop', height: 'tall', styleMatch: { score: 88, tags: ['Minimalist', 'Casual'] }, isAISuggested: false, href: '/product/5' },
		{ id: '6', name: 'Wool Beanie', price: 45.00, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=280&fit=crop', height: 'short', styleMatch: { score: 82, tags: ['Winter', 'Casual'] }, isAISuggested: false, href: '/product/6' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-2 mb-6">
					<Sparkles className="size-7 text-violet-500" />
					<h1 className="text-2xl @md:text-3xl font-bold">Style Match</h1>
				</div>
				<AIStyleHeader />
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
