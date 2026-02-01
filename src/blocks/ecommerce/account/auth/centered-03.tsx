import Link from 'next/link';
import { Mail, ArrowRight, Store } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
		<div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-center gap-3 mb-8">
		<div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
			<Icon className="size-6" />
		</div>
		<span className="text-2xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-10">
		<h1 className="text-3xl @sm:text-4xl font-bold tracking-tight mb-3">
			{text}
		</h1>
		{subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
}: {
	label: string;
	type: string;
	placeholder: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
		<Input
			id={label.toLowerCase().replace(/\s/g, '-')}
			type={type}
			placeholder={placeholder}
		/>
	</div>
);

const SubmitButton = ({
	label,
	icon: Icon,
}: {
	label: string;
	icon?: React.ElementType;
}) => (
	<Button
		type="submit"
		size="lg"
		className="w-full gap-2 group shadow-lg shadow-primary/20"
	>
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

const InfoText = ({ text }: { text: string }) => (
	<p className="text-center text-sm text-muted-foreground mt-4">{text}</p>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<GlowDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="ShopNest" icon={Store} />
					<Title
						text="Forgot password?"
						subtitle="No worries, we'll send you reset instructions"
					/>

					<form className="space-y-6">
						<FormField
							label="Email address"
							type="email"
							placeholder="Enter your email"
						/>
						<SubmitButton label="Send reset link" icon={ArrowRight} />
					</form>

					<InfoText text="Check your spam folder if you don't see the email" />

					<div className="mt-8">
						<FooterLink
							text="Remember your password?"
							linkText="Back to login"
							href="/login"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
