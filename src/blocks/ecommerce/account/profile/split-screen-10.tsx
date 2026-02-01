import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle,
	Circle,
	Clock,
	Download,
	ExternalLink,
	FileText,
	MapPin,
	Package,
	RotateCcw,
	Star,
	Truck,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const OrderHeader = ({
	orderId,
	orderDate,
	status,
	statusColor,
}: {
	orderId: string;
	orderDate: string;
	status: string;
	statusColor: string;
}) => (
	<div className="flex flex-col @sm:flex-row @sm:items-center justify-between gap-4">
		<div>
			<h2 className="text-lg font-semibold">Order #{orderId}</h2>
			<p className="text-sm text-muted-foreground">Placed on {orderDate}</p>
		</div>
		<Badge className={`${statusColor} text-sm px-3 py-1`}>{status}</Badge>
	</div>
);

const TrackingTimeline = ({
	steps,
}: {
	steps: {
		title: string;
		description: string;
		date: string;
		completed: boolean;
		current: boolean;
	}[];
}) => (
	<div className="space-y-4">
		<h3 className="font-medium">Tracking</h3>
		<div className="relative">
			{steps.map((step, i) => (
				<div key={i} className="flex gap-4 pb-6 last:pb-0">
					<div className="flex flex-col items-center">
						{step.completed ? (
							<CheckCircle className="size-6 text-primary fill-primary/20" />
						) : step.current ? (
							<div className="size-6 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
								<div className="size-2 rounded-full bg-primary animate-pulse" />
							</div>
						) : (
							<Circle className="size-6 text-muted-foreground" />
						)}
						{i < steps.length - 1 && (
							<div
								className={`w-0.5 flex-1 mt-2 ${step.completed ? 'bg-primary' : 'bg-border'}`}
							/>
						)}
					</div>
					<div className="flex-1 pb-2">
						<p
							className={`font-medium ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}
						>
							{step.title}
						</p>
						<p className="text-sm text-muted-foreground">{step.description}</p>
						{step.date && (
							<p className="text-xs text-muted-foreground mt-1">{step.date}</p>
						)}
					</div>
				</div>
			))}
		</div>
	</div>
);

const OrderItems = ({
	items,
}: {
	items: {
		image: string;
		name: string;
		variant: string;
		quantity: number;
		price: string;
	}[];
}) => (
	<div className="space-y-4">
		<h3 className="font-medium">Items</h3>
		<div className="space-y-3">
			{items.map((item, i) => (
				<div key={i} className="flex gap-4 p-3 rounded-lg bg-muted/30">
					<div className="size-16 relative rounded-lg overflow-hidden bg-muted shrink-0">
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-sm truncate">{item.name}</p>
						<p className="text-xs text-muted-foreground">{item.variant}</p>
						<p className="text-xs text-muted-foreground">
							Qty: {item.quantity}
						</p>
					</div>
					<p className="font-medium text-sm">{item.price}</p>
				</div>
			))}
		</div>
	</div>
);

const ShippingAddress = ({
	name,
	address,
	city,
	phone,
}: {
	name: string;
	address: string;
	city: string;
	phone: string;
}) => (
	<div className="p-4 rounded-lg bg-muted/30 space-y-2">
		<div className="flex items-center gap-2">
			<MapPin className="size-4 text-muted-foreground" />
			<h3 className="font-medium">Shipping Address</h3>
		</div>
		<div className="text-sm text-muted-foreground space-y-1">
			<p className="font-medium text-foreground">{name}</p>
			<p>{address}</p>
			<p>{city}</p>
			<p>{phone}</p>
		</div>
	</div>
);

const OrderSummary = ({
	subtotal,
	shipping,
	discount,
	total,
}: {
	subtotal: string;
	shipping: string;
	discount?: string;
	total: string;
}) => (
	<div className="p-4 rounded-lg bg-muted/30 space-y-2">
		<h3 className="font-medium mb-3">Order Summary</h3>
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>{subtotal}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Shipping</span>
				<span>{shipping}</span>
			</div>
			{discount && (
				<div className="flex justify-between text-green-600">
					<span>Discount</span>
					<span>-{discount}</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between font-semibold text-base">
				<span>Total</span>
				<span>{total}</span>
			</div>
		</div>
	</div>
);

const OrderActions = ({
	items,
}: {
	items: {
		icon: React.ElementType;
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}) => (
	<div className="flex flex-wrap gap-2">
		{items.map((action, i) => (
			<Button
				key={i}
				variant={action.variant || 'outline'}
				size="sm"
				className="gap-2"
				asChild
			>
				<Link href={action.href}>
					<action.icon className="size-4" />
					{action.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const orderData = {
		header: {
			orderId: 'ORD-48291',
			orderDate: 'January 28, 2026',
			status: 'In Transit',
			statusColor: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
		},
		tracking: [
			{
				title: 'Order Placed',
				description: 'Your order has been confirmed',
				date: 'Jan 28, 10:30 AM',
				completed: true,
				current: false,
			},
			{
				title: 'Processing',
				description: 'Preparing your items',
				date: 'Jan 28, 2:15 PM',
				completed: true,
				current: false,
			},
			{
				title: 'Shipped',
				description: 'Package picked up by carrier',
				date: 'Jan 29, 9:00 AM',
				completed: true,
				current: false,
			},
			{
				title: 'In Transit',
				description: 'On the way to your address',
				date: 'Jan 30, 11:45 AM',
				completed: false,
				current: true,
			},
			{
				title: 'Delivered',
				description: 'Package will be delivered',
				date: 'Expected Feb 1',
				completed: false,
				current: false,
			},
		],
		items: [
			{
				image:
					'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
				name: 'Premium Smart Watch',
				variant: 'Black / 44mm',
				quantity: 1,
				price: '$299.00',
			},
			{
				image:
					'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200',
				name: 'Wireless Earbuds Pro',
				variant: 'White',
				quantity: 1,
				price: '$149.00',
			},
		],
		shipping: {
			name: 'Alex Thompson',
			address: '456 Oak Avenue, Apt 12',
			city: 'San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
		},
		summary: {
			subtotal: '$448.00',
			shipping: 'Free',
			discount: '$44.80',
			total: '$403.20',
		},
		actions: [
			{
				icon: Truck,
				label: 'Track Package',
				href: '/tracking/48291',
				variant: 'default' as const,
			},
			{ icon: RotateCcw, label: 'Return Items', href: '/returns/new' },
			{ icon: FileText, label: 'Invoice', href: '/invoices/48291' },
			{ icon: Star, label: 'Review', href: '/reviews/new' },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader>
						<OrderHeader {...orderData.header} />
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid @lg:grid-cols-[1fr_320px] gap-6">
							<div className="space-y-6">
								<TrackingTimeline steps={orderData.tracking} />
								<Separator />
								<OrderItems items={orderData.items} />
							</div>
							<div className="space-y-4">
								<ShippingAddress {...orderData.shipping} />
								<OrderSummary {...orderData.summary} />
								<OrderActions items={orderData.actions} />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
