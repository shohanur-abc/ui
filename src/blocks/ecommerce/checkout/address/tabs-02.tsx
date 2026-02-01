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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Home, Briefcase, MapPin, Plus, ArrowRight } from 'lucide-react';

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
	value: string;
	icon: React.ElementType;
	label: string;
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
	value,
	icon: Icon,
	label,
	address,
	isDefault,
}: SavedAddressProps) => (
	<label className="flex items-start gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={value} className="mt-1" />
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2 mb-1">
				<span className="font-medium">{label}</span>
				{isDefault && (
					<Badge variant="secondary" className="text-xs">
						Default
					</Badge>
				)}
			</div>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
	</label>
);

const SavedAddresses = () => (
	<div className="space-y-4">
		<RadioGroup defaultValue="home" className="space-y-3">
			<SavedAddressCard
				value="home"
				icon={Home}
				label="Home"
				address="123 Main Street, Apt 4B, San Francisco, CA 94102"
				isDefault
			/>
			<SavedAddressCard
				value="work"
				icon={Briefcase}
				label="Work"
				address="456 Corporate Blvd, Suite 100, San Francisco, CA 94105"
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
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
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
						<div className="flex items-center gap-3">
							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
								<MapPin className="size-6 text-primary" />
							</div>
							<div>
								<CardTitle>Shipping Address</CardTitle>
								<p className="text-sm text-muted-foreground">
									Choose or add a delivery address
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="saved">
							<TabsList className="w-full grid grid-cols-2 mb-6">
								<TabsTrigger value="saved">
									<MapPin className="size-4 mr-2" />
									Saved Addresses
								</TabsTrigger>
								<TabsTrigger value="new">
									<Plus className="size-4 mr-2" />
									New Address
								</TabsTrigger>
							</TabsList>

							<TabsContent value="saved">
								<SavedAddresses />
							</TabsContent>

							<TabsContent value="new">
								<NewAddressForm countries={countries} states={states} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Delivery
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
