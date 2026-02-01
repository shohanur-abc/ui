import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const RememberForgot = ({
	rememberLabel,
	forgotLabel,
	forgotHref,
	id,
}: {
	rememberLabel: string;
	forgotLabel: string;
	forgotHref: string;
	id: string;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Checkbox id={id} />
			<Label htmlFor={id} className="text-sm font-normal cursor-pointer">
				{rememberLabel}
			</Label>
		</div>
		<Link href={forgotHref} className="text-sm text-primary hover:underline">
			{forgotLabel}
		</Link>
	</div>
);

const TermsCheckbox = ({
	label,
	termsHref,
	privacyHref,
	id,
}: {
	label: string;
	termsHref: string;
	privacyHref: string;
	id: string;
}) => (
	<div className="flex items-start gap-2">
		<Checkbox id={id} className="mt-0.5" />
		<Label
			htmlFor={id}
			className="text-sm font-normal cursor-pointer leading-relaxed"
		>
			{label}{' '}
			<Link href={termsHref} className="text-primary hover:underline">
				Terms
			</Link>{' '}
			and{' '}
			<Link href={privacyHref} className="text-primary hover:underline">
				Privacy Policy
			</Link>
		</Label>
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

const SignInForm = () => (
	<form className="space-y-4">
		<FormField
			id="signin-email"
			label="Email"
			type="email"
			placeholder="you@example.com"
			icon={Mail}
		/>
		<FormField
			id="signin-password"
			label="Password"
			type="password"
			placeholder="••••••••"
			icon={Lock}
		/>
		<RememberForgot
			id="signin-remember"
			rememberLabel="Remember me"
			forgotLabel="Forgot password?"
			forgotHref="/forgot-password"
		/>
		<SubmitButton label="Sign in" icon={ArrowRight} />
	</form>
);

const SignUpForm = () => (
	<form className="space-y-4">
		<FormField
			id="signup-name"
			label="Full Name"
			type="text"
			placeholder="John Doe"
			icon={User}
		/>
		<FormField
			id="signup-email"
			label="Email"
			type="email"
			placeholder="you@example.com"
			icon={Mail}
		/>
		<FormField
			id="signup-password"
			label="Password"
			type="password"
			placeholder="••••••••"
			icon={Lock}
		/>
		<TermsCheckbox
			id="signup-terms"
			label="I agree to the"
			termsHref="/terms"
			privacyHref="/privacy"
		/>
		<SubmitButton label="Create Account" icon={ArrowRight} />
	</form>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopNow" icon={ShoppingBag} />
						</div>
						<CardTitle className="text-2xl">Welcome</CardTitle>
						<CardDescription>Sign in or create an account</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="signin" className="w-full">
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="signin">Sign In</TabsTrigger>
								<TabsTrigger value="signup">Sign Up</TabsTrigger>
							</TabsList>
							<TabsContent value="signin">
								<SignInForm />
							</TabsContent>
							<TabsContent value="signup">
								<SignUpForm />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
