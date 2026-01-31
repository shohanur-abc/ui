import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Repeat, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	label: string;
	href: string;
}

const SuccessIcon = () => (
	<div className="size-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto">
		<Repeat className="size-8 text-indigo-500" />
	</div>
);

const SuccessMessage = ({
	title,
	plan,
}: {
	title: string;
	plan: string;
}) => (
	<div className="text-center">
		<h1 className="text-2xl @lg:text-3xl font-bold">{title}</h1>
		<Badge className="mt-3 bg-indigo-500">{plan}</Badge>
	</div>
);

const PlanPrice = ({
	price,
	currency,
	interval,
}: {
	price: number;
	currency: string;
	interval: string;
}) => (
	<div className="text-center">
		<span className="text-4xl font-bold">
			{currency}
			{price}
		</span>
		<span className="text-muted-foreground">/{interval}</span>
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
			<div className="mx-auto max-w-xs px-4 space-y-6 text-center">
				<SuccessIcon />

				<SuccessMessage title="Subscribed!" plan="Pro Plan" />

				<PlanPrice price={29} currency="$" interval="month" />

				<CTA label="Get Started" href="/dashboard" />
			</div>
		</section>
	);
}
