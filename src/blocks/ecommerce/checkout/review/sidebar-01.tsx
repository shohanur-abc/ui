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
	CheckCircle,
	Clock,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Package,
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
	<div className="border-b border-border/50 pb-5 last:border-0 last:pb-0">
		<div className="mb-3 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Icon className="size-4 text-primary" />
				<h4 className="text-sm font-semibold">{title}</h4>
			</div>
			{verified && <CheckCircle className="size-4 text-green-500" />}
		</div>
		{children}
	</div>
);

const ProductCard = ({ product }: { product: Product }) => (
	<div className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md">
		<div className="relative aspect-square overflow-hidden">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover transition-transform group-hover:scale-105"
			/>
			<div className="absolute bottom-2 right-2">
				<Badge variant="secondary">×{product.qty}</Badge>
			</div>
		</div>
		<div className="p-4">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
			<p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
		</div>
	</div>
);

const AddressCompact = ({ name, lines }: { name: string; lines: string[] }) => (
	<div className="text-sm">
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryCompact = ({
	method,
	date,
}: {
	method: string;
	date: string;
}) => (
	<div className="flex items-center gap-2 text-sm">
		<Truck className="size-4 text-primary" />
		<div>
			<p className="font-medium">{method}</p>
			<p className="text-muted-foreground">{date}</p>
		</div>
	</div>
);

const PaymentCompact = ({ brand, last4 }: { brand: string; last4: string }) => (
	<div className="flex items-center gap-2 text-sm">
		<CreditCard className="size-4 text-primary" />
		<p className="font-medium">
			{brand} •••• {last4}
		</p>
	</div>
);

const GiftCompact = ({ included }: { included: boolean }) => (
	<div className="flex items-center gap-2 text-sm">
		<Gift className="size-4 text-amber-500" />
		<p className={included ? 'font-medium' : 'text-muted-foreground'}>
			{included ? 'Gift wrap included' : 'No gift wrap'}
		</p>
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
		className={`flex justify-between ${bold ? 'text-base font-bold' : 'text-sm'}`}
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
			name: 'Artisan Coffee Beans',
			variant: 'Dark Roast / 500g',
			price: 24.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
		},
		{
			id: '2',
			name: 'Pour Over Set',
			variant: 'Ceramic / White',
			price: 59.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
		},
		{
			id: '3',
			name: 'Coffee Grinder',
			variant: 'Manual / Stainless',
			price: 44.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="grid min-h-screen @xl:grid-cols-[1fr_400px]">
				<div className="px-4 py-12 @sm:px-8 @md:py-16 @xl:px-12">
					<div className="mb-8">
						<Badge className="mb-4 gap-1.5">
							<Sparkles className="size-3.5" />
							Order Review
						</Badge>
						<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
							Your Order
						</h1>
						<p className="mt-1 text-muted-foreground">
							{products.length} items ready for checkout
						</p>
					</div>

					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>

					<div className="mt-8 flex items-center gap-2 rounded-xl bg-green-500/10 p-4">
						<CheckCircle className="size-5 text-green-600 dark:text-green-400" />
						<p className="text-sm font-medium text-green-600 dark:text-green-400">
							All items verified and in stock
						</p>
					</div>
				</div>

				<div className="border-l bg-muted/30 px-6 py-12 @xl:px-8">
					<div className="sticky top-8 space-y-6">
						<div className="flex items-center gap-2">
							<Clock className="size-5 text-primary" />
							<h2 className="text-lg font-bold">Order Details</h2>
						</div>

						<div className="space-y-5">
							<SidebarSection title="Shipping" icon={MapPin} verified>
								<AddressCompact
									name="James Wilson"
									lines={['789 Coffee Lane', 'Seattle, WA 98101']}
								/>
							</SidebarSection>

							<SidebarSection title="Billing" icon={MapPin} verified>
								<AddressCompact
									name="James Wilson"
									lines={['789 Coffee Lane', 'Seattle, WA 98101']}
								/>
							</SidebarSection>

							<SidebarSection title="Delivery" icon={Truck} verified>
								<DeliveryCompact method="Express" date="Dec 20-21, 2025" />
							</SidebarSection>

							<SidebarSection title="Payment" icon={CreditCard} verified>
								<PaymentCompact brand="Visa" last4="8888" />
							</SidebarSection>

							<SidebarSection title="Gift Options" icon={Gift}>
								<GiftCompact included />
							</SidebarSection>
						</div>

						<Card className="bg-card">
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<SummaryLine label="Subtotal (4 items)" value="$154.96" />
								<SummaryLine label="Shipping" value="$9.99" />
								<SummaryLine label="Gift Wrap" value="$5.99" />
								<SummaryLine label="Tax" value="$13.17" />
								<SummaryLine label="Promo" value="-$15.50" green />
								<Separator className="my-3" />
								<SummaryLine label="Total" value="$168.61" bold />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Pay $168.61
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
