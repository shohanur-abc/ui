import Link from 'next/link';
import { Gift, ArrowRight, Sparkles, Tag, Percent } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ConfettiDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/4 left-1/4 size-2 rounded-full bg-primary/30 animate-pulse" />
		<div className="absolute top-1/3 right-1/4 size-3 rounded-full bg-accent/30 animate-pulse delay-100" />
		<div className="absolute bottom-1/4 left-1/3 size-2 rounded-full bg-primary/20 animate-pulse delay-200" />
		<div className="absolute bottom-1/3 right-1/3 size-2 rounded-full bg-accent/20 animate-pulse delay-300" />
	</div>
);

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center justify-center gap-2 mb-4">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const PromoBadge = ({ text, icon: Icon }: { text: string; icon: React.ElementType }) => (
	<div className="flex justify-center mb-4">
		<Badge className="gap-1.5 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground">
			<Icon className="size-3" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-6">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">{text}</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const Benefit = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
		<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
			<Icon className="size-4 text-primary" />
		</div>
		<span className="text-sm">{text}</span>
	</div>
);

const Benefits = ({
	items,
}: {
	items: Array<{ icon: React.ElementType; text: string }>;
}) => (
	<div className="space-y-2 mb-6">
		{items.map((item, i) => (
			<Benefit key={i} icon={item.icon} text={item.text} />
		))}
	</div>
);

const FormField = ({
	label,
	type,
	placeholder,
}: {
	label: string;
	type: string;
	placeholder: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
		<Input
			id={label.toLowerCase().replace(/\s/g, '-')}
			type={type}
			placeholder={placeholder}
		/>
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
		{ icon: Gift, text: 'Get $10 off your first order' },
		{ icon: Tag, text: 'Exclusive member-only deals' },
		{ icon: Percent, text: 'Early access to sales' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<ConfettiDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="DealZone" icon={Sparkles} />
					<PromoBadge text="Limited Time Offer" icon={Gift} />
					<Title
						text="Unlock exclusive savings"
						subtitle="Join now and get instant member benefits"
					/>
					<Benefits items={benefits} />

					<form className="space-y-5">
						<FormField label="Email address" type="email" placeholder="you@example.com" />
						<FormField label="Create password" type="password" placeholder="••••••••" />
						<SubmitButton label="Claim My $10 Reward" icon={ArrowRight} />
					</form>

					<div className="mt-8">
						<FooterLink text="Already a member?" linkText="Sign in" href="/login" />
					</div>
				</div>
			</div>
		</section>
	);
}
