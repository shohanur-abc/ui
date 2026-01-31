import { Sparkles, Send, X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ModalContentProps {
	badge: string;
	title: string;
	description: string;
	placeholder: string;
	buttonText: string;
	buttonIcon?: React.ElementType;
	dismissLabel: string;
	footerText: string;
}

const GradientDecorative = () => (
	<div className="absolute inset-0 -z-10">
		<div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary/20 to-transparent blur-3xl" />
		<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent blur-2xl" />
	</div>
);

const ModalContent = ({ badge, title, description, placeholder, buttonText, buttonIcon: Icon, dismissLabel, footerText }: ModalContentProps) => (
	<div className="relative max-w-lg p-6 @md:p-8 rounded-2xl border bg-card shadow-2xl overflow-hidden">
		<GradientDecorative />
		<Button
			variant="ghost"
			size="icon-sm"
			className="absolute top-4 right-4"
		>
			<X className="size-4" />
			<span className="sr-only">{dismissLabel}</span>
		</Button>
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-3">
				<Badge className="w-fit gap-1.5">
					<Sparkles className="size-3" />
					{badge}
				</Badge>
				<h2 className="text-2xl @md:text-3xl font-bold tracking-tight">{title}</h2>
				<p className="text-muted-foreground text-sm @md:text-base">{description}</p>
			</div>
			<form className="flex flex-col @sm:flex-row gap-3">
				<Input
					type="email"
					placeholder={placeholder}
					className="flex-1 h-11"
				/>
				<Button size="lg" className="gap-2 h-11 shrink-0">
					{buttonText}
					{Icon && <Icon className="size-4" />}
				</Button>
			</form>
			<p className="text-xs text-muted-foreground text-center">{footerText}</p>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 flex items-center justify-center">
				<ModalContent
					badge="Special Offer"
					title="Unlock exclusive content"
					description="Join our newsletter and get instant access to premium resources, guides, and early product announcements."
					placeholder="you@example.com"
					buttonText="Get Access"
					buttonIcon={Send}
					dismissLabel="Close"
					footerText="We respect your privacy. Unsubscribe at any time."
				/>
			</div>
		</section>
	);
}
