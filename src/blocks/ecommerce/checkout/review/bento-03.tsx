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
	Gift,
	Lock,
	MapPin,
	Package,
	Percent,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const BentoTile = ({
	title,
	icon: Icon,
	span,
	onEdit,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	span?: 'col' | 'row' | 'both';
	onEdit?: () => void;
	children: React.ReactNode;
}) => {
	const spanClasses = {
		col: '@lg:col-span-2',
		row: '@lg:row-span-2',
		both: '@lg:col-span-2 @lg:row-span-2',
	};

	return (
		<div
			className={`group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:shadow-lg ${span ? spanClasses[span] : ''}`}
		>
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
						<Icon className="size-4 text-primary" />
					</div>
					<h3 className="font-semibold">{title}</h3>
				</div>
				{onEdit && (
					<Button
						variant="ghost"
						size="icon"
						className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
						onClick={onEdit}
					>
						<Edit2 className="size-4" />
					</Button>
				)}
			</div>
			{children}
		</div>
	);
};

const ProductTile = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-bold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">
				×{product.qty}
			</Badge>
		</div>
	</div>
);

const AddressLine = ({ name, address }: { name: string; address: string }) => (
	<div className="rounded-lg bg-muted/30 p-3">
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryLine = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
		<div className="flex items-center gap-2">
			<Truck className="size-4 text-primary" />
			<div>
				<p className="text-sm font-medium">{method}</p>
				<p className="text-xs text-muted-foreground">{date}</p>
			</div>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentLine = ({ brand, last4 }: { brand: string; last4: string }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
		<CreditCard className="size-4 text-primary" />
		<span className="font-medium">
			{brand} •••• {last4}
		</span>
	</div>
);

const PromoLine = ({ code, discount }: { code: string; discount: string }) => (
	<div className="flex items-center justify-between rounded-lg bg-green-500/10 p-3">
		<div className="flex items-center gap-2">
			<Percent className="size-4 text-green-600 dark:text-green-400" />
			<span className="font-mono text-sm">{code}</span>
		</div>
		<span className="font-semibold text-green-600 dark:text-green-400">
			{discount}
		</span>
	</div>
);

const CheckLine = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2 text-sm">
		<Check className="size-4 text-green-500" />
		<span>{label}</span>
	</div>
);

const TotalLine = ({
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

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Desk Lamp',
			variant: 'LED / Adjustable',
			price: 89.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Smart Plug',
			variant: 'WiFi / 2-Pack',
			price: 29.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Confirm Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review all sections before checkout
					</p>
				</div>

				<div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
					<BentoTile title="Items" icon={Package} span="col" onEdit={() => {}}>
						<div className="space-y-2">
							{products.map((product) => (
								<ProductTile key={product.id} product={product} />
							))}
						</div>
					</BentoTile>

					<BentoTile title="Shipping" icon={MapPin} onEdit={() => {}}>
						<AddressLine
							name="Nicole S."
							address="321 Bright Ave, Denver, CO 80202"
						/>
					</BentoTile>

					<BentoTile title="Billing" icon={MapPin} onEdit={() => {}}>
						<AddressLine
							name="Nicole S."
							address="321 Bright Ave, Denver, CO 80202"
						/>
					</BentoTile>

					<BentoTile title="Delivery" icon={Truck} onEdit={() => {}}>
						<DeliveryLine
							method="Express"
							date="Dec 19-20, 2025"
							price="$9.99"
						/>
					</BentoTile>

					<BentoTile title="Payment" icon={CreditCard} onEdit={() => {}}>
						<PaymentLine brand="Visa" last4="4321" />
					</BentoTile>

					<BentoTile title="Promo" icon={Percent}>
						<PromoLine code="BRIGHT15" discount="-$18.00" />
					</BentoTile>

					<BentoTile title="Status" icon={Check}>
						<div className="space-y-2">
							<CheckLine label="Items verified" />
							<CheckLine label="Address confirmed" />
							<CheckLine label="Payment ready" />
						</div>
					</BentoTile>

					<Card className="@md:col-span-2 @lg:col-span-1 bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<TotalLine label="Subtotal (2 items)" value="$119.98" />
							<TotalLine label="Shipping" value="$9.99" />
							<TotalLine label="Tax" value="$10.20" />
							<TotalLine label="Discount" value="-$18.00" green />
							<Separator className="my-4" />
							<TotalLine label="Total" value="$122.17" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Pay $122.17
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
