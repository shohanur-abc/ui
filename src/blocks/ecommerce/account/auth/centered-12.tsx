import Link from 'next/link';
import { Lock, ArrowRight, Shield, Fingerprint } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const SecurityBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
	<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const Logo = ({ icon: Icon }: { icon: React.ElementType }) => (
	<div className="flex justify-center mb-6">
		<div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20">
			<Icon className="size-8 text-primary" />
		</div>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const PINInput = ({ length }: { length: number }) => (
	<div className="space-y-2">
		<Label>Enter your PIN</Label>
		<div className="flex gap-3 justify-center">
			{Array.from({ length }).map((_, i) => (
				<Input
					key={i}
					type="password"
					maxLength={1}
					className="size-12 text-center text-xl font-bold"
					inputMode="numeric"
				/>
			))}
		</div>
	</div>
);

const BiometricButton = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
	<Button type="button" variant="outline" size="lg" className="w-full gap-2">
		<Icon className="size-5" />
		{label}
	</Button>
);

const DividerText = ({ text }: { text: string }) => (
	<div className="relative my-6">
		<Separator />
		<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground uppercase">
			{text}
		</span>
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
				<div className="w-full max-w-sm">
					<SecurityBadge icon={Shield} text="Secure authentication" />
					<Logo icon={Lock} />
					<Title text="Enter your PIN" subtitle="Use your 6-digit security PIN to continue" />

					<form className="space-y-6">
						<PINInput length={6} />
						<SubmitButton label="Verify PIN" icon={ArrowRight} />
					</form>

					<DividerText text="or use biometric" />

					<BiometricButton icon={Fingerprint} label="Use fingerprint" />

					<div className="mt-8">
						<FooterLink text="Forgot your PIN?" linkText="Reset PIN" href="/reset-pin" />
					</div>
				</div>
			</div>
		</section>
	);
}
