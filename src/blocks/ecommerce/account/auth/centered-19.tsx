import Link from 'next/link';
import { Mail, Lock, ArrowRight, Truck, Clock, Shield, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center justify-center gap-2 mb-6">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-6">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const DeliveryBenefits = ({
	items,
}: {
	items: Array<{ icon: React.ElementType; title: string; desc: string }>;
}) => (
	<div className="grid gap-3 mb-8">
		{items.map((item, i) => (
			<div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
				<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
					<item.icon className="size-4 text-primary" />
				</div>
				<div>
					<div className="font-medium text-sm">{item.title}</div>
					<div className="text-xs text-muted-foreground">{item.desc}</div>
				</div>
			</div>
		))}
	</div>
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

const RememberForgot = ({
	rememberLabel,
	forgotLabel,
	forgotHref,
}: {
	rememberLabel: string;
	forgotLabel: string;
	forgotHref: string;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Checkbox id="remember" />
			<Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
				{rememberLabel}
			</Label>
		</div>
		<Link href={forgotHref} className="text-sm text-primary hover:underline">
			{forgotLabel}
		</Link>
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
	const benefits = [
		{ icon: Truck, title: 'Free 2-Day Shipping', desc: 'On orders over $50' },
		{ icon: Clock, title: 'Same Day Delivery', desc: 'Available in select areas' },
		{ icon: Shield, title: 'Secure Checkout', desc: '256-bit SSL encryption' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="FastShip" icon={Zap} />
					<Title text="Sign in for faster delivery" subtitle="Unlock exclusive shipping benefits" />
					<DeliveryBenefits items={benefits} />

					<form className="space-y-5">
						<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
						<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
						<RememberForgot
							rememberLabel="Keep me signed in"
							forgotLabel="Forgot password?"
							forgotHref="/forgot-password"
						/>
						<SubmitButton label="Sign in" icon={ArrowRight} />
					</form>

					<div className="mt-8">
						<FooterLink text="New to FastShip?" linkText="Create account" href="/signup" />
					</div>
				</div>
			</div>
		</section>
	);
}
