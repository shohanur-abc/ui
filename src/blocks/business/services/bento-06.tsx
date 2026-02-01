import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Blocks,
	Bot,
	Code2,
	Compass,
	Layers,
	Palette,
	Rocket,
	Settings,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Expertise" />
					<Title text="Technical Services" />
					<Description text="Deep technical expertise across the modern technology stack." />
				</div>

				<BentoGrid
					items={[
						{
							icon: Code2,
							title: 'Frontend Development',
							description:
								'React, Vue, Angular with responsive design and accessibility.',
							position: 'top-left',
						},
						{
							icon: Settings,
							title: 'Backend Systems',
							description: 'Scalable APIs with Node.js, Python, Go.',
							position: 'top-center',
						},
						{
							icon: Layers,
							title: 'Full-Stack',
							description:
								'End-to-end application development with modern frameworks and cloud-native architecture.',
							position: 'top-right-tall',
						},
						{
							icon: Palette,
							title: 'Design Systems',
							description: 'Component libraries that scale.',
							position: 'middle-left',
						},
						{
							icon: Zap,
							title: 'Performance',
							description: 'Speed optimization at every level.',
							position: 'middle-center',
						},
						{
							icon: Compass,
							title: 'Architecture',
							description: 'System design for scale.',
							position: 'bottom-left',
						},
						{
							icon: Blocks,
							title: 'Integration',
							description: 'Connect systems seamlessly.',
							position: 'bottom-center-left',
						},
						{
							icon: Bot,
							title: 'AI/ML',
							description: 'Intelligent automation.',
							position: 'bottom-center-right',
						},
						{
							icon: Rocket,
							title: 'Deployment',
							description: 'Zero-downtime releases.',
							position: 'bottom-right',
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
	position: string;
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-5 auto-rows-fr">
		{items.map(({ icon: Icon, title, description, position }, i) => {
			const isTall = position.includes('tall');
			return (
				<Card
					key={i}
					className={`group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5 ${
						isTall ? '@md:row-span-2' : ''
					}`}
				>
					<CardContent
						className={`p-5 @md:p-6 h-full flex flex-col ${
							isTall ? 'justify-center' : ''
						}`}
					>
						<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-5 @md:size-6" />
						</div>
						<h3 className="font-semibold mb-2">{title}</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{description}
						</p>
					</CardContent>
				</Card>
			);
		})}
	</div>
);
