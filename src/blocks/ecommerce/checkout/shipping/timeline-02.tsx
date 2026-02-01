import { Check, MapPin, Truck, CreditCard, Package, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const HorizontalTimelineStep = ({
	step,
	title,
	icon: Icon,
	status,
}: {
	step: number;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	status: 'completed' | 'current' | 'upcoming';
}) => (
	<div className="flex flex-col items-center flex-1">
		<div
			className={`
				flex size-12 shrink-0 items-center justify-center rounded-full border-2 mb-2 transition-colors
				${status === 'completed' ? 'bg-primary border-primary text-primary-foreground' : ''}
				${status === 'current' ? 'border-primary bg-primary/10 text-primary ring-4 ring-primary/20' : ''}
				${status === 'upcoming' ? 'border-muted bg-background text-muted-foreground' : ''}
			`}
		>
			{status === 'completed' ? (
				<Check className="size-6" />
			) : (
				<Icon className="size-6" />
			)}
		</div>
		<span
			className={`text-sm font-medium text-center ${status === 'upcoming' ? 'text-muted-foreground' : ''}`}
		>
			{title}
		</span>
	</div>
);

const ProgressConnector = ({ completed }: { completed: boolean }) => (
	<div
		className={`h-0.5 flex-1 mx-2 mt-6 ${completed ? 'bg-primary' : 'bg-muted'}`}
	/>
);

const ShippingCard = ({
	value,
	name,
	time,
	price,
	features,
	recommended,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
	features: string[];
	recommended?: boolean;
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className={`
				relative transition-all hover:shadow-lg hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
				${recommended ? 'ring-2 ring-primary/30' : ''}
			`}
		>
			{recommended && (
				<Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">
					Recommended
				</Badge>
			)}
			<CardContent className="p-4 text-center">
				<RadioGroupItem value={value} id={value} className="sr-only" />
				<h3 className="font-bold text-lg mb-1">{name}</h3>
				<div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
				<span className="text-2xl font-bold text-primary block mb-3">
					{price}
				</span>
				<div className="space-y-1">
					{features.map((feature, i) => (
						<div
							key={i}
							className="flex items-center justify-center gap-1 text-sm text-muted-foreground"
						>
							<Check className="size-3.5 text-primary" />
							<span>{feature}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const steps = [
		{ step: 1, title: 'Address', icon: MapPin, status: 'completed' as const },
		{ step: 2, title: 'Shipping', icon: Truck, status: 'current' as const },
		{
			step: 3,
			title: 'Payment',
			icon: CreditCard,
			status: 'upcoming' as const,
		},
		{ step: 4, title: 'Confirm', icon: Package, status: 'upcoming' as const },
	];

	const options = [
		{
			value: 'standard',
			name: 'Standard',
			time: '5-7 days',
			price: '$5.99',
			features: ['Basic tracking', 'Email updates'],
		},
		{
			value: 'express',
			name: 'Express',
			time: '2-3 days',
			price: '$12.99',
			features: ['Real-time tracking', 'Priority handling'],
			recommended: true,
		},
		{
			value: 'overnight',
			name: 'Overnight',
			time: '1 day',
			price: '$24.99',
			features: ['Guaranteed delivery', 'Full insurance'],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Checkout</h1>
					<p className="text-muted-foreground">Step 2 of 4</p>
				</div>

				<div className="flex items-start justify-center mb-12 px-8">
					{steps.map((step, i) => (
						<div key={step.step} className="contents">
							<HorizontalTimelineStep {...step} />
							{i < steps.length - 1 && (
								<ProgressConnector completed={step.status === 'completed'} />
							)}
						</div>
					))}
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Truck className="size-5 text-primary" />
							Select Shipping Method
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RadioGroup
							defaultValue="express"
							className="grid @sm:grid-cols-3 gap-4"
						>
							{options.map((option) => (
								<ShippingCard key={option.value} {...option} />
							))}
						</RadioGroup>
					</CardContent>
				</Card>

				<div className="flex gap-3 justify-center">
					<Button variant="outline">Back to Address</Button>
					<Button>Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
