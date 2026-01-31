import { Check, Circle, MapPin, Truck, CreditCard, Gift, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const TimelineStepper = ({
	steps,
	currentStep,
}: {
	steps: { icon: React.ComponentType<{ className?: string }>; label: string; description: string }[];
	currentStep: number;
}) => (
	<div className="relative">
		<div className="absolute left-5 top-5 bottom-5 w-0.5 bg-muted" />
		<div
			className="absolute left-5 top-5 w-0.5 bg-primary transition-all"
			style={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
		/>
		<div className="space-y-6 relative">
			{steps.map((step, i) => {
				const Icon = step.icon;
				const isCompleted = i < currentStep;
				const isCurrent = i === currentStep;

				return (
					<div key={step.label} className="flex gap-4">
						<div
							className={`
								flex size-10 shrink-0 items-center justify-center rounded-full z-10
								${isCompleted ? 'bg-primary text-primary-foreground' : ''}
								${isCurrent ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
								${!isCompleted && !isCurrent ? 'bg-muted text-muted-foreground' : ''}
							`}
						>
							{isCompleted ? <Check className="size-5" /> : <Icon className="size-5" />}
						</div>
						<div className="flex-1 pt-1.5">
							<p className={`font-medium ${!isCompleted && !isCurrent ? 'text-muted-foreground' : ''}`}>
								{step.label}
							</p>
							<p className="text-sm text-muted-foreground">{step.description}</p>
						</div>
					</div>
				);
			})}
		</div>
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const CountrySelect = ({
	label,
	placeholder,
}: {
	label: string;
	placeholder: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select>
			<SelectTrigger className="h-11">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="us">United States</SelectItem>
				<SelectItem value="ca">Canada</SelectItem>
				<SelectItem value="uk">United Kingdom</SelectItem>
				<SelectItem value="au">Australia</SelectItem>
			</SelectContent>
		</Select>
	</div>
);

export default function Main() {
	const steps = [
		{ icon: MapPin, label: 'Shipping Address', description: 'Enter delivery details' },
		{ icon: Truck, label: 'Delivery Method', description: 'Choose shipping speed' },
		{ icon: CreditCard, label: 'Payment', description: 'Complete your purchase' },
		{ icon: Gift, label: 'Confirmation', description: 'Order summary' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-[300px_1fr] gap-8">
					<div className="hidden @lg:block">
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Checkout Progress</CardTitle>
							</CardHeader>
							<CardContent>
								<TimelineStepper steps={steps} currentStep={0} />
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<MapPin className="size-5" />
								</div>
								<div>
									<CardTitle>Shipping Address</CardTitle>
									<p className="text-sm text-muted-foreground">Enter your delivery information</p>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid @sm:grid-cols-2 gap-4">
								<FormField label="First Name" placeholder="John" />
								<FormField label="Last Name" placeholder="Doe" />
							</div>

							<FormField label="Email Address" placeholder="john@example.com" type="email" />
							<FormField label="Phone Number" placeholder="+1 (555) 123-4567" type="tel" />

							<Separator />

							<FormField label="Street Address" placeholder="123 Main Street" />
							<FormField label="Apartment, Suite, etc." placeholder="Apt 4B (optional)" />

							<div className="grid @sm:grid-cols-3 gap-4">
								<FormField label="City" placeholder="New York" />
								<FormField label="State" placeholder="NY" />
								<FormField label="ZIP Code" placeholder="10001" />
							</div>

							<CountrySelect label="Country" placeholder="Select country" />

							<Separator />

							<div className="flex gap-3">
								<Button variant="outline" className="flex-1">Back to Cart</Button>
								<Button className="flex-1 gap-2">
									Continue
									<ChevronRight className="size-4" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
