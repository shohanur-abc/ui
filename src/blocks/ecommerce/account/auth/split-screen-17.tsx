import Link from 'next/link';
import Image from 'next/image';
import {
	Mail,
	Lock,
	ArrowRight,
	Package,
	Truck,
	CheckCircle2,
	ClipboardList,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const TrackingPanel = ({
	steps,
}: {
	steps: Array<{
		icon: React.ElementType;
		label: string;
		status: 'complete' | 'current' | 'upcoming';
	}>;
}) => (
	<div className="relative hidden @lg:flex flex-col justify-center p-8 @xl:p-12 bg-muted/30">
		<div className="max-w-md">
			<div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
				<Package className="size-8 text-primary" />
			</div>
			<h2 className="text-3xl font-bold mb-4">Track Your Orders</h2>
			<p className="text-muted-foreground mb-10">
				Sign in to get real-time updates on all your deliveries.
			</p>
			<div className="relative">
				<div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />
				<div className="space-y-6">
					{steps.map((step, i) => (
						<div key={i} className="flex items-center gap-4 relative">
							<div
								className={`flex size-12 items-center justify-center rounded-full z-10 ${
									step.status === 'complete'
										? 'bg-primary text-primary-foreground'
										: step.status === 'current'
											? 'bg-primary/20 text-primary border-2 border-primary'
											: 'bg-muted text-muted-foreground border border-border'
								}`}
							>
								{step.status === 'complete' ? (
									<CheckCircle2 className="size-5" />
								) : (
									<step.icon className="size-5" />
								)}
							</div>
							<span
								className={`font-medium ${step.status === 'upcoming' ? 'text-muted-foreground' : ''}`}
							>
								{step.label}
							</span>
						</div>
					))}
				</div>
			</div>
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
	const steps = [
		{ icon: ClipboardList, label: 'Order Placed', status: 'complete' as const },
		{ icon: Package, label: 'Processing', status: 'complete' as const },
		{ icon: Truck, label: 'In Transit', status: 'current' as const },
		{ icon: CheckCircle2, label: 'Delivered', status: 'upcoming' as const },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen grid @lg:grid-cols-2">
				<div className="flex flex-col justify-center px-6 @sm:px-8 @xl:px-16 py-12">
					<div className="w-full max-w-md mx-auto @lg:mx-0 @lg:ml-auto">
						<Logo name="TrackIt" icon={Package} />
						<Title
							text="Welcome back"
							subtitle="Sign in to track your packages"
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
							<RememberForgot
								rememberLabel="Keep me signed in"
								forgotLabel="Forgot password?"
								forgotHref="/forgot-password"
							/>
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
				<TrackingPanel steps={steps} />
			</div>
		</section>
	);
}
