import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Gift, Tag, Percent } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Logo = ({ name, icon: Icon }: { name: string; icon: React.ElementType }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const PromoHeader = ({
	badge,
	title,
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 mb-6">
		<Badge variant="secondary" className="mb-2 bg-primary/20 text-primary border-0">
			<Gift className="size-3 mr-1" />
			{badge}
		</Badge>
		<h3 className="font-semibold text-lg">{title}</h3>
		<p className="text-sm text-muted-foreground">{description}</p>
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

const NewsletterCheckbox = ({ label }: { label: string }) => (
	<div className="flex items-center gap-2">
		<Checkbox id="newsletter" defaultChecked />
		<Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
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
	<p className="text-sm text-muted-foreground text-center">
		{text}{' '}
		<Link href={href} className="text-primary font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="DealZone" icon={Tag} />
						</div>
						<CardTitle className="text-2xl">Create your account</CardTitle>
						<CardDescription>Sign up and get exclusive offers</CardDescription>
					</CardHeader>
					<CardContent>
						<PromoHeader
							badge="Welcome Offer"
							title="Get 20% off your first order"
							description="Use code WELCOME20 at checkout"
						/>
						<form className="space-y-4">
							<FormField label="Full Name" type="text" placeholder="John Doe" icon={User} />
							<FormField label="Email" type="email" placeholder="you@example.com" icon={Mail} />
							<FormField label="Password" type="password" placeholder="••••••••" icon={Lock} />
							<NewsletterCheckbox label="Send me exclusive deals and promotions" />
							<SubmitButton label="Create Account & Get 20% Off" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter>
						<FooterLink text="Already have an account?" linkText="Sign in" href="/login" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
