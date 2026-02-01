import { MapPin, Search, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SavedAddressCard = ({
	value,
	type,
	name,
	address,
	isDefault,
}: {
	value: string;
	type: string;
	name: string;
	address: string;
	isDefault?: boolean;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-4 p-4 rounded-xl border-2 border-transparent bg-muted/50 cursor-pointer transition-all hover:border-primary/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<span className="font-semibold">{type}</span>
				{isDefault && (
					<span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
						Default
					</span>
				)}
			</div>
			<p className="text-sm text-foreground mt-1">{name}</p>
			<p className="text-sm text-muted-foreground truncate">{address}</p>
		</div>
	</Label>
);

const AddNewAddressButton = ({ label }: { label: string }) => (
	<button
		type="button"
		className="flex items-center justify-center gap-2 w-full p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
	>
		<Plus className="size-5" />
		<span className="font-medium">{label}</span>
	</button>
);

const SearchInput = ({ placeholder }: { placeholder: string }) => (
	<div className="relative">
		<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
		<Input placeholder={placeholder} className="pl-10 h-11" />
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const FooterActions = ({
	cancelLabel,
	submitLabel,
}: {
	cancelLabel: string;
	submitLabel: string;
}) => (
	<div className="flex gap-3 pt-6">
		<Button variant="outline" className="flex-1">
			{cancelLabel}
		</Button>
		<Button className="flex-1">{submitLabel}</Button>
	</div>
);

export default function Main() {
	const savedAddresses = [
		{
			value: 'home',
			type: 'Home',
			name: 'John Doe',
			address: '123 Main Street, Apt 4B, New York, NY 10001',
			isDefault: true,
		},
		{
			value: 'work',
			type: 'Work',
			name: 'John Doe',
			address: '456 Business Ave, Floor 12, New York, NY 10002',
			isDefault: false,
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<MapPin className="size-5" />
					</div>
					<div>
						<h1 className="text-xl font-bold">Select Shipping Address</h1>
						<p className="text-sm text-muted-foreground">
							Choose from saved addresses or add new
						</p>
					</div>
				</div>

				<Card>
					<CardContent className="p-6 space-y-6">
						<SearchInput placeholder="Search addresses..." />

						<RadioGroup defaultValue="home" className="space-y-3">
							{savedAddresses.map((addr) => (
								<SavedAddressCard key={addr.value} {...addr} />
							))}
						</RadioGroup>

						<AddNewAddressButton label="Add New Address" />

						<Separator />

						<div className="space-y-4">
							<h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
								Or enter manually
							</h3>
							<FormField label="Full Name" placeholder="Enter full name" />
							<FormField label="Address" placeholder="Street address" />
							<div className="grid @sm:grid-cols-3 gap-4">
								<FormField label="City" placeholder="City" />
								<FormField label="State" placeholder="State" />
								<FormField label="ZIP" placeholder="ZIP code" />
							</div>
						</div>

						<FooterActions
							cancelLabel="Cancel"
							submitLabel="Use This Address"
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
