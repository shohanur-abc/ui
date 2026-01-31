import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Blocks,
	BookOpen,
	Braces,
	Cloud,
	Database,
	GitBranch,
	Globe,
	Layout,
	Shield,
	Smartphone,
	Terminal,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<PageHeader
					badge="Technology Stack"
					title="Skills & Expertise"
					description="Comprehensive skillset spanning the entire development lifecycle"
				/>

				<Grid4x3
					skills={[
						{ icon: Braces, name: 'TypeScript', level: 'Expert' },
						{ icon: Globe, name: 'React/Next.js', level: 'Expert' },
						{ icon: Terminal, name: 'Node.js', level: 'Expert' },
						{ icon: Database, name: 'PostgreSQL', level: 'Advanced' },
						{ icon: Cloud, name: 'AWS', level: 'Advanced' },
						{ icon: Blocks, name: 'Docker', level: 'Advanced' },
						{ icon: Layout, name: 'Tailwind', level: 'Expert' },
						{ icon: GitBranch, name: 'Git', level: 'Expert' },
						{ icon: Shield, name: 'Security', level: 'Advanced' },
						{ icon: Zap, name: 'Performance', level: 'Expert' },
						{ icon: Smartphone, name: 'Mobile', level: 'Intermediate' },
						{ icon: BookOpen, name: 'Documentation', level: 'Expert' },
					]}
				/>
			</div>
		</section>
	);
}

interface PageHeaderProps {
	badge: string;
	title: string;
	description: string;
}

const PageHeader = ({ badge, title, description }: PageHeaderProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

interface SkillItem {
	icon: ComponentType<{ className?: string }>;
	name: string;
	level: 'Expert' | 'Advanced' | 'Intermediate';
}

const Grid4x3 = ({ skills }: { skills: SkillItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-3 @md:gap-4">
		{skills.map((skill, i) => (
			<SkillBadgeCard key={i} {...skill} />
		))}
	</div>
);

const SkillBadgeCard = ({ icon: Icon, name, level }: SkillItem) => {
	const levelColors = {
		Expert: 'text-green-500 bg-green-500/10',
		Advanced: 'text-blue-500 bg-blue-500/10',
		Intermediate: 'text-yellow-500 bg-yellow-500/10',
	};

	return (
		<Card className="group hover:border-primary/50 transition-all duration-300">
			<CardContent className="p-4 flex items-center gap-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-5 text-primary" />
				</div>
				<div className="min-w-0">
					<h4 className="font-medium text-sm truncate">{name}</h4>
					<span
						className={`text-xs font-medium px-1.5 py-0.5 rounded ${levelColors[level]}`}
					>
						{level}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
