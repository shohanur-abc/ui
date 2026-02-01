'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
import { Clock, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface TimeSlot {
	id: string;
	label: string;
	available: boolean;
}

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	title: string;
	timeSlotLabel: string;
	selectSlotPlaceholder: string;
	checkoutLabel: string;
	items: CartItem[];
	timeSlots: TimeSlot[];
	selectedSlot?: string;
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

const TimeSlotPicker = ({
	label,
	placeholder,
	slots,
	selected,
}: {
	label: string;
	placeholder: string;
	slots: TimeSlot[];
	selected?: string;
}) => (
	<div className="rounded-lg border border-border p-4">
		<div className="flex items-center gap-2 mb-3">
			<Clock className="size-4 text-primary" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		<Select defaultValue={selected}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{slots.map((slot) => (
					<SelectItem key={slot.id} value={slot.id} disabled={!slot.available}>
						<span className="flex items-center gap-2">
							{slot.label}
							{!slot.available && (
								<Badge variant="secondary" className="text-[10px]">
									Full
								</Badge>
							)}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
		{selected && (
			<div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
				<Clock className="size-4 text-primary" />
				<span className="text-sm text-primary">
					{slots.find((s) => s.id === selected)?.label}
				</span>
			</div>
		)}
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
		timeSlotLabel: 'Delivery Time Slot',
		selectSlotPlaceholder: 'Select a time slot',
		checkoutLabel: 'Schedule Delivery',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
				name: 'Fresh Vegetables Bundle',
				price: 35.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1553531087-b25a0b9adace?w=200&h=200&fit=crop',
				name: 'Organic Fruit Box',
				price: 42.99,
				quantity: 1,
			},
		],
		timeSlots: [
			{ id: 'morning', label: '8:00 AM - 10:00 AM', available: true },
			{ id: 'mid-morning', label: '10:00 AM - 12:00 PM', available: false },
			{ id: 'afternoon', label: '12:00 PM - 2:00 PM', available: true },
			{ id: 'mid-afternoon', label: '2:00 PM - 4:00 PM', available: true },
			{ id: 'evening', label: '4:00 PM - 6:00 PM', available: false },
			{ id: 'night', label: '6:00 PM - 8:00 PM', available: true },
		],
		selectedSlot: 'afternoon',
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
							<div className="mt-4">
								<TimeSlotPicker
									label={cartData.timeSlotLabel}
									placeholder={cartData.selectSlotPlaceholder}
									slots={cartData.timeSlots}
									selected={cartData.selectedSlot}
								/>
							</div>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
