import { Truck, MapPin, Clock, CreditCard, Package, Check, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
		className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<div className="flex items-center gap-3">
			<RadioGroupItem value={value} id={value} />
			<div>
				<span className="font-medium">{name}</span>
				<div className="flex items-center gap-1 text-sm text-muted-foreground">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>
			</div>
		</div>
		<span className="font-bold text-primary">{price}</span>
	</Label>
);

const StepHeader = ({
	step,
	title,
	subtitle,
	icon: Icon,
	completed,
}: {
	step: number;
	title: string;
	subtitle?: string;
	icon: React.ComponentType<{ className?: string }>;
	completed?: boolean;
}) => (
	<div className="flex items-center gap-4">
		<div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${completed ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
			{completed ? <Check className="size-5" /> : <Icon className="size-5" />}
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Step {step}</span>
				{completed && <Badge variant="secondary" className="text-xs">Completed</Badge>}
			</div>
			<h3 className="font-semibold">{title}</h3>
			{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
		</div>
	</div>
);

export default function Main() {
	const shippingOptions = [
		{ value: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: '$5.99' },
		{ value: 'express', name: 'Express Shipping', time: '2-3 business days', price: '$12.99' },
		{ value: 'overnight', name: 'Overnight Shipping', time: 'Next business day', price: '$24.99' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">Checkout</h1>
					<p className="text-muted-foreground">Complete your order in a few steps</p>
				</div>

				<Accordion type="single" defaultValue="shipping" className="space-y-4">
					<AccordionItem value="address" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<StepHeader step={1} title="Shipping Address" subtitle="123 Main St, New York, NY" icon={MapPin} completed />
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<div className="grid gap-4">
								<div className="grid @sm:grid-cols-2 gap-4">
									<div>
										<Label>First Name</Label>
										<Input defaultValue="John" />
									</div>
									<div>
										<Label>Last Name</Label>
										<Input defaultValue="Doe" />
									</div>
								</div>
								<div>
									<Label>Address</Label>
									<Input defaultValue="123 Main Street, Apt 4B" />
								</div>
								<div className="grid @sm:grid-cols-3 gap-4">
									<div>
										<Label>City</Label>
										<Input defaultValue="New York" />
									</div>
									<div>
										<Label>State</Label>
										<Input defaultValue="NY" />
									</div>
									<div>
										<Label>ZIP</Label>
										<Input defaultValue="10001" />
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="shipping" className="border rounded-xl px-4">
						<AccordionTrigger className="hover:no-underline py-4">
							<StepHeader step={2} title="Shipping Method" icon={Truck} />
						</AccordionTrigger>
						<AccordionContent className="pb-4">
							<RadioGroup defaultValue="express" className="space-y-3">
								{shippingOptions.map((option) => (
									<ShippingOption key={option.value} {...option} />
								))}
							</RadioGroup>
							<Button className="w-full mt-4">Continue to Payment</Button>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="payment" className="border rounded-xl px-4" disabled>
						<AccordionTrigger className="hover:no-underline py-4 opacity-50">
							<StepHeader step={3} title="Payment" icon={CreditCard} />
						</AccordionTrigger>
					</AccordionItem>

					<AccordionItem value="review" className="border rounded-xl px-4" disabled>
						<AccordionTrigger className="hover:no-underline py-4 opacity-50">
							<StepHeader step={4} title="Review Order" icon={Package} />
						</AccordionTrigger>
					</AccordionItem>
				</Accordion>
			</div>
		</section>
	);
}
