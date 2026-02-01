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
	ArrowLeft,
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

interface CartProduct {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const SplitItem = ({ product }: { product: CartProduct }) => (
	<div className="flex items-center gap-4 rounded-xl bg-muted/30 p-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
			<div className="mt-2 flex items-center gap-2">
				<Badge variant="secondary">Qty: {product.qty}</Badge>
			</div>
		</div>
		<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
	</div>
);

const DetailBlock = ({
	icon: Icon,
	title,
	line1,
	line2,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	line1: string;
	line2?: string;
}) => (
	<div className="rounded-xl bg-muted/30 p-4">
		<div className="mb-2 flex items-center gap-2">
			<Icon className="size-4 text-primary" />
			<span className="text-xs font-medium uppercase text-muted-foreground">
				{title}
			</span>
		</div>
		<p className="font-medium">{line1}</p>
		{line2 && <p className="text-sm text-muted-foreground">{line2}</p>}
	</div>
);

const VerifyItem = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2">
		<CheckCircle2 className="size-4 text-green-500" />
		<span className="text-sm">{label}</span>
	</div>
);

const PriceLine = ({
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
	const products: CartProduct[] = [
		{
			id: '1',
			name: 'Noise-Canceling Headphones',
			variant: 'Over-Ear / Midnight',
			price: 279.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Headphone Stand',
			variant: 'Aluminum / Matte Black',
			price: 44.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="grid min-h-screen @xl:grid-cols-2">
				<div className="flex flex-col justify-center px-4 py-12 @sm:px-8 @lg:px-12 @xl:px-16">
					<Button variant="ghost" size="sm" className="mb-6 w-fit gap-1">
						<ArrowLeft className="size-4" />
						Back to Cart
					</Button>

					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Confirm all details before checkout
					</p>

					<div className="mt-8 space-y-4">
						{products.map((product) => (
							<SplitItem key={product.id} product={product} />
						))}
					</div>

					<div className="mt-8 grid gap-4 @sm:grid-cols-2">
						<DetailBlock
							icon={MapPin}
							title="Shipping"
							line1="Michael R."
							line2="789 Sound Ave, Los Angeles, CA 90001"
						/>
						<DetailBlock
							icon={MapPin}
							title="Billing"
							line1="Michael R."
							line2="789 Sound Ave, Los Angeles, CA 90001"
						/>
						<DetailBlock
							icon={Truck}
							title="Delivery"
							line1="Premium Express"
							line2="Dec 18-19, 2025"
						/>
						<DetailBlock
							icon={CreditCard}
							title="Payment"
							line1="Mastercard •••• 5432"
							line2="Expires 09/27"
						/>
					</div>

					<div className="mt-8 flex flex-wrap gap-4">
						<VerifyItem label="Items verified" />
						<VerifyItem label="Address confirmed" />
						<VerifyItem label="Payment authorized" />
					</div>
				</div>

				<div className="flex flex-col justify-center border-l bg-muted/30 px-4 py-12 @sm:px-8 @lg:px-12 @xl:px-16">
					<Card className="mx-auto w-full max-w-md">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Package className="size-5" />
								Order Summary
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<PriceLine label="Subtotal (2 items)" value="$324.98" />
							<PriceLine label="Shipping" value="$0.00" />
							<PriceLine label="Tax" value="$27.62" />
							<PriceLine label="Promo (SOUND20)" value="-$65.00" green />
							<Separator className="my-4" />
							<PriceLine label="Total" value="$287.60" bold />
						</CardContent>
						<CardFooter className="flex-col gap-4">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Complete Purchase
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure 256-bit encryption</span>
							</div>
						</CardFooter>
					</Card>

					<div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 text-sm text-muted-foreground">
						<span>30-day returns</span>
						<span>•</span>
						<span>Free shipping over $200</span>
						<span>•</span>
						<span>24/7 support</span>
					</div>
				</div>
			</div>
		</section>
	);
}
