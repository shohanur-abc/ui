import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, Phone, ArrowRight, Gem, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FeaturePanel = ({
	imageUrl,
	features,
}: {
	imageUrl: string;
	features: Array<{ title: string; description: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center p-8 @xl:p-12 bg-muted/50">
		<div className="absolute inset-0 opacity-10">
			<Image src={imageUrl} alt="Background" fill className="object-cover" />
		</div>
		<div className="relative z-10">
			<h2 className="text-2xl @xl:text-3xl font-bold mb-8">Why choose us?</h2>
			<div className="space-y-6">
				{features.map((feature, i) => (
					<div key={i} className="flex gap-4">
						<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
							<Check className="size-4 text-primary" />
						</div>
						<div>
							<div className="font-semibold mb-1">{feature.title}</div>
							<div className="text-sm text-muted-foreground">{feature.description}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
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
	<p className="text-sm text-muted-foreground">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const features = [
		{ title: 'Premium Quality', description: 'Curated selection of luxury products' },
		{ title: 'Free Shipping', description: 'On all orders over $100' },
		{ title: 'VIP Support', description: 'Personal shopping assistance 24/7' },
		{ title: 'Easy Returns', description: '30-day hassle-free returns' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<FeaturePanel
					imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=1600&fit=crop"
					features={features}
				/>
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0">
						<Logo name="LuxeMarket" icon={Gem} />
						<Title text="Join LuxeMarket" subtitle="Create your premium account today" />

						<form className="space-y-5">
							<FormRow>
								<FormField label="First Name" type="text" placeholder="John" icon={User} />
								<FormField label="Last Name" type="text" placeholder="Doe" icon={User} />
							</FormRow>
							<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
							<FormField label="Phone" type="tel" placeholder="+1 (555) 000-0000" icon={Phone} />
							<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
							<SubmitButton label="Create Premium Account" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink text="Already a member?" linkText="Sign in" href="/login" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
