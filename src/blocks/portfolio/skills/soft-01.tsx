import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Lightbulb, Rocket, Users, Zap } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Soft Skills"
					title="Beyond Code"
					subtitle="The skills that make me a well-rounded developer"
				/>

				<SoftSkillsGrid
					skills={[
						{
							icon: Users,
							title: 'Team Collaboration',
							description: 'Working effectively with cross-functional teams',
							level: 'Expert',
						},
						{
							icon: Lightbulb,
							title: 'Problem Solving',
							description: 'Creative approaches to complex challenges',
							level: 'Expert',
						},
						{
							icon: Rocket,
							title: 'Fast Learner',
							description: 'Quick to pick up new technologies',
							level: 'Expert',
						},
						{
							icon: Heart,
							title: 'Mentorship',
							description: 'Helping others grow and succeed',
							level: 'Advanced',
						},
						{
							icon: Zap,
							title: 'Time Management',
							description: 'Delivering quality work on schedule',
							level: 'Advanced',
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

interface SoftSkill {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	level: string;
}

const SoftSkillsGrid = ({ skills }: { skills: SoftSkill[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
		{skills.map((skill, i) => (
			<SoftSkillCard key={i} {...skill} />
		))}
	</div>
);

const SoftSkillCard = ({
	icon: Icon,
	title,
	description,
	level,
}: SoftSkill) => {
	const levelColor = level === 'Expert' ? 'text-green-500' : 'text-blue-500';

	return (
		<Card className="group hover:border-primary/50 transition-all">
			<CardContent className="p-6">
				<div className="flex items-center gap-4 mb-4">
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
						<Icon className="size-6 text-primary" />
					</div>
					<span className={`text-sm font-medium ${levelColor}`}>{level}</span>
				</div>
				<h3 className="font-bold text-lg mb-2">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
};
