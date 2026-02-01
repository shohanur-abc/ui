import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const GlassProduct = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 rounded-xl bg-white/10 p-4 shadow-lg backdrop-blur-md dark:bg-white/5">
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
			<p className="font-bold">${product.price.toFixed(2)}</p>
			<Badge className="bg-white/20 backdrop-blur-sm">×{product.qty}</Badge>
		</div>
	</div>
);

const GlassInfoBlock = ({
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
	<div className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-md dark:bg-white/5">
		<Icon className="size-5 text-primary" />
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="font-medium">{value}</p>
			{subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
		</div>
		<Check className="size-5 text-green-400" />
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
		<span className={green ? 'text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'VR Headset',
			variant: 'Pro / 4K Display',
			price: 499.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Controllers',
			variant: 'Haptic / Pair',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
			data-theme="neon"
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.3),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,0,128,0.2),transparent_50%)]" />

			<div className="relative mx-auto max-w-3xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 bg-white/10 backdrop-blur-md">
						<Sparkles className="size-3.5" />
						VR Experience
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight text-white @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-purple-200">Step into virtual reality</p>
				</div>

				<div className="space-y-6">
					<div className="space-y-3">
						{products.map((product) => (
							<GlassProduct key={product.id} product={product} />
						))}
					</div>

					<div className="grid gap-3 @sm:grid-cols-2">
						<GlassInfoBlock
							icon={MapPin}
							title="Shipping"
							value="Jordan M., Los Angeles, CA"
						/>
						<GlassInfoBlock
							icon={MapPin}
							title="Billing"
							value="Same as shipping"
						/>
						<GlassInfoBlock
							icon={Truck}
							title="Delivery"
							value="Priority"
							subValue="Dec 19-20, 2025"
						/>
						<GlassInfoBlock
							icon={CreditCard}
							title="Payment"
							value="Visa •••• 1234"
						/>
					</div>

					<div className="rounded-2xl bg-white/10 p-6 backdrop-blur-xl dark:bg-white/5">
						<h2 className="mb-4 text-lg font-semibold text-white">Summary</h2>
						<div className="space-y-2 text-white">
							<SummaryLine label="Subtotal (2 items)" value="$649.98" />
							<SummaryLine label="Shipping" value="$14.99" />
							<SummaryLine label="Tax" value="$55.25" />
							<SummaryLine label="VR Bundle" value="-$65.00" green />
							<Separator className="my-4 bg-white/20" />
							<SummaryLine label="Total" value="$655.22" bold />
						</div>

						<Button
							size="lg"
							className="mt-6 w-full gap-2 bg-purple-600 hover:bg-purple-700"
						>
							<Lock className="size-4" />
							Complete Order
							<ArrowRight className="size-4" />
						</Button>
						<div className="mt-3 flex items-center justify-center gap-2 text-xs text-purple-200">
							<Shield className="size-3" />
							<span>Secure checkout</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
