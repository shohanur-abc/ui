import Link from 'next/link';
import { Lock, ArrowRight, KeyRound, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const GridDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
		<div
			className="absolute inset-0"
			style={{
				backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
				backgroundSize: '32px 32px',
			}}
		/>
	</div>
);

const Logo = ({ icon: Icon }: { icon: React.ElementType }) => (
	<div className="flex justify-center mb-8">
		<div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-border">
			<Icon className="size-8 text-primary" />
		</div>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-8">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-2">
			{text}
		</h1>
		{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
	</div>
);

const PasswordField = ({
	label,
	placeholder,
	showToggle,
}: {
	label: string;
	placeholder: string;
	showToggle?: boolean;
}) => (
	<div className="space-y-2">
		<Label htmlFor={label.toLowerCase().replace(/\s/g, '-')}>{label}</Label>
		<div className="relative">
			<Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				id={label.toLowerCase().replace(/\s/g, '-')}
				type="password"
				placeholder={placeholder}
				className="pl-10 pr-10"
			/>
			{showToggle && (
				<button
					type="button"
					className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
				>
					<Eye className="size-4" />
				</button>
			)}
		</div>
	</div>
);

const PasswordStrength = ({
	strength,
	labels,
}: {
	strength: number;
	labels: string[];
}) => (
	<div className="space-y-2">
		<div className="flex gap-1">
			{[1, 2, 3, 4].map((level) => (
				<div
					key={level}
					className={`h-1 flex-1 rounded-full transition-colors ${
						level <= strength ? 'bg-primary' : 'bg-muted'
					}`}
				/>
			))}
		</div>
		<p className="text-xs text-muted-foreground">
			{labels[strength] || labels[0]}
		</p>
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
	const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<GridDecorative />
			<div className="relative min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md">
					<Logo icon={KeyRound} />
					<Title
						text="Reset your password"
						subtitle="Create a new secure password for your account"
					/>

					<form className="space-y-5">
						<PasswordField
							label="New Password"
							placeholder="Enter new password"
							showToggle
						/>
						<PasswordField
							label="Confirm Password"
							placeholder="Confirm new password"
							showToggle
						/>
						<PasswordStrength strength={3} labels={strengthLabels} />
						<SubmitButton label="Reset Password" icon={ArrowRight} />
					</form>

					<div className="mt-8">
						<FooterLink
							text="Changed your mind?"
							linkText="Back to login"
							href="/login"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
