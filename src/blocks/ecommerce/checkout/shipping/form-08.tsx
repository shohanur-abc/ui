import { Globe2, Lock, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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

const SecureBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-1.5 py-1 px-3">
		<Icon className="size-3.5" />
		{text}
	</Badge>
);

const SectionDivider = ({ label }: { label: string }) => (
	<div className="relative py-6">
		<div className="absolute inset-0 flex items-center">
			<span className="w-full border-t" />
		</div>
		<div className="relative flex justify-center text-xs uppercase">
			<span className="bg-background px-3 text-muted-foreground font-medium">{label}</span>
		</div>
	</div>
);

const LabelWithTooltip = ({
	label,
	tooltip,
}: {
	label: string;
	tooltip: string;
}) => (
	<TooltipProvider>
		<div className="flex items-center gap-1.5">
			<Label>{label}</Label>
			<Tooltip>
				<TooltipTrigger asChild>
					<Info className="size-3.5 text-muted-foreground cursor-help" />
				</TooltipTrigger>
				<TooltipContent>
					<p className="max-w-xs text-sm">{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		</div>
	</TooltipProvider>
);

const InputField = ({
	label,
	placeholder,
	tooltip,
	type = 'text',
}: {
	label: string;
	placeholder: string;
	tooltip?: string;
	type?: string;
}) => (
	<div className="space-y-2">
		{tooltip ? (
			<LabelWithTooltip label={label} tooltip={tooltip} />
		) : (
			<Label>{label}</Label>
		)}
		<Input type={type} placeholder={placeholder} className="h-11" />
	</div>
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
				{countries.map((country) => (
					<SelectItem key={country.value} value={country.value}>
						<span className="flex items-center gap-2">
							<span>{country.flag}</span>
							<span>{country.label}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const SubmitButton = ({
	label,
	secureText,
}: {
	label: string;
	secureText: string;
}) => (
	<div className="space-y-3 pt-4">
		<Button className="w-full h-12 text-base">{label}</Button>
		<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
			<Lock className="size-3.5" />
			<span>{secureText}</span>
		</div>
	</div>
);

export default function Main() {
	const countries = [
		{ value: 'us', label: 'United States', flag: '🇺🇸' },
		{ value: 'ca', label: 'Canada', flag: '🇨🇦' },
		{ value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
		{ value: 'de', label: 'Germany', flag: '🇩🇪' },
		{ value: 'fr', label: 'France', flag: '🇫🇷' },
		{ value: 'au', label: 'Australia', flag: '🇦🇺' },
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-2 mb-4">
						<Globe2 className="size-6 text-primary" />
						<h1 className="text-2xl font-bold">International Shipping</h1>
					</div>
					<p className="text-muted-foreground">We ship worldwide to 190+ countries</p>
					<div className="flex items-center justify-center gap-2 mt-4">
						<SecureBadge icon={Lock} text="Secure Form" />
					</div>
				</div>

				<div className="bg-card border rounded-2xl p-6 @md:p-8 shadow-sm space-y-4">
					<CountrySelect
						label="Country / Region"
						placeholder="Select your country"
						countries={countries}
					/>

					<SectionDivider label="Contact Information" />

					<div className="grid @sm:grid-cols-2 gap-4">
						<InputField label="First Name" placeholder="John" />
						<InputField label="Last Name" placeholder="Doe" />
					</div>

					<InputField
						label="Email"
						placeholder="john@example.com"
						type="email"
						tooltip="We'll send shipping updates to this email"
					/>

					<InputField
						label="Phone"
						placeholder="+1 555 000 0000"
						type="tel"
						tooltip="Required for international deliveries"
					/>

					<SectionDivider label="Shipping Address" />

					<InputField label="Address Line 1" placeholder="Street address, company name" />
					<InputField label="Address Line 2" placeholder="Apartment, suite, unit (optional)" />

					<div className="grid @sm:grid-cols-3 gap-4">
						<InputField label="City" placeholder="City" />
						<InputField label="State / Province" placeholder="State" />
						<InputField label="Postal Code" placeholder="ZIP / Postal" />
					</div>

					<SubmitButton
						label="Continue to Shipping Options"
						secureText="Your data is encrypted and secure"
					/>
				</div>
			</div>
		</section>
	);
}
