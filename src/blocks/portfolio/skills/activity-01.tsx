import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Usage Stats"
					title="Skill Activity"
					subtitle="How frequently I use each technology"
				/>

				<ActivityGrid
					skills={[
						{ name: 'React', frequency: 'Daily', intensity: 5 },
						{ name: 'TypeScript', frequency: 'Daily', intensity: 5 },
						{ name: 'Next.js', frequency: 'Daily', intensity: 5 },
						{ name: 'Tailwind', frequency: 'Daily', intensity: 5 },
						{ name: 'Node.js', frequency: 'Weekly', intensity: 4 },
						{ name: 'PostgreSQL', frequency: 'Weekly', intensity: 4 },
						{ name: 'Docker', frequency: 'Weekly', intensity: 3 },
						{ name: 'AWS', frequency: 'Weekly', intensity: 3 },
						{ name: 'Python', frequency: 'Monthly', intensity: 2 },
						{ name: 'Go', frequency: 'Monthly', intensity: 2 },
						{ name: 'Rust', frequency: 'Learning', intensity: 1 },
						{ name: 'AI/ML', frequency: 'Learning', intensity: 1 },
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

interface Skill {
	name: string;
	frequency: string;
	intensity: number;
}

const ActivityGrid = ({ skills }: { skills: Skill[] }) => (
	<div className="grid grid-cols-3 @sm:grid-cols-4 @lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
		{skills.map((skill, i) => (
			<ActivityCell key={i} {...skill} />
		))}
	</div>
);

const ActivityCell = ({ name, frequency, intensity }: Skill) => {
	const intensityColors =
		{
			5: 'bg-green-500/80',
			4: 'bg-green-500/60',
			3: 'bg-green-500/40',
			2: 'bg-green-500/25',
			1: 'bg-green-500/10',
		}[intensity] || 'bg-muted';

	return (
		<Card className="group hover:border-primary/50 transition-all">
			<CardContent className={`p-3 text-center ${intensityColors}`}>
				<h4 className="font-semibold text-sm mb-1">{name}</h4>
				<p className="text-xs text-muted-foreground">{frequency}</p>
			</CardContent>
		</Card>
	);
};
