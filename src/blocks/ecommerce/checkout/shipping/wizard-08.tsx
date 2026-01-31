import { Check, MapPin, Truck, CreditCard, ShoppingBag, ArrowLeft, ArrowRight, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const TabStepper = ({
	steps,
	currentStep,
}: {
	steps: { icon: React.ComponentType<{ className?: string }>; label: string }[];
	currentStep: number;
}) => (
	<div className="flex border-b mb-8">
		{steps.map((step, i) => {
			const Icon = step.icon;
			const isCompleted = i < currentStep;
			const isCurrent = i === currentStep;

			return (
				<button
					key={step.label}
					className={`
						flex-1 flex items-center justify-center gap-2 py-4 px-2 relative
						${isCurrent ? 'text-primary border-b-2 border-primary' : ''}
						${isCompleted ? 'text-primary' : ''}
						${!isCompleted && !isCurrent ? 'text-muted-foreground' : ''}
					`}
				>
					<div
						className={`
							flex size-6 items-center justify-center rounded-full text-xs
							${isCompleted ? 'bg-primary text-primary-foreground' : ''}
							${isCurrent ? 'bg-primary text-primary-foreground' : ''}
							${!isCompleted && !isCurrent ? 'bg-muted' : ''}
						`}
					>
						{isCompleted ? <Check className="size-3" /> : i + 1}
					</div>
					<span className="hidden @sm:inline text-sm font-medium">{step.label}</span>
				</button>
			);
		})}
	</div>
);

const ShippingMethodCard = ({
	value,
	carrier,
	method,
	time,
	price,
	logo,
}: {
	value: string;
	carrier: string;
	method: string;
	time: string;
	price: string;
	logo?: string;
}) => (
	<Label htmlFor={value} className="cursor-pointer block">
		<Card
			className="transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
		>
			<CardContent className="p-4">
				<div className="flex items-center gap-4">
					<RadioGroupItem value={value} id={value} />
					<div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
						<Package className="size-6 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<span className="font-semibold">{carrier}</span>
							<span className="text-muted-foreground">•</span>
							<span className="text-sm text-muted-foreground">{method}</span>
						</div>
						<p className="text-sm text-muted-foreground">{time}</p>
					</div>
					<span className="font-bold text-primary text-lg">{price}</span>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const OrderItem = ({
	name,
	variant,
	quantity,
	price,
}: {
	name: string;
	variant: string;
	quantity: number;
	price: string;
}) => (
	<div className="flex items-center gap-3">
		<div className="size-16 rounded-lg bg-muted flex items-center justify-center">
			<ShoppingBag className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">{variant}</p>
			<p className="text-sm text-muted-foreground">Qty: {quantity}</p>
		</div>
		<span className="font-medium">{price}</span>
	</div>
);

export default function Main() {
	const steps = [
		{ icon: MapPin, label: 'Address' },
		{ icon: Truck, label: 'Shipping' },
		{ icon: CreditCard, label: 'Payment' },
	];

	const shippingMethods = [
		{ value: 'ups-ground', carrier: 'UPS', method: 'Ground', time: '5-7 business days', price: '$8.99' },
		{ value: 'fedex-express', carrier: 'FedEx', method: 'Express', time: '2-3 business days', price: '$15.99' },
		{ value: 'usps-priority', carrier: 'USPS', method: 'Priority', time: '3-4 business days', price: '$12.99' },
	];

	const orderItems = [
		{ name: 'Wireless Headphones', variant: 'Black / Over-Ear', quantity: 1, price: '$149.99' },
		{ name: 'Phone Case', variant: 'Clear / iPhone 14', quantity: 2, price: '$29.98' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<TabStepper steps={steps} currentStep={1} />

				<div className="grid @lg:grid-cols-[1fr_360px] gap-8">
					<div>
						<Card>
							<CardHeader>
								<CardTitle>Choose Shipping Method</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup defaultValue="fedex-express" className="space-y-3">
									{shippingMethods.map((method) => (
										<ShippingMethodCard key={method.value} {...method} />
									))}
								</RadioGroup>
							</CardContent>
						</Card>

						<div className="flex justify-between mt-8">
							<Button variant="ghost" className="gap-2">
								<ArrowLeft className="size-4" />
								Back
							</Button>
							<Button className="gap-2">
								Continue
								<ArrowRight className="size-4" />
							</Button>
						</div>
					</div>

					<Card className="h-fit">
						<CardHeader>
							<CardTitle className="text-base">Order Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4 mb-4">
								{orderItems.map((item, i) => (
									<OrderItem key={i} {...item} />
								))}
							</div>

							<Separator className="my-4" />

							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>$179.97</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span>$15.99</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Tax</span>
									<span>$17.64</span>
								</div>
							</div>

							<Separator className="my-4" />

							<div className="flex justify-between font-semibold text-lg">
								<span>Total</span>
								<span className="text-primary">$213.60</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
