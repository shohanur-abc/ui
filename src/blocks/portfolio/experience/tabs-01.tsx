'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Experience" />
					<Title text="My Background" />
					<Description text="Explore different aspects of my professional journey." />
				</div>

				<ExperienceTabs
					tabs={[
						{
							id: 'work',
							icon: Briefcase,
							label: 'Work',
							items: [
								{
									title: 'Staff Engineer',
									subtitle: 'Google · 2022-Present',
									description: 'Leading frontend architecture initiatives.',
								},
								{
									title: 'Senior Engineer',
									subtitle: 'Meta · 2020-2022',
									description: 'Built and shipped Instagram features.',
								},
								{
									title: 'Software Engineer',
									subtitle: 'Stripe · 2018-2020',
									description: 'Payment dashboard development.',
								},
							],
						},
						{
							id: 'education',
							icon: GraduationCap,
							label: 'Education',
							items: [
								{
									title: 'M.S. Computer Science',
									subtitle: 'Stanford · 2018',
									description: 'Focus on distributed systems.',
								},
								{
									title: 'B.S. Computer Science',
									subtitle: 'UC Berkeley · 2016',
									description: 'Graduated with honors.',
								},
							],
						},
						{
							id: 'certifications',
							icon: Award,
							label: 'Certifications',
							items: [
								{
									title: 'AWS Solutions Architect',
									subtitle: 'Amazon · 2023',
									description: 'Professional level certification.',
								},
								{
									title: 'GCP Professional',
									subtitle: 'Google · 2022',
									description: 'Cloud architecture specialist.',
								},
							],
						},
						{
							id: 'skills',
							icon: Code,
							label: 'Skills',
							items: [
								{
									title: 'Frontend',
									subtitle: 'React, Next.js, TypeScript',
									description: 'Building modern web interfaces.',
								},
								{
									title: 'Backend',
									subtitle: 'Node.js, Python, Go',
									description: 'Scalable server solutions.',
								},
								{
									title: 'DevOps',
									subtitle: 'AWS, Docker, K8s',
									description: 'Infrastructure automation.',
								},
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface TabItem {
	title: string;
	subtitle: string;
	description: string;
}

interface Tab {
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	items: TabItem[];
}

const ExperienceTabs = ({ tabs }: { tabs: Tab[] }) => (
	<Tabs defaultValue={tabs[0]?.id} className="max-w-3xl mx-auto">
		<TabsList className="grid w-full grid-cols-4 mb-8">
			{tabs.map(({ id, icon: Icon, label }) => (
				<TabsTrigger key={id} value={id} className="gap-2">
					<Icon className="size-4 hidden @sm:block" />
					<span>{label}</span>
				</TabsTrigger>
			))}
		</TabsList>
		{tabs.map(({ id, items }) => (
			<TabsContent key={id} value={id} className="mt-0">
				<div className="space-y-0">
					{items.map(({ title, subtitle, description }, i) => (
						<div key={i}>
							{i > 0 && <Separator className="my-6" />}
							<div>
								<h3 className="text-lg font-semibold">{title}</h3>
								<p className="text-sm text-primary mb-2">{subtitle}</p>
								<p className="text-sm text-muted-foreground">{description}</p>
							</div>
						</div>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
