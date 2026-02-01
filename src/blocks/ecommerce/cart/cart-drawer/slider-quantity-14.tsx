'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	maxQuantity: number;
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	items: CartItem[];
}

const SliderTrigger = ({ count, total }: { count: number; total: number }) => (
	<Button className="gap-3">
		<ShoppingCart className="size-4" />
		<span>{count} items</span>
		<span className="font-bold">${total.toFixed(2)}</span>
	</Button>
);

const SliderQuantity = ({
	quantity,
	max,
}: {
	quantity: number;
	max: number;
}) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-xs">
			<span className="text-muted-foreground">Quantity</span>
			<Badge variant="secondary">{quantity}</Badge>
		</div>
		<Slider
			defaultValue={[quantity]}
			min={1}
			max={max}
			step={1}
			className="w-full"
		/>
	</div>
);

const SliderItem = ({ item }: { item: CartItem }) => (
	<div className="space-y-3 rounded-xl border border-border p-4">
		<div className="flex gap-3">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h4 className="truncate font-medium">{item.name}</h4>
						<p className="text-xs text-muted-foreground">{item.variant}</p>
					</div>
					<Button size="icon-sm" variant="ghost" className="size-6 shrink-0">
						<Trash2 className="size-3 text-muted-foreground" />
					</Button>
				</div>
				<p className="mt-1 font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
		</div>
		<SliderQuantity quantity={item.quantity} max={item.maxQuantity} />
	</div>
);

const CheckoutButton = ({ total, label }: { total: number; label: string }) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex items-center justify-between text-lg">
			<span>Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{label}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Proceed to Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop',
				name: 'Running Shoes Ultra',
				variant: 'Black / US 10',
				price: 189.99,
				quantity: 2,
				maxQuantity: 10,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=200&h=200&fit=crop',
				name: 'Athletic Shorts',
				variant: 'Navy / M',
				price: 45.0,
				quantity: 3,
				maxQuantity: 15,
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop',
				name: 'Performance Tee',
				variant: 'White / L',
				price: 35.0,
				quantity: 5,
				maxQuantity: 20,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<SliderTrigger count={itemCount} total={total} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="space-y-4 py-4">
								{cartData.items.map((item) => (
									<SliderItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<CheckoutButton total={total} label={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
