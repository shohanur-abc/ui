import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';

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

const Logo = ({
	name,
	icon: Icon,
}: {
	name: string;
	icon: React.ElementType;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-primary">
			<Icon className="size-5 text-primary-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
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

const BackLink = ({ href, label }: { href: string; label: string }) => (
	<Link
		href={href}
		className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
	>
		<ArrowLeft className="size-4" />
		{label}
	</Link>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="CartZone" icon={ShoppingCart} />
						</div>
						<CardTitle className="text-2xl">Forgot password?</CardTitle>
						<CardDescription>
							Enter your email and we&apos;ll send you a link to reset your
							password.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
							<FormField
								label="Email"
								type="email"
								placeholder="you@example.com"
								icon={Mail}
							/>
							<SubmitButton label="Send Reset Link" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter className="justify-center">
						<BackLink href="/login" label="Back to sign in" />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
