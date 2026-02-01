import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const BrandPanel = ({
	imageUrl,
	headline,
	subheadline,
}: {
	imageUrl: string;
	headline: string;
	subheadline: string;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-end p-8 @xl:p-12 bg-gradient-to-br from-primary/90 to-accent/90">
		<Image
			src={imageUrl}
			alt="Shopping"
			fill
			className="object-cover opacity-20"
		/>
		<div className="relative z-10">
			<h2 className="text-3xl @xl:text-4xl font-bold text-primary-foreground mb-4">
				{headline}
			</h2>
			<p className="text-primary-foreground/80 text-lg">{subheadline}</p>
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
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<BrandPanel
					imageUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=1600&fit=crop"
					headline="Discover amazing deals"
					subheadline="Join millions of happy shoppers and find everything you need in one place."
				/>
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0">
						<Logo name="ShopFlow" icon={ShoppingBag} />
						<Title
							text="Welcome back"
							subtitle="Sign in to your account to continue"
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
							<SubmitButton label="Sign in" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink
								text="Don't have an account?"
								linkText="Create one"
								href="/signup"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
