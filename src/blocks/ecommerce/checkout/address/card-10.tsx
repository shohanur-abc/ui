'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { MapPin, Plus, Star, Pencil } from 'lucide-react';

interface AddressProps {
	id: string;
	type: string;
	name: string;
	address: string;
	city: string;
	phone: string;
	isDefault?: boolean;
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

const AddressCard = ({
	id,
	type,
	name,
	address,
	city,
	phone,
	isDefault,
}: AddressProps) => (
	<label className="block cursor-pointer">
		<Card className="h-full transition-all hover:shadow-md has-[:checked]:ring-2 has-[:checked]:ring-primary">
			<CardContent className="pt-6 pb-4">
				<div className="flex items-start gap-3">
					<RadioGroupItem value={id} className="mt-0.5" />
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-2">
							<span className="font-semibold">{type}</span>
							{isDefault && (
								<Badge variant="secondary" className="text-xs gap-1">
									<Star className="size-2.5 fill-current" />
									Default
								</Badge>
							)}
						</div>
						<div className="flex items-start gap-2 text-sm text-muted-foreground">
							<MapPin className="size-3.5 shrink-0 mt-0.5" />
							<div>
								<p className="font-medium text-foreground">{name}</p>
								<p>{address}</p>
								<p>{city}</p>
								<p className="mt-1">{phone}</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className="pt-0">
				<Button variant="ghost" size="sm" className="ml-6 gap-1">
					<Pencil className="size-3" />
					Edit
				</Button>
			</CardFooter>
		</Card>
	</label>
);

const AddAddressDialog = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="h-full border-2 border-dashed cursor-pointer hover:border-primary/40 transition-colors">
				<CardContent className="pt-6 h-full flex flex-col items-center justify-center py-8">
					<div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
						<Plus className="size-5 text-muted-foreground" />
					</div>
					<p className="font-medium">Add New Address</p>
				</CardContent>
			</Card>
		</DialogTrigger>
		<DialogContent className="max-w-lg">
			<DialogHeader>
				<DialogTitle>Add New Address</DialogTitle>
			</DialogHeader>
			<div className="space-y-4 mt-4">
				<div className="grid grid-cols-2 gap-4">
					<Field label="First Name" placeholder="John" />
					<Field label="Last Name" placeholder="Doe" />
				</div>
				<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
				<SelectField
					label="Country"
					placeholder="Select country"
					options={countries}
				/>
				<Field label="Street Address" placeholder="123 Main Street" />
				<Field label="Apt / Suite" placeholder="Optional" />
				<div className="grid grid-cols-3 gap-4">
					<Field label="City" placeholder="City" />
					<SelectField label="State" placeholder="State" options={states} />
					<Field label="ZIP" placeholder="12345" />
				</div>
				<div className="flex gap-3 pt-4">
					<Button variant="outline" className="flex-1">
						Cancel
					</Button>
					<Button className="flex-1">Save Address</Button>
				</div>
			</div>
		</DialogContent>
	</Dialog>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			type: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B',
			city: 'San Francisco, CA 94102',
			phone: '+1 (555) 123-4567',
			isDefault: true,
		},
		{
			id: '2',
			type: 'Office',
			name: 'John Doe',
			address: '456 Market Street, Suite 100',
			city: 'San Francisco, CA 94103',
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
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">
						Choose Delivery Address
					</h1>
					<p className="text-muted-foreground mt-1">
						Select where you&apos;d like your order shipped
					</p>
				</div>

				<RadioGroup defaultValue="1" className="grid @md:grid-cols-3 gap-4">
					{addresses.map((addr) => (
						<AddressCard key={addr.id} {...addr} />
					))}
					<AddAddressDialog countries={countries} states={states} />
				</RadioGroup>

				<div className="flex gap-3 mt-8">
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
