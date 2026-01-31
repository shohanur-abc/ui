'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Code, Database, Cloud, Palette } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Technical" />
					<Title text="Technical Expertise" />
					<Description text="Deep dive into my technical skills organized by domain." />
				</div>

				<div className="grid @md:grid-cols-2 gap-6">
					<DomainAccordion
						items={[
							{
								id: 'd1',
								icon: Code,
								title: 'Frontend Engineering',
								description: 'Building modern web interfaces',
								skills: [
									'React & Next.js',
									'TypeScript',
									'Tailwind CSS',
									'Testing & Automation',
									'Performance Optimization',
									'Accessibility',
								],
							},
							{
								id: 'd2',
								icon: Database,
								title: 'Backend Development',
								description: 'Scalable server-side solutions',
								skills: [
									'Node.js & Express',
									'Python & Django',
									'PostgreSQL & MongoDB',
									'Redis & Caching',
									'API Design',
									'Microservices',
								],
							},
						]}
					/>
					<DomainAccordion
						items={[
							{
								id: 'd3',
								icon: Cloud,
								title: 'Cloud & DevOps',
								description: 'Infrastructure and deployment',
								skills: [
									'AWS & GCP',
									'Docker & Kubernetes',
									'CI/CD Pipelines',
									'Terraform',
									'Monitoring',
									'Security',
								],
							},
							{
								id: 'd4',
								icon: Palette,
								title: 'Design & UX',
								description: 'User-centered design principles',
								skills: [
									'Design Systems',
									'Figma & Design Tools',
									'Prototyping',
									'User Research',
									'Interaction Design',
									'Visual Design',
								],
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface DomainItem {
	id: string;
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	skills: string[];
}

const DomainAccordion = ({ items }: { items: DomainItem[] }) => (
	<Accordion type="single" collapsible className="space-y-4">
		{items.map(({ id, icon: Icon, title, description, skills }) => (
			<AccordionItem
				key={id}
				value={id}
				className="border rounded-lg bg-card overflow-hidden"
			>
				<AccordionTrigger className="hover:no-underline px-6 py-5 hover:bg-muted/50 transition-colors">
					<div className="flex items-center gap-4 text-left">
						<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
							<Icon className="size-6 text-primary" />
						</div>
						<div>
							<h3 className="text-base font-semibold">{title}</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className="px-6 pb-6">
					<div className="grid grid-cols-2 gap-2 pt-2">
						{skills.map((skill, i) => (
							<div
								key={i}
								className="flex items-center gap-2 text-sm text-muted-foreground"
							>
								<span className="size-1.5 rounded-full bg-primary shrink-0" />
								{skill}
							</div>
						))}
					</div>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
