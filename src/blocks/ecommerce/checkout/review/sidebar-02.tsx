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
	CheckCircle2,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	ShoppingBag,
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

const ProductItem = ({ product }: { product: Product }) => (
	<div className="group flex gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg @sm:size-24">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-muted-foreground">{product.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<Badge variant="secondary">×{product.qty}</Badge>
				<span className="font-bold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const SidebarSection = ({
	title,
	icon: Icon,
	verified,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	verified?: boolean;
	children: React.ReactNode;
}) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="mb-3 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-primary" />
				<span className="text-sm font-medium">{title}</span>
			</div>
			{verified && <CheckCircle2 className="size-4 text-green-500" />}
		</div>
		{children}
	</div>
);

const AddressContent = ({
	name,
	address,
}: {
	name: string;
	address: string;
}) => (
	<div>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
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

const PaymentContent = ({ brand, last4 }: { brand: string; last4: string }) => (
	<p className="font-medium">
		{brand} •••• {last4}
	</p>
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
	const products: Product[] = [
		{
			id: '1',
			name: 'Running Shoes',
			variant: 'Mesh / Black / Size 10',
			price: 139.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Athletic Shorts',
			variant: 'Dri-Fit / Grey / Medium',
			price: 44.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Sports Watch',
			variant: 'GPS / Black',
			price: 249.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 flex items-center justify-between">
					<div>
						<Badge className="mb-2 gap-1.5">
							<ShoppingBag className="size-3.5" />
							Checkout
						</Badge>
						<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
							Review Order
						</h1>
					</div>
					<p className="text-sm text-muted-foreground">3 items</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-4">
						{products.map((product) => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>

					<div className="space-y-4">
						<SidebarSection title="Shipping" icon={MapPin} verified>
							<AddressContent
								name="Robert L."
								address="123 Sprint Lane, Seattle, WA 98101"
							/>
						</SidebarSection>

						<SidebarSection title="Billing" icon={MapPin} verified>
							<AddressContent
								name="Robert L."
								address="123 Sprint Lane, Seattle, WA 98101"
							/>
						</SidebarSection>

						<SidebarSection title="Delivery" icon={Truck} verified>
							<DeliveryContent
								method="Express"
								date="Dec 19-20, 2025"
								price="$12.99"
							/>
						</SidebarSection>

						<SidebarSection title="Payment" icon={CreditCard} verified>
							<PaymentContent brand="Visa" last4="7890" />
						</SidebarSection>

						<Card className="bg-gradient-to-br from-card to-muted/30">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryLine label="Subtotal (4 items)" value="$479.96" />
								<SummaryLine label="Shipping" value="$12.99" />
								<SummaryLine label="Tax" value="$40.80" />
								<SummaryLine label="Discount (SPORT20)" value="-$96.00" green />
								<Separator className="my-4" />
								<SummaryLine label="Total" value="$437.75" bold />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Pay $437.75
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
			</div>
		</section>
	);
}
