import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CreditCard, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CartItemProps = {
	image: string;
	name: string;
	variant: string;
	price: string;
	quantity: number;
};

type SummaryRowProps = {
	label: string;
	value: string;
};

const CartItem = ({ image, name, variant, price, quantity }: CartItemProps) => (
	<div className="flex gap-3 py-3">
		<div className="relative">
			<Avatar className="size-14 rounded-lg">
				<AvatarImage src={image} alt={name} className="object-cover" />
				<AvatarFallback className="rounded-lg">{name.slice(0, 2)}</AvatarFallback>
			</Avatar>
			<Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-full p-0 text-xs">
				{quantity}
			</Badge>
		</div>
		<div className="flex-1">
			<p className="text-sm font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{variant}</p>
			<p className="mt-1 text-sm font-semibold">{price}</p>
		</div>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between py-1 text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const cartItems: CartItemProps[] = [
		{
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
			name: 'Pro Headphones',
			variant: 'Black / Wireless',
			price: '$349.00',
			quantity: 1,
		},
		{
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
			name: 'Smart Watch',
			variant: 'Silver / 44mm',
			price: '$199.00',
			quantity: 1,
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$548.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$43.84' },
	];

	return (
		<section className="@container">
			<aside className="mx-auto h-auto min-h-[580px] max-w-xs rounded-2xl border bg-background px-5 py-6 shadow-lg @md:max-w-sm">
				<h3 className="mb-2 text-lg font-semibold">Your Cart</h3>
				<p className="mb-4 text-sm text-muted-foreground">2 items</p>
				<div className="mb-4 divide-y">
					{cartItems.map((item, i) => (
						<CartItem key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 space-y-1">
					{summaryItems.map((item, i) => (
						<SummaryRow key={i} {...item} />
					))}
				</div>
				<Separator className="my-4" />
				<div className="mb-4 flex items-center justify-between">
					<span className="text-lg font-semibold">Total</span>
					<span className="text-2xl font-bold">$591.84</span>
				</div>
				<Button className="w-full gap-2" size="lg" asChild>
					<Link href="/checkout">
						<CreditCard className="size-4" />
						Pay Now
					</Link>
				</Button>
			</aside>
		</section>
	);
}
