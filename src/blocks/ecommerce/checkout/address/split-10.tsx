'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Lock, ShieldCheck, RefreshCw, Headphones, ArrowRight } from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface FeatureListProps {
	items: { icon: React.ElementType; title: string; description: string }[];
}

const HeroSection = ({
	tagline,
	title,
	subtitle,
}: {
	tagline: string;
	title: string;
	subtitle: string;
}) => (
	<div className="text-center @lg:text-left mb-8 @lg:mb-0">
		<Badge variant="outline" className="mb-4">
			{tagline}
		</Badge>
		<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold mb-4">
			{title}
		</h1>
		<p className="text-lg text-muted-foreground max-w-md mx-auto @lg:mx-0">
			{subtitle}
		</p>
	</div>
);

const FeatureList = ({ items }: FeatureListProps) => (
	<div className="grid grid-cols-2 @sm:grid-cols-4 @lg:grid-cols-2 gap-4 mt-8">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex flex-col items-center @lg:items-start gap-2 p-4 rounded-xl bg-card/50 border border-border text-center @lg:text-left"
			>
				<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<item.icon className="size-5" />
				</div>
				<div>
					<p className="font-medium text-sm">{item.title}</p>
					<p className="text-xs text-muted-foreground">{item.description}</p>
				</div>
			</div>
		))}
	</div>
);

const Field = ({ label, placeholder, type = 'text' }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const SelectField = ({ label, placeholder, options }: SelectFieldProps) => (
	<div className="space-y-2">
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

const FormCard = ({ children }: { children: React.ReactNode }) => (
	<div className="rounded-2xl border border-border bg-card p-6 @md:p-8 shadow-lg">
		{children}
	</div>
);

export default function Main() {
	const features = [
		{
			icon: Lock,
			title: 'Secure',
			description: '256-bit encryption',
		},
		{
			icon: ShieldCheck,
			title: 'Protected',
			description: 'Buyer protection',
		},
		{
			icon: RefreshCw,
			title: 'Easy Returns',
			description: '30-day policy',
		},
		{
			icon: Headphones,
			title: 'Support',
			description: '24/7 available',
		},
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
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-10 @lg:gap-16 items-center">
					<div className="order-2 @lg:order-1">
						<HeroSection
							tagline="Step 1 of 3"
							title="Where should we ship your order?"
							subtitle="Enter your shipping details below. Your information is secure and encrypted."
						/>
						<FeatureList items={features} />
					</div>

					<div className="order-1 @lg:order-2">
						<FormCard>
							<h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<Field label="First Name" placeholder="John" />
									<Field label="Last Name" placeholder="Doe" />
								</div>
								<Field
									label="Email"
									placeholder="john@example.com"
									type="email"
								/>
								<Field
									label="Phone"
									placeholder="+1 (555) 000-0000"
									type="tel"
								/>
								<SelectField
									label="Country"
									placeholder="Select country"
									options={countries}
								/>
								<Field
									label="Street Address"
									placeholder="123 Main Street"
								/>
								<Field
									label="Apt / Suite"
									placeholder="Optional"
								/>
								<div className="grid grid-cols-3 gap-4">
									<Field label="City" placeholder="City" />
									<SelectField
										label="State"
										placeholder="State"
										options={states}
									/>
									<Field label="ZIP" placeholder="12345" />
								</div>
								<div className="flex items-center gap-3 pt-2">
									<Checkbox id="save-addr" />
									<Label
										htmlFor="save-addr"
										className="text-sm font-normal cursor-pointer"
									>
										Save this address for future orders
									</Label>
								</div>
								<Button className="w-full gap-2 mt-4" size="lg">
									Continue to Shipping
									<ArrowRight className="size-4" />
								</Button>
							</div>
						</FormCard>
					</div>
				</div>
			</div>
		</section>
	);
}
