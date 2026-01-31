import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, Palette, Eye, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const ProductShowcase = ({
	products,
}: {
	products: Array<{ image: string; name: string; price: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col p-8 @xl:p-12 bg-muted/30">
		<h2 className="text-2xl font-bold mb-2">Trending Now</h2>
		<p className="text-muted-foreground mb-8">Sign in to save your favorites</p>
		<div className="grid grid-cols-2 gap-4 flex-1">
			{products.map((product, i) => (
				<div
					key={i}
					className="group relative rounded-2xl overflow-hidden bg-card border border-border/50"
				>
					<div className="aspect-square relative">
						<Image
							src={product.image}
							alt={product.name}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						<button className="absolute top-3 right-3 size-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
							<Heart className="size-4" />
						</button>
					</div>
					<div className="p-3">
						<p className="font-medium text-sm truncate">{product.name}</p>
						<p className="text-primary font-semibold">{product.price}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
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
	const products = [
		{ image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', name: 'Premium Sneakers', price: '$129' },
		{ image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', name: 'Smart Watch', price: '$299' },
		{ image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop', name: 'Perfume Collection', price: '$89' },
		{ image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop', name: 'Leather Bag', price: '$199' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="TrendSpot" icon={Palette} />
						<Title text="Welcome back" subtitle="Sign in to view your wishlist" />

						<form className="space-y-5">
							<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
							<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
							<RememberForgot
								rememberLabel="Remember me"
								forgotLabel="Forgot password?"
								forgotHref="/forgot-password"
							/>
							<SubmitButton label="Sign in" icon={ArrowRight} />
						</form>

						<div className="mt-8">
							<FooterLink text="New to TrendSpot?" linkText="Create account" href="/signup" />
						</div>
					</div>
				</div>
				<ProductShowcase products={products} />
			</div>
		</section>
	);
}
