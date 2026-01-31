import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Database, Globe, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Expertise"
					title="Skill Pillars"
					subtitle="The four pillars of my technical expertise"
				/>

				<PillarGrid
					pillars={[
						{
							icon: Code2,
							title: 'Frontend',
							level: 95,
							skills: [
								'React',
								'Next.js',
								'TypeScript',
								'Tailwind CSS',
								'Framer Motion',
							],
							color: 'border-t-blue-500',
						},
						{
							icon: Server,
							title: 'Backend',
							level: 88,
							skills: [
								'Node.js',
								'Python',
								'GraphQL',
								'REST APIs',
								'WebSockets',
							],
							color: 'border-t-green-500',
						},
						{
							icon: Database,
							title: 'Data',
							level: 85,
							skills: [
								'PostgreSQL',
								'MongoDB',
								'Redis',
								'Prisma',
								'Data Modeling',
							],
							color: 'border-t-purple-500',
						},
						{
							icon: Globe,
							title: 'Cloud',
							level: 82,
							skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
							color: 'border-t-orange-500',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface TitleBlockProps {
	eyebrow: string;
	title: string;
	subtitle: string;
}

const TitleBlock = ({ eyebrow, title, subtitle }: TitleBlockProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface Pillar {
	icon: ComponentType<{ className?: string }>;
	title: string;
	level: number;
	skills: string[];
	color: string;
}

const PillarGrid = ({ pillars }: { pillars: Pillar[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
		{pillars.map((pillar, i) => (
			<PillarCard key={i} {...pillar} />
		))}
	</div>
);

const PillarCard = ({ icon: Icon, title, level, skills, color }: Pillar) => (
	<Card
		className={`group hover:border-primary/50 transition-all border-t-4 ${color}`}
	>
		<CardContent className="p-5 @md:p-6">
			<div className="flex items-center justify-between mb-5">
				<div className="size-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
					<Icon className="size-6 text-primary" />
				</div>
				<Badge className="text-lg font-bold">{level}%</Badge>
			</div>
			<h4 className="font-bold text-xl mb-4">{title}</h4>
			<ul className="space-y-2">
				{skills.map((skill, i) => (
					<li
						key={i}
						className="text-sm text-muted-foreground flex items-center gap-2"
					>
						<span className="size-1.5 rounded-full bg-primary" />
						{skill}
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);
