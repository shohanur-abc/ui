import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CreditCard,
	Lock,
	MapPin,
	Package,
	ShieldCheck,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const FloatItem = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4 rounded-2xl bg-background/80 p-4 shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary">×{item.qty}</Badge>
		</div>
	</div>
);

const FloatInfo = ({
	icon: Icon,
	title,
	content,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	content: string;
}) => (
	<div className="flex items-center gap-3 rounded-xl bg-background/80 p-4 shadow-lg backdrop-blur-sm">
		<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="font-medium">{content}</p>
		</div>
	</div>
);

const TotalRow = ({
	label,
	value,
	bold,
	green,
}: {
	label: string;
	value: string;
	bold?: boolean;
	green?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Mechanical Keyboard',
			variant: 'Cherry MX / RGB',
			price: 149.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Mouse Pad XL',
			variant: 'Extended / Black',
			price: 29.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

			<div className="relative mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge variant="secondary" className="mb-4">
						<Package className="mr-1 size-3" />
						Order Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Almost There!
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review your order before checkout
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<div className="space-y-4">
							<h2 className="text-lg font-semibold">Your Items</h2>
							{items.map((item) => (
								<FloatItem key={item.id} item={item} />
							))}
						</div>

						<Separator />

						<div className="grid gap-4 @sm:grid-cols-2">
							<FloatInfo
								icon={MapPin}
								title="Shipping Address"
								content="David K., San Francisco, CA"
							/>
							<FloatInfo
								icon={MapPin}
								title="Billing Address"
								content="David K., San Francisco, CA"
							/>
							<FloatInfo
								icon={Truck}
								title="Delivery Method"
								content="Express · Dec 19-20"
							/>
							<FloatInfo
								icon={CreditCard}
								title="Payment Method"
								content="Mastercard •••• 7890"
							/>
						</div>
					</div>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card className="bg-background/80 shadow-2xl backdrop-blur-sm">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<TotalRow label="Subtotal (2 items)" value="$179.98" />
								<TotalRow label="Shipping" value="$11.99" />
								<TotalRow label="Tax" value="$15.30" />
								<TotalRow label="Promo Code" value="-$18.00" green />
								<Separator className="my-4" />
								<TotalRow label="Total" value="$189.27" bold />
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
									<Lock className="size-4" />
									Place Order
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<ShieldCheck className="size-4" />
									<span>Secure checkout with SSL encryption</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
