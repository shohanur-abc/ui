import { Building2, Globe, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type CompanyField = {
	id: string;
	label: string;
	placeholder: string;
	type: 'input' | 'select' | 'textarea';
	options?: { value: string; label: string }[];
	defaultValue?: string;
};

const FormField = ({ id, label, placeholder, type, options, defaultValue }: CompanyField) => (
	<div className="space-y-2">
		<Label htmlFor={id} className="text-sm font-medium">
			{label}
		</Label>
		{type === 'input' && (
			<Input
				id={id}
				placeholder={placeholder}
				defaultValue={defaultValue}
				className="transition-all focus:ring-2 focus:ring-primary/20"
			/>
		)}
		{type === 'select' && options && (
			<Select defaultValue={defaultValue}>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		)}
		{type === 'textarea' && (
			<Textarea
				id={id}
				placeholder={placeholder}
				defaultValue={defaultValue}
				rows={3}
				className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
			/>
		)}
	</div>
);

const SectionIcon = ({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) => (
	<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
		<Icon className="size-5 text-primary" />
	</div>
);

export default function Main() {
	const companyFields: CompanyField[] = [
		{ id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', type: 'input', defaultValue: 'Acme Inc.' },
		{ id: 'industry', label: 'Industry', placeholder: 'Select industry', type: 'select', options: [
			{ value: 'tech', label: 'Technology' },
			{ value: 'retail', label: 'Retail' },
			{ value: 'healthcare', label: 'Healthcare' },
			{ value: 'finance', label: 'Finance' },
		], defaultValue: 'tech' },
		{ id: 'website', label: 'Website', placeholder: 'https://example.com', type: 'input', defaultValue: 'https://acme.com' },
		{ id: 'description', label: 'Company Description', placeholder: 'Describe your company...', type: 'textarea', defaultValue: 'Leading provider of innovative solutions.' },
	];

	const locationFields: CompanyField[] = [
		{ id: 'country', label: 'Country', placeholder: 'Select country', type: 'select', options: [
			{ value: 'us', label: 'United States' },
			{ value: 'uk', label: 'United Kingdom' },
			{ value: 'ca', label: 'Canada' },
			{ value: 'de', label: 'Germany' },
		], defaultValue: 'us' },
		{ id: 'city', label: 'City', placeholder: 'Enter city', type: 'input', defaultValue: 'San Francisco' },
		{ id: 'address', label: 'Street Address', placeholder: 'Enter address', type: 'input', defaultValue: '123 Market Street' },
		{ id: 'postalCode', label: 'Postal Code', placeholder: 'Enter postal code', type: 'input', defaultValue: '94105' },
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
						<CardHeader className="border-b">
							<div className="flex items-center gap-4">
								<SectionIcon icon={Building2} />
								<div>
									<CardTitle>Company Information</CardTitle>
									<CardDescription>Update your business details and branding</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-2">
								{companyFields.map((field) => (
									<div key={field.id} className={field.type === 'textarea' ? '@md:col-span-2' : ''}>
										<FormField {...field} />
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
						<CardHeader className="border-b">
							<div className="flex items-center gap-4">
								<SectionIcon icon={MapPin} />
								<div>
									<CardTitle>Business Location</CardTitle>
									<CardDescription>Set your primary business address</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid gap-4 @md:grid-cols-2">
								{locationFields.map((field) => (
									<FormField key={field.id} {...field} />
								))}
							</div>
						</CardContent>
					</Card>

					<div className="flex justify-end gap-3">
						<Button variant="outline">Discard</Button>
						<Button className="gap-2">
							<Globe className="size-4" />
							Update Company
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
