'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<HeaderBlock
					eyebrow="Skill Categories"
					title="Technical Proficiency"
					description="Detailed breakdown of skills by category"
				/>

				<SkillTabs
					categories={[
						{
							id: 'languages',
							label: 'Languages',
							skills: [
								{ name: 'TypeScript', level: 95, experience: '6 years' },
								{ name: 'JavaScript', level: 95, experience: '8 years' },
								{ name: 'Python', level: 82, experience: '5 years' },
								{ name: 'Go', level: 70, experience: '2 years' },
							],
						},
						{
							id: 'frameworks',
							label: 'Frameworks',
							skills: [
								{ name: 'React', level: 95, experience: '6 years' },
								{ name: 'Next.js', level: 92, experience: '4 years' },
								{ name: 'Node.js', level: 88, experience: '6 years' },
								{ name: 'FastAPI', level: 75, experience: '2 years' },
							],
						},
						{
							id: 'tools',
							label: 'Tools',
							skills: [
								{ name: 'Git', level: 95, experience: '8 years' },
								{ name: 'Docker', level: 82, experience: '4 years' },
								{ name: 'AWS', level: 80, experience: '5 years' },
								{ name: 'Figma', level: 75, experience: '3 years' },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderBlockProps {
	eyebrow: string;
	title: string;
	description: string;
}

const HeaderBlock = ({ eyebrow, title, description }: HeaderBlockProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

interface SkillItem {
	name: string;
	level: number;
	experience: string;
}

interface Category {
	id: string;
	label: string;
	skills: SkillItem[];
}

const SkillTabs = ({ categories }: { categories: Category[] }) => (
	<Tabs defaultValue={categories[0].id} className="max-w-3xl mx-auto">
		<TabsList className="grid w-full grid-cols-3 mb-8">
			{categories.map(({ id, label }) => (
				<TabsTrigger key={id} value={id}>
					{label}
				</TabsTrigger>
			))}
		</TabsList>

		{categories.map(({ id, skills }) => (
			<TabsContent key={id} value={id}>
				<div className="space-y-4">
					{skills.map((skill, i) => (
						<SkillProgressRow key={i} {...skill} />
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);

const SkillProgressRow = ({ name, level, experience }: SkillItem) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-5 flex items-center gap-4">
			<div className="w-28 shrink-0">
				<span className="font-semibold">{name}</span>
				<p className="text-xs text-muted-foreground">{experience}</p>
			</div>
			<div className="flex-1">
				<Progress value={level} className="h-3" />
			</div>
			<span className="text-lg font-bold text-primary w-12 text-right">
				{level}%
			</span>
		</CardContent>
	</Card>
);
