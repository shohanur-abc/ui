import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Calendar,
	MapPin,
	ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Occasion {
	name: string;
	date: string;
	daysAway: number;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
	occasion?: Occasion;
	location?: string;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-40',
	medium: 'h-56',
	tall: 'h-72',
};

const OccasionBadge = ({ occasion }: { occasion: Occasion }) => {
	const isUrgent = occasion.daysAway <= 7;
	return (
		<Badge
			className={`gap-1 ${isUrgent ? 'bg-destructive text-destructive-foreground' : 'bg-primary'}`}
		>
			<Calendar className="size-3" />
			{occasion.name} - {occasion.daysAway}d
		</Badge>
	);
};

const LocationBadge = ({ location }: { location: string }) => (
	<Badge variant="outline" className="gap-1 bg-background/80 backdrop-blur-sm">
		<MapPin className="size-3" />
		{location}
	</Badge>
);

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card
			className={`overflow-hidden group ${item.occasion?.daysAway && item.occasion.daysAway <= 7 ? 'ring-2 ring-destructive' : ''}`}
		>
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<div className="absolute top-2 left-2 flex flex-col gap-1">
					{item.occasion && <OccasionBadge occasion={item.occasion} />}
					{item.location && <LocationBadge location={item.location} />}
				</div>
				<div className="absolute top-2 right-2 flex flex-col gap-1">
					<Button
						variant="ghost"
						size="icon-sm"
						className="bg-background/80 backdrop-blur-sm"
					>
						<Heart className="size-4 fill-primary text-primary" />
					</Button>
				</div>
				<div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
					<Link href={item.href}>
						<h3 className="font-semibold text-white text-sm line-clamp-1">
							{item.name}
						</h3>
					</Link>
					<span className="font-bold text-white">${item.price.toFixed(2)}</span>
				</div>
			</div>
			<div className="p-2 flex items-center gap-1">
				<Button size="sm" className="flex-1 gap-1 h-8">
					<ShoppingCart className="size-3" />
					Add
				</Button>
				<Button variant="outline" size="icon-sm" className="h-8">
					<ExternalLink className="size-3" />
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					className="h-8 text-destructive hover:text-destructive"
				>
					<X className="size-3" />
				</Button>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @sm:columns-3 @md:columns-4 @xl:columns-5 gap-3">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

const UpcomingEvents = ({ occasions }: { occasions: Occasion[] }) => (
	<div className="flex gap-2 overflow-x-auto pb-2 mb-6">
		{occasions.map((occasion, i) => (
			<Card
				key={i}
				className={`flex-shrink-0 p-2.5 ${occasion.daysAway <= 7 ? 'border-destructive' : ''}`}
			>
				<div className="flex items-center gap-2">
					<div
						className={`size-8 rounded-full flex items-center justify-center ${occasion.daysAway <= 7 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}
					>
						<Calendar className="size-4" />
					</div>
					<div>
						<p className="text-sm font-medium">{occasion.name}</p>
						<p className="text-xs text-muted-foreground">
							{occasion.daysAway} days away
						</p>
					</div>
				</div>
			</Card>
		))}
	</div>
);

export default function Main() {
	const occasions: Occasion[] = [
		{ name: "Mom's Birthday", date: 'Nov 15', daysAway: 5 },
		{ name: 'Christmas', date: 'Dec 25', daysAway: 45 },
		{ name: 'Anniversary', date: 'Jan 10', daysAway: 61 },
	];

	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Cashmere Scarf',
			price: 125.0,
			image:
				'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
			height: 'medium',
			occasion: { name: 'Birthday', date: 'Nov 15', daysAway: 5 },
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Perfume Set',
			price: 95.0,
			image:
				'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=350&fit=crop',
			height: 'short',
			occasion: { name: 'Christmas', date: 'Dec 25', daysAway: 45 },
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Jewelry Box',
			price: 189.0,
			image:
				'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
			height: 'tall',
			location: 'NYC Store',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Watch',
			price: 329.0,
			image:
				'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop',
			height: 'medium',
			occasion: { name: 'Anniversary', date: 'Jan 10', daysAway: 61 },
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Candle Set',
			price: 65.0,
			image:
				'https://images.unsplash.com/photo-1602874801007-b88e6c4a5b1e?w=400&h=300&fit=crop',
			height: 'short',
			location: 'Online Only',
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Leather Wallet',
			price: 149.0,
			image:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=450&fit=crop',
			height: 'tall',
			occasion: { name: 'Birthday', date: 'Nov 15', daysAway: 5 },
			href: '/product/6',
		},
		{
			id: '7',
			name: 'Silk Pillowcase',
			price: 79.0,
			image:
				'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=350&fit=crop',
			height: 'medium',
			href: '/product/7',
		},
		{
			id: '8',
			name: 'Tea Set',
			price: 120.0,
			image:
				'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
			height: 'short',
			location: 'LA Store',
			href: '/product/8',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-4">Gift Planner</h1>
				<UpcomingEvents occasions={occasions} />
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
