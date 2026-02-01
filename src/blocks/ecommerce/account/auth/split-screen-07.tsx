import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	ArrowRight,
	ShoppingCart,
	Percent,
	Gift,
	Truck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const PromoPanel = ({
	imageUrl,
	badge,
	headline,
	offers,
}: {
	imageUrl: string;
	badge: string;
	headline: string;
	offers: Array<{ icon: React.ElementType; text: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center p-8 @xl:p-12">
		<Image src={imageUrl} alt="Promo" fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
		<div className="relative z-10 max-w-sm">
			<Badge className="mb-4 bg-accent text-accent-foreground">{badge}</Badge>
			<h2 className="text-3xl @xl:text-4xl font-bold mb-6">{headline}</h2>
			<div className="space-y-4">
				{offers.map((offer, i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
							<offer.icon className="size-5 text-primary" />
						</div>
						<span className="font-medium">{offer.text}</span>
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
	const offers = [
		{ icon: Percent, text: '20% off your first order' },
		{ icon: Gift, text: 'Free gift with purchase' },
		{ icon: Truck, text: 'Free express shipping' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<PromoPanel
					imageUrl="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1600&fit=crop"
					badge="New Member Exclusive"
					headline="Welcome rewards await!"
					offers={offers}
				/>
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0">
						<Logo name="CartPro" icon={ShoppingCart} />
						<Title
							text="Create your account"
							subtitle="Unlock exclusive member benefits"
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
							<SubmitButton label="Join & Save 20%" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink
								text="Already a member?"
								linkText="Sign in"
								href="/login"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
