'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Home, Briefcase, Building, Check, Plus } from 'lucide-react';

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

interface SavedAddressProps {
	icon: React.ElementType;
	type: string;
	address: string;
	isDefault?: boolean;
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

const SavedAddressCard = ({
	icon: Icon,
	type,
	address,
	isDefault,
}: SavedAddressProps) => (
	<label className="flex items-start gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={type.toLowerCase()} className="mt-1" />
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<Icon className="size-4 text-primary" />
				<span className="font-medium">{type}</span>
				{isDefault && (
					<Badge variant="secondary" className="text-xs">
						Default
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
		<Button variant="ghost" size="sm" className="text-xs">
			Edit
		</Button>
	</label>
);

const SavedAddressesSection = () => (
	<div className="pt-4">
		<RadioGroup defaultValue="home" className="space-y-3">
			<SavedAddressCard
				icon={Home}
				type="Home"
				address="123 Main Street, Apt 4B, San Francisco, CA 94102"
				isDefault
			/>
			<SavedAddressCard
				icon={Briefcase}
				type="Work"
				address="456 Corporate Blvd, Suite 100, San Francisco, CA 94105"
			/>
			<SavedAddressCard
				icon={Building}
				type="Office"
				address="789 Business Center, Floor 5, San Francisco, CA 94108"
			/>
		</RadioGroup>
	</div>
);

const NewAddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<div className="grid @sm:grid-cols-2 gap-4">
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
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex flex-wrap gap-4 pt-2">
			<div className="flex items-center gap-2">
				<Checkbox id="save-address" />
				<Label
					htmlFor="save-address"
					className="text-sm font-normal cursor-pointer"
				>
					Save this address
				</Label>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id="default-address" />
				<Label
					htmlFor="default-address"
					className="text-sm font-normal cursor-pointer"
				>
					Set as default
				</Label>
			</div>
		</div>
	</div>
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

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Shipping Address</CardTitle>
						<p className="text-sm text-muted-foreground">
							Select a saved address or add a new one
						</p>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible defaultValue="saved">
							<AccordionItem value="saved">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Check className="size-4 text-primary" />
										<span>Saved Addresses</span>
										<Badge variant="outline" className="ml-2">
											3
										</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<SavedAddressesSection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="new">
								<AccordionTrigger className="hover:no-underline">
									<div className="flex items-center gap-2">
										<Plus className="size-4" />
										<span>Add New Address</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<NewAddressForm countries={countries} states={states} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8">
					Continue to Delivery Options
				</Button>
			</div>
		</section>
	);
}
