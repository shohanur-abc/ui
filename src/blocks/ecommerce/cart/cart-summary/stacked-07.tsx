import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
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

const CartItem = ({
	image,
	name,
	variant,
	price,
	quantity,
}: CartItemProps) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-16 rounded-lg">
			<AvatarImage src={image} alt={name} className="object-cover" />
			<AvatarFallback className="rounded-lg">
				{name.slice(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 space-y-1">
			<p className="line-clamp-1 text-sm font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{variant}</p>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="icon-sm" className="size-6">
					<Minus className="size-3" />
				</Button>
				<span className="w-6 text-center text-sm">{quantity}</span>
				<Button variant="outline" size="icon-sm" className="size-6">
					<Plus className="size-3" />
				</Button>
			</div>
		</div>
		<div className="text-right">
			<p className="font-semibold">{price}</p>
			<Button variant="ghost" size="icon-sm" className="size-6 text-destructive">
				<Trash2 className="size-3" />
			</Button>
		</div>
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
		<span className="text-base font-semibold">{label}</span>
		<span className="text-xl font-bold">{value}</span>
	</div>
);

const Header = ({
	title,
	description,
}: { title: string; description: string }) => (
	<CardHeader className="border-b">
		<CardTitle>{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
);

export default function Main() {
	const cartItems: CartItemProps[] = [
		{
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
			name: 'Premium Wireless Headphones',
			variant: 'Matte Black',
			price: '$249.00',
			quantity: 1,
		},
		{
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200',
			name: 'Smart Watch Pro',
			variant: 'Silver / 44mm',
			price: '$399.00',
			quantity: 1,
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$648.00' },
		{ label: 'Shipping', value: '$0.00' },
		{ label: 'Tax', value: '$51.84' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-md px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Card>
					<Header
						title="Shopping Cart"
						description="2 items in your cart"
					/>
					<CardContent className="space-y-4">
						<div className="space-y-4">
							{cartItems.map((item, i) => (
								<CartItem key={i} {...item} />
							))}
						</div>
						<Separator />
						<div className="space-y-2">
							{summaryItems.map((item, i) => (
								<SummaryRow key={i} {...item} />
							))}
						</div>
						<Separator />
						<TotalRow label="Order Total" value="$699.84" />
					</CardContent>
					<CardFooter className="border-t flex-col gap-2">
						<Button className="w-full gap-2" size="lg" asChild>
							<Link href="/checkout">
								Checkout
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button variant="ghost" className="w-full" asChild>
							<Link href="/shop">Continue Shopping</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
