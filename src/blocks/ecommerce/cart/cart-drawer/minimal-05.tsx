'use client';

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
import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	title: string;
	emptyMessage: string;
	checkoutLabel: string;
	viewCartLabel: string;
	items: CartItem[];
}

const IconTrigger = ({ count }: { count: number }) => (
	<Button size="icon" variant="ghost" className="relative">
		<ShoppingBag className="size-5" />
		{count > 0 && (
			<span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
				{count}
			</span>
		)}
	</Button>
);

const SimpleItem = ({ item }: { item: CartItem }) => (
	<div className="group flex items-center gap-4 py-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="min-w-0 flex-1">
			<h4 className="truncate text-sm font-medium text-foreground">
				{item.name}
			</h4>
			<p className="mt-1 text-sm text-muted-foreground">
				{item.quantity} × ${item.price.toFixed(2)}
			</p>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-sm font-semibold">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<Button
				size="icon-sm"
				variant="ghost"
				className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
			>
				<X className="size-3" />
			</Button>
		</div>
	</div>
);

const EmptyMessage = ({ message }: { message: string }) => (
	<div className="flex flex-1 items-center justify-center">
		<p className="text-sm text-muted-foreground">{message}</p>
	</div>
);

const FooterActions = ({
	total,
	checkoutLabel,
	viewCartLabel,
}: {
	total: number;
	checkoutLabel: string;
	viewCartLabel: string;
}) => (
	<div className="space-y-4 pt-4">
		<Separator />
		<div className="flex items-center justify-between py-2">
			<span className="text-base font-medium">Subtotal</span>
			<span className="text-xl font-bold">${total.toFixed(2)}</span>
		</div>
		<div className="grid grid-cols-2 gap-3">
			<Button variant="outline">{viewCartLabel}</Button>
			<Button className="gap-2">
				{checkoutLabel}
				<ArrowRight className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Bag',
		emptyMessage: 'Your bag is empty',
		checkoutLabel: 'Checkout',
		viewCartLabel: 'View Cart',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1491553895911-0055uj8g27j?w=200&h=200&fit=crop',
				name: 'Minimalist Watch',
				price: 195.00,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
				name: 'Leather Wallet',
				price: 75.00,
				quantity: 1,
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&h=200&fit=crop',
				name: 'Canvas Tote Bag',
				price: 45.00,
				quantity: 2,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<IconTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle className="text-lg">{cartData.title}</SheetTitle>
						</SheetHeader>
						{cartData.items.length === 0 ? (
							<EmptyMessage message={cartData.emptyMessage} />
						) : (
							<>
								<ScrollArea className="flex-1 -mx-6 px-6">
									<div className="divide-y divide-border">
										{cartData.items.map((item) => (
											<SimpleItem key={item.id} item={item} />
										))}
									</div>
								</ScrollArea>
								<FooterActions
									total={total}
									checkoutLabel={cartData.checkoutLabel}
									viewCartLabel={cartData.viewCartLabel}
								/>
							</>
						)}
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
