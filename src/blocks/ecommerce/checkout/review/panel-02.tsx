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
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface CartProduct {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const Panel = ({
	title,
	icon: Icon,
	editable,
	verified,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	editable?: boolean;
	verified?: boolean;
	children: React.ReactNode;
}) => (
	<div className="rounded-2xl border bg-card">
		<div className="flex items-center justify-between border-b px-5 py-3">
			<div className="flex items-center gap-2">
				<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
					<Icon className="size-4 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
			</div>
			<div className="flex items-center gap-2">
				{verified && (
					<Badge
						variant="secondary"
						className="gap-1 text-green-600 dark:text-green-400"
					>
						<Check className="size-3" />
						Verified
					</Badge>
				)}
				{editable && (
					<Button variant="ghost" size="sm" className="h-8 gap-1">
						<Edit2 className="size-3" />
						Edit
					</Button>
				)}
			</div>
		</div>
		<div className="p-5">{children}</div>
	</div>
);

const ProductCard = ({ product }: { product: CartProduct }) => (
	<div className="flex items-center gap-4 rounded-lg bg-muted/30 p-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary">×{product.qty}</Badge>
		</div>
	</div>
);

const AddressInfo = ({
	name,
	lines,
	phone,
}: {
	name: string;
	lines: string[];
	phone: string;
}) => (
	<div>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
		<p className="mt-1 text-sm text-muted-foreground">{phone}</p>
	</div>
);

const DeliveryInfo = ({
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
			<Truck className="size-5 text-primary" />
			<div>
				<p className="font-medium">{method}</p>
				<p className="text-sm text-muted-foreground">{date}</p>
			</div>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentInfo = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-3">
		<CreditCard className="size-5 text-primary" />
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
	const products: CartProduct[] = [
		{
			id: '1',
			name: 'Backpack',
			variant: 'Travel / Black',
			price: 129.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Packing Cubes',
			variant: 'Set of 6 / Grey',
			price: 44.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Checkout
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Verify everything before placing your order
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-6">
						<Panel title="Order Items" icon={Package} editable verified>
							<div className="space-y-3">
								{products.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>
						</Panel>

						<div className="grid gap-6 @sm:grid-cols-2">
							<Panel title="Shipping" icon={MapPin} editable verified>
								<AddressInfo
									name="Mark T."
									lines={['987 Travel Lane', 'Portland, OR 97201']}
									phone="+1 (503) 555-0199"
								/>
							</Panel>

							<Panel title="Billing" icon={MapPin} editable verified>
								<AddressInfo
									name="Mark T."
									lines={['987 Travel Lane', 'Portland, OR 97201']}
									phone="+1 (503) 555-0199"
								/>
							</Panel>
						</div>

						<Panel title="Delivery" icon={Truck} editable verified>
							<DeliveryInfo
								method="Express"
								date="Dec 18-19, 2025"
								price="$14.99"
							/>
						</Panel>

						<Panel title="Payment" icon={CreditCard} editable verified>
							<PaymentInfo brand="Mastercard" last4="9012" exp="08/27" />
						</Panel>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$174.98" />
							<SummaryLine label="Shipping" value="$14.99" />
							<SummaryLine label="Tax" value="$14.87" />
							<SummaryLine label="Discount" value="-$17.50" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$187.34" bold />
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
