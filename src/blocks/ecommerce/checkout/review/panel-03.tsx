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

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const PanelCard = ({
	title,
	icon: Icon,
	action,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	action?: () => void;
	children: React.ReactNode;
}) => (
	<Card>
		<CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
			<CardTitle className="flex items-center gap-2 text-base">
				<Icon className="size-5 text-primary" />
				{title}
			</CardTitle>
			{action && (
				<Button
					variant="ghost"
					size="sm"
					className="h-8 gap-1"
					onClick={action}
				>
					<Edit2 className="size-3" />
					Edit
				</Button>
			)}
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

const ProductItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 py-2">
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

const AddressContent = ({
	type,
	name,
	lines,
	phone,
}: {
	type: string;
	name: string;
	lines: string[];
	phone: string;
}) => (
	<div>
		<p className="mb-1 text-xs font-medium uppercase text-primary">{type}</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
		<p className="mt-1 text-sm text-muted-foreground">{phone}</p>
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
		<div className="flex items-center gap-3">
			<Truck className="size-5 text-muted-foreground" />
			<div>
				<p className="font-medium">{method}</p>
				<p className="text-sm text-muted-foreground">{date}</p>
			</div>
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
		<CreditCard className="size-5 text-muted-foreground" />
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
		<Check className="ml-auto size-5 text-green-500" />
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
			name: 'Electric Scooter',
			variant: 'Pro / 25mph',
			price: 599.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Helmet',
			variant: 'Smart / Black',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1557803175-2f8c4cf46b6e?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Final Review
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Confirm Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Review all panels before checkout
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-5">
						<PanelCard title="Order Items" icon={Package} action={() => {}}>
							<div className="divide-y">
								{items.map((item) => (
									<ProductItem key={item.id} item={item} />
								))}
							</div>
						</PanelCard>

						<div className="grid gap-5 @sm:grid-cols-2">
							<PanelCard title="Shipping" icon={MapPin} action={() => {}}>
								<AddressContent
									type="Shipping"
									name="Ryan K."
									lines={['456 Scooter Street', 'Portland, OR 97201']}
									phone="+1 (503) 555-0177"
								/>
							</PanelCard>

							<PanelCard title="Billing" icon={MapPin} action={() => {}}>
								<AddressContent
									type="Billing"
									name="Ryan K."
									lines={['456 Scooter Street', 'Portland, OR 97201']}
									phone="+1 (503) 555-0177"
								/>
							</PanelCard>
						</div>

						<PanelCard title="Delivery" icon={Truck} action={() => {}}>
							<DeliveryContent
								method="Premium"
								date="Dec 19-20, 2025"
								price="$29.99"
							/>
						</PanelCard>

						<PanelCard title="Payment" icon={CreditCard} action={() => {}}>
							<PaymentContent brand="Mastercard" last4="5555" exp="02/28" />
						</PanelCard>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$749.98" />
							<SummaryLine label="Shipping" value="$29.99" />
							<SummaryLine label="Tax" value="$63.75" />
							<SummaryLine label="E-Mobility Discount" value="-$75.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$768.72" bold />
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
