'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { CreditCard, Minus, Plus, ShoppingCart, Truck } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	title: string;
	freeShippingNote: string;
	estimatedDelivery: string;
	paymentMethods: string[];
	subtotalLabel: string;
	shippingLabel: string;
	shippingValue: string;
	totalLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const TriggerButton = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingCart className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const ItemCard = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 rounded-xl bg-muted/30 p-3">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<h4 className="truncate font-medium text-foreground">{item.name}</h4>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
			<div className="mt-auto flex items-center justify-between">
				<div className="flex items-center gap-2 rounded-lg border border-border bg-background px-1.5 py-0.5">
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Minus className="size-2.5" />
					</Button>
					<span className="min-w-[1rem] text-center text-xs font-medium">
						{item.quantity}
					</span>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Plus className="size-2.5" />
					</Button>
				</div>
				<span className="text-sm font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const InfoBanner = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
		<Icon className="size-4 shrink-0 text-primary" />
		<span className="text-xs text-primary">{text}</span>
	</div>
);

const PaymentIcons = ({ methods }: { methods: string[] }) => (
	<div className="flex items-center gap-1">
		{methods.map((method) => (
			<Avatar key={method} className="size-6 rounded-sm">
				<AvatarFallback className="rounded-sm text-[8px]">
					{method.slice(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
		))}
	</div>
);

const Summary = ({
	subtotal,
	subtotalLabel,
	shippingLabel,
	shippingValue,
	totalLabel,
}: {
	subtotal: number;
	subtotalLabel: string;
	shippingLabel: string;
	shippingValue: string;
	totalLabel: string;
}) => (
	<div className="space-y-2 rounded-xl bg-muted/30 p-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">{subtotalLabel}</span>
			<span className="font-medium">${subtotal.toFixed(2)}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">{shippingLabel}</span>
			<span className="font-medium text-primary">{shippingValue}</span>
		</div>
		<Separator className="my-2" />
		<div className="flex justify-between">
			<span className="font-semibold">{totalLabel}</span>
			<span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
		</div>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		freeShippingNote: 'Free shipping on orders over $50',
		estimatedDelivery: 'Estimated delivery: 3-5 business days',
		paymentMethods: ['visa', 'mc', 'amex', 'paypal'],
		subtotalLabel: 'Subtotal',
		shippingLabel: 'Shipping',
		shippingValue: 'Free',
		totalLabel: 'Total',
		checkoutLabel: 'Secure Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=200&h=200&fit=crop',
				name: 'Organic Face Serum',
				variant: '30ml',
				price: 48.00,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop',
				name: 'Hydrating Moisturizer',
				variant: '50ml',
				price: 36.00,
				quantity: 2,
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<TriggerButton count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<InfoBanner icon={Truck} text={cartData.freeShippingNote} />
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="space-y-3 py-2">
								{cartData.items.map((item) => (
									<ItemCard key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<div className="space-y-4">
							<InfoBanner icon={Truck} text={cartData.estimatedDelivery} />
							<Summary
								subtotal={subtotal}
								subtotalLabel={cartData.subtotalLabel}
								shippingLabel={cartData.shippingLabel}
								shippingValue={cartData.shippingValue}
								totalLabel={cartData.totalLabel}
							/>
							<div className="flex items-center justify-between">
								<span className="text-xs text-muted-foreground">
									We accept
								</span>
								<PaymentIcons methods={cartData.paymentMethods} />
							</div>
							<Button className="w-full gap-2" size="lg">
								<CreditCard className="size-4" />
								{cartData.checkoutLabel}
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
