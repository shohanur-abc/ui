import Link from 'next/link';
import {
	Mail,
	Lock,
	ArrowRight,
	Loader2,
	AlertCircle,
	Wallet,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-6">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">
			{text}
		</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const ErrorAlert = ({ message }: { message: string }) => (
	<Alert variant="destructive" className="mb-6">
		<AlertCircle className="size-4" />
		<AlertDescription>{message}</AlertDescription>
	</Alert>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	error,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	error?: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				id={label.toLowerCase().replace(/\s/g, '-')}
				type={type}
				placeholder={placeholder}
				className={`pl-10 ${error ? 'border-destructive ring-destructive/20' : ''}`}
				aria-invalid={!!error}
			/>
		</div>
		{error && <p className="text-xs text-destructive">{error}</p>}
	</div>
);

const ForgotLink = ({ href, label }: { href: string; label: string }) => (
	<div className="text-right">
		<Link href={href} className="text-sm text-primary hover:underline">
			{label}
		</Link>
	</div>
);

const SubmitButton = ({
	label,
	loading,
	loadingLabel,
	icon: Icon,
}: {
	label: string;
	loading?: boolean;
	loadingLabel?: string;
	icon?: React.ElementType;
}) => (
	<Button
		type="submit"
		size="lg"
		className="w-full gap-2 group"
		disabled={loading}
	>
		{loading ? (
			<>
				<Loader2 className="size-4 animate-spin" />
				{loadingLabel || 'Loading...'}
			</>
		) : (
			<>
				{label}
				{Icon && (
					<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
				)}
			</>
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
	const showError = false;
	const isLoading = false;

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="PayMart" icon={Wallet} />
					<Title
						text="Sign in to checkout"
						subtitle="Enter your credentials to complete purchase"
					/>

					{showError && (
						<ErrorAlert message="Invalid email or password. Please try again." />
					)}

					<form className="space-y-5">
						<FormField
							label="Email"
							type="email"
							placeholder="you@example.com"
							icon={Mail}
							error={
								showError ? 'Please enter a valid email address' : undefined
							}
						/>
						<FormField
							label="Password"
							type="password"
							placeholder="••••••••"
							icon={Lock}
							error={showError ? 'Password is required' : undefined}
						/>
						<ForgotLink href="/forgot-password" label="Forgot password?" />
						<SubmitButton
							label="Sign in to checkout"
							loading={isLoading}
							loadingLabel="Signing in..."
							icon={ArrowRight}
						/>
					</form>

					<div className="mt-8">
						<FooterLink
							text="New customer?"
							linkText="Continue as guest"
							href="/guest-checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
