import { Check, CreditCard, Lock, Shield, Truck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface StepIndicatorProps {
	steps: { label: string; completed: boolean; current: boolean }[];
}

interface FeatureProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface CardInputRowProps {
	fields: { id: string; label: string; placeholder: string; type?: string }[];
}

const StepIndicator = ({ steps }: StepIndicatorProps) => (
	<div className="flex items-center justify-center gap-2 @sm:gap-4">
		{steps.map((step, index) => (
			<div key={index} className="flex items-center gap-2">
				<div
					className={`size-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
						step.completed
							? 'bg-primary text-primary-foreground'
							: step.current
								? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
								: 'bg-muted text-muted-foreground'
					}`}
				>
					{step.completed ? <Check className="size-4" /> : index + 1}
				</div>
				<span className="hidden @sm:block text-sm font-medium">{step.label}</span>
				{index < steps.length - 1 && (
					<div className="w-8 @sm:w-12 h-px bg-border" />
				)}
			</div>
		))}
	</div>
);

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<div className="space-y-4">
		<h3 className="font-semibold flex items-center gap-2">
			<CreditCard className="size-4" />
			{title}
		</h3>
		{children}
	</div>
);

const CardInputField = ({
	id,
	label,
	placeholder,
	type = 'text',
	className,
}: {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	className?: string;
}) => (
	<div className={`space-y-2 ${className || ''}`}>
		<Label htmlFor={id} className="text-sm">{label}</Label>
		<Input id={id} type={type} placeholder={placeholder} />
	</div>
);

const CardInputRow = ({ fields }: CardInputRowProps) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		{fields.map((field) => (
			<CardInputField key={field.id} {...field} />
		))}
	</div>
);

const SaveCardOption = ({ label }: { label: string }) => (
	<div className="flex items-center gap-3 pt-2">
		<Checkbox id="save-card" />
		<Label htmlFor="save-card" className="text-sm text-muted-foreground cursor-pointer">
			{label}
		</Label>
	</div>
);

const FeatureItem = ({ icon: Icon, title, description }: FeatureProps) => (
	<div className="flex items-start gap-3">
		<div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
			<Icon className="size-4 text-primary" />
		</div>
		<div>
			<p className="text-sm font-medium">{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	</div>
);

const FeatureList = ({ features }: { features: FeatureProps[] }) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		{features.map((feature, index) => (
			<FeatureItem key={index} {...feature} />
		))}
	</div>
);

const PayButton = ({ amount }: { amount: string }) => (
	<Button className="w-full gap-2" size="lg">
		<Lock className="size-4" />
		Pay {amount}
	</Button>
);

const SecureNotice = ({ badges }: { badges: string[] }) => (
	<div className="flex items-center justify-center gap-2 flex-wrap">
		{badges.map((badge, index) => (
			<Badge key={index} variant="outline" className="text-xs">
				{badge}
			</Badge>
		))}
	</div>
);

export default function Main() {
	const steps = [
		{ label: 'Cart', completed: true, current: false },
		{ label: 'Shipping', completed: true, current: false },
		{ label: 'Payment', completed: false, current: true },
	];

	const cardFields = [
		{ id: 'card-number', label: 'Card Number', placeholder: '4242 4242 4242 4242' },
		{ id: 'card-name', label: 'Cardholder Name', placeholder: 'John Doe' },
		{ id: 'expiry', label: 'Expiry Date', placeholder: 'MM/YY' },
		{ id: 'cvv', label: 'Security Code', placeholder: 'CVV', type: 'password' },
	];

	const features: FeatureProps[] = [
		{ icon: Shield, title: 'Secure Payment', description: 'PCI DSS compliant' },
		{ icon: Truck, title: 'Free Shipping', description: 'Orders over $50' },
	];

	const badges = ['Visa', 'Mastercard', 'Amex', 'Discover'];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="space-y-8">
					<StepIndicator steps={steps} />
					<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
						<CardContent className="pt-6 space-y-6">
							<FormSection title="Payment Information">
								<CardInputRow fields={cardFields.slice(0, 2)} />
								<CardInputRow fields={cardFields.slice(2)} />
								<SaveCardOption label="Save this card for future purchases" />
							</FormSection>
							<Separator />
							<FeatureList features={features} />
							<div className="space-y-4 pt-2">
								<PayButton amount="$199.00" />
								<SecureNotice badges={badges} />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
