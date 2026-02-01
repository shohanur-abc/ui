import Link from 'next/link';
import { Mail, Lock, ArrowRight, Globe, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const LanguageSelector = ({
	languages,
	defaultValue,
}: {
	languages: Array<{ code: string; name: string; flag: string }>;
	defaultValue: string;
}) => (
	<div className="mb-6">
		<Label className="text-sm text-muted-foreground mb-2 block">
			Language / Region
		</Label>
		<Select defaultValue={defaultValue}>
			<SelectTrigger>
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

const RememberForgot = ({
	rememberLabel,
	forgotLabel,
	forgotHref,
}: {
	rememberLabel: string;
	forgotLabel: string;
	forgotHref: string;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Checkbox id="remember" />
			<Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
				{rememberLabel}
			</Label>
		</div>
		<Link href={forgotHref} className="text-sm text-primary hover:underline">
			{forgotLabel}
		</Link>
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
	<p className="text-sm text-muted-foreground text-center">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const languages = [
		{ code: 'en-us', name: 'English (US)', flag: '🇺🇸' },
		{ code: 'en-gb', name: 'English (UK)', flag: '🇬🇧' },
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
		{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
		{ code: 'ja', name: '日本語', flag: '🇯🇵' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="GlobalShop" icon={Globe} />
						</div>
						<CardTitle className="text-2xl">Welcome back</CardTitle>
						<CardDescription>Sign in to your account</CardDescription>
					</CardHeader>
					<CardContent>
						<LanguageSelector languages={languages} defaultValue="en-us" />
						<form className="space-y-4">
							<FormField
								label="Email"
								type="email"
								placeholder="you@example.com"
								icon={Mail}
							/>
							<FormField
								label="Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
							/>
							<RememberForgot
								rememberLabel="Remember me"
								forgotLabel="Forgot password?"
								forgotHref="/forgot-password"
							/>
							<SubmitButton label="Sign in" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter>
						<FooterLink
							text="New customer?"
							linkText="Create account"
							href="/signup"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
