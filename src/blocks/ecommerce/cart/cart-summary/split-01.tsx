import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingCart, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type CartItemProps = {
	image: string;
	name: string;
	price: string;
	quantity: number;
};

type SummaryRowProps = {
	label: string;
	value: string;
};

const CartItem = ({ image, name, price, quantity }: CartItemProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-12 rounded-lg">
			<AvatarImage src={image} alt={name} className="object-cover" />
			<AvatarFallback className="rounded-lg text-xs">
				{name.slice(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">Qty: {quantity}</p>
		</div>
		<span className="text-sm font-semibold">{price}</span>
	</div>
);

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-xl font-bold">{label}</span>
		<span className="text-2xl font-bold text-primary">{value}</span>
	</div>
);

const Header = ({
	icon: Icon,
	title,
	badge,
}: {
	icon: LucideIcon;
	title: string;
	badge: string;
}) => (
	<CardHeader className="border-b">
		<CardTitle className="flex items-center gap-2">
			<Icon className="size-5" />
			{title}
			<Badge variant="secondary" className="ml-auto">
				{badge}
			</Badge>
		</CardTitle>
	</CardHeader>
);

const CheckoutButton = ({
	label,
	href,
	icon: Icon,
}: {
	label: string;
	href: string;
	icon: LucideIcon;
}) => (
	<Button className="w-full gap-2" size="lg" asChild>
		<Link href={href}>
			{label}
			<Icon className="size-4" />
		</Link>
	</Button>
);

export default function Main() {
	const cartItems: CartItemProps[] = [
		{
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200',
			name: 'Leather Messenger Bag',
			price: '$189.00',
			quantity: 1,
		},
		{
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
			name: 'Minimalist Watch',
			price: '$249.00',
			quantity: 1,
		},
		{
			image:
				'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200',
			name: 'Classic Sunglasses',
			price: '$129.00',
			quantity: 2,
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$696.00' },
		{ label: 'Shipping', value: '$15.00' },
		{ label: 'Tax', value: '$56.88' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<Card>
						<Header icon={ShoppingCart} title="Your Cart" badge="4 items" />
						<CardContent className="space-y-4">
							{cartItems.map((item, i) => (
								<CartItem key={i} {...item} />
							))}
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="border-b">
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow label="Total" value="$767.88" />
							<CheckoutButton
								label="Proceed to Checkout"
								href="/checkout"
								icon={ArrowRight}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
