'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, GraduationCap, Rocket } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleSection
					badge="Journey"
					title="Skills Evolution"
					description="How my expertise has grown over time"
				/>

				<JourneyTabs
					tabs={[
						{
							id: 'current',
							label: 'Current',
							icon: Rocket,
							items: [
								{ skill: 'React & Next.js', status: 'Expert', years: 6 },
								{ skill: 'TypeScript', status: 'Expert', years: 5 },
								{ skill: 'System Design', status: 'Advanced', years: 4 },
								{ skill: 'Cloud Architecture', status: 'Advanced', years: 4 },
							],
						},
						{
							id: 'professional',
							label: 'Professional',
							icon: Briefcase,
							items: [
								{ skill: 'Node.js', status: 'Expert', years: 6 },
								{ skill: 'Python', status: 'Advanced', years: 5 },
								{ skill: 'PostgreSQL', status: 'Advanced', years: 5 },
								{ skill: 'Docker', status: 'Advanced', years: 4 },
							],
						},
						{
							id: 'learning',
							label: 'Learning',
							icon: GraduationCap,
							items: [
								{ skill: 'Rust', status: 'Beginner', years: 1 },
								{ skill: 'AI/ML', status: 'Intermediate', years: 2 },
								{ skill: 'WebAssembly', status: 'Beginner', years: 1 },
								{ skill: 'Blockchain', status: 'Beginner', years: 1 },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface TitleSectionProps {
	badge: string;
	title: string;
	description: string;
}

const TitleSection = ({ badge, title, description }: TitleSectionProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface JourneyItem {
	skill: string;
	status: string;
	years: number;
}

interface TabItem {
	id: string;
	label: string;
	icon: ComponentType<{ className?: string }>;
	items: JourneyItem[];
}

const JourneyTabs = ({ tabs }: { tabs: TabItem[] }) => (
	<Tabs defaultValue={tabs[0].id} className="max-w-3xl mx-auto">
		<TabsList className="grid w-full grid-cols-3 mb-8">
			{tabs.map(({ id, label, icon: Icon }) => (
				<TabsTrigger key={id} value={id} className="gap-2">
					<Icon className="size-4" />
					{label}
				</TabsTrigger>
			))}
		</TabsList>

		{tabs.map(({ id, items }) => (
			<TabsContent key={id} value={id}>
				<div className="grid @sm:grid-cols-2 gap-4">
					{items.map((item, i) => (
						<JourneyCard key={i} {...item} />
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);

const JourneyCard = ({ skill, status, years }: JourneyItem) => {
	const statusColor =
		{
			Expert: 'bg-green-500/10 text-green-500',
			Advanced: 'bg-blue-500/10 text-blue-500',
			Intermediate: 'bg-yellow-500/10 text-yellow-500',
			Beginner: 'bg-orange-500/10 text-orange-500',
		}[status] || 'bg-muted text-muted-foreground';

	return (
		<Card className="group hover:border-primary/50 transition-all">
			<CardContent className="p-5">
				<div className="flex items-center justify-between mb-2">
					<h4 className="font-semibold">{skill}</h4>
					<span
						className={`text-xs font-medium px-2 py-1 rounded ${statusColor}`}
					>
						{status}
					</span>
				</div>
				<p className="text-sm text-muted-foreground">
					{years} {years === 1 ? 'year' : 'years'} of experience
				</p>
			</CardContent>
		</Card>
	);
};
