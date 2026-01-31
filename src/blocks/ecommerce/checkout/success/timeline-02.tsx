import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	CheckCircle,
	Package,
	Truck,
	Home,
	MapPin,
	Phone,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	time: string;
	status: 'completed' | 'current' | 'upcoming';
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
	progress,
}: {
	orderNumber: string;
	progress: number;
}) => (
	<div className="space-y-6">
		<div className="text-center space-y-4">
			<div className="size-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
				<CheckCircle className="size-10 text-emerald-500" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-4xl font-bold">Order Confirmed!</h1>
				<p className="text-muted-foreground">Order #{orderNumber}</p>
			</div>
		</div>
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Order Progress</span>
				<span className="font-medium">{progress}%</span>
			</div>
			<Progress value={progress} className="h-2" />
		</div>
	</div>
);

const HorizontalTimeline = ({ steps }: { steps: TimelineStepProps[] }) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				{steps.map((step, i) => (
					<div key={i} className="flex-1 flex items-center">
						<div className="flex flex-col items-center text-center">
							<div
								className={`size-12 rounded-full flex items-center justify-center ${
									step.status === 'completed'
										? 'bg-emerald-500 text-white'
										: step.status === 'current'
											? 'bg-primary text-primary-foreground'
											: 'bg-muted text-muted-foreground'
								}`}
							>
								<step.icon className="size-5" />
							</div>
							<p
								className={`text-sm font-medium mt-2 ${
									step.status === 'upcoming' ? 'text-muted-foreground' : ''
								}`}
							>
								{step.title}
							</p>
							<p className="text-xs text-muted-foreground">{step.time}</p>
						</div>
						{i < steps.length - 1 && (
							<div
								className={`flex-1 h-0.5 mx-2 ${
									step.status === 'completed' ? 'bg-emerald-500' : 'bg-border'
								}`}
							/>
						)}
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const DeliveryCard = ({
	address,
	phone,
	carrier,
	tracking,
}: {
	address: string;
	phone: string;
	carrier: string;
	tracking: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4">Delivery Details</h3>
			<div className="grid @sm:grid-cols-2 gap-4">
				<div className="flex items-start gap-3">
					<MapPin className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm font-medium">Address</p>
						<p className="text-sm text-muted-foreground">{address}</p>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<Phone className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm font-medium">Phone</p>
						<p className="text-sm text-muted-foreground">{phone}</p>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<Truck className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm font-medium">Carrier</p>
						<p className="text-sm text-muted-foreground">{carrier}</p>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<Package className="size-5 text-muted-foreground mt-0.5" />
					<div>
						<p className="text-sm font-medium">Tracking</p>
						<p className="text-sm text-muted-foreground font-mono">{tracking}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
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
			icon: CheckCircle,
			title: 'Ordered',
			time: 'Jan 15',
			status: 'completed',
		},
		{
			icon: Package,
			title: 'Processing',
			time: 'Jan 15',
			status: 'current',
		},
		{
			icon: Truck,
			title: 'Shipped',
			time: 'Jan 16',
			status: 'upcoming',
		},
		{
			icon: Home,
			title: 'Delivered',
			time: 'Jan 18',
			status: 'upcoming',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="ORD-78432" progress={35} />

				<HorizontalTimeline steps={timelineSteps} />

				<DeliveryCard
					address="123 Main St, New York, NY 10001"
					phone="(555) 123-4567"
					carrier="FedEx Express"
					tracking="1Z9999W99999999999"
				/>

				<CTA
					items={[
						{ label: 'Track Package', href: '/track', icon: ArrowRight },
						{ label: 'View Order', href: '/order', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
