import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CreditCard,
	Lock,
	MapPin,
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

const MinimalProduct = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-3">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg border">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.variant} · ×{item.qty}</p>
		</div>
		<span className="font-medium">${item.price.toFixed(2)}</span>
	</div>
);

const MinimalInfo = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4 text-muted-foreground" />
		<span className="text-sm text-muted-foreground">{label}:</span>
		<span className="text-sm font-medium">{value}</span>
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Candles Set',
			variant: 'Lavender / 3-Pack',
			price: 34.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Diffuser',
			variant: 'Ceramic / White',
			price: 49.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1608571423539-e951b16a0a86?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-md px-4 py-10 @sm:px-6 @md:py-14">
				<h1 className="mb-6 text-center text-xl font-bold tracking-tight">
					Order Summary
				</h1>

				<div className="space-y-6">
					<div className="space-y-3">
						{items.map((item) => (
							<MinimalProduct key={item.id} item={item} />
						))}
					</div>

					<Separator />

					<div className="space-y-2">
						<MinimalInfo icon={MapPin} label="Shipping" value="Seattle, WA" />
						<MinimalInfo icon={Truck} label="Delivery" value="Dec 20-21" />
						<MinimalInfo icon={CreditCard} label="Payment" value="•••• 7777" />
					</div>

					<Separator />

					<div className="space-y-2">
						<SummaryLine label="Subtotal" value="$84.98" />
						<SummaryLine label="Shipping" value="$4.99" />
						<SummaryLine label="Tax" value="$7.22" />
						<SummaryLine label="Promo" value="-$8.50" green />
						<Separator className="my-3" />
						<SummaryLine label="Total" value="$88.69" bold />
					</div>

					<Button size="lg" className="w-full gap-2">
						<Lock className="size-4" />
						Place Order
						<ArrowRight className="size-4" />
					</Button>

					<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
						<Shield className="size-3" />
						<span>Secure checkout</span>
					</div>
				</div>
			</div>
		</section>
	);
}
