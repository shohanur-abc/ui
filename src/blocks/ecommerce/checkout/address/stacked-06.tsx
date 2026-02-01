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
import { Search, MapPin } from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	icon?: React.ElementType;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

interface HeaderProps {
	title: string;
	subtitle: string;
}

interface SuggestionProps {
	items: { address: string; type: string }[];
}

const Header = ({ title, subtitle }: HeaderProps) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @md:text-3xl font-bold mb-2">{title}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const SearchField = ({
	label,
	placeholder,
	icon: Icon,
}: FieldProps & { icon: React.ElementType }) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-10" />
		</div>
	</div>
);

const AddressSuggestions = ({ items }: SuggestionProps) => (
	<div className="mt-2 rounded-lg border border-border bg-card divide-y divide-border">
		{items.map((item, i) => (
			<button
				key={i}
				type="button"
				className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
			>
				<MapPin className="size-4 text-muted-foreground shrink-0" />
				<div className="flex-1 min-w-0">
					<p className="text-sm truncate">{item.address}</p>
					<p className="text-xs text-muted-foreground">{item.type}</p>
				</div>
			</button>
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

const CheckboxWithLabel = ({ id, label }: { id: string; label: string }) => (
	<div className="flex items-center gap-2">
		<Checkbox id={id} />
		<Label htmlFor={id} className="text-sm font-normal cursor-pointer">
			{label}
		</Label>
	</div>
);

export default function Main() {
	const suggestions = [
		{ address: '123 Main Street, San Francisco, CA 94102', type: 'Street' },
		{
			address: '123 Main Avenue, San Francisco, CA 94103',
			type: 'Avenue',
		},
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Header
					title="Where should we deliver?"
					subtitle="Enter your shipping address"
				/>

				<div className="space-y-6">
					<div>
						<SearchField
							label="Search Address"
							placeholder="Start typing your address..."
							icon={Search}
						/>
						<AddressSuggestions items={suggestions} />
					</div>

					<div className="relative py-4">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border" />
						</div>
						<div className="relative flex justify-center">
							<span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
								Or enter manually
							</span>
						</div>
					</div>

					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<Field label="First Name" placeholder="John" />
							<Field label="Last Name" placeholder="Doe" />
						</div>
						<Field label="Address Line 1" placeholder="Street address" />
						<Field
							label="Address Line 2"
							placeholder="Apt, suite, unit (optional)"
						/>
						<div className="grid grid-cols-2 gap-4">
							<Field label="City" placeholder="City" />
							<Field label="ZIP Code" placeholder="12345" />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<Field label="State / Province" placeholder="State" />
							<SelectField
								label="Country"
								placeholder="Select"
								options={countries}
							/>
						</div>
						<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
					</div>

					<div className="space-y-3 pt-2">
						<CheckboxWithLabel
							id="billing-same"
							label="Billing address same as shipping"
						/>
						<CheckboxWithLabel
							id="save-info"
							label="Save this information for next time"
						/>
					</div>
				</div>

				<div className="mt-8 flex gap-3">
					<Button variant="outline" size="lg" className="flex-1">
						Back
					</Button>
					<Button size="lg" className="flex-1">
						Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
