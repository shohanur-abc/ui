'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	color: string;
	size: string;
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	triggerLabel: string;
	title: string;
	emptyTitle: string;
	emptyDescription: string;
	continueShoppingLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const FloatingTrigger = ({
	label,
	count,
}: {
	label: string;
	count: number;
}) => (
	<Button className="gap-2 shadow-lg">
		<ShoppingCart className="size-4" />
		{label}
		{count > 0 && (
			<span className="ml-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs">
				{count}
			</span>
		)}
	</Button>
);

const ProductThumbnail = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductMeta = ({
	name,
	color,
	size,
}: {
	name: string;
	color: string;
	size: string;
}) => (
	<div className="space-y-1">
		<h4 className="font-medium text-foreground leading-tight">{name}</h4>
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<span>{color}</span>
			<span>•</span>
			<span>{size}</span>
		</div>
	</div>
);

const PriceDisplay = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<div className="text-right">
		<p className="text-sm font-bold text-foreground">
			${(price * quantity).toFixed(2)}
		</p>
		{quantity > 1 && (
			<p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
		)}
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-1 py-0.5">
		<Button size="icon-sm" variant="ghost" className="size-6 rounded-full">
			<Minus className="size-3" />
		</Button>
		<span className="min-w-[1.5rem] text-center text-sm font-medium">
			{quantity}
		</span>
		<Button size="icon-sm" variant="ghost" className="size-6 rounded-full">
			<Plus className="size-3" />
		</Button>
	</div>
);

const DeleteButton = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="size-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
	>
		<Trash2 className="size-4" />
	</Button>
);

const CartProduct = ({ item }: { item: CartItem }) => (
	<div className="group relative rounded-xl bg-card/50 p-3 transition-colors hover:bg-card">
		<div className="flex gap-3">
			<ProductThumbnail src={item.image} alt={item.name} />
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div className="flex items-start justify-between gap-2">
					<ProductMeta name={item.name} color={item.color} size={item.size} />
					<PriceDisplay price={item.price} quantity={item.quantity} />
				</div>
				<div className="flex items-center justify-between">
					<QuantityControl quantity={item.quantity} />
					<DeleteButton />
				</div>
			</div>
		</div>
	</div>
);

const EmptyState = ({
	title,
	description,
	actionLabel,
}: {
	title: string;
	description: string;
	actionLabel: string;
}) => (
	<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
		<div className="relative">
			<div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
			<div className="relative rounded-full bg-muted p-6">
				<ShoppingCart className="size-10 text-muted-foreground" />
			</div>
		</div>
		<div className="space-y-2">
			<h3 className="text-lg font-semibold text-foreground">{title}</h3>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<Button variant="outline" className="gap-2">
			{actionLabel}
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

const OrderSummary = ({
	items,
	checkoutLabel,
}: {
	items: CartItem[];
	checkoutLabel: string;
}) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shipping = subtotal > 100 ? 0 : 9.99;
	const total = subtotal + shipping;

	return (
		<div className="space-y-4 rounded-xl bg-muted/50 p-4">
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<span className="font-medium">${subtotal.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Shipping</span>
					<span className="font-medium">
						{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
					</span>
				</div>
			</div>
			<div className="border-t border-border pt-2">
				<div className="flex justify-between">
					<span className="font-semibold">Total</span>
					<span className="text-lg font-bold text-primary">
						${total.toFixed(2)}
					</span>
				</div>
			</div>
			<Button className="w-full gap-2" size="lg">
				{checkoutLabel}
				<ArrowRight className="size-4" />
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		triggerLabel: 'View Cart',
		title: 'Your Cart',
		emptyTitle: 'Your cart is empty',
		emptyDescription: "Looks like you haven't added anything yet.",
		continueShoppingLabel: 'Continue Shopping',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
				name: 'Running Sneakers Pro',
				color: 'Ocean Blue',
				size: 'US 10',
				price: 159.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Classic Canvas',
				color: 'Off White',
				size: 'US 9',
				price: 89.99,
				quantity: 2,
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<FloatingTrigger
							label={cartData.triggerLabel}
							count={cartData.items.length}
						/>
					</SheetTrigger>
					<SheetContent
						side="left"
						className="flex w-full flex-col sm:max-w-lg"
					>
						<SheetHeader>
							<SheetTitle className="text-xl">{cartData.title}</SheetTitle>
						</SheetHeader>
						{cartData.items.length === 0 ? (
							<EmptyState
								title={cartData.emptyTitle}
								description={cartData.emptyDescription}
								actionLabel={cartData.continueShoppingLabel}
							/>
						) : (
							<>
								<ScrollArea className="flex-1 -mx-4 px-4">
									<div className="space-y-3 py-4">
										{cartData.items.map((item) => (
											<CartProduct key={item.id} item={item} />
										))}
									</div>
								</ScrollArea>
								<OrderSummary
									items={cartData.items}
									checkoutLabel={cartData.checkoutLabel}
								/>
							</>
						)}
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
