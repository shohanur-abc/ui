'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Braces, Database, Layout, Server } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Technical Stack" />
					<Title text="Technologies I Work With" />
					<Description text="A comprehensive toolkit spanning frontend, backend, databases, and infrastructure." />
				</div>

				<TechTabs
					categories={[
						{
							id: 'frontend',
							icon: Layout,
							label: 'Frontend',
							techs: [
								{ name: 'React', level: 'Expert', years: '5+' },
								{ name: 'Next.js', level: 'Expert', years: '4+' },
								{ name: 'TypeScript', level: 'Expert', years: '4+' },
								{ name: 'Tailwind CSS', level: 'Expert', years: '3+' },
								{ name: 'Vue.js', level: 'Advanced', years: '2+' },
								{ name: 'Svelte', level: 'Intermediate', years: '1+' },
							],
						},
						{
							id: 'backend',
							icon: Server,
							label: 'Backend',
							techs: [
								{ name: 'Node.js', level: 'Expert', years: '5+' },
								{ name: 'Python', level: 'Advanced', years: '3+' },
								{ name: 'Go', level: 'Intermediate', years: '2+' },
								{ name: 'GraphQL', level: 'Advanced', years: '3+' },
								{ name: 'REST APIs', level: 'Expert', years: '5+' },
								{ name: 'gRPC', level: 'Intermediate', years: '1+' },
							],
						},
						{
							id: 'database',
							icon: Database,
							label: 'Database',
							techs: [
								{ name: 'PostgreSQL', level: 'Expert', years: '4+' },
								{ name: 'MongoDB', level: 'Advanced', years: '3+' },
								{ name: 'Redis', level: 'Advanced', years: '3+' },
								{ name: 'Prisma', level: 'Expert', years: '3+' },
								{ name: 'Drizzle', level: 'Advanced', years: '1+' },
								{ name: 'SQLite', level: 'Advanced', years: '4+' },
							],
						},
						{
							id: 'devops',
							icon: Braces,
							label: 'DevOps',
							techs: [
								{ name: 'Docker', level: 'Expert', years: '4+' },
								{ name: 'AWS', level: 'Advanced', years: '3+' },
								{ name: 'Vercel', level: 'Expert', years: '3+' },
								{ name: 'GitHub Actions', level: 'Expert', years: '3+' },
								{ name: 'Terraform', level: 'Intermediate', years: '2+' },
								{ name: 'Kubernetes', level: 'Intermediate', years: '1+' },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface TechItem {
	name: string;
	level: string;
	years: string;
}

interface CategoryItem {
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	techs: TechItem[];
}

const TechTabs = ({ categories }: { categories: CategoryItem[] }) => (
	<Tabs defaultValue={categories[0].id} className="max-w-4xl mx-auto">
		<TabsList className="w-full h-auto flex-wrap justify-center gap-1 p-1.5 mb-8">
			{categories.map(({ id, icon: Icon, label }) => (
				<TabsTrigger key={id} value={id} className="gap-2 px-4 py-2.5">
					<Icon className="size-4" />
					{label}
				</TabsTrigger>
			))}
		</TabsList>

		{categories.map(({ id, techs }) => (
			<TabsContent key={id} value={id}>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-3 @md:gap-4">
					{techs.map(({ name, level, years }, i) => (
						<Card
							key={i}
							className="py-0 group hover:shadow-md transition-all hover:border-primary/30"
						>
							<CardContent className="p-4 @md:p-5">
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-semibold">{name}</h3>
									<span className="text-xs text-muted-foreground">{years}</span>
								</div>
								<Badge
									variant={
										level === 'Expert'
											? 'default'
											: level === 'Advanced'
												? 'secondary'
												: 'outline'
									}
									className="text-xs"
								>
									{level}
								</Badge>
							</CardContent>
						</Card>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
