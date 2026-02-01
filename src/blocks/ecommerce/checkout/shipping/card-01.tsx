import { Truck, Zap, Package, Clock, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ShippingCard = ({
	value,
	icon: Icon,
	name,
	description,
	time,
	price,
	popular,
	features,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	description: string;
	time: string;
	price: string;
	popular?: boolean;
	features: string[];
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				relative h-full transition-all hover:border-primary/50 hover:shadow-lg
				has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/20 has-[:checked]:bg-primary/5
			`}
		>
			{popular && (
				<Badge className="absolute -top-2.5 right-4">Most Popular</Badge>
			)}
			<CardHeader className="pb-2">
				<div className="flex items-start justify-between">
					<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Icon className="size-6" />
					</div>
					<RadioGroupItem value={value} id={value} />
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<h3 className="font-semibold text-lg">{name}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>

				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Clock className="size-4" />
					<span>{time}</span>
				</div>

				<ul className="space-y-2">
					{features.map((feature, i) => (
						<li key={i} className="flex items-center gap-2 text-sm">
							<Check className="size-4 text-primary" />
							<span>{feature}</span>
						</li>
					))}
				</ul>

				<div className="pt-2 border-t">
					<span className="text-2xl font-bold text-primary">{price}</span>
				</div>
			</CardContent>
		</Card>
	</Label>
);

const ActionButtons = ({
	backLabel,
	continueLabel,
}: {
	backLabel: string;
	continueLabel: string;
}) => (
	<div className="flex flex-col @sm:flex-row gap-3 pt-8">
		<Button variant="outline" className="flex-1">
			{backLabel}
		</Button>
		<Button className="flex-1">{continueLabel}</Button>
	</div>
);

export default function Main() {
	const shippingOptions = [
		{
			value: 'standard',
			icon: Package,
			name: 'Standard',
			description: 'Regular delivery speed',
			time: '5-7 business days',
			price: '$5.99',
			features: [
				'Package tracking',
				'Delivery confirmation',
				'Standard packaging',
			],
		},
		{
			value: 'express',
			icon: Truck,
			name: 'Express',
			description: 'Fast and reliable',
			time: '2-3 business days',
			price: '$12.99',
			popular: true,
			features: [
				'Priority handling',
				'Real-time tracking',
				'Signature on delivery',
			],
		},
		{
			value: 'overnight',
			icon: Zap,
			name: 'Overnight',
			description: 'Fastest option available',
			time: 'Next business day',
			price: '$24.99',
			features: [
				'Next-day guarantee',
				'Premium packaging',
				'Insurance included',
			],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Choose Shipping Method
					</h1>
					<p className="text-muted-foreground">
						Select how fast you want your order delivered
					</p>
				</div>

				<RadioGroup
					defaultValue="express"
					className="grid @md:grid-cols-3 gap-6"
				>
					{shippingOptions.map((option) => (
						<ShippingCard key={option.value} {...option} />
					))}
				</RadioGroup>

				<ActionButtons
					backLabel="Back to Cart"
					continueLabel="Continue to Payment"
				/>
			</div>
		</section>
	);
}
