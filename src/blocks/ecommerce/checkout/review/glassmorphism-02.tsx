import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

const GlassItem = ({ item }: { item: CartItem }) => (
	<div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:bg-white/10">
		<div className="flex items-center gap-4">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-xl ring-2 ring-white/10">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
			</div>
			<div className="text-right">
				<p className="font-bold">${item.price.toFixed(2)}</p>
				<Badge variant="secondary" className="bg-white/10">×{item.qty}</Badge>
			</div>
		</div>
	</div>
);

const GlassInfo = ({
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
	<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="truncate font-medium">{value}</p>
		</div>
		{verified && (
			<div className="flex size-6 items-center justify-center rounded-full bg-green-500/20">
				<Check className="size-3.5 text-green-400" />
			</div>
		)}
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'VR Headset',
			variant: 'Pro Edition / Black',
			price: 499.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Controllers',
			variant: 'Touch / Pair',
			price: 149.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Carry Case',
			variant: 'Hard Shell / Grey',
			price: 59.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" data-theme="neon">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
			
			<div className="relative mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 border-white/10 bg-white/5 backdrop-blur-xl">
						<Sparkles className="size-3.5" />
						Checkout
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">
						Confirm your VR experience
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_380px]">
					<div className="space-y-4">
						{items.map((item) => (
							<GlassItem key={item.id} item={item} />
						))}

						<div className="grid gap-4 @sm:grid-cols-2">
							<GlassInfo
								icon={MapPin}
								label="Shipping"
								value="Kevin R., Phoenix, AZ"
								verified
							/>
							<GlassInfo
								icon={MapPin}
								label="Billing"
								value="Kevin R., Phoenix, AZ"
								verified
							/>
							<GlassInfo
								icon={Truck}
								label="Delivery"
								value="Express · Dec 18-19"
								verified
							/>
							<GlassInfo
								icon={CreditCard}
								label="Payment"
								value="Visa •••• 9876"
								verified
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start border-white/10 bg-white/5 backdrop-blur-xl">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryRow label="Subtotal (3 items)" value="$709.97" />
							<SummaryRow label="Shipping" value="$0.00" />
							<SummaryRow label="Tax" value="$60.35" />
							<SummaryRow label="Bundle Discount" value="-$71.00" green />
							<Separator className="my-4 bg-white/10" />
							<SummaryRow label="Total" value="$699.32" bold />
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
		</section>
	);
}
