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

const StackedProductCard = ({
	product,
	index,
}: {
	product: Product;
	index: number;
}) => (
	<div
		className="relative rounded-2xl border bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
		style={{
			marginTop: index > 0 ? '-40px' : '0',
			zIndex: 10 - index,
		}}
	>
		<div className="flex items-center gap-4">
			<div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
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
				<div className="mt-2 flex items-center gap-2">
					<Badge variant="secondary">×{product.qty}</Badge>
					<span className="font-bold">${product.price.toFixed(2)}</span>
				</div>
			</div>
		</div>
	</div>
);

const VerifyBadge = ({
	label,
	verified,
}: {
	label: string;
	verified: boolean;
}) => (
	<div
		className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${verified ? 'border-green-500/30 bg-green-500/10' : 'border-border'}`}
	>
		{verified && <Check className="size-3.5 text-green-500" />}
		<span
			className={
				verified
					? 'text-green-600 dark:text-green-400'
					: 'text-muted-foreground'
			}
		>
			{label}
		</span>
	</div>
);

const InfoBlock = ({
	icon: Icon,
	title,
	lines,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	lines: string[];
}) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="mb-2 flex items-center gap-2">
			<Icon className="size-4 text-primary" />
			<span className="text-sm font-medium">{title}</span>
		</div>
		{lines.map((line, i) => (
			<p
				key={i}
				className={`text-sm ${i === 0 ? 'font-medium' : 'text-muted-foreground'}`}
			>
				{line}
			</p>
		))}
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
			name: 'Wireless Earbuds',
			variant: 'Pro / Black',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Charging Case',
			variant: 'Extended Battery',
			price: 39.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1608156639585-b3a776f1060b?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Ear Tips Set',
			variant: 'Memory Foam / 6-Pack',
			price: 19.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Confirm Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review all items and details
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-8">
						<div className="pb-12">
							{products.map((product, index) => (
								<StackedProductCard
									key={product.id}
									product={product}
									index={index}
								/>
							))}
						</div>

						<div className="flex flex-wrap gap-2">
							<VerifyBadge label="Items verified" verified />
							<VerifyBadge label="Address confirmed" verified />
							<VerifyBadge label="Payment ready" verified />
							<VerifyBadge label="Ready to ship" verified />
						</div>

						<div className="grid gap-4 @sm:grid-cols-2">
							<InfoBlock
								icon={MapPin}
								title="Shipping"
								lines={['Sarah J.', '321 Music Lane, Nashville, TN 37201']}
							/>
							<InfoBlock
								icon={MapPin}
								title="Billing"
								lines={['Sarah J.', '321 Music Lane, Nashville, TN 37201']}
							/>
							<InfoBlock
								icon={Truck}
								title="Delivery"
								lines={['Express Shipping', 'Dec 19-20, 2025']}
							/>
							<InfoBlock
								icon={CreditCard}
								title="Payment"
								lines={['Visa •••• 2468', 'Expires 06/27']}
							/>
						</div>

						<div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
							<Gift className="size-5 text-amber-600 dark:text-amber-400" />
							<div>
								<p className="font-medium text-amber-600 dark:text-amber-400">
									Gift wrap added
								</p>
								<p className="text-sm text-muted-foreground">
									Premium packaging with personalized message
								</p>
							</div>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Package className="size-5" />
								Summary
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryRow label="Subtotal (3 items)" value="$209.97" />
							<SummaryRow label="Shipping" value="$11.99" />
							<SummaryRow label="Gift Wrap" value="$7.99" />
							<SummaryRow label="Tax" value="$17.85" />
							<SummaryRow label="Promo (AUDIO15)" value="-$31.50" green />
							<Separator className="my-4" />
							<SummaryRow label="Total" value="$216.30" bold />
						</CardContent>
						<CardFooter className="flex-col gap-4">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Pay $216.30
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
