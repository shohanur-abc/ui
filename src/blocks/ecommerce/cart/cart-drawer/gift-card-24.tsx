'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Gift, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface GiftCardData {
	enabled: boolean;
	recipientName: string;
	recipientEmail: string;
	message: string;
}

interface CartDrawerProps {
	title: string;
	giftCardTitle: string;
	recipientNameLabel: string;
	recipientEmailLabel: string;
	messageLabel: string;
	messagePlaceholder: string;
	checkoutLabel: string;
	items: CartItem[];
	giftCard: GiftCardData;
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

const CartItem = ({ item }: { item: CartItem }) => (
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

const GiftCardForm = ({
	title,
	giftCard,
	recipientNameLabel,
	recipientEmailLabel,
	messageLabel,
	messagePlaceholder,
}: {
	title: string;
	giftCard: GiftCardData;
	recipientNameLabel: string;
	recipientEmailLabel: string;
	messageLabel: string;
	messagePlaceholder: string;
}) => (
	<Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5 p-4">
		<div className="flex items-center gap-2 mb-4">
			<Gift className="size-5 text-primary" />
			<h3 className="font-medium">{title}</h3>
			<Badge variant="secondary">Gift</Badge>
		</div>
		<div className="space-y-3">
			<div>
				<label className="text-xs text-muted-foreground">
					{recipientNameLabel}
				</label>
				<Input
					placeholder="John Doe"
					defaultValue={giftCard.recipientName}
					className="mt-1"
				/>
			</div>
			<div>
				<label className="text-xs text-muted-foreground">
					{recipientEmailLabel}
				</label>
				<Input
					type="email"
					placeholder="john@example.com"
					defaultValue={giftCard.recipientEmail}
					className="mt-1"
				/>
			</div>
			<div>
				<label className="text-xs text-muted-foreground">{messageLabel}</label>
				<Textarea
					placeholder={messagePlaceholder}
					defaultValue={giftCard.message}
					className="mt-1 min-h-[80px]"
				/>
			</div>
		</div>
	</Card>
);

const OrderTotal = ({
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
		<Button className="w-full gap-2" size="lg">
			<Gift className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Gift Order',
		giftCardTitle: 'Gift Card Details',
		recipientNameLabel: "Recipient's Name",
		recipientEmailLabel: "Recipient's Email",
		messageLabel: 'Personal Message',
		messagePlaceholder: 'Write a heartfelt message...',
		checkoutLabel: 'Send as Gift',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Luxury Watch',
				price: 599.99,
				quantity: 1,
			},
		],
		giftCard: {
			enabled: true,
			recipientName: 'Sarah',
			recipientEmail: 'sarah@example.com',
			message: 'Happy Birthday! Hope you love this!',
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
							<SheetTitle className="flex items-center gap-2">
								<Gift className="size-5 text-primary" />
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<CartItem key={item.id} item={item} />
								))}
							</div>
							<div className="mt-4">
								<GiftCardForm
									title={cartData.giftCardTitle}
									giftCard={cartData.giftCard}
									recipientNameLabel={cartData.recipientNameLabel}
									recipientEmailLabel={cartData.recipientEmailLabel}
									messageLabel={cartData.messageLabel}
									messagePlaceholder={cartData.messagePlaceholder}
								/>
							</div>
						</ScrollArea>
						<OrderTotal total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
