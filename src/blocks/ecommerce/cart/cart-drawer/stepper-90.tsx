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
import { Check, Minus, Plus, ShoppingBag, X } from 'lucide-react';
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
	checkoutLabel: string;
	items: CartItem[];
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative size-12">
		<ShoppingBag className="size-5" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-6 rounded-full p-0 text-xs">
				{count}
			</Badge>
		)}
	</Button>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium text-sm">{item.name}</h4>
				<Button size="icon" variant="ghost" className="size-6">
					<X className="size-3.5" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
					<Button size="icon" variant="ghost" className="size-6 rounded-full">
						<Minus className="size-3" />
					</Button>
					<span className="w-5 text-center text-sm font-medium">
						{item.quantity}
					</span>
					<Button size="icon" variant="ghost" className="size-6 rounded-full">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="font-bold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const CheckoutStep = ({
	step,
	label,
	isActive,
	isComplete,
}: {
	step: number;
	label: string;
	isActive: boolean;
	isComplete: boolean;
}) => (
	<div className="flex flex-col items-center gap-1">
		<div
			className={`size-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
				isComplete
					? 'bg-primary text-primary-foreground'
					: isActive
						? 'bg-primary text-primary-foreground'
						: 'bg-muted text-muted-foreground'
			}`}
		>
			{isComplete ? <Check className="size-4" /> : step}
		</div>
		<span
			className={`text-xs ${isActive || isComplete ? 'font-medium' : 'text-muted-foreground'}`}
		>
			{label}
		</span>
	</div>
);

const CheckoutStepper = () => (
	<div className="flex items-center justify-between px-8 py-4 bg-muted/50 rounded-xl">
		<CheckoutStep step={1} label="Cart" isActive={true} isComplete={false} />
		<div className="flex-1 h-0.5 bg-muted mx-2" />
		<CheckoutStep
			step={2}
			label="Shipping"
			isActive={false}
			isComplete={false}
		/>
		<div className="flex-1 h-0.5 bg-muted mx-2" />
		<CheckoutStep step={3} label="Pay" isActive={false} isComplete={false} />
	</div>
);

const Summary = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4 pb-safe">
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Continue to Shipping',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 1,
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
						<CartTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle className="text-xl">{cartData.title}</SheetTitle>
						</SheetHeader>
						<CheckoutStepper />
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
