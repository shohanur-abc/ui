import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle,
	CreditCard,
	Globe,
	Leaf,
	Lock,
	MapPin,
	Package,
	Recycle,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	options: string;
	price: number;
	qty: number;
	img: string;
	eco?: boolean;
}

const GridCard = ({
	title,
	icon: Icon,
	verified,
	size = 'default',
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	verified?: boolean;
	size?: 'default' | 'large';
	children: React.ReactNode;
}) => (
	<Card
		className={`group relative overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5 ${
			size === 'large' ? '@md:col-span-2' : ''
		}`}
	>
		{verified && (
			<div className="absolute right-3 top-3">
				<Badge
					variant="outline"
					className="gap-1 border-green-500/30 text-green-600 dark:text-green-400"
				>
					<CheckCircle className="size-3" />
					Verified
				</Badge>
			</div>
		)}
		<CardHeader className="pb-3">
			<CardTitle className="flex items-center gap-2 text-base">
				<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
					<Icon className="size-4 text-primary" />
				</div>
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent>{children}</CardContent>
	</Card>
);

const ProductTile = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.img}
				alt={product.name}
				fill
				className="object-cover"
			/>
			{product.eco && (
				<div className="absolute bottom-0 right-0 rounded-tl-lg bg-green-500 p-1">
					<Leaf className="size-3 text-white" />
				</div>
			)}
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.options}</p>
			<div className="mt-1 flex items-center justify-between">
				<span className="text-xs text-muted-foreground">×{product.qty}</span>
				<span className="text-sm font-semibold">
					${product.price.toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const AddressLine = ({
	label,
	name,
	lines,
}: {
	label: string;
	name: string;
	lines: string[];
}) => (
	<div>
		<p className="mb-1 text-xs uppercase text-muted-foreground">{label}</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const ShippingInfo = ({
	method,
	date,
	price,
	eco,
}: {
	method: string;
	date: string;
	price: string;
	eco?: boolean;
}) => (
	<div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
		<div
			className={`flex size-12 items-center justify-center rounded-full ${
				eco ? 'bg-green-500/10' : 'bg-primary/10'
			}`}
		>
			{eco ? (
				<Recycle className="size-6 text-green-600 dark:text-green-400" />
			) : (
				<Truck className="size-6 text-primary" />
			)}
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<p className="font-medium">{method}</p>
				{eco && (
					<Badge variant="secondary" className="gap-1 text-xs">
						<Leaf className="size-3" />
						Eco
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentDisplay = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
			<CreditCard className="size-6 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const PriceRow = ({
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
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const EcoStats = () => (
	<div className="flex items-center gap-3 rounded-lg bg-green-500/10 p-3">
		<Globe className="size-5 text-green-600 dark:text-green-400" />
		<p className="text-sm text-green-600 dark:text-green-400">
			This order saves 2.5 kg of CO₂ emissions
		</p>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Bamboo Water Bottle',
			options: '750ml / Natural',
			price: 34.99,
			qty: 2,
			img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop',
			eco: true,
		},
		{
			id: '2',
			name: 'Organic Cotton Tote',
			options: 'Large / Cream',
			price: 19.99,
			qty: 1,
			img: 'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?w=200&h=200&fit=crop',
			eco: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Review Order
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Almost There!
					</h1>
					<p className="mt-2 text-muted-foreground">
						Check your order details before confirming
					</p>
				</div>

				<div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
					<GridCard title="Items" icon={Package} size="large" verified>
						<div className="grid gap-3 @sm:grid-cols-2">
							{products.map((product) => (
								<ProductTile key={product.id} product={product} />
							))}
						</div>
					</GridCard>

					<GridCard title="Shipping" icon={MapPin} verified>
						<AddressLine
							label="Ship to"
							name="Emma Wilson"
							lines={['456 Green Lane', 'Vancouver, BC V6B 1A1', 'Canada']}
						/>
					</GridCard>

					<GridCard title="Delivery" icon={Truck} verified>
						<ShippingInfo
							method="Carbon Neutral"
							date="Dec 23-26, 2025"
							price="$4.99"
							eco
						/>
					</GridCard>

					<GridCard title="Payment" icon={CreditCard} verified>
						<PaymentDisplay brand="Mastercard" last4="2468" exp="02/27" />
					</GridCard>

					<GridCard title="Impact" icon={Leaf}>
						<EcoStats />
					</GridCard>

					<Card className="@md:col-span-2 @lg:col-span-1 bg-gradient-to-br from-card to-card/50">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<PriceRow label="Subtotal (3 items)" value="$89.97" />
							<PriceRow label="Shipping" value="$4.99" />
							<PriceRow label="Tax" value="$7.65" />
							<PriceRow label="Eco Discount" value="-$5.00" green />
							<Separator className="my-4" />
							<PriceRow label="Total" value="$97.61" bold />

							<Button size="lg" className="mt-4 w-full gap-2">
								<Lock className="size-4" />
								Place Order
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
