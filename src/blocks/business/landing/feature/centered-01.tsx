import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface FeaturePoint {
	text: string;
}

interface CTAItem {
	label: string;
	href: string;
	variant?: 'default' | 'outline';
	icon?: ComponentType<{ className?: string }>;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<Eyebrow icon={Star} text="Premium Features" />
					<Title text="One Platform for" highlight="All Your Needs" />
					<Description text="Stop juggling multiple tools. Our unified platform brings together everything you need to build, launch, and scale your business efficiently." />
					<FeaturePoints
						items={[
							{ text: 'Unlimited team members and projects' },
							{ text: 'Advanced analytics and reporting' },
							{ text: 'Priority 24/7 support' },
							{ text: 'Custom integrations and API access' },
							{ text: '99.99% uptime guarantee' },
							{ text: 'Enterprise-grade security' },
						]}
					/>
					<CTA
						items={[
							{ label: 'Start Free Trial', href: '/trial', icon: ArrowRight },
							{ label: 'Contact Sales', href: '/sales', variant: 'outline' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-5 @md:mb-6">
		<Badge variant="secondary" className="gap-2 px-4 py-1.5">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-5 @md:mb-6 text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-8 @md:mb-10 text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
		{text}
	</p>
);

const FeaturePoints = ({ items }: { items: FeaturePoint[] }) => (
	<ul className="mb-8 @md:mb-10 grid gap-3 @sm:grid-cols-2 @lg:grid-cols-3 max-w-3xl mx-auto">
		{items.map((item, index) => (
			<li
				key={index}
				className="flex items-center gap-2 text-sm @md:text-base text-muted-foreground"
			>
				<CheckCircle className="size-4 @md:size-5 text-primary shrink-0" />
				{item.text}
			</li>
		))}
	</ul>
);

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, variant, icon: Icon }) => (
			<Button
				key={label}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);
