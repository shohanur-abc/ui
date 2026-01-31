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

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
}

const MasonryItem = ({ item }: { item: OrderItem }) => {
	const heights = {
		short: 'aspect-square',
		medium: 'aspect-[3/4]',
		tall: 'aspect-[2/3]',
	};

	return (
		<div className="group relative overflow-hidden rounded-2xl border bg-card">
			<div className={`relative w-full ${heights[item.height]} overflow-hidden`}>
				<Image
					src={item.image}
					alt={item.name}
					fill
					className="object-cover transition-transform group-hover:scale-105"
				/>
				<Badge className="absolute right-2 top-2">×{item.qty}</Badge>
			</div>
			<div className="p-4">
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
				<p className="mt-2 text-lg font-bold">${item.price.toFixed(2)}</p>
			</div>
		</div>
	);
};

const InfoBlock = ({
	icon: Icon,
	label,
	value,
	subValue,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	subValue?: string;
	verified?: boolean;
}) => (
	<div className="flex items-start gap-3 rounded-xl border bg-card p-4">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
			{subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
		</div>
		{verified && <Check className="size-5 text-green-500" />}
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
			name: 'Art Print',
			variant: 'Abstract / 24x36"',
			price: 79.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop',
			height: 'tall',
		},
		{
			id: '2',
			name: 'Photo Frame',
			variant: 'Oak / 8x10"',
			price: 34.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop',
			height: 'short',
		},
		{
			id: '3',
			name: 'Canvas Print',
			variant: 'Landscape / 16x20"',
			price: 59.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
			height: 'medium',
		},
		{
			id: '4',
			name: 'Mini Prints',
			variant: 'Set of 4 / 5x7"',
			price: 24.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop',
			height: 'short',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Your Art Collection
					</h1>
					<p className="mt-1 text-muted-foreground">
						Review your selected pieces
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<div className="columns-2 gap-4 @md:columns-3">
							{items.map((item) => (
								<div key={item.id} className="mb-4 break-inside-avoid">
									<MasonryItem item={item} />
								</div>
							))}
						</div>

						<div className="grid gap-4 @sm:grid-cols-2">
							<InfoBlock
								icon={MapPin}
								label="Shipping to"
								value="Amanda K., Boston, MA"
								verified
							/>
							<InfoBlock
								icon={MapPin}
								label="Billing"
								value="Amanda K., Boston, MA"
								verified
							/>
							<InfoBlock
								icon={Truck}
								label="Delivery"
								value="Premium Art Shipping"
								subValue="Dec 22-24, 2025"
								verified
							/>
							<InfoBlock
								icon={CreditCard}
								label="Payment"
								value="Amex •••• 4567"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryRow label="Subtotal (5 items)" value="$234.95" />
							<SummaryRow label="Shipping" value="$19.99" />
							<SummaryRow label="Tax" value="$19.97" />
							<SummaryRow label="Gallery Discount" value="-$23.50" green />
							<Separator className="my-4" />
							<SummaryRow label="Total" value="$251.41" bold />
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
