import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Briefcase, Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-4 gap-8 @xl:gap-12">
					<SidebarContent
						eyebrow="Experience"
						title="Professional Journey"
						description="Over 8 years of building products across startups and enterprises."
						cta={{ label: 'View Full Resume', href: '#resume' }}
					/>

					<div className="@xl:col-span-3">
						<ExperienceList
							items={[
								{
									role: 'Senior Frontend Developer',
									company: 'Tech Corp',
									type: 'Full-time',
									location: 'Remote',
									period: '2022 - Present',
									description:
										'Leading frontend architecture for enterprise SaaS products.',
									skills: ['React', 'TypeScript', 'GraphQL'],
								},
								{
									role: 'Full-Stack Developer',
									company: 'StartupX',
									type: 'Full-time',
									location: 'San Francisco, CA',
									period: '2020 - 2022',
									description: 'Built MVP and scaled to 100k+ users.',
									skills: ['Next.js', 'Node.js', 'PostgreSQL'],
								},
								{
									role: 'Frontend Developer',
									company: 'Agency Y',
									type: 'Contract',
									location: 'New York, NY',
									period: '2018 - 2020',
									description:
										'Delivered 20+ client projects across various industries.',
									skills: ['React', 'Vue.js', 'SCSS'],
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

interface SidebarContentProps {
	eyebrow: string;
	title: string;
	description: string;
	cta: { label: string; href: string };
}

const SidebarContent = ({
	eyebrow,
	title,
	description,
	cta,
}: SidebarContentProps) => (
	<div className="@xl:sticky @xl:top-8">
		<Badge variant="outline" className="mb-3 @md:mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
			{title}
		</h2>
		<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">
			{description}
		</p>
		<Button variant="outline" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);

interface ExperienceItem {
	role: string;
	company: string;
	type: string;
	location: string;
	period: string;
	description: string;
	skills: string[];
}

const ExperienceList = ({ items }: { items: ExperienceItem[] }) => (
	<div className="space-y-6 @md:space-y-8">
		{items.map(
			({ role, company, type, location, period, description, skills }, i) => (
				<div key={i}>
					<div className="flex flex-wrap items-start justify-between gap-2 mb-3">
						<div>
							<h3 className="text-lg @md:text-xl font-bold">{role}</h3>
							<p className="text-base text-primary font-medium">{company}</p>
						</div>
						<Badge variant="secondary">{type}</Badge>
					</div>

					<div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
						<span className="flex items-center gap-1.5">
							<MapPin className="size-4" />
							{location}
						</span>
						<span className="flex items-center gap-1.5">
							<Calendar className="size-4" />
							{period}
						</span>
					</div>

					<p className="text-sm @md:text-base text-muted-foreground mb-4">
						{description}
					</p>

					<div className="flex flex-wrap gap-2">
						{skills.map((skill, j) => (
							<Badge key={j} variant="outline" className="text-xs">
								{skill}
							</Badge>
						))}
					</div>

					{i < items.length - 1 && <Separator className="mt-6 @md:mt-8" />}
				</div>
			),
		)}
	</div>
);
