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
import { MapPin, Plus, Check } from 'lucide-react';

interface SavedAddressProps {
	items: {
		id: string;
		label: string;
		name: string;
		address: string;
		isDefault?: boolean;
	}[];
}

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

interface SectionHeaderProps {
	title: string;
	action?: { label: string; icon: React.ElementType };
}

const SectionHeader = ({ title, action }: SectionHeaderProps) => (
	<div className="flex items-center justify-between mb-4">
		<h3 className="text-lg font-semibold">{title}</h3>
		{action && (
			<Button variant="ghost" size="sm" className="gap-1.5 text-primary">
				<action.icon className="size-4" />
				{action.label}
			</Button>
		)}
	</div>
);

const SavedAddresses = ({ items }: SavedAddressProps) => (
	<RadioGroup defaultValue={items[0]?.id} className="space-y-3">
		{items.map((item) => (
			<label
				key={item.id}
				className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group has-[:checked]:border-primary has-[:checked]:bg-primary/5"
			>
				<RadioGroupItem value={item.id} className="mt-1" />
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<span className="font-medium">{item.label}</span>
						{item.isDefault && (
							<span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
								Default
							</span>
						)}
					</div>
					<p className="text-sm text-muted-foreground">{item.name}</p>
					<p className="text-sm text-muted-foreground truncate">
						{item.address}
					</p>
				</div>
				<div className="hidden group-has-[:checked]:flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
					<Check className="size-3.5" />
				</div>
			</label>
		))}
	</RadioGroup>
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

const NewAddressForm = ({
	countries,
}: {
	countries: { value: string; label: string }[];
}) => (
	<div className="p-6 rounded-xl border border-dashed border-border bg-muted/30 space-y-4">
		<div className="flex items-center gap-2 text-muted-foreground mb-4">
			<MapPin className="size-4" />
			<span className="text-sm font-medium">New Address</span>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Full Name" placeholder="John Doe" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		</div>
		<Field label="Street Address" placeholder="123 Main St" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<Field label="State" placeholder="State" />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
		/>
	</div>
);

export default function Main() {
	const savedAddresses = [
		{
			id: 'home',
			label: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			isDefault: true,
		},
		{
			id: 'office',
			label: 'Office',
			name: 'John Doe',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
		},
	];

	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<SectionHeader
					title="Delivery Address"
					action={{ label: 'Add New', icon: Plus }}
				/>

				<div className="space-y-6">
					<SavedAddresses items={savedAddresses} />

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border" />
						</div>
						<div className="relative flex justify-center">
							<span className="bg-background px-4 text-sm text-muted-foreground">
								or add a new address
							</span>
						</div>
					</div>

					<NewAddressForm countries={countries} />
				</div>

				<div className="mt-8 flex gap-3">
					<Button variant="outline" className="flex-1">
						Back
					</Button>
					<Button className="flex-1">Continue</Button>
				</div>
			</div>
		</section>
	);
}
