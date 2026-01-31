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
import { ChevronRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
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
	itemCountLabel: string;
	subtotalLabel: string;
	taxLabel: string;
	totalLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	taxRate: number;
}

const TriggerIcon = ({ count }: { count: number }) => (
	<Button size="icon" variant="ghost" className="relative">
		<ShoppingBag className="size-5" />
		{count > 0 && (
			<Badge className="absolute -right-1 -top-1 size-4 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const MiniProduct = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-2">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="min-w-0 flex-1">
			<h4 className="truncate text-sm font-medium">{item.name}</h4>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<span>Qty: {item.quantity}</span>
				<span>•</span>
				<span className="font-medium text-foreground">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
		<Button size="icon-sm" variant="ghost" className="size-6 shrink-0">
			<X className="size-3" />
		</Button>
	</div>
);

const QuickQuantity = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-0.5 text-xs">
		<Button size="icon-sm" variant="ghost" className="size-5">
			<Minus className="size-2.5" />
		</Button>
		<span className="w-4 text-center">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-5">
			<Plus className="size-2.5" />
		</Button>
	</div>
);

const PriceLine = ({
	label,
	value,
	bold = false,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div className={`flex justify-between text-sm ${bold ? 'font-bold' : ''}`}>
		<span className={bold ? 'text-foreground' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={bold ? 'text-primary' : 'text-foreground'}>{value}</span>
	</div>
);

const CartFooter = ({
	subtotalLabel,
	subtotal,
	taxLabel,
	tax,
	totalLabel,
	total,
	checkoutLabel,
}: {
	subtotalLabel: string;
	subtotal: number;
	taxLabel: string;
	tax: number;
	totalLabel: string;
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 pt-4">
		<PriceLine label={subtotalLabel} value={`$${subtotal.toFixed(2)}`} />
		<PriceLine label={taxLabel} value={`$${tax.toFixed(2)}`} />
		<Separator />
		<PriceLine label={totalLabel} value={`$${total.toFixed(2)}`} bold />
		<Button className="w-full gap-2" size="sm">
			{checkoutLabel}
			<ChevronRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Cart',
		itemCountLabel: 'items',
		subtotalLabel: 'Subtotal',
		taxLabel: 'Tax',
		totalLabel: 'Total',
		checkoutLabel: 'Checkout',
		taxRate: 0.08,
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds Pro',
				price: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop',
				name: 'Smart Watch Series 5',
				price: 299.99,
				quantity: 1,
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
				name: 'Over-Ear Headphones',
				price: 199.99,
				quantity: 2,
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const tax = subtotal * cartData.taxRate;
	const total = subtotal + tax;
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<TriggerIcon count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-80 flex-col p-4">
						<SheetHeader className="pb-2">
							<SheetTitle className="flex items-center justify-between text-base">
								<span>{cartData.title}</span>
								<Badge variant="outline" className="font-normal">
									{itemCount} {cartData.itemCountLabel}
								</Badge>
							</SheetTitle>
						</SheetHeader>
						<Separator />
						<ScrollArea className="flex-1 -mx-4 px-4">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<MiniProduct key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<CartFooter
							subtotalLabel={cartData.subtotalLabel}
							subtotal={subtotal}
							taxLabel={cartData.taxLabel}
							tax={tax}
							totalLabel={cartData.totalLabel}
							total={total}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
