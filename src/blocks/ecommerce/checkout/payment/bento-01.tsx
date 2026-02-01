'use client';

import { Check, CreditCard, Lock, Package, Shield, Truck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface OrderItem {
	name: string;
	variant: string;
	price: string;
	quantity: number;
}

const OrderPreviewCell = ({ items }: { items: OrderItem[] }) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Package className="size-4 text-primary" />
				<span className="font-semibold text-sm">Order Summary</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, index) => (
				<div key={index} className="flex gap-3">
					<div className="size-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
						<Package className="size-6 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<span className="text-sm font-medium block truncate">
							{item.name}
						</span>
						<span className="text-xs text-muted-foreground">
							{item.variant}
						</span>
						<div className="flex justify-between mt-1">
							<span className="text-xs text-muted-foreground">
								Qty: {item.quantity}
							</span>
							<span className="text-sm font-medium">{item.price}</span>
						</div>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const CardFormCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<CreditCard className="size-4 text-primary" />
				<span className="font-semibold text-sm">Payment</span>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			<div className="relative">
				<CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Card number" className="h-9 text-sm pl-9" />
			</div>
			<div className="grid grid-cols-2 gap-2">
				<Input placeholder="MM/YY" className="h-9 text-sm" />
				<Input placeholder="CVV" type="password" className="h-9 text-sm" />
			</div>
		</CardContent>
	</Card>
);

const ShippingInfoCell = () => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Truck className="size-4 text-primary" />
				<span className="font-semibold text-sm">Shipping</span>
			</div>
		</CardHeader>
		<CardContent>
			<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
				<div className="flex items-center gap-2">
					<Check className="size-4 text-emerald-500" />
					<span className="text-sm font-medium">Free Express Delivery</span>
				</div>
				<p className="text-xs text-muted-foreground mt-1">Arrives Jan 15-17</p>
			</div>
		</CardContent>
	</Card>
);

const TotalCell = ({
	subtotal,
	shipping,
	total,
}: {
	subtotal: string;
	shipping: string;
	total: string;
}) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm col-span-2">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="space-y-1">
					<div className="flex justify-between text-sm gap-8">
						<span className="text-muted-foreground">Subtotal</span>
						<span>{subtotal}</span>
					</div>
					<div className="flex justify-between text-sm gap-8">
						<span className="text-muted-foreground">Shipping</span>
						<span className="text-emerald-600">{shipping}</span>
					</div>
				</div>
				<Separator orientation="vertical" className="h-10 mx-4" />
				<div className="text-right">
					<span className="text-sm text-muted-foreground">Total</span>
					<p className="text-2xl font-bold">{total}</p>
				</div>
			</div>
			<Button className="w-full gap-2">
				<Lock className="size-4" />
				Complete Order
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			name: 'Wireless Headphones',
			variant: 'Black / Large',
			price: '$199.00',
			quantity: 1,
		},
		{ name: 'USB-C Cable', variant: '2m', price: '$29.00', quantity: 2 },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 gap-4">
					<OrderPreviewCell items={items} />
					<CardFormCell />
					<ShippingInfoCell />
					<TotalCell subtotal="$257.00" shipping="Free" total="$257.00" />
				</div>
			</div>
		</section>
	);
}
