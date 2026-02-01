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
	option: string;
	price: number;
	quantity: number;
	image: string;
}

const GlassItem = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
		<div className="relative size-18 shrink-0 overflow-hidden rounded-xl ring-2 ring-white/10">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-semibold">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.option}</p>
			<Badge variant="outline" className="mt-1 border-primary/30 text-primary">
				×{product.quantity}
			</Badge>
		</div>
		<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
	</div>
);

const GlassInfo = ({
	icon: Icon,
	title,
	line1,
	line2,
	accentColor,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	line1: string;
	line2?: string;
	accentColor?: string;
}) => (
	<div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
		<div className="mb-3 flex items-center gap-2">
			<div
				className={`flex size-8 items-center justify-center rounded-lg ${accentColor || 'bg-primary/20'}`}
			>
				<Icon className="size-4 text-primary" />
			</div>
			<span className="text-sm font-medium text-muted-foreground">{title}</span>
		</div>
		<p className="font-medium">{line1}</p>
		{line2 && <p className="text-sm text-muted-foreground">{line2}</p>}
	</div>
);

const StatusBadge = ({
	label,
	verified,
}: {
	label: string;
	verified: boolean;
}) => (
	<div className="flex items-center gap-2">
		<div
			className={`flex size-5 items-center justify-center rounded-full ${
				verified ? 'bg-green-500' : 'bg-muted'
			}`}
		>
			{verified && <CheckCircle className="size-3 text-white" />}
		</div>
		<span className="text-sm">{label}</span>
	</div>
);

const SummaryLine = ({
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
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={
				glow ? 'text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.5)]' : ''
			}
		>
			{value}
		</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Gaming Mouse',
			option: '16000 DPI / RGB',
			price: 79.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'USB Hub',
			option: '7-Port / Powered',
			price: 34.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1625723044792-44de16ccb4e4?w=200&h=200&fit=crop',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10"
			data-theme="neon"
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
			<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

			<div className="relative mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5 border-primary/30 bg-primary/10">
						<Sparkles className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						<span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
							Confirm Your Order
						</span>
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review everything before checkout
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_360px]">
					<div className="space-y-6">
						<div className="space-y-4">
							{products.map((product) => (
								<GlassItem key={product.id} product={product} />
							))}
						</div>

						<div className="grid gap-4 @sm:grid-cols-2">
							<GlassInfo
								icon={MapPin}
								title="Shipping"
								line1="Emma Stone"
								line2="456 Tech Blvd, Austin, TX 78701"
							/>
							<GlassInfo
								icon={MapPin}
								title="Billing"
								line1="Emma Stone"
								line2="456 Tech Blvd, Austin, TX 78701"
							/>
							<GlassInfo
								icon={Truck}
								title="Delivery"
								line1="Express Shipping"
								line2="Arrives Dec 18-19, 2025"
							/>
							<GlassInfo
								icon={CreditCard}
								title="Payment"
								line1="Visa •••• 1234"
								line2="Expires 08/27"
							/>
						</div>

						<div className="flex flex-wrap gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
							<StatusBadge label="Items" verified />
							<StatusBadge label="Shipping" verified />
							<StatusBadge label="Payment" verified />
							<StatusBadge label="Ready" verified />
						</div>
					</div>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card className="border-white/10 bg-white/5 backdrop-blur-md">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Zap className="size-5 text-primary" />
									Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryLine label="Subtotal (2 items)" value="$114.98" />
								<SummaryLine label="Express Shipping" value="$14.99" />
								<SummaryLine label="Tax" value="$9.77" />
								<SummaryLine label="Promo Applied" value="-$11.50" glow />
								<Separator className="my-4 bg-white/10" />
								<SummaryLine label="Total" value="$128.24" bold />
							</CardContent>
							<CardFooter className="flex-col gap-4">
								<Button
									size="lg"
									className="w-full gap-2 shadow-lg shadow-primary/30"
								>
									<Lock className="size-4" />
									Pay $128.24
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<Shield className="size-3" />
									<span>End-to-end encrypted</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
