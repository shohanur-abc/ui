import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GlowDecorative = () => (
	<div className="absolute inset-0 overflow-hidden pointer-events-none">
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
	</div>
);

const StatCard = ({
	value,
	label,
	highlight,
}: {
	value: string;
	label: string;
	highlight?: boolean;
}) => (
	<div
		className={`p-6 @md:p-8 rounded-2xl text-center ${highlight ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
	>
		<span className="text-4xl @md:text-5xl @lg:text-6xl font-black">
			{value}
		</span>
		<p
			className={`text-sm @md:text-base mt-2 ${highlight ? 'opacity-80' : 'text-muted-foreground'}`}
		>
			{label}
		</p>
	</div>
);

const SectionContent = ({
	headline,
	description,
	cta,
}: {
	headline: { text: string; highlight: string };
	description: string;
	cta: { label: string; href: string };
}) => (
	<div className="text-center max-w-2xl mx-auto mb-10 @md:mb-12">
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">
			{headline.text}
			<span className="text-primary"> {headline.highlight}</span>
		</h2>
		<p className="text-muted-foreground mb-6">{description}</p>
		<Button className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<GlowDecorative />
				<div className="relative max-w-5xl mx-auto">
					<SectionContent
						headline={{ text: 'Trusted by', highlight: 'Millions' }}
						description="Join the community of satisfied customers who trust us for quality products and exceptional service."
						cta={{ label: 'Start Shopping', href: '/shop' }}
					/>
					<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
						<StatCard value="4.9" label="Average Rating" />
						<StatCard value="2M+" label="Happy Customers" highlight />
						<StatCard value="99%" label="Satisfaction Rate" />
						<StatCard value="24/7" label="Customer Support" />
					</div>
				</div>
			</div>
		</section>
	);
}
