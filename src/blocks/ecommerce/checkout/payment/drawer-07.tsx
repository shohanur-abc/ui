'use client';

import {
	AlertCircle,
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	Minus,
	Package,
	Plus,
	Shield,
	Trash2,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface CartItem {
	id: string;
	name: string;
	price: string;
	quantity: number;
	image?: string;
}

const DrawerHeader = ({
	itemCount,
	onClose,
}: {
	itemCount: number;
	onClose: () => void;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Package className="size-5 text-primary" />
			<h2 className="text-lg font-semibold">Your Cart</h2>
			<Badge variant="secondary">{itemCount}</Badge>
		</div>
		<Button variant="ghost" size="icon" onClick={onClose}>
			<X className="size-4" />
		</Button>
	</div>
);

const CartItemComponent = ({
	item,
	onQuantityChange,
	onRemove,
}: {
	item: CartItem;
	onQuantityChange: (delta: number) => void;
	onRemove: () => void;
}) => (
	<div className="flex gap-3 p-3 rounded-lg bg-muted/30">
		<div className="size-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Package className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<h3 className="font-medium truncate">{item.name}</h3>
			<span className="text-sm text-muted-foreground">{item.price}</span>
			<div className="flex items-center gap-2 mt-2">
				<Button
					variant="outline"
					size="icon"
					className="size-6"
					onClick={() => onQuantityChange(-1)}
				>
					<Minus className="size-3" />
				</Button>
				<span className="text-sm w-6 text-center">{item.quantity}</span>
				<Button
					variant="outline"
					size="icon"
					className="size-6"
					onClick={() => onQuantityChange(1)}
				>
					<Plus className="size-3" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="size-6 ml-auto text-destructive"
					onClick={onRemove}
				>
					<Trash2 className="size-3" />
				</Button>
			</div>
		</div>
	</div>
);

const QuickCardForm = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-2">
			<CreditCard className="size-4 text-primary" />
			<span className="font-medium">Quick Checkout</span>
		</div>
		<div className="space-y-3">
			<div className="relative">
				<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input placeholder="Card number" className="pl-10" />
			</div>
			<div className="grid grid-cols-2 gap-2">
				<Input placeholder="MM/YY" />
				<Input type="password" placeholder="CVV" />
			</div>
		</div>
	</div>
);

const PromoCodeInput = ({ appliedCode }: { appliedCode?: string }) => (
	<div className="space-y-2">
		<div className="flex gap-2">
			<Input
				placeholder="Promo code"
				className="flex-1"
				defaultValue={appliedCode}
			/>
			<Button variant="outline">{appliedCode ? 'Remove' : 'Apply'}</Button>
		</div>
		{appliedCode && (
			<div className="flex items-center gap-2 text-emerald-600 text-sm">
				<Check className="size-4" />
				<span>{appliedCode} applied - 10% off</span>
			</div>
		)}
	</div>
);

const OrderSummary = ({
	subtotal,
	discount,
	shipping,
	total,
}: {
	subtotal: string;
	discount?: string;
	shipping: string;
	total: string;
}) => (
	<div className="space-y-2">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>{subtotal}</span>
		</div>
		{discount && (
			<div className="flex justify-between text-sm text-emerald-600">
				<span>Discount</span>
				<span>-{discount}</span>
			</div>
		)}
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Shipping</span>
			<span>{shipping}</span>
		</div>
		<Separator />
		<div className="flex justify-between font-semibold text-lg">
			<span>Total</span>
			<span>{total}</span>
		</div>
	</div>
);

const DeliveryEstimate = () => (
	<div className="p-3 rounded-lg border border-dashed flex items-center gap-3">
		<Package className="size-5 text-muted-foreground" />
		<div className="text-sm">
			<span className="font-medium">Estimated delivery:</span>
			<span className="text-muted-foreground ml-1">Jan 15-20, 2025</span>
		</div>
	</div>
);

export default function Main() {
	const cartItems: CartItem[] = [
		{
			id: '1',
			name: 'Premium Wireless Headphones',
			price: '$199.00',
			quantity: 1,
		},
		{ id: '2', name: 'USB-C Charging Cable', price: '$29.00', quantity: 2 },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm @sm:max-w-md mx-auto">
					<CardHeader>
						<DrawerHeader itemCount={cartItems.length} onClose={() => {}} />
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3 max-h-48 overflow-y-auto">
							{cartItems.map((item) => (
								<CartItemComponent
									key={item.id}
									item={item}
									onQuantityChange={() => {}}
									onRemove={() => {}}
								/>
							))}
						</div>
						<Separator />
						<PromoCodeInput appliedCode="SAVE10" />
						<DeliveryEstimate />
						<Separator />
						<QuickCardForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<OrderSummary
							subtotal="$257.00"
							discount="$25.70"
							shipping="Free"
							total="$231.30"
						/>
						<Button className="w-full gap-2">
							<Lock className="size-4" />
							Pay $231.30
						</Button>
						<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Secure checkout powered by Stripe</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
