'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Truck, Zap, Clock, Check } from 'lucide-react';

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

interface ShippingOptionProps {
	items: {
		id: string;
		icon: React.ElementType;
		name: string;
		description: string;
		price: string;
		eta: string;
		recommended?: boolean;
	}[];
}

const SectionLabel = ({
	step,
	title,
}: {
	step: string;
	title: string;
}) => (
	<div className="flex items-center gap-3 mb-5">
		<span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
			{step}
		</span>
		<h2 className="text-lg font-semibold">{title}</h2>
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

const ShippingOptions = ({ items }: ShippingOptionProps) => (
	<RadioGroup defaultValue={items[0]?.id} className="space-y-3">
		{items.map((item) => {
			const Icon = item.icon;
			return (
				<label
					key={item.id}
					className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
				>
					<RadioGroupItem value={item.id} className="mt-1" />
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
						<Icon className="size-5 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<span className="font-medium">{item.name}</span>
							{item.recommended && (
								<Badge variant="secondary" className="text-xs">
									Recommended
								</Badge>
							)}
						</div>
						<p className="text-sm text-muted-foreground">{item.description}</p>
						<p className="text-xs text-muted-foreground mt-1">{item.eta}</p>
					</div>
					<span className="font-semibold">{item.price}</span>
				</label>
			);
		})}
	</RadioGroup>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
	];

	const shippingOptions = [
		{
			id: 'express',
			icon: Zap,
			name: 'Express Delivery',
			description: 'Priority handling and fastest delivery',
			price: '$14.99',
			eta: 'Arrives in 1-2 business days',
			recommended: true,
		},
		{
			id: 'standard',
			icon: Truck,
			name: 'Standard Shipping',
			description: 'Regular delivery at no extra cost',
			price: 'Free',
			eta: 'Arrives in 5-7 business days',
		},
		{
			id: 'economy',
			icon: Clock,
			name: 'Economy',
			description: 'Budget-friendly option',
			price: '$4.99',
			eta: 'Arrives in 7-14 business days',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="grid @lg:grid-cols-2 gap-10 @lg:gap-16">
					<div>
						<SectionLabel step="1" title="Shipping Address" />

						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<Field label="First Name" placeholder="John" />
								<Field label="Last Name" placeholder="Doe" />
							</div>
							<Field label="Email" placeholder="john@example.com" type="email" />
							<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
							<SelectField
								label="Country"
								placeholder="Select country"
								options={countries}
							/>
							<Field label="Street Address" placeholder="123 Main Street" />
							<Field label="Apt / Suite / Unit" placeholder="Optional" />
							<div className="grid grid-cols-3 gap-4">
								<Field label="City" placeholder="City" />
								<SelectField
									label="State"
									placeholder="State"
									options={states}
								/>
								<Field label="ZIP" placeholder="12345" />
							</div>
						</div>
					</div>

					<div>
						<SectionLabel step="2" title="Shipping Method" />
						<ShippingOptions items={shippingOptions} />

						<div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
							<div className="flex items-start gap-3">
								<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
									<Check className="size-3.5" />
								</div>
								<div>
									<p className="text-sm font-medium">Free shipping available</p>
									<p className="text-xs text-muted-foreground">
										Orders over $50 qualify for free standard shipping
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col @sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-border">
					<Button variant="ghost" size="lg">
						Return to Cart
					</Button>
					<Button size="lg" className="@sm:min-w-[200px]">
						Continue to Payment
					</Button>
				</div>
			</div>
		</section>
	);
}
