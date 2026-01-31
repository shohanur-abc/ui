'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
	FileText,
	Download,
	Briefcase,
	GraduationCap,
	Award,
	Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
					<div className="max-w-xl">
						<Eyebrow icon={FileText} text="Resume" />
						<Title text="Interactive Resume" />
						<Description text="Explore my qualifications in an interactive format." />
					</div>
					<Button asChild>
						<Link href="/resume.pdf">
							<Download className="size-4" />
							Download PDF
						</Link>
					</Button>
				</div>

				<ResumeTabs
					sections={[
						{
							id: 'experience',
							icon: Briefcase,
							label: 'Experience',
							entries: [
								{
									title: 'Principal Engineer',
									org: 'TechCorp',
									period: '2022-Present',
									points: [
										'Technical leadership',
										'Architecture design',
										'Team mentorship',
									],
								},
								{
									title: 'Staff Engineer',
									org: 'StartupX',
									period: '2020-2022',
									points: [
										'Platform development',
										'Performance optimization',
										'Code reviews',
									],
								},
								{
									title: 'Senior Engineer',
									org: 'Meta',
									period: '2018-2020',
									points: [
										'Feature development',
										'A/B testing',
										'Cross-team collaboration',
									],
								},
							],
						},
						{
							id: 'education',
							icon: GraduationCap,
							label: 'Education',
							entries: [
								{
									title: 'M.S. Computer Science',
									org: 'Stanford University',
									period: '2016-2018',
									points: [
										'Distributed Systems',
										'Machine Learning',
										'Research Assistant',
									],
								},
								{
									title: 'B.S. Computer Science',
									org: 'UC Berkeley',
									period: '2012-2016',
									points: [
										'Honors Graduate',
										"Dean's List",
										'Teaching Assistant',
									],
								},
							],
						},
						{
							id: 'certifications',
							icon: Award,
							label: 'Certifications',
							entries: [
								{
									title: 'AWS Solutions Architect',
									org: 'Amazon',
									period: '2023',
									points: ['Professional level', 'Cloud architecture'],
								},
								{
									title: 'GCP Professional Engineer',
									org: 'Google',
									period: '2022',
									points: ['Data engineering', 'ML specialization'],
								},
							],
						},
						{
							id: 'skills',
							icon: Wrench,
							label: 'Skills',
							entries: [
								{
									title: 'Frontend',
									org: 'Expert Level',
									period: '8+ years',
									points: ['React/Next.js', 'TypeScript', 'CSS/Tailwind'],
								},
								{
									title: 'Backend',
									org: 'Advanced',
									period: '6+ years',
									points: ['Node.js', 'Python', 'PostgreSQL'],
								},
								{
									title: 'DevOps',
									org: 'Proficient',
									period: '5+ years',
									points: ['AWS', 'Docker', 'Kubernetes'],
								},
							],
						},
					]}
				/>
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

interface Entry {
	title: string;
	org: string;
	period: string;
	points: string[];
}

interface Section {
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	entries: Entry[];
}

const ResumeTabs = ({ sections }: { sections: Section[] }) => (
	<Tabs defaultValue={sections[0]?.id}>
		<TabsList className="flex w-full @lg:w-auto mb-8 overflow-x-auto">
			{sections.map(({ id, icon: Icon, label }) => (
				<TabsTrigger key={id} value={id} className="gap-2 shrink-0">
					<Icon className="size-4" />
					<span className="hidden @sm:inline">{label}</span>
				</TabsTrigger>
			))}
		</TabsList>
		{sections.map(({ id, entries }) => (
			<TabsContent key={id} value={id} className="mt-0">
				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4">
					{entries.map(({ title, org, period, points }, i) => (
						<Card key={i} className="hover:shadow-md transition-shadow">
							<CardContent className="p-6">
								<Badge variant="secondary" className="mb-3 text-xs font-mono">
									{period}
								</Badge>
								<h3 className="font-semibold mb-1">{title}</h3>
								<p className="text-sm text-primary mb-4">{org}</p>
								<ul className="space-y-1.5">
									{points.map((point, j) => (
										<li
											key={j}
											className="text-sm text-muted-foreground flex items-center gap-2"
										>
											<span className="size-1.5 rounded-full bg-primary shrink-0" />
											{point}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
