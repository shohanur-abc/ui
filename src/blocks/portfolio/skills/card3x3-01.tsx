import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Atom,
	Box,
	Cloud,
	Code,
	Cpu,
	Database,
	Globe,
	Layers,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<IntroBlock
					eyebrow="Capabilities"
					title="Full Spectrum Skills"
					subtitle="From concept to deployment, I cover it all"
				/>

				<Grid3x3
					skills={[
						{
							icon: Code,
							name: 'Frontend',
							description: 'React & Next.js expert',
						},
						{ icon: Layers, name: 'Backend', description: 'Node.js & Python' },
						{ icon: Database, name: 'Database', description: 'SQL & NoSQL' },
						{ icon: Cloud, name: 'Cloud', description: 'AWS certified' },
						{ icon: Cpu, name: 'DevOps', description: 'CI/CD pipelines' },
						{ icon: Globe, name: 'APIs', description: 'REST & GraphQL' },
						{ icon: Box, name: 'Docker', description: 'Containerization' },
						{ icon: Atom, name: 'Testing', description: 'TDD & E2E' },
						{ icon: Zap, name: 'Performance', description: 'Optimization' },
					]}
				/>
			</div>
		</section>
	);
}

interface IntroBlockProps {
	eyebrow: string;
	title: string;
	subtitle: string;
}

const IntroBlock = ({ eyebrow, title, subtitle }: IntroBlockProps) => (
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

interface SkillItem {
	icon: ComponentType<{ className?: string }>;
	name: string;
	description: string;
}

const Grid3x3 = ({ skills }: { skills: SkillItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 gap-4 @md:gap-6 max-w-4xl mx-auto">
		{skills.map((skill, i) => (
			<CompactSkillCard key={i} {...skill} />
		))}
	</div>
);

const CompactSkillCard = ({ icon: Icon, name, description }: SkillItem) => (
	<Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
		<CardContent className="p-4 @md:p-5 text-center">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:scale-110 transition-all">
				<Icon className="size-6 text-primary group-hover:text-primary-foreground transition-colors" />
			</div>
			<h3 className="font-semibold mb-1">{name}</h3>
			<p className="text-xs text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);
