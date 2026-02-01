import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Cpu, Layers, Palette } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="What We Do" />
					<Title text="Three Expertise Areas" />
					<Description text="Specialized focus areas where we consistently deliver exceptional results." />
				</div>

				<ServiceGrid
					items={[
						{
							icon: Palette,
							title: 'Design Excellence',
							description:
								'Creating beautiful, functional designs that communicate your brand story.',
							features: [
								'Brand Identity Design',
								'User Experience Design',
								'Interface Design',
								'Design Systems',
								'Motion Design',
							],
						},
						{
							icon: Cpu,
							title: 'Engineering Mastery',
							description:
								'Building robust software with cutting-edge technologies and best practices.',
							features: [
								'Web Applications',
								'Mobile Development',
								'API Development',
								'Cloud Architecture',
								'DevOps & CI/CD',
							],
						},
						{
							icon: Layers,
							title: 'Strategy & Growth',
							description:
								'Guiding businesses through digital transformation and sustainable growth.',
							features: [
								'Digital Strategy',
								'Product Roadmapping',
								'Market Research',
								'Performance Analytics',
								'Growth Consulting',
							],
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

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	features: string[];
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @lg:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description, features }, i) => (
			<Card
				key={i}
				className="group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
			>
				<CardContent className="p-6 @md:p-8">
					<div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
						<Icon className="size-7 @md:size-8" />
					</div>
					<h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-5">
						{description}
					</p>
					<ul className="space-y-2.5">
						{features.map((feature, j) => (
							<li
								key={j}
								className="flex items-center gap-2.5 text-sm @md:text-base"
							>
								<Check className="size-4 text-primary shrink-0" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		))}
	</div>
);
