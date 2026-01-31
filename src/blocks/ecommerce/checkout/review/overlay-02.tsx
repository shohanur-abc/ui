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

const OverlayItem = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 rounded-xl bg-background/80 p-4 backdrop-blur-sm">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg shadow-lg">
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

const OverlayInfo = ({
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
	<div className="flex items-center gap-3 rounded-lg bg-background/80 px-4 py-3 backdrop-blur-sm">
		<Icon className="size-4 text-primary" />
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
		{verified && <Check className="size-4 text-green-500" />}
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
			name: 'Beach Towel',
			variant: 'Oversized / Striped',
			price: 44.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Sunglasses',
			variant: 'Polarized / Tortoise',
			price: 129.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Straw Hat',
			variant: 'Wide Brim / Natural',
			price: 39.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative min-h-screen overflow-hidden" data-theme="neon">
			<div className="absolute inset-0">
				<Image
					src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop"
					alt="Background"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
			</div>
			
			<div className="relative mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 bg-background/80 backdrop-blur-sm">
						<Sparkles className="size-3.5" />
						Summer Collection
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">
						Your beach essentials await
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-4">
						{products.map((product) => (
							<OverlayItem key={product.id} product={product} />
						))}

						<div className="grid gap-3 @sm:grid-cols-2">
							<OverlayInfo
								icon={MapPin}
								label="Shipping"
								value="Megan L., Honolulu, HI"
								verified
							/>
							<OverlayInfo
								icon={MapPin}
								label="Billing"
								value="Megan L., Honolulu, HI"
								verified
							/>
							<OverlayInfo
								icon={Truck}
								label="Delivery"
								value="Express · Dec 20-21"
								verified
							/>
							<OverlayInfo
								icon={CreditCard}
								label="Payment"
								value="Visa •••• 8765"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-background/90 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (4 items)" value="$259.96" />
							<SummaryLine label="Shipping" value="$12.99" />
							<SummaryLine label="Tax" value="$22.10" />
							<SummaryLine label="Beach Bundle" value="-$26.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$269.05" bold />
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
