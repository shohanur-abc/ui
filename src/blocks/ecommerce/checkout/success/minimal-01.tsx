import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const SuccessIcon = () => (
	<div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
		<CheckCircle className="size-8 text-primary" />
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
		<h1 className="text-2xl @lg:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-2">{description}</p>
	</div>
);

const OrderNumber = ({ number }: { number: string }) => (
	<p className="text-center text-sm text-muted-foreground">
		Order <span className="font-mono font-semibold text-foreground">{number}</span>
	</p>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
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
			<div className="mx-auto max-w-md px-4 @sm:px-6 space-y-8 text-center">
				<SuccessIcon />

				<SuccessMessage
					title="Thank You!"
					description="Your order has been confirmed."
				/>

				<OrderNumber number="ORD-2024-78432" />

				<CTA
					items={[
						{ label: 'Track Order', href: '/track' },
						{ label: 'Continue Shopping', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
