'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
	User,
	Briefcase,
	Gift,
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

const PersonalAddressForm = ({
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
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="save-personal" />
			<Label htmlFor="save-personal" className="text-sm font-normal cursor-pointer">
				Save as my default address
			</Label>
		</div>
	</div>
);

const BusinessAddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<Field label="Company Name" placeholder="Acme Corporation" />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Contact Name" placeholder="John Doe" />
			<Field label="Tax ID / VAT" placeholder="XX-XXXXXXX" />
		</div>
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="456 Corporate Blvd" />
		<Field label="Suite / Floor" placeholder="Suite 500 (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="flex items-center justify-between pt-2">
			<div>
				<Label className="text-sm">Request Invoice</Label>
				<p className="text-xs text-muted-foreground">
					Get a detailed invoice for your records
				</p>
			</div>
			<Switch />
		</div>
	</div>
);

const GiftAddressForm = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
			<div className="flex items-center gap-2 mb-2">
				<Gift className="size-5 text-primary" />
				<span className="font-medium">Gift Delivery</span>
			</div>
			<p className="text-sm text-muted-foreground">
				Package will be gift-wrapped and prices will be hidden
			</p>
		</div>
		<Field label="Recipient Name" placeholder="Jane Smith" />
		<Field label="Recipient Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<SelectField label="Country" placeholder="Select country" options={countries} />
		<Field label="Street Address" placeholder="789 Gift Lane" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="space-y-2">
			<Label className="text-sm">Gift Message</Label>
			<Textarea
				placeholder="Write a personal message for the recipient..."
				className="min-h-[80px]"
			/>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="gift-receipt" defaultChecked />
			<Label htmlFor="gift-receipt" className="text-sm font-normal cursor-pointer">
				Include gift receipt
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
				<div className="text-center mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold mb-2">
						Delivery Address
					</h1>
					<p className="text-muted-foreground">
						Choose the type of shipping address
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="personal">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="personal" className="gap-2">
									<User className="size-4" />
									<span className="hidden @sm:inline">Personal</span>
								</TabsTrigger>
								<TabsTrigger value="business" className="gap-2">
									<Briefcase className="size-4" />
									<span className="hidden @sm:inline">Business</span>
								</TabsTrigger>
								<TabsTrigger value="gift" className="gap-2">
									<Gift className="size-4" />
									<span className="hidden @sm:inline">Gift</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="personal">
								<PersonalAddressForm countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="business">
								<BusinessAddressForm countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="gift">
								<GiftAddressForm countries={countries} states={states} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Shipping Method
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
