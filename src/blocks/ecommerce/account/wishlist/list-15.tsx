import Link from 'next/link';
import { Heart, ShoppingCart, X, Gift, Calendar, Sparkles, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Occasion {
	name: string;
	date: string;
	daysUntil: number;
	icon: 'gift' | 'calendar' | 'party';
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	occasion?: Occasion;
	recipient?: string;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const OccasionIcon = ({ type }: { type: 'gift' | 'calendar' | 'party' }) => {
	const icons = { gift: Gift, calendar: Calendar, party: PartyPopper };
	const Icon = icons[type];
	return <Icon className="size-4" />;
};

const OccasionBadge = ({ occasion }: { occasion: Occasion }) => (
	<div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20 mt-2">
		<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
			<OccasionIcon type={occasion.icon} />
		</div>
		<div className="flex-1">
			<p className="text-sm font-medium">{occasion.name}</p>
			<p className="text-xs text-muted-foreground">{occasion.date}</p>
		</div>
		<Badge variant={occasion.daysUntil <= 7 ? 'destructive' : 'secondary'}>
			{occasion.daysUntil} days
		</Badge>
	</div>
);

const RecipientBadge = ({ name }: { name: string }) => (
	<Badge variant="outline" className="gap-1 text-xs">
		<Gift className="size-3" />
		For {name}
	</Badge>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card className="p-4">
		<div className="flex gap-4">
			<div className="relative size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				{item.recipient && (
					<div className="absolute top-1 left-1 size-6 rounded-full bg-primary flex items-center justify-center">
						<Gift className="size-3 text-primary-foreground" />
					</div>
				)}
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<div className="flex items-center gap-2 flex-wrap">
							<Link href={item.href}>
								<h3 className="font-semibold hover:text-primary transition-colors">{item.name}</h3>
							</Link>
							{item.recipient && <RecipientBadge name={item.recipient} />}
						</div>
						{item.occasion && <OccasionBadge occasion={item.occasion} />}
					</div>
					<Button variant="ghost" size="icon-sm" className="text-destructive">
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-3">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					<Button size="sm" className="gap-1.5">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-4">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const UpcomingOccasions = ({ occasions }: { occasions: Occasion[] }) => (
	<div className="mb-6">
		<h2 className="text-sm font-medium mb-3">Upcoming Occasions</h2>
		<div className="flex gap-3 overflow-x-auto pb-2">
			{occasions.map((occasion, i) => (
				<Card key={i} className="flex-shrink-0 p-3 min-w-[150px]">
					<div className="flex items-center gap-2">
						<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
							<OccasionIcon type={occasion.icon} />
						</div>
						<div>
							<p className="text-sm font-medium">{occasion.name}</p>
							<p className="text-xs text-muted-foreground">{occasion.daysUntil} days away</p>
						</div>
					</div>
				</Card>
			))}
		</div>
	</div>
);

export default function Main() {
	const occasions: Occasion[] = [
		{ name: "Mom's Birthday", date: 'Nov 15', daysUntil: 12, icon: 'party' },
		{ name: 'Christmas', date: 'Dec 25', daysUntil: 52, icon: 'gift' },
		{ name: 'Anniversary', date: 'Jan 10', daysUntil: 68, icon: 'calendar' },
	];

	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Cashmere Wrap Scarf', price: 129.00, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop', recipient: 'Mom', occasion: { name: "Mom's Birthday", date: 'Nov 15', daysUntil: 12, icon: 'party' }, href: '/product/1' },
		{ id: '2', name: 'Leather Journal Set', price: 65.00, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop', recipient: 'Dad', occasion: { name: 'Christmas', date: 'Dec 25', daysUntil: 52, icon: 'gift' }, href: '/product/2' },
		{ id: '3', name: 'Wireless Earbuds', price: 199.00, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop', href: '/product/3' },
		{ id: '4', name: 'Silk Tie Collection', price: 89.00, image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=200&h=200&fit=crop', recipient: 'Partner', occasion: { name: 'Anniversary', date: 'Jan 10', daysUntil: 68, icon: 'calendar' }, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-2 mb-6">
					<Gift className="size-7 text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Gift Planner</h1>
				</div>
				<UpcomingOccasions occasions={occasions} />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
