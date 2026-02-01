import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle, Package2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SuccessIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
	<div className="flex justify-center mb-6">
		<div className="flex size-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
			<Icon className="size-10 text-primary" />
		</div>
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="text-center mb-6">
		<h1 className="text-2xl @sm:text-3xl font-bold tracking-tight mb-3">
			{text}
		</h1>
		{subtitle && (
			<p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
				{subtitle}
			</p>
		)}
	</div>
);

const EmailSent = ({ email }: { email: string }) => (
	<div className="bg-muted/50 rounded-xl p-4 mb-6 text-center">
		<div className="flex items-center justify-center gap-2 text-sm">
			<Mail className="size-4 text-muted-foreground" />
			<span className="font-medium">{email}</span>
		</div>
	</div>
);

const ActionButton = ({
	label,
	icon: Icon,
	href,
	variant = 'default',
}: {
	label: string;
	icon?: React.ElementType;
	href: string;
	variant?: 'default' | 'outline' | 'secondary';
}) => (
	<Button variant={variant} size="lg" className="w-full gap-2 group" asChild>
		<Link href={href}>
			{label}
			{Icon && (
				<Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
			)}
		</Link>
	</Button>
);

const Steps = ({ items }: { items: Array<{ step: number; text: string }> }) => (
	<div className="space-y-3 text-left mb-8">
		{items.map((item) => (
			<div key={item.step} className="flex items-start gap-3">
				<div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary shrink-0 mt-0.5">
					{item.step}
				</div>
				<span className="text-sm text-muted-foreground">{item.text}</span>
			</div>
		))}
	</div>
);

const ResendText = ({ text, linkText }: { text: string; linkText: string }) => (
	<p className="text-center text-sm text-muted-foreground mt-6">
		{text}{' '}
		<button type="button" className="text-primary font-medium hover:underline">
			{linkText}
		</button>
	</p>
);

export default function Main() {
	const steps = [
		{ step: 1, text: 'Open your email inbox' },
		{ step: 2, text: 'Click the verification link we sent' },
		{ step: 3, text: 'Start shopping!' },
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="auth">
			<div className="min-h-screen flex items-center justify-center px-4 @sm:px-6 py-12 @md:py-16">
				<div className="w-full max-w-md text-center">
					<SuccessIcon icon={CheckCircle} />
					<Title
						text="Check your email"
						subtitle="We've sent a verification link to your email address"
					/>
					<EmailSent email="user@example.com" />
					<Steps items={steps} />

					<div className="space-y-3">
						<ActionButton label="Open email app" icon={Mail} href="mailto:" />
						<ActionButton
							label="Back to homepage"
							icon={Package2}
							href="/"
							variant="outline"
						/>
					</div>

					<ResendText
						text="Didn't receive the email?"
						linkText="Click to resend"
					/>
				</div>
			</div>
		</section>
	);
}
