import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Code2,
	Database,
	Globe,
	Layers,
	Palette,
	Server,
	Smartphone,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Skills Grid"
					title="Technical Expertise"
					subtitle="A diverse skillset for modern development"
				/>

				<MasonryGrid
					items={[
						{
							icon: Code2,
							title: 'Frontend Development',
							description:
								'Building responsive interfaces with React and Next.js',
							skills: ['React', 'Next.js', 'TypeScript'],
							size: 'large',
						},
						{
							icon: Server,
							title: 'Backend',
							description: 'APIs with Node.js',
							skills: ['Node.js', 'Python'],
							size: 'small',
						},
						{
							icon: Database,
							title: 'Database',
							description: 'SQL and NoSQL',
							skills: ['PostgreSQL', 'MongoDB'],
							size: 'small',
						},
						{
							icon: Layers,
							title: 'Cloud & DevOps',
							description: 'Infrastructure and deployment pipelines',
							skills: ['AWS', 'Docker', 'K8s', 'CI/CD'],
							size: 'medium',
						},
						{
							icon: Palette,
							title: 'Design',
							description: 'UI/UX and design systems',
							skills: ['Figma', 'Tailwind'],
							size: 'small',
						},
						{
							icon: Globe,
							title: 'API Design',
							description: 'Building scalable APIs',
							skills: ['REST', 'GraphQL', 'tRPC'],
							size: 'medium',
						},
						{
							icon: Smartphone,
							title: 'Mobile',
							description: 'Cross-platform mobile development',
							skills: ['React Native', 'Expo'],
							size: 'small',
						},
						{
							icon: Zap,
							title: 'Performance',
							description: 'Optimization and monitoring',
							skills: ['Core Web Vitals', 'Profiling'],
							size: 'small',
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

interface MasonryItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	skills: string[];
	size: 'small' | 'medium' | 'large';
}

const MasonryGrid = ({ items }: { items: MasonryItem[] }) => (
	<div className="columns-1 @sm:columns-2 @lg:columns-3 gap-4 @md:gap-6 max-w-5xl mx-auto">
		{items.map((item, i) => (
			<MasonryCard key={i} {...item} />
		))}
	</div>
);

const MasonryCard = ({
	icon: Icon,
	title,
	description,
	skills,
	size,
}: MasonryItem) => {
	const padding =
		size === 'large'
			? 'p-6 @md:p-8'
			: size === 'medium'
				? 'p-5 @md:p-6'
				: 'p-4 @md:p-5';

	return (
		<Card className="group hover:border-primary/50 transition-all mb-4 @md:mb-6 break-inside-avoid">
			<CardContent className={padding}>
				<div className="flex items-center gap-3 mb-3">
					<div
						className={`rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${size === 'large' ? 'size-12' : 'size-10'}`}
					>
						<Icon
							className={`text-primary ${size === 'large' ? 'size-6' : 'size-5'}`}
						/>
					</div>
					<h3 className={`font-bold ${size === 'large' ? 'text-xl' : ''}`}>
						{title}
					</h3>
				</div>
				<p className="text-sm text-muted-foreground mb-4">{description}</p>
				<div className="flex flex-wrap gap-1.5">
					{skills.map((skill, i) => (
						<Badge key={i} variant="secondary" className="text-xs">
							{skill}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
