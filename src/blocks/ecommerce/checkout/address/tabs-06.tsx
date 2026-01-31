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
import {
	MapPin,
	FileText,
	ArrowRight,
	CheckCircle2,
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

const AddressTab = ({
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
		<Field label="Email" placeholder="john@example.com" type="email" required />
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
			<Checkbox id="save-address" />
			<Label htmlFor="save-address" className="text-sm font-normal cursor-pointer">
				Save for future orders
			</Label>
		</div>
	</div>
);

const ReviewTab = () => (
	<div className="space-y-6">
		<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
			<div className="flex items-center gap-3">
				<CheckCircle2 className="size-5 text-green-500" />
				<span className="font-medium text-green-600 dark:text-green-400">
					Address validated successfully
				</span>
			</div>
		</div>

		<div className="space-y-4">
			<h3 className="font-semibold flex items-center gap-2">
				<MapPin className="size-4" />
				Shipping Address
			</h3>
			<div className="p-4 rounded-xl border border-border bg-muted/30">
				<p className="font-medium">John Doe</p>
				<p className="text-sm text-muted-foreground mt-1">
					123 Main Street, Apt 4B
				</p>
				<p className="text-sm text-muted-foreground">
					San Francisco, CA 94102
				</p>
				<p className="text-sm text-muted-foreground">United States</p>
				<p className="text-sm text-muted-foreground mt-2">
					+1 (555) 000-0000
				</p>
			</div>
		</div>

		<Separator />

		<div className="space-y-4">
			<h3 className="font-semibold flex items-center gap-2">
				<FileText className="size-4" />
				Billing Address
			</h3>
			<div className="flex items-center gap-2">
				<Badge variant="secondary">Same as shipping</Badge>
			</div>
		</div>

		<div className="flex items-center gap-2 pt-2">
			<Checkbox id="terms" required />
			<Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
				I confirm my address is correct
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
						Checkout Address
					</h1>
					<p className="text-muted-foreground">
						Enter your address and review before continuing
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="address">
							<TabsList className="w-full grid grid-cols-2 mb-6">
								<TabsTrigger value="address" className="gap-2">
									<MapPin className="size-4" />
									Enter Address
								</TabsTrigger>
								<TabsTrigger value="review" className="gap-2">
									<FileText className="size-4" />
									Review
								</TabsTrigger>
							</TabsList>

							<TabsContent value="address">
								<AddressTab countries={countries} states={states} />
							</TabsContent>

							<TabsContent value="review">
								<ReviewTab />
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
