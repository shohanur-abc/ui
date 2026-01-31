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

const HeroProduct = ({ product }: { product: Product }) => (
	<div className="group relative overflow-hidden rounded-3xl">
		<div className="relative aspect-[4/3] overflow-hidden">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
		</div>
		<div className="absolute bottom-0 left-0 right-0 p-6">
			<Badge className="mb-2">Featured</Badge>
			<h3 className="text-xl font-bold">{product.name}</h3>
			<p className="text-muted-foreground">{product.variant}</p>
			<div className="mt-3 flex items-center justify-between">
				<span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
				<Badge variant="secondary">×{product.qty}</Badge>
			</div>
		</div>
	</div>
);

const SecondaryProduct = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary">×{product.qty}</Badge>
		</div>
	</div>
);

const InfoCard = ({
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
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
		{verified && <Check className="size-5 text-green-500" />}
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
			name: 'Leather Sofa',
			variant: 'Modern / Cognac / 3-Seater',
			price: 1899.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
		},
		{
			id: '2',
			name: 'Throw Blanket',
			variant: 'Wool / Cream',
			price: 89.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Accent Pillows',
			variant: 'Set of 4 / Earth Tones',
			price: 129.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=200&h=200&fit=crop',
		},
	];

	const [hero, ...others] = products;

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Premium Collection
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl @lg:text-4xl">
						Review Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Confirm your furniture selections
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<HeroProduct product={hero} />

						<div className="space-y-3">
							{others.map((product) => (
								<SecondaryProduct key={product.id} product={product} />
							))}
						</div>

						<div className="grid gap-4 @sm:grid-cols-2">
							<InfoCard
								icon={MapPin}
								label="Shipping"
								value="Michael S., Nashville, TN"
								verified
							/>
							<InfoCard
								icon={MapPin}
								label="Billing"
								value="Michael S., Nashville, TN"
								verified
							/>
							<InfoCard
								icon={Truck}
								label="Delivery"
								value="White Glove · Dec 28-30"
								verified
							/>
							<InfoCard
								icon={CreditCard}
								label="Payment"
								value="Mastercard •••• 7654"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$2,119.97" />
							<SummaryLine label="Shipping" value="$99.99" />
							<SummaryLine label="Tax" value="$180.20" />
							<SummaryLine label="Furniture Discount" value="-$212.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$2,188.16" bold />
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
