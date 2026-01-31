import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Clean & Simple"
					title="Tag Cloud"
					subtitle="All my skills at a glance"
				/>

				<TagCloud
					skills={[
						{ name: 'React', size: 'lg' },
						{ name: 'TypeScript', size: 'lg' },
						{ name: 'Next.js', size: 'lg' },
						{ name: 'Node.js', size: 'md' },
						{ name: 'Tailwind CSS', size: 'lg' },
						{ name: 'PostgreSQL', size: 'md' },
						{ name: 'GraphQL', size: 'md' },
						{ name: 'Docker', size: 'md' },
						{ name: 'AWS', size: 'md' },
						{ name: 'Python', size: 'sm' },
						{ name: 'MongoDB', size: 'sm' },
						{ name: 'Redis', size: 'sm' },
						{ name: 'Prisma', size: 'md' },
						{ name: 'Git', size: 'lg' },
						{ name: 'Figma', size: 'sm' },
						{ name: 'CI/CD', size: 'md' },
						{ name: 'REST APIs', size: 'md' },
						{ name: 'Testing', size: 'sm' },
						{ name: 'Go', size: 'sm' },
						{ name: 'Kubernetes', size: 'sm' },
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

interface Skill {
	name: string;
	size: 'sm' | 'md' | 'lg';
}

const TagCloud = ({ skills }: { skills: Skill[] }) => (
	<Card className="max-w-3xl mx-auto">
		<CardContent className="p-6 @md:p-8">
			<div className="flex flex-wrap justify-center gap-3">
				{skills.map((skill, i) => (
					<SkillTag key={i} {...skill} />
				))}
			</div>
		</CardContent>
	</Card>
);

const SkillTag = ({ name, size }: Skill) => {
	const sizeClasses = {
		sm: 'text-sm px-3 py-1.5',
		md: 'text-base px-4 py-2',
		lg: 'text-lg px-5 py-2.5 font-semibold',
	};

	const bgClasses = {
		sm: 'bg-muted hover:bg-muted/80',
		md: 'bg-primary/10 hover:bg-primary/20',
		lg: 'bg-primary/20 hover:bg-primary/30',
	};

	return (
		<span
			className={`rounded-full transition-colors cursor-default ${sizeClasses[size]} ${bgClasses[size]}`}
		>
			{name}
		</span>
	);
};
