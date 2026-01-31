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

const FullscreenProduct = ({ item }: { item: CartItem }) => (
	<div className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
		<div className="relative aspect-square overflow-hidden">
			<Image
				src={item.image}
				alt={item.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
			<Badge className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm">
				×{item.qty}
			</Badge>
		</div>
		<div className="p-4">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
			<p className="mt-2 text-lg font-bold">${item.price.toFixed(2)}</p>
		</div>
	</div>
);

const InfoCard = ({
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
	<div className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Backpack',
			variant: 'Travel / 40L',
			price: 149.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
		},
		{
			id: '2',
			name: 'Packing Cubes',
			variant: 'Set of 4',
			price: 34.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=400&h=400&fit=crop',
		},
		{
			id: '3',
			name: 'Travel Pillow',
			variant: 'Memory Foam',
			price: 29.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
		},
		{
			id: '4',
			name: 'Toiletry Bag',
			variant: 'Hanging / Black',
			price: 24.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
		},
	];

	return (
		<section className="@container relative min-h-screen overflow-hidden" data-theme="neon">
			<div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
			
			<div className="relative mx-auto max-w-7xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-12 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Travel Essentials
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl @lg:text-5xl">
						Review Your Order
					</h1>
					<p className="mt-2 text-lg text-muted-foreground">
						Adventure awaits - complete your travel kit
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_400px]">
					<div className="space-y-8">
						<div className="grid grid-cols-2 gap-4 @md:grid-cols-4">
							{items.map((item) => (
								<FullscreenProduct key={item.id} item={item} />
							))}
						</div>

						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
							<InfoCard
								icon={MapPin}
								title="Ship To"
								value="Logan A."
								subValue="Boulder, CO"
							/>
							<InfoCard
								icon={MapPin}
								title="Bill To"
								value="Logan A."
								subValue="Boulder, CO"
							/>
							<InfoCard
								icon={Truck}
								title="Delivery"
								value="Express"
								subValue="Dec 18-19"
							/>
							<InfoCard
								icon={CreditCard}
								title="Payment"
								value="Apple Pay"
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardContent className="space-y-4 pt-6">
							<h2 className="text-xl font-semibold">Order Summary</h2>
							<SummaryLine label="Subtotal (4 items)" value="$239.96" />
							<SummaryLine label="Shipping" value="$12.99" />
							<SummaryLine label="Tax" value="$20.40" />
							<SummaryLine label="Travel Bundle" value="-$24.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$249.35" bold />

							<Button size="lg" className="w-full gap-2">
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
