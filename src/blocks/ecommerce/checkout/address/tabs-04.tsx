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
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import {
	Truck,
	Clock,
	Zap,
	Leaf,
	ArrowRight,
} from 'lucide-react';

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

interface ShippingOptionProps {
	value: string;
	icon: React.ElementType;
	label: string;
	time: string;
	price: string;
	tag?: string;
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

const ShippingOption = ({
	value,
	icon: Icon,
	label,
	time,
	price,
	tag,
}: ShippingOptionProps) => (
	<label className="flex items-center gap-4 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
		<RadioGroupItem value={value} />
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<span className="font-medium">{label}</span>
				{tag && (
					<Badge
						variant="secondary"
						className="text-xs bg-green-500/10 text-green-600 dark:text-green-400"
					>
						{tag}
					</Badge>
				)}
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-3" />
				<span>{time}</span>
			</div>
		</div>
		<span className="font-bold">{price}</span>
	</label>
);

const AddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Email" placeholder="john@example.com" type="email" />
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
	</div>
);

const ShippingMethodForm = () => (
	<div className="space-y-4">
		<RadioGroup defaultValue="standard" className="space-y-3">
			<ShippingOption
				value="express"
				icon={Zap}
				label="Express Delivery"
				time="1-2 business days"
				price="$19.99"
			/>
			<ShippingOption
				value="standard"
				icon={Truck}
				label="Standard Shipping"
				time="3-5 business days"
				price="FREE"
				tag="Recommended"
			/>
			<ShippingOption
				value="eco"
				icon={Leaf}
				label="Eco-Friendly"
				time="5-7 business days"
				price="FREE"
				tag="Green"
			/>
		</RadioGroup>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="signature" />
			<Label htmlFor="signature" className="text-sm font-normal cursor-pointer">
				Require signature on delivery (+$4.99)
			</Label>
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
						<CardTitle className="text-2xl">Shipping Details</CardTitle>
						<p className="text-sm text-muted-foreground">
							Enter address and choose delivery speed
						</p>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="address">
							<TabsList className="w-full grid grid-cols-2 mb-6">
								<TabsTrigger value="address" className="gap-2">
									Address
								</TabsTrigger>
								<TabsTrigger value="method" className="gap-2">
									Shipping Method
								</TabsTrigger>
							</TabsList>

							<TabsContent value="address">
								<AddressForm countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="method">
								<ShippingMethodForm />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Payment
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
