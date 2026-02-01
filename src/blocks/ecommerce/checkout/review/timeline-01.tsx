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
	Check,
	CheckCircle2,
	ChevronRight,
	CreditCard,
	Edit,
	Lock,
	MapPin,
	Package,
	Receipt,
	ShieldCheck,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface TimelineStep {
	id: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	status: 'complete' | 'current' | 'upcoming';
	content: React.ReactNode;
}

interface OrderItem {
	id: string;
	name: string;
	details: string;
	price: number;
	quantity: number;
	image: string;
}

const TimelineStepComponent = ({
	step,
	isLast,
	onEdit,
}: {
	step: TimelineStep;
	isLast: boolean;
	onEdit?: () => void;
}) => {
	const Icon = step.icon;
	const isComplete = step.status === 'complete';
	const isCurrent = step.status === 'current';

	return (
		<div className="relative flex gap-4">
			<div className="flex flex-col items-center">
				<div
					className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 transition-all ${
						isComplete
							? 'border-green-500 bg-green-500 text-white'
							: isCurrent
								? 'border-primary bg-primary text-primary-foreground ring-4 ring-primary/20'
								: 'border-muted-foreground/30 bg-muted text-muted-foreground'
					}`}
				>
					{isComplete ? (
						<Check className="size-5" />
					) : (
						<Icon className="size-5" />
					)}
				</div>
				{!isLast && (
					<div
						className={`w-0.5 flex-1 ${isComplete ? 'bg-green-500' : 'bg-border'}`}
					/>
				)}
			</div>

			<div className="flex-1 pb-8">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-semibold">{step.title}</h3>
						<p className="text-sm text-muted-foreground">{step.description}</p>
					</div>
					{isComplete && onEdit && (
						<Button
							variant="ghost"
							size="sm"
							className="gap-1.5"
							onClick={onEdit}
						>
							<Edit className="size-3.5" />
							Edit
						</Button>
					)}
				</div>
				<div className="mt-4">{step.content}</div>
			</div>
		</div>
	);
};

const ProductRow = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-3 py-2">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.details}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-medium">${item.price.toFixed(2)}</p>
			<p className="text-xs text-muted-foreground">×{item.quantity}</p>
		</div>
	</div>
);

const AddressCard = ({
	label,
	name,
	lines,
}: {
	label: string;
	name: string;
	lines: string[];
}) => (
	<div className="rounded-lg border bg-card/50 p-4">
		<p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
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
	estimate,
	price,
}: {
	method: string;
	estimate: string;
	price: string;
}) => (
	<div className="flex items-center justify-between rounded-lg border bg-card/50 p-4">
		<div className="flex items-center gap-3">
			<Truck className="size-5 text-primary" />
			<div>
				<p className="font-medium">{method}</p>
				<p className="text-sm text-muted-foreground">{estimate}</p>
			</div>
		</div>
		<span className="font-medium">{price}</span>
	</div>
);

const PaymentInfo = ({
	type,
	last4,
	name,
}: {
	type: string;
	last4: string;
	name: string;
}) => (
	<div className="flex items-center gap-3 rounded-lg border bg-card/50 p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
			<CreditCard className="size-5 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{type} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">{name}</p>
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
	<div className={`flex justify-between ${bold ? 'font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Smart Home Hub',
			details: 'Voice Control / Black',
			price: 129.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Motion Sensor (2-pack)',
			details: 'Wireless',
			price: 39.99,
			quantity: 2,
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
	];

	const steps: TimelineStep[] = [
		{
			id: 'items',
			title: 'Order Items',
			description: '3 items in your cart',
			icon: Package,
			status: 'complete',
			content: (
				<Card>
					<CardContent className="divide-y pt-4">
						{items.map((item) => (
							<ProductRow key={item.id} item={item} />
						))}
					</CardContent>
				</Card>
			),
		},
		{
			id: 'shipping',
			title: 'Shipping Address',
			description: 'Where we will deliver',
			icon: MapPin,
			status: 'complete',
			content: (
				<div className="grid gap-4 @md:grid-cols-2">
					<AddressCard
						label="Ship To"
						name="Emily Watson"
						lines={[
							'555 Tech Park Dr',
							'Building A, Floor 3',
							'Denver, CO 80202',
						]}
					/>
					<AddressCard
						label="Bill To"
						name="Emily Watson"
						lines={[
							'555 Tech Park Dr',
							'Building A, Floor 3',
							'Denver, CO 80202',
						]}
					/>
				</div>
			),
		},
		{
			id: 'delivery',
			title: 'Delivery Method',
			description: 'How you will receive it',
			icon: Truck,
			status: 'complete',
			content: (
				<DeliveryInfo
					method="Priority Shipping"
					estimate="Arrives Dec 20-22, 2025"
					price="$14.99"
				/>
			),
		},
		{
			id: 'payment',
			title: 'Payment Method',
			description: 'How you will pay',
			icon: CreditCard,
			status: 'complete',
			content: (
				<PaymentInfo type="American Express" last4="0005" name="Emily Watson" />
			),
		},
		{
			id: 'review',
			title: 'Review & Confirm',
			description: 'Final step',
			icon: Receipt,
			status: 'current',
			content: (
				<Card className="border-primary/30 bg-gradient-to-b from-primary/5 to-transparent">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-base">
							<CheckCircle2 className="size-5 text-primary" />
							Order Summary
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<SummaryRow label="Subtotal (3 items)" value="$209.97" />
						<SummaryRow label="Shipping" value="$14.99" />
						<SummaryRow label="Tax" value="$18.52" />
						<SummaryRow label="Promo (SMART10)" value="-$21.00" green />
						<Separator className="my-4" />
						<SummaryRow label="Total" value="$222.48" bold />
					</CardContent>
					<CardFooter className="flex-col gap-3">
						<Button size="lg" className="w-full gap-2">
							<ShieldCheck className="size-4" />
							Confirm & Pay $222.48
						</Button>
						<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<Lock className="size-3" />
							<span>Your payment information is encrypted</span>
						</div>
					</CardFooter>
				</Card>
			),
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-3xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10">
					<Badge variant="secondary" className="mb-4 gap-1.5">
						<Receipt className="size-3.5" />
						Step 4 of 4
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Check all details before completing your purchase
					</p>
				</div>

				<div className="space-y-0">
					{steps.map((step, index) => (
						<TimelineStepComponent
							key={step.id}
							step={step}
							isLast={index === steps.length - 1}
							onEdit={step.status === 'complete' ? () => {} : undefined}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
