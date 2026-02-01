import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Truck,
	Shield,
	RotateCcw,
	Clock,
	MapPin,
	Check,
	Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface DeliveryOption {
	id: string;
	name: string;
	price: number;
	days: string;
	icon: React.ReactNode;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	href: string;
}

interface SplitProps {
	items: WishlistItem[];
}

const CartSummary = ({ items }: { items: WishlistItem[] }) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<div className="h-full flex flex-col">
			<h2 className="font-bold mb-4">Your Cart</h2>
			<div className="flex-1 space-y-3 overflow-y-auto">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex items-center gap-3 p-3 rounded-lg bg-muted"
					>
						<div className="size-16 rounded-lg overflow-hidden bg-muted">
							<img
								src={item.image}
								alt={item.name}
								className="size-full object-cover"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<p className="font-medium text-sm truncate">{item.name}</p>
							<p className="text-xs text-muted-foreground">
								Qty: {item.quantity}
							</p>
						</div>
						<p className="font-bold">
							${(item.price * item.quantity).toFixed(2)}
						</p>
					</div>
				))}
			</div>
			<Separator className="my-4" />
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<span>${subtotal.toFixed(2)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Shipping</span>
					<span>Calculated next</span>
				</div>
			</div>
		</div>
	);
};

const ShippingOptions = ({ options }: { options: DeliveryOption[] }) => (
	<div className="h-full flex flex-col">
		<h2 className="font-bold mb-2">Delivery Options</h2>
		<p className="text-sm text-muted-foreground mb-4">
			Choose your preferred shipping method
		</p>

		<RadioGroup defaultValue={options[0].id} className="space-y-3">
			{options.map((option) => (
				<div key={option.id}>
					<RadioGroupItem
						value={option.id}
						id={option.id}
						className="peer sr-only"
					/>
					<Label
						htmlFor={option.id}
						className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
					>
						<div className="size-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
							{option.icon}
						</div>
						<div className="flex-1">
							<p className="font-medium">{option.name}</p>
							<p className="text-sm text-muted-foreground">{option.days}</p>
						</div>
						<p className="font-bold">
							{option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
						</p>
					</Label>
				</div>
			))}
		</RadioGroup>

		<div className="mt-6 p-4 rounded-xl bg-muted">
			<div className="flex items-center gap-2 mb-2">
				<MapPin className="size-4 text-primary" />
				<span className="font-medium text-sm">Delivery Address</span>
			</div>
			<p className="text-sm text-muted-foreground">123 Main St, Apt 4B</p>
			<p className="text-sm text-muted-foreground">New York, NY 10001</p>
			<Button variant="link" size="sm" className="px-0 mt-1">
				Change Address
			</Button>
		</div>

		<div className="mt-auto pt-6">
			<div className="grid grid-cols-3 gap-4 text-center mb-6">
				<div className="space-y-1">
					<div className="size-10 rounded-full bg-green-100 flex items-center justify-center mx-auto">
						<Shield className="size-5 text-green-600" />
					</div>
					<p className="text-xs text-muted-foreground">Secure</p>
				</div>
				<div className="space-y-1">
					<div className="size-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
						<Package className="size-5 text-blue-600" />
					</div>
					<p className="text-xs text-muted-foreground">Tracking</p>
				</div>
				<div className="space-y-1">
					<div className="size-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
						<RotateCcw className="size-5 text-amber-600" />
					</div>
					<p className="text-xs text-muted-foreground">Returns</p>
				</div>
			</div>
			<Button className="w-full gap-2" size="lg">
				Continue to Payment
			</Button>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Noise-Canceling Headphones',
			price: 299,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			quantity: 1,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Fitness Watch',
			price: 249,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
			quantity: 1,
			href: '/product/2',
		},
	];

	const deliveryOptions: DeliveryOption[] = [
		{
			id: 'standard',
			name: 'Standard Shipping',
			price: 0,
			days: '5-7 business days',
			icon: <Truck className="size-5" />,
		},
		{
			id: 'express',
			name: 'Express Shipping',
			price: 9.99,
			days: '2-3 business days',
			icon: <Package className="size-5" />,
		},
		{
			id: 'overnight',
			name: 'Overnight',
			price: 24.99,
			days: 'Next business day',
			icon: <Clock className="size-5" />,
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<h1 className="text-2xl font-bold mb-6">Checkout</h1>
				<div className="grid @md:grid-cols-2 gap-8 min-h-[600px]">
					<div className="bg-card p-6 rounded-xl border">
						<CartSummary items={wishlistItems} />
					</div>
					<div className="bg-card p-6 rounded-xl border">
						<ShippingOptions options={deliveryOptions} />
					</div>
				</div>
			</div>
		</section>
	);
}
