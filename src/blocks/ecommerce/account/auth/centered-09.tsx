import Link from 'next/link';
import { Phone, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

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

const GradientDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl" />
		<div className="absolute -bottom-1/3 -left-1/3 w-2/3 h-2/3 rounded-full bg-gradient-to-tr from-accent/20 to-primary/10 blur-3xl" />
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-center gap-2 mb-8">
		<div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
			<Icon className="size-6 text-primary-foreground" />
		</div>
		<span className="text-2xl font-bold tracking-tight">{name}</span>
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

const PhoneInput = ({
	label,
	countries,
}: {
	label: string;
	countries: Array<{ code: string; dial: string; flag: string }>;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="flex gap-2">
			<Select defaultValue={countries[0].code}>
				<SelectTrigger className="w-24">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{countries.map((country) => (
						<SelectItem key={country.code} value={country.code}>
							<span className="flex items-center gap-2">
								<span>{country.flag}</span>
								<span>{country.dial}</span>
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<div className="relative flex-1">
				<Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input type="tel" placeholder="(555) 000-0000" className="pl-10" />
			</div>
		</div>
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

const InfoText = ({ text }: { text: string }) => (
	<p className="text-center text-xs text-muted-foreground">{text}</p>
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
	const countries = [
		{ code: 'US', dial: '+1', flag: '🇺🇸' },
		{ code: 'GB', dial: '+44', flag: '🇬🇧' },
		{ code: 'DE', dial: '+49', flag: '🇩🇪' },
		{ code: 'FR', dial: '+33', flag: '🇫🇷' },
		{ code: 'JP', dial: '+81', flag: '🇯🇵' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<GradientDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="SwiftShop" icon={Sparkles} />
					<Title
						text="Sign in with phone"
						subtitle="We'll send you a verification code via SMS"
					/>

					<form className="space-y-6">
						<PhoneInput label="Phone number" countries={countries} />
						<SubmitButton label="Send verification code" icon={MessageCircle} />
					</form>

					<div className="mt-4">
						<InfoText text="Message and data rates may apply" />
					</div>

					<div className="mt-8">
						<FooterLink
							text="Prefer email?"
							linkText="Sign in with email"
							href="/login"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
