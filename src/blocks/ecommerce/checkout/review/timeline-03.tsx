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
	Circle,
	CreditCard,
	Lock,
	MapPin,
	Package,
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
	qty: number;
	image: string;
}

interface TimelineStep {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	content: React.ReactNode;
	completed: boolean;
}

const TimelineItem = ({
	step,
	isLast,
}: {
	step: TimelineStep;
	isLast: boolean;
}) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`flex size-10 items-center justify-center rounded-full ${
					step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'
				}`}
			>
				{step.completed ? (
					<Check className="size-5" />
				) : (
					<step.icon className="size-5" />
				)}
			</div>
			{!isLast && (
				<div
					className={`w-0.5 flex-1 ${step.completed ? 'bg-primary' : 'bg-muted'}`}
				/>
			)}
		</div>
		<div className="flex-1 pb-8">
			<div className="flex items-center gap-2 mb-3">
				<h3 className="font-semibold">{step.title}</h3>
				{step.completed && (
					<Badge variant="secondary" className="text-xs">
						Verified
					</Badge>
				)}
			</div>
			{step.content}
		</div>
	</div>
);

const ProductItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">
				×{item.qty}
			</Badge>
		</div>
	</div>
);

const AddressInfo = ({ name, address }: { name: string; address: string }) => (
	<div className="rounded-lg bg-muted/50 p-3">
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryInfo = ({ method, date }: { method: string; date: string }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<Truck className="size-5 text-primary" />
		<div>
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
	</div>
);

const PaymentInfo = ({ brand, last4 }: { brand: string; last4: string }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<CreditCard className="size-5 text-primary" />
		<p className="font-medium">
			{brand} •••• {last4}
		</p>
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
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Running Shoes',
			variant: 'Blue / Size 10',
			price: 129.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Athletic Socks',
			variant: 'White / 3-Pack',
			price: 19.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=200&h=200&fit=crop',
		},
	];

	const steps: TimelineStep[] = [
		{
			icon: Package,
			title: 'Order Items',
			completed: true,
			content: (
				<div className="space-y-2">
					{items.map((item) => (
						<ProductItem key={item.id} item={item} />
					))}
				</div>
			),
		},
		{
			icon: MapPin,
			title: 'Shipping Address',
			completed: true,
			content: (
				<AddressInfo
					name="Ryan M."
					address="123 Runner's Lane, Boston, MA 02101"
				/>
			),
		},
		{
			icon: Truck,
			title: 'Delivery Method',
			completed: true,
			content: <DeliveryInfo method="Express" date="Arrives Dec 20-21, 2025" />,
		},
		{
			icon: CreditCard,
			title: 'Payment',
			completed: true,
			content: <PaymentInfo brand="Amex" last4="0001" />,
		},
		{
			icon: Circle,
			title: 'Confirm Order',
			completed: false,
			content: (
				<p className="text-sm text-muted-foreground">
					Review complete - ready to place order
				</p>
			),
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Order Review
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Checkout Progress
					</h1>
					<p className="mt-1 text-muted-foreground">
						Follow the timeline to complete your order
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_360px]">
					<div>
						{steps.map((step, index) => (
							<TimelineItem
								key={step.title}
								step={step}
								isLast={index === steps.length - 1}
							/>
						))}
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$149.98" />
							<SummaryLine label="Shipping" value="$12.99" />
							<SummaryLine label="Tax" value="$12.75" />
							<SummaryLine label="Discount" value="-$15.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$160.72" bold />
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
