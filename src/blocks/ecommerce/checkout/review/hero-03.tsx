import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const HeroProduct = ({ product, featured }: { product: Product; featured?: boolean }) => {
	if (featured) {
		return (
			<div className="relative overflow-hidden rounded-2xl @md:col-span-2 @md:row-span-2">
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 p-6">
					<Badge className="mb-2">Featured</Badge>
					<h3 className="text-xl font-bold text-white">{product.name}</h3>
					<p className="text-sm text-white/80">{product.variant}</p>
					<div className="mt-2 flex items-center justify-between">
						<span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
						<Badge variant="secondary">×{product.qty}</Badge>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="group overflow-hidden rounded-xl border bg-card">
			<div className="relative aspect-square overflow-hidden">
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-cover transition-transform group-hover:scale-105"
				/>
			</div>
			<div className="p-3">
				<p className="text-sm font-medium">{product.name}</p>
				<p className="text-xs text-muted-foreground">{product.variant}</p>
				<div className="mt-1 flex items-center justify-between">
					<span className="font-bold">${product.price.toFixed(2)}</span>
					<Badge variant="secondary" className="text-xs">×{product.qty}</Badge>
				</div>
			</div>
		</div>
	);
};

const InfoTile = ({
	icon: Icon,
	title,
	value,
	subValue,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	subValue?: string;
}) => (
	<div className="flex items-start gap-3 rounded-xl border bg-card p-4">
		<Icon className="size-5 text-primary" />
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="font-medium">{value}</p>
			{subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
		</div>
		<Check className="size-5 text-green-500" />
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Professional Camera',
			variant: 'Full Frame / 45MP',
			price: 2499.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
		},
		{
			id: '2',
			name: 'Prime Lens',
			variant: '50mm f/1.4',
			price: 449.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=400&fit=crop',
		},
		{
			id: '3',
			name: 'Camera Bag',
			variant: 'Large / Waterproof',
			price: 129.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
		},
		{
			id: '4',
			name: 'Tripod',
			variant: 'Carbon Fiber',
			price: 299.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?w=400&h=400&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Photography Bundle
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Professional photography gear
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4 @md:grid-cols-3">
							<HeroProduct product={products[0]} featured />
							{products.slice(1).map((product) => (
								<HeroProduct key={product.id} product={product} />
							))}
						</div>

						<div className="grid gap-3 @sm:grid-cols-2">
							<InfoTile
								icon={MapPin}
								title="Shipping"
								value="Michael S., Los Angeles, CA"
							/>
							<InfoTile
								icon={MapPin}
								title="Billing"
								value="Same as shipping"
							/>
							<InfoTile
								icon={Truck}
								title="Delivery"
								value="Insured Premium"
								subValue="Dec 20-21, 2025"
							/>
							<InfoTile
								icon={CreditCard}
								title="Payment"
								value="Amex •••• 4444"
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (4 items)" value="$3,379.96" />
							<SummaryLine label="Shipping" value="$29.99" />
							<SummaryLine label="Tax" value="$287.30" />
							<SummaryLine label="Pro Bundle" value="-$338.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$3,359.25" bold />
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
