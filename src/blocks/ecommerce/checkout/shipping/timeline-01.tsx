import {
	MapPin,
	Truck,
	CreditCard,
	Check,
	Package,
	ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const TimelineStep = ({
	step,
	title,
	description,
	icon: Icon,
	status,
	isLast,
}: {
	step: number;
	title: string;
	description?: string;
	icon: React.ComponentType<{ className?: string }>;
	status: 'completed' | 'current' | 'upcoming';
	isLast?: boolean;
}) => (
	<div className="flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`
					flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors
					${status === 'completed' ? 'bg-primary border-primary text-primary-foreground' : ''}
					${status === 'current' ? 'border-primary bg-primary/10 text-primary' : ''}
					${status === 'upcoming' ? 'border-muted bg-muted text-muted-foreground' : ''}
				`}
			>
				{status === 'completed' ? (
					<Check className="size-5" />
				) : (
					<Icon className="size-5" />
				)}
			</div>
			{!isLast && (
				<div
					className={`w-0.5 flex-1 my-2 ${status === 'completed' ? 'bg-primary' : 'bg-muted'}`}
				/>
			)}
		</div>
		<div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
			<div className="flex items-center gap-2">
				<h3
					className={`font-semibold ${status === 'upcoming' ? 'text-muted-foreground' : ''}`}
				>
					{title}
				</h3>
				{status === 'current' && <Badge>Current</Badge>}
				{status === 'completed' && <Badge variant="secondary">Done</Badge>}
			</div>
			{description && (
				<p className="text-sm text-muted-foreground mt-1">{description}</p>
			)}
		</div>
	</div>
);

const ShippingOption = ({
	value,
	name,
	time,
	price,
}: {
	value: string;
	name: string;
	time: string;
	price: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<div>
				<span className="font-medium">{name}</span>
				<p className="text-sm text-muted-foreground">{time}</p>
			</div>
		</div>
		<span className="text-lg font-bold text-primary">{price}</span>
	</Label>
);

export default function Main() {
	const steps = [
		{
			step: 1,
			title: 'Shipping Address',
			description: '123 Main St, New York, NY 10001',
			icon: MapPin,
			status: 'completed' as const,
		},
		{
			step: 2,
			title: 'Shipping Method',
			icon: Truck,
			status: 'current' as const,
		},
		{
			step: 3,
			title: 'Payment',
			icon: CreditCard,
			status: 'upcoming' as const,
		},
		{
			step: 4,
			title: 'Review & Confirm',
			icon: Package,
			status: 'upcoming' as const,
		},
	];

	const options = [
		{
			value: 'standard',
			name: 'Standard Shipping',
			time: '5-7 business days',
			price: '$5.99',
		},
		{
			value: 'express',
			name: 'Express Shipping',
			time: '2-3 business days',
			price: '$12.99',
		},
		{
			value: 'overnight',
			name: 'Overnight Shipping',
			time: 'Next business day',
			price: '$24.99',
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-10">Checkout</h1>

				<div className="grid @lg:grid-cols-[240px_1fr] gap-8">
					<div className="hidden @lg:block">
						{steps.map((step, i) => (
							<TimelineStep
								key={step.step}
								{...step}
								isLast={i === steps.length - 1}
							/>
						))}
					</div>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center gap-3 mb-6">
								<div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<Truck className="size-5" />
								</div>
								<div>
									<h2 className="text-xl font-bold">Shipping Method</h2>
									<p className="text-sm text-muted-foreground">
										Choose your delivery speed
									</p>
								</div>
							</div>

							<RadioGroup defaultValue="express" className="space-y-3 mb-6">
								{options.map((option) => (
									<ShippingOption key={option.value} {...option} />
								))}
							</RadioGroup>

							<div className="flex gap-3">
								<Button variant="outline" className="flex-1">
									Back
								</Button>
								<Button className="flex-1">
									Continue to Payment
									<ChevronRight className="size-5 ml-2" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
