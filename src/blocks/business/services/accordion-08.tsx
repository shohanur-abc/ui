'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, Code2, Database, Globe, Palette, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-10 @xl:gap-16">
					<div className="@xl:sticky @xl:top-8 @xl:self-start">
						<Eyebrow text="Technologies" />
						<Title text="Tech Stack Services" />
						<Description text="Expert development services across modern technology stacks. We choose the right tools for your unique requirements." />

						<div className="mt-8 grid grid-cols-3 gap-4">
							<TechStat value="50+" label="Technologies" />
							<TechStat value="8+" label="Years Avg Exp" />
							<TechStat value="99%" label="Client Satisfaction" />
						</div>
					</div>

					<ServiceAccordion
						items={[
							{
								icon: Globe,
								title: 'Frontend Development',
								technologies: [
									'React',
									'Next.js',
									'Vue',
									'Svelte',
									'TypeScript',
								],
								timeline: '4-8 weeks',
								description:
									'Modern, responsive user interfaces built with the latest frontend frameworks and best practices.',
							},
							{
								icon: Server,
								title: 'Backend Development',
								technologies: ['Node.js', 'Python', 'Go', 'Rust', '.NET'],
								timeline: '6-12 weeks',
								description:
									'Scalable server-side applications, APIs, and microservices using robust backend technologies.',
							},
							{
								icon: Database,
								title: 'Database Solutions',
								technologies: [
									'PostgreSQL',
									'MongoDB',
									'Redis',
									'Elasticsearch',
								],
								timeline: '2-4 weeks',
								description:
									'Database design, optimization, and management for high-performance data operations.',
							},
							{
								icon: Palette,
								title: 'Mobile Development',
								technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
								timeline: '8-16 weeks',
								description:
									'Native and cross-platform mobile applications for iOS and Android platforms.',
							},
							{
								icon: Code2,
								title: 'DevOps & Cloud',
								technologies: [
									'AWS',
									'GCP',
									'Docker',
									'Kubernetes',
									'Terraform',
								],
								timeline: '2-6 weeks',
								description:
									'Infrastructure automation, CI/CD pipelines, and cloud architecture design.',
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
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const TechStat = ({ value, label }: { value: string; label: string }) => (
	<div className="text-center p-4 bg-muted/50 rounded-xl">
		<p className="text-xl @md:text-2xl font-bold">{value}</p>
		<p className="text-xs @md:text-sm text-muted-foreground">{label}</p>
	</div>
);

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	technologies: string[];
	timeline: string;
	description: string;
}

const ServiceAccordion = ({ items }: { items: ServiceItem[] }) => (
	<Accordion type="single" collapsible className="w-full">
		{items.map(
			({ icon: Icon, title, technologies, timeline, description }, i) => (
				<AccordionItem key={i} value={`item-${i}`} className="border-b">
					<AccordionTrigger className="text-left hover:no-underline py-5">
						<div className="flex items-center gap-4">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
								<Icon className="size-5 text-primary" />
							</div>
							<span className="text-base @md:text-lg font-semibold">
								{title}
							</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pb-5">
						<div className="pl-14">
							<p className="text-sm @md:text-base text-muted-foreground mb-4 leading-relaxed">
								{description}
							</p>

							<div className="flex flex-wrap gap-2 mb-4">
								{technologies.map((tech, j) => (
									<Badge key={j} variant="secondary" className="text-xs">
										{tech}
									</Badge>
								))}
							</div>

							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Clock className="size-4" />
								<span>Typical timeline: {timeline}</span>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			),
		)}
	</Accordion>
);
