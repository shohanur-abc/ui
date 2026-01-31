import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase, Clock, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface JobItem {
	title: string;
	department: string;
	location: string;
	type: string;
	href: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Briefcase} text="Careers" />
					<Title text="Join Our Growing" highlight="Team" />
					<Description text="We're building something special and looking for talented people to help us shape the future of work." />
				</div>

				<JobListings
					jobs={[
						{
							title: 'Senior Frontend Engineer',
							department: 'Engineering',
							location: 'Remote',
							type: 'Full-time',
							href: '/careers/senior-frontend',
						},
						{
							title: 'Product Designer',
							department: 'Design',
							location: 'San Francisco, CA',
							type: 'Full-time',
							href: '/careers/product-designer',
						},
						{
							title: 'DevOps Engineer',
							department: 'Engineering',
							location: 'Remote',
							type: 'Full-time',
							href: '/careers/devops',
						},
						{
							title: 'Customer Success Manager',
							department: 'Customer Success',
							location: 'New York, NY',
							type: 'Full-time',
							href: '/careers/csm',
						},
						{
							title: 'Technical Writer',
							department: 'Documentation',
							location: 'Remote',
							type: 'Part-time',
							href: '/careers/tech-writer',
						},
					]}
				/>

				<CTASection label="View All Openings" href="/careers" count={12} />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const JobListings = ({ jobs }: { jobs: JobItem[] }) => (
	<div className="space-y-3 max-w-3xl mx-auto">
		{jobs.map((job) => (
			<Link key={job.title} href={job.href}>
				<Card className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
					<CardContent className="p-4 @md:p-5 flex flex-col @sm:flex-row @sm:items-center gap-4">
						<div className="flex-1">
							<h3 className="font-semibold group-hover:text-primary transition-colors">
								{job.title}
							</h3>
							<p className="text-sm text-muted-foreground">{job.department}</p>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<Badge variant="secondary" className="gap-1.5 text-xs">
								<MapPin className="size-3" />
								{job.location}
							</Badge>
							<Badge variant="outline" className="gap-1.5 text-xs">
								<Clock className="size-3" />
								{job.type}
							</Badge>
						</div>
						<ArrowRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);

const CTASection = ({
	label,
	href,
	count,
}: {
	label: string;
	href: string;
	count: number;
}) => (
	<div className="mt-10 @md:mt-12 text-center">
		<p className="text-sm text-muted-foreground mb-4">
			{count} open positions across all departments
		</p>
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-4" />
			</Link>
		</Button>
	</div>
);
