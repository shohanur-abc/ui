'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={TrendingUp} text="Progress" />
					<Title text="Skills Development" />
					<Description text="How my expertise has evolved through different roles." />
				</div>

				<SkillsAccordion
					items={[
						{
							id: 'frontend',
							title: 'Frontend Development',
							description:
								'Building modern, responsive user interfaces with cutting-edge technologies.',
							skills: [
								{ name: 'React/Next.js', level: 95 },
								{ name: 'TypeScript', level: 90 },
								{ name: 'CSS/Tailwind', level: 92 },
								{ name: 'Testing', level: 85 },
							],
						},
						{
							id: 'backend',
							title: 'Backend Development',
							description:
								'Designing scalable APIs and services that power applications.',
							skills: [
								{ name: 'Node.js', level: 88 },
								{ name: 'Python', level: 75 },
								{ name: 'PostgreSQL', level: 82 },
								{ name: 'GraphQL', level: 80 },
							],
						},
						{
							id: 'devops',
							title: 'DevOps & Infrastructure',
							description:
								'Automating deployments and managing cloud infrastructure.',
							skills: [
								{ name: 'AWS', level: 78 },
								{ name: 'Docker', level: 85 },
								{ name: 'CI/CD', level: 88 },
								{ name: 'Kubernetes', level: 70 },
							],
						},
						{
							id: 'leadership',
							title: 'Leadership & Soft Skills',
							description:
								'Guiding teams and communicating effectively across organizations.',
							skills: [
								{ name: 'Team Leadership', level: 90 },
								{ name: 'Mentorship', level: 92 },
								{ name: 'Communication', level: 88 },
								{ name: 'Strategy', level: 85 },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
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

interface Skill {
	name: string;
	level: number;
}

interface SkillCategory {
	id: string;
	title: string;
	description: string;
	skills: Skill[];
}

const SkillsAccordion = ({ items }: { items: SkillCategory[] }) => (
	<Accordion
		type="multiple"
		defaultValue={[items[0]?.id]}
		className="max-w-3xl mx-auto"
	>
		{items.map(({ id, title, description, skills }) => (
			<AccordionItem
				key={id}
				value={id}
				className="border rounded-lg px-6 mb-4 bg-card"
			>
				<AccordionTrigger className="hover:no-underline py-5">
					<div className="text-left">
						<h3 className="text-lg font-semibold">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pb-6">
					<div className="space-y-4">
						{skills.map(({ name, level }, i) => (
							<div key={i}>
								<div className="flex items-center justify-between mb-1.5">
									<span className="text-sm font-medium">{name}</span>
									<span className="text-xs text-muted-foreground">
										{level}%
									</span>
								</div>
								<Progress value={level} className="h-2" />
							</div>
						))}
					</div>
				</AccordionContent>
			</AccordionItem>
		))}
	</Accordion>
);
