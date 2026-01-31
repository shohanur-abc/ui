import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

interface OrderProduct {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

const OverlayItem = ({ product }: { product: OrderProduct }) => (
	<div className="flex gap-4 rounded-xl bg-card p-4 shadow-sm">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-muted-foreground">{product.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<Badge variant="secondary">×{product.quantity}</Badge>
				<span className="font-bold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const InfoLine = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-3 rounded-lg bg-card p-3">
		<Icon className="size-4 text-primary" />
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
		<CheckCircle2 className="size-4 text-green-500" />
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: OrderProduct[] = [
		{
			id: '1',
			name: 'Smart Thermostat',
			variant: 'WiFi / White',
			price: 129.99,
			quantity: 1,
			image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Temperature Sensor',
			variant: 'Pack of 3',
			price: 49.99,
			quantity: 1,
			image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative min-h-screen overflow-hidden" data-theme="neon">
			<div className="absolute inset-0">
				<Image
					src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
					alt="Background"
					fill
					className="object-cover opacity-20"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
			</div>

			<div className="relative mx-auto max-w-3xl px-4 py-12 @sm:px-6 @md:py-16">
				<div className="mb-8">
					<Button variant="ghost" size="sm" className="mb-4 gap-1">
						<ArrowLeft className="size-4" />
						Back
					</Button>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Confirm details before checkout
					</p>
				</div>

				<div className="space-y-6">
					<Card className="bg-card/80 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Package className="size-5 text-primary" />
								Items
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{products.map((product) => (
								<OverlayItem key={product.id} product={product} />
							))}
						</CardContent>
					</Card>

					<Card className="bg-card/80 backdrop-blur-sm">
						<CardContent className="space-y-3 pt-6">
							<InfoLine icon={MapPin} label="Shipping" value="Rachel K., Boston, MA 02101" />
							<InfoLine icon={MapPin} label="Billing" value="Rachel K., Boston, MA 02101" />
							<InfoLine icon={Truck} label="Delivery" value="Standard · Dec 23-26, 2025" />
							<InfoLine icon={CreditCard} label="Payment" value="Visa •••• 3456" />
						</CardContent>
					</Card>

					<Card className="bg-card/80 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<PriceLine label="Subtotal (2 items)" value="$179.98" />
							<PriceLine label="Shipping" value="$0.00" />
							<PriceLine label="Tax" value="$15.30" />
							<PriceLine label="Promo" value="-$18.00" green />
							<Separator className="my-4" />
							<PriceLine label="Total" value="$177.28" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Place Order
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
