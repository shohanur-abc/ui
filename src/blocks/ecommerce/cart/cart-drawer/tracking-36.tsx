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
	CheckCircle,
	MapPin,
	Minus,
	Navigation,
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

interface TrackingStep {
	id: string;
	label: string;
	time: string;
	completed: boolean;
	current: boolean;
}

interface CartDrawerProps {
	title: string;
	trackingTitle: string;
	checkoutLabel: string;
	items: CartItem[];
	tracking: TrackingStep[];
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

const TrackingTimeline = ({
	title,
	steps,
}: {
	title: string;
	steps: TrackingStep[];
}) => (
	<div className="rounded-lg border border-border p-4">
		<div className="flex items-center gap-2 mb-4">
			<Navigation className="size-4 text-primary" />
			<span className="text-sm font-medium">{title}</span>
		</div>
		<div className="relative">
			{steps.map((step, index) => (
				<div key={step.id} className="flex gap-3 pb-4 last:pb-0">
					<div className="flex flex-col items-center">
						<div
							className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
								step.completed
									? 'bg-primary text-primary-foreground'
									: step.current
										? 'border-2 border-primary bg-background'
										: 'border-2 border-muted bg-background'
							}`}
						>
							{step.completed ? (
								<CheckCircle className="size-4" />
							) : step.current ? (
								<div className="size-2 rounded-full bg-primary animate-pulse" />
							) : (
								<div className="size-2 rounded-full bg-muted" />
							)}
						</div>
						{index < steps.length - 1 && (
							<div
								className={`w-0.5 flex-1 ${
									step.completed ? 'bg-primary' : 'bg-muted'
								}`}
							/>
						)}
					</div>
					<div className="flex-1 pb-4">
						<p
							className={`text-sm font-medium ${
								step.current
									? 'text-primary'
									: step.completed
										? ''
										: 'text-muted-foreground'
							}`}
						>
							{step.label}
						</p>
						<p className="text-xs text-muted-foreground">{step.time}</p>
					</div>
				</div>
			))}
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
		<Button className="w-full gap-2" size="lg">
			<MapPin className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		trackingTitle: 'Estimated Delivery',
		checkoutLabel: 'Track & Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Smart Watch',
				price: 299.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				price: 149.99,
				quantity: 1,
			},
		],
		tracking: [
			{
				id: '1',
				label: 'Order Placed',
				time: 'Today',
				completed: true,
				current: false,
			},
			{
				id: '2',
				label: 'Processing',
				time: 'Tomorrow',
				completed: false,
				current: true,
			},
			{
				id: '3',
				label: 'Shipped',
				time: 'Dec 5',
				completed: false,
				current: false,
			},
			{
				id: '4',
				label: 'Delivered',
				time: 'Dec 7',
				completed: false,
				current: false,
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
							<div className="mt-4">
								<TrackingTimeline
									title={cartData.trackingTitle}
									steps={cartData.tracking}
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
