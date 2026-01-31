import { Check, MapPin, Truck, CreditCard, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WizardStep = ({
	step,
	icon: Icon,
	label,
	status,
}: {
	step: number;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	status: 'completed' | 'current' | 'upcoming';
}) => {
	const statusStyles = {
		completed: 'bg-primary text-primary-foreground',
		current: 'bg-primary text-primary-foreground ring-4 ring-primary/20',
		upcoming: 'bg-muted text-muted-foreground',
	};

	return (
		<div className="flex flex-col items-center gap-2">
			<div className={`flex size-12 items-center justify-center rounded-full ${statusStyles[status]}`}>
				{status === 'completed' ? <Check className="size-6" /> : <Icon className="size-6" />}
			</div>
			<span className={`text-sm font-medium ${status === 'upcoming' ? 'text-muted-foreground' : ''}`}>
				{label}
			</span>
		</div>
	);
};

const StepConnector = ({ completed }: { completed: boolean }) => (
	<div className={`flex-1 h-1 rounded-full mx-2 ${completed ? 'bg-primary' : 'bg-muted'}`} />
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
	required,
	half,
}: {
	label: string;
	placeholder: string;
	type?: string;
	required?: boolean;
	half?: boolean;
}) => (
	<div className={half ? 'flex-1' : 'w-full'}>
		<Label>
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
		<Input type={type} placeholder={placeholder} className="mt-1.5 h-11" />
	</div>
);

const WizardNavigation = ({
	backLabel,
	nextLabel,
	showBack,
}: {
	backLabel: string;
	nextLabel: string;
	showBack?: boolean;
}) => (
	<div className="flex gap-3 pt-6">
		{showBack && (
			<Button variant="outline" className="flex-1">{backLabel}</Button>
		)}
		<Button className="flex-1">{nextLabel}</Button>
	</div>
);

export default function Main() {
	const steps = [
		{ icon: MapPin, label: 'Address', status: 'completed' as const },
		{ icon: Truck, label: 'Shipping', status: 'current' as const },
		{ icon: CreditCard, label: 'Payment', status: 'upcoming' as const },
		{ icon: Package, label: 'Confirm', status: 'upcoming' as const },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="mb-10">
					<div className="flex items-center justify-between">
						{steps.map((step, i) => (
							<div key={step.label} className="flex items-center flex-1 last:flex-initial">
								<WizardStep step={i + 1} {...step} />
								{i < steps.length - 1 && (
									<StepConnector completed={step.status === 'completed'} />
								)}
							</div>
						))}
					</div>
				</div>

				<Card>
					<CardContent className="p-6 @md:p-8">
						<div className="mb-6">
							<h2 className="text-2xl font-bold mb-1">Shipping Information</h2>
							<p className="text-muted-foreground">Enter your delivery address</p>
						</div>

						<div className="space-y-4">
							<div className="flex flex-col @sm:flex-row gap-4">
								<FormField label="First Name" placeholder="John" required half />
								<FormField label="Last Name" placeholder="Doe" required half />
							</div>

							<FormField label="Street Address" placeholder="123 Main Street" required />

							<div className="flex flex-col @sm:flex-row gap-4">
								<FormField label="City" placeholder="New York" required half />
								<FormField label="ZIP Code" placeholder="10001" required half />
							</div>

							<div className="flex flex-col @sm:flex-row gap-4">
								<FormField label="State" placeholder="NY" required half />
								<FormField label="Country" placeholder="United States" required half />
							</div>

							<FormField label="Phone Number" placeholder="+1 (555) 123-4567" type="tel" required />
						</div>

						<WizardNavigation backLabel="Back" nextLabel="Continue to Shipping" showBack />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
