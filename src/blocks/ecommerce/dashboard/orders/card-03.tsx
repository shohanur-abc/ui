import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Package,
	Truck,
	CheckCircle2,
	MapPin,
	Calendar,
	ArrowRight,
	Clock,
} from 'lucide-react';

interface TrackingStep {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	date: string;
	completed: boolean;
	current?: boolean;
}

interface OrderTrackingCardProps {
	order: {
		id: string;
		trackingNumber: string;
		carrier: string;
		estimatedDelivery: string;
		currentLocation: string;
		progress: number;
	};
	steps: TrackingStep[];
	labels: {
		tracking: string;
		carrier: string;
		location: string;
		delivery: string;
		viewFullTracking: string;
	};
}

interface TrackingStepItemProps {
	step: TrackingStep;
	isLast: boolean;
}

const TrackingStepItem = ({ step, isLast }: TrackingStepItemProps) => (
	<div className="flex gap-3">
		<div className="flex flex-col items-center">
			<div
				className={`size-8 rounded-full flex items-center justify-center ${
					step.completed
						? 'bg-primary text-primary-foreground'
						: step.current
							? 'bg-primary/20 text-primary border-2 border-primary'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<step.icon className="size-4" />
			</div>
			{!isLast && (
				<div
					className={`w-0.5 h-8 ${step.completed ? 'bg-primary' : 'bg-border'}`}
				/>
			)}
		</div>
		<div className="pb-4">
			<p
				className={`font-medium ${step.current ? 'text-primary' : step.completed ? '' : 'text-muted-foreground'}`}
			>
				{step.label}
			</p>
			<p className="text-xs text-muted-foreground">{step.date}</p>
		</div>
	</div>
);

const InfoBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const OrderTrackingCard = ({
	order,
	steps,
	labels,
}: OrderTrackingCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
		<div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 border-b border-border/50">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{labels.tracking}</p>
					<p className="font-mono font-semibold">{order.trackingNumber}</p>
				</div>
				<Badge variant="secondary" className="gap-1.5">
					<Truck className="size-3" />
					{order.carrier}
				</Badge>
			</div>
		</div>
		<CardContent className="p-4 space-y-4">
			<div className="flex items-center justify-between text-sm">
				<InfoBadge icon={MapPin} text={order.currentLocation} />
				<InfoBadge icon={Calendar} text={order.estimatedDelivery} />
			</div>

			<div>
				<div className="flex items-center justify-between text-sm mb-2">
					<span className="text-muted-foreground">Delivery Progress</span>
					<span className="font-semibold">{order.progress}%</span>
				</div>
				<Progress value={order.progress} className="h-2" />
			</div>

			<Separator />

			<div className="space-y-0">
				{steps.map((step, i) => (
					<TrackingStepItem
						key={i}
						step={step}
						isLast={i === steps.length - 1}
					/>
				))}
			</div>

			<Button variant="outline" className="w-full gap-1.5">
				{labels.viewFullTracking}
				<ArrowRight className="size-4" />
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const labels = {
		tracking: 'Tracking Number',
		carrier: 'Carrier',
		location: 'Current Location',
		delivery: 'Est. Delivery',
		viewFullTracking: 'View Full Tracking',
	};

	const order = {
		id: 'ORD-2024-001',
		trackingNumber: '1Z999AA10123456784',
		carrier: 'UPS Express',
		estimatedDelivery: 'Jan 30, 2026',
		currentLocation: 'Chicago, IL',
		progress: 65,
	};

	const steps: TrackingStep[] = [
		{
			icon: Package,
			label: 'Order Placed',
			date: 'Jan 25, 2026 • 10:30 AM',
			completed: true,
		},
		{
			icon: CheckCircle2,
			label: 'Order Confirmed',
			date: 'Jan 25, 2026 • 11:00 AM',
			completed: true,
		},
		{
			icon: Truck,
			label: 'In Transit',
			date: 'Jan 27, 2026 • 2:30 PM',
			completed: true,
			current: true,
		},
		{
			icon: MapPin,
			label: 'Out for Delivery',
			date: 'Pending',
			completed: false,
		},
		{
			icon: CheckCircle2,
			label: 'Delivered',
			date: 'Est. Jan 30, 2026',
			completed: false,
		},
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<OrderTrackingCard order={order} steps={steps} labels={labels} />
			</div>
		</section>
	);
}
