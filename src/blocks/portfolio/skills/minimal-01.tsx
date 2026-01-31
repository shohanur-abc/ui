import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleSection
					eyebrow="Core Skills"
					title="Minimal Cards"
					description="Clean, focused skill presentation"
				/>

				<MinimalGrid
					skills={[
						{ name: 'TypeScript', level: 95 },
						{ name: 'React', level: 95 },
						{ name: 'Next.js', level: 92 },
						{ name: 'Node.js', level: 88 },
						{ name: 'PostgreSQL', level: 85 },
						{ name: 'Docker', level: 80 },
					]}
				/>
			</div>
		</section>
	);
}

interface TitleSectionProps {
	eyebrow: string;
	title: string;
	description: string;
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
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

interface Skill {
	name: string;
	level: number;
}

const MinimalGrid = ({ skills }: { skills: Skill[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
		{skills.map((skill, i) => (
			<MinimalCard key={i} {...skill} />
		))}
	</div>
);

const MinimalCard = ({ name, level }: Skill) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-5">
			<div className="flex items-center justify-between mb-4">
				<h4 className="font-bold text-lg">{name}</h4>
				<span className="text-2xl font-bold text-primary">{level}%</span>
			</div>
			<Progress value={level} className="h-2" />
		</CardContent>
	</Card>
);
