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
import {
	Check,
	Leaf,
	Minus,
	Package,
	Plus,
	Recycle,
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
}

interface EcoOption {
	id: string;
	label: string;
	description: string;
	co2Saved: string;
	selected: boolean;
	icon: 'leaf' | 'recycle' | 'package';
}

interface CartDrawerProps {
	title: string;
	ecoTitle: string;
	checkoutLabel: string;
	items: CartItem[];
	ecoOptions: EcoOption[];
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

const EcoIcon = ({ type }: { type: string }) => {
	switch (type) {
		case 'leaf':
			return <Leaf className="size-4" />;
		case 'recycle':
			return <Recycle className="size-4" />;
		case 'package':
			return <Package className="size-4" />;
		default:
			return <Leaf className="size-4" />;
	}
};

const EcoOptionsSection = ({
	title,
	options,
}: {
	title: string;
	options: EcoOption[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Leaf className="size-4 text-green-600" />
			<span className="text-sm font-medium text-green-800 dark:text-green-200">
				{title}
			</span>
		</div>
		<div className="space-y-2">
			{options.map((option) => (
				<div
					key={option.id}
					className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
						option.selected
							? 'border-green-500 bg-green-50 dark:bg-green-950/30'
							: 'border-border hover:border-green-300'
					}`}
				>
					<div
						className={`flex size-5 shrink-0 items-center justify-center rounded border-2 ${
							option.selected
								? 'border-green-500 bg-green-500'
								: 'border-border'
						}`}
					>
						{option.selected && <Check className="size-3 text-white" />}
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span
								className={`${option.selected ? 'text-green-700 dark:text-green-300' : ''}`}
							>
								<EcoIcon type={option.icon} />
							</span>
							<h4 className="text-sm font-medium">{option.label}</h4>
						</div>
						<p className="mt-0.5 text-xs text-muted-foreground">
							{option.description}
						</p>
						<Badge
							variant="outline"
							className="mt-2 border-green-300 text-green-700 dark:text-green-300"
						>
							🌱 {option.co2Saved} CO₂ saved
						</Badge>
					</div>
				</div>
			))}
		</div>
	</div>
);

const EcoSummary = ({
	total,
	co2Saved,
	checkoutLabel,
}: {
	total: number;
	co2Saved: string;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
			<div className="flex items-center gap-2">
				<Leaf className="size-5 text-green-600" />
				<span className="text-sm font-medium text-green-800 dark:text-green-200">
					Total CO₂ Saved
				</span>
			</div>
			<span className="font-bold text-green-700 dark:text-green-300">
				{co2Saved}
			</span>
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full gap-2 bg-green-600 hover:bg-green-700" size="lg">
			<Leaf className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		ecoTitle: 'Eco-Friendly Options',
		checkoutLabel: 'Eco Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Sustainable Sneakers',
				price: 149.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Eco Running Shoes',
				price: 129.99,
				quantity: 1,
			},
		],
		ecoOptions: [
			{
				id: 'carbon',
				label: 'Carbon Neutral Shipping',
				description: 'Offset carbon emissions from delivery',
				co2Saved: '2.5kg',
				selected: true,
				icon: 'leaf',
			},
			{
				id: 'packaging',
				label: 'Minimal Packaging',
				description: 'Reduce packaging waste with eco-friendly materials',
				co2Saved: '0.8kg',
				selected: true,
				icon: 'package',
			},
			{
				id: 'consolidated',
				label: 'Consolidated Delivery',
				description: 'Wait for all items to ship together',
				co2Saved: '1.2kg',
				selected: false,
				icon: 'recycle',
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const co2Saved =
		cartData.ecoOptions
			.filter((o) => o.selected)
			.reduce((sum, o) => sum + parseFloat(o.co2Saved), 0)
			.toFixed(1) + 'kg';
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
								<EcoOptionsSection
									title={cartData.ecoTitle}
									options={cartData.ecoOptions}
								/>
							</div>
						</ScrollArea>
						<EcoSummary
							total={total}
							co2Saved={co2Saved}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
