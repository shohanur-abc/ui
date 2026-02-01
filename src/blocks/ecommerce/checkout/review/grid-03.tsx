import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderProduct {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const GridItem = ({ product }: { product: OrderProduct }) => (
	<div className="group relative overflow-hidden rounded-xl border bg-card">
		<div className="relative aspect-square overflow-hidden">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
		</div>
		<div className="p-4">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
			<div className="mt-2 flex items-center justify-between">
				<Badge variant="secondary">×{product.qty}</Badge>
				<span className="font-bold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const InfoRow = ({
	icon: Icon,
	label,
	value,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	verified?: boolean;
}) => (
	<div className="flex items-center gap-3 rounded-lg border bg-card p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
		{verified && <CheckCircle2 className="size-5 text-green-500" />}
	</div>
);

const TotalLine = ({
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
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const products: OrderProduct[] = [
		{
			id: '1',
			name: 'Ceramic Plant Pot',
			variant: 'Large / White',
			price: 39.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
		},
		{
			id: '2',
			name: 'Succulent Set',
			variant: 'Mixed / 4-Pack',
			price: 34.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop',
		},
		{
			id: '3',
			name: 'Watering Can',
			variant: 'Copper / 1.5L',
			price: 29.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
		},
		{
			id: '4',
			name: 'Plant Food',
			variant: 'Organic / 500ml',
			price: 14.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=400&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4">
						<Package className="mr-1 size-3" />
						Order Review
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Items
					</h1>
					<p className="mt-1 text-muted-foreground">
						Confirm all products and details
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4 @md:grid-cols-4">
							{products.map((product) => (
								<GridItem key={product.id} product={product} />
							))}
						</div>

						<div className="grid gap-4 @sm:grid-cols-2">
							<InfoRow
								icon={MapPin}
								label="Shipping Address"
								value="Emily G., San Francisco, CA"
								verified
							/>
							<InfoRow
								icon={MapPin}
								label="Billing Address"
								value="Emily G., San Francisco, CA"
								verified
							/>
							<InfoRow
								icon={Truck}
								label="Delivery Method"
								value="Standard · Dec 24-27"
								verified
							/>
							<InfoRow
								icon={CreditCard}
								label="Payment"
								value="Visa •••• 6789"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<TotalLine label="Subtotal (5 items)" value="$159.95" />
							<TotalLine label="Shipping" value="$0.00" />
							<TotalLine label="Tax" value="$13.60" />
							<TotalLine label="Discount (PLANT10)" value="-$16.00" green />
							<Separator className="my-4" />
							<TotalLine label="Total" value="$157.55" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Complete Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
