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
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Plus, Edit2, Trash2, Check, Home, Briefcase } from 'lucide-react';

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

interface SavedAddressCardProps {
	id: string;
	type: 'home' | 'work';
	name: string;
	address: string;
	phone: string;
	isDefault?: boolean;
}

const SavedAddressCard = ({
	id,
	type,
	name,
	address,
	phone,
	isDefault,
}: SavedAddressCardProps) => {
	const TypeIcon = type === 'home' ? Home : Briefcase;
	return (
		<label
			className="relative flex gap-4 p-5 rounded-xl border-2 border-border bg-card cursor-pointer transition-all hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
		>
			<RadioGroupItem value={id} className="mt-0.5" />
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<TypeIcon className="size-4 text-muted-foreground" />
					<span className="font-semibold capitalize">{type}</span>
					{isDefault && (
						<span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
							Default
						</span>
					)}
				</div>
				<p className="text-sm font-medium">{name}</p>
				<p className="text-sm text-muted-foreground truncate">{address}</p>
				<p className="text-sm text-muted-foreground">{phone}</p>
			</div>
			<div className="absolute top-3 right-3 flex gap-1">
				<Button variant="ghost" size="icon-sm" className="size-7">
					<Edit2 className="size-3.5" />
				</Button>
				<Button variant="ghost" size="icon-sm" className="size-7 text-destructive">
					<Trash2 className="size-3.5" />
				</Button>
			</div>
			<div className="absolute bottom-3 right-3 hidden group-has-[:checked]:flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
				<Check className="size-3.5" />
			</div>
		</label>
	);
};

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

const NewAddressButton = ({ onClick }: { onClick?: () => void }) => (
	<button
		type="button"
		onClick={onClick}
		className="flex items-center justify-center gap-2 w-full p-5 rounded-xl border-2 border-dashed border-border hover:border-primary/40 hover:bg-muted/30 transition-colors"
	>
		<Plus className="size-5 text-muted-foreground" />
		<span className="font-medium text-muted-foreground">Add New Address</span>
	</button>
);

const NewAddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<Card className="p-6">
		<div className="flex items-center gap-2 mb-4">
			<MapPin className="size-5 text-primary" />
			<h3 className="font-semibold">New Address</h3>
		</div>
		<div className="space-y-4">
			<div className="grid @sm:grid-cols-2 gap-4">
				<Field label="Full Name" placeholder="John Doe" />
				<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
			</div>
			<SelectField
				label="Country"
				placeholder="Select country"
				options={countries}
			/>
			<Field label="Street Address" placeholder="123 Main Street" />
			<Field label="Apt / Suite / Unit" placeholder="Optional" />
			<div className="grid @sm:grid-cols-3 gap-4">
				<Field label="City" placeholder="City" />
				<SelectField label="State" placeholder="State" options={states} />
				<Field label="ZIP" placeholder="12345" />
			</div>
			<div className="flex gap-3 pt-2">
				<Button variant="outline" className="flex-1">
					Cancel
				</Button>
				<Button className="flex-1">Save Address</Button>
			</div>
		</div>
	</Card>
);

export default function Main() {
	const savedAddresses = [
		{
			id: 'home',
			type: 'home' as const,
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
			isDefault: true,
		},
		{
			id: 'work',
			type: 'work' as const,
			name: 'John Doe',
			address: '456 Market Street, Suite 100, San Francisco, CA 94103',
			phone: '+1 (555) 987-6543',
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
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">
						Select Delivery Address
					</h1>
					<p className="text-muted-foreground mt-1">
						Choose from your saved addresses or add a new one
					</p>
				</div>

				<div className="grid @lg:grid-cols-2 gap-6">
					<div>
						<h2 className="text-sm font-medium text-muted-foreground mb-4">
							Saved Addresses
						</h2>
						<RadioGroup defaultValue="home" className="space-y-4">
							{savedAddresses.map((addr) => (
								<SavedAddressCard key={addr.id} {...addr} />
							))}
						</RadioGroup>
						<div className="mt-4">
							<NewAddressButton />
						</div>
					</div>

					<div>
						<h2 className="text-sm font-medium text-muted-foreground mb-4">
							Or Add New
						</h2>
						<NewAddressForm countries={countries} states={states} />
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex justify-between">
					<Button variant="outline" size="lg">
						Back
					</Button>
					<Button size="lg">Continue to Shipping</Button>
				</div>
			</div>
		</section>
	);
}
