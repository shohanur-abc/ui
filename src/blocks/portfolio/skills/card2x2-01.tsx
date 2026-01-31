import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Database, Palette, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Core Skills"
					title="Four Pillars of Expertise"
					subtitle="The foundation of my development practice"
				/>

				<CardGrid2x2
					items={[
						{
							icon: Code2,
							title: 'Frontend Development',
							description:
								'Building responsive, accessible web interfaces with React, Next.js, and TypeScript. Expert in component architecture and state management.',
							skills: [
								'React',
								'Next.js',
								'TypeScript',
								'Tailwind CSS',
								'Framer Motion',
							],
							level: 95,
						},
						{
							icon: Server,
							title: 'Backend Development',
							description:
								'Creating scalable server-side applications with Node.js, Python, and Go. RESTful APIs, GraphQL, and microservices architecture.',
							skills: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST APIs'],
							level: 88,
						},
						{
							icon: Database,
							title: 'Database & Storage',
							description:
								'Designing efficient data models and implementing robust storage solutions. SQL, NoSQL, and caching strategies.',
							skills: [
								'PostgreSQL',
								'MongoDB',
								'Redis',
								'Prisma',
								'Elasticsearch',
							],
							level: 85,
						},
						{
							icon: Palette,
							title: 'UI/UX Design',
							description:
								'Crafting user-centered interfaces with attention to accessibility, usability, and visual appeal.',
							skills: [
								'Figma',
								'Design Systems',
								'Prototyping',
								'User Research',
							],
							level: 78,
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
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface CardItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	skills: string[];
	level: number;
}

const CardGrid2x2 = ({ items }: { items: CardItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-6 @md:gap-8 max-w-5xl mx-auto">
		{items.map((item, i) => (
			<SkillCard key={i} {...item} />
		))}
	</div>
);

const SkillCard = ({
	icon: Icon,
	title,
	description,
	skills,
	level,
}: CardItem) => (
	<Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
		<CardContent className="p-6 @md:p-8">
			<div className="flex items-start justify-between mb-4">
				<div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all">
					<Icon className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
				</div>
				<div className="text-right">
					<span className="text-2xl font-bold text-primary">{level}%</span>
					<p className="text-xs text-muted-foreground">Proficiency</p>
				</div>
			</div>
			<h3 className="text-xl font-bold mb-2">{title}</h3>
			<p className="text-sm text-muted-foreground mb-4">{description}</p>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill, i) => (
					<Badge key={i} variant="secondary" className="text-xs">
						{skill}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);
