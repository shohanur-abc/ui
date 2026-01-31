import { Circle, Check, MapPin, Truck, CreditCard, PartyPopper } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const VerticalStepper = ({
	steps,
	currentStep,
}: {
	steps: { icon: React.ComponentType<{ className?: string }>; label: string }[];
	currentStep: number;
}) => (
	<div className="space-y-1">
		{steps.map((step, i) => {
			const isCompleted = i < currentStep;
			const isCurrent = i === currentStep;
			const Icon = step.icon;

			return (
				<div key={step.label} className="flex gap-4">
					<div className="flex flex-col items-center">
						<div
							className={`
								flex size-10 items-center justify-center rounded-full transition-colors
								${isCompleted ? 'bg-primary text-primary-foreground' : ''}
								${isCurrent ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
								${!isCompleted && !isCurrent ? 'bg-muted text-muted-foreground' : ''}
							`}
						>
							{isCompleted ? <Check className="size-5" /> : <Icon className="size-5" />}
						</div>
						{i < steps.length - 1 && (
							<div
								className={`
									w-0.5 h-16 my-1
									${isCompleted ? 'bg-primary' : 'bg-muted'}
								`}
							/>
						)}
					</div>
					<div className="pt-2">
						<p className={`font-medium ${!isCompleted && !isCurrent ? 'text-muted-foreground' : ''}`}>
							{step.label}
						</p>
					</div>
				</div>
			);
		})}
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
	defaultValue,
}: {
	label: string;
	placeholder: string;
	type?: string;
	defaultValue?: string;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Input type={type} placeholder={placeholder} defaultValue={defaultValue} className="h-11" />
	</div>
);

const FormSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div>
		<h3 className="text-lg font-semibold mb-4">{title}</h3>
		<div className="space-y-4">{children}</div>
	</div>
);

export default function Main() {
	const steps = [
		{ icon: MapPin, label: 'Shipping Address' },
		{ icon: Truck, label: 'Delivery Method' },
		{ icon: CreditCard, label: 'Payment' },
		{ icon: PartyPopper, label: 'Confirmation' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<h1 className="text-3xl font-bold mb-2">Checkout</h1>
				<p className="text-muted-foreground mb-8">Complete your order in a few steps</p>

				<div className="grid @lg:grid-cols-[280px_1fr] gap-8">
					<div className="hidden @lg:block">
						<Card className="sticky top-4">
							<CardContent className="p-6">
								<VerticalStepper steps={steps} currentStep={0} />
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardContent className="p-6 @md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<MapPin className="size-5" />
								</div>
								<div>
									<h2 className="text-xl font-bold">Shipping Address</h2>
									<p className="text-sm text-muted-foreground">Where should we deliver your order?</p>
								</div>
							</div>

							<FormSection title="Contact Information">
								<div className="grid @sm:grid-cols-2 gap-4">
									<FormField label="First Name" placeholder="John" defaultValue="John" />
									<FormField label="Last Name" placeholder="Doe" defaultValue="Doe" />
								</div>
								<FormField label="Email" placeholder="john@example.com" type="email" defaultValue="john.doe@email.com" />
								<FormField label="Phone" placeholder="+1 (555) 123-4567" type="tel" />
							</FormSection>

							<Separator className="my-6" />

							<FormSection title="Delivery Address">
								<FormField label="Street Address" placeholder="123 Main Street" />
								<FormField label="Apartment, Suite, etc." placeholder="Apt 4B" />
								<div className="grid @sm:grid-cols-3 gap-4">
									<FormField label="City" placeholder="New York" />
									<FormField label="State" placeholder="NY" />
									<FormField label="ZIP Code" placeholder="10001" />
								</div>
							</FormSection>

							<div className="flex flex-col @sm:flex-row gap-3 pt-8">
								<Button variant="outline" className="@sm:w-auto">Cancel</Button>
								<Button className="flex-1 @sm:flex-initial @sm:ml-auto">Continue to Delivery</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
