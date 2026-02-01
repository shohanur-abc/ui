'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	AlertTriangle,
	Minus,
	Package,
	Plus,
	ShoppingBag,
	Truck,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	isFragile: boolean;
	isHazardous: boolean;
	isOversized: boolean;
}

interface HandlingOption {
	id: string;
	label: string;
	description: string;
	price: number;
	selected: boolean;
}

interface CartDrawerProps {
	title: string;
	handlingLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	handlingOptions: HandlingOption[];
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

const ItemWarnings = ({ item }: { item: CartItem }) => (
	<div className="flex flex-wrap gap-1 mt-1">
		{item.isFragile && (
			<Badge
				variant="outline"
				className="text-[9px] border-orange-300 text-orange-600"
			>
				<Package className="mr-1 size-2.5" />
				Fragile
			</Badge>
		)}
		{item.isHazardous && (
			<Badge
				variant="outline"
				className="text-[9px] border-red-300 text-red-600"
			>
				<AlertTriangle className="mr-1 size-2.5" />
				Hazmat
			</Badge>
		)}
		{item.isOversized && (
			<Badge
				variant="outline"
				className="text-[9px] border-blue-300 text-blue-600"
			>
				<Truck className="mr-1 size-2.5" />
				Oversized
			</Badge>
		)}
	</div>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			{(item.isFragile || item.isHazardous || item.isOversized) && (
				<div className="absolute left-1 top-1">
					<AlertTriangle className="size-4 text-orange-500" />
				</div>
			)}
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					<ItemWarnings item={item} />
				</div>
				<Button size="icon-sm" variant="ghost" className="size-5">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-auto pt-2">
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

const HandlingOptions = ({
	label,
	options,
}: {
	label: string;
	options: HandlingOption[];
}) => (
	<div className="space-y-3 rounded-lg border border-orange-200 bg-orange-50/50 p-4 dark:border-orange-900 dark:bg-orange-950/20">
		<div className="flex items-center gap-2">
			<Package className="size-4 text-orange-600" />
			<span className="text-sm font-medium text-orange-800 dark:text-orange-200">
				{label}
			</span>
		</div>
		<div className="space-y-2">
			{options.map((option) => (
				<div
					key={option.id}
					className="flex items-start gap-3 rounded-lg bg-background p-3"
				>
					<Checkbox
						id={option.id}
						defaultChecked={option.selected}
						className="mt-0.5"
					/>
					<div className="flex-1">
						<label
							htmlFor={option.id}
							className="text-sm font-medium cursor-pointer"
						>
							{option.label}
						</label>
						<p className="text-xs text-muted-foreground">
							{option.description}
						</p>
					</div>
					<span className="text-sm font-medium">
						+${option.price.toFixed(2)}
					</span>
				</div>
			))}
		</div>
	</div>
);

const Summary = ({
	subtotal,
	handlingFees,
	checkoutLabel,
}: {
	subtotal: number;
	handlingFees: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>${subtotal.toFixed(2)}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Special Handling</span>
			<span>${handlingFees.toFixed(2)}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${(subtotal + handlingFees).toFixed(2)}</span>
		</div>
		<Button className="w-full gap-2" size="lg">
			<Package className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		handlingLabel: 'Special Handling Required',
		checkoutLabel: 'Checkout with Care',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop',
				name: 'Fine China Set',
				price: 499.99,
				quantity: 1,
				isFragile: true,
				isHazardous: false,
				isOversized: false,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
				name: 'Industrial Cleaner',
				price: 45.99,
				quantity: 2,
				isFragile: false,
				isHazardous: true,
				isOversized: false,
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
				name: 'Sectional Sofa',
				price: 1299.99,
				quantity: 1,
				isFragile: false,
				isHazardous: false,
				isOversized: true,
			},
		],
		handlingOptions: [
			{
				id: 'fragile',
				label: 'Fragile Item Protection',
				description: 'Extra cushioning and "Handle with Care" labeling',
				price: 12.99,
				selected: true,
			},
			{
				id: 'hazmat',
				label: 'Hazmat Shipping',
				description: 'Compliant packaging for hazardous materials',
				price: 24.99,
				selected: true,
			},
			{
				id: 'freight',
				label: 'White Glove Delivery',
				description: 'Professional delivery with assembly',
				price: 149.99,
				selected: false,
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const handlingFees = cartData.handlingOptions
		.filter((o) => o.selected)
		.reduce((sum, o) => sum + o.price, 0);
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
							<div className="mt-4">
								<HandlingOptions
									label={cartData.handlingLabel}
									options={cartData.handlingOptions}
								/>
							</div>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							handlingFees={handlingFees}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
