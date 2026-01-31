import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	CheckCircle,
	Package,
	Truck,
	Clock,
	Mail,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	label: string;
	date: string;
	status: 'completed' | 'current' | 'upcoming';
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const SuccessHeader = ({
	orderNumber,
	email,
}: {
	orderNumber: string;
	email: string;
}) => (
	<Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-14 rounded-full bg-white/20 flex items-center justify-center">
					<CheckCircle className="size-7" />
				</div>
				<div>
					<h1 className="text-2xl font-bold">Thank You!</h1>
					<p className="opacity-90">Order #{orderNumber}</p>
				</div>
			</div>
			<div className="mt-4 p-3 rounded-lg bg-white/10 flex items-center gap-2">
				<Mail className="size-4 opacity-80" />
				<p className="text-sm">Confirmation sent to {email}</p>
			</div>
		</CardContent>
	</Card>
);

const TimelineCard = ({ steps }: { steps: TimelineStepProps[] }) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Clock className="size-4" />
				Order Timeline
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				{steps.map((step, i) => (
					<div key={i} className="flex items-center gap-3">
						<div
							className={`size-8 rounded-full flex items-center justify-center text-sm font-medium ${
								step.status === 'completed'
									? 'bg-primary text-primary-foreground'
									: step.status === 'current'
										? 'bg-primary/20 text-primary border-2 border-primary'
										: 'bg-muted text-muted-foreground'
							}`}
						>
							{step.status === 'completed' ? '✓' : i + 1}
						</div>
						<div className="flex-1">
							<p className={step.status === 'upcoming' ? 'text-muted-foreground' : 'font-medium'}>
								{step.label}
							</p>
						</div>
						<p className="text-sm text-muted-foreground">{step.date}</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const ProductGridItem = ({
	name,
	quantity,
	price,
}: {
	name: string;
	quantity: number;
	price: string;
}) => (
	<div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
		<div className="size-14 rounded-lg bg-muted flex items-center justify-center">
			<Package className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm truncate">{name}</p>
			<p className="text-xs text-muted-foreground">×{quantity}</p>
		</div>
		<p className="font-semibold text-sm">{price}</p>
	</div>
);

const ItemsCard = ({
	items,
	total,
}: {
	items: { name: string; quantity: number; price: string }[];
	total: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Package className="size-4" />
				Order Items
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{items.map((item, i) => (
				<ProductGridItem key={i} {...item} />
			))}
			<div className="flex justify-between pt-3 border-t font-semibold">
				<span>Total</span>
				<span>{total}</span>
			</div>
		</CardContent>
	</Card>
);

const ShippingCard = ({
	method,
	address,
	estimated,
}: {
	method: string;
	address: string[];
	estimated: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Truck className="size-4" />
				Shipping Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Method</span>
				<Badge variant="secondary">{method}</Badge>
			</div>
			<div>
				<p className="text-sm text-muted-foreground mb-1">Deliver to</p>
				{address.map((line, i) => (
					<p key={i} className={i === 0 ? 'font-medium' : 'text-sm text-muted-foreground'}>
						{line}
					</p>
				))}
			</div>
			<div className="p-3 rounded-lg bg-emerald-500/10">
				<p className="text-sm text-muted-foreground">Estimated Delivery</p>
				<p className="font-semibold text-emerald-600">{estimated}</p>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="flex-1" asChild>
				<Link href={href}>{label}</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const timelineSteps: TimelineStepProps[] = [
		{ label: 'Order Placed', date: 'Jan 15', status: 'completed' },
		{ label: 'Processing', date: 'Jan 15', status: 'current' },
		{ label: 'Shipped', date: 'Jan 16', status: 'upcoming' },
		{ label: 'Delivered', date: 'Jan 18-20', status: 'upcoming' },
	];

	const orderItems = [
		{ name: 'Wireless Headphones', quantity: 1, price: '$299.99' },
		{ name: 'USB-C Charger', quantity: 2, price: '$99.98' },
		{ name: 'Carrying Case', quantity: 1, price: '$39.99' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-6">
				<div className="grid @lg:grid-cols-2 gap-6">
					<SuccessHeader
						orderNumber="ORD-2024-78432"
						email="customer@example.com"
					/>
					<TimelineCard steps={timelineSteps} />
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<ItemsCard items={orderItems} total="$439.96" />
					<ShippingCard
						method="Express"
						address={['John Doe', '123 Main Street', 'New York, NY 10001']}
						estimated="Jan 18-20, 2024"
					/>
				</div>

				<CTA
					items={[
						{ label: 'Track My Order', href: '/track' },
						{ label: 'Continue Shopping', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
