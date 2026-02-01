import Link from 'next/link';
import {
	Mail,
	Lock,
	User,
	Building,
	ArrowRight,
	Briefcase,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const GridDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
		<div
			className="absolute inset-0"
			style={{
				backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
				backgroundSize: '64px 64px',
			}}
		/>
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-center gap-2 mb-6">
		<div className="flex size-10 items-center justify-center rounded-lg bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">
			{text}
		</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const FormRow = ({ children }: { children: React.ReactNode }) => (
	<div className="grid gap-4 @sm:grid-cols-2">{children}</div>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				id={label.toLowerCase().replace(/\s/g, '-')}
				type={type}
				placeholder={placeholder}
				className="pl-10"
			/>
		</div>
	</div>
);

const SelectField = ({
	label,
	placeholder,
	options,
	icon: Icon,
}: {
	label: string;
	placeholder: string;
	options: string[];
	icon: React.ElementType;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="relative">
			<Select>
				<SelectTrigger className="pl-10">
					<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem
							key={option}
							value={option.toLowerCase().replace(/\s/g, '-')}
						>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	</div>
);

const NewsletterCheckbox = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2">
		<Checkbox id="newsletter" />
		<Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
			{label}
		</Label>
	</div>
);

const SubmitButton = ({
	label,
	icon: Icon,
}: {
	label: string;
	icon?: React.ElementType;
}) => (
	<Button type="submit" size="lg" className="w-full gap-2 group">
		{label}
		{Icon && (
			<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
		)}
	</Button>
);

const FooterLink = ({
	text,
	linkText,
	href,
}: {
	text: string;
	linkText: string;
	href: string;
}) => (
	<p className="text-center text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const industries = [
		'Retail',
		'Technology',
		'Healthcare',
		'Manufacturing',
		'Finance',
		'Other',
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<GridDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-lg">
					<Logo name="B2B Supply" icon={Briefcase} />
					<Title
						text="Create business account"
						subtitle="Get wholesale pricing and bulk ordering"
					/>

					<form className="space-y-5">
						<FormRow>
							<FormField
								label="First Name"
								type="text"
								placeholder="John"
								icon={User}
							/>
							<FormField
								label="Last Name"
								type="text"
								placeholder="Doe"
								icon={User}
							/>
						</FormRow>
						<FormField
							label="Company Name"
							type="text"
							placeholder="Acme Inc."
							icon={Building}
						/>
						<FormField
							label="Work Email"
							type="email"
							placeholder="you@company.com"
							icon={Mail}
						/>
						<SelectField
							label="Industry"
							placeholder="Select your industry"
							options={industries}
							icon={Briefcase}
						/>
						<FormField
							label="Password"
							type="password"
							placeholder="••••••••"
							icon={Lock}
						/>
						<NewsletterCheckbox label="Subscribe to B2B deals and industry updates" />
						<SubmitButton label="Create Business Account" icon={ArrowRight} />
					</form>

					<div className="mt-8">
						<FooterLink
							text="Already have a business account?"
							linkText="Sign in"
							href="/login"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
