import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="max-w-5xl mx-auto text-center">
					<Eyebrow icon={Sparkles} text="Premium Quality" />
					<Title text="Crafting Digital Experiences" highlight="That Matter" />
					<Description text="I believe great software is invisible—it just works. My mission is to create tools and experiences that feel natural, perform flawlessly, and make people's lives easier." />

					<CTA
						items={[
							{
								label: 'View Portfolio',
								href: '#projects',
								variant: 'default',
							},
							{ label: 'Get in Touch', href: '#contact', variant: 'outline' },
						]}
					/>

					<TrustBadges
						items={[
							'TypeScript',
							'React',
							'Next.js',
							'Node.js',
							'PostgreSQL',
							'AWS',
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface EyebrowProps {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

const Eyebrow = ({ icon: Icon, text }: EyebrowProps) => (
	<Badge variant="secondary" className="mb-4 @md:mb-5 gap-1.5">
		<Icon className="size-3.5" />
		{text}
	</Badge>
);

interface TitleProps {
	text: string;
	highlight: string;
}

const Title = ({ text, highlight }: TitleProps) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-5 @md:mb-6">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8 @md:mb-10">
		{text}
	</p>
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
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-10 @md:mb-14">
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

const TrustBadges = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap justify-center gap-2 @md:gap-3">
		{items.map((item, i) => (
			<span
				key={i}
				className="px-3 @md:px-4 py-1.5 text-xs @md:text-sm rounded-full border bg-muted/30 text-muted-foreground"
			>
				{item}
			</span>
		))}
	</div>
);
