import Link from 'next/link';
import {
	Mail,
	Lock,
	ArrowRight,
	AlertTriangle,
	RefreshCw,
	HelpCircle,
} from 'lucide-react';

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Logo = ({ name }: { name: string }) => (
	<div className="flex items-center gap-2">
		<div className="flex size-10 items-center justify-center rounded-xl bg-destructive">
			<AlertTriangle className="size-5 text-destructive-foreground" />
		</div>
		<span className="text-xl font-bold tracking-tight">{name}</span>
	</div>
);

const ErrorAlert = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<Alert variant="destructive" className="mb-6">
		<AlertTriangle className="size-4" />
		<AlertTitle>{title}</AlertTitle>
		<AlertDescription>{description}</AlertDescription>
	</Alert>
);

const FormField = ({
	label,
	type,
	placeholder,
	icon: Icon,
	error,
}: {
	label: string;
	type: string;
	placeholder: string;
	icon: React.ElementType;
	error?: string;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
		<div className="relative">
			<Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				id={label.toLowerCase().replace(/\s/g, '-')}
				type={type}
				placeholder={placeholder}
				className={`pl-10 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
			/>
		</div>
		{error && <p className="text-sm text-destructive">{error}</p>}
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

const HelpLinks = ({
	links,
}: {
	links: Array<{ icon: React.ElementType; label: string; href: string }>;
}) => (
	<div className="flex flex-col gap-2">
		{links.map((link, i) => (
			<Link
				key={i}
				href={link.href}
				className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<link.icon className="size-4" />
				{link.label}
			</Link>
		))}
	</div>
);

export default function Main() {
	const helpLinks = [
		{ icon: RefreshCw, label: 'Reset your password', href: '/forgot-password' },
		{ icon: HelpCircle, label: 'Contact support', href: '/support' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center p-4 @sm:p-6 @lg:p-8 bg-muted/30">
				<Card className="w-full max-w-md border-destructive/50">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<Logo name="ShopNow" />
						</div>
						<CardTitle className="text-2xl">Sign in failed</CardTitle>
						<CardDescription>Please check your credentials</CardDescription>
					</CardHeader>
					<CardContent>
						<ErrorAlert
							title="Invalid credentials"
							description="The email or password you entered is incorrect. Please try again."
						/>
						<form className="space-y-4">
							<FormField
								label="Email"
								type="email"
								placeholder="you@example.com"
								icon={Mail}
								error="Please enter a valid email"
							/>
							<FormField
								label="Password"
								type="password"
								placeholder="••••••••"
								icon={Lock}
								error="Password is incorrect"
							/>
							<SubmitButton label="Try Again" icon={ArrowRight} />
						</form>
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<HelpLinks links={helpLinks} />
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
