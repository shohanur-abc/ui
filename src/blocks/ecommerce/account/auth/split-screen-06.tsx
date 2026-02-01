import Link from 'next/link';
import { Mail, ArrowRight, KeyRound, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const IllustrationPanel = () => (
	<div className="relative hidden @lg:flex flex-col items-center justify-center p-8 @xl:p-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
		<div className="relative">
			<div className="size-64 rounded-full bg-primary/10 flex items-center justify-center">
				<div className="size-48 rounded-full bg-primary/20 flex items-center justify-center">
					<div className="size-32 rounded-full bg-primary/30 flex items-center justify-center">
						<Mail className="size-16 text-primary" />
					</div>
				</div>
			</div>
			<div className="absolute -bottom-4 -right-4 size-16 rounded-full bg-accent/20 flex items-center justify-center">
				<KeyRound className="size-8 text-accent" />
			</div>
		</div>
		<h3 className="text-xl font-semibold mt-12 text-center">
			Password Recovery
		</h3>
		<p className="text-muted-foreground text-center mt-2 max-w-xs">
			We&apos;ll send you a secure link to reset your password
		</p>
	</div>
);

const Logo = ({ icon: Icon }: { icon: React.ElementType }) => (
	<div className="flex justify-center mb-8">
		<div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 ring-2 ring-primary/20">
			<Icon className="size-7 text-primary" />
		</div>
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
			<div className="min-h-screen grid @lg:grid-cols-2">
				<IllustrationPanel />
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto">
						<Logo icon={KeyRound} />
						<Title
							text="Forgot your password?"
							subtitle="Enter your email and we'll send you a reset link"
						/>

						<form className="space-y-6">
							<FormField
								label="Email address"
								type="email"
								placeholder="you@example.com"
								icon={Mail}
							/>
							<SubmitButton label="Send reset link" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink
								text="Remember your password?"
								linkText="Back to sign in"
								href="/login"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
