import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Skills Breakdown"
					title="Expertise by Category"
					description="A detailed look at my proficiency across different domains"
				/>

				<CategoryProgress
					categories={[
						{
							title: 'Frontend',
							skills: [
								{ name: 'React', level: 95 },
								{ name: 'Next.js', level: 92 },
								{ name: 'TypeScript', level: 90 },
								{ name: 'Tailwind CSS', level: 95 },
							],
						},
						{
							title: 'Backend',
							skills: [
								{ name: 'Node.js', level: 88 },
								{ name: 'Python', level: 82 },
								{ name: 'GraphQL', level: 85 },
								{ name: 'PostgreSQL', level: 85 },
							],
						},
						{
							title: 'DevOps',
							skills: [
								{ name: 'Docker', level: 80 },
								{ name: 'AWS', level: 78 },
								{ name: 'CI/CD', level: 85 },
								{ name: 'Kubernetes', level: 65 },
							],
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
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

interface Skill {
	name: string;
	level: number;
}

interface Category {
	title: string;
	skills: Skill[];
}

const CategoryProgress = ({ categories }: { categories: Category[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
		{categories.map((category, i) => (
			<CategoryCard key={i} {...category} />
		))}
	</div>
);

const CategoryCard = ({ title, skills }: Category) => {
	const avgLevel = Math.round(
		skills.reduce((acc, s) => acc + s.level, 0) / skills.length,
	);

	return (
		<Card className="group hover:border-primary/50 transition-all duration-300">
			<CardContent className="p-6">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-xl font-bold">{title}</h3>
					<Badge variant="secondary">{avgLevel}% avg</Badge>
				</div>
				<div className="space-y-4">
					{skills.map(({ name, level }, i) => (
						<div key={i}>
							<div className="flex justify-between text-sm mb-1.5">
								<span className="font-medium">{name}</span>
								<span className="text-muted-foreground">{level}%</span>
							</div>
							<Progress value={level} className="h-2" />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
