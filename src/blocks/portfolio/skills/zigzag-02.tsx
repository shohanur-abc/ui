import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code2, Database, Layers, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Technical Expertise"
					title="Alternating Skills"
					description="Expertise levels across different domains"
				/>

				<ZigzagProgress
					items={[
						{
							icon: Code2,
							title: 'Frontend',
							level: 95,
							description: 'React, Next.js, TypeScript, Tailwind',
						},
						{
							icon: Server,
							title: 'Backend',
							level: 88,
							description: 'Node.js, Python, GraphQL, REST',
						},
						{
							icon: Database,
							title: 'Database',
							level: 85,
							description: 'PostgreSQL, MongoDB, Redis, Prisma',
						},
						{
							icon: Layers,
							title: 'DevOps',
							level: 80,
							description: 'Docker, AWS, Kubernetes, CI/CD',
						},
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

interface ZigzagItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	level: number;
	description: string;
}

const ZigzagProgress = ({ items }: { items: ZigzagItem[] }) => (
	<div className="max-w-4xl mx-auto space-y-6">
		{items.map((item, i) => (
			<ZigzagCard key={i} {...item} reverse={i % 2 === 1} />
		))}
	</div>
);

interface ZigzagCardProps extends ZigzagItem {
	reverse: boolean;
}

const ZigzagCard = ({
	icon: Icon,
	title,
	level,
	description,
	reverse,
}: ZigzagCardProps) => (
	<Card className="group hover:border-primary/50 transition-all overflow-hidden">
		<CardContent className={`p-0 flex ${reverse ? 'flex-row-reverse' : ''}`}>
			<div className="w-20 @md:w-24 shrink-0 bg-primary/10 flex items-center justify-center">
				<Icon className="size-8 @md:size-10 text-primary" />
			</div>
			<div className="flex-1 p-5 @md:p-6">
				<div className="flex items-center justify-between mb-2">
					<h4 className="font-bold text-lg">{title}</h4>
					<Badge variant="secondary">{level}%</Badge>
				</div>
				<p className="text-sm text-muted-foreground mb-3">{description}</p>
				<Progress value={level} className="h-2" />
			</div>
		</CardContent>
	</Card>
);
