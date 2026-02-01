import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const NeonProduct = ({ item }: { item: CartItem }) => (
	<div className="group relative overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-900 p-4 transition-all hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
		<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
		<div className="relative flex items-center gap-4">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg ring-2 ring-cyan-500/30">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-medium text-cyan-50">{item.name}</p>
				<p className="text-sm text-cyan-300/60">{item.variant}</p>
			</div>
			<div className="text-right">
				<p className="font-bold text-cyan-400">${item.price.toFixed(2)}</p>
				<Badge className="border-cyan-500/50 bg-cyan-500/10 text-cyan-300">
					×{item.qty}
				</Badge>
			</div>
		</div>
	</div>
);

const NeonInfoCard = ({
	icon: Icon,
	title,
	value,
	subValue,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
	subValue?: string;
}) => (
	<div className="rounded-lg border border-purple-500/30 bg-slate-900 p-4 transition-all hover:border-purple-500/50">
		<div className="flex items-start gap-3">
			<Icon className="size-5 text-purple-400" />
			<div className="flex-1">
				<p className="text-xs text-purple-300/60">{title}</p>
				<p className="font-medium text-purple-50">{value}</p>
				{subValue && <p className="text-sm text-purple-300/60">{subValue}</p>}
			</div>
			<Check className="size-5 text-green-400" />
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
		<span className={bold ? 'text-cyan-50' : 'text-cyan-300/60'}>{label}</span>
		<span
			className={
				green ? 'text-green-400' : bold ? 'text-cyan-400' : 'text-cyan-50'
			}
		>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Mechanical Keyboard',
			variant: 'RGB / Gateron Switches',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Gaming Mouse',
			variant: 'Wireless / 25K DPI',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Mouse Pad',
			variant: 'XXL / RGB Border',
			price: 39.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1629429407756-446d66f5b24f?w=200&h=200&fit=crop',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden bg-slate-950"
			data-theme="neon"
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,255,0.15),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
			<div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

			<div className="relative mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 border-cyan-500/50 bg-cyan-500/10 text-cyan-300">
						<Zap className="size-3.5" />
						Gaming Setup
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight text-cyan-50 @md:text-3xl">
						<Sparkles className="mr-2 inline-block size-6 text-cyan-400" />
						Checkout Review
					</h1>
					<p className="mt-1 text-cyan-300/60">Level up your gaming gear</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-4">
						{items.map((item) => (
							<NeonProduct key={item.id} item={item} />
						))}

						<div className="grid gap-3 @sm:grid-cols-2">
							<NeonInfoCard
								icon={MapPin}
								title="Shipping"
								value="Jake R., Austin, TX"
							/>
							<NeonInfoCard
								icon={MapPin}
								title="Billing"
								value="Same as shipping"
							/>
							<NeonInfoCard
								icon={Truck}
								title="Delivery"
								value="Express"
								subValue="Dec 18-19, 2025"
							/>
							<NeonInfoCard
								icon={CreditCard}
								title="Payment"
								value="Mastercard •••• 9876"
							/>
						</div>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start border-cyan-500/30 bg-slate-900 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
						<CardContent className="space-y-4 pt-6">
							<h2 className="text-lg font-semibold text-cyan-50">Summary</h2>
							<SummaryLine label="Subtotal (3 items)" value="$269.97" />
							<SummaryLine label="Shipping" value="$12.99" />
							<SummaryLine label="Tax" value="$22.95" />
							<SummaryLine label="Gamer Bundle" value="-$27.00" green />
							<Separator className="my-4 bg-cyan-500/20" />
							<SummaryLine label="Total" value="$278.91" bold />

							<Button
								size="lg"
								className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
							>
								<Lock className="size-4" />
								Complete Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-cyan-300/60">
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
