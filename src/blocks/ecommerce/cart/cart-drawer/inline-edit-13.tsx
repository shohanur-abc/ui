'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	color: string;
	size: string;
	price: number;
	quantity: number;
	availableSizes: string[];
	availableColors: string[];
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	sizeLabel: string;
	colorLabel: string;
	quantityLabel: string;
	items: CartItem[];
}

const CartIcon = ({ count }: { count: number }) => (
	<Button variant="ghost" size="icon" className="relative">
		<ShoppingBag className="size-5" />
		{count > 0 && (
			<Badge className="absolute -right-1 -top-1 size-4 rounded-full p-0 text-[9px]">
				{count}
			</Badge>
		)}
	</Button>
);

const InlineSelect = ({
	label,
	value,
	options,
}: {
	label: string;
	value: string;
	options: string[];
}) => (
	<div className="flex items-center gap-2">
		<span className="text-xs text-muted-foreground">{label}:</span>
		<Select defaultValue={value}>
			<SelectTrigger className="h-7 w-auto gap-1 border-0 bg-muted/50 px-2 text-xs">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option} value={option} className="text-xs">
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const QuantitySelect = ({
	label,
	quantity,
}: {
	label: string;
	quantity: number;
}) => (
	<div className="flex items-center gap-2">
		<span className="text-xs text-muted-foreground">{label}:</span>
		<Select defaultValue={quantity.toString()}>
			<SelectTrigger className="h-7 w-16 gap-1 border-0 bg-muted/50 px-2 text-xs">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
					<SelectItem key={num} value={num.toString()} className="text-xs">
						{num}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const EditableCartItem = ({
	item,
	sizeLabel,
	colorLabel,
	quantityLabel,
}: {
	item: CartItem;
	sizeLabel: string;
	colorLabel: string;
	quantityLabel: string;
}) => (
	<Card className="overflow-hidden p-0">
		<div className="flex">
			<div className="relative aspect-square w-24 shrink-0 bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex flex-1 flex-col p-3">
				<div className="flex items-start justify-between gap-2">
					<h4 className="font-medium leading-tight">{item.name}</h4>
					<Button size="icon-sm" variant="ghost" className="size-6 shrink-0">
						<X className="size-3" />
					</Button>
				</div>
				<div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
					<InlineSelect
						label={colorLabel}
						value={item.color}
						options={item.availableColors}
					/>
					<InlineSelect
						label={sizeLabel}
						value={item.size}
						options={item.availableSizes}
					/>
					<QuantitySelect label={quantityLabel} quantity={item.quantity} />
				</div>
				<div className="mt-auto pt-2">
					<span className="font-bold text-primary">
						${(item.price * item.quantity).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	</Card>
);

const Summary = ({
	items,
	checkoutLabel,
}: {
	items: CartItem[];
	checkoutLabel: string;
}) => {
	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="space-y-4 border-t border-border pt-4">
			<div className="flex justify-between text-lg">
				<span>Subtotal</span>
				<span className="font-bold">${subtotal.toFixed(2)}</span>
			</div>
			<Button className="w-full" size="lg">
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Cart',
		checkoutLabel: 'Checkout',
		sizeLabel: 'Size',
		colorLabel: 'Color',
		quantityLabel: 'Qty',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop',
				name: 'Oversized T-Shirt',
				color: 'Black',
				size: 'L',
				price: 45.00,
				quantity: 2,
				availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
				availableColors: ['Black', 'White', 'Gray', 'Navy'],
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
				name: 'Slim Fit Jeans',
				color: 'Blue',
				size: '32',
				price: 89.00,
				quantity: 1,
				availableSizes: ['28', '30', '32', '34', '36'],
				availableColors: ['Blue', 'Black', 'Gray'],
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=200&h=200&fit=crop',
				name: 'Bomber Jacket',
				color: 'Olive',
				size: 'M',
				price: 149.00,
				quantity: 1,
				availableSizes: ['S', 'M', 'L', 'XL'],
				availableColors: ['Black', 'Olive', 'Navy'],
			},
		],
	};

	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

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
							<div className="space-y-3 py-4">
								{cartData.items.map((item) => (
									<EditableCartItem
										key={item.id}
										item={item}
										sizeLabel={cartData.sizeLabel}
										colorLabel={cartData.colorLabel}
										quantityLabel={cartData.quantityLabel}
									/>
								))}
							</div>
						</ScrollArea>
						<Summary
							items={cartData.items}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
