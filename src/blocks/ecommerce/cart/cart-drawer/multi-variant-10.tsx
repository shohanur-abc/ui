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
import { ArrowRight, Check, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	images: string[];
	name: string;
	options: { label: string; value: string }[];
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	title: string;
	continueLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const TriggerPill = ({ count, total }: { count: number; total: number }) => (
	<Button variant="secondary" className="gap-3 rounded-full px-4">
		<ShoppingBag className="size-4" />
		<span className="text-sm font-medium">{count} items</span>
		<Separator orientation="vertical" className="h-4" />
		<span className="font-bold">${total.toFixed(2)}</span>
	</Button>
);

const ImageStack = ({ images, alt }: { images: string[]; alt: string }) => (
	<div className="relative size-20 shrink-0">
		{images.slice(0, 3).map((src, index) => (
			<div
				key={src}
				className="absolute overflow-hidden rounded-lg border-2 border-background bg-muted shadow-sm"
				style={{
					width: '100%',
					height: '100%',
					left: index * 4,
					top: index * 4,
					zIndex: 3 - index,
				}}
			>
				<Image src={src} alt={`${alt} ${index + 1}`} fill className="object-cover" />
			</div>
		))}
	</div>
);

const OptionTags = ({
	options,
}: {
	options: { label: string; value: string }[];
}) => (
	<div className="flex flex-wrap gap-1">
		{options.map((option) => (
			<Badge key={option.label} variant="outline" className="text-[10px]">
				{option.label}: {option.value}
			</Badge>
		))}
	</div>
);

const StackedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ImageStack images={item.images} alt={item.name} />
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate font-medium text-foreground">{item.name}</h4>
				<Button
					size="icon-sm"
					variant="ghost"
					className="size-6 shrink-0 text-muted-foreground"
				>
					<X className="size-3" />
				</Button>
			</div>
			<OptionTags options={item.options} />
			<div className="mt-auto flex items-center justify-between pt-2">
				<div className="flex items-center rounded-full bg-muted px-1">
					<Button size="icon-sm" variant="ghost" className="size-6 rounded-full">
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm font-medium">
						{item.quantity}
					</span>
					<Button size="icon-sm" variant="ghost" className="size-6 rounded-full">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const SplitFooter = ({
	total,
	continueLabel,
	checkoutLabel,
}: {
	total: number;
	continueLabel: string;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
			<span className="text-sm text-muted-foreground">Subtotal</span>
			<span className="text-xl font-bold">${total.toFixed(2)}</span>
		</div>
		<div className="grid grid-cols-5 gap-3">
			<Button variant="outline" className="col-span-2">
				{continueLabel}
			</Button>
			<Button className="col-span-3 gap-2">
				{checkoutLabel}
				<ArrowRight className="size-4" />
			</Button>
		</div>
		<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
			<Check className="size-3 text-primary" />
			<span>Secure checkout with SSL encryption</span>
		</div>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		continueLabel: 'Continue',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				images: [
					'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
					'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=200&h=200&fit=crop',
					'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=200&h=200&fit=crop',
				],
				name: 'Designer Frames Collection',
				options: [
					{ label: 'Style', value: 'Aviator' },
					{ label: 'Lens', value: 'Polarized' },
				],
				price: 245.00,
				quantity: 1,
			},
			{
				id: '2',
				images: [
					'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
					'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=200&h=200&fit=crop',
				],
				name: 'Premium Watch Set',
				options: [
					{ label: 'Band', value: 'Leather' },
					{ label: 'Face', value: 'Gold' },
				],
				price: 599.00,
				quantity: 1,
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
						<TriggerPill count={itemCount} total={total} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-lg">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<StackedItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<SplitFooter
							total={total}
							continueLabel={cartData.continueLabel}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
