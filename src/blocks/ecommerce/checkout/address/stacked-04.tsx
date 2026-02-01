'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { MapPin, Navigation } from 'lucide-react';

interface SectionTitleProps {
	number: string;
	title: string;
	subtitle: string;
}

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	optional?: boolean;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface LocationButtonProps {
	icon: React.ElementType;
	text: string;
}

const SectionTitle = ({ number, title, subtitle }: SectionTitleProps) => (
	<div className="flex items-start gap-4 mb-6">
		<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
			{number}
		</div>
		<div>
			<h2 className="text-lg font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const Field = ({ label, placeholder, type = 'text', optional }: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">
			{label}
			{optional && (
				<span className="text-muted-foreground font-normal ml-1">
					(optional)
				</span>
			)}
		</Label>
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

const LocationButton = ({ icon: Icon, text }: LocationButtonProps) => (
	<button
		type="button"
		className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
	>
		<Icon className="size-4" />
		{text}
	</button>
);

const DeliveryNotesField = ({
	label,
	placeholder,
}: {
	label: string;
	placeholder: string;
}) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Textarea placeholder={placeholder} className="min-h-[100px] resize-none" />
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'mx', label: 'Mexico' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'tx', label: 'Texas' },
		{ value: 'fl', label: 'Florida' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<SectionTitle
					number="1"
					title="Delivery Address"
					subtitle="Where should we deliver your order?"
				/>

				<div className="ml-0 @md:ml-14 space-y-6">
					<div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-dashed border-border">
						<div className="flex items-center gap-3">
							<MapPin className="size-5 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">
								Use my current location
							</span>
						</div>
						<LocationButton icon={Navigation} text="Detect" />
					</div>

					<div className="space-y-4">
						<div className="grid @sm:grid-cols-2 gap-4">
							<Field label="First Name" placeholder="Enter first name" />
							<Field label="Last Name" placeholder="Enter last name" />
						</div>

						<Field
							label="Phone Number"
							placeholder="+1 (555) 000-0000"
							type="tel"
						/>

						<SelectField
							label="Country"
							placeholder="Select your country"
							options={countries}
						/>

						<Field
							label="Street Address"
							placeholder="House number and street name"
						/>

						<Field
							label="Apartment / Suite"
							placeholder="Apartment, suite, unit, building, floor"
							optional
						/>

						<div className="grid @sm:grid-cols-3 gap-4">
							<Field label="City" placeholder="City" />
							<SelectField label="State" placeholder="State" options={states} />
							<Field label="ZIP Code" placeholder="12345" />
						</div>

						<DeliveryNotesField
							label="Delivery Instructions"
							placeholder="Add any special delivery instructions (e.g., gate code, leave at door)"
						/>
					</div>

					<div className="flex flex-col-reverse @sm:flex-row gap-3 pt-4">
						<Button variant="outline" className="@sm:w-auto">
							Back
						</Button>
						<Button className="flex-1 @sm:flex-none @sm:min-w-[200px]">
							Continue
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
