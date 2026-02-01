import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FeaturedStatProps {
	badge: string;
	value: string;
	label: string;
	description: string;
	cta: { label: string; href: string };
}

const FeaturedStat = ({
	badge,
	value,
	label,
	description,
	cta,
}: FeaturedStatProps) => (
	<Card className="group relative overflow-hidden p-8 @md:p-12">
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
		<div className="absolute -right-20 -top-20 size-60 rounded-full bg-primary/10 blur-3xl" />
		<div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-accent/10 blur-3xl" />
		<div className="relative space-y-6 text-center">
			<Badge variant="secondary" className="gap-1.5">
				<Sparkles className="size-3" />
				{badge}
			</Badge>
			<div>
				<p className="text-6xl font-bold tracking-tighter @sm:text-7xl @lg:text-8xl">
					{value}
				</p>
				<p className="mt-2 text-xl font-medium @sm:text-2xl">{label}</p>
			</div>
			<p className="mx-auto max-w-md text-muted-foreground">{description}</p>
			<Button asChild className="gap-2">
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</Card>
);

export default function Main() {
	const stat: FeaturedStatProps = {
		badge: 'Milestone Reached',
		value: '10M+',
		label: 'Orders Delivered',
		description:
			"We've officially crossed 10 million orders delivered worldwide. Thank you for being part of our journey.",
		cta: { label: 'Join Our Community', href: '/signup' },
	};

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<FeaturedStat {...stat} />
			</div>
		</section>
	);
}
