import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Server, Database, Layers } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Full Stack"
					title="Development Stack"
					subtitle="End-to-end application development"
				/>

				<StackVisualization
					layers={[
						{
							icon: Globe,
							label: 'Client',
							technologies: 'React, Next.js, TypeScript',
							color: 'bg-blue-500',
						},
						{
							icon: Server,
							label: 'Server',
							technologies: 'Node.js, GraphQL, REST',
							color: 'bg-green-500',
						},
						{
							icon: Database,
							label: 'Data',
							technologies: 'PostgreSQL, Redis, S3',
							color: 'bg-purple-500',
						},
						{
							icon: Layers,
							label: 'Infra',
							technologies: 'AWS, Docker, K8s',
							color: 'bg-orange-500',
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

interface Layer {
	icon: ComponentType<{ className?: string }>;
	label: string;
	technologies: string;
	color: string;
}

const StackVisualization = ({ layers }: { layers: Layer[] }) => (
	<div className="max-w-md mx-auto">
		{layers.map((layer, i) => (
			<StackLayer key={i} {...layer} isLast={i === layers.length - 1} />
		))}
	</div>
);

const StackLayer = ({
	icon: Icon,
	label,
	technologies,
	color,
	isLast,
}: Layer & { isLast: boolean }) => (
	<div className="relative">
		<Card className="group hover:border-primary/50 transition-all">
			<CardContent className="p-5 flex items-center gap-4">
				<div
					className={`size-12 rounded-xl ${color} bg-opacity-20 flex items-center justify-center`}
				>
					<Icon className={`size-6 ${color.replace('bg-', 'text-')}`} />
				</div>
				<div>
					<h4 className="font-bold">{label}</h4>
					<p className="text-sm text-muted-foreground">{technologies}</p>
				</div>
			</CardContent>
		</Card>
		{!isLast && (
			<div className="flex justify-center py-2">
				<div className="w-0.5 h-6 bg-border" />
			</div>
		)}
	</div>
);
