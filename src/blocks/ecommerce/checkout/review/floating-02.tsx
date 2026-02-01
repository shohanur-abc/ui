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
	Check,
	CreditCard,
	Lock,
	MapPin,
	Shield,
	Sparkles,
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

const FloatingItem = ({ product }: { product: OrderProduct }) => (
	<div className="group relative overflow-hidden rounded-2xl border bg-card/80 backdrop-blur-sm shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
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
			<div className="mt-3 flex items-center justify-between">
				<Badge variant="secondary">×{product.qty}</Badge>
				<span className="font-bold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const FloatingInfo = ({
	icon: Icon,
	title,
	value,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	verified?: boolean;
}) => (
	<div className="relative overflow-hidden rounded-xl border bg-card/80 p-4 backdrop-blur-sm shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-xs text-muted-foreground">{title}</p>
				<p className="font-medium">{value}</p>
			</div>
			{verified && <Check className="size-5 text-green-500" />}
		</div>
	</div>
);

const SummaryLine = ({
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
			name: 'Table Lamp',
			variant: 'Brass / Linen Shade',
			price: 189.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
		},
		{
			id: '2',
			name: 'Throw Pillow',
			variant: 'Velvet / Emerald / Set of 2',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=400&h=400&fit=crop',
		},
		{
			id: '3',
			name: 'Wall Mirror',
			variant: 'Round / Gold Frame',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background"
			data-theme="neon"
		>
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 shadow-md">
						<Sparkles className="size-3.5" />
						Checkout
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Almost there! Confirm your details
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
							{products.map((product) => (
								<FloatingItem key={product.id} product={product} />
							))}
						</div>

						<div className="grid gap-3 @sm:grid-cols-2">
							<FloatingInfo
								icon={MapPin}
								title="Shipping"
								value="Jennifer K., San Diego, CA"
								verified
							/>
							<FloatingInfo
								icon={MapPin}
								title="Billing"
								value="Jennifer K., San Diego, CA"
								verified
							/>
							<FloatingInfo
								icon={Truck}
								title="Delivery"
								value="Premium · Dec 20-21"
								verified
							/>
							<FloatingInfo
								icon={CreditCard}
								title="Payment"
								value="Amex •••• 2345"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-card/90 backdrop-blur-sm shadow-xl">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$419.97" />
							<SummaryLine label="Shipping" value="$14.99" />
							<SummaryLine label="Tax" value="$35.70" />
							<SummaryLine label="Discount (HOME15)" value="-$63.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$407.66" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2 shadow-lg">
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
