'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Code2, Database, Palette, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Skills Overview"
					title="Expandable Expertise"
					subtitle="Click to explore each skill category"
				/>

				<SkillAccordion
					categories={[
						{
							id: 'frontend',
							icon: Code2,
							title: 'Frontend Development',
							description: 'Building modern, accessible web experiences',
							skills: [
								'React',
								'Next.js',
								'TypeScript',
								'Tailwind CSS',
								'Framer Motion',
								'React Query',
							],
						},
						{
							id: 'backend',
							icon: Server,
							title: 'Backend Development',
							description: 'Creating scalable server-side solutions',
							skills: [
								'Node.js',
								'Python',
								'Go',
								'GraphQL',
								'REST APIs',
								'WebSockets',
							],
						},
						{
							id: 'database',
							icon: Database,
							title: 'Data & Storage',
							description: 'Managing and optimizing data systems',
							skills: [
								'PostgreSQL',
								'MongoDB',
								'Redis',
								'Elasticsearch',
								'Prisma',
							],
						},
						{
							id: 'design',
							icon: Palette,
							title: 'UI/UX Design',
							description: 'Creating user-centered designs',
							skills: [
								'Figma',
								'Design Systems',
								'Prototyping',
								'Accessibility',
								'User Research',
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface SectionHeaderProps {
	badge: string;
	title: string;
	subtitle: string;
}

const SectionHeader = ({ badge, title, subtitle }: SectionHeaderProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface Category {
	id: string;
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	skills: string[];
}

const SkillAccordion = ({ categories }: { categories: Category[] }) => (
	<Accordion type="single" collapsible className="max-w-3xl mx-auto">
		{categories.map((category) => (
			<AccordionCategory key={category.id} {...category} />
		))}
	</Accordion>
);

const AccordionCategory = ({
	id,
	icon: Icon,
	title,
	description,
	skills,
}: Category) => (
	<AccordionItem
		value={id}
		className="border rounded-lg px-4 mb-4 data-[state=open]:border-primary/50"
	>
		<AccordionTrigger className="hover:no-underline py-5">
			<div className="flex items-center gap-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Icon className="size-5 text-primary" />
				</div>
				<div className="text-left">
					<h4 className="font-semibold">{title}</h4>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</AccordionTrigger>
		<AccordionContent className="pb-5">
			<div className="flex flex-wrap gap-2 pt-2 pl-14">
				{skills.map((skill, i) => (
					<Badge key={i} variant="secondary">
						{skill}
					</Badge>
				))}
			</div>
		</AccordionContent>
	</AccordionItem>
);
