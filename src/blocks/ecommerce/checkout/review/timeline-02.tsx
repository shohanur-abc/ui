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
	Check,
	Clock,
	CreditCard,
	Edit,
	Lock,
	MapPin,
	Package,
	ShieldCheck,
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

const VerticalTimeline = ({
	steps,
	current,
}: {
	steps: {
		title: string;
		subtitle: string;
		icon: React.ComponentType<{ className?: string }>;
		content: React.ReactNode;
	}[];
	current: number;
}) => (
	<div className="relative">
		{steps.map((step, idx) => {
			const Icon = step.icon;
			const isComplete = idx < current;
			const isCurrent = idx === current;
			const isLast = idx === steps.length - 1;

			return (
				<div key={step.title} className="relative flex gap-6 pb-8 last:pb-0">
					<div className="flex flex-col items-center">
						<div
							className={`z-10 flex size-12 items-center justify-center rounded-full transition-all ${
								isComplete
									? 'bg-green-500 text-white'
									: isCurrent
										? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
										: 'bg-muted text-muted-foreground'
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
					<div className="flex-1 pt-1">
						<div className="flex items-center justify-between">
							<div>
								<h4 className="font-semibold">{step.title}</h4>
								<p className="text-sm text-muted-foreground">{step.subtitle}</p>
							</div>
							{isComplete && (
								<Button variant="ghost" size="sm">
									<Edit className="size-3.5" />
								</Button>
							)}
						</div>
						<div className="mt-4">{step.content}</div>
					</div>
				</div>
			);
		})}
	</div>
);

const ProductMini = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md">
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

const AddressBox = ({
	type,
	name,
	lines,
}: {
	type: string;
	name: string;
	lines: string[];
}) => (
	<div className="rounded-lg bg-muted/50 p-4">
		<p className="mb-1 text-xs uppercase text-muted-foreground">{type}</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryBox = ({
	method,
	eta,
	cost,
}: {
	method: string;
	eta: string;
	cost: string;
}) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
		<Truck className="size-5 text-primary" />
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{eta}</p>
		</div>
		<Badge variant="outline">{cost}</Badge>
	</div>
);

const PaymentBox = ({
	type,
	last4,
	exp,
}: {
	type: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
		<div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600">
			<CreditCard className="size-5 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{type} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
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
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Smart Thermostat',
			variant: 'WiFi / White',
			price: 199.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1567201080580-bfcc43b0e6e5?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Temperature Sensor',
			variant: '3-Pack',
			price: 59.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop',
		},
	];

	const steps = [
		{
			title: 'Order Items',
			subtitle: '2 items selected',
			icon: Package,
			content: (
				<div className="space-y-3">
					{items.map((item) => (
						<ProductMini key={item.id} item={item} />
					))}
				</div>
			),
		},
		{
			title: 'Shipping Details',
			subtitle: 'Address confirmed',
			icon: MapPin,
			content: (
				<div className="grid gap-3 @sm:grid-cols-2">
					<AddressBox
						type="Ship To"
						name="Daniel Brown"
						lines={['999 Smart Home Ave', 'Boston, MA 02108']}
					/>
					<AddressBox
						type="Bill To"
						name="Daniel Brown"
						lines={['999 Smart Home Ave', 'Boston, MA 02108']}
					/>
				</div>
			),
		},
		{
			title: 'Delivery Method',
			subtitle: 'Express selected',
			icon: Truck,
			content: (
				<DeliveryBox
					method="Express Delivery"
					eta="Dec 19-20, 2025"
					cost="$14.99"
				/>
			),
		},
		{
			title: 'Payment',
			subtitle: 'Card ending 3456',
			icon: CreditCard,
			content: <PaymentBox type="Visa" last4="3456" exp="08/26" />,
		},
		{
			title: 'Confirm Order',
			subtitle: 'Review and place order',
			icon: ShieldCheck,
			content: (
				<Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
					<CardHeader className="pb-3">
						<CardTitle className="text-base">Order Total</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<SummaryLine label="Subtotal" value="$259.98" />
						<SummaryLine label="Shipping" value="$14.99" />
						<SummaryLine label="Tax" value="$22.10" />
						<SummaryLine label="Promo" value="-$26.00" green />
						<Separator className="my-3" />
						<SummaryLine label="Total" value="$271.07" bold />
					</CardContent>
					<CardFooter className="flex-col gap-3">
						<Button size="lg" className="w-full gap-2">
							<Lock className="size-4" />
							Pay $271.07
							<ArrowRight className="size-4" />
						</Button>
						<p className="text-center text-xs text-muted-foreground">
							Secure payment via Stripe
						</p>
					</CardFooter>
				</Card>
			),
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-3xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-10 text-center">
					<Badge variant="secondary" className="mb-4 gap-1.5">
						<Clock className="size-3.5" />
						Final Step
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Verify all information before completing your purchase
					</p>
				</div>

				<VerticalTimeline steps={steps} current={4} />
			</div>
		</section>
	);
}
