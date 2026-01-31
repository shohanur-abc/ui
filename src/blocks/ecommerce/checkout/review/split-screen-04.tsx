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
	Package,
	Shield,
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

const LeftProduct = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
			<div className="mt-2 flex items-center gap-2">
				<Badge variant="secondary">×{product.qty}</Badge>
				<span className="font-bold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const InfoRow = ({
	icon: Icon,
	title,
	value,
	subValue,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	subValue?: string;
	verified?: boolean;
}) => (
	<div className="flex items-center gap-4 rounded-lg bg-muted/30 p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="font-medium">{value}</p>
			{subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
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
			name: 'Skateboard Deck',
			variant: 'Maple / 8.25"',
			price: 79.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Trucks',
			variant: 'Thunder / Hollow',
			price: 64.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1564429238909-3cc4d4193222?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Wheels',
			variant: 'Spitfire / 54mm',
			price: 44.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center @lg:text-left">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Review Order
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Confirm Your Setup
					</h1>
					<p className="mt-1 text-muted-foreground">
						Complete your skateboard build
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-2">
					<div className="space-y-4">
						{products.map((product) => (
							<LeftProduct key={product.id} product={product} />
						))}
					</div>

					<div className="space-y-6">
						<div className="space-y-3">
							<InfoRow
								icon={MapPin}
								title="Shipping Address"
								value="Jake M., Venice, CA"
								subValue="123 Beach Blvd, 90291"
								verified
							/>
							<InfoRow
								icon={Truck}
								title="Delivery Method"
								value="Express Shipping"
								subValue="Arrives Dec 18-19, 2025"
								verified
							/>
							<InfoRow
								icon={CreditCard}
								title="Payment Method"
								value="Visa •••• 4567"
								subValue="Expires 06/27"
								verified
							/>
						</div>

						<Card className="bg-gradient-to-br from-card to-muted/30">
							<CardHeader>
								<CardTitle>Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryLine label="Subtotal (3 items)" value="$189.97" />
								<SummaryLine label="Shipping" value="$12.99" />
								<SummaryLine label="Tax" value="$16.15" />
								<SummaryLine label="Skater Discount" value="-$19.00" green />
								<Separator className="my-4" />
								<SummaryLine label="Total" value="$200.11" bold />
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
			</div>
		</section>
	);
}
