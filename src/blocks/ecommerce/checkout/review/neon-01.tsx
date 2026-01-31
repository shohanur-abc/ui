import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Shield,
	Truck,
	Zap,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	name: string;
	option: string;
	price: number;
	qty: number;
	image: string;
}

const NeonItem = ({ item }: { item: CartItem }) => (
	<div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-4 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]">
		<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
		<div className="relative flex items-center gap-4">
			<div className="relative size-18 shrink-0 overflow-hidden rounded-xl ring-2 ring-primary/20">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-semibold">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.option}</p>
				<div className="mt-1 flex items-center gap-2">
					<Badge variant="outline" className="border-primary/30">
						×{item.qty}
					</Badge>
				</div>
			</div>
			<span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
		</div>
	</div>
);

const NeonInfo = ({
	icon: Icon,
	label,
	value,
	highlight,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	highlight?: boolean;
}) => (
	<div className={`flex items-center gap-3 rounded-xl border p-4 ${highlight ? 'border-primary/50 bg-primary/5' : 'border-primary/20 bg-card'}`}>
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<Icon className={`size-5 ${highlight ? 'text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'text-primary'}`} />
		</div>
		<div>
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
	</div>
);

const VerificationChip = ({ label }: { label: string }) => (
	<div className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1">
		<Check className="size-3 text-green-500" />
		<span className="text-xs font-medium text-green-500">{label}</span>
	</div>
);

const TotalRow = ({
	label,
	value,
	bold,
	glow,
}: {
	label: string;
	value: string;
	bold?: boolean;
	glow?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={glow ? 'text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'RGB LED Strip',
			option: '10m / Addressable',
			price: 49.99,
			qty: 2,
			image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Smart Controller',
			option: 'WiFi + Bluetooth',
			price: 29.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden bg-background" data-theme="neon">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
			<div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
			<div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />

			<div className="relative mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 border-primary/50 bg-primary/10">
						<Zap className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						<span className="bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
							Checkout
						</span>
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review your order before completing
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_320px]">
					<div className="space-y-4">
						{items.map((item) => (
							<NeonItem key={item.id} item={item} />
						))}

						<div className="grid gap-4 @sm:grid-cols-2">
							<NeonInfo icon={MapPin} label="Shipping" value="Chris B., Miami, FL" />
							<NeonInfo icon={Truck} label="Delivery" value="Dec 21-22, 2025" highlight />
							<NeonInfo icon={CreditCard} label="Payment" value="Amex •••• 5678" />
							<NeonInfo icon={Gift} label="Gift" value="Wrap included" />
						</div>

						<div className="flex flex-wrap gap-2">
							<VerificationChip label="Items" />
							<VerificationChip label="Address" />
							<VerificationChip label="Payment" />
							<VerificationChip label="Ready" />
						</div>
					</div>

					<Card className="border-primary/20 bg-card/50 backdrop-blur-sm @lg:sticky @lg:top-8 @lg:self-start">
						<CardContent className="space-y-3 pt-6">
							<TotalRow label="Subtotal (3 items)" value="$129.97" />
							<TotalRow label="Shipping" value="$7.99" />
							<TotalRow label="Gift Wrap" value="$5.99" />
							<TotalRow label="Tax" value="$11.05" />
							<TotalRow label="Discount" value="-$13.00" glow />
							<Separator className="my-4 bg-primary/20" />
							<TotalRow label="Total" value="$142.00" bold />
						</CardContent>
						<CardFooter className="flex-col gap-4">
							<Button size="lg" className="w-full gap-2 shadow-lg shadow-primary/30">
								<Lock className="size-4" />
								Pay $142.00
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
