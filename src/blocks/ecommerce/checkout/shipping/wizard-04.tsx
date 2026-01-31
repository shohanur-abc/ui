import { ArrowLeft, ArrowRight, MapPin, Package, Truck, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const NumberedStep = ({
	number,
	label,
	status,
}: {
	number: number;
	label: string;
	status: 'completed' | 'current' | 'upcoming';
}) => (
	<div className="flex items-center gap-2">
		<div
			className={`
				flex size-8 items-center justify-center rounded-full text-sm font-bold
				${status === 'completed' ? 'bg-primary text-primary-foreground' : ''}
				${status === 'current' ? 'bg-primary text-primary-foreground' : ''}
				${status === 'upcoming' ? 'bg-muted text-muted-foreground' : ''}
			`}
		>
			{status === 'completed' ? <Check className="size-4" /> : number}
		</div>
		<span
			className={`
				text-sm font-medium hidden @sm:inline
				${status === 'upcoming' ? 'text-muted-foreground' : ''}
			`}
		>
			{label}
		</span>
	</div>
);

const StepperDivider = ({ completed }: { completed: boolean }) => (
	<div
		className={`
			flex-1 h-0.5 mx-2
			${completed ? 'bg-primary' : 'bg-muted'}
		`}
	/>
);

const DeliveryCard = ({
	value,
	icon: Icon,
	title,
	subtitle,
	time,
	price,
	badge,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
	time: string;
	price: string;
	badge?: string;
}) => (
	<Label htmlFor={value} className="cursor-pointer block h-full">
		<Card
			className={`
				h-full transition-all hover:shadow-lg hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-gradient-to-br has-[:checked]:from-primary/5 has-[:checked]:to-transparent
			`}
		>
			{badge && (
				<Badge className="absolute -top-2.5 left-4">{badge}</Badge>
			)}
			<CardContent className="p-6 h-full flex flex-col">
				<div className="flex items-start justify-between mb-4">
					<div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<Icon className="size-7" />
					</div>
					<RadioGroupItem value={value} id={value} />
				</div>
				<div className="flex-1">
					<h3 className="font-bold text-lg mb-1">{title}</h3>
					<p className="text-sm text-muted-foreground mb-3">{subtitle}</p>
					<p className="text-sm text-muted-foreground">{time}</p>
				</div>
				<div className="pt-4 border-t mt-4">
					<span className="text-2xl font-bold text-primary">{price}</span>
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const steps = [
		{ number: 1, label: 'Address', status: 'completed' as const },
		{ number: 2, label: 'Shipping', status: 'current' as const },
		{ number: 3, label: 'Payment', status: 'upcoming' as const },
		{ number: 4, label: 'Review', status: 'upcoming' as const },
	];

	const deliveryOptions = [
		{
			value: 'standard',
			icon: Package,
			title: 'Standard',
			subtitle: 'Ground shipping',
			time: '5-7 business days',
			price: 'Free',
		},
		{
			value: 'express',
			icon: Truck,
			title: 'Express',
			subtitle: 'Priority handling',
			time: '2-3 business days',
			price: '$14.99',
			badge: 'Popular',
		},
		{
			value: 'overnight',
			icon: MapPin,
			title: 'Overnight',
			subtitle: 'Next-day delivery',
			time: '1 business day',
			price: '$29.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center justify-center mb-12">
					{steps.map((step, i) => (
						<div key={step.number} className="flex items-center flex-1 last:flex-initial">
							<NumberedStep {...step} />
							{i < steps.length - 1 && (
								<StepperDivider completed={step.status === 'completed'} />
							)}
						</div>
					))}
				</div>

				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold mb-2">Choose Delivery Method</h1>
					<p className="text-muted-foreground">Select how you'd like your order shipped</p>
				</div>

				<RadioGroup defaultValue="express" className="grid @sm:grid-cols-3 gap-6 mb-10">
					{deliveryOptions.map((option) => (
						<DeliveryCard key={option.value} {...option} />
					))}
				</RadioGroup>

				<div className="flex items-center justify-between">
					<Button variant="ghost" className="gap-2">
						<ArrowLeft className="size-4" />
						Back to Address
					</Button>
					<Button className="gap-2">
						Continue to Payment
						<ArrowRight className="size-4" />
					</Button>
				</div>
			</div>
		</section>
	);
}
