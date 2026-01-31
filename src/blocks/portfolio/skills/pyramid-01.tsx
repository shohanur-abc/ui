import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Code2,
	Database,
	Globe,
	Layers,
	Server,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleSection
					eyebrow="Skill Pyramid"
					title="Expertise Hierarchy"
					description="Skills organized by depth of expertise"
				/>

				<Pyramid
					layers={[
						{
							level: 'Expert',
							icon: Code2,
							skills: ['React', 'TypeScript', 'Next.js'],
						},
						{
							level: 'Advanced',
							icon: Server,
							skills: ['Node.js', 'PostgreSQL', 'GraphQL', 'Docker'],
						},
						{
							level: 'Intermediate',
							icon: Database,
							skills: ['Python', 'AWS', 'MongoDB', 'Redis', 'Kubernetes'],
						},
						{
							level: 'Learning',
							icon: Layers,
							skills: [
								'Rust',
								'Go',
								'AI/ML',
								'WebAssembly',
								'Blockchain',
								'Web3',
							],
						},
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

interface Layer {
	level: string;
	icon: ComponentType<{ className?: string }>;
	skills: string[];
}

const Pyramid = ({ layers }: { layers: Layer[] }) => (
	<div className="max-w-4xl mx-auto space-y-4">
		{layers.map((layer, i) => (
			<PyramidRow key={i} {...layer} index={i} total={layers.length} />
		))}
	</div>
);

interface PyramidRowProps extends Layer {
	index: number;
	total: number;
}

const PyramidRow = ({
	level,
	icon: Icon,
	skills,
	index,
	total,
}: PyramidRowProps) => {
	const widthPercent = 50 + (index / (total - 1)) * 50;
	const colors = [
		'border-l-green-500',
		'border-l-blue-500',
		'border-l-yellow-500',
		'border-l-orange-500',
	];

	return (
		<div className="mx-auto" style={{ width: `${widthPercent}%` }}>
			<Card
				className={`group hover:border-primary/50 transition-all border-l-4 ${colors[index]}`}
			>
				<CardContent className="p-4 @md:p-5">
					<div className="flex items-center gap-4 mb-3">
						<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
							<Icon className="size-5 text-primary" />
						</div>
						<h4 className="font-bold">{level}</h4>
						<Badge variant="secondary" className="ml-auto">
							{skills.length} skills
						</Badge>
					</div>
					<div className="flex flex-wrap gap-2 pl-14">
						{skills.map((skill, i) => (
							<Badge key={i} variant="outline">
								{skill}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
