import Link from 'next/link';
import { Mail, Lock, User, Phone, ArrowRight, Gem } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
		<div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-accent/10 blur-3xl" />
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2 mb-2">
		<div className="flex size-9 items-center justify-center rounded-lg bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const FormRow = ({ children }: { children: React.ReactNode }) => (
	<div className="grid gap-4 @sm:grid-cols-2">{children}</div>
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
	<p className="text-center text-sm text-muted-foreground pt-4">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<GlowDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<Card className="w-full max-w-lg border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="text-center pb-2">
						<div className="flex justify-center">
							<Logo name="LuxeShop" icon={Gem} />
						</div>
						<CardTitle className="text-2xl @sm:text-3xl mt-4">
							Create your account
						</CardTitle>
						<CardDescription className="text-base">
							Start your premium shopping experience today
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-6">
						<form className="space-y-5">
							<FormRow>
								<FormField
									label="First Name"
									type="text"
									placeholder="John"
									icon={User}
								/>
								<FormField
									label="Last Name"
									type="text"
									placeholder="Doe"
									icon={User}
								/>
							</FormRow>
							<FormField
								label="Email"
								type="email"
								placeholder="you@example.com"
								icon={Mail}
							/>
							<FormField
								label="Phone"
								type="tel"
								placeholder="+1 (555) 000-0000"
								icon={Phone}
							/>
							<FormField
								label="Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
							/>
							<SubmitButton label="Create Account" icon={ArrowRight} />
						</form>
						<FooterLink
							text="Already have an account?"
							linkText="Sign in"
							href="/login"
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
