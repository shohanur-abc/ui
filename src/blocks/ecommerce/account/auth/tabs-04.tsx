import Link from 'next/link';
import { Mail, Lock, ArrowRight, Key, Smartphone, Shield, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	id,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	id: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={id}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input id={id} type={type} placeholder={placeholder} className="pl-10" />
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

const PasswordReset = () => (
	<form className="space-y-4">
		<FormField id="reset-email" label="Email address" type="email" placeholder="you@example.com" icon={Mail} />
		<p className="text-sm text-muted-foreground">
			We&apos;ll send a password reset link to your email
		</p>
		<SubmitButton label="Send Reset Link" icon={ArrowRight} />
	</form>
);

const SecurityKey = () => (
	<div className="space-y-4">
		<div className="p-6 rounded-xl bg-muted/50 border border-border/50 text-center">
			<Key className="size-12 text-primary mx-auto mb-4" />
			<p className="font-medium mb-2">Insert your security key</p>
			<p className="text-sm text-muted-foreground">
				Connect your hardware security key to verify your identity
			</p>
		</div>
		<SubmitButton label="Verify with Security Key" icon={Shield} />
	</div>
);

const AuthenticatorApp = () => (
	<form className="space-y-4">
		<div className="text-center">
			<Smartphone className="size-12 text-primary mx-auto mb-4" />
			<p className="font-medium mb-2">Enter verification code</p>
			<p className="text-sm text-muted-foreground mb-4">
				Open your authenticator app and enter the code
			</p>
		</div>
		<div className="flex justify-center">
			<InputOTP maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
		<SubmitButton label="Verify Code" icon={ArrowRight} />
	</form>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="SecureShop" icon={Package} />
						</div>
						<CardTitle className="text-2xl">Account recovery</CardTitle>
						<CardDescription>Choose your recovery method</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="email" className="w-full">
							<TabsList className="grid w-full grid-cols-3 mb-6">
								<TabsTrigger value="email" className="text-xs @sm:text-sm">
									Email
								</TabsTrigger>
								<TabsTrigger value="authenticator" className="text-xs @sm:text-sm">
									App
								</TabsTrigger>
								<TabsTrigger value="security-key" className="text-xs @sm:text-sm">
									Key
								</TabsTrigger>
							</TabsList>
							<TabsContent value="email">
								<PasswordReset />
							</TabsContent>
							<TabsContent value="authenticator">
								<AuthenticatorApp />
							</TabsContent>
							<TabsContent value="security-key">
								<SecurityKey />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
