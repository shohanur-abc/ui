import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle2,
	Package,
	Truck,
	Home,
	ArrowRight,
	Clock,
	Calendar,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	date?: string;
	status: 'completed' | 'current' | 'upcoming';
	isLast?: boolean;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessHeader = ({
	orderNumber,
	estimatedDelivery,
}: {
	orderNumber: string;
	estimatedDelivery: string;
}) => (
	<div className="text-center space-y-4">
		<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
			<CheckCircle2 className="size-5" />
			<span className="font-medium">Order Confirmed</span>
		</div>
		<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
			Your Order is on the Way!
		</h1>
		<div className="flex flex-col @sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
			<span>Order #{orderNumber}</span>
			<Separator orientation="vertical" className="h-4 hidden @sm:block" />
			<div className="flex items-center gap-1">
				<Calendar className="size-4" />
				<span>Arrives {estimatedDelivery}</span>
			</div>
		</div>
	</div>
);

const DeliveryProgress = ({
	progress,
	status,
}: {
	progress: number;
	status: string;
}) => (
	<div className="space-y-4 p-6 rounded-2xl bg-muted/30">
		<div className="flex items-center justify-between">
			<span className="font-medium">Delivery Progress</span>
			<Badge variant="secondary">{status}</Badge>
		</div>
		<Progress value={progress} className="h-3" />
		<div className="flex justify-between text-xs text-muted-foreground">
			<span>Ordered</span>
			<span>Processing</span>
			<span>Shipped</span>
			<span>Delivered</span>
		</div>
	</div>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	date,
	status,
	isLast,
}: TimelineStepProps) => (
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
		<div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
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
			{date && (
				<div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
					<Clock className="size-3" />
					<span>{date}</span>
				</div>
			)}
		</div>
	</div>
);

const TrackingTimeline = ({ steps }: { steps: TimelineStepProps[] }) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">Tracking Timeline</h2>
		<div>
			{steps.map((step, i) => (
				<TimelineStep key={i} {...step} isLast={i === steps.length - 1} />
			))}
		</div>
	</div>
);

const TrackingNumber = ({
	carrier,
	trackingNumber,
}: {
	carrier: string;
	trackingNumber: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
		<div>
			<p className="text-sm text-muted-foreground">Tracking Number</p>
			<p className="font-mono font-medium">{trackingNumber}</p>
		</div>
		<Badge variant="outline">{carrier}</Badge>
	</div>
);

const DeliveryAddress = ({
	name,
	address,
	city,
}: {
	name: string;
	address: string;
	city: string;
}) => (
	<div className="space-y-3">
		<h2 className="font-semibold text-lg">Delivery Address</h2>
		<div className="p-4 rounded-xl bg-muted/50 flex items-start gap-3">
			<Home className="size-5 text-muted-foreground mt-0.5" />
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{address}</p>
				<p className="text-sm text-muted-foreground">{city}</p>
			</div>
		</div>
	</div>
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
	const timelineSteps: TimelineStepProps[] = [
		{
			icon: CheckCircle2,
			title: 'Order Confirmed',
			description: 'Your order has been received and confirmed',
			date: 'Jan 15, 2024 at 2:34 PM',
			status: 'completed',
		},
		{
			icon: Package,
			title: 'Processing',
			description: 'Your items are being prepared for shipment',
			date: 'Jan 15, 2024 at 4:12 PM',
			status: 'completed',
		},
		{
			icon: Truck,
			title: 'Shipped',
			description: 'Your package is on its way',
			status: 'current',
		},
		{
			icon: Home,
			title: 'Delivered',
			description: 'Package will be delivered to your address',
			status: 'upcoming',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<SuccessHeader
					orderNumber="ORD-2024-78432"
					estimatedDelivery="Jan 18-20"
				/>

				<DeliveryProgress progress={60} status="In Transit" />

				<Separator />

				<TrackingTimeline steps={timelineSteps} />

				<TrackingNumber carrier="FedEx" trackingNumber="1Z999AA10123456784" />

				<DeliveryAddress
					name="John Doe"
					address="123 Main Street, Apt 4B"
					city="New York, NY 10001"
				/>

				<CTA
					items={[
						{ label: 'Track Package', href: '/track', icon: ArrowRight },
						{
							label: 'View Order Details',
							href: '/orders',
							variant: 'outline',
						},
					]}
				/>
			</div>
		</section>
	);
}
