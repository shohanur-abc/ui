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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Building2,
	Home,
	MapPin,
	ArrowRight,
	FileText,
	CreditCard,
} from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	required?: boolean;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
	required?: boolean;
}

const Field = ({
	label,
	placeholder,
	type = 'text',
	required = false,
}: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
		<Input type={type} placeholder={placeholder} required={required} />
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
	required = false,
}: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
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

const ResidentialTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" required />
			<Field label="Last Name" placeholder="Doe" required />
		</div>
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" required />
		<Separator />
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
			required
		/>
		<Field label="Street Address" placeholder="123 Main Street" required />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" required />
			<SelectField label="State" placeholder="State" options={states} required />
			<Field label="ZIP" placeholder="12345" required />
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="set-default" />
			<Label htmlFor="set-default" className="text-sm font-normal cursor-pointer">
				Set as default address
			</Label>
		</div>
	</div>
);

const CommercialTab = ({
	countries,
	states,
}: {
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
			<div className="flex items-center gap-2 mb-2">
				<Building2 className="size-5 text-blue-500" />
				<span className="font-medium text-blue-600 dark:text-blue-400">
					Business Delivery
				</span>
			</div>
			<p className="text-sm text-muted-foreground">
				Delivery only during business hours (9AM - 5PM, Mon-Fri)
			</p>
		</div>
		<Field label="Company Name" placeholder="Acme Corporation" required />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Attention To" placeholder="John Doe" required />
			<Field label="Department" placeholder="Receiving Dept (Optional)" />
		</div>
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" required />
		<Separator />
		<SelectField
			label="Country"
			placeholder="Select country"
			options={countries}
			required
		/>
		<Field label="Street Address" placeholder="456 Corporate Blvd" required />
		<Field label="Suite / Floor" placeholder="Suite 500" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" required />
			<SelectField label="State" placeholder="State" options={states} required />
			<Field label="ZIP" placeholder="12345" required />
		</div>
		<div className="p-4 rounded-xl border border-border space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<FileText className="size-4 text-muted-foreground" />
					<Label className="text-sm">Request Invoice</Label>
				</div>
				<Switch />
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<CreditCard className="size-4 text-muted-foreground" />
					<Label className="text-sm">Net 30 Terms</Label>
				</div>
				<Badge variant="outline">Enterprise Only</Badge>
			</div>
		</div>
	</div>
);

const APOFPOTab = ({
	states,
}: {
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
			<div className="flex items-center gap-2 mb-2">
				<MapPin className="size-5 text-amber-500" />
				<span className="font-medium text-amber-600 dark:text-amber-400">
					Military Address (APO/FPO/DPO)
				</span>
			</div>
			<p className="text-sm text-muted-foreground">
				Special shipping for military personnel overseas
			</p>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Grade / Rank" placeholder="SGT" />
			<Field label="Full Name" placeholder="John Doe" required />
		</div>
		<Field label="Unit / CMR / PSC Box" placeholder="PSC 1234, Box 5678" required />
		<SelectField
			label="APO/FPO/DPO"
			placeholder="Select type"
			options={[
				{ value: 'apo', label: 'APO (Army/Air Force Post Office)' },
				{ value: 'fpo', label: 'FPO (Fleet Post Office)' },
				{ value: 'dpo', label: 'DPO (Diplomatic Post Office)' },
			]}
			required
		/>
		<div className="grid @sm:grid-cols-2 gap-4">
			<SelectField
				label="State"
				placeholder="Select state"
				options={[
					{ value: 'aa', label: 'AA (Armed Forces Americas)' },
					{ value: 'ae', label: 'AE (Armed Forces Europe)' },
					{ value: 'ap', label: 'AP (Armed Forces Pacific)' },
				]}
				required
			/>
			<Field label="ZIP" placeholder="09XXX" required />
		</div>
		<Separator />
		<div className="p-4 rounded-xl bg-muted/30 border border-border">
			<p className="text-sm text-muted-foreground">
				⚠️ Some items may have shipping restrictions to APO/FPO addresses.
				Allow 2-3 weeks for delivery.
			</p>
		</div>
		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="customs-form" />
			<Label htmlFor="customs-form" className="text-sm font-normal cursor-pointer">
				I understand customs forms may be required
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
						Shipping Address
					</h1>
					<p className="text-muted-foreground">Select your address type</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="residential">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="residential" className="gap-2">
									<Home className="size-4" />
									<span className="hidden @sm:inline">Home</span>
								</TabsTrigger>
								<TabsTrigger value="commercial" className="gap-2">
									<Building2 className="size-4" />
									<span className="hidden @sm:inline">Business</span>
								</TabsTrigger>
								<TabsTrigger value="apo" className="gap-2">
									<MapPin className="size-4" />
									<span className="hidden @sm:inline">Military</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="residential">
								<ResidentialTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="commercial">
								<CommercialTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="apo">
								<APOFPOTab states={states} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Delivery Options
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
