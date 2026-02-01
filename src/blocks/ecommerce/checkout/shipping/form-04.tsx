import { User, MapPinned, Phone, Mail } from 'lucide-react';

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

const FormSection = ({
	icon: Icon,
	title,
	children,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	children: React.ReactNode;
}) => (
	<div className="space-y-4">
		<div className="flex items-center gap-3 text-primary">
			<Icon className="size-5" />
			<h3 className="font-semibold">{title}</h3>
		</div>
		{children}
	</div>
);

const TextField = ({
	label,
	placeholder,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	type?: string;
}) => (
	<div className="space-y-1.5">
		<Label className="text-xs uppercase tracking-wider text-muted-foreground">
			{label}
		</Label>
		<Input type={type} placeholder={placeholder} className="h-12" />
	</div>
);

const SelectInput = ({
	label,
	placeholder,
	options,
}: {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}) => (
	<div className="space-y-1.5">
		<Label className="text-xs uppercase tracking-wider text-muted-foreground">
			{label}
		</Label>
		<Select>
			<SelectTrigger className="h-12 w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((opt) => (
					<SelectItem key={opt.value} value={opt.value}>
						{opt.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const CheckboxField = ({ id, label }: { id: string; label: string }) => (
	<div className="flex items-center space-x-3">
		<Checkbox id={id} />
		<Label htmlFor={id} className="text-sm font-normal cursor-pointer">
			{label}
		</Label>
	</div>
);

const SubmitSection = ({
	checkboxLabel,
	buttonLabel,
}: {
	checkboxLabel: string;
	buttonLabel: string;
}) => (
	<div className="space-y-4 pt-6 border-t">
		<CheckboxField id="save-address" label={checkboxLabel} />
		<Button className="w-full h-12 text-base font-semibold">
			{buttonLabel}
		</Button>
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
		{ value: 'ny', label: 'New York' },
		{ value: 'tx', label: 'Texas' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Where should we ship?
					</h1>
					<p className="text-muted-foreground">
						Enter your delivery address below
					</p>
				</div>

				<div className="rounded-2xl bg-card border shadow-sm p-6 @md:p-8 space-y-8">
					<FormSection icon={User} title="Contact Details">
						<div className="grid @sm:grid-cols-2 gap-4">
							<TextField label="First Name" placeholder="John" />
							<TextField label="Last Name" placeholder="Doe" />
						</div>
					</FormSection>

					<FormSection icon={Mail} title="Email">
						<TextField
							label="Email Address"
							placeholder="john@example.com"
							type="email"
						/>
					</FormSection>

					<FormSection icon={Phone} title="Phone">
						<TextField
							label="Phone Number"
							placeholder="+1 (555) 123-4567"
							type="tel"
						/>
					</FormSection>

					<FormSection icon={MapPinned} title="Delivery Address">
						<div className="space-y-4">
							<TextField label="Street Address" placeholder="123 Main Street" />
							<TextField label="Apt, Suite, Unit" placeholder="Apartment 4B" />
							<div className="grid @sm:grid-cols-2 gap-4">
								<TextField label="City" placeholder="San Francisco" />
								<TextField label="Postal Code" placeholder="94102" />
							</div>
							<div className="grid @sm:grid-cols-2 gap-4">
								<SelectInput
									label="State"
									placeholder="Select state"
									options={states}
								/>
								<SelectInput
									label="Country"
									placeholder="Select country"
									options={countries}
								/>
							</div>
						</div>
					</FormSection>

					<SubmitSection
						checkboxLabel="Save this address for future orders"
						buttonLabel="Continue to Shipping Method"
					/>
				</div>
			</div>
		</section>
	);
}
