import Link from 'next/link';
import { Mail, Lock, ArrowRight, Store, MapPin, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GradientDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-full" />
		<div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent rounded-full" />
	</div>
);

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center justify-center gap-2 mb-8">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-6">
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

const EmailLoginForm = () => (
	<form className="space-y-5">
		<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
		<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
		<Button type="submit" size="lg" className="w-full gap-2 group">
			Sign in
			<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
		</Button>
	</form>
);

const OrderLookupForm = () => (
	<form className="space-y-5">
		<FormField label="Order Number" type="text" placeholder="ORD-123456789" icon={Search} />
		<FormField label="Email or Phone" type="text" placeholder="you@example.com or (555) 123-4567" icon={Mail} />
		<Button type="submit" size="lg" className="w-full gap-2 group">
			Track Order
			<Search className="size-4" />
		</Button>
	</form>
);

const StoreLocatorForm = () => (
	<form className="space-y-5">
		<FormField label="ZIP Code or City" type="text" placeholder="Enter location" icon={MapPin} />
		<Button type="submit" size="lg" className="w-full gap-2 group">
			Find Stores
			<MapPin className="size-4" />
		</Button>
		<Button type="button" variant="outline" size="lg" className="w-full gap-2">
			<MapPin className="size-4" />
			Use my location
		</Button>
	</form>
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
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<GradientDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="OmniShop" icon={Store} />
					<Title text="Welcome to OmniShop" subtitle="Sign in, track orders, or find a store" />

					<Tabs defaultValue="signin" className="w-full">
						<TabsList className="grid w-full grid-cols-3 mb-6">
							<TabsTrigger value="signin">Sign In</TabsTrigger>
							<TabsTrigger value="order">Track Order</TabsTrigger>
							<TabsTrigger value="store">Find Store</TabsTrigger>
						</TabsList>
						<TabsContent value="signin">
							<EmailLoginForm />
							<div className="mt-6">
								<FooterLink text="New customer?" linkText="Create account" href="/signup" />
							</div>
						</TabsContent>
						<TabsContent value="order">
							<OrderLookupForm />
							<div className="mt-6">
								<FooterLink text="Need help?" linkText="Contact support" href="/support" />
							</div>
						</TabsContent>
						<TabsContent value="store">
							<StoreLocatorForm />
							<div className="mt-6">
								<FooterLink text="Want to see all stores?" linkText="View directory" href="/stores" />
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
