import { Truck, AlertCircle, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StatusAlert = ({
	variant,
	icon: Icon,
	message,
}: {
	variant: 'default' | 'destructive';
	icon: React.ComponentType<{ className?: string }>;
	message: string;
}) => (
	<Alert variant={variant} className="mb-6">
		<Icon className="size-4" />
		<AlertDescription>{message}</AlertDescription>
	</Alert>
);

const FormHeader = ({
	title,
	subtitle,
	step,
	totalSteps,
}: {
	title: string;
	subtitle: string;
	step: number;
	totalSteps: number;
}) => (
	<div className="flex items-start justify-between mb-8">
		<div>
			<h1 className="text-2xl font-bold">{title}</h1>
			<p className="text-muted-foreground mt-1">{subtitle}</p>
		</div>
		<div className="text-right">
			<span className="text-2xl font-bold text-primary">{step}</span>
			<span className="text-muted-foreground">/{totalSteps}</span>
		</div>
	</div>
);

const ValidationInput = ({
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
		<Label className="flex items-center justify-between">
			{label}
			{valid && <CheckCircle2 className="size-4 text-green-500" />}
		</Label>
		<Input
			type={type}
			placeholder={placeholder}
			className={`h-11 ${error ? 'border-destructive focus-visible:ring-destructive' : ''} ${valid ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
		/>
		{error && <p className="text-sm text-destructive">{error}</p>}
	</div>
);

const ProgressIndicator = ({
	progress,
	label,
}: {
	progress: number;
	label: string;
}) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between text-sm">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium">{progress}%</span>
		</div>
		<div className="h-2 bg-muted rounded-full overflow-hidden">
			<div
				className="h-full bg-primary transition-all duration-500"
				style={{ width: `${progress}%` }}
			/>
		</div>
	</div>
);

const ActionFooter = ({
	helpText,
	buttonLabel,
}: {
	helpText: string;
	buttonLabel: string;
}) => (
	<div className="space-y-4 pt-6 border-t">
		<p className="text-sm text-muted-foreground text-center">{helpText}</p>
		<Button className="w-full h-12">{buttonLabel}</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden bg-muted/30">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="rounded-2xl bg-card border shadow-lg p-6 @md:p-8">
					<StatusAlert
						variant="default"
						icon={Truck}
						message="Free shipping on orders over $100"
					/>

					<FormHeader
						title="Shipping Address"
						subtitle="Enter your delivery details"
						step={2}
						totalSteps={4}
					/>

					<ProgressIndicator progress={50} label="Form completion" />

					<div className="space-y-5 mt-8">
						<div className="grid @sm:grid-cols-2 gap-4">
							<ValidationInput label="First Name" placeholder="John" valid />
							<ValidationInput label="Last Name" placeholder="Doe" valid />
						</div>

						<ValidationInput
							label="Email Address"
							placeholder="john@example.com"
							type="email"
							error="Please enter a valid email address"
						/>

						<ValidationInput
							label="Phone"
							placeholder="+1 (555) 000-0000"
							type="tel"
						/>
						<ValidationInput label="Street Address" placeholder="123 Main St" />
						<ValidationInput
							label="Apartment / Suite"
							placeholder="Apt 4B (optional)"
						/>

						<div className="grid @sm:grid-cols-3 gap-4">
							<ValidationInput label="City" placeholder="New York" />
							<ValidationInput label="State" placeholder="NY" />
							<ValidationInput label="ZIP Code" placeholder="10001" />
						</div>
					</div>

					<ActionFooter
						helpText="All fields marked with * are required"
						buttonLabel="Continue to Delivery Method"
					/>
				</div>
			</div>
		</section>
	);
}
