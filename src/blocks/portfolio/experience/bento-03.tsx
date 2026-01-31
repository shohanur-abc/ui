import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code, Server, Cloud, Palette, Brain, Shield } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Code} text="Skills" />
					<Title text="Technical Expertise" />
					<Description text="Core competencies across the full development stack." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
					<SkillBentoCard
						icon={Code}
						title="Frontend"
						skills={[
							{ name: 'React/Next.js', level: 95 },
							{ name: 'TypeScript', level: 92 },
							{ name: 'CSS/Tailwind', level: 90 },
						]}
						className="@xl:row-span-2"
					/>
					<SkillBentoCard
						icon={Server}
						title="Backend"
						skills={[
							{ name: 'Node.js', level: 88 },
							{ name: 'Python', level: 75 },
						]}
					/>
					<SkillBentoCard
						icon={Cloud}
						title="Cloud"
						skills={[
							{ name: 'AWS', level: 78 },
							{ name: 'Docker', level: 85 },
						]}
					/>
					<SkillBentoCard
						icon={Palette}
						title="Design"
						skills={[
							{ name: 'Figma', level: 75 },
							{ name: 'Design Systems', level: 90 },
						]}
					/>
					<SkillBentoCard
						icon={Brain}
						title="AI/ML"
						skills={[
							{ name: 'TensorFlow', level: 65 },
							{ name: 'LLMs', level: 70 },
						]}
					/>
					<SkillBentoCard
						icon={Shield}
						title="Security"
						skills={[
							{ name: 'OAuth', level: 85 },
							{ name: 'OWASP', level: 80 },
						]}
						className="@xl:col-span-2"
					/>
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

interface SkillBentoCardProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	skills: Skill[];
	className?: string;
}

const SkillBentoCard = ({
	icon: Icon,
	title,
	skills,
	className = '',
}: SkillBentoCardProps) => (
	<Card className={`group hover:shadow-lg transition-all ${className}`}>
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
					<Icon className="size-5 text-primary" />
				</div>
				<h3 className="font-bold text-lg">{title}</h3>
			</div>
			<div className="flex-1 space-y-4">
				{skills.map(({ name, level }, i) => (
					<div key={i}>
						<div className="flex justify-between mb-1.5">
							<span className="text-sm">{name}</span>
							<span className="text-xs text-muted-foreground">{level}%</span>
						</div>
						<Progress value={level} className="h-1.5" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
