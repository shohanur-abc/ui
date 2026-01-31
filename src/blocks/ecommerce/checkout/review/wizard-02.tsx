import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	Clock,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Receipt,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	details: string;
	price: number;
	qty: number;
	img: string;
}

const HorizontalStepper = ({
	steps,
	current,
}: {
	steps: { label: string; icon: React.ComponentType<{ className?: string }> }[];
	current: number;
}) => (
	<div className="flex items-center justify-between">
		{steps.map((step, idx) => {
			const Icon = step.icon;
			const isComplete = idx < current;
			const isCurrent = idx === current;

			return (
				<div key={step.label} className="flex flex-1 items-center">
					<div className="flex flex-col items-center">
						<div
							className={`flex size-12 items-center justify-center rounded-2xl transition-all ${
								isComplete
									? 'bg-green-500 text-white'
									: isCurrent
										? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							{isComplete ? <Check className="size-5" /> : <Icon className="size-5" />}
						</div>
						<span
							className={`mt-2 text-xs ${isCurrent ? 'font-medium' : 'text-muted-foreground'}`}
						>
							{step.label}
						</span>
					</div>
					{idx < steps.length - 1 && (
						<div
							className={`mx-2 h-0.5 flex-1 rounded-full ${
								isComplete ? 'bg-green-500' : 'bg-border'
							}`}
						/>
					)}
				</div>
			);
		})}
	</div>
);

const OrderItem = ({ product }: { product: Product }) => (
	<div className="flex gap-4 py-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
			<Image src={product.img} alt={product.name} fill className="object-cover" />
			<div className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-tl-lg bg-primary text-xs font-bold text-primary-foreground">
				{product.qty}
			</div>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-muted-foreground">{product.details}</p>
			</div>
			<p className="font-semibold">${product.price.toFixed(2)}</p>
		</div>
	</div>
);

const InfoCard = ({
	icon: Icon,
	title,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-xl border bg-muted/30 p-4">
		<div className="mb-3 flex items-center gap-2">
			<Icon className="size-4 text-primary" />
			<span className="text-sm font-medium">{title}</span>
		</div>
		{children}
	</div>
);

const AddressContent = ({
	name,
	lines,
	phone,
}: {
	name: string;
	lines: string[];
	phone: string;
}) => (
	<div>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
		<p className="mt-1 text-sm text-muted-foreground">{phone}</p>
	</div>
);

const DeliveryContent = ({
	method,
	date,
	cost,
}: {
	method: string;
	date: string;
	cost: string;
}) => (
	<div className="flex items-center justify-between">
		<div>
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<Badge>{cost}</Badge>
	</div>
);

const PaymentContent = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600">
			<CreditCard className="size-5 text-white" />
		</div>
		<div>
			<p className="font-medium">{brand} •••• {last4}</p>
			<p className="text-xs text-muted-foreground">Expires {exp}</p>
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
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Smart Home Speaker',
			details: 'Voice Assistant / Charcoal',
			price: 129.99,
			qty: 2,
			img: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Smart Plug (4-Pack)',
			details: 'WiFi / Energy Monitoring',
			price: 49.99,
			qty: 1,
			img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
	];

	const steps = [
		{ label: 'Cart', icon: Package },
		{ label: 'Address', icon: MapPin },
		{ label: 'Shipping', icon: Truck },
		{ label: 'Payment', icon: CreditCard },
		{ label: 'Review', icon: Receipt },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10">
					<HorizontalStepper steps={steps} current={4} />
				</div>

				<div className="mb-8 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Step
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review & Place Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Confirm your details before completing purchase
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-5">
					<div className="space-y-6 @lg:col-span-3">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2 text-base">
									<Package className="size-5" />
									Order Items ({products.length})
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="divide-y">
									{products.map((product) => (
										<OrderItem key={product.id} product={product} />
									))}
								</div>
							</CardContent>
						</Card>

						<div className="grid gap-4 @md:grid-cols-2">
							<InfoCard icon={MapPin} title="Shipping Address">
								<AddressContent
									name="Kevin Williams"
									lines={['789 Innovation Blvd', 'Austin, TX 78701']}
									phone="+1 (512) 555-0198"
								/>
							</InfoCard>

							<InfoCard icon={MapPin} title="Billing Address">
								<AddressContent
									name="Kevin Williams"
									lines={['789 Innovation Blvd', 'Austin, TX 78701']}
									phone="+1 (512) 555-0198"
								/>
							</InfoCard>
						</div>

						<div className="grid gap-4 @md:grid-cols-2">
							<InfoCard icon={Truck} title="Delivery">
								<DeliveryContent
									method="Standard Shipping"
									date="Dec 26-28, 2025"
									cost="Free"
								/>
							</InfoCard>

							<InfoCard icon={CreditCard} title="Payment">
								<PaymentContent brand="Visa" last4="5555" exp="11/26" />
							</InfoCard>
						</div>
					</div>

					<div className="@lg:col-span-2">
						<Card className="sticky top-8 bg-gradient-to-br from-card to-muted/30">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Clock className="size-5" />
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<SummaryRow label="Subtotal (3 items)" value="$309.97" />
								<SummaryRow label="Shipping" value="$0.00" />
								<SummaryRow label="Tax" value="$26.35" />
								<SummaryRow label="Promo (SMART15)" value="-$46.50" green />
								<Separator className="my-4" />
								<SummaryRow label="Total" value="$289.82" bold />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Complete Purchase
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
		</section>
	);
}
