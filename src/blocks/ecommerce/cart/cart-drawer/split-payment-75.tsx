'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { CreditCard, Minus, Plus, ShoppingBag, Split, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface PaymentMethod {
	id: string;
	name: string;
	last4: string;
	type: string;
}

interface SplitConfig {
	method1: PaymentMethod;
	method2: PaymentMethod;
	splitPercentage: number;
}

interface CartDrawerProps {
	title: string;
	splitLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	splitConfig: SplitConfig;
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const SplitPaymentSection = ({
	label,
	config,
	total,
}: {
	label: string;
	config: SplitConfig;
	total: number;
}) => {
	const amount1 = total * (config.splitPercentage / 100);
	const amount2 = total - amount1;

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Split className="size-4 text-muted-foreground" />
				<span className="font-medium">{label}</span>
			</div>
			<div className="space-y-3">
				<div className="rounded-lg border border-primary p-3 space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<CreditCard className="size-4 text-muted-foreground" />
							<span className="text-sm font-medium">{config.method1.name}</span>
							<span className="text-xs text-muted-foreground">
								•••• {config.method1.last4}
							</span>
						</div>
						<span className="font-bold">${amount1.toFixed(2)}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">
							{config.splitPercentage}%
						</span>
						<Slider
							value={[config.splitPercentage]}
							max={100}
							step={5}
							className="flex-1"
						/>
					</div>
				</div>
				<div className="rounded-lg border border-input p-3 space-y-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<CreditCard className="size-4 text-muted-foreground" />
							<span className="text-sm font-medium">{config.method2.name}</span>
							<span className="text-xs text-muted-foreground">
								•••• {config.method2.last4}
							</span>
						</div>
						<span className="font-bold">${amount2.toFixed(2)}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">
							{100 - config.splitPercentage}%
						</span>
						<div className="flex-1 h-2 bg-muted rounded-full">
							<div
								className="h-full bg-primary rounded-full"
								style={{ width: `${100 - config.splitPercentage}%` }}
							/>
						</div>
					</div>
				</div>
			</div>
			<Button variant="outline" size="sm" className="w-full">
				<Plus className="mr-2 size-4" />
				Add Payment Method
			</Button>
		</div>
	);
};

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
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
			<Split className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		splitLabel: 'Split Payment',
		checkoutLabel: 'Pay with Split',
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
		splitConfig: {
			method1: { id: '1', name: 'Visa', last4: '4242', type: 'credit' },
			method2: { id: '2', name: 'Mastercard', last4: '8888', type: 'debit' },
			splitPercentage: 60,
		},
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
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<SplitPaymentSection
								label={cartData.splitLabel}
								config={cartData.splitConfig}
								total={total}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
