import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
	CheckCircle2,
	Package,
	Truck,
	Home,
	MapPin,
	Clock,
	ArrowRight,
	Phone,
	ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	date?: string;
	time?: string;
	status: 'completed' | 'current' | 'upcoming';
	location?: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	orderNumber,
	carrier,
	tracking,
}: {
	orderNumber: string;
	carrier: string;
	tracking: string;
}) => (
	<div className="space-y-4">
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
				<Truck className="size-7 text-primary" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-3xl font-bold">Shipment Tracking</h1>
				<p className="text-muted-foreground">Order #{orderNumber}</p>
			</div>
		</div>
		<div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
			<div>
				<p className="text-sm text-muted-foreground">Carrier</p>
				<p className="font-medium">{carrier}</p>
			</div>
			<Separator orientation="vertical" className="h-10" />
			<div className="flex-1">
				<p className="text-sm text-muted-foreground">Tracking Number</p>
				<p className="font-mono font-medium">{tracking}</p>
			</div>
			<Button variant="outline" size="sm" className="gap-2">
				<ExternalLink className="size-4" />
				Track on {carrier}
			</Button>
		</div>
	</div>
);

const DeliveryProgress = ({
	progress,
	status,
	estimatedDelivery,
}: {
	progress: number;
	status: string;
	estimatedDelivery: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center justify-between mb-4">
				<div>
					<p className="font-medium">Delivery Status</p>
					<Badge variant="secondary" className="mt-1">
						{status}
					</Badge>
				</div>
				<div className="text-right">
					<p className="text-sm text-muted-foreground">Estimated Arrival</p>
					<p className="font-semibold text-primary">{estimatedDelivery}</p>
				</div>
			</div>
			<Progress value={progress} className="h-3" />
			<div className="flex justify-between text-xs text-muted-foreground mt-2">
				<span>Ordered</span>
				<span>Processing</span>
				<span>Shipped</span>
				<span>Out for Delivery</span>
				<span>Delivered</span>
			</div>
		</CardContent>
	</Card>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	date,
	time,
	status,
	location,
	isLast,
}: TimelineStepProps & { isLast?: boolean }) => (
	<div className="flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-primary text-primary-foreground'
						: status === 'current'
							? 'bg-primary/20 text-primary ring-2 ring-primary'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			{!isLast && (
				<div
					className={`w-0.5 flex-1 my-2 ${
						status === 'completed' ? 'bg-primary' : 'bg-muted'
					}`}
				/>
			)}
		</div>
		<div className={`pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
			<div className="flex items-start justify-between gap-4">
				<div>
					<div className="flex items-center gap-2">
						<p
							className={`font-medium ${status === 'upcoming' ? 'text-muted-foreground' : ''}`}
						>
							{title}
						</p>
						{status === 'current' && (
							<Badge variant="outline" className="text-xs">
								Current
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground mt-1">{description}</p>
					{location && (
						<div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
							<MapPin className="size-3" />
							<span>{location}</span>
						</div>
					)}
				</div>
				{date && (
					<div className="text-right text-sm shrink-0">
						<p className="font-medium">{date}</p>
						{time && <p className="text-muted-foreground">{time}</p>}
					</div>
				)}
			</div>
		</div>
	</div>
);

const TrackingTimeline = ({ steps }: { steps: TimelineStepProps[] }) => (
	<Card>
		<CardHeader>
			<CardTitle>Tracking History</CardTitle>
		</CardHeader>
		<CardContent>
			{steps.map((step, i) => (
				<TimelineStep key={i} {...step} isLast={i === steps.length - 1} />
			))}
		</CardContent>
	</Card>
);

const DeliveryAddressCard = ({
	name,
	address,
	city,
	instructions,
}: {
	name: string;
	address: string;
	city: string;
	instructions?: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Home className="size-4" />
				Delivery Address
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{address}</p>
				<p className="text-sm text-muted-foreground">{city}</p>
			</div>
			{instructions && (
				<div className="p-3 rounded-lg bg-muted/50">
					<p className="text-xs text-muted-foreground mb-1">
						Delivery Instructions
					</p>
					<p className="text-sm">{instructions}</p>
				</div>
			)}
		</CardContent>
	</Card>
);

const PackageContents = ({
	items,
}: {
	items: { name: string; quantity: number }[];
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Package className="size-4" />
				Package Contents
			</CardTitle>
		</CardHeader>
		<CardContent>
			<ul className="space-y-2">
				{items.map((item, i) => (
					<li key={i} className="flex items-center justify-between text-sm">
						<span>{item.name}</span>
						<Badge variant="outline">×{item.quantity}</Badge>
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const SupportCard = () => (
	<Card className="bg-muted/30">
		<CardContent className="pt-6">
			<div className="flex items-center gap-4">
				<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
					<Phone className="size-5 text-primary" />
				</div>
				<div className="flex-1">
					<p className="font-medium">Need Help?</p>
					<p className="text-sm text-muted-foreground">
						Contact our support team
					</p>
				</div>
				<Button variant="outline" size="sm">
					Get Help
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
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
	const trackingSteps: TimelineStepProps[] = [
		{
			icon: CheckCircle2,
			title: 'Order Placed',
			description: 'Your order has been received and confirmed',
			date: 'Jan 15',
			time: '2:34 PM',
			status: 'completed',
		},
		{
			icon: Package,
			title: 'Order Processed',
			description: 'Items picked and packed at warehouse',
			date: 'Jan 15',
			time: '5:12 PM',
			status: 'completed',
			location: 'Distribution Center, Newark NJ',
		},
		{
			icon: Truck,
			title: 'In Transit',
			description: 'Package is on its way to you',
			date: 'Jan 16',
			time: '9:45 AM',
			status: 'current',
			location: 'FedEx Facility, Philadelphia PA',
		},
		{
			icon: Truck,
			title: 'Out for Delivery',
			description: 'Package is with local courier',
			status: 'upcoming',
		},
		{
			icon: Home,
			title: 'Delivered',
			description: 'Package delivered to recipient',
			status: 'upcoming',
		},
	];

	const packageItems = [
		{ name: 'Wireless Headphones', quantity: 1 },
		{ name: 'USB-C Charger', quantity: 2 },
		{ name: 'Carrying Case', quantity: 1 },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					orderNumber="ORD-2024-78432"
					carrier="FedEx"
					tracking="1Z999AA10123456784"
				/>

				<DeliveryProgress
					progress={55}
					status="In Transit"
					estimatedDelivery="Jan 18-19, 2024"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2">
						<TrackingTimeline steps={trackingSteps} />
					</div>
					<div className="space-y-6">
						<DeliveryAddressCard
							name="John Doe"
							address="123 Main Street, Apt 4B"
							city="New York, NY 10001"
							instructions="Leave at door. Ring doorbell twice."
						/>
						<PackageContents items={packageItems} />
						<SupportCard />
					</div>
				</div>

				<CTA
					items={[
						{ label: 'Back to Order', href: '/orders', icon: ArrowRight },
						{ label: 'Continue Shopping', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
