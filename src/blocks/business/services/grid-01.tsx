import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Cloud, Code2, Database, Globe, Shield } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Services" />
					<Title text="What We Offer" />
					<Description text="Comprehensive solutions tailored to accelerate your digital transformation and drive measurable business outcomes." />
				</div>

				<ServiceGrid
					items={[
						{
							icon: Code2,
							title: 'Custom Development',
							description:
								'Bespoke software solutions built with modern technologies to solve your unique challenges.',
						},
						{
							icon: Cloud,
							title: 'Cloud Infrastructure',
							description:
								'Scalable cloud architecture designed for performance, reliability, and cost efficiency.',
						},
						{
							icon: Database,
							title: 'Data Engineering',
							description:
								'Transform raw data into actionable insights with robust data pipelines and analytics.',
						},
						{
							icon: Shield,
							title: 'Cybersecurity',
							description:
								'Protect your assets with comprehensive security assessments and implementations.',
						},
						{
							icon: Globe,
							title: 'Digital Strategy',
							description:
								'Strategic consulting to align technology initiatives with business objectives.',
						},
						{
							icon: BarChart3,
							title: 'Growth Analytics',
							description:
								'Data-driven insights to optimize performance and accelerate business growth.',
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
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description }, i) => (
			<Card
				key={i}
				className="group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
			>
				<CardContent className="p-6 @md:p-8">
					<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
						<Icon className="size-6 @md:size-7" />
					</div>
					<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
						{description}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);
