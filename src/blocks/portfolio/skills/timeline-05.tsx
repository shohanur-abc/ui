import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Years of Experience"
					title="Skill Timeline"
					subtitle="How long I have been working with each technology"
				/>

				<ExperienceGrid
					skills={[
						{ name: 'JavaScript', years: 8, category: 'Language' },
						{ name: 'TypeScript', years: 5, category: 'Language' },
						{ name: 'React', years: 6, category: 'Framework' },
						{ name: 'Next.js', years: 4, category: 'Framework' },
						{ name: 'Node.js', years: 6, category: 'Runtime' },
						{ name: 'PostgreSQL', years: 5, category: 'Database' },
						{ name: 'MongoDB', years: 4, category: 'Database' },
						{ name: 'Docker', years: 4, category: 'DevOps' },
						{ name: 'AWS', years: 5, category: 'Cloud' },
						{ name: 'Git', years: 8, category: 'Tools' },
						{ name: 'Python', years: 4, category: 'Language' },
						{ name: 'Tailwind CSS', years: 4, category: 'CSS' },
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
	years: number;
	category: string;
}

const ExperienceGrid = ({ skills }: { skills: Skill[] }) => (
	<div className="grid @sm:grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
		{skills.map((skill, i) => (
			<ExperienceCard key={i} {...skill} />
		))}
	</div>
);

const ExperienceCard = ({ name, years, category }: Skill) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<h4 className="font-semibold">{name}</h4>
				<Badge variant="outline" className="text-xs">
					{category}
				</Badge>
			</div>
			<div className="flex items-end gap-2">
				<span className="text-3xl font-bold text-primary">{years}</span>
				<span className="text-muted-foreground mb-1">years</span>
			</div>
			<Separator className="my-3" />
			<div className="flex gap-1">
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className={`flex-1 h-1.5 rounded-full ${i < years ? 'bg-primary' : 'bg-muted'}`}
					/>
				))}
			</div>
		</CardContent>
	</Card>
);
