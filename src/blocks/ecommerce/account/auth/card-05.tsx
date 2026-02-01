import Link from 'next/link';
import { ArrowRight, Package, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	InputOTPSeparator,
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

const OTPInput = () => (
	<div className="flex justify-center">
		<InputOTP maxLength={6}>
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
		className="gap-2"
		disabled={!!countdown}
	>
		<RefreshCw className="size-4" />
		{countdown ? `Resend in ${countdown}s` : label}
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

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="PackageHub" icon={Package} />
						</div>
						<CardTitle className="text-2xl">Verify your email</CardTitle>
						<CardDescription>
							We&apos;ve sent a 6-digit code to{' '}
							<span className="font-medium text-foreground">
								john@example.com
							</span>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-6">
							<OTPInput />
							<SubmitButton label="Verify Email" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter className="flex flex-col gap-2">
						<ResendButton label="Resend code" countdown={45} />
						<p className="text-sm text-muted-foreground text-center">
							Didn&apos;t receive the code? Check your spam folder
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
