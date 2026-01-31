import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Code, Server, Cloud, Palette, Brain, Users } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @xl:grid-cols-[1fr_2fr] gap-12 @xl:gap-16">
					<div className="@xl:sticky @xl:top-8 self-start">
						<Eyebrow icon={Code} text="Skills" />
						<Title text="Technical Proficiency" />
						<Description text="Skills developed through years of hands-on experience at leading tech companies." />
					</div>

					<div className="space-y-0">
						<SkillSection
							icon={Code}
							title="Frontend Development"
							skills={[
								{ name: 'React / Next.js', level: 95 },
								{ name: 'TypeScript', level: 92 },
								{ name: 'CSS / Tailwind', level: 90 },
								{ name: 'Testing (Jest, Playwright)', level: 85 },
							]}
						/>
						<SkillSection
							icon={Server}
							title="Backend Development"
							skills={[
								{ name: 'Node.js / Express', level: 88 },
								{ name: 'Python / Django', level: 75 },
								{ name: 'PostgreSQL / MongoDB', level: 82 },
								{ name: 'GraphQL / REST', level: 85 },
							]}
						/>
						<SkillSection
							icon={Cloud}
							title="Cloud & DevOps"
							skills={[
								{ name: 'AWS', level: 78 },
								{ name: 'Docker / Kubernetes', level: 80 },
								{ name: 'CI/CD Pipelines', level: 88 },
								{ name: 'Terraform', level: 70 },
							]}
						/>
						<SkillSection
							icon={Palette}
							title="Design & UX"
							skills={[
								{ name: 'Design Systems', level: 90 },
								{ name: 'Figma', level: 75 },
								{ name: 'Accessibility (a11y)', level: 85 },
							]}
						/>
						<SkillSection
							icon={Users}
							title="Leadership"
							skills={[
								{ name: 'Team Leadership', level: 90 },
								{ name: 'Mentorship', level: 92 },
								{ name: 'Technical Strategy', level: 85 },
							]}
							isLast
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface Skill {
	name: string;
	level: number;
}

interface SkillSectionProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	skills: Skill[];
	isLast?: boolean;
}

const SkillSection = ({
	icon: Icon,
	title,
	skills,
	isLast,
}: SkillSectionProps) => (
	<>
		<div className="py-8">
			<div className="flex items-center gap-3 mb-6">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Icon className="size-5 text-primary" />
				</div>
				<h3 className="text-lg font-bold">{title}</h3>
			</div>
			<div className="space-y-5">
				{skills.map(({ name, level }, i) => (
					<div key={i}>
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium">{name}</span>
							<span className="text-xs text-muted-foreground">{level}%</span>
						</div>
						<Progress value={level} className="h-2" />
					</div>
				))}
			</div>
		</div>
		{!isLast && <Separator />}
	</>
);
