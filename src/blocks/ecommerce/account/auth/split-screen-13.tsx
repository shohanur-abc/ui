import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	ArrowRight,
	MapPin,
	Navigation,
	Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MapPanel = ({
	stores,
}: {
	stores: Array<{ name: string; address: string; distance: string }>;
}) => (
	<div className="relative hidden @lg:flex flex-col p-8 @xl:p-12 bg-muted/30">
		<div className="flex items-center justify-between mb-6">
			<div>
				<h2 className="text-2xl font-bold">Find a store</h2>
				<p className="text-muted-foreground">Visit us in person</p>
			</div>
			<Button variant="outline" size="sm" className="gap-2">
				<Navigation className="size-4" />
				Near me
			</Button>
		</div>
		<div className="relative flex-1 rounded-2xl bg-muted/50 border border-border/50 mb-6 overflow-hidden">
			<div className="absolute inset-0 flex items-center justify-center">
				<MapPin className="size-16 text-primary/20" />
			</div>
		</div>
		<div className="space-y-3">
			{stores.map((store, i) => (
				<div
					key={i}
					className="p-4 rounded-xl bg-card/80 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
				>
					<div className="flex items-start justify-between">
						<div>
							<p className="font-medium">{store.name}</p>
							<p className="text-sm text-muted-foreground">{store.address}</p>
						</div>
						<span className="text-sm text-primary font-medium">
							{store.distance}
						</span>
					</div>
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

export default function Main() {
	const stores = [
		{
			name: 'Downtown Store',
			address: '123 Main Street, New York',
			distance: '0.5 mi',
		},
		{
			name: 'Mall Location',
			address: '456 Shopping Center, Brooklyn',
			distance: '2.3 mi',
		},
		{
			name: 'Harbor Point',
			address: '789 Waterfront Ave, Jersey City',
			distance: '4.1 mi',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="LocalMart" icon={MapPin} />
						<Title
							text="Welcome back"
							subtitle="Sign in for in-store pickup & local deals"
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
							<ForgotLink href="/forgot-password" label="Forgot password?" />
							<SubmitButton label="Sign in" icon={ArrowRight} />
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
				<MapPanel stores={stores} />
			</div>
		</section>
	);
}
