import Link from 'next/link';
import { ArrowRight, Smartphone, Lock, MessageCircle, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';

const PhoneIllustration = () => (
	<div className="relative hidden @lg:flex flex-col items-center justify-center p-8 @xl:p-12 bg-muted/30">
		<div className="relative">
			<div className="w-64 h-[500px] rounded-[3rem] bg-card border-4 border-border shadow-2xl flex flex-col items-center p-4">
				<div className="w-32 h-6 rounded-full bg-muted mb-4" />
				<div className="flex-1 w-full rounded-2xl bg-muted/50 flex flex-col items-center justify-center gap-4">
					<div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
						<MessageCircle className="size-10 text-primary" />
					</div>
					<div className="text-center">
						<p className="text-sm text-muted-foreground">Verification code</p>
						<p className="text-2xl font-mono font-bold tracking-widest mt-1">• • • • • •</p>
					</div>
				</div>
				<div className="w-20 h-1.5 rounded-full bg-muted mt-4" />
			</div>
			<div className="absolute -bottom-4 -right-4 size-16 rounded-full bg-primary/20 flex items-center justify-center">
				<Shield className="size-8 text-primary" />
			</div>
		</div>
	</div>
);

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const PhoneSent = ({ phone }: { phone: string }) => (
	<div className="bg-muted/50 rounded-xl p-4 mb-6">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
				<Smartphone className="size-5 text-primary" />
			</div>
			<div>
				<p className="text-sm text-muted-foreground">Code sent to</p>
				<p className="font-medium">{phone}</p>
			</div>
		</div>
	</div>
);

const OTPInput = ({ length }: { length: number }) => (
	<div className="space-y-2">
		<Label>Enter verification code</Label>
		<InputOTP maxLength={length} className="justify-center">
			<InputOTPGroup>
				{Array.from({ length }).map((_, i) => (
					<InputOTPSlot key={i} index={i} />
				))}
			</InputOTPGroup>
		</InputOTP>
	</div>
);

const ResendText = ({
	text,
	linkText,
	countdown,
}: {
	text: string;
	linkText: string;
	countdown?: number;
}) => (
	<p className="text-center text-sm text-muted-foreground">
		{text}{' '}
		{countdown && countdown > 0 ? (
			<span className="text-muted-foreground">Resend in {countdown}s</span>
		) : (
			<button type="button" className="text-primary font-medium hover:underline">
				{linkText}
			</button>
		)}
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
	<p className="text-sm text-muted-foreground">
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
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="SecureShop" icon={Lock} />
						<Title text="Verify your phone" subtitle="We sent a 6-digit code to your phone" />
						<PhoneSent phone="+1 (555) •••-••89" />

						<form className="space-y-6">
							<OTPInput length={6} />
							<ResendText text="Didn't get the code?" linkText="Resend" countdown={0} />
							<SubmitButton label="Verify & Continue" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink text="Wrong number?" linkText="Change phone" href="/phone" />
						</div>
					</div>
				</div>
				<PhoneIllustration />
			</div>
		</section>
	);
}
