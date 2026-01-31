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
}

const StickyProduct = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary">×{item.qty}</Badge>
		</div>
	</div>
);

const InfoSection = ({
	title,
	icon: Icon,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="mb-3 flex items-center gap-2">
			<Icon className="size-4 text-primary" />
			<h3 className="font-medium">{title}</h3>
			<Check className="ml-auto size-4 text-green-500" />
		</div>
		{children}
	</div>
);

const AddressContent = ({
	name,
	lines,
}: {
	name: string;
	lines: string[];
}) => (
	<div>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">{line}</p>
		))}
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
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Coffee Maker',
			variant: 'Espresso / Pro',
			price: 349.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Coffee Grinder',
			variant: 'Burr / Electric',
			price: 129.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Coffee Beans',
			variant: 'Single Origin / 1kg',
			price: 39.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop',
		},
		{
			id: '4',
			name: 'Milk Frother',
			variant: 'Electric / Stainless',
			price: 49.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Coffee Collection
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Premium coffee essentials
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-4">
						{items.map((item) => (
							<StickyProduct key={item.id} item={item} />
						))}

						<div className="grid gap-4 @sm:grid-cols-2">
							<InfoSection title="Shipping Address" icon={MapPin}>
								<AddressContent
									name="Sam T."
									lines={['123 Coffee Lane', 'Seattle, WA 98101']}
								/>
							</InfoSection>

							<InfoSection title="Billing Address" icon={MapPin}>
								<AddressContent
									name="Sam T."
									lines={['123 Coffee Lane', 'Seattle, WA 98101']}
								/>
							</InfoSection>
						</div>

						<InfoSection title="Delivery" icon={Truck}>
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Priority Shipping</p>
									<p className="text-sm text-muted-foreground">Dec 18-19, 2025</p>
								</div>
								<span className="font-semibold">$19.99</span>
							</div>
						</InfoSection>

						<InfoSection title="Payment" icon={CreditCard}>
							<div className="flex items-center gap-3">
								<CreditCard className="size-5 text-muted-foreground" />
								<span className="font-medium">Visa •••• 2222</span>
							</div>
						</InfoSection>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (5 items)" value="$609.95" />
							<SummaryLine label="Shipping" value="$19.99" />
							<SummaryLine label="Tax" value="$51.85" />
							<SummaryLine label="Coffee Bundle" value="-$61.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$620.79" bold />
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
