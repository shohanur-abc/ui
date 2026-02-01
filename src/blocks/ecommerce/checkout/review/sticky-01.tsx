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
	Lock,
	MapPin,
	Package,
	Shield,
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

const StickyItem = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 py-3">
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
			<p className="font-semibold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">
				×{product.qty}
			</Badge>
		</div>
	</div>
);

const DetailRow = ({
	icon: Icon,
	title,
	value,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	verified?: boolean;
}) => (
	<div className="flex items-center gap-3 rounded-lg border bg-card p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="font-medium">{value}</p>
		</div>
		{verified && (
			<div className="flex size-6 items-center justify-center rounded-full bg-green-500">
				<Check className="size-3.5 text-white" />
			</div>
		)}
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

const StickyFooter = ({
	total,
	onCheckout,
}: {
	total: string;
	onCheckout: () => void;
}) => (
	<div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 backdrop-blur-sm @lg:hidden">
		<div className="mx-auto flex max-w-lg items-center justify-between gap-4">
			<div>
				<p className="text-sm text-muted-foreground">Total</p>
				<p className="text-xl font-bold">{total}</p>
			</div>
			<Button size="lg" className="gap-2" onClick={onCheckout}>
				<Lock className="size-4" />
				Pay Now
				<ArrowRight className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Fitness Tracker',
			variant: 'Black / Large',
			price: 99.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Extra Band',
			variant: 'Navy Blue',
			price: 19.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden pb-24 @lg:pb-0"
			data-theme="neon"
		>
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16">
				<div className="mb-8">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">
						Review and confirm your purchase
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Package className="size-5" />
									Order Items
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="divide-y">
									{products.map((product) => (
										<StickyItem key={product.id} product={product} />
									))}
								</div>
							</CardContent>
						</Card>

						<div className="space-y-4">
							<DetailRow
								icon={MapPin}
								title="Shipping Address"
								value="Kevin L., Seattle, WA 98101"
								verified
							/>
							<DetailRow
								icon={MapPin}
								title="Billing Address"
								value="Kevin L., Seattle, WA 98101"
								verified
							/>
							<DetailRow
								icon={Truck}
								title="Delivery Method"
								value="Express · Dec 20-21, 2025"
								verified
							/>
							<DetailRow
								icon={CreditCard}
								title="Payment Method"
								value="Mastercard •••• 9012"
								verified
							/>
						</div>
					</div>

					<div className="hidden @lg:block">
						<Card className="sticky top-8">
							<CardHeader>
								<CardTitle>Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryLine label="Subtotal (3 items)" value="$139.97" />
								<SummaryLine label="Shipping" value="$12.99" />
								<SummaryLine label="Tax" value="$11.90" />
								<SummaryLine label="Discount" value="-$14.00" green />
								<Separator className="my-4" />
								<SummaryLine label="Total" value="$150.86" bold />
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
			</div>

			<StickyFooter total="$150.86" onCheckout={() => {}} />
		</section>
	);
}
