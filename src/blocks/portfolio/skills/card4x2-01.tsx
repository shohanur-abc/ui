import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Blocks,
	Braces,
	Cloud,
	Database,
	Globe,
	Layers,
	Palette,
	Server,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="4x2 Grid"
					title="Skill Cards"
					description="Eight key areas of technical expertise"
				/>

				<EightGrid
					skills={[
						{
							icon: Braces,
							title: 'Languages',
							items: ['TypeScript', 'JavaScript', 'Python'],
						},
						{
							icon: Globe,
							title: 'Frontend',
							items: ['React', 'Next.js', 'Tailwind'],
						},
						{
							icon: Server,
							title: 'Backend',
							items: ['Node.js', 'Express', 'FastAPI'],
						},
						{
							icon: Database,
							title: 'Database',
							items: ['PostgreSQL', 'MongoDB', 'Redis'],
						},
						{ icon: Layers, title: 'APIs', items: ['REST', 'GraphQL', 'tRPC'] },
						{ icon: Cloud, title: 'Cloud', items: ['AWS', 'Vercel', 'GCP'] },
						{
							icon: Blocks,
							title: 'DevOps',
							items: ['Docker', 'K8s', 'CI/CD'],
						},
						{
							icon: Palette,
							title: 'Design',
							items: ['Figma', 'UI/UX', 'Systems'],
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
	description: string;
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface SkillArea {
	icon: ComponentType<{ className?: string }>;
	title: string;
	items: string[];
}

const EightGrid = ({ skills }: { skills: SkillArea[] }) => (
	<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 @md:gap-6 max-w-5xl mx-auto">
		{skills.map((skill, i) => (
			<CompactCard key={i} {...skill} />
		))}
	</div>
);

const CompactCard = ({ icon: Icon, title, items }: SkillArea) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-4 @md:p-5">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
				<Icon className="size-5 text-primary" />
			</div>
			<h4 className="font-bold mb-2">{title}</h4>
			<ul className="space-y-1">
				{items.map((item, i) => (
					<li key={i} className="text-sm text-muted-foreground">
						{item}
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);
