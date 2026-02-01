import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const FloatingProductCard = ({ item }: { item: CartItem }) => (
	<div className="group relative overflow-hidden rounded-2xl border bg-card shadow-lg transition-transform hover:-translate-y-1">
		<div className="relative aspect-square overflow-hidden">
			<Image
				src={item.image}
				alt={item.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
			<Badge className="absolute right-2 top-2 shadow-md">×{item.qty}</Badge>
		</div>
		<div className="p-4">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
			<p className="mt-1 text-lg font-bold">${item.price.toFixed(2)}</p>
		</div>
	</div>
);

const FloatingInfoCard = ({
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
	<div className="flex items-start gap-3 rounded-xl bg-muted/50 p-4 shadow-sm">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
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
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Bluetooth Speaker',
			variant: 'Waterproof / Blue',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
		},
		{
			id: '2',
			name: 'Earbuds',
			variant: 'Active Noise',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
		},
		{
			id: '3',
			name: 'Charging Case',
			variant: 'Wireless / Black',
			price: 39.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 shadow-lg">
						<Sparkles className="size-3.5" />
						Audio Collection
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">Premium sound equipment</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4 @md:grid-cols-3">
							{items.map((item) => (
								<FloatingProductCard key={item.id} item={item} />
							))}
						</div>

						<div className="grid gap-3 @sm:grid-cols-2">
							<FloatingInfoCard
								icon={MapPin}
								title="Shipping"
								value="Alex W., Miami, FL"
							/>
							<FloatingInfoCard
								icon={MapPin}
								title="Billing"
								value="Alex W., Miami, FL"
							/>
							<FloatingInfoCard
								icon={Truck}
								title="Delivery"
								value="Express"
								subValue="Dec 18-19, 2025"
							/>
							<FloatingInfoCard
								icon={CreditCard}
								title="Payment"
								value="Apple Pay"
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start shadow-xl">
						<CardContent className="space-y-4 pt-6">
							<h2 className="text-lg font-semibold">Order Summary</h2>
							<SummaryLine label="Subtotal (3 items)" value="$269.97" />
							<SummaryLine label="Shipping" value="$9.99" />
							<SummaryLine label="Tax" value="$22.95" />
							<SummaryLine label="Audio Bundle" value="-$27.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$275.91" bold />

							<Button size="lg" className="w-full gap-2 shadow-lg">
								<Lock className="size-4" />
								Complete Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
