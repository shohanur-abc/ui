import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Palette, Code2, Rocket, Settings } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="How We Work" />
					<Title text="Our Process" />
					<Description text="A proven methodology that delivers results, every time." />
				</div>

				<ProcessZigzag
					items={[
						{
							icon: Palette,
							step: 1,
							image: 'https://picsum.photos/seed/proc1/800/600',
							title: 'Discovery & Design',
							description:
								'We start by understanding your goals, users, and challenges. Through research and workshops, we define the product vision and create detailed designs.',
							highlights: [
								'Stakeholder interviews',
								'User research',
								'Wireframes',
								'Prototypes',
							],
						},
						{
							icon: Code2,
							step: 2,
							image: 'https://picsum.photos/seed/proc2/800/600',
							title: 'Development & Testing',
							description:
								'Our engineers build your product in sprints, with regular demos and testing. We follow best practices for code quality and security.',
							highlights: [
								'Agile sprints',
								'Code reviews',
								'Automated testing',
								'CI/CD',
							],
						},
						{
							icon: Rocket,
							step: 3,
							image: 'https://picsum.photos/seed/proc3/800/600',
							title: 'Launch & Optimize',
							description:
								'We deploy to production and monitor performance. Post-launch, we continue to optimize based on real user data.',
							highlights: [
								'Deployment',
								'Monitoring',
								'Analytics',
								'Iteration',
							],
						},
						{
							icon: Settings,
							step: 4,
							image: 'https://picsum.photos/seed/proc4/800/600',
							title: 'Support & Scale',
							description:
								"Our relationship doesn't end at launch. We provide ongoing support and help you scale as your business grows.",
							highlights: [
								'24/7 support',
								'Maintenance',
								'Scaling',
								'Feature updates',
							],
						},
					]}
				/>

				<div className="text-center mt-12 @md:mt-16">
					<Button size="lg" asChild>
						<Link href="/contact">
							Start Your Project
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
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

interface ProcessItem {
	icon: ComponentType<{ className?: string }>;
	step: number;
	image: string;
	title: string;
	description: string;
	highlights: string[];
}

const ProcessZigzag = ({ items }: { items: ProcessItem[] }) => (
	<div className="space-y-12 @xl:space-y-20">
		{items.map(
			({ icon: Icon, step, image, title, description, highlights }, i) => (
				<div
					key={i}
					className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
				>
					<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
						<div className="flex items-center gap-4 mb-4">
							<div className="relative">
								<div className="size-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
									<Icon className="size-6" />
								</div>
								<span className="absolute -top-2 -right-2 size-6 rounded-full bg-background border text-xs font-bold flex items-center justify-center">
									{step}
								</span>
							</div>
							<h3 className="text-xl @md:text-2xl font-bold">{title}</h3>
						</div>
						<p className="text-base text-muted-foreground leading-relaxed mb-4">
							{description}
						</p>
						<div className="flex flex-wrap gap-2">
							{highlights.map((item, j) => (
								<Badge key={j} variant="secondary">
									{item}
								</Badge>
							))}
						</div>
					</div>
					<div
						className={`relative aspect-4/3 rounded-2xl overflow-hidden ${
							i % 2 === 1 ? '@xl:order-1' : ''
						}`}
					>
						<Image src={image} alt={title} fill className="object-cover" />
					</div>
				</div>
			),
		)}
	</div>
);
