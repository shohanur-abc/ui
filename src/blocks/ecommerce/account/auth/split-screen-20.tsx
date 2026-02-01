import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	ArrowRight,
	Snowflake,
	Gift,
	Star,
	PartyPopper,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const SeasonalPanel = ({
	promoCode,
	discount,
	endDate,
	features,
}: {
	promoCode: string;
	discount: string;
	endDate: string;
	features: Array<{ icon: React.ElementType; text: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center items-center p-8 @xl:p-12 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 overflow-hidden">
		<div className="absolute top-10 left-10 opacity-20">
			<Snowflake className="size-24 text-primary animate-pulse" />
		</div>
		<div className="absolute bottom-10 right-10 opacity-20">
			<Snowflake className="size-16 text-accent animate-pulse" />
		</div>
		<div className="absolute top-1/3 right-1/4 opacity-10">
			<Star className="size-12 text-primary" />
		</div>
		<div className="text-center max-w-md relative z-10">
			<Badge variant="secondary" className="mb-6 gap-2">
				<PartyPopper className="size-3" />
				Limited Time Offer
			</Badge>
			<h2 className="text-4xl font-bold mb-4">Holiday Sale</h2>
			<p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
				{discount}
			</p>
			<p className="text-muted-foreground mb-8">
				Use code{' '}
				<code className="px-2 py-1 rounded bg-primary/20 text-primary font-mono font-bold">
					{promoCode}
				</code>{' '}
				at checkout
			</p>
			<div className="p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 mb-6">
				<p className="text-sm text-muted-foreground mb-4">
					Offer ends {endDate}
				</p>
				<div className="space-y-2">
					{features.map((feature, i) => (
						<div key={i} className="flex items-center gap-2">
							<feature.icon className="size-4 text-primary" />
							<span className="text-sm">{feature.text}</span>
						</div>
					))}
				</div>
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
	<p className="text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const features = [
		{ icon: Gift, text: 'Free gift wrapping on orders $50+' },
		{ icon: Star, text: 'Double loyalty points this week' },
		{ icon: Snowflake, text: 'Extended returns until Jan 31' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="FestiveShop" icon={Gift} />
						<Title
							text="Welcome back"
							subtitle="Sign in to access holiday deals"
						/>

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
							<RememberForgot
								rememberLabel="Remember me"
								forgotLabel="Forgot password?"
								forgotHref="/forgot-password"
							/>
							<SubmitButton label="Sign in & Shop" icon={ArrowRight} />
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
				<SeasonalPanel
					promoCode="HOLIDAY25"
					discount="25% OFF"
					endDate="December 31st"
					features={features}
				/>
			</div>
		</section>
	);
}
