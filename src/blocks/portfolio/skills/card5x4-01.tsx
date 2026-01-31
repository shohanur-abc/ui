import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="5x4 Matrix"
					title="Skill Landscape"
					subtitle="Comprehensive view of technical competencies"
				/>

				<MatrixGrid
					skills={[
						{ name: 'React', category: 'Frontend', level: 95 },
						{ name: 'Next.js', category: 'Frontend', level: 92 },
						{ name: 'TypeScript', category: 'Language', level: 95 },
						{ name: 'JavaScript', category: 'Language', level: 95 },
						{ name: 'Tailwind', category: 'CSS', level: 95 },
						{ name: 'Node.js', category: 'Backend', level: 88 },
						{ name: 'Python', category: 'Language', level: 82 },
						{ name: 'GraphQL', category: 'API', level: 85 },
						{ name: 'PostgreSQL', category: 'Database', level: 88 },
						{ name: 'MongoDB', category: 'Database', level: 82 },
						{ name: 'Docker', category: 'DevOps', level: 80 },
						{ name: 'AWS', category: 'Cloud', level: 82 },
						{ name: 'Redis', category: 'Cache', level: 78 },
						{ name: 'Git', category: 'Tools', level: 95 },
						{ name: 'Figma', category: 'Design', level: 75 },
						{ name: 'Go', category: 'Language', level: 68 },
						{ name: 'Prisma', category: 'ORM', level: 88 },
						{ name: 'REST', category: 'API', level: 90 },
						{ name: 'CI/CD', category: 'DevOps', level: 85 },
						{ name: 'Testing', category: 'QA', level: 82 },
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
	category: string;
	level: number;
}

const MatrixGrid = ({ skills }: { skills: Skill[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 @xl:grid-cols-5 gap-3 @md:gap-4 max-w-5xl mx-auto">
		{skills.map((skill, i) => (
			<MatrixCell key={i} {...skill} />
		))}
	</div>
);

const MatrixCell = ({ name, category, level }: Skill) => {
	const opacity = Math.round((level / 100) * 100);
	const bgOpacity =
		level >= 90
			? 'bg-primary/20'
			: level >= 80
				? 'bg-primary/15'
				: level >= 70
					? 'bg-primary/10'
					: 'bg-primary/5';

	return (
		<Card
			className={`group hover:border-primary/50 transition-all ${bgOpacity}`}
		>
			<CardContent className="p-3 @md:p-4 text-center">
				<h4 className="font-semibold mb-1 text-sm @md:text-base">{name}</h4>
				<div className="flex items-center justify-center gap-2">
					<Badge variant="outline" className="text-xs">
						{category}
					</Badge>
				</div>
				<div className="mt-2 text-xs text-muted-foreground">{level}%</div>
			</CardContent>
		</Card>
	);
};
