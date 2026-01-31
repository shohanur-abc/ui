import Link from 'next/link';
import { Mail, Lock, ArrowRight, Globe, Languages } from 'lucide-react';

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

const WaveDecorative = () => (
	<div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
		<svg
			className="absolute bottom-0 w-full text-muted/30"
			viewBox="0 0 1440 120"
			fill="currentColor"
			preserveAspectRatio="none"
		>
			<path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
		</svg>
	</div>
);

const LanguageSelector = ({
	languages,
}: {
	languages: Array<{ code: string; name: string; flag: string }>;
}) => (
	<div className="absolute top-6 right-6">
		<Select defaultValue={languages[0].code}>
			<SelectTrigger className="w-32 h-8 text-xs">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{languages.map((lang) => (
					<SelectItem key={lang.code} value={lang.code}>
						<span className="flex items-center gap-2">
							<span>{lang.flag}</span>
							<span>{lang.name}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center justify-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
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

const CountrySelect = ({
	label,
	countries,
}: {
	label: string;
	countries: Array<{ code: string; name: string; flag: string }>;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<Select>
			<SelectTrigger>
				<SelectValue placeholder="Select country" />
			</SelectTrigger>
			<SelectContent>
				{countries.map((country) => (
					<SelectItem key={country.code} value={country.code}>
						<span className="flex items-center gap-2">
							<span>{country.flag}</span>
							<span>{country.name}</span>
						</span>
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
	<p className="text-center text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const languages = [
		{ code: 'en', name: 'English', flag: '🇺🇸' },
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
		{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
	];

	const countries = [
		{ code: 'US', name: 'United States', flag: '🇺🇸' },
		{ code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
		{ code: 'CA', name: 'Canada', flag: '🇨🇦' },
		{ code: 'AU', name: 'Australia', flag: '🇦🇺' },
		{ code: 'DE', name: 'Germany', flag: '🇩🇪' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<WaveDecorative />
			<LanguageSelector languages={languages} />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="GlobalMart" icon={Globe} />
					<Title text="Create your account" subtitle="Shop from anywhere in the world" />

					<form className="space-y-5">
						<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
						<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
						<CountrySelect label="Country" countries={countries} />
						<SubmitButton label="Create Account" icon={ArrowRight} />
					</form>

					<div className="mt-8">
						<FooterLink text="Already have an account?" linkText="Sign in" href="/login" />
					</div>
				</div>
			</div>
		</section>
	);
}
