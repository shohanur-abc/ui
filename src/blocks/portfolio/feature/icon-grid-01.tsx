import { Badge } from '@/components/ui/badge';
import { Blocks, Brush, Code, Cpu, Globe, Layers } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
					<Eyebrow text="How I Work" />
					<Title text="Development Philosophy" />
					<Description text="Principles that guide every project and ensure consistent quality in all deliverables." />
				</div>

				<FeatureGrid
					items={[
						{
							icon: Code,
							title: 'Code Quality',
							description:
								'Clean, maintainable, and well-tested code that follows industry best practices and coding standards.',
							color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
						},
						{
							icon: Layers,
							title: 'Scalable Architecture',
							description:
								'Building systems designed to grow with your business, from startup to enterprise scale.',
							color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
						},
						{
							icon: Brush,
							title: 'Design Consistency',
							description:
								'Unified visual language and component systems that ensure brand coherence across all touchpoints.',
							color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
						},
						{
							icon: Globe,
							title: 'Web Standards',
							description:
								'Following W3C guidelines and modern web standards for maximum compatibility and future-proofing.',
							color: 'bg-green-500/10 text-green-600 dark:text-green-400',
						},
						{
							icon: Cpu,
							title: 'Performance First',
							description:
								'Optimizing for speed from day one, ensuring fast load times and smooth interactions.',
							color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
						},
						{
							icon: Blocks,
							title: 'Modular Design',
							description:
								'Component-based approach that enables flexibility, reusability, and easier maintenance.',
							color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="mb-3 @md:mb-4">
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

interface FeatureItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	color: string;
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
	<ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
		{items.map(({ icon: Icon, title, description, color }, i) => (
			<li key={i} className="group">
				<div
					className={`size-12 @md:size-14 rounded-xl flex items-center justify-center mb-4 ${color} transition-transform group-hover:scale-110`}
				>
					<Icon className="size-6 @md:size-7" />
				</div>
				<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
				<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
					{description}
				</p>
			</li>
		))}
	</ul>
);
