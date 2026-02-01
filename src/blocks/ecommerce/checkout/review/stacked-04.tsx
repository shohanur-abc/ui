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
	Edit2,
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

const StackedCard = ({
	title,
	icon: Icon,
	editable,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	editable?: boolean;
	children: React.ReactNode;
}) => (
	<div className="rounded-2xl border bg-card shadow-sm">
		<div className="flex items-center justify-between border-b px-5 py-3">
			<div className="flex items-center gap-2">
				<Icon className="size-5 text-primary" />
				<h3 className="font-semibold">{title}</h3>
			</div>
			{editable && (
				<Button variant="ghost" size="sm" className="h-8 gap-1">
					<Edit2 className="size-3" />
					Edit
				</Button>
			)}
		</div>
		<div className="p-5">{children}</div>
	</div>
);

const ProductLine = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
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

const AddressContent = ({ name, lines }: { name: string; lines: string[] }) => (
	<div>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryContent = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center justify-between">
		<div>
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentContent = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-800">
			<CreditCard className="size-5 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
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
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Camping Tent',
			variant: '4-Person / Waterproof',
			price: 249.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Sleeping Bag',
			variant: '0°F / Mummy',
			price: 129.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1501703979959-797917eb21c8?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Camp Stove',
			variant: 'Portable / Propane',
			price: 89.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Verify all details before checkout
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-5">
						<StackedCard title="Order Items" icon={Package} editable>
							<div className="space-y-4">
								{items.map((item) => (
									<ProductLine key={item.id} item={item} />
								))}
							</div>
						</StackedCard>

						<div className="grid gap-5 @sm:grid-cols-2">
							<StackedCard title="Shipping" icon={MapPin} editable>
								<AddressContent
									name="Chris T."
									lines={['789 Trail Road', 'Boulder, CO 80301']}
								/>
							</StackedCard>

							<StackedCard title="Billing" icon={MapPin} editable>
								<AddressContent
									name="Chris T."
									lines={['789 Trail Road', 'Boulder, CO 80301']}
								/>
							</StackedCard>
						</div>

						<StackedCard title="Delivery" icon={Truck} editable>
							<DeliveryContent
								method="Outdoor Priority"
								date="Dec 20-22, 2025"
								price="$19.99"
							/>
						</StackedCard>

						<StackedCard title="Payment" icon={CreditCard} editable>
							<PaymentContent brand="Visa" last4="9012" exp="09/28" />
						</StackedCard>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (4 items)" value="$599.96" />
							<SummaryLine label="Shipping" value="$19.99" />
							<SummaryLine label="Tax" value="$51.00" />
							<SummaryLine label="Adventure Discount" value="-$60.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$610.95" bold />
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
