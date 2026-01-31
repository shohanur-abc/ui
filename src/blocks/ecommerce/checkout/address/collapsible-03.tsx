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
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	ChevronDown,
	ChevronUp,
	MapPin,
	Package,
	Edit2,
	CheckCircle,
	ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

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

interface AddressPreviewProps {
	label: string;
	name: string;
	address: string;
	phone: string;
	onEdit: () => void;
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

const AddressPreview = ({
	label,
	name,
	address,
	phone,
	onEdit,
}: AddressPreviewProps) => (
	<div className="p-4 rounded-xl bg-muted/30 border border-border">
		<div className="flex items-start justify-between">
			<div className="flex items-start gap-3">
				<CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
				<div>
					<div className="flex items-center gap-2 mb-1">
						<span className="font-medium">{label}</span>
						<Badge variant="secondary" className="text-xs">
							Saved
						</Badge>
					</div>
					<p className="text-sm">{name}</p>
					<p className="text-sm text-muted-foreground">{address}</p>
					<p className="text-sm text-muted-foreground">{phone}</p>
				</div>
			</div>
			<Button variant="ghost" size="sm" onClick={onEdit}>
				<Edit2 className="size-4" />
			</Button>
		</div>
	</div>
);

const AddressFormCollapsible = ({
	title,
	isOpen,
	onToggle,
	countries,
	states,
	showPreview,
	previewData,
}: {
	title: string;
	isOpen: boolean;
	onToggle: () => void;
	countries: { value: string; label: string }[];
	states: { value: string; label: string }[];
	showPreview?: boolean;
	previewData?: { name: string; address: string; phone: string };
}) => (
	<Collapsible open={isOpen} onOpenChange={onToggle}>
		<CollapsibleTrigger asChild>
			<button
				type="button"
				className="flex items-center justify-between w-full p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors"
			>
				<div className="flex items-center gap-3">
					<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
						<MapPin className="size-5 text-primary" />
					</div>
					<div className="text-left">
						<span className="font-medium block">{title}</span>
						{!isOpen && showPreview && previewData && (
							<span className="text-sm text-muted-foreground">
								{previewData.name} • {previewData.phone}
							</span>
						)}
					</div>
				</div>
				{isOpen ? (
					<ChevronUp className="size-5 text-muted-foreground" />
				) : (
					<ChevronDown className="size-5 text-muted-foreground" />
				)}
			</button>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<Card className="mt-4 border-dashed">
				<CardContent className="pt-6 space-y-4">
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
					<Button className="w-full">Save Address</Button>
				</CardContent>
			</Card>
		</CollapsibleContent>
	</Collapsible>
);

export default function Main() {
	const [shippingOpen, setShippingOpen] = useState(true);
	const [billingOpen, setBillingOpen] = useState(false);
	const [sameAsBilling, setSameAsBilling] = useState(true);

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
					<Badge className="mb-4">Checkout</Badge>
					<h1 className="text-2xl @md:text-3xl font-bold">
						Delivery Information
					</h1>
				</div>

				<div className="space-y-4">
					<AddressFormCollapsible
						title="Shipping Address"
						isOpen={shippingOpen}
						onToggle={() => setShippingOpen(!shippingOpen)}
						countries={countries}
						states={states}
						showPreview={!shippingOpen}
						previewData={{
							name: 'John Doe',
							address: '123 Main St, SF',
							phone: '+1 (555) 000-0000',
						}}
					/>

					<div className="flex items-center gap-2 py-2">
						<Checkbox
							id="billing-same"
							checked={sameAsBilling}
							onCheckedChange={(checked) =>
								setSameAsBilling(checked === true)
							}
						/>
						<Label
							htmlFor="billing-same"
							className="text-sm font-normal cursor-pointer"
						>
							Billing address same as shipping
						</Label>
					</div>

					{!sameAsBilling && (
						<AddressFormCollapsible
							title="Billing Address"
							isOpen={billingOpen}
							onToggle={() => setBillingOpen(!billingOpen)}
							countries={countries}
							states={states}
						/>
					)}
				</div>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Shipping Options
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
