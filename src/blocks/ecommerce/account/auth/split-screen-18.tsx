import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	ArrowRight,
	Wallet,
	CreditCard,
	Banknote,
	QrCode,
	Shield,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const PaymentMethodsPanel = ({
	methods,
	securityFeatures,
}: {
	methods: Array<{ icon: React.ElementType; name: string }>;
	securityFeatures: string[];
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center p-8 @xl:p-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
		<div className="max-w-md">
			<h2 className="text-3xl font-bold mb-4">Flexible Payment Options</h2>
			<p className="text-muted-foreground mb-8">
				Pay your way with our secure payment methods
			</p>
			<div className="grid grid-cols-2 gap-3 mb-10">
				{methods.map((method, i) => (
					<div
						key={i}
						className="p-4 rounded-xl bg-card/80 border border-border/50 flex items-center gap-3"
					>
						<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
							<method.icon className="size-5 text-primary" />
						</div>
						<span className="font-medium">{method.name}</span>
					</div>
				))}
			</div>
			<div className="p-5 rounded-2xl bg-card/80 border border-border/50">
				<div className="flex items-center gap-2 mb-4">
					<Shield className="size-5 text-primary" />
					<span className="font-semibold">Secure Checkout</span>
				</div>
				<ul className="space-y-2">
					{securityFeatures.map((feature, i) => (
						<li
							key={i}
							className="flex items-center gap-2 text-sm text-muted-foreground"
						>
							<div className="size-1.5 rounded-full bg-primary" />
							{feature}
						</li>
					))}
				</ul>
			</div>
		</div>
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">
			{text}
		</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
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
	<div className="relative my-6">
		<Separator />
		<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground uppercase">
			{text}
		</span>
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

const ForgotLink = ({ href, label }: { href: string; label: string }) => (
	<div className="text-right">
		<Link href={href} className="text-sm text-primary hover:underline">
			{label}
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
	<p className="text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

const GoogleIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24">
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

export default function Main() {
	const paymentMethods = [
		{ icon: CreditCard, name: 'Credit Card' },
		{ icon: Wallet, name: 'Digital Wallet' },
		{ icon: Banknote, name: 'Bank Transfer' },
		{ icon: QrCode, name: 'QR Payment' },
	];
	const securityFeatures = [
		'256-bit SSL encryption',
		'PCI DSS compliant',
		'Fraud monitoring 24/7',
		'Secure tokenization',
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="SecurePay" icon={Wallet} />
						<Title
							text="Sign in to checkout"
							subtitle="Access your saved payment methods"
						/>

						<SocialButton icon={GoogleIcon} label="Continue with Google" />
						<DividerText text="or use email" />

						<form className="space-y-5">
							<FormField
								label="Email"
								type="email"
								placeholder="you@example.com"
								icon={Mail}
							/>
							<FormField
								label="Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
							/>
							<ForgotLink href="/forgot-password" label="Forgot password?" />
							<SubmitButton label="Continue to Checkout" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink
								text="New customer?"
								linkText="Create account"
								href="/signup"
							/>
						</div>
					</div>
				</div>
				<PaymentMethodsPanel
					methods={paymentMethods}
					securityFeatures={securityFeatures}
				/>
			</div>
		</section>
	);
}
