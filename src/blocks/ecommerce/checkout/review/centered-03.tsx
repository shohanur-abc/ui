import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Gift,
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

const CenteredProduct = ({ product }: { product: Product }) => (
	<div className="flex flex-col items-center text-center">
		<div className="relative size-20 overflow-hidden rounded-xl border @md:size-24">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<p className="mt-2 text-sm font-medium">{product.name}</p>
		<p className="text-xs text-muted-foreground">{product.variant}</p>
		<Badge className="mt-1">${product.price.toFixed(2)} ×{product.qty}</Badge>
	</div>
);

const InfoPill = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2">
		<Icon className="size-4 text-primary" />
		<span className="text-sm text-muted-foreground">{label}</span>
		<span className="text-sm font-medium">{value}</span>
		<Check className="size-4 text-green-500" />
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
			name: 'Smart Thermostat',
			variant: 'WiFi / White',
			price: 249.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Smart Plugs',
			variant: 'Set of 4',
			price: 49.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Smart Bulbs',
			variant: 'RGB / 2-Pack',
			price: 39.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 py-12 @sm:px-6 @md:py-16">
				<div className="mb-8 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Smart Home Bundle
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Your smart home upgrade
					</p>
				</div>

				<Card>
					<CardHeader className="text-center">
						<CardTitle>Order Items</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap items-start justify-center gap-6 @md:gap-8">
							{products.map((product) => (
								<CenteredProduct key={product.id} product={product} />
							))}
						</div>

						<Separator className="my-6" />

						<div className="flex flex-wrap justify-center gap-3">
							<InfoPill icon={MapPin} label="Ship To" value="Boston, MA" />
							<InfoPill icon={Truck} label="Delivery" value="Dec 19-20" />
							<InfoPill icon={CreditCard} label="Card" value="•••• 5678" />
							<InfoPill icon={Gift} label="Promo" value="SMART25" />
						</div>

						<Separator className="my-6" />

						<div className="mx-auto max-w-xs space-y-2">
							<SummaryLine label="Subtotal (4 items)" value="$379.96" />
							<SummaryLine label="Shipping" value="Free" green />
							<SummaryLine label="Tax" value="$32.30" />
							<SummaryLine label="Bundle Discount" value="-$38.00" green />
							<Separator className="my-3" />
							<SummaryLine label="Total" value="$374.26" bold />
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-3">
						<Button size="lg" className="w-full max-w-xs gap-2">
							<Lock className="size-4" />
							Complete Order
							<ArrowRight className="size-4" />
						</Button>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Secure checkout</span>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
