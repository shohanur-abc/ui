import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Briefcase, GraduationCap, Rocket } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Career Path"
					title="Skills Journey"
					subtitle="How my expertise has evolved over time"
				/>

				<SkillTimeline
					milestones={[
						{
							year: '2024',
							icon: Rocket,
							title: 'Senior Full Stack Developer',
							description:
								'Leading architecture decisions and mentoring team members',
							skills: ['System Design', 'Team Leadership', 'AI Integration'],
						},
						{
							year: '2022',
							icon: Briefcase,
							title: 'Full Stack Developer',
							description: 'Building end-to-end applications with modern stack',
							skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
						},
						{
							year: '2020',
							icon: Award,
							title: 'Frontend Developer',
							description: 'Specializing in React ecosystem and UI development',
							skills: ['React', 'Redux', 'CSS-in-JS', 'Testing'],
						},
						{
							year: '2018',
							icon: GraduationCap,
							title: 'Junior Developer',
							description: 'Starting my journey in web development',
							skills: ['JavaScript', 'HTML/CSS', 'Node.js', 'Git'],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface SectionHeaderProps {
	badge: string;
	title: string;
	subtitle: string;
}

const SectionHeader = ({ badge, title, subtitle }: SectionHeaderProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge className="mb-4">{badge}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{subtitle}
		</p>
	</div>
);

interface Milestone {
	year: string;
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	skills: string[];
}

const SkillTimeline = ({ milestones }: { milestones: Milestone[] }) => (
	<div className="max-w-3xl mx-auto relative">
		<div className="absolute left-6 @md:left-1/2 top-0 bottom-0 w-px bg-border @md:-translate-x-px" />

		<div className="space-y-8 @md:space-y-12">
			{milestones.map((milestone, i) => (
				<TimelineItem key={i} {...milestone} isEven={i % 2 === 0} />
			))}
		</div>
	</div>
);

interface TimelineItemProps extends Milestone {
	isEven: boolean;
}

const TimelineItem = ({
	year,
	icon: Icon,
	title,
	description,
	skills,
	isEven,
}: TimelineItemProps) => (
	<div
		className={`relative flex items-start gap-6 @md:gap-8 ${isEven ? '@md:flex-row' : '@md:flex-row-reverse'}`}
	>
		<div
			className={`hidden @md:block flex-1 ${isEven ? 'text-right' : 'text-left'}`}
		>
			<Badge variant="outline" className="text-lg font-bold">
				{year}
			</Badge>
		</div>

		<div className="relative z-10 flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground shrink-0">
			<Icon className="size-6" />
		</div>

		<div className="flex-1 pb-8">
			<Badge variant="outline" className="@md:hidden mb-2">
				{year}
			</Badge>
			<Card className="group hover:border-primary/50 transition-all">
				<CardContent className="p-5">
					<h3 className="font-bold text-lg mb-1">{title}</h3>
					<p className="text-sm text-muted-foreground mb-4">{description}</p>
					<div className="flex flex-wrap gap-2">
						{skills.map((skill, i) => (
							<Badge key={i} variant="secondary" className="text-xs">
								{skill}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
);
