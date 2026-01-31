'use client';

import { Badge } from '@/components/ui/badge';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Briefcase, GraduationCap, Heart } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Journey" />
					<Title text="Life Journey" />
					<Description text="Professional milestones intertwined with personal growth." />
				</div>

				<div className="grid @lg:grid-cols-3 gap-6 @lg:gap-8">
					<JourneyColumn
						icon={Briefcase}
						title="Work"
						items={[
							{
								id: 'w1',
								title: 'Director of Engineering',
								year: '2024',
								description: 'Leading 40+ engineers',
							},
							{
								id: 'w2',
								title: 'Staff Engineer',
								year: '2022',
								description: 'Technical leadership',
							},
							{
								id: 'w3',
								title: 'Senior Engineer',
								year: '2020',
								description: 'Team lead role',
							},
							{
								id: 'w4',
								title: 'Software Engineer',
								year: '2018',
								description: 'Full-stack development',
							},
						]}
					/>

					<JourneyColumn
						icon={GraduationCap}
						title="Education"
						items={[
							{
								id: 'e1',
								title: 'Executive MBA',
								year: '2023',
								description: 'Business leadership',
							},
							{
								id: 'e2',
								title: 'M.S. Computer Science',
								year: '2018',
								description: 'Machine learning focus',
							},
							{
								id: 'e3',
								title: 'B.S. Computer Science',
								year: '2016',
								description: 'Summa cum laude',
							},
						]}
					/>

					<JourneyColumn
						icon={Heart}
						title="Personal"
						items={[
							{
								id: 'p1',
								title: 'Open Source Maintainer',
								year: '2023',
								description: '10K+ GitHub stars',
							},
							{
								id: 'p2',
								title: 'Conference Speaker',
								year: '2022',
								description: '5 international talks',
							},
							{
								id: 'p3',
								title: 'Mentor',
								year: '2021',
								description: '20+ mentees helped',
							},
							{
								id: 'p4',
								title: 'Blog Started',
								year: '2019',
								description: '100K+ monthly readers',
							},
						]}
					/>
				</div>
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

interface JourneyItem {
	id: string;
	title: string;
	year: string;
	description: string;
}

interface JourneyColumnProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	items: JourneyItem[];
}

const JourneyColumn = ({ icon: Icon, title, items }: JourneyColumnProps) => (
	<div className="p-6 bg-card rounded-xl border">
		<div className="flex items-center gap-3 mb-6">
			<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
				<Icon className="size-5 text-primary" />
			</div>
			<h3 className="text-lg font-semibold">{title}</h3>
		</div>
		<Accordion type="single" collapsible className="space-y-0">
			{items.map(({ id, title: itemTitle, year, description }, i) => (
				<div key={id}>
					{i > 0 && <Separator className="my-2" />}
					<AccordionItem value={id} className="border-0">
						<AccordionTrigger className="hover:no-underline py-3 text-sm">
							<div className="flex items-center justify-between w-full pr-2 text-left">
								<span className="font-medium">{itemTitle}</span>
								<Badge variant="outline" className="text-xs font-mono">
									{year}
								</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-3">
							<p className="text-sm text-muted-foreground">{description}</p>
						</AccordionContent>
					</AccordionItem>
				</div>
			))}
		</Accordion>
	</div>
);
