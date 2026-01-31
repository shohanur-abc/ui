'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Award, Briefcase } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={TrendingUp} text="Growth" />
					<Title text="Career Growth" />
					<Description text="Track my progression from entry-level to leadership." />
				</div>

				<LevelTabs
					levels={[
						{
							id: 'entry',
							label: 'Entry Level',
							years: '2016-2018',
							roles: [
								{
									title: 'Junior Developer',
									company: 'WebStudio',
									focus: 'Learning fundamentals',
									achievements: [
										'Built 10+ websites',
										'Learned Git workflow',
										'First code review',
									],
								},
							],
						},
						{
							id: 'mid',
							label: 'Mid Level',
							years: '2018-2020',
							roles: [
								{
									title: 'Software Engineer',
									company: 'Stripe',
									focus: 'Feature ownership',
									achievements: [
										'Owned checkout feature',
										'Mentored intern',
										'Improved test coverage',
									],
								},
							],
						},
						{
							id: 'senior',
							label: 'Senior',
							years: '2020-2022',
							roles: [
								{
									title: 'Senior Engineer',
									company: 'Meta',
									focus: 'Technical leadership',
									achievements: [
										'Led Stories feature',
										'Designed architecture',
										'Grew team',
									],
								},
							],
						},
						{
							id: 'staff',
							label: 'Staff',
							years: '2022-2023',
							roles: [
								{
									title: 'Staff Engineer',
									company: 'Google',
									focus: 'Cross-team impact',
									achievements: [
										'Design system lead',
										'Technical strategy',
										'Org-wide influence',
									],
								},
							],
						},
						{
							id: 'principal',
							label: 'Principal',
							years: '2023-Present',
							roles: [
								{
									title: 'Principal Engineer',
									company: 'Google',
									focus: 'Organizational impact',
									achievements: [
										'Technical vision',
										'Industry recognition',
										'Executive partnership',
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

interface Role {
	title: string;
	company: string;
	focus: string;
	achievements: string[];
}

interface Level {
	id: string;
	label: string;
	years: string;
	roles: Role[];
}

const LevelTabs = ({ levels }: { levels: Level[] }) => (
	<Tabs defaultValue={levels[levels.length - 1]?.id}>
		<TabsList className="flex w-full overflow-x-auto mb-8 p-1">
			{levels.map(({ id, label }) => (
				<TabsTrigger key={id} value={id} className="shrink-0">
					{label}
				</TabsTrigger>
			))}
		</TabsList>
		{levels.map(({ id, years, roles }) => (
			<TabsContent key={id} value={id} className="mt-0">
				<div className="p-8 bg-card rounded-xl border">
					<Badge variant="secondary" className="mb-4 font-mono">
						{years}
					</Badge>
					{roles.map(({ title, company, focus, achievements }, i) => (
						<div key={i}>
							<div className="flex items-center gap-2 mb-2">
								<Briefcase className="size-5 text-primary" />
								<h3 className="text-xl font-bold">{title}</h3>
							</div>
							<p className="text-primary mb-1">{company}</p>
							<p className="text-sm text-muted-foreground mb-6">{focus}</p>
							<h4 className="text-sm font-medium mb-3 flex items-center gap-2">
								<Award className="size-4" />
								Key Achievements
							</h4>
							<div className="grid @sm:grid-cols-3 gap-4">
								{achievements.map((achievement, j) => (
									<div key={j} className="p-4 bg-muted/50 rounded-lg">
										<p className="text-sm font-medium">{achievement}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</TabsContent>
		))}
	</Tabs>
);
