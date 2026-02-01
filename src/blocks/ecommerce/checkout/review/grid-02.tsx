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
	Edit2,
	Gift,
	Lock,
	MapPin,
	Package,
	Percent,
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
	quantity: number;
	image: string;
}

const GridCell = ({
	title,
	icon: Icon,
	colSpan,
	rowSpan,
	onEdit,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	colSpan?: number;
	rowSpan?: number;
	onEdit?: () => void;
	children: React.ReactNode;
}) => (
	<div
		className={`group relative rounded-2xl border bg-card p-5 transition-all hover:shadow-lg hover:shadow-primary/5 ${
			colSpan === 2 ? '@lg:col-span-2' : ''
		} ${rowSpan === 2 ? '@lg:row-span-2' : ''}`}
	>
		<div className="mb-4 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
					<Icon className="size-4 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
			</div>
			{onEdit && (
				<Button
					variant="ghost"
					size="icon"
					className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={onEdit}
				>
					<Edit2 className="size-4" />
				</Button>
			)}
		</div>
		{children}
	</div>
);

const ProductRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
			<p className="text-xs text-muted-foreground">×{item.quantity}</p>
		</div>
	</div>
);

const AddressBlock = ({
	label,
	name,
	lines,
}: {
	label: string;
	name: string;
	lines: string[];
}) => (
	<div className="rounded-lg bg-muted/50 p-3">
		<p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
			{label}
		</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryInfo = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
			<Truck className="size-6 text-primary" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<Badge variant="secondary">{price}</Badge>
	</div>
);

const PaymentInfo = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600">
			<CreditCard className="size-6 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const PromoLine = ({ code, discount }: { code: string; discount: string }) => (
	<div className="flex items-center justify-between rounded-lg bg-green-500/10 px-3 py-2">
		<div className="flex items-center gap-2">
			<Percent className="size-4 text-green-600 dark:text-green-400" />
			<span className="font-mono text-sm">{code}</span>
		</div>
		<span className="font-medium text-green-600 dark:text-green-400">
			{discount}
		</span>
	</div>
);

const GiftMessage = ({ message }: { message: string }) => (
	<div className="flex items-start gap-3 rounded-lg bg-amber-500/10 p-3">
		<Gift className="mt-0.5 size-4 text-amber-600 dark:text-amber-400" />
		<div>
			<p className="text-sm font-medium">Gift message included</p>
			<p className="text-xs text-muted-foreground">&ldquo;{message}&rdquo;</p>
		</div>
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
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const VerifiedBadge = () => (
	<Badge
		variant="outline"
		className="gap-1 border-green-500/30 text-green-600 dark:text-green-400"
	>
		<CheckCircle2 className="size-3" />
		All Verified
	</Badge>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Vintage Camera',
			variant: 'Polaroid Style',
			price: 179.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Film Pack',
			variant: '20 Shots / Color',
			price: 24.99,
			quantity: 3,
			image:
				'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-6xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 flex flex-col items-center text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Confirm Your Purchase
					</h1>
					<p className="mt-2 text-muted-foreground">
						Review all details before completing checkout
					</p>
					<div className="mt-4">
						<VerifiedBadge />
					</div>
				</div>

				<div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
					<GridCell title="Items" icon={Package} colSpan={2} onEdit={() => {}}>
						<div className="divide-y">
							{items.map((item) => (
								<ProductRow key={item.id} item={item} />
							))}
						</div>
					</GridCell>

					<GridCell title="Shipping" icon={MapPin} onEdit={() => {}}>
						<AddressBlock
							label="Ship to"
							name="Lucas Martin"
							lines={['321 Photo Lane', 'Brooklyn, NY 11201']}
						/>
					</GridCell>

					<GridCell title="Billing" icon={MapPin} onEdit={() => {}}>
						<AddressBlock
							label="Bill to"
							name="Lucas Martin"
							lines={['321 Photo Lane', 'Brooklyn, NY 11201']}
						/>
					</GridCell>

					<GridCell title="Delivery" icon={Truck} onEdit={() => {}}>
						<DeliveryInfo
							method="Priority Express"
							date="Dec 19-20, 2025"
							price="$14.99"
						/>
					</GridCell>

					<GridCell title="Payment" icon={CreditCard} onEdit={() => {}}>
						<PaymentInfo brand="Discover" last4="9876" exp="03/27" />
					</GridCell>

					<GridCell title="Promos" icon={Percent}>
						<PromoLine code="PHOTO20" discount="-$50.99" />
					</GridCell>

					<GridCell title="Gift" icon={Gift}>
						<GiftMessage message="Capture beautiful memories!" />
					</GridCell>

					<Card className="@md:col-span-2 @lg:col-span-1 bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryRow label="Subtotal (4 items)" value="$254.96" />
							<SummaryRow label="Shipping" value="$14.99" />
							<SummaryRow label="Gift wrap" value="$5.99" />
							<SummaryRow label="Tax" value="$21.67" />
							<SummaryRow label="Discount" value="-$50.99" green />
							<Separator className="my-4" />
							<SummaryRow label="Total" value="$246.62" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Place Order
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
