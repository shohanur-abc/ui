import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowLeft,
	Check,
	ChevronRight,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Package,
	ShieldCheck,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

interface ShippingInfo {
	name: string;
	address: string;
	method: string;
	estimatedDelivery: string;
}

interface PaymentInfo {
	cardType: string;
	last4: string;
	name: string;
}

interface PricingDetails {
	subtotal: number;
	shipping: number;
	tax: number;
	discount: number;
	total: number;
}

const StepIndicator = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="flex items-center gap-2">
		{steps.map((step, index) => (
			<div key={step} className="flex items-center gap-2">
				<div
					className={`flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
						index < currentStep
							? 'bg-primary text-primary-foreground'
							: index === currentStep
								? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
								: 'bg-muted text-muted-foreground'
					}`}
				>
					{index < currentStep ? <Check className="size-4" /> : index + 1}
				</div>
				<span
					className={`hidden text-sm @lg:block ${index === currentStep ? 'font-medium' : 'text-muted-foreground'}`}
				>
					{step}
				</span>
				{index < steps.length - 1 && (
					<ChevronRight className="size-4 text-muted-foreground" />
				)}
			</div>
		))}
	</div>
);

const ItemRow = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
				{item.quantity}
			</div>
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<span className="font-medium">${item.price.toFixed(2)}</span>
	</div>
);

const InfoSection = ({
	icon: Icon,
	title,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-lg border bg-card/50 p-4">
		<div className="mb-3 flex items-center gap-2 text-sm font-medium">
			<Icon className="size-4 text-primary" />
			{title}
		</div>
		{children}
	</div>
);

const PriceLine = ({
	label,
	amount,
	highlight,
	discount,
}: {
	label: string;
	amount: number;
	highlight?: boolean;
	discount?: boolean;
}) => (
	<div
		className={`flex justify-between py-1 ${highlight ? 'text-lg font-bold' : 'text-sm'} ${discount ? 'text-green-600 dark:text-green-400' : ''}`}
	>
		<span className={highlight ? '' : 'text-muted-foreground'}>{label}</span>
		<span>
			{discount && '-'}${Math.abs(amount).toFixed(2)}
		</span>
	</div>
);

const SecureBadge = () => (
	<div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 py-2 text-xs text-muted-foreground">
		<Lock className="size-3" />
		<span>256-bit SSL Encrypted</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Minimalist Watch',
			variant: 'Rose Gold / 38mm',
			price: 249.0,
			quantity: 1,
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Leather Strap',
			variant: 'Tan',
			price: 49.0,
			quantity: 2,
			image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Watch Case',
			variant: 'Travel Edition',
			price: 79.0,
			quantity: 1,
			image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=200&h=200&fit=crop',
		},
	];

	const shipping: ShippingInfo = {
		name: 'Sarah Johnson',
		address: '456 Oak Avenue, Suite 200, New York, NY 10001',
		method: 'Express Shipping',
		estimatedDelivery: 'Dec 22-23, 2025',
	};

	const payment: PaymentInfo = {
		cardType: 'Mastercard',
		last4: '8888',
		name: 'Sarah Johnson',
	};

	const pricing: PricingDetails = {
		subtotal: 426.0,
		shipping: 12.99,
		tax: 36.21,
		discount: 42.6,
		total: 432.6,
	};

	const steps = ['Cart', 'Shipping', 'Payment', 'Review'];

	return (
		<section className="@container relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-12 @2xl:px-8">
				<div className="mb-8">
					<StepIndicator steps={steps} currentStep={3} />
				</div>

				<div className="grid gap-8 @xl:grid-cols-[1fr_400px] @3xl:grid-cols-[1fr_440px]">
					<div className="space-y-6">
						<div>
							<Button variant="ghost" size="sm" className="mb-4 gap-1.5">
								<ArrowLeft className="size-4" />
								Back to Payment
							</Button>
							<h1 className="text-2xl font-bold @md:text-3xl">Review Order</h1>
							<p className="mt-1 text-muted-foreground">
								Double-check everything before placing your order
							</p>
						</div>

						<div className="grid gap-4 @md:grid-cols-2">
							<InfoSection icon={MapPin} title="Shipping Address">
								<p className="font-medium">{shipping.name}</p>
								<p className="text-sm text-muted-foreground">{shipping.address}</p>
							</InfoSection>

							<InfoSection icon={Truck} title="Delivery Method">
								<p className="font-medium">{shipping.method}</p>
								<p className="text-sm text-muted-foreground">
									Arrives {shipping.estimatedDelivery}
								</p>
							</InfoSection>

							<InfoSection icon={CreditCard} title="Payment Method">
								<p className="font-medium">
									{payment.cardType} •••• {payment.last4}
								</p>
								<p className="text-sm text-muted-foreground">{payment.name}</p>
							</InfoSection>

							<InfoSection icon={Gift} title="Gift Options">
								<p className="font-medium">Gift wrapping included</p>
								<p className="text-sm text-muted-foreground">
									Message: &quot;Happy Birthday!&quot;
								</p>
							</InfoSection>
						</div>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Package className="size-5" />
									Items ({items.length})
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="divide-y">
									{items.map((item) => (
										<ItemRow key={item.id} item={item} />
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="@xl:sticky @xl:top-8 @xl:self-start">
						<Card className="border-primary/20 bg-gradient-to-b from-card to-card/80">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-1">
									<PriceLine label="Subtotal" amount={pricing.subtotal} />
									<PriceLine label="Shipping" amount={pricing.shipping} />
									<PriceLine label="Estimated Tax" amount={pricing.tax} />
									{pricing.discount > 0 && (
										<PriceLine
											label="Promo Discount (10%)"
											amount={pricing.discount}
											discount
										/>
									)}
								</div>

								<Separator />

								<PriceLine label="Total" amount={pricing.total} highlight />

								<Badge variant="outline" className="w-full justify-center gap-1.5 py-1.5">
									<Gift className="size-3.5" />
									You&apos;re saving ${pricing.discount.toFixed(2)} on this order!
								</Badge>

								<Button size="lg" className="w-full gap-2">
									<ShieldCheck className="size-4" />
									Place Order
								</Button>

								<SecureBadge />

								<p className="text-center text-xs text-muted-foreground">
									By placing this order, you agree to our Terms of Service
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
