import Link from 'next/link';
import { Mail, Lock, ArrowRight, Sparkles, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const TestimonialBadge = ({
	quote,
	author,
	role,
	avatar,
	rating,
}: {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}) => (
	<div className="p-4 rounded-xl bg-muted/50 border border-border/50">
		<div className="flex gap-1 mb-3">
			{Array.from({ length: rating }).map((_, i) => (
				<Star key={i} className="size-4 fill-amber-400 text-amber-400" />
			))}
		</div>
		<p className="text-sm text-muted-foreground italic mb-3">
			&ldquo;{quote}&rdquo;
		</p>
		<div className="flex items-center gap-2">
			<Avatar className="size-8">
				<AvatarImage src={avatar} />
				<AvatarFallback>{author[0]}</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-sm font-medium leading-none">{author}</p>
				<p className="text-xs text-muted-foreground">{role}</p>
			</div>
		</div>
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
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="Stellar" icon={Sparkles} />
						</div>
						<CardTitle className="text-2xl">Welcome back</CardTitle>
						<CardDescription>Sign in to continue shopping</CardDescription>
					</CardHeader>
					<CardContent>
						<TestimonialBadge
							quote="Best online shopping experience I've ever had. Fast delivery and great prices!"
							author="Sarah Chen"
							role="Verified Buyer"
							avatar=""
							rating={5}
						/>
						<form className="space-y-4 mt-6">
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
					</CardContent>
					<CardFooter>
						<FooterLink
							text="New customer?"
							linkText="Create account"
							href="/signup"
						/>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
