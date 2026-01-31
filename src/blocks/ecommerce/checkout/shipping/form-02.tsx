import { Home, Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const AddressTypeCard = ({
	icon: Icon,
	value,
	label,
	description,
	selected,
}: {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
	description: string;
	selected?: boolean;
}) => (
	<Label
		htmlFor={value}
		className={`
			flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all
			hover:border-primary/50 hover:bg-accent/50
			${selected ? 'border-primary bg-primary/5' : 'border-border'}
		`}
	>
		<RadioGroupItem value={value} id={value} />
		<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
			<Icon className="size-5 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<span className="font-medium">{label}</span>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</Label>
);

const FormInput = ({
	label,
	placeholder,
	type = 'text',
	required,
}: {
	label: string;
	placeholder: string;
	type?: string;
	required?: boolean;
}) => (
	<div className="space-y-2">
		<Label>
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
		<Input type={type} placeholder={placeholder} />
	</div>
);

const ActionButtons = ({ items }: { items: { label: string; variant?: 'default' | 'outline' }[] }) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map((item, i) => (
			<Button key={i} variant={item.variant || 'default'} className="flex-1">
				{item.label}
			</Button>
		))}
	</div>
);

export default function Main() {
	const addressTypes = [
		{
			icon: Home,
			value: 'residential',
			label: 'Residential',
			description: 'Home or apartment address',
			selected: true,
		},
		{
			icon: Building2,
			value: 'business',
			label: 'Business',
			description: 'Office or commercial address',
			selected: false,
		},
	];

	const actions = [
		{ label: 'Back', variant: 'outline' as const },
		{ label: 'Save & Continue' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<Card className="border-0 shadow-xl">
					<CardHeader className="text-center pb-8">
						<CardTitle className="text-2xl">Shipping Information</CardTitle>
						<CardDescription>
							Choose your address type and fill in the details
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-8">
						<RadioGroup defaultValue="residential" className="grid @sm:grid-cols-2 gap-4">
							{addressTypes.map((type) => (
								<AddressTypeCard key={type.value} {...type} />
							))}
						</RadioGroup>

						<div className="space-y-4">
							<FormInput label="Full Name" placeholder="Enter your full name" required />
							<FormInput label="Company Name" placeholder="Company (optional)" />
							<FormInput label="Street Address" placeholder="Street address" required />

							<div className="grid @sm:grid-cols-2 gap-4">
								<FormInput label="City" placeholder="City" required />
								<FormInput label="ZIP / Postal Code" placeholder="Postal code" required />
							</div>

							<FormInput label="Phone" placeholder="Phone number" type="tel" required />
						</div>

						<ActionButtons items={actions} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
