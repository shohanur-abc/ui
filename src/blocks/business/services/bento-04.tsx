import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Boxes,
	Cog,
	FileCode,
	Globe,
	Palette,
	Rocket,
	Server,
	Shield,
	Smartphone,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Services" />
					<Title text="Full-Spectrum Capabilities" />
					<Description text="Everything you need to build, launch, and scale digital products." />
				</div>

				<BentoGrid
					items={[
						{
							icon: FileCode,
							title: 'Web Development',
							description:
								'Modern web applications with React, Next.js, and cutting-edge technologies.',
							span: 'col-2',
						},
						{
							icon: Smartphone,
							title: 'Mobile Apps',
							description: 'Native and cross-platform mobile development.',
							span: 'col-1',
						},
						{
							icon: Palette,
							title: 'UI/UX Design',
							description: 'User-centered design that converts.',
							span: 'col-1',
						},
						{
							icon: Server,
							title: 'Backend & APIs',
							description: 'Scalable server architectures.',
							span: 'col-1',
						},
						{
							icon: Shield,
							title: 'Security',
							description: 'Enterprise security solutions.',
							span: 'col-1',
						},
						{
							icon: Globe,
							title: 'Digital Strategy',
							description:
								'Comprehensive digital transformation roadmaps aligned with business goals.',
							span: 'col-2',
						},
						{
							icon: Cog,
							title: 'DevOps',
							description: 'CI/CD and infrastructure automation.',
							span: 'col-1',
						},
						{
							icon: Boxes,
							title: 'Integration',
							description: 'Connect all your systems.',
							span: 'col-1',
						},
						{
							icon: Rocket,
							title: 'Launch Support',
							description: 'Go-live and post-launch assistance.',
							span: 'col-1',
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

interface BentoItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	span: 'col-1' | 'col-2';
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4">
		{items.map(({ icon: Icon, title, description, span }, i) => (
			<Card
				key={i}
				className={`group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 ${
					span === 'col-2' ? '@xl:col-span-2' : ''
				}`}
			>
				<CardContent className="p-5 @md:p-6">
					<div className="flex items-start gap-4">
						<div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-5" />
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold mb-1">{title}</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{description}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
