import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	User,
	ArrowRight,
	Scissors,
	Sparkles,
	Star,
	CalendarDays,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const SubscriptionPanel = ({
	plans,
}: {
	plans: Array<{
		name: string;
		price: string;
		frequency: string;
		features: string[];
	}>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center p-8 @xl:p-12 bg-gradient-to-br from-card via-background to-muted/50">
		<h2 className="text-2xl font-bold mb-2">Subscription Plans</h2>
		<p className="text-muted-foreground mb-8">
			Choose your beauty box frequency
		</p>
		<div className="space-y-4">
			{plans.map((plan, i) => (
				<div
					key={i}
					className={`p-5 rounded-2xl border ${i === 1 ? 'border-primary bg-primary/5' : 'border-border/50 bg-card/80'} hover:border-primary/50 transition-colors cursor-pointer`}
				>
					<div className="flex items-center justify-between mb-3">
						<div>
							<span className="font-semibold text-lg">{plan.name}</span>
							<span className="text-muted-foreground ml-2">
								{plan.frequency}
							</span>
						</div>
						<span className="text-2xl font-bold">{plan.price}</span>
					</div>
					<ul className="space-y-1">
						{plan.features.map((feature, j) => (
							<li
								key={j}
								className="flex items-center gap-2 text-sm text-muted-foreground"
							>
								<Star className="size-3 text-primary" />
								{feature}
							</li>
						))}
					</ul>
				</div>
			))}
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
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
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

const TermsCheckbox = ({
	label,
	termsHref,
	privacyHref,
}: {
	label: string;
	termsHref: string;
	privacyHref: string;
}) => (
	<div className="flex items-start gap-2">
		<Checkbox id="terms" className="mt-0.5" />
		<Label
			htmlFor="terms"
			className="text-sm font-normal cursor-pointer leading-relaxed"
		>
			{label}{' '}
			<Link href={termsHref} className="text-primary hover:underline">
				Terms of Service
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
	const plans = [
		{
			name: 'Monthly',
			price: '$29',
			frequency: '/month',
			features: ['5 full-size products', 'Free shipping', 'Cancel anytime'],
		},
		{
			name: 'Quarterly',
			price: '$79',
			frequency: '/3 months',
			features: [
				'6 full-size products',
				'Free shipping',
				'Bonus gift included',
			],
		},
		{
			name: 'Annual',
			price: '$299',
			frequency: '/year',
			features: ['7 full-size products', 'Free shipping', '2 months free'],
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="BeautyBox" icon={Sparkles} />
						<Title
							text="Start your subscription"
							subtitle="Get curated beauty products delivered monthly"
						/>

						<form className="space-y-5">
							<FormField
								label="Full Name"
								type="text"
								placeholder="Jane Doe"
								icon={User}
							/>
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
							<TermsCheckbox
								label="I agree to the"
								termsHref="/terms"
								privacyHref="/privacy"
							/>
							<SubmitButton label="Get Started" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink
								text="Already subscribed?"
								linkText="Sign in"
								href="/login"
							/>
						</div>
					</div>
				</div>
				<SubscriptionPanel plans={plans} />
			</div>
		</section>
	);
}
