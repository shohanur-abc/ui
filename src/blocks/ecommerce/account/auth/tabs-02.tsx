import Link from 'next/link';
import { Mail, Lock, User, Phone, ArrowRight, Store } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const SocialButton = ({
	icon: Icon,
	label,
}: {
	icon: React.ElementType;
	label: string;
}) => (
	<Button type="button" variant="outline" className="w-full gap-2">
		<Icon className="size-4" />
		{label}
	</Button>
);

const DividerText = ({ text }: { text: string }) => (
	<div className="relative my-5">
		<Separator />
		<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground uppercase">
			{text}
		</span>
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

const ForgotLink = ({ href, label }: { href: string; label: string }) => (
	<div className="text-right">
		<Link href={href} className="text-sm text-primary hover:underline">
			{label}
		</Link>
	</div>
);

const GoogleIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" width="16" height="16">
		<path
			fill="currentColor"
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
		/>
		<path
			fill="currentColor"
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
		/>
		<path
			fill="currentColor"
			d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
		/>
		<path
			fill="currentColor"
			d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
		/>
	</svg>
);

const EmailSignIn = () => (
	<div>
		<SocialButton icon={GoogleIcon} label="Continue with Google" />
		<DividerText text="or" />
		<form className="space-y-4">
			<FormField id="email-signin" label="Email" type="email" placeholder="you@example.com" icon={Mail} />
			<FormField id="email-password" label="Password" type="password" placeholder="••••••••" icon={Lock} />
			<ForgotLink href="/forgot-password" label="Forgot password?" />
			<SubmitButton label="Sign in with Email" icon={ArrowRight} />
		</form>
	</div>
);

const PhoneSignIn = () => (
	<form className="space-y-4">
		<FormField id="phone-number" label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" icon={Phone} />
		<p className="text-sm text-muted-foreground">
			We&apos;ll send you a verification code via SMS
		</p>
		<SubmitButton label="Send Code" icon={ArrowRight} />
	</form>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="MarketPlace" icon={Store} />
						</div>
						<CardTitle className="text-2xl">Sign in</CardTitle>
						<CardDescription>Choose your preferred sign in method</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="email" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="email" className="gap-2">
									<Mail className="size-4" />
									Email
								</TabsTrigger>
								<TabsTrigger value="phone" className="gap-2">
									<Phone className="size-4" />
									Phone
								</TabsTrigger>
							</TabsList>
							<TabsContent value="email">
								<EmailSignIn />
							</TabsContent>
							<TabsContent value="phone">
								<PhoneSignIn />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
