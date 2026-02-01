import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Package,
	Truck,
	Home,
	Clock,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
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
	estimatedDate,
}: {
	orderNumber: string;
	estimatedDate: string;
}) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
			<CheckCircle className="size-10 text-emerald-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Order Confirmed!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
		<Badge variant="secondary" className="text-sm">
			Est. Delivery: {estimatedDate}
		</Badge>
	</div>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	time,
	status,
}: TimelineStepProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-8 flex-1">
			<div className="flex items-center justify-between">
				<h3
					className={`font-semibold ${
						status === 'upcoming' ? 'text-muted-foreground' : ''
					}`}
				>
					{title}
				</h3>
				<span className="text-sm text-muted-foreground">{time}</span>
			</div>
			<p className="text-sm text-muted-foreground mt-1">{description}</p>
		</div>
	</div>
);

const SummaryCard = ({
	items,
	total,
}: {
	items: { label: string; value: string }[];
	total: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4">Order Summary</h3>
			<div className="space-y-2">
				{items.map((item, i) => (
					<div key={i} className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">{item.label}</span>
						<span>{item.value}</span>
					</div>
				))}
				<div className="border-t pt-2 mt-2 flex items-center justify-between font-semibold">
					<span>Total</span>
					<span>{total}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
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
			icon: CheckCircle,
			title: 'Order Placed',
			description: 'Your order has been confirmed',
			time: 'Jan 15, 10:30 AM',
			status: 'completed',
		},
		{
			icon: Package,
			title: 'Processing',
			description: 'We are preparing your items',
			time: 'Jan 15, 11:00 AM',
			status: 'current',
		},
		{
			icon: Truck,
			title: 'Shipped',
			description: 'Your order is on the way',
			time: 'Expected Jan 16',
			status: 'upcoming',
		},
		{
			icon: Home,
			title: 'Delivered',
			description: 'Package delivered to your door',
			time: 'Expected Jan 18',
			status: 'upcoming',
		},
	];

	const summaryItems = [
		{ label: 'Subtotal', value: '$129.00' },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: '$10.32' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="ORD-78432" estimatedDate="Jan 18, 2024" />

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Order Progress</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<SummaryCard items={summaryItems} total="$139.32" />

				<CTA
					items={[
						{ label: 'Track Order', href: '/track', icon: ArrowRight },
						{ label: 'Continue Shopping', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
