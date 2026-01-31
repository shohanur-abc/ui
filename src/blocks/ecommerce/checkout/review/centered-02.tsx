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

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const CenteredItem = ({ item }: { item: OrderItem }) => (
	<div className="flex flex-col items-center text-center">
		<div className="relative mb-3 size-24 overflow-hidden rounded-xl">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<p className="font-medium">{item.name}</p>
		<p className="text-sm text-muted-foreground">{item.variant}</p>
		<div className="mt-2 flex items-center gap-2">
			<Badge variant="secondary">×{item.qty}</Badge>
			<span className="font-bold">${item.price.toFixed(2)}</span>
		</div>
	</div>
);

const InfoBadge = ({
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
	<div className="flex flex-col items-center gap-2 text-center">
		<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
		{verified && <Check className="size-4 text-green-500" />}
	</div>
);

const SummaryRow = ({
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
			name: 'Candle Set',
			variant: 'Lavender / 3-Pack',
			price: 44.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Diffuser',
			variant: 'Ceramic / White',
			price: 59.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Essential Oils',
			variant: 'Starter Kit / 6-Pack',
			price: 34.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1600493572977-6607a7d4b66a?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Step
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Confirm Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Review your selections below
					</p>
				</div>

				<Card className="bg-gradient-to-br from-card to-muted/30">
					<CardHeader>
						<CardTitle className="text-center">Your Items</CardTitle>
					</CardHeader>

					<CardContent className="space-y-8">
						<div className="flex flex-wrap justify-center gap-8">
							{items.map((item) => (
								<CenteredItem key={item.id} item={item} />
							))}
						</div>

						<Separator />

						<div className="flex flex-wrap justify-center gap-8">
							<InfoBadge
								icon={MapPin}
								label="Shipping"
								value="Sarah M., Denver, CO"
								verified
							/>
							<InfoBadge
								icon={Truck}
								label="Delivery"
								value="Dec 22-24"
								verified
							/>
							<InfoBadge
								icon={CreditCard}
								label="Payment"
								value="Visa •••• 4321"
								verified
							/>
						</div>

						<Separator />

						<div className="mx-auto max-w-sm space-y-3">
							<SummaryRow label="Subtotal (3 items)" value="$139.97" />
							<SummaryRow label="Shipping" value="$7.99" />
							<SummaryRow label="Tax" value="$11.90" />
							<SummaryRow label="Discount" value="-$14.00" green />
							<Separator className="my-4" />
							<SummaryRow label="Total" value="$145.86" bold />
						</div>
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
		</section>
	);
}
