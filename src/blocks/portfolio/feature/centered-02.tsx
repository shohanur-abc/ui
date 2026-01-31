import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="max-w-4xl mx-auto text-center">
					<Eyebrow text="Core Values" />
					<Title text="Building with Purpose" />
					<Description text="Every project is an opportunity to create something meaningful. I believe in transparency, quality, and delivering value that lasts." />

					<FeatureList
						items={[
							'Clean, maintainable code',
							'User-centered design',
							'Performance optimization',
							'Accessibility compliance',
							'Scalable architecture',
							'Continuous improvement',
						]}
					/>

					<CTA
						items={[
							{
								label: 'Start a Project',
								href: '#contact',
								variant: 'default',
							},
							{ label: 'Learn More', href: '#about', variant: 'outline' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-4 @md:mb-5">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-5 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed mb-8 @md:mb-10">
		{text}
	</p>
);

const FeatureList = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-8 @md:mb-10">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm @md:text-base px-3 py-1.5 rounded-full bg-muted/50"
			>
				<CheckCircle className="size-4 text-primary" />
				<span>{item}</span>
			</div>
		))}
	</div>
);

interface CTAItem {
	label: string;
	href: string;
	variant?:
		| 'default'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| 'destructive';
}

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, variant }, i) => (
			<Button key={i} size="lg" variant={variant} asChild>
				<Link href={href}>
					{label}
					{variant === 'default' && <ArrowRight className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);
