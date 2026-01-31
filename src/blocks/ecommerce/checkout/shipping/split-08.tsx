import { Globe, Plane, Ship, AlertTriangle, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const ShippingMethodCard = ({
	value,
	icon: Icon,
	name,
	time,
	price,
	description,
}: {
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	time: string;
	price: string;
	description: string;
}) => (
	<Label
		htmlFor={value}
		className="flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
	>
		<RadioGroupItem value={value} id={value} className="mt-1" />
		<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
			<Icon className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1">
			<div className="flex items-start justify-between">
				<div>
					<span className="font-semibold">{name}</span>
					<p className="text-sm text-muted-foreground">{time}</p>
				</div>
				<span className="font-bold text-primary">{price}</span>
			</div>
			<p className="text-sm text-muted-foreground mt-2">{description}</p>
		</div>
	</Label>
);

const CountrySelect = ({
	label,
	placeholder,
	countries,
}: {
	label: string;
	placeholder: string;
	countries: { value: string; label: string; flag: string }[];
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select>
			<SelectTrigger className="h-11 w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{countries.map((c) => (
					<SelectItem key={c.value} value={c.value}>
						<span className="flex items-center gap-2">
							<span>{c.flag}</span>
							{c.label}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const FormField = ({
	label,
	placeholder,
	type = 'text',
	tooltip,
}: {
	label: string;
	placeholder: string;
	type?: string;
	tooltip?: string;
}) => (
	<div className="space-y-2">
		<TooltipProvider>
			<div className="flex items-center gap-1.5">
				<Label>{label}</Label>
				{tooltip && (
					<Tooltip>
						<TooltipTrigger>
							<Info className="size-3.5 text-muted-foreground" />
						</TooltipTrigger>
						<TooltipContent>
							<p className="max-w-xs">{tooltip}</p>
						</TooltipContent>
					</Tooltip>
				)}
			</div>
		</TooltipProvider>
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
);

const ImportNotice = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<Alert className="border-amber-500/50 bg-amber-500/10">
		<AlertTriangle className="size-4 text-amber-500" />
		<AlertTitle className="text-amber-700 dark:text-amber-400">{title}</AlertTitle>
		<AlertDescription className="text-amber-700/80 dark:text-amber-400/80">
			{description}
		</AlertDescription>
	</Alert>
);

export default function Main() {
	const shippingMethods = [
		{
			value: 'express-air',
			icon: Plane,
			name: 'Express Air',
			time: '3-5 business days',
			price: '$49.99',
			description: 'Fastest international delivery via air freight',
		},
		{
			value: 'standard-air',
			icon: Plane,
			name: 'Standard Air',
			time: '7-10 business days',
			price: '$29.99',
			description: 'Reliable air shipping at a lower cost',
		},
		{
			value: 'economy-sea',
			icon: Ship,
			name: 'Economy Sea',
			time: '20-30 business days',
			price: '$14.99',
			description: 'Most economical option for non-urgent orders',
		},
	];

	const countries = [
		{ value: 'jp', label: 'Japan', flag: '🇯🇵' },
		{ value: 'de', label: 'Germany', flag: '🇩🇪' },
		{ value: 'gb', label: 'United Kingdom', flag: '🇬🇧' },
		{ value: 'au', label: 'Australia', flag: '🇦🇺' },
		{ value: 'br', label: 'Brazil', flag: '🇧🇷' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex items-center gap-3 mb-8">
					<Globe className="size-8 text-primary" />
					<div>
						<h1 className="text-2xl font-bold">International Shipping</h1>
						<p className="text-muted-foreground">Shipping to 150+ countries worldwide</p>
					</div>
				</div>

				<div className="grid @xl:grid-cols-2 gap-8">
					<div className="space-y-6">
						<div className="rounded-2xl border bg-card p-6 space-y-5">
							<h3 className="font-semibold text-lg">Delivery Address</h3>

							<CountrySelect
								label="Country / Region"
								placeholder="Select destination country"
								countries={countries}
							/>

							<div className="grid @sm:grid-cols-2 gap-4">
								<FormField label="First Name" placeholder="John" />
								<FormField label="Last Name" placeholder="Doe" />
							</div>

							<FormField label="Address Line 1" placeholder="Street address" />
							<FormField label="Address Line 2" placeholder="Apartment, suite, unit" />

							<div className="grid @sm:grid-cols-3 gap-4">
								<FormField label="City" placeholder="City" />
								<FormField label="State / Province" placeholder="State" />
								<FormField
									label="Postal Code"
									placeholder="Postal code"
									tooltip="Include country-specific postal format"
								/>
							</div>

							<FormField
								label="Phone (with country code)"
								placeholder="+81 90 1234 5678"
								type="tel"
								tooltip="Required for international customs clearance"
							/>
						</div>

						<ImportNotice
							title="Import Duties & Taxes"
							description="International orders may be subject to import duties and taxes, which are the responsibility of the recipient. These fees are collected by the carrier upon delivery."
						/>
					</div>

					<div className="space-y-6">
						<div className="rounded-2xl border bg-card p-6">
							<h3 className="font-semibold text-lg mb-4">Shipping Method</h3>
							<RadioGroup defaultValue="express-air" className="space-y-4">
								{shippingMethods.map((method) => (
									<ShippingMethodCard key={method.value} {...method} />
								))}
							</RadioGroup>
						</div>

						<div className="flex gap-3">
							<Button variant="outline" className="flex-1">Back</Button>
							<Button className="flex-1">Continue to Payment</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
