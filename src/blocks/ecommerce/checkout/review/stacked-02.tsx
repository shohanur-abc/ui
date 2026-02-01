import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	Edit3,
	MapPin,
	Package,
	Shield,
	ShoppingCart,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	desc: string;
	price: number;
	qty: number;
	image: string;
}

const ReviewPanel = ({
	title,
	icon: Icon,
	onEdit,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	onEdit?: () => void;
	children: React.ReactNode;
}) => (
	<div className="group rounded-2xl border bg-card">
		<div className="flex items-center justify-between border-b px-6 py-4">
			<div className="flex items-center gap-3">
				<div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
					<Icon className="size-4 text-primary" />
				</div>
				<h3 className="font-semibold">{title}</h3>
			</div>
			{onEdit && (
				<Button
					variant="ghost"
					size="sm"
					className="gap-1.5 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={onEdit}
				>
					<Edit3 className="size-3.5" />
					Edit
				</Button>
			)}
		</div>
		<div className="p-6">{children}</div>
	</div>
);

const ItemCard = ({ product }: { product: Product }) => (
	<div className="flex gap-4 rounded-xl bg-muted/50 p-4">
		<div className="relative size-24 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-muted-foreground">{product.desc}</p>
			</div>
			<div className="flex items-center justify-between">
				<Badge variant="secondary">Qty: {product.qty}</Badge>
				<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const AddressDisplay = ({
	type,
	name,
	address,
}: {
	type: string;
	name: string;
	address: string[];
}) => (
	<div className="rounded-xl bg-muted/50 p-4">
		<p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
			{type}
		</p>
		<p className="font-medium">{name}</p>
		{address.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryRow = ({
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
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentRow = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
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

const TotalLine = ({
	label,
	value,
	large,
	green,
}: {
	label: string;
	value: string;
	large?: boolean;
	green?: boolean;
}) => (
	<div className={`flex justify-between ${large ? 'text-xl font-bold' : ''}`}>
		<span className={large ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

const ConfirmationBanner = () => (
	<div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4">
		<CheckCircle2 className="size-6 text-primary" />
		<div>
			<p className="font-medium">All details verified</p>
			<p className="text-sm text-muted-foreground">
				Ready to complete your order
			</p>
		</div>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Premium Yoga Mat',
			desc: 'Non-slip / Purple',
			price: 49.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Resistance Bands Set',
			desc: '5 Levels / Latex-free',
			price: 24.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=200&h=200&fit=crop',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
			data-theme="neon"
		>
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 flex flex-col items-center text-center">
					<div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
						<ShoppingCart className="size-8 text-primary" />
					</div>
					<Badge variant="secondary" className="mb-3 gap-1.5">
						<Sparkles className="size-3.5" />
						Step 4 of 4
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Order Review
					</h1>
					<p className="mt-2 max-w-md text-muted-foreground">
						Please review all details before confirming your purchase
					</p>
				</div>

				<div className="space-y-6">
					<ConfirmationBanner />

					<ReviewPanel title="Order Items" icon={Package} onEdit={() => {}}>
						<div className="space-y-4">
							{products.map((product) => (
								<ItemCard key={product.id} product={product} />
							))}
						</div>
					</ReviewPanel>

					<ReviewPanel title="Shipping Address" icon={MapPin} onEdit={() => {}}>
						<div className="grid gap-4 @md:grid-cols-2">
							<AddressDisplay
								type="Shipping"
								name="Amanda Lee"
								address={[
									'789 Wellness Street',
									'Apt 12C',
									'Portland, OR 97201',
								]}
							/>
							<AddressDisplay
								type="Billing"
								name="Amanda Lee"
								address={[
									'789 Wellness Street',
									'Apt 12C',
									'Portland, OR 97201',
								]}
							/>
						</div>
					</ReviewPanel>

					<ReviewPanel title="Delivery Method" icon={Truck} onEdit={() => {}}>
						<DeliveryRow
							method="Standard Shipping"
							date="Arrives Dec 27-30, 2025"
							price="Free"
						/>
					</ReviewPanel>

					<ReviewPanel title="Payment" icon={CreditCard} onEdit={() => {}}>
						<PaymentRow brand="Visa" last4="1111" exp="05/27" />
					</ReviewPanel>

					<div className="rounded-2xl border bg-card p-6">
						<h3 className="mb-6 text-lg font-semibold">Order Summary</h3>
						<div className="space-y-3">
							<TotalLine label="Subtotal (3 items)" value="$99.97" />
							<TotalLine label="Shipping" value="$0.00" />
							<TotalLine label="Tax" value="$8.50" />
							<TotalLine label="Promo Applied" value="-$10.00" green />
							<Separator className="my-4" />
							<TotalLine label="Total" value="$98.47" large />
						</div>

						<Button size="lg" className="mt-8 w-full gap-2">
							<Shield className="size-4" />
							Place Order
							<ArrowRight className="size-4" />
						</Button>

						<p className="mt-4 text-center text-xs text-muted-foreground">
							By placing this order, you agree to our Terms of Service and
							Privacy Policy
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
