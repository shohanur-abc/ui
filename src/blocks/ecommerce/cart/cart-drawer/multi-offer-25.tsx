'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Check, Minus, Plus, ShoppingBag, Tag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	appliedOffer?: string;
}

interface AvailableOffer {
	id: string;
	code: string;
	description: string;
	minPurchase?: number;
	maxDiscount?: number;
}

interface CartDrawerProps {
	title: string;
	offersTitle: string;
	checkoutLabel: string;
	items: CartItem[];
	availableOffers: AvailableOffer[];
}

const CartIcon = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const ItemWithOffer = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					{item.appliedOffer && (
						<Badge variant="secondary" className="mt-1 text-[10px]">
							<Tag className="mr-1 size-2.5" />
							{item.appliedOffer}
						</Badge>
					)}
				</div>
				<Button size="icon-sm" variant="ghost" className="size-5">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 rounded border border-border">
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Minus className="size-2.5" />
					</Button>
					<span className="w-5 text-center text-xs">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Plus className="size-2.5" />
					</Button>
				</div>
				<span className="text-sm font-medium">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const OfferCard = ({
	offer,
	isApplied,
}: {
	offer: AvailableOffer;
	isApplied: boolean;
}) => (
	<div
		className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
			isApplied ? 'border-primary bg-primary/5' : 'border-dashed border-border'
		}`}
	>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<Tag className={`size-4 ${isApplied ? 'text-primary' : 'text-muted-foreground'}`} />
				<span className="font-mono text-sm font-medium">{offer.code}</span>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">{offer.description}</p>
			{offer.minPurchase && (
				<p className="text-xs text-muted-foreground">
					Min. purchase: ${offer.minPurchase}
				</p>
			)}
		</div>
		<Button
			variant={isApplied ? 'default' : 'outline'}
			size="sm"
			className="shrink-0"
		>
			{isApplied ? (
				<>
					<Check className="mr-1 size-3" />
					Applied
				</>
			) : (
				'Apply'
			)}
		</Button>
	</div>
);

const OffersSection = ({
	title,
	offers,
	appliedOffers,
}: {
	title: string;
	offers: AvailableOffer[];
	appliedOffers: string[];
}) => (
	<div className="space-y-3">
		<h3 className="flex items-center gap-2 text-sm font-medium">
			<Tag className="size-4" />
			{title}
		</h3>
		<div className="space-y-2">
			{offers.map((offer) => (
				<OfferCard
					key={offer.id}
					offer={offer}
					isApplied={appliedOffers.includes(offer.code)}
				/>
			))}
		</div>
	</div>
);

const Summary = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		offersTitle: 'Available Offers',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
				appliedOffer: 'FIRST10',
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Casual Sneakers',
				price: 89.99,
				quantity: 1,
			},
		],
		availableOffers: [
			{
				id: '1',
				code: 'FIRST10',
				description: '10% off your first order',
			},
			{
				id: '2',
				code: 'BUNDLE20',
				description: '20% off when you buy 3+ items',
				minPurchase: 200,
			},
			{
				id: '3',
				code: 'FREESHIP',
				description: 'Free shipping on orders over $100',
				minPurchase: 100,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
	const appliedOffers = cartData.items
		.filter((item) => item.appliedOffer)
		.map((item) => item.appliedOffer!);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<CartIcon count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemWithOffer key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<OffersSection
								title={cartData.offersTitle}
								offers={cartData.availableOffers}
								appliedOffers={appliedOffers}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
