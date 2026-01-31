'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Briefcase} text="Experience" />
					<Title text="Work History" />
					<Description text="Click to expand and learn more about each role." />
				</div>

				<ExperienceAccordion
					items={[
						{
							id: 'exp-1',
							company: 'TechCorp',
							role: 'Staff Engineer',
							period: '2022 - Present',
							location: 'San Francisco, CA',
							description:
								'Leading platform architecture and developer experience initiatives. Reduced build times by 50% and improved developer satisfaction scores.',
							responsibilities: [
								'System architecture',
								'Team mentorship',
								'Technical strategy',
								'Cross-team collaboration',
							],
							technologies: [
								'TypeScript',
								'React',
								'Node.js',
								'AWS',
								'Kubernetes',
							],
						},
						{
							id: 'exp-2',
							company: 'StartupXYZ',
							role: 'Senior Engineer',
							period: '2020 - 2022',
							location: 'Remote',
							description:
								'Built core product features from scratch. Led migration from monolith to microservices.',
							responsibilities: [
								'Feature development',
								'Code reviews',
								'Performance optimization',
								'Documentation',
							],
							technologies: [
								'Python',
								'Django',
								'PostgreSQL',
								'Redis',
								'Docker',
							],
						},
						{
							id: 'exp-3',
							company: 'AgencyPro',
							role: 'Frontend Developer',
							period: '2018 - 2020',
							location: 'New York, NY',
							description:
								'Delivered 20+ client projects ranging from landing pages to complex web applications.',
							responsibilities: [
								'UI development',
								'Client communication',
								'Project estimation',
								'Quality assurance',
							],
							technologies: ['JavaScript', 'Vue.js', 'SCSS', 'Webpack', 'Jest'],
						},
						{
							id: 'exp-4',
							company: 'WebStudio',
							role: 'Junior Developer',
							period: '2016 - 2018',
							location: 'Boston, MA',
							description:
								'Started my career building WordPress sites and learning modern development practices.',
							responsibilities: [
								'Website development',
								'Bug fixes',
								'Learning & growth',
								'Team support',
							],
							technologies: ['PHP', 'WordPress', 'jQuery', 'MySQL', 'HTML/CSS'],
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

interface ExperienceItem {
	id: string;
	company: string;
	role: string;
	period: string;
	location: string;
	description: string;
	responsibilities: string[];
	technologies: string[];
}

const ExperienceAccordion = ({ items }: { items: ExperienceItem[] }) => (
	<Accordion type="single" collapsible className="space-y-4">
		{items.map(
			({
				id,
				company,
				role,
				period,
				location,
				description,
				responsibilities,
				technologies,
			}) => (
				<AccordionItem
					key={id}
					value={id}
					className="border rounded-lg px-6 bg-card"
				>
					<AccordionTrigger className="hover:no-underline py-6">
						<div className="flex flex-col @md:flex-row @md:items-center gap-2 @md:gap-6 text-left">
							<div className="flex-1">
								<h3 className="text-lg font-semibold">{role}</h3>
								<p className="text-sm text-primary">{company}</p>
							</div>
							<div className="flex items-center gap-4 text-xs text-muted-foreground">
								<span className="flex items-center gap-1">
									<Calendar className="size-3" />
									{period}
								</span>
								<span className="flex items-center gap-1">
									<MapPin className="size-3" />
									{location}
								</span>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pb-6">
						<p className="text-sm text-muted-foreground mb-4">{description}</p>
						<div className="grid @md:grid-cols-2 gap-6">
							<div>
								<h4 className="text-sm font-medium mb-2">
									Key Responsibilities
								</h4>
								<ul className="space-y-1.5">
									{responsibilities.map((item, i) => (
										<li
											key={i}
											className="text-sm text-muted-foreground flex items-center gap-2"
										>
											<span className="size-1.5 rounded-full bg-primary shrink-0" />
											{item}
										</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="text-sm font-medium mb-2">Technologies</h4>
								<div className="flex flex-wrap gap-1.5">
									{technologies.map((tech, i) => (
										<Badge key={i} variant="secondary" className="text-xs">
											{tech}
										</Badge>
									))}
								</div>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			),
		)}
	</Accordion>
);
