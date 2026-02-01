import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	ArrowRight,
	Store,
	Truck,
	Shield,
	CreditCard,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const StatsPanel = ({
	imageUrl,
	stats,
}: {
	imageUrl: string;
	stats: Array<{ value: string; label: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-between p-8 @xl:p-12">
		<Image src={imageUrl} alt="Store" fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
		<div className="relative z-10 mt-auto">
			<div className="grid grid-cols-2 gap-6">
				{stats.map((stat, i) => (
					<div
						key={i}
						className="text-center p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50"
					>
						<div className="text-3xl font-bold text-primary">{stat.value}</div>
						<div className="text-sm text-muted-foreground">{stat.label}</div>
					</div>
				))}
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
	<div className="mb-6">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">
			{text}
		</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const TrustBadges = ({
	items,
}: {
	items: Array<{ icon: React.ElementType; label: string }>;
}) => (
	<div className="flex flex-wrap gap-4 mb-8">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<item.icon className="size-4 text-primary" />
				<span>{item.label}</span>
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
	<p className="text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const stats = [
		{ value: '500K+', label: 'Happy Customers' },
		{ value: '50K+', label: 'Products' },
		{ value: '99.9%', label: 'Uptime' },
		{ value: '24/7', label: 'Support' },
	];

	const trustBadges = [
		{ icon: Truck, label: 'Free Shipping' },
		{ icon: Shield, label: 'Secure' },
		{ icon: CreditCard, label: 'Easy Pay' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="MegaStore" icon={Store} />
						<Title
							text="Welcome back"
							subtitle="Sign in to access your account"
						/>
						<TrustBadges items={trustBadges} />

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
								rememberLabel="Keep me signed in"
								forgotLabel="Forgot password?"
								forgotHref="/forgot-password"
							/>
							<SubmitButton label="Sign in" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink
								text="New customer?"
								linkText="Create an account"
								href="/signup"
							/>
						</div>
					</div>
				</div>
				<StatsPanel
					imageUrl="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=1600&fit=crop"
					stats={stats}
				/>
			</div>
		</section>
	);
}
