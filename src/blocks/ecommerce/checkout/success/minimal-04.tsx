import { Button } from '@/components/ui/button';
import { PartyPopper, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	label: string;
	href: string;
}

const CelebrationIcon = () => (
	<div className="relative">
		<div className="size-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
			<PartyPopper className="size-12 text-white" />
		</div>
		<div className="absolute -top-1 -right-1 size-8 rounded-full bg-primary flex items-center justify-center">
			<Sparkles className="size-4 text-primary-foreground" />
		</div>
	</div>
);

const SuccessMessage = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="text-center">
		<h1 className="text-3xl @lg:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
			{title}
		</h1>
		<p className="text-muted-foreground mt-2">{subtitle}</p>
	</div>
);

const CTA = ({ label, href }: CTAProps) => (
	<Button size="lg" className="w-full" asChild>
		<Link href={href}>{label}</Link>
	</Button>
);

export default function Main() {
	return (
		<section className="@container min-h-screen flex items-center justify-center py-12">
			<div className="mx-auto max-w-xs px-4 space-y-8 text-center">
				<CelebrationIcon />

				<SuccessMessage title="Woohoo!" subtitle="Your order is on its way" />

				<CTA label="Track Your Order" href="/track" />
			</div>
		</section>
	);
}
