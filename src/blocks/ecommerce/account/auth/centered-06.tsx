import Link from 'next/link';
import { ArrowRight, CheckCircle, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';

const RingDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-border/50" />
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-border/30" />
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-border/20" />
	</div>
);

const Logo = ({ icon: Icon }: { icon: React.ElementType }) => (
	<div className="flex justify-center mb-6">
		<div className="flex size-14 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
			<Icon className="size-7 text-primary" />
		</div>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-3">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const EmailHighlight = ({ email }: { email: string }) => (
	<p className="text-center text-sm mb-8">
		We sent a code to <span className="font-medium text-foreground">{email}</span>
	</p>
);

const OTPInput = ({ length }: { length: number }) => (
	<div className="flex justify-center mb-6">
		<InputOTP maxLength={length}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	</div>
);

const ResendText = ({
	text,
	linkText,
	onResend,
}: {
	text: string;
	linkText: string;
	onResend?: () => void;
}) => (
	<p className="text-center text-sm text-muted-foreground mb-6">
		{text}{' '}
		<button
			type="button"
			onClick={onResend}
			className="text-primary font-medium hover:underline"
		>
			{linkText}
		</button>
	</p>
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
			<RingDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo icon={Package} />
					<Title text="Verify your email" subtitle="Enter the 6-digit code we sent to your email" />
					<EmailHighlight email="user@example.com" />

					<form className="space-y-6">
						<OTPInput length={6} />
						<ResendText text="Didn't receive the code?" linkText="Resend" />
						<SubmitButton label="Verify Email" icon={CheckCircle} />
					</form>

					<div className="mt-8">
						<FooterLink text="Wrong email?" linkText="Change email address" href="/signup" />
					</div>
				</div>
			</div>
		</section>
	);
}
