import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Services" />
					<Title text="Complete Solutions" />
					<Description text="End-to-end services to help you build, launch, and grow your digital products." />
				</div>

				<ZigzagItems
					items={[
						{
							image: 'https://picsum.photos/seed/zz1/800/600',
							title: 'Product Strategy',
							description:
								'Define your vision and create a roadmap for success. We help you identify opportunities, validate ideas, and plan for growth.',
							features: [
								'Market research',
								'User personas',
								'Competitive analysis',
								'Product roadmap',
							],
							ctaText: 'Learn More',
							ctaHref: '/services/strategy',
						},
						{
							image: 'https://picsum.photos/seed/zz2/800/600',
							title: 'Design & Experience',
							description:
								'Create beautiful, intuitive interfaces that users love. Our design team combines research with creativity to deliver exceptional experiences.',
							features: [
								'UX research',
								'Wireframing',
								'Visual design',
								'Prototyping',
							],
							ctaText: 'Learn More',
							ctaHref: '/services/design',
						},
						{
							image: 'https://picsum.photos/seed/zz3/800/600',
							title: 'Development',
							description:
								'Build robust, scalable applications with modern technologies. We follow best practices to deliver high-quality code.',
							features: [
								'Web apps',
								'Mobile apps',
								'APIs',
								'Cloud infrastructure',
							],
							ctaText: 'Learn More',
							ctaHref: '/services/development',
						},
					]}
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface ZigzagItem {
	image: string;
	title: string;
	description: string;
	features: string[];
	ctaText: string;
	ctaHref: string;
}

const ZigzagItems = ({ items }: { items: ZigzagItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			({ image, title, description, features, ctaText, ctaHref }, i) => (
				<div
					key={i}
					className={`grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center ${
						i % 2 === 1 ? '' : ''
					}`}
				>
					<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
						<h3 className="text-xl @sm:text-2xl @md:text-3xl font-bold tracking-tight mb-4">
							{title}
						</h3>
						<p className="text-base text-muted-foreground leading-relaxed mb-6">
							{description}
						</p>
						<ul className="grid @sm:grid-cols-2 gap-2 mb-6">
							{features.map((feature, j) => (
								<li key={j} className="flex items-center gap-2 text-sm">
									<Check className="size-4 text-primary shrink-0" />
									{feature}
								</li>
							))}
						</ul>
						<Button variant="outline" asChild>
							<Link href={ctaHref}>
								{ctaText}
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
					<div
						className={`relative aspect-4/3 rounded-2xl overflow-hidden ${i % 2 === 1 ? '@xl:order-1' : ''}`}
					>
						<Image src={image} alt={title} fill className="object-cover" />
					</div>
				</div>
			),
		)}
	</div>
);
