'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	ArrowRight,
	ChevronDown,
	ChevronUp,
	Minus,
	Plus,
	ShoppingBag,
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

const CollapsedView = ({
	items,
	total,
	onExpand,
	checkoutLabel,
}: {
	items: CartItem[];
	total: number;
	onExpand: () => void;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 pb-safe">
		<div className="flex items-center gap-3">
			<div className="flex -space-x-3">
				{items.slice(0, 3).map((item, index) => (
					<div
						key={item.id}
						className="relative size-14 rounded-xl overflow-hidden border-2 border-background"
						style={{ zIndex: 3 - index }}
					>
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover"
						/>
					</div>
				))}
				{items.length > 3 && (
					<div className="relative size-14 rounded-xl overflow-hidden border-2 border-background bg-muted flex items-center justify-center text-sm font-medium">
						+{items.length - 3}
					</div>
				)}
			</div>
			<div className="flex-1">
				<p className="font-medium">{items.length} items</p>
				<p className="text-lg font-bold">${total.toFixed(2)}</p>
			</div>
			<Button
				size="icon"
				variant="ghost"
				onClick={onExpand}
				className="size-10"
			>
				<ChevronUp className="size-5" />
			</Button>
		</div>
		<Button
			className="w-full h-14 text-lg font-semibold rounded-2xl gap-2"
			size="lg"
		>
			{checkoutLabel}
			<ArrowRight className="size-5" />
		</Button>
	</div>
);

const ExpandedItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium">{item.name}</h4>
				<Button size="icon" variant="ghost" className="size-7">
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
					<Button size="icon" variant="ghost" className="size-7 rounded-full">
						<Minus className="size-3" />
					</Button>
					<span className="w-5 text-center text-sm font-medium">
						{item.quantity}
					</span>
					<Button size="icon" variant="ghost" className="size-7 rounded-full">
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

const ExpandedView = ({
	items,
	total,
	onCollapse,
	checkoutLabel,
}: {
	items: CartItem[];
	total: number;
	onCollapse: () => void;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 pb-safe max-h-[70vh] flex flex-col">
		<div className="flex items-center justify-between">
			<SheetTitle>{items.length} items in cart</SheetTitle>
			<Button
				size="icon"
				variant="ghost"
				onClick={onCollapse}
				className="size-10"
			>
				<ChevronDown className="size-5" />
			</Button>
		</div>
		<div className="flex-1 overflow-y-auto divide-y divide-border">
			{items.map((item) => (
				<ExpandedItemRow key={item.id} item={item} />
			))}
		</div>
		<div className="border-t border-border pt-4 space-y-4">
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>
			<Button
				className="w-full h-14 text-lg font-semibold rounded-2xl gap-2"
				size="lg"
			>
				{checkoutLabel}
				<ArrowRight className="size-5" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Checkout',
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
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
				name: 'Sport Sneakers',
				price: 99.99,
				quantity: 2,
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

	// For demo, showing collapsed view - in real app, this would toggle
	const isExpanded = false;

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<CartTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent
						side="bottom"
						className="flex h-auto flex-col rounded-t-3xl"
					>
						<div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
						{isExpanded ? (
							<ExpandedView
								items={cartData.items}
								total={total}
								onCollapse={() => {}}
								checkoutLabel={cartData.checkoutLabel}
							/>
						) : (
							<CollapsedView
								items={cartData.items}
								total={total}
								onExpand={() => {}}
								checkoutLabel={cartData.checkoutLabel}
							/>
						)}
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
