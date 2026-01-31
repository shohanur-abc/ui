'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Database, Globe, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Full Stack"
					title="Layered Skills"
					description="My expertise across the full stack"
				/>

				<StackTabs
					layers={[
						{
							id: 'frontend',
							label: 'Frontend',
							icon: Globe,
							color: 'bg-blue-500',
							tech: [
								{ name: 'React', years: 6, projects: 50 },
								{ name: 'Next.js', years: 4, projects: 30 },
								{ name: 'TypeScript', years: 5, projects: 45 },
								{ name: 'Tailwind CSS', years: 4, projects: 40 },
							],
						},
						{
							id: 'backend',
							label: 'Backend',
							icon: Server,
							color: 'bg-green-500',
							tech: [
								{ name: 'Node.js', years: 6, projects: 35 },
								{ name: 'Python', years: 4, projects: 15 },
								{ name: 'GraphQL', years: 3, projects: 20 },
								{ name: 'REST APIs', years: 6, projects: 40 },
							],
						},
						{
							id: 'database',
							label: 'Database',
							icon: Database,
							color: 'bg-purple-500',
							tech: [
								{ name: 'PostgreSQL', years: 5, projects: 30 },
								{ name: 'MongoDB', years: 4, projects: 20 },
								{ name: 'Redis', years: 3, projects: 15 },
								{ name: 'Prisma', years: 3, projects: 25 },
							],
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

interface TechItem {
	name: string;
	years: number;
	projects: number;
}

interface Layer {
	id: string;
	label: string;
	icon: ComponentType<{ className?: string }>;
	color: string;
	tech: TechItem[];
}

const StackTabs = ({ layers }: { layers: Layer[] }) => (
	<Tabs defaultValue={layers[0].id} className="max-w-3xl mx-auto">
		<TabsList className="grid w-full grid-cols-3 mb-8">
			{layers.map(({ id, label, icon: Icon }) => (
				<TabsTrigger key={id} value={id} className="gap-2">
					<Icon className="size-4" />
					{label}
				</TabsTrigger>
			))}
		</TabsList>

		{layers.map(({ id, color, tech }) => (
			<TabsContent key={id} value={id}>
				<div className="grid @sm:grid-cols-2 gap-4">
					{tech.map((item, i) => (
						<TechCard key={i} {...item} color={color} />
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);

interface TechCardProps extends TechItem {
	color: string;
}

const TechCard = ({ name, years, projects, color }: TechCardProps) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-5">
			<div className="flex items-center gap-3 mb-4">
				<div className={`size-3 rounded-full ${color}`} />
				<h4 className="font-bold">{name}</h4>
			</div>
			<div className="flex items-center gap-6 text-sm">
				<div>
					<span className="text-2xl font-bold">{years}</span>
					<span className="text-muted-foreground ml-1">years</span>
				</div>
				<div>
					<span className="text-2xl font-bold">{projects}</span>
					<span className="text-muted-foreground ml-1">projects</span>
				</div>
			</div>
		</CardContent>
	</Card>
);
