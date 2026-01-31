import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
	Truck,
	Package,
	Clock,
	CheckCircle2,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type SummaryRowProps = {
	label: string;
	value: string;
};

type DeliveryStepProps = {
	icon: LucideIcon;
	label: string;
	status: 'completed' | 'current' | 'upcoming';
};

type ShippingInfoProps = {
	icon: LucideIcon;
	title: string;
	value: string;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => (
	<div className="flex items-center justify-between text-sm">
		<span className="text-muted-foreground">{label}</span>
		<span className="font-medium">{value}</span>
	</div>
);

const TotalRow = ({ label, value }: { label: string; value: string }) => (
	<div className="flex items-center justify-between">
		<span className="text-lg font-semibold">{label}</span>
		<span className="text-2xl font-bold text-primary">{value}</span>
	</div>
);

const DeliveryTimeline = ({ steps }: { steps: DeliveryStepProps[] }) => (
	<div className="space-y-4">
		<p className="text-sm font-medium">Delivery Timeline</p>
		<div className="relative flex justify-between">
			<div className="absolute top-4 left-0 right-0 h-0.5 bg-muted">
				<div className="h-full w-1/3 bg-primary" />
			</div>
			{steps.map(({ icon: Icon, label, status }, i) => (
				<div key={i} className="relative z-10 flex flex-col items-center gap-2">
					<div
						className={`flex size-8 items-center justify-center rounded-full ${
							status === 'completed'
								? 'bg-primary text-primary-foreground'
								: status === 'current'
									? 'border-2 border-primary bg-background'
									: 'border border-muted-foreground/30 bg-muted'
						}`}
					>
						<Icon className="size-4" />
					</div>
					<span className="text-xs text-muted-foreground">{label}</span>
				</div>
			))}
		</div>
	</div>
);

const ShippingInfo = ({ icon: Icon, title, value }: ShippingInfoProps) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<Icon className="size-5 text-primary" />
		<div>
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-sm font-medium">{value}</p>
		</div>
	</div>
);

export default function Main() {
	const summaryItems: SummaryRowProps[] = [
		{ label: 'Subtotal', value: '$329.00' },
		{ label: 'Express Shipping', value: '$24.99' },
		{ label: 'Tax', value: '$28.32' },
	];

	const deliverySteps: DeliveryStepProps[] = [
		{ icon: CheckCircle2, label: 'Order', status: 'completed' },
		{ icon: Package, label: 'Packed', status: 'current' },
		{ icon: Truck, label: 'Shipped', status: 'upcoming' },
		{ icon: CheckCircle2, label: 'Delivered', status: 'upcoming' },
	];

	const shippingDetails: ShippingInfoProps[] = [
		{ icon: Truck, title: 'Shipping Method', value: 'Express (2-3 days)' },
		{ icon: Clock, title: 'Estimated Delivery', value: 'Dec 28, 2025' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Shipping Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<DeliveryTimeline steps={deliverySteps} />
							<div className="grid gap-3 @sm:grid-cols-2">
								{shippingDetails.map((info, i) => (
									<ShippingInfo key={i} {...info} />
								))}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="border-b">
							<CardTitle>Order Total</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								{summaryItems.map((item, i) => (
									<SummaryRow key={i} {...item} />
								))}
							</div>
							<Separator />
							<TotalRow label="Total" value="$382.31" />
						</CardContent>
						<CardFooter className="border-t flex-col gap-2">
							<Button className="w-full" size="lg" asChild>
								<Link href="/checkout">Complete Order</Link>
							</Button>
							<Button variant="ghost" className="w-full" asChild>
								<Link href="/cart">Edit Cart</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
