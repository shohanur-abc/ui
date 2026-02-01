import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Gem, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500">
			<Icon className="size-5 text-white" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const PremiumBadge = ({ label }: { label: string }) => (
	<Badge
		variant="secondary"
		className="gap-1 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-600 border-amber-500/30"
	>
		<Gem className="size-3" />
		{label}
	</Badge>
);

const BenefitsList = ({ benefits }: { benefits: string[] }) => (
	<div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/5 to-yellow-500/5 border border-amber-500/20">
		<p className="text-sm font-medium mb-3">Premium benefits include:</p>
		<ul className="space-y-2">
			{benefits.map((benefit, i) => (
				<li key={i} className="flex items-center gap-2 text-sm">
					<CheckCircle2 className="size-4 text-amber-500" />
					<span>{benefit}</span>
				</li>
			))}
		</ul>
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
	<Button
		type="submit"
		size="lg"
		className="w-full gap-2 group bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
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
	<p className="text-sm text-muted-foreground text-center">
		{text}{' '}
		<Link href={href} className="text-amber-600 font-medium hover:underline">
			{linkText}
		</Link>
	</p>
);

export default function Main() {
	const benefits = [
		'Free express shipping on all orders',
		'Early access to sales and new arrivals',
		'Exclusive member-only discounts',
		'Priority customer support',
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-gradient-to-br from-amber-500/5 to-yellow-500/5">
				<Card className="w-full max-w-md border-amber-500/20">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="LuxeStore" icon={Gem} />
						</div>
						<div className="flex justify-center mb-2">
							<PremiumBadge label="Premium Membership" />
						</div>
						<CardTitle className="text-2xl">Join Premium</CardTitle>
						<CardDescription>Create your premium account today</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
							<FormField
								label="Full Name"
								type="text"
								placeholder="John Doe"
								icon={User}
							/>
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
							<BenefitsList benefits={benefits} />
							<SubmitButton label="Start Premium Trial" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter>
						<FooterLink
							text="Already premium?"
							linkText="Sign in"
							href="/login"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
