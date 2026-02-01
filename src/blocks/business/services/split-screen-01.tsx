import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<SplitContent
					eyebrow="Web Development"
					title="Modern Web Applications"
					description="Build fast, scalable web applications using cutting-edge technologies. Our team specializes in React, Next.js, and modern JavaScript frameworks to deliver exceptional user experiences."
					features={[
						'Server-side rendering for optimal performance',
						'Progressive web app capabilities',
						'Real-time data synchronization',
						'Accessibility-first development',
					]}
					image="https://picsum.photos/seed/web-dev/800/600"
					imageAlt="Web development illustration"
					ctaText="Start Your Project"
					ctaHref="/contact"
					reverse={false}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">
		{text}
	</p>
);

interface SplitContentProps {
	eyebrow: string;
	title: string;
	description: string;
	features: string[];
	image: string;
	imageAlt: string;
	ctaText: string;
	ctaHref: string;
	reverse: boolean;
}

const SplitContent = ({
	eyebrow,
	title,
	description,
	features,
	image,
	imageAlt,
	ctaText,
	ctaHref,
	reverse,
}: SplitContentProps) => (
	<div
		className={`grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center ${
			reverse ? '@xl:flex-row-reverse' : ''
		}`}
	>
		<div className={reverse ? '@xl:order-2' : ''}>
			<Eyebrow text={eyebrow} />
			<Title text={title} />
			<Description text={description} />

			<ul className="space-y-3 mb-8">
				{features.map((feature, i) => (
					<li key={i} className="flex items-start gap-3">
						<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
							<Check className="size-3 text-primary" />
						</div>
						<span className="text-sm @md:text-base">{feature}</span>
					</li>
				))}
			</ul>

			<Button asChild>
				<Link href={ctaHref}>
					{ctaText}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>

		<div
			className={`relative aspect-4/3 rounded-2xl overflow-hidden ${reverse ? '@xl:order-1' : ''}`}
		>
			<Image src={image} alt={imageAlt} fill className="object-cover" />
		</div>
	</div>
);
