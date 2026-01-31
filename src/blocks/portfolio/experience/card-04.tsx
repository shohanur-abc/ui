import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Code} text="Skills" />
					<Title text="Technical Skills" />
					<Description text="Core competencies developed through years of hands-on experience." />
				</div>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4">
					<SkillCard name="React" level={95} category="Frontend" years={7} />
					<SkillCard
						name="TypeScript"
						level={92}
						category="Language"
						years={5}
					/>
					<SkillCard name="Next.js" level={90} category="Framework" years={4} />
					<SkillCard name="Node.js" level={88} category="Backend" years={6} />
					<SkillCard
						name="PostgreSQL"
						level={82}
						category="Database"
						years={5}
					/>
					<SkillCard name="AWS" level={78} category="Cloud" years={4} />
					<SkillCard name="Docker" level={85} category="DevOps" years={5} />
					<SkillCard name="GraphQL" level={80} category="API" years={4} />
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

interface SkillCardProps {
	name: string;
	level: number;
	category: string;
	years: number;
}

const SkillCard = ({ name, level, category, years }: SkillCardProps) => (
	<Card className="group hover:shadow-md transition-all hover:border-primary/50">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-2">
				<Badge variant="secondary" className="text-xs">
					{category}
				</Badge>
				<span className="text-xs text-muted-foreground">{years}y</span>
			</div>
			<h3 className="font-semibold mb-3 group-hover:text-primary transition-colors">
				{name}
			</h3>
			<div className="space-y-1.5">
				<Progress value={level} className="h-1.5" />
				<p className="text-xs text-muted-foreground text-right">{level}%</p>
			</div>
		</CardContent>
	</Card>
);
