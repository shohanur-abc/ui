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
	ArrowRight,
	Check,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Shield,
	Star,
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
	rating?: number;
}

const ReviewCard = ({ item }: { item: CartItem }) => (
	<div className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg">
		<div className="relative aspect-square overflow-hidden">
			<Image
				src={item.image}
				alt={item.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
			<Badge className="absolute left-3 top-3">×{item.qty}</Badge>
		</div>
		<div className="p-4">
			<div className="mb-2 flex items-center gap-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-3.5 ${i < (item.rating ?? 5) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
					/>
				))}
			</div>
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
			<p className="mt-2 text-lg font-bold">${item.price.toFixed(2)}</p>
		</div>
	</div>
);

const InfoLine = ({
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
	<div className="flex items-center gap-3 rounded-lg border bg-card p-3">
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
			name: 'Essential Oils Kit',
			variant: 'Organic / 12-Pack',
			price: 59.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1600493572977-6607a7d4b66a?w=400&h=400&fit=crop',
			rating: 5,
		},
		{
			id: '2',
			name: 'Aromatherapy Diffuser',
			variant: 'Ultrasonic / Wood',
			price: 44.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
			rating: 4,
		},
		{
			id: '3',
			name: 'Meditation Cushion',
			variant: 'Buckwheat / Grey',
			price: 49.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=400&fit=crop',
			rating: 5,
		},
		{
			id: '4',
			name: 'Sage Bundle',
			variant: 'White Sage / 3-Pack',
			price: 19.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=400&fit=crop',
			rating: 5,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Gift className="size-3.5" />
						Gift-Ready
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Wellness Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Self-care essentials for a balanced life
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4 @md:grid-cols-4">
							{items.map((item) => (
								<ReviewCard key={item.id} item={item} />
							))}
						</div>

						<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
							<InfoLine
								icon={MapPin}
								label="Ship to"
								value="Austin, TX"
								verified
							/>
							<InfoLine icon={MapPin} label="Billing" value="Same" verified />
							<InfoLine
								icon={Truck}
								label="Delivery"
								value="Dec 22-24"
								verified
							/>
							<InfoLine
								icon={CreditCard}
								label="Payment"
								value="•••• 3456"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (5 items)" value="$194.95" />
							<SummaryLine label="Shipping" value="$0.00" />
							<SummaryLine label="Tax" value="$16.57" />
							<SummaryLine label="Wellness Discount" value="-$19.50" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$192.02" bold />
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
