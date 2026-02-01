import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type CartItemProps = {
	image: string;
	name: string;
	color: string;
	size: string;
	price: string;
	quantity: number;
};

type SummaryRowProps = {
	label: string;
	value: string;
};

const CartItemFull = ({
	image,
	name,
	color,
	size,
	price,
	quantity,
}: CartItemProps) => (
	<div className="flex gap-4 rounded-lg border p-3">
		<Avatar className="size-20 rounded-lg">
			<AvatarImage src={image} alt={name} className="object-cover" />
			<AvatarFallback className="rounded-lg">
				{name.slice(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
		<div className="flex flex-1 flex-col justify-between">
			<div className="flex items-start justify-between">
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-muted-foreground">
						{color} / {size}
					</p>
				</div>
				<Button variant="ghost" size="icon-sm" className="size-6">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 rounded-lg border">
					<Button variant="ghost" size="icon-sm" className="size-7">
						<Minus className="size-3" />
					</Button>
					<span className="w-8 text-center text-sm">{quantity}</span>
					<Button variant="ghost" size="icon-sm" className="size-7">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="font-semibold">{price}</span>
			</div>
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
		<span className="text-xl font-bold">{label}</span>
		<span className="text-2xl font-bold text-primary">{value}</span>
	</div>
);

export default function Main() {
	const cartItems: CartItemProps[] = [
		{
			image:
				'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200',
			name: 'Premium Cotton T-Shirt',
			color: 'Navy Blue',
			size: 'Large',
			price: '$45.00',
			quantity: 2,
		},
		{
			image:
				'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200',
			name: 'Slim Fit Chinos',
			color: 'Khaki',
			size: '32',
			price: '$79.00',
			quantity: 1,
		},
		{
			image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200',
			name: 'Leather Belt',
			color: 'Brown',
			size: 'M',
			price: '$55.00',
			quantity: 1,
		},
	];

	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal (4 items)', value: '$224.00' },
		{ label: 'Shipping', value: '$8.99' },
		{ label: 'Tax', value: '$18.64' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @xl:grid-cols-[1fr_380px]">
					<Card>
						<CardHeader className="border-b">
							<CardTitle className="flex items-center justify-between">
								Shopping Cart
								<Badge variant="outline">4 items</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{cartItems.map((item, i) => (
								<CartItemFull key={i} {...item} />
							))}
						</CardContent>
					</Card>
					<Card className="h-fit @xl:sticky @xl:top-4">
						<CardHeader className="border-b">
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow label="Total" value="$251.63" />
							<div className="space-y-2">
								<Button className="w-full gap-2" size="lg" asChild>
									<Link href="/checkout">
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/shop">Continue Shopping</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
