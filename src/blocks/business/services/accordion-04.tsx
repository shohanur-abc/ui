'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	BarChart3,
	BrainCircuit,
	Cloud,
	Code2,
	Globe,
	Lock,
	Palette,
	Server,
	Smartphone,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Full Catalog" />
					<Title text="All Services" />
					<Description text="A comprehensive view of everything we offer, organized by category." />
				</div>

				<div className="grid @xl:grid-cols-2 gap-6 @xl:gap-8">
					<CategoryAccordion
						category="Development"
						items={[
							{
								icon: Code2,
								title: 'Web Development',
								description:
									'Modern web applications with React, Next.js, and more.',
							},
							{
								icon: Smartphone,
								title: 'Mobile Development',
								description: 'Native and cross-platform mobile apps.',
							},
							{
								icon: Server,
								title: 'Backend Development',
								description: 'Scalable APIs and server-side solutions.',
							},
						]}
					/>

					<CategoryAccordion
						category="Infrastructure"
						items={[
							{
								icon: Cloud,
								title: 'Cloud Services',
								description: 'AWS, GCP, Azure infrastructure and migration.',
							},
							{
								icon: Lock,
								title: 'Security',
								description: 'Enterprise security and compliance.',
							},
							{
								icon: Server,
								title: 'DevOps',
								description: 'CI/CD pipelines and automation.',
							},
						]}
					/>

					<CategoryAccordion
						category="Data & AI"
						items={[
							{
								icon: BarChart3,
								title: 'Analytics',
								description: 'Business intelligence and reporting.',
							},
							{
								icon: BrainCircuit,
								title: 'Machine Learning',
								description: 'AI models and intelligent automation.',
							},
							{
								icon: Server,
								title: 'Data Engineering',
								description: 'Data pipelines and warehousing.',
							},
						]}
					/>

					<CategoryAccordion
						category="Strategy"
						items={[
							{
								icon: Palette,
								title: 'Product Design',
								description: 'UX research and interface design.',
							},
							{
								icon: Globe,
								title: 'Digital Strategy',
								description: 'Transformation roadmaps and consulting.',
							},
							{
								icon: BarChart3,
								title: 'Growth',
								description: 'Marketing and growth optimization.',
							},
						]}
					/>
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

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const CategoryAccordion = ({
	category,
	items,
}: {
	category: string;
	items: ServiceItem[];
}) => (
	<div className="bg-card border rounded-2xl p-5 @md:p-6">
		<h3 className="text-lg @md:text-xl font-bold mb-4">{category}</h3>
		<Accordion type="single" collapsible className="w-full">
			{items.map(({ icon: Icon, title, description }, i) => (
				<AccordionItem key={i} value={`item-${i}`}>
					<AccordionTrigger className="text-left hover:no-underline py-3">
						<div className="flex items-center gap-3">
							<Icon className="size-4 text-primary shrink-0" />
							<span className="text-sm @md:text-base font-medium">{title}</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pl-7">
						<p className="text-sm text-muted-foreground">{description}</p>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	</div>
);
