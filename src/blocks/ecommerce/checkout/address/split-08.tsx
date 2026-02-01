'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, User, Building, Hash, Globe } from 'lucide-react';

interface FieldProps {
	label: string;
	placeholder: string;
	type?: string;
	icon: React.ElementType;
}

interface SelectFieldProps {
	label: string;
	placeholder: string;
	options: { value: string; label: string }[];
	icon: React.ElementType;
}

interface MapPreviewProps {
	address: string;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="mb-8">
		<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-1">{subtitle}</p>
	</div>
);

const IconField = ({
	label,
	placeholder,
	type = 'text',
	icon: Icon,
}: FieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input type={type} placeholder={placeholder} className="pl-10" />
		</div>
	</div>
);

const IconSelect = ({
	label,
	placeholder,
	options,
	icon: Icon,
}: SelectFieldProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground z-10" />
			<Select>
				<SelectTrigger className="w-full pl-10">
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
	</div>
);

const MapPreview = ({ address }: MapPreviewProps) => (
	<div className="rounded-xl border border-border overflow-hidden">
		<div className="h-48 @md:h-64 bg-muted flex items-center justify-center">
			<div className="text-center">
				<MapPin className="size-8 text-muted-foreground mx-auto mb-2" />
				<p className="text-sm text-muted-foreground">Map Preview</p>
			</div>
		</div>
		<div className="p-4 bg-card">
			<p className="text-sm font-medium">Delivery Location</p>
			<p className="text-sm text-muted-foreground">{address}</p>
		</div>
	</div>
);

const FormSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div>
		<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
			{title}
		</h3>
		<div className="space-y-4">{children}</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
	];

	const states = [
		{ value: 'ca', label: 'California' },
		{ value: 'ny', label: 'New York' },
		{ value: 'tx', label: 'Texas' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader
					title="Delivery Address"
					subtitle="Where would you like your order delivered?"
				/>

				<div className="grid @lg:grid-cols-5 gap-8 @lg:gap-12">
					<div className="@lg:col-span-3 space-y-8">
						<FormSection title="Contact Information">
							<div className="grid @sm:grid-cols-2 gap-4">
								<IconField label="First Name" placeholder="John" icon={User} />
								<IconField label="Last Name" placeholder="Doe" icon={User} />
							</div>
							<IconField
								label="Email Address"
								placeholder="john@example.com"
								type="email"
								icon={Mail}
							/>
							<IconField
								label="Phone Number"
								placeholder="+1 (555) 000-0000"
								type="tel"
								icon={Phone}
							/>
						</FormSection>

						<Separator />

						<FormSection title="Address Details">
							<IconSelect
								label="Country"
								placeholder="Select country"
								options={countries}
								icon={Globe}
							/>
							<IconField
								label="Street Address"
								placeholder="123 Main Street"
								icon={MapPin}
							/>
							<IconField
								label="Apartment, Suite, Building"
								placeholder="Apt 4B"
								icon={Building}
							/>
							<div className="grid @sm:grid-cols-3 gap-4">
								<IconField
									label="City"
									placeholder="San Francisco"
									icon={Building}
								/>
								<IconSelect
									label="State"
									placeholder="State"
									options={states}
									icon={MapPin}
								/>
								<IconField label="ZIP Code" placeholder="94102" icon={Hash} />
							</div>
						</FormSection>
					</div>

					<div className="@lg:col-span-2">
						<div className="sticky top-6">
							<MapPreview address="Enter address to see preview" />
						</div>
					</div>
				</div>

				<div className="flex flex-col @sm:flex-row gap-3 mt-10 pt-8 border-t border-border">
					<Button variant="outline" size="lg">
						Back to Cart
					</Button>
					<Button size="lg" className="flex-1 @sm:flex-none @sm:min-w-[200px]">
						Save and Continue
					</Button>
				</div>
			</div>
		</section>
	);
}
