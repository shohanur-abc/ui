import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	User,
	ArrowRight,
	Building2,
	Briefcase,
} from 'lucide-react';

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

const B2BPanel = ({
	logos,
	headline,
	subheadline,
}: {
	logos: string[];
	headline: string;
	subheadline: string;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center p-8 @xl:p-12 bg-gradient-to-br from-card to-muted/50">
		<div className="max-w-md">
			<h2 className="text-3xl @xl:text-4xl font-bold mb-4">{headline}</h2>
			<p className="text-muted-foreground text-lg mb-12">{subheadline}</p>
			<div>
				<p className="text-sm text-muted-foreground mb-4">
					Trusted by leading companies
				</p>
				<div className="grid grid-cols-4 gap-4">
					{logos.map((logo, i) => (
						<div
							key={i}
							className="aspect-video rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center"
						>
							<span className="text-xs font-medium text-muted-foreground">
								{logo}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="mb-8">
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
}: {
	label: string;
	placeholder: string;
	options: string[];
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select>
			<SelectTrigger>
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
	<p className="text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const logos = [
		'Logo 1',
		'Logo 2',
		'Logo 3',
		'Logo 4',
		'Logo 5',
		'Logo 6',
		'Logo 7',
		'Logo 8',
	];
	const companySizes = [
		'1-10 employees',
		'11-50 employees',
		'51-200 employees',
		'201-500 employees',
		'500+ employees',
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<B2BPanel
					logos={logos}
					headline="Wholesale pricing for businesses"
					subheadline="Get volume discounts, net payment terms, and dedicated support for your business."
				/>
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0">
						<Logo name="B2B Supplies" icon={Building2} />
						<Title
							text="Create business account"
							subtitle="Unlock wholesale pricing today"
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
								icon={Building2}
							/>
							<FormField
								label="Work Email"
								type="email"
								placeholder="you@company.com"
								icon={Mail}
							/>
							<SelectField
								label="Company Size"
								placeholder="Select size"
								options={companySizes}
							/>
							<FormField
								label="Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
							/>
							<SubmitButton
								label="Apply for Business Account"
								icon={ArrowRight}
							/>
						</form>

						<div className="mt-8">
							<FooterLink
								text="Already have an account?"
								linkText="Sign in"
								href="/login"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
