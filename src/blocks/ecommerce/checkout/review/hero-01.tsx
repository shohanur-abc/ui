import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
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

const HeroItem = ({ item }: { item: OrderItem }) => (
	<div className="group relative overflow-hidden rounded-2xl border bg-card">
		<div className="relative aspect-[4/3] overflow-hidden">
			<Image
				src={item.image}
				alt={item.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
			<div className="absolute bottom-4 left-4 right-4">
				<p className="font-semibold text-foreground">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
			</div>
		</div>
		<div className="flex items-center justify-between p-4">
			<Badge variant="secondary">×{item.qty}</Badge>
			<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
		</div>
	</div>
);

const InfoCard = ({
	icon: Icon,
	title,
	value,
	subtitle,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	subtitle?: string;
}) => (
	<div className="flex items-start gap-4 rounded-xl border bg-card p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="font-medium">{value}</p>
			{subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
		</div>
		<CheckCircle className="size-5 text-green-500" />
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Leather Backpack',
			variant: 'Vintage Brown / Large',
			price: 189.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
		},
		{
			id: '2',
			name: 'Travel Pouch Set',
			variant: 'Canvas / 3-Piece',
			price: 49.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=600&h=400&fit=crop',
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
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Review Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Verify all details before completing your purchase
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_400px]">
					<div className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2">
							{items.map((item) => (
								<HeroItem key={item.id} item={item} />
							))}
						</div>

						<div className="space-y-4">
							<InfoCard
								icon={MapPin}
								title="Shipping Address"
								value="Oliver M., 456 Traveler St"
								subtitle="Portland, OR 97209"
							/>
							<InfoCard
								icon={MapPin}
								title="Billing Address"
								value="Oliver M., 456 Traveler St"
								subtitle="Portland, OR 97209"
							/>
							<InfoCard
								icon={Truck}
								title="Delivery"
								value="Express Shipping"
								subtitle="Arrives Dec 19-20, 2025"
							/>
							<InfoCard
								icon={CreditCard}
								title="Payment"
								value="American Express •••• 0001"
								subtitle="Expires 02/28"
							/>
						</div>
					</div>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card className="bg-gradient-to-br from-card to-muted/30">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<TotalLine label="Subtotal (2 items)" value="$239.98" />
								<TotalLine label="Shipping" value="$14.99" />
								<TotalLine label="Tax" value="$20.40" />
								<TotalLine label="Discount (TRAVEL10)" value="-$24.00" green />
								<Separator className="my-4" />
								<TotalLine label="Total" value="$251.37" bold />
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Complete Order
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<Shield className="size-3" />
									<span>Secure checkout with SSL</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
