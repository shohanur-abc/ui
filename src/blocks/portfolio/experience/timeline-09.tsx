import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building, Calendar, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-[300px_1fr] @xl:grid-cols-[350px_1fr] gap-8 @lg:gap-12">
					<div>
						<Eyebrow icon={Building} text="Employment" />
						<Title text="Work Experience" />
						<Description text="Full-time positions and key responsibilities throughout my career." />
					</div>

					<div>
						<ExperienceList
							items={[
								{
									company: 'Acme Corp',
									url: 'https://acme.com',
									role: 'Engineering Manager',
									type: 'Full-time',
									start: 'Mar 2023',
									end: 'Present',
									description:
										'Managing platform engineering team of 15 engineers. Leading cloud infrastructure modernization.',
								},
								{
									company: 'TechStart',
									url: 'https://techstart.io',
									role: 'Senior Software Engineer',
									type: 'Full-time',
									start: 'Jan 2021',
									end: 'Feb 2023',
									description:
										'Led frontend architecture. Built design system used by 50+ engineers.',
								},
								{
									company: 'DataFlow',
									url: 'https://dataflow.com',
									role: 'Software Engineer',
									type: 'Full-time',
									start: 'Jun 2019',
									end: 'Dec 2020',
									description:
										'Full-stack development on data visualization platform. Shipped real-time dashboards.',
								},
								{
									company: 'CodeLab',
									url: 'https://codelab.dev',
									role: 'Junior Developer',
									type: 'Full-time',
									start: 'Aug 2017',
									end: 'May 2019',
									description:
										'Started career building web applications for various clients.',
								},
							]}
						/>
					</div>
				</div>
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

interface ExperienceItem {
	company: string;
	url: string;
	role: string;
	type: string;
	start: string;
	end: string;
	description: string;
}

const ExperienceList = ({ items }: { items: ExperienceItem[] }) => (
	<div>
		{items.map(({ company, url, role, type, start, end, description }, i) => (
			<div key={i}>
				{i > 0 && <Separator className="my-6" />}
				<div className="group">
					<div className="flex flex-wrap items-start justify-between gap-2 mb-2">
						<Link
							href={url}
							className="inline-flex items-center gap-1 text-lg @md:text-xl font-semibold hover:text-primary transition-colors"
						>
							{company}
							<ArrowUpRight className="size-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
						</Link>
						<Badge variant="secondary" className="text-xs">
							{type}
						</Badge>
					</div>
					<p className="text-sm text-primary mb-1">{role}</p>
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
						<Calendar className="size-3" />
						<span>
							{start} – {end}
						</span>
					</div>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{description}
					</p>
				</div>
			</div>
		))}
	</div>
);
