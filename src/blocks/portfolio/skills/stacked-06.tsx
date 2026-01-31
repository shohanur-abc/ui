import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Skills Chart"
					title="Stacked Progress"
					subtitle="Visual comparison of expertise levels"
				/>

				<StackedBars
					categories={[
						{
							name: 'Languages',
							items: [
								{ name: 'TypeScript', level: 95 },
								{ name: 'Python', level: 82 },
								{ name: 'Go', level: 68 },
							],
						},
						{
							name: 'Frontend',
							items: [
								{ name: 'React', level: 95 },
								{ name: 'Next.js', level: 92 },
								{ name: 'Vue', level: 70 },
							],
						},
						{
							name: 'Backend',
							items: [
								{ name: 'Node.js', level: 90 },
								{ name: 'FastAPI', level: 78 },
								{ name: 'Gin', level: 65 },
							],
						},
						{
							name: 'Database',
							items: [
								{ name: 'PostgreSQL', level: 88 },
								{ name: 'MongoDB', level: 82 },
								{ name: 'Redis', level: 78 },
							],
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

interface SkillItem {
	name: string;
	level: number;
}

interface Category {
	name: string;
	items: SkillItem[];
}

const StackedBars = ({ categories }: { categories: Category[] }) => (
	<div className="max-w-3xl mx-auto space-y-6">
		{categories.map((category, i) => (
			<CategoryRow key={i} {...category} />
		))}
	</div>
);

const CategoryRow = ({ name, items }: Category) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-5 @md:p-6">
			<h4 className="font-bold mb-4">{name}</h4>
			<div className="space-y-3">
				{items.map(({ name, level }, i) => (
					<div key={i} className="flex items-center gap-4">
						<span className="w-24 text-sm font-medium shrink-0">{name}</span>
						<div className="flex-1 h-6 bg-muted rounded-md overflow-hidden relative">
							<div
								className="absolute inset-y-0 left-0 bg-primary rounded-md flex items-center justify-end pr-2"
								style={{ width: `${level}%` }}
							>
								<span className="text-xs font-bold text-primary-foreground">
									{level}%
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
