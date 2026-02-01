import { Check, MapPin, Plus, Star, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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

type Address = {
	id: string;
	label: string;
	name: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	isDefault: boolean;
};

type AddressField = {
	id: string;
	label: string;
	placeholder: string;
	type?: 'input' | 'select';
	options?: { value: string; label: string }[];
	colSpan?: number;
};

const AddressCard = ({
	id,
	label,
	name,
	street,
	city,
	state,
	zip,
	country,
	isDefault,
}: Address) => (
	<Label
		htmlFor={id}
		className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/30 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
	>
		<RadioGroupItem value={id} id={id} className="sr-only" />
		<div className="flex items-start justify-between">
			<div className="flex items-center gap-2">
				<Badge variant="outline" className="text-xs">
					{label}
				</Badge>
				{isDefault && (
					<Badge className="bg-primary/10 text-primary border-0">
						<Star className="mr-1 size-3" />
						Default
					</Badge>
				)}
			</div>
			<div className="opacity-0 transition-opacity group-hover:opacity-100">
				<Button variant="ghost" size="icon-sm">
					<Trash2 className="size-4 text-destructive" />
				</Button>
			</div>
		</div>
		<div className="space-y-1 text-sm">
			<p className="font-medium">{name}</p>
			<p className="text-muted-foreground">{street}</p>
			<p className="text-muted-foreground">
				{city}, {state} {zip}
			</p>
			<p className="text-muted-foreground">{country}</p>
		</div>
		<div className="pointer-events-none absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border-2 border-muted transition-all group-has-[[data-state=checked]]:border-primary group-has-[[data-state=checked]]:bg-primary">
			<Check className="size-3 text-primary-foreground opacity-0 group-has-[[data-state=checked]]:opacity-100" />
		</div>
	</Label>
);

const FormField = ({
	id,
	label,
	placeholder,
	type = 'input',
	options,
	colSpan = 1,
}: AddressField) => (
	<div className={`space-y-2 ${colSpan === 2 ? '@sm:col-span-2' : ''}`}>
		<Label htmlFor={id} className="text-sm font-medium">
			{label}
		</Label>
		{type === 'input' ? (
			<Input id={id} placeholder={placeholder} />
		) : (
			<Select>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options?.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		)}
	</div>
);

export default function Main() {
	const addresses: Address[] = [
		{
			id: 'home',
			label: 'Home',
			name: 'John Doe',
			street: '123 Main Street, Apt 4B',
			city: 'San Francisco',
			state: 'CA',
			zip: '94102',
			country: 'United States',
			isDefault: true,
		},
		{
			id: 'work',
			label: 'Work',
			name: 'John Doe',
			street: '456 Corporate Plaza, Suite 200',
			city: 'San Francisco',
			state: 'CA',
			zip: '94105',
			country: 'United States',
			isDefault: false,
		},
		{
			id: 'warehouse',
			label: 'Warehouse',
			name: 'Acme Inc.',
			street: '789 Industrial Way',
			city: 'Oakland',
			state: 'CA',
			zip: '94607',
			country: 'United States',
			isDefault: false,
		},
	];

	const formFields: AddressField[] = [
		{
			id: 'fullName',
			label: 'Full Name',
			placeholder: 'Enter full name',
			colSpan: 2,
		},
		{
			id: 'street',
			label: 'Street Address',
			placeholder: 'Enter street address',
			colSpan: 2,
		},
		{ id: 'city', label: 'City', placeholder: 'Enter city' },
		{ id: 'state', label: 'State / Province', placeholder: 'Enter state' },
		{ id: 'zip', label: 'Postal Code', placeholder: 'Enter postal code' },
		{
			id: 'country',
			label: 'Country',
			placeholder: 'Select country',
			type: 'select',
			options: [
				{ value: 'us', label: 'United States' },
				{ value: 'ca', label: 'Canada' },
				{ value: 'uk', label: 'United Kingdom' },
				{ value: 'de', label: 'Germany' },
			],
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card>
						<CardHeader className="border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
										<MapPin className="size-5 text-primary" />
									</div>
									<div>
										<CardTitle>Shipping Addresses</CardTitle>
										<CardDescription>
											Manage your shipping addresses
										</CardDescription>
									</div>
								</div>
								<Button size="sm" className="gap-2">
									<Plus className="size-4" />
									Add Address
								</Button>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<RadioGroup
								defaultValue="home"
								className="grid gap-4 @md:grid-cols-3"
							>
								{addresses.map((address) => (
									<AddressCard key={address.id} {...address} />
								))}
							</RadioGroup>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle>Add New Address</CardTitle>
							<CardDescription>
								Enter the details for a new shipping address
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @sm:grid-cols-2">
								{formFields.map((field) => (
									<FormField key={field.id} {...field} />
								))}
							</div>
							<div className="mt-6 flex justify-end gap-3">
								<Button variant="outline">Cancel</Button>
								<Button className="gap-2">
									<MapPin className="size-4" />
									Save Address
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
