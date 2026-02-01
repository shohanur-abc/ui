'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Truck, Clock, Shield } from 'lucide-react';

interface FieldGroupProps {
	title: string;
	children: React.ReactNode;
}

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	className?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
	className?: string;
}

interface FeatureBadgeProps {
	items: { icon: React.ElementType; text: string }[];
}

interface ProgressProps {
	steps: { label: string; completed: boolean; active: boolean }[];
}

const Progress = ({ steps }: ProgressProps) => (
	<div className="flex items-center justify-center gap-2 mb-8">
		{steps.map((step, i) => (
			<div key={i} className="flex items-center gap-2">
				<div
					className={`size-8 rounded-full flex items-center justify-center text-sm font-medium ${
						step.completed
							? 'bg-primary text-primary-foreground'
							: step.active
								? 'bg-primary/20 text-primary border-2 border-primary'
								: 'bg-muted text-muted-foreground'
					}`}
				>
					{i + 1}
				</div>
				<span
					className={`text-sm hidden @sm:block ${step.active ? 'font-medium' : 'text-muted-foreground'}`}
				>
					{step.label}
				</span>
				{i < steps.length - 1 && (
					<div className="w-8 @sm:w-12 h-0.5 bg-border mx-2" />
				)}
			</div>
		))}
	</div>
);

const FieldGroup = ({ title, children }: FieldGroupProps) => (
	<div className="space-y-4">
		<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
			{title}
		</h3>
		{children}
	</div>
);

const Field = ({
	label,
	placeholder,
	type = 'text',
	className,
}: FieldProps) => (
	<div className={`space-y-1.5 ${className}`}>
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
	className,
}: SelectFieldProps) => (
	<div className={`space-y-1.5 ${className}`}>
		<Label className="text-sm">{label}</Label>
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const FeatureBadges = ({ items }: FeatureBadgeProps) => (
	<div className="flex flex-wrap gap-2 justify-center mb-8">
		{items.map((item, i) => {
			const Icon = item.icon;
			return (
				<Badge
					key={i}
					variant="outline"
					className="gap-1.5 py-1.5 px-3 bg-card"
				>
					<Icon className="size-3.5" />
					{item.text}
				</Badge>
			);
		})}
	</div>
);

export default function Main() {
	const steps = [
		{ label: 'Address', completed: false, active: true },
		{ label: 'Shipping', completed: false, active: false },
		{ label: 'Payment', completed: false, active: false },
	];

	const features = [
		{ icon: Truck, text: 'Free Shipping' },
		{ icon: Clock, text: '2-3 Days Delivery' },
		{ icon: Shield, text: 'Secure Checkout' },
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Progress steps={steps} />
				<FeatureBadges items={features} />

				<div className="space-y-8">
					<FieldGroup title="Contact Information">
						<div className="grid @sm:grid-cols-2 gap-4">
							<Field label="First Name" placeholder="John" />
							<Field label="Last Name" placeholder="Doe" />
						</div>
						<Field
							label="Email Address"
							placeholder="john@example.com"
							type="email"
						/>
						<Field
							label="Phone Number"
							placeholder="+1 (555) 000-0000"
							type="tel"
						/>
					</FieldGroup>

					<Separator />

					<FieldGroup title="Shipping Address">
						<Field label="Street Address" placeholder="123 Main Street" />
						<Field label="Apt, Suite, Building" placeholder="Optional" />
						<div className="grid @sm:grid-cols-2 gap-4">
							<Field label="City" placeholder="San Francisco" />
							<Field label="Postal Code" placeholder="94102" />
						</div>
						<div className="grid @sm:grid-cols-2 gap-4">
							<SelectField
								label="State"
								placeholder="Select"
								options={states}
							/>
							<SelectField
								label="Country"
								placeholder="Select"
								options={countries}
							/>
						</div>
					</FieldGroup>
				</div>

				<div className="mt-10 flex flex-col @sm:flex-row gap-3">
					<Button variant="ghost" className="@sm:order-1">
						Back to Cart
					</Button>
					<Button className="flex-1 @sm:order-2">Continue to Shipping</Button>
				</div>
			</div>
		</section>
	);
}
