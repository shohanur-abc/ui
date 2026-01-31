import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Grouped Skills"
					title="Skill Categories"
					subtitle="Organized by technology type"
				/>

				<GroupedSkills
					groups={[
						{
							title: 'Languages & Frameworks',
							skills: [
								{ name: 'TypeScript', level: 95 },
								{ name: 'React', level: 95 },
								{ name: 'Next.js', level: 92 },
								{ name: 'Node.js', level: 88 },
							],
						},
						{
							title: 'Data & Infrastructure',
							skills: [
								{ name: 'PostgreSQL', level: 85 },
								{ name: 'MongoDB', level: 82 },
								{ name: 'Docker', level: 80 },
								{ name: 'AWS', level: 82 },
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

interface Skill {
	name: string;
	level: number;
}

interface SkillGroup {
	title: string;
	skills: Skill[];
}

const GroupedSkills = ({ groups }: { groups: SkillGroup[] }) => (
	<div className="grid @lg:grid-cols-2 gap-6 @md:gap-8 max-w-5xl mx-auto">
		{groups.map((group, i) => (
			<GroupCard key={i} {...group} />
		))}
	</div>
);

const GroupCard = ({ title, skills }: SkillGroup) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-6 @md:p-8">
			<h3 className="font-bold text-xl mb-6">{title}</h3>
			<div className="space-y-5">
				{skills.map(({ name, level }, i) => (
					<div key={i}>
						<div className="flex items-center justify-between mb-2">
							<span className="font-medium">{name}</span>
							<span className="text-sm font-bold text-primary">{level}%</span>
						</div>
						<Progress value={level} className="h-2" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
