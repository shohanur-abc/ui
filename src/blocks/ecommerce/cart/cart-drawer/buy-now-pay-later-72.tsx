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
import { Check, Clock, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface BnplOption {
	id: string;
	name: string;
	logo: string;
	paymentCount: number;
	paymentAmount: number;
	dueToday: number;
	features: string[];
}

interface CartDrawerProps {
	title: string;
	bnplLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	bnplOptions: BnplOption[];
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

const BnplSection = ({
	label,
	options,
}: {
	label: string;
	options: BnplOption[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Clock className="size-4 text-muted-foreground" />
			<span className="font-medium">{label}</span>
		</div>
		<div className="space-y-3">
			{options.map((option) => (
				<div
					key={option.id}
					className="rounded-xl border border-border p-4 space-y-3 hover:border-primary cursor-pointer transition-colors"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Image
								src={option.logo}
								alt={option.name}
								width={24}
								height={24}
								className="rounded"
							/>
							<span className="font-medium">{option.name}</span>
						</div>
						<Badge variant="outline">{option.paymentCount} payments</Badge>
					</div>
					<div className="flex items-baseline gap-1.5">
						<span className="text-2xl font-bold">
							${option.paymentAmount.toFixed(2)}
						</span>
						<span className="text-muted-foreground">every 2 weeks</span>
					</div>
					<div className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
						<span className="text-sm">Due today</span>
						<span className="font-semibold">${option.dueToday.toFixed(2)}</span>
					</div>
					<div className="space-y-1">
						{option.features.map((feature, index) => (
							<div
								key={index}
								className="flex items-center gap-2 text-xs text-muted-foreground"
							>
								<Check className="size-3 text-green-500" />
								<span>{feature}</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	</div>
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
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		bnplLabel: 'Buy Now, Pay Later',
		checkoutLabel: 'Continue with BNPL',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
		],
		bnplOptions: [
			{
				id: '1',
				name: 'Afterpay',
				logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=24&h=24&fit=crop',
				paymentCount: 4,
				paymentAmount: 32.5,
				dueToday: 32.5,
				features: [
					'No interest',
					'No fees if paid on time',
					'Instant approval',
				],
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
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<BnplSection
								label={cartData.bnplLabel}
								options={cartData.bnplOptions}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
