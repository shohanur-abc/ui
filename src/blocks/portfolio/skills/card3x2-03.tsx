import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Database, Globe, Layers, Palette, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="6-Grid"
					title="Core Skills"
					subtitle="Six primary areas of expertise"
				/>

				<SixGrid
					skills={[
						{
							icon: Code2,
							title: 'Frontend',
							level: 95,
							skills: ['React', 'Next.js', 'TypeScript'],
							gradient: 'from-blue-500/20 to-transparent',
						},
						{
							icon: Server,
							title: 'Backend',
							level: 88,
							skills: ['Node.js', 'Python', 'GraphQL'],
							gradient: 'from-green-500/20 to-transparent',
						},
						{
							icon: Database,
							title: 'Database',
							level: 85,
							skills: ['PostgreSQL', 'MongoDB', 'Redis'],
							gradient: 'from-purple-500/20 to-transparent',
						},
						{
							icon: Layers,
							title: 'DevOps',
							level: 82,
							skills: ['Docker', 'AWS', 'CI/CD'],
							gradient: 'from-orange-500/20 to-transparent',
						},
						{
							icon: Palette,
							title: 'Design',
							level: 78,
							skills: ['Figma', 'UI/UX', 'Systems'],
							gradient: 'from-pink-500/20 to-transparent',
						},
						{
							icon: Globe,
							title: 'Web',
							level: 90,
							skills: ['PWA', 'SEO', 'A11y'],
							gradient: 'from-cyan-500/20 to-transparent',
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

interface SkillArea {
	icon: ComponentType<{ className?: string }>;
	title: string;
	level: number;
	skills: string[];
	gradient: string;
}

const SixGrid = ({ skills }: { skills: SkillArea[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
		{skills.map((skill, i) => (
			<GradientCard key={i} {...skill} />
		))}
	</div>
);

const GradientCard = ({
	icon: Icon,
	title,
	level,
	skills,
	gradient,
}: SkillArea) => (
	<Card
		className={`group hover:border-primary/50 transition-all overflow-hidden bg-gradient-to-br ${gradient}`}
	>
		<CardContent className="p-6">
			<div className="flex items-center justify-between mb-4">
				<div className="size-12 rounded-xl bg-background/50 flex items-center justify-center">
					<Icon className="size-6 text-primary" />
				</div>
				<Badge className="text-lg font-bold">{level}%</Badge>
			</div>
			<h3 className="font-bold text-xl mb-3">{title}</h3>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill, i) => (
					<Badge key={i} variant="outline" className="bg-background/50">
						{skill}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);
