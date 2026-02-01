'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Minus, Plane, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	dutyFreeEligible: boolean;
}

interface DutyFreeInfo {
	flightNumber: string;
	departureDate: string;
	destination: string;
	passportNumber: string;
	savings: number;
}

interface CartDrawerProps {
	title: string;
	dutyFreeLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	dutyFree: DutyFreeInfo;
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

const DutyFreeSection = ({
	label,
	dutyFree,
}: {
	label: string;
	dutyFree: DutyFreeInfo;
}) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Plane className="size-4 text-muted-foreground" />
				<span className="font-medium">{label}</span>
			</div>
			<Badge className="bg-sky-500">Tax Free</Badge>
		</div>
		<div className="rounded-lg border border-sky-200 bg-sky-50 dark:bg-sky-950/30 p-4 space-y-3">
			<div className="grid grid-cols-2 gap-3 text-sm">
				<div>
					<p className="text-xs text-muted-foreground">Flight</p>
					<p className="font-medium">{dutyFree.flightNumber}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Departure</p>
					<p className="font-medium">{dutyFree.departureDate}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Destination</p>
					<p className="font-medium">{dutyFree.destination}</p>
				</div>
				<div>
					<p className="text-xs text-muted-foreground">Passport</p>
					<p className="font-medium">
						•••• {dutyFree.passportNumber.slice(-4)}
					</p>
				</div>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<span className="text-sm">Total Duty-Free Savings</span>
				<span className="text-lg font-bold text-sky-600">
					${dutyFree.savings.toFixed(2)}
				</span>
			</div>
		</div>
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<Checkbox id="confirm" defaultChecked />
			<Label htmlFor="confirm" className="text-xs">
				I confirm I'm traveling internationally and will carry these items
			</Label>
		</div>
	</div>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			{item.dutyFreeEligible && (
				<Badge className="absolute -right-1 -top-1 size-5 p-0 rounded-full bg-sky-500">
					<Plane className="size-2.5" />
				</Badge>
			)}
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					{item.dutyFreeEligible && (
						<span className="text-xs text-sky-600">Duty Free</span>
					)}
				</div>
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
	subtotal,
	dutySavings,
	total,
	checkoutLabel,
}: {
	subtotal: number;
	dutySavings: number;
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			<div className="flex justify-between text-sky-600">
				<span className="flex items-center gap-1">
					<Plane className="size-3" />
					Duty-Free Savings
				</span>
				<span>-${dutySavings.toFixed(2)}</span>
			</div>
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full bg-sky-500 hover:bg-sky-600" size="lg">
			<Plane className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		dutyFreeLabel: 'Duty-Free Shopping',
		checkoutLabel: 'Collect at Gate',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Premium Sneakers',
				price: 199.99,
				quantity: 1,
				dutyFreeEligible: true,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Sport Watch',
				price: 299.99,
				quantity: 1,
				dutyFreeEligible: true,
			},
		],
		dutyFree: {
			flightNumber: 'BA247',
			departureDate: 'Dec 28, 2024',
			destination: 'London Heathrow',
			passportNumber: 'AB1234567',
			savings: 87.5,
		},
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const total = subtotal - cartData.dutyFree.savings;
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
							<DutyFreeSection
								label={cartData.dutyFreeLabel}
								dutyFree={cartData.dutyFree}
							/>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							dutySavings={cartData.dutyFree.savings}
							total={total}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
