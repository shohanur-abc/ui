import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Check,
	Package,
	Truck,
	Home,
	ArrowRight,
	Calendar,
	Clock,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStep {
	icon: React.ElementType;
	label: string;
	description: string;
	completed: boolean;
	current: boolean;
}

interface OrderItemProps {
	name: string;
	variant: string;
	quantity: number;
	price: number;
	currency: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const AnimatedCheck = () => (
	<div className="relative">
		<div className="size-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
			<Check className="size-12 text-primary-foreground" strokeWidth={3} />
		</div>
		<div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight text-center">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-center max-w-md text-sm @md:text-base">
		{text}
	</p>
);

const OrderTimeline = ({ steps }: { steps: TimelineStep[] }) => (
	<div className="w-full max-w-md">
		<div className="relative flex justify-between">
			{steps.map((step, i) => (
				<div key={i} className="flex flex-col items-center gap-2 flex-1">
					<div
						className={`size-10 rounded-full flex items-center justify-center border-2 transition-colors ${
							step.completed
								? 'bg-primary border-primary text-primary-foreground'
								: step.current
									? 'border-primary text-primary bg-primary/10'
									: 'border-muted-foreground/30 text-muted-foreground'
						}`}
					>
						{step.completed ? (
							<Check className="size-5" />
						) : (
							<step.icon className="size-5" />
						)}
					</div>
					<div className="text-center">
						<p
							className={`text-xs font-medium ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}
						>
							{step.label}
						</p>
					</div>
				</div>
			))}
			<div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
				<div className="h-full bg-primary" style={{ width: '25%' }} />
			</div>
		</div>
	</div>
);

const OrderItem = ({
	name,
	variant,
	quantity,
	price,
	currency,
}: OrderItemProps) => (
	<div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
		<div className="size-14 rounded-lg bg-muted flex items-center justify-center">
			<Package className="size-7 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{name}</p>
			<p className="text-sm text-muted-foreground">
				{variant} · Qty: {quantity}
			</p>
		</div>
		<p className="font-semibold">
			{currency}
			{price.toFixed(2)}
		</p>
	</div>
);

const DeliveryEstimate = ({ date, time }: { date: string; time: string }) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
					<Truck className="size-6 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-sm text-muted-foreground">Estimated Delivery</p>
					<p className="font-semibold text-lg">{date}</p>
				</div>
				<Badge variant="secondary" className="gap-1">
					<Clock className="size-3" />
					{time}
				</Badge>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const timelineSteps: TimelineStep[] = [
		{
			icon: Check,
			label: 'Ordered',
			description: 'Order placed',
			completed: true,
			current: false,
		},
		{
			icon: Package,
			label: 'Processing',
			description: 'Preparing order',
			completed: false,
			current: true,
		},
		{
			icon: Truck,
			label: 'Shipped',
			description: 'On the way',
			completed: false,
			current: false,
		},
		{
			icon: Home,
			label: 'Delivered',
			description: 'At doorstep',
			completed: false,
			current: false,
		},
	];

	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-8">
					<AnimatedCheck />

					<div className="space-y-3 text-center">
						<Title text="Order Successfully Placed!" />
						<Description text="Thank you for shopping with us. Your order #ORD-2024-78432 has been confirmed." />
					</div>

					<OrderTimeline steps={timelineSteps} />

					<div className="w-full space-y-4">
						<h3 className="font-semibold">Order Items</h3>
						<div className="space-y-3">
							<OrderItem
								name="Premium Wireless Earbuds"
								variant="Midnight Black"
								quantity={1}
								price={199.99}
								currency="$"
							/>
							<OrderItem
								name="Protective Carrying Case"
								variant="Gray"
								quantity={1}
								price={29.99}
								currency="$"
							/>
						</div>
					</div>

					<DeliveryEstimate date="January 22-24, 2024" time="2-4 days" />

					<CTA
						items={[
							{
								label: 'Track Order',
								href: '/orders/track',
								icon: ArrowRight,
							},
							{
								label: 'Continue Shopping',
								href: '/shop',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
