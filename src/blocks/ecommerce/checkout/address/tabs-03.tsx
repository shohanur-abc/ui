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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Globe,
	MapPin,
	Building,
	ArrowRight,
	AlertCircle,
} from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	description?: string;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
}

const Field = ({
	label,
	placeholder,
	type = 'text',
	description,
}: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Input type={type} placeholder={placeholder} />
		{description && (
			<p className="text-xs text-muted-foreground">{description}</p>
		)}
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

const DomesticForm = ({
	states,
}: {
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="First Name" placeholder="John" />
			<Field label="Last Name" placeholder="Doe" />
		</div>
		<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		<Field label="Street Address" placeholder="123 Main Street" />
		<Field label="Apt / Suite" placeholder="Apt 4B (Optional)" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
			<p className="text-sm text-green-600 dark:text-green-400">
				✓ Free standard shipping on domestic orders over $50
			</p>
		</div>
	</div>
);

const InternationalForm = ({
	countries,
}: {
	countries: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
			<AlertCircle className="size-5 text-yellow-500 shrink-0 mt-0.5" />
			<div className="text-sm">
				<p className="font-medium text-yellow-600 dark:text-yellow-400">
					International Shipping Notice
				</p>
				<p className="text-muted-foreground">
					Additional customs fees may apply based on destination country
				</p>
			</div>
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Full Name" placeholder="As shown on ID" />
			<Field label="Phone" placeholder="Include country code" type="tel" />
		</div>
		<SelectField
			label="Country / Region"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Address Line 1" placeholder="Street address" />
		<Field label="Address Line 2" placeholder="Additional details (Optional)" />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="City / Town" placeholder="City" />
			<Field label="Province / Region" placeholder="Province" />
		</div>
		<Field label="Postal Code" placeholder="Postal / ZIP code" />
		<Separator />
		<Field
			label="Tax ID / VAT Number"
			placeholder="Optional"
			description="May help with customs clearance"
		/>
	</div>
);

const PoBoxForm = ({
	states,
}: {
	states: { value: string; label: string }[];
}) => (
	<div className="space-y-4">
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Full Name" placeholder="John Doe" />
			<Field label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
		</div>
		<Field label="P.O. Box Number" placeholder="P.O. Box 1234" />
		<div className="grid @sm:grid-cols-3 gap-4">
			<Field label="City" placeholder="City" />
			<SelectField label="State" placeholder="State" options={states} />
			<Field label="ZIP" placeholder="12345" />
		</div>
		<div className="p-4 rounded-lg bg-muted/50 border border-border">
			<p className="text-sm text-muted-foreground">
				⚠️ Some items may not be eligible for P.O. Box delivery. 
				We&apos;ll notify you if any items require a street address.
			</p>
		</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'fr', label: 'France' },
		{ value: 'de', label: 'Germany' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'uk', label: 'United Kingdom' },
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
						Choose your address type
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Tabs defaultValue="domestic">
							<TabsList className="w-full grid grid-cols-3 mb-6">
								<TabsTrigger value="domestic" className="text-sm">
									<MapPin className="size-4 mr-1.5" />
									<span className="hidden @sm:inline">Domestic</span>
								</TabsTrigger>
								<TabsTrigger value="international" className="text-sm">
									<Globe className="size-4 mr-1.5" />
									<span className="hidden @sm:inline">International</span>
								</TabsTrigger>
								<TabsTrigger value="pobox" className="text-sm">
									<Building className="size-4 mr-1.5" />
									<span className="hidden @sm:inline">P.O. Box</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="domestic">
								<DomesticForm states={states} />
							</TabsContent>

							<TabsContent value="international">
								<InternationalForm countries={countries} />
							</TabsContent>

							<TabsContent value="pobox">
								<PoBoxForm states={states} />
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
