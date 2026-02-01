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
	Shield,
	Sparkles,
	Truck,
	Zap,
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

const NeonItem = ({ product }: { product: Product }) => (
	<div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]">
		<div className="flex items-center gap-4">
			<div className="relative size-18 shrink-0 overflow-hidden rounded-xl ring-2 ring-primary/30">
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
				<p className="text-lg font-bold text-primary">
					${product.price.toFixed(2)}
				</p>
				<Badge variant="outline" className="border-primary/30 text-primary">
					×{product.qty}
				</Badge>
			</div>
		</div>
		<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
	</div>
);

const NeonInfo = ({
	icon: Icon,
	label,
	value,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	verified?: boolean;
}) => (
	<div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card p-4 transition-all hover:border-primary/40">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="font-medium">{value}</p>
			</div>
			{verified && (
				<div className="flex size-6 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/30">
					<Check className="size-3.5 text-green-500" />
				</div>
			)}
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
		<span className={green ? 'text-green-500' : bold ? 'text-primary' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Mechanical Keyboard',
			variant: 'RGB / Hot-swap / 75%',
			price: 189.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Gaming Mouse',
			variant: 'Wireless / 25K DPI',
			price: 129.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Mouse Pad',
			variant: 'XL / RGB Edge',
			price: 49.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

			<div className="relative mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 border-primary/30 bg-primary/10 text-primary">
						<Zap className="size-3.5" />
						Checkout
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">Your gaming setup awaits</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-4">
						{products.map((product) => (
							<NeonItem key={product.id} product={product} />
						))}

						<div className="grid gap-4 @sm:grid-cols-2">
							<NeonInfo
								icon={MapPin}
								label="Shipping"
								value="Tyler J., Dallas, TX"
								verified
							/>
							<NeonInfo
								icon={MapPin}
								label="Billing"
								value="Tyler J., Dallas, TX"
								verified
							/>
							<NeonInfo
								icon={Truck}
								label="Delivery"
								value="Priority · Dec 17-18"
								verified
							/>
							<NeonInfo
								icon={CreditCard}
								label="Payment"
								value="Mastercard •••• 5432"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start border-primary/20 bg-gradient-to-br from-card to-primary/5">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Sparkles className="size-5 text-primary" />
								Summary
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$369.97" />
							<SummaryLine label="Shipping" value="$0.00" />
							<SummaryLine label="Tax" value="$31.45" />
							<SummaryLine label="Gamer Discount" value="-$37.00" green />
							<Separator className="my-4 bg-primary/20" />
							<SummaryLine label="Total" value="$364.42" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button
								size="lg"
								className="w-full gap-2 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]"
							>
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
		</section>
	);
}
