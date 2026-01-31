import { Check, MapPin, Truck, CreditCard, Gift, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const BreadcrumbStepper = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="flex items-center gap-2 text-sm mb-8 overflow-x-auto pb-2">
		{steps.map((step, i) => (
			<div key={step} className="flex items-center gap-2 shrink-0">
				<span
					className={`
						${i < currentStep ? 'text-primary' : ''}
						${i === currentStep ? 'font-semibold' : ''}
						${i > currentStep ? 'text-muted-foreground' : ''}
					`}
				>
					{step}
				</span>
				{i < steps.length - 1 && (
					<ArrowRight className="size-4 text-muted-foreground" />
				)}
			</div>
		))}
	</div>
);

const AccordionStep = ({
	number,
	title,
	icon: Icon,
	completed,
	active,
	children,
	summary,
}: {
	number: number;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	completed?: boolean;
	active?: boolean;
	children?: React.ReactNode;
	summary?: string;
}) => (
	<div className={`border rounded-xl ${active ? 'border-primary' : ''}`}>
		<div
			className={`
				flex items-center gap-4 p-4
				${completed ? 'bg-muted/30' : ''}
			`}
		>
			<div
				className={`
					flex size-10 items-center justify-center rounded-full text-sm font-bold
					${completed ? 'bg-primary text-primary-foreground' : ''}
					${active ? 'bg-primary text-primary-foreground' : ''}
					${!completed && !active ? 'bg-muted text-muted-foreground' : ''}
				`}
			>
				{completed ? <Check className="size-5" /> : <Icon className="size-5" />}
			</div>
			<div className="flex-1">
				<h3 className="font-semibold">{title}</h3>
				{completed && summary && (
					<p className="text-sm text-muted-foreground">{summary}</p>
				)}
			</div>
			{completed && (
				<Button variant="ghost" size="sm">Edit</Button>
			)}
		</div>
		{active && (
			<div className="p-4 pt-0 border-t">
				{children}
			</div>
		)}
	</div>
);

const FormRow = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<div className="grid @sm:grid-cols-2 gap-4">{children}</div>
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

export default function Main() {
	const breadcrumbs = ['Cart', 'Information', 'Shipping', 'Payment'];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<BreadcrumbStepper steps={breadcrumbs} currentStep={1} />

				<h1 className="text-3xl font-bold mb-8">Checkout</h1>

				<div className="space-y-4">
					<AccordionStep
						number={1}
						title="Contact Information"
						icon={Gift}
						completed
						summary="john.doe@email.com"
					/>

					<AccordionStep
						number={2}
						title="Shipping Address"
						icon={MapPin}
						active
					>
						<div className="space-y-4 pt-4">
							<FormRow>
								<FormField label="First Name" placeholder="John" />
								<FormField label="Last Name" placeholder="Doe" />
							</FormRow>
							<FormField label="Address" placeholder="123 Main Street" />
							<FormField label="Apartment, suite, etc." placeholder="Apt 4B" />
							<FormRow>
								<FormField label="City" placeholder="New York" />
								<FormField label="ZIP Code" placeholder="10001" />
							</FormRow>
							<FormField label="Phone" placeholder="+1 (555) 123-4567" type="tel" />

							<div className="flex items-center gap-2 pt-2">
								<Checkbox id="save-address" />
								<Label htmlFor="save-address" className="text-sm cursor-pointer">
									Save this address for future orders
								</Label>
							</div>

							<Separator className="my-4" />

							<div className="flex gap-3">
								<Button variant="outline" className="flex-1">Back</Button>
								<Button className="flex-1">Continue to Shipping</Button>
							</div>
						</div>
					</AccordionStep>

					<AccordionStep
						number={3}
						title="Shipping Method"
						icon={Truck}
					/>

					<AccordionStep
						number={4}
						title="Payment"
						icon={CreditCard}
					/>
				</div>
			</div>
		</section>
	);
}
