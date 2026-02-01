import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-center gap-2 mb-6">
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

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	required,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	required?: boolean;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>
			{label}
			{required && <span className="text-destructive ml-1">*</span>}
		</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				id={label.toLowerCase().replace(/\s/g, '-')}
				type={type}
				placeholder={placeholder}
				className="pl-10"
				required={required}
			/>
		</div>
	</div>
);

const TermsCheckbox = ({
	termsHref,
	privacyHref,
}: {
	termsHref: string;
	privacyHref: string;
}) => (
	<div className="flex items-start gap-2">
		<Checkbox id="terms" className="mt-0.5" />
		<Label
			htmlFor="terms"
			className="text-sm font-normal cursor-pointer leading-relaxed"
		>
			I agree to the{' '}
			<Link href={termsHref} className="text-primary hover:underline">
				Terms of Service
			</Link>{' '}
			and{' '}
			<Link href={privacyHref} className="text-primary hover:underline">
				Privacy Policy
			</Link>
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
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="MarketHub" icon={ShoppingBag} />
					<Title
						text="Create your account"
						subtitle="Join thousands of happy shoppers today"
					/>

					<form className="space-y-5">
						<FormField
							label="Full Name"
							type="text"
							placeholder="John Doe"
							icon={User}
							required
						/>
						<FormField
							label="Email"
							type="email"
							placeholder="you@example.com"
							icon={Mail}
							required
						/>
						<FormField
							label="Password"
							type="password"
							placeholder="••••••••"
							icon={Lock}
							required
						/>
						<TermsCheckbox termsHref="/terms" privacyHref="/privacy" />
						<SubmitButton label="Create Account" icon={ArrowRight} />
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
		</section>
	);
}
