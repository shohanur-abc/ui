import Link from 'next/link';
import {
	Mail,
	ArrowRight,
	Leaf,
	Recycle,
	TreePine,
	Droplets,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const LeafDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
		<Leaf className="absolute top-20 left-10 size-24 text-primary rotate-45" />
		<Leaf className="absolute bottom-20 right-10 size-32 text-accent -rotate-12" />
		<TreePine className="absolute top-1/3 right-1/4 size-20 text-primary" />
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-center gap-2 mb-6">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-6">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">
			{text}
		</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const ImpactStats = ({
	items,
}: {
	items: Array<{ icon: React.ElementType; value: string; label: string }>;
}) => (
	<div className="grid grid-cols-3 gap-4 mb-8">
		{items.map((item, i) => (
			<div key={i} className="text-center">
				<div className="flex justify-center mb-2">
					<div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
						<item.icon className="size-5 text-primary" />
					</div>
				</div>
				<div className="text-lg font-bold">{item.value}</div>
				<div className="text-xs text-muted-foreground">{item.label}</div>
			</div>
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

const EcoCheckbox = ({ label }: { label: string }) => (
	<div className="flex items-start gap-2">
		<Checkbox id="eco" className="mt-0.5" />
		<Label
			htmlFor="eco"
			className="text-sm font-normal cursor-pointer leading-relaxed"
		>
			{label}
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
	<Button
		type="submit"
		size="lg"
		className="w-full gap-2 group bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
	>
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
	const impactStats = [
		{ icon: TreePine, value: '50K+', label: 'Trees Planted' },
		{ icon: Recycle, value: '100%', label: 'Recyclable' },
		{ icon: Droplets, value: '1M+', label: 'Liters Saved' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<LeafDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="EcoStore" icon={Leaf} />
					<Title
						text="Join the green revolution"
						subtitle="Shop sustainably, live consciously"
					/>
					<ImpactStats items={impactStats} />

					<form className="space-y-5">
						<FormField
							label="Email"
							type="email"
							placeholder="you@example.com"
						/>
						<FormField
							label="Password"
							type="password"
							placeholder="••••••••"
						/>
						<EcoCheckbox label="Plant a tree with every order ($1 added to cart)" />
						<SubmitButton label="Create Eco Account" icon={Leaf} />
					</form>

					<div className="mt-8">
						<FooterLink
							text="Already part of the movement?"
							linkText="Sign in"
							href="/login"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
