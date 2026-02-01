import {
	Check,
	MapPin,
	Truck,
	CreditCard,
	CheckCircle2,
	Circle,
	Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const FloatingProgress = ({
	steps,
	currentStep,
}: {
	steps: string[];
	currentStep: number;
}) => (
	<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden @md:block">
		<Card className="shadow-2xl">
			<CardContent className="p-3">
				<div className="flex items-center gap-4">
					{steps.map((step, i) => (
						<div key={step} className="flex items-center gap-2">
							<div
								className={`
									flex size-6 items-center justify-center rounded-full text-xs font-medium
									${i < currentStep ? 'bg-primary text-primary-foreground' : ''}
									${i === currentStep ? 'bg-primary text-primary-foreground' : ''}
									${i > currentStep ? 'bg-muted text-muted-foreground' : ''}
								`}
							>
								{i < currentStep ? <Check className="size-3" /> : i + 1}
							</div>
							<span
								className={`
									text-sm
									${i <= currentStep ? 'font-medium' : 'text-muted-foreground'}
								`}
							>
								{step}
							</span>
							{i < steps.length - 1 && (
								<div className="w-8 h-0.5 bg-muted ml-2" />
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	</div>
);

const ValidationField = ({
	label,
	placeholder,
	type = 'text',
	valid,
	error,
}: {
	label: string;
	placeholder: string;
	type?: string;
	valid?: boolean;
	error?: string;
}) => (
	<div className="space-y-2">
		<Label className="flex items-center gap-2">
			{label}
			{valid && <CheckCircle2 className="size-4 text-green-500" />}
		</Label>
		<div className="relative">
			<Input
				type={type}
				placeholder={placeholder}
				className={`h-11 pr-10 ${error ? 'border-destructive' : ''}`}
			/>
			{valid && (
				<CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-green-500" />
			)}
		</div>
		{error && <p className="text-sm text-destructive">{error}</p>}
	</div>
);

const FormSection = ({
	icon: Icon,
	title,
	description,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	children: React.ReactNode;
}) => (
	<Card className="mb-6">
		<CardContent className="p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
					<Icon className="size-5" />
				</div>
				<div>
					<h2 className="font-semibold">{title}</h2>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
			{children}
		</CardContent>
	</Card>
);

export default function Main() {
	const steps = ['Address', 'Shipping', 'Payment', 'Review'];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 pb-32">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold mb-2">Checkout</h1>
					<p className="text-muted-foreground">
						Complete your order in a few simple steps
					</p>
				</div>

				<FormSection
					icon={MapPin}
					title="Shipping Address"
					description="Where should we deliver?"
				>
					<div className="space-y-4">
						<div className="grid @sm:grid-cols-2 gap-4">
							<ValidationField label="First Name" placeholder="John" valid />
							<ValidationField label="Last Name" placeholder="Doe" valid />
						</div>
						<ValidationField
							label="Email"
							placeholder="john@example.com"
							type="email"
							valid
						/>
						<ValidationField
							label="Street Address"
							placeholder="123 Main Street"
							error="Please enter a valid street address"
						/>
						<div className="grid @sm:grid-cols-3 gap-4">
							<ValidationField label="City" placeholder="New York" />
							<ValidationField label="State" placeholder="NY" />
							<ValidationField label="ZIP" placeholder="10001" />
						</div>

						<div className="flex items-center gap-2 pt-2">
							<Checkbox id="billing-same" defaultChecked />
							<Label htmlFor="billing-same" className="text-sm cursor-pointer">
								Billing address same as shipping
							</Label>
						</div>
					</div>
				</FormSection>

				<FormSection
					icon={Truck}
					title="Delivery Options"
					description="Choose your shipping speed"
				>
					<div className="space-y-3">
						<Label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-accent/50">
							<div className="flex items-center gap-3">
								<input type="radio" name="shipping" className="size-4" />
								<div>
									<span className="font-medium">Standard (Free)</span>
									<p className="text-sm text-muted-foreground">
										5-7 business days
									</p>
								</div>
							</div>
							<span className="font-bold">$0.00</span>
						</Label>
						<Label className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-accent/50 border-primary bg-primary/5">
							<div className="flex items-center gap-3">
								<input
									type="radio"
									name="shipping"
									className="size-4"
									defaultChecked
								/>
								<div>
									<span className="font-medium">Express</span>
									<p className="text-sm text-muted-foreground">
										2-3 business days
									</p>
								</div>
							</div>
							<span className="font-bold text-primary">$12.99</span>
						</Label>
					</div>
				</FormSection>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue to Payment</Button>
				</div>

				<FloatingProgress steps={steps} currentStep={1} />
			</div>
		</section>
	);
}
