import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const SuccessIcon = () => (
	<div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
		<CheckCircle2 className="size-10 text-emerald-500" />
	</div>
);

const SuccessMessage = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className="text-center">
		<h1 className="text-3xl @lg:text-4xl font-bold">{title}</h1>
		<p className="text-lg text-muted-foreground mt-3">{description}</p>
	</div>
);

const EmailConfirmation = ({ email }: { email: string }) => (
	<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
		<Mail className="size-4" />
		<span>Confirmation sent to {email}</span>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-4 justify-center">
		{items.map(({ label, href, variant }, i) => (
			<Button key={i} size="lg" variant={variant || 'default'} asChild>
				<Link href={href}>{label}</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container min-h-screen flex items-center justify-center py-12">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 space-y-8 text-center">
				<SuccessIcon />

				<SuccessMessage
					title="Order Confirmed"
					description="We've received your order and are preparing it for shipment."
				/>

				<EmailConfirmation email="customer@example.com" />

				<CTA
					items={[
						{ label: 'View Order', href: '/orders' },
						{ label: 'Home', href: '/', variant: 'ghost' },
					]}
				/>
			</div>
		</section>
	);
}
