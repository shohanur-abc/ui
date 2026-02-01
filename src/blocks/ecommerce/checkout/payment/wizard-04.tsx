'use client';

import {
	ArrowRight,
	Check,
	ChevronRight,
	CreditCard,
	Gift,
	Lock,
	Package,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface CartItem {
	name: string;
	variant: string;
	quantity: number;
	price: string;
	image: string;
}

const BreadcrumbSteps = ({
	steps,
	currentIndex,
}: {
	steps: string[];
	currentIndex: number;
}) => (
	<div className="flex items-center gap-1 text-sm overflow-x-auto pb-2">
		{steps.map((step, index) => (
			<div key={index} className="flex items-center shrink-0">
				<span
					className={`${index === currentIndex ? 'text-primary font-medium' : index < currentIndex ? 'text-foreground' : 'text-muted-foreground'}`}
				>
					{step}
				</span>
				{index < steps.length - 1 && (
					<ChevronRight className="size-4 text-muted-foreground mx-1" />
				)}
			</div>
		))}
	</div>
);

const CartPreview = ({ items }: { items: CartItem[] }) => (
	<div className="space-y-3">
		{items.map((item, index) => (
			<div key={index} className="flex gap-3">
				<div className="size-16 rounded-lg bg-muted flex items-center justify-center text-2xl shrink-0">
					{item.image}
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium text-sm truncate">{item.name}</p>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
					<p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
				</div>
				<span className="text-sm font-medium">{item.price}</span>
			</div>
		))}
	</div>
);

const ExpressCheckoutButtons = () => (
	<div className="space-y-3">
		<div className="grid grid-cols-2 gap-2">
			<Button variant="outline" className="h-12 gap-2">
				<span className="text-lg">🍎</span>
				Pay
			</Button>
			<Button variant="outline" className="h-12 gap-2">
				<span className="text-lg">G</span>
				Pay
			</Button>
		</div>
		<div className="relative">
			<Separator className="my-4" />
			<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
				or pay with card
			</span>
		</div>
	</div>
);

const PaymentFormCompact = () => (
	<div className="space-y-4">
		<div className="space-y-2">
			<Label className="text-sm">Email</Label>
			<Input type="email" placeholder="you@example.com" />
		</div>
		<Separator />
		<div className="space-y-2">
			<Label className="text-sm">Card Information</Label>
			<div className="space-y-2">
				<div className="relative">
					<CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="1234 5678 9012 3456" className="pl-10" />
				</div>
				<div className="grid grid-cols-2 gap-2">
					<Input placeholder="MM / YY" />
					<Input type="password" placeholder="CVC" />
				</div>
			</div>
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Name on card</Label>
			<Input placeholder="Full name on card" />
		</div>
		<Separator />
		<div className="space-y-2">
			<Label className="text-sm">Country or region</Label>
			<select className="w-full h-10 px-3 rounded-md border border-input bg-transparent text-sm">
				<option>United States</option>
				<option>Canada</option>
				<option>United Kingdom</option>
			</select>
			<Input placeholder="ZIP" />
		</div>
	</div>
);

const PromoCodeInput = () => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Gift className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder="Promo code" className="pl-10" />
		</div>
		<Button variant="outline">Apply</Button>
	</div>
);

const OrderBreakdown = ({
	lines,
}: {
	lines: {
		label: string;
		value: string;
		isTotal?: boolean;
		isSavings?: boolean;
	}[];
}) => (
	<div className="space-y-2">
		{lines.map((line, index) => (
			<div key={index}>
				{line.isTotal && <Separator className="my-3" />}
				<div
					className={`flex justify-between ${line.isTotal ? 'font-semibold text-lg' : 'text-sm'}`}
				>
					<span
						className={`${line.isSavings ? 'text-emerald-600' : ''} ${!line.isTotal && !line.isSavings ? 'text-muted-foreground' : ''}`}
					>
						{line.label}
					</span>
					<span className={line.isSavings ? 'text-emerald-600' : ''}>
						{line.value}
					</span>
				</div>
			</div>
		))}
	</div>
);

const PayButton = ({ label, total }: { label: string; total: string }) => (
	<Button className="w-full h-12 gap-2" size="lg">
		<Lock className="size-4" />
		{label} {total}
	</Button>
);

const SecurityFooter = () => (
	<div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
		<div className="flex items-center gap-1">
			<Shield className="size-3" />
			<span>Secure payment</span>
		</div>
		<div className="flex items-center gap-1">
			<Lock className="size-3" />
			<span>256-bit encryption</span>
		</div>
	</div>
);

export default function Main() {
	const steps = ['Cart', 'Payment', 'Confirmation'];

	const cartItems: CartItem[] = [
		{
			name: 'Wireless Headphones Pro',
			variant: 'Midnight Black',
			quantity: 1,
			price: '$249.00',
			image: '🎧',
		},
		{
			name: 'USB-C Cable 2m',
			variant: 'White',
			quantity: 2,
			price: '$29.00',
			image: '🔌',
		},
	];

	const orderLines = [
		{ label: 'Subtotal', value: '$278.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'SAVE20 discount', value: '-$27.80', isSavings: true },
		{ label: 'Tax', value: '$20.02' },
		{ label: 'Total', value: '$270.22', isTotal: true },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<BreadcrumbSteps steps={steps} currentIndex={1} />
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="p-4 rounded-xl bg-muted/30">
							<div className="flex items-center justify-between mb-3">
								<span className="font-medium">Order Summary</span>
								<Badge variant="outline" className="gap-1 text-xs">
									<Package className="size-3" />
									{cartItems.length} items
								</Badge>
							</div>
							<CartPreview items={cartItems} />
						</div>

						<ExpressCheckoutButtons />

						<PaymentFormCompact />

						<PromoCodeInput />

						<OrderBreakdown lines={orderLines} />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<PayButton label="Pay" total="$270.22" />
						<SecurityFooter />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
