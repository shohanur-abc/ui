'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Building2, Laptop, Users } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Globe} text="Work Modes" />
					<Title text="Work Environment Experience" />
					<Description text="Experience across different work arrangements." />
				</div>

				<WorkModeTabs
					modes={[
						{
							id: 'remote',
							icon: Laptop,
							label: 'Remote',
							stats: {
								years: '4 years',
								roles: '3 roles',
								companies: '2 companies',
							},
							experiences: [
								{
									role: 'Principal Engineer',
									company: 'TechCorp',
									period: '2022-Present',
									highlights: [
										'Async communication',
										'Global team',
										'Self-directed',
									],
								},
								{
									role: 'Staff Engineer',
									company: 'StartupX',
									period: '2020-2022',
									highlights: [
										'Remote-first culture',
										'Flexible hours',
										'Results-focused',
									],
								},
							],
						},
						{
							id: 'hybrid',
							icon: Building2,
							label: 'Hybrid',
							stats: {
								years: '2 years',
								roles: '2 roles',
								companies: '1 company',
							},
							experiences: [
								{
									role: 'Senior Engineer',
									company: 'Meta',
									period: '2019-2020',
									highlights: [
										'3 days office',
										'Team collaboration',
										'Office perks',
									],
								},
							],
						},
						{
							id: 'onsite',
							icon: Users,
							label: 'On-site',
							stats: {
								years: '3 years',
								roles: '3 roles',
								companies: '2 companies',
							},
							experiences: [
								{
									role: 'Software Engineer',
									company: 'Stripe',
									period: '2018-2019',
									highlights: [
										'In-person mentorship',
										'Team bonding',
										'Office culture',
									],
								},
								{
									role: 'Junior Developer',
									company: 'WebStudio',
									period: '2016-2018',
									highlights: [
										'Learning environment',
										'Pair programming',
										'Direct feedback',
									],
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

interface Experience {
	role: string;
	company: string;
	period: string;
	highlights: string[];
}

interface WorkMode {
	id: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	stats: { years: string; roles: string; companies: string };
	experiences: Experience[];
}

const WorkModeTabs = ({ modes }: { modes: WorkMode[] }) => (
	<Tabs defaultValue={modes[0]?.id} className="max-w-4xl mx-auto">
		<TabsList className="grid w-full grid-cols-3 mb-8">
			{modes.map(({ id, icon: Icon, label }) => (
				<TabsTrigger key={id} value={id} className="gap-2">
					<Icon className="size-4" />
					{label}
				</TabsTrigger>
			))}
		</TabsList>
		{modes.map(({ id, stats, experiences }) => (
			<TabsContent key={id} value={id} className="mt-0">
				<div className="grid grid-cols-3 gap-4 mb-6">
					<div className="p-4 bg-muted rounded-lg text-center">
						<p className="text-2xl font-bold">{stats.years}</p>
						<p className="text-xs text-muted-foreground">Total Time</p>
					</div>
					<div className="p-4 bg-muted rounded-lg text-center">
						<p className="text-2xl font-bold">{stats.roles}</p>
						<p className="text-xs text-muted-foreground">Roles</p>
					</div>
					<div className="p-4 bg-muted rounded-lg text-center">
						<p className="text-2xl font-bold">{stats.companies}</p>
						<p className="text-xs text-muted-foreground">Companies</p>
					</div>
				</div>
				<div className="space-y-4">
					{experiences.map(({ role, company, period, highlights }, i) => (
						<Card key={i}>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div>
										<CardTitle className="text-lg">{role}</CardTitle>
										<p className="text-sm text-primary">{company}</p>
									</div>
									<Badge variant="outline" className="text-xs font-mono">
										{period}
									</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{highlights.map((highlight, j) => (
										<Badge key={j} variant="secondary" className="text-xs">
											{highlight}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
