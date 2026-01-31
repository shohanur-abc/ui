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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	Globe,
	DollarSign,
	FileText,
	ArrowRight,
	AlertTriangle,
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

const SectionIcon = ({
	icon: Icon,
	title,
	warning,
}: {
	icon: React.ElementType;
	title: string;
	warning?: boolean;
}) => (
	<div className="flex items-center gap-3 flex-1">
		<div
			className={`size-10 rounded-lg flex items-center justify-center ${
				warning ? 'bg-yellow-500/10' : 'bg-primary/10'
			}`}
		>
			<Icon className={`size-5 ${warning ? 'text-yellow-500' : 'text-primary'}`} />
		</div>
		<span className="font-semibold">{title}</span>
	</div>
);

const InternationalAddressForm = ({
	countries,
}: {
	countries: { value: string; label: string }[];
}) => (
	<div className="space-y-4 pt-4">
		<SelectField
			label="Country / Region"
			placeholder="Select country"
			options={countries}
		/>
		<Field label="Full Name" placeholder="As it appears on official documents" />
		<Field label="Address Line 1" placeholder="Street address" />
		<Field label="Address Line 2" placeholder="Additional details (Optional)" />
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="City / Town" placeholder="City" />
			<Field label="Province / Region" placeholder="Province or region" />
		</div>
		<div className="grid @sm:grid-cols-2 gap-4">
			<Field label="Postal Code" placeholder="Postal / ZIP code" />
			<Field
				label="Phone"
				placeholder="+XX XXX XXX XXXX"
				type="tel"
				description="Include country code"
			/>
		</div>
	</div>
);

const CurrencySection = () => {
	const currencies = [
		{ value: 'usd', symbol: '$', label: 'USD - US Dollar' },
		{ value: 'eur', symbol: '€', label: 'EUR - Euro' },
		{ value: 'gbp', symbol: '£', label: 'GBP - British Pound' },
		{ value: 'jpy', symbol: '¥', label: 'JPY - Japanese Yen' },
	];

	return (
		<div className="pt-4 space-y-4">
			<RadioGroup defaultValue="usd" className="space-y-2">
				{currencies.map((currency) => (
					<label
						key={currency.value}
						className="flex items-center gap-4 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
					>
						<RadioGroupItem value={currency.value} />
						<span className="size-8 rounded bg-muted flex items-center justify-center font-bold">
							{currency.symbol}
						</span>
						<span className="font-medium">{currency.label}</span>
					</label>
				))}
			</RadioGroup>
			<div className="p-4 rounded-lg bg-muted/30 border border-border text-sm text-muted-foreground">
				Prices will be converted at checkout. Your bank may apply additional fees.
			</div>
		</div>
	);
};

const CustomsSection = () => (
	<div className="pt-4 space-y-4">
		<div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
			<AlertTriangle className="size-5 text-yellow-500 shrink-0 mt-0.5" />
			<div className="text-sm">
				<p className="font-medium text-yellow-600 dark:text-yellow-400">
					International orders may be subject to customs duties
				</p>
				<p className="text-muted-foreground mt-1">
					Import fees, taxes, and duties are not included in the item price. 
					These charges are the buyer&apos;s responsibility.
				</p>
			</div>
		</div>
		<Field
			label="Tax ID / VAT Number"
			placeholder="Enter your tax identification number (Optional)"
			description="May help with customs clearance in some countries"
		/>
		<Field
			label="EORI Number"
			placeholder="EU businesses only (Optional)"
			description="Required for commercial imports to the EU"
		/>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'fr', label: 'France' },
		{ value: 'de', label: 'Germany' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'au', label: 'Australia' },
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<Badge className="mb-4">International Shipping</Badge>
					<h1 className="text-2xl @md:text-3xl font-bold">
						Shipping to Another Country?
					</h1>
					<p className="text-muted-foreground mt-2">
						We ship to over 100 countries worldwide
					</p>
				</div>

				<Card>
					<CardContent className="pt-6">
						<Accordion type="multiple" defaultValue={['address']}>
							<AccordionItem value="address">
								<AccordionTrigger className="hover:no-underline">
									<SectionIcon icon={Globe} title="International Address" />
								</AccordionTrigger>
								<AccordionContent>
									<InternationalAddressForm countries={countries} />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="currency">
								<AccordionTrigger className="hover:no-underline">
									<SectionIcon icon={DollarSign} title="Currency Preference" />
								</AccordionTrigger>
								<AccordionContent>
									<CurrencySection />
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="customs">
								<AccordionTrigger className="hover:no-underline">
									<SectionIcon
										icon={FileText}
										title="Customs Information"
										warning
									/>
								</AccordionTrigger>
								<AccordionContent>
									<CustomsSection />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardContent>
				</Card>

				<Button size="lg" className="w-full mt-8 gap-2">
					Continue to Shipping Options
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</section>
	);
}
