'use client';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Timeline" />
					<Title text="Experience by Year" />
					<Description text="Browse my experience organized chronologically." />
				</div>

				<YearTabs
					years={[
						{
							year: '2024',
							events: [
								{
									title: 'Promoted to Director',
									type: 'Promotion',
									description:
										'Now leading engineering organization of 40+ engineers.',
								},
								{
									title: 'Launched Design System v3',
									type: 'Launch',
									description: 'Major release with 50+ new components.',
								},
							],
						},
						{
							year: '2023',
							events: [
								{
									title: 'Staff Engineer',
									type: 'Role',
									description: 'Technical leadership across multiple teams.',
								},
								{
									title: 'AWS Certification',
									type: 'Certification',
									description: 'Solutions Architect Professional.',
								},
								{
									title: 'Conference Speaker',
									type: 'Speaking',
									description: 'Spoke at React Summit about performance.',
								},
							],
						},
						{
							year: '2022',
							events: [
								{
									title: 'Joined TechCorp',
									type: 'New Role',
									description: 'Started as Senior Engineer on platform team.',
								},
								{
									title: 'Patent Filed',
									type: 'Achievement',
									description: 'Caching algorithm for distributed systems.',
								},
							],
						},
						{
							year: '2021',
							events: [
								{
									title: 'Team Lead',
									type: 'Promotion',
									description: 'Started leading team of 8 engineers.',
								},
								{
									title: 'First Open Source Project',
									type: 'Project',
									description: 'Published popular React component library.',
								},
							],
						},
						{
							year: '2020',
							events: [
								{
									title: 'Senior Engineer',
									type: 'Promotion',
									description: 'Promoted to senior role at Meta.',
								},
								{
									title: 'Masters Degree',
									type: 'Education',
									description: 'Completed MS in Computer Science.',
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

interface Event {
	title: string;
	type: string;
	description: string;
}

interface Year {
	year: string;
	events: Event[];
}

const YearTabs = ({ years }: { years: Year[] }) => (
	<Tabs defaultValue={years[0]?.year} className="max-w-4xl mx-auto">
		<TabsList className="flex w-full overflow-x-auto mb-8">
			{years.map(({ year }) => (
				<TabsTrigger key={year} value={year} className="gap-2 shrink-0">
					<Calendar className="size-4 hidden @sm:block" />
					{year}
				</TabsTrigger>
			))}
		</TabsList>
		{years.map(({ year, events }) => (
			<TabsContent key={year} value={year} className="mt-0">
				<div className="p-6 bg-background rounded-xl border">
					<h3 className="text-2xl font-bold mb-6">{year} Highlights</h3>
					<div className="space-y-0">
						{events.map(({ title, type, description }, i) => (
							<div key={i}>
								{i > 0 && <Separator className="my-6" />}
								<div className="flex flex-col @sm:flex-row @sm:items-start gap-4">
									<Badge variant="secondary" className="w-fit shrink-0">
										{type}
									</Badge>
									<div>
										<h4 className="font-semibold mb-1">{title}</h4>
										<p className="text-sm text-muted-foreground">
											{description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</TabsContent>
		))}
	</Tabs>
);
