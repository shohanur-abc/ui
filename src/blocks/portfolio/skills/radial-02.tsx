import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleSection
					eyebrow="Proficiency Rings"
					title="Skill Circles"
					description="Visual representation of expertise levels"
				/>

				<CircularSkills
					skills={[
						{ name: 'React', level: 95, color: '#61DAFB' },
						{ name: 'TypeScript', level: 92, color: '#3178C6' },
						{ name: 'Node.js', level: 88, color: '#339933' },
						{ name: 'PostgreSQL', level: 85, color: '#4169E1' },
						{ name: 'AWS', level: 80, color: '#FF9900' },
						{ name: 'Docker', level: 78, color: '#2496ED' },
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

interface SkillCircle {
	name: string;
	level: number;
	color: string;
}

const CircularSkills = ({ skills }: { skills: SkillCircle[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-6 gap-6 @md:gap-8 max-w-5xl mx-auto">
		{skills.map((skill, i) => (
			<CircleCard key={i} {...skill} />
		))}
	</div>
);

const CircleCard = ({ name, level, color }: SkillCircle) => {
	const radius = 40;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (level / 100) * circumference;

	return (
		<Card className="group hover:border-primary/50 transition-all">
			<CardContent className="p-4 @md:p-6 flex flex-col items-center">
				<div className="relative size-24 @md:size-28">
					<svg className="size-full -rotate-90">
						<circle
							cx="50%"
							cy="50%"
							r={radius}
							fill="none"
							strokeWidth="6"
							className="stroke-muted"
						/>
						<circle
							cx="50%"
							cy="50%"
							r={radius}
							fill="none"
							strokeWidth="6"
							stroke={color}
							strokeLinecap="round"
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							className="transition-all duration-700"
						/>
					</svg>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-xl @md:text-2xl font-bold">{level}%</span>
					</div>
				</div>
				<h4 className="font-semibold mt-3 text-center">{name}</h4>
			</CardContent>
		</Card>
	);
};
