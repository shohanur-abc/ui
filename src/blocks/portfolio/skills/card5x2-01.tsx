import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Braces,
	Cloud,
	Database,
	Globe,
	Layers,
	Palette,
	Server,
	Shield,
	Smartphone,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="5x2 Layout"
					title="Skills Overview"
					description="Quick glance at my primary technical skills"
				/>

				<WideTiles
					skills={[
						{
							icon: Braces,
							name: 'TypeScript',
							level: 95,
							description: 'Expert-level type-safe development',
						},
						{
							icon: Globe,
							name: 'React / Next.js',
							level: 95,
							description: 'Modern frontend applications',
						},
						{
							icon: Server,
							name: 'Node.js',
							level: 88,
							description: 'Scalable server-side solutions',
						},
						{
							icon: Database,
							name: 'PostgreSQL',
							level: 85,
							description: 'Relational database design',
						},
						{
							icon: Cloud,
							name: 'AWS',
							level: 82,
							description: 'Cloud infrastructure',
						},
						{
							icon: Layers,
							name: 'Docker',
							level: 80,
							description: 'Containerization and deployment',
						},
						{
							icon: Palette,
							name: 'Tailwind CSS',
							level: 95,
							description: 'Utility-first styling',
						},
						{
							icon: Shield,
							name: 'Security',
							level: 78,
							description: 'Web security best practices',
						},
						{
							icon: Smartphone,
							name: 'React Native',
							level: 72,
							description: 'Cross-platform mobile apps',
						},
						{
							icon: Zap,
							name: 'Performance',
							level: 85,
							description: 'Optimization and profiling',
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

interface SkillTile {
	icon: ComponentType<{ className?: string }>;
	name: string;
	level: number;
	description: string;
}

const WideTiles = ({ skills }: { skills: SkillTile[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
		{skills.map((skill, i) => (
			<SkillCard key={i} {...skill} />
		))}
	</div>
);

const SkillCard = ({ icon: Icon, name, level, description }: SkillTile) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-4 @lg:p-5">
			<div className="flex items-center gap-3 mb-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
					<Icon className="size-5 text-primary" />
				</div>
				<div className="flex-1 min-w-0">
					<h4 className="font-semibold text-sm truncate">{name}</h4>
				</div>
			</div>
			<p className="text-xs text-muted-foreground mb-3 line-clamp-2">
				{description}
			</p>
			<div className="flex items-center gap-2">
				<Progress value={level} className="h-1.5 flex-1" />
				<span className="text-xs font-bold text-primary">{level}%</span>
			</div>
		</CardContent>
	</Card>
);
