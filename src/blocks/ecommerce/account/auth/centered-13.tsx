import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Rocket, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StarsDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		{Array.from({ length: 50 }).map((_, i) => (
			<div
				key={i}
				className="absolute size-1 rounded-full bg-primary/20"
				style={{
					top: `${Math.random() * 100}%`,
					left: `${Math.random() * 100}%`,
					opacity: Math.random() * 0.5 + 0.25,
				}}
			/>
		))}
	</div>
);

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center justify-center gap-2 mb-8">
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

const Testimonial = ({
	quote,
	author,
	role,
	avatar,
}: {
	quote: string;
	author: string;
	role: string;
	avatar: string;
}) => (
	<div className="bg-muted/30 rounded-xl p-4 mb-8">
		<div className="flex gap-1 mb-3">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star key={i} className="size-4 fill-primary text-primary" />
			))}
		</div>
		<p className="text-sm text-muted-foreground mb-3 italic">
			&ldquo;{quote}&rdquo;
		</p>
		<div className="flex items-center gap-3">
			<Avatar className="size-8">
				<AvatarImage src={avatar} />
				<AvatarFallback>{author[0]}</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-sm font-medium">{author}</p>
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
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<StarsDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo name="LaunchPad" icon={Rocket} />
					<Title
						text="Join the revolution"
						subtitle="Create your account and start exploring"
					/>

					<Testimonial
						quote="This platform completely changed how I shop online. The experience is simply unmatched!"
						author="Sarah Chen"
						role="Verified Customer"
						avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
					/>

					<form className="space-y-5">
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
						<SubmitButton label="Get Started Free" icon={ArrowRight} />
					</form>

					<div className="mt-8">
						<FooterLink
							text="Already have an account?"
							linkText="Sign in"
							href="/login"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
