import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CartItemCardProps = {
	image: string;
	name: string;
	price: string;
	quantity: number;
};

type SummaryRowProps = {
	label: string;
	value: string;
};

const CartItemCard = ({ image, name, price, quantity }: CartItemCardProps) => (
	<Card className="bg-muted/50">
		<CardContent className="flex items-center gap-3 py-3">
			<Avatar className="size-12 rounded-lg">
				<AvatarImage src={image} alt={name} className="object-cover" />
				<AvatarFallback className="rounded-lg">
					{name.slice(0, 2)}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1">
				<p className="text-sm font-medium">{name}</p>
				<p className="text-xs text-muted-foreground">Qty: {quantity}</p>
			</div>
			<span className="font-semibold">{price}</span>
		</CardContent>
	</Card>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

export default function Main() {
	const cartItems: CartItemCardProps[] = [
		{
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
			name: 'Premium Watch',
			price: '$299.00',
			quantity: 1,
		},
		{
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
			name: 'Smart Band',
			price: '$89.00',
			quantity: 2,
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$477.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$38.16' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24">
				<h3 className="mb-4 font-semibold">Items in Cart</h3>
				<div className="mb-4 space-y-2">
					{cartItems.map((item, i) => (
						<CartItemCard key={i} {...item} />
					))}
				</div>
				<Card>
					<CardContent className="space-y-3 pt-6">
						{summaryItems.map((item, i) => (
							<SummaryRow key={i} {...item} />
						))}
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-lg font-semibold">Total</span>
							<span className="text-2xl font-bold">$515.16</span>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2">
						<Button className="w-full" size="lg" asChild>
							<Link href="/checkout">Checkout</Link>
						</Button>
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<CheckCircle2 className="size-3 text-green-500" />
							<span>All items in stock</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
