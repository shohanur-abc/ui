import Link from 'next/link';
import { Phone, ArrowRight, Smartphone, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';

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

const PhoneInput = ({
	label,
	countries,
}: {
	label: string;
	countries: Array<{ code: string; dial: string }>;
}) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="flex gap-2">
			<Select defaultValue="us">
				<SelectTrigger className="w-24">
					<SelectValue placeholder="+1" />
				</SelectTrigger>
				<SelectContent>
					{countries.map((country) => (
						<SelectItem key={country.code} value={country.code}>
							{country.dial}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Input type="tel" placeholder="(555) 123-4567" className="flex-1" />
		</div>
	</div>
);

const OTPInput = ({ label }: { label: string }) => (
	<div className="space-y-2">
		<Label>{label}</Label>
		<div className="flex justify-center">
			<InputOTP maxLength={4}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	</div>
);

const ResendButton = ({
	label,
	countdown,
}: {
	label: string;
	countdown?: number;
}) => (
	<Button
		type="button"
		variant="ghost"
		size="sm"
		className="gap-2"
		disabled={!!countdown}
	>
		<RefreshCw className="size-4" />
		{countdown ? `${countdown}s` : label}
	</Button>
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
	const countries = [
		{ code: 'us', dial: '+1' },
		{ code: 'uk', dial: '+44' },
		{ code: 'de', dial: '+49' },
		{ code: 'fr', dial: '+33' },
		{ code: 'jp', dial: '+81' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="QuickOrder" icon={Smartphone} />
						</div>
						<CardTitle className="text-2xl">Phone verification</CardTitle>
						<CardDescription>
							We&apos;ll send you a 4-digit code to verify your number
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-5">
							<PhoneInput label="Phone number" countries={countries} />
							<OTPInput label="Verification code" />
							<div className="flex justify-center">
								<ResendButton label="Resend code" countdown={30} />
							</div>
							<SubmitButton label="Verify & Continue" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter>
						<FooterLink
							text="Use a different method?"
							linkText="Sign in with email"
							href="/login"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
