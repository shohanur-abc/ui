import Link from 'next/link';
import { Mail, Lock, ArrowRight, Smartphone, Shield, Zap, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center justify-center gap-2 mb-6">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-6">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const Feature = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const Features = ({
	items,
}: {
	items: Array<{ icon: React.ElementType; text: string }>;
}) => (
	<div className="flex flex-wrap justify-center gap-4 mb-8">
		{items.map((item, i) => (
			<Feature key={i} icon={item.icon} text={item.text} />
		))}
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

const TrustBadge = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="gap-1">
		<Shield className="size-3" />
		{text}
	</Badge>
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
	const features = [
		{ icon: Zap, text: 'Fast checkout' },
		{ icon: Shield, text: 'Secure payments' },
		{ icon: Smartphone, text: 'Mobile friendly' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="QuickCart" icon={ShoppingBag} />
					<Title text="Welcome back" subtitle="Sign in for faster checkout" />
					<Features items={features} />

					<form className="space-y-5">
						<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
						<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
						<RememberForgot
							rememberLabel="Keep me signed in"
							forgotLabel="Forgot password?"
							forgotHref="/forgot-password"
						/>
						<SubmitButton label="Sign in" icon={ArrowRight} />
					</form>

					<div className="flex justify-center mt-6">
						<TrustBadge text="256-bit SSL Encryption" />
					</div>

					<div className="mt-6">
						<FooterLink text="New to QuickCart?" linkText="Create an account" href="/signup" />
					</div>
				</div>
			</div>
		</section>
	);
}
