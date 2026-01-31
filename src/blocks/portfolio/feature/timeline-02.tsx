import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, GraduationCap, Rocket, Star } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Journey" />
					<Title text="My Professional Timeline" />
					<Description text="Key milestones and achievements throughout my career as a developer." />
				</div>

				<VerticalTimeline
					items={[
						{
							icon: GraduationCap,
							year: '2018',
							title: 'Started My Journey',
							description:
								'Began learning web development and built my first projects.',
							tags: ['HTML', 'CSS', 'JavaScript'],
						},
						{
							icon: Briefcase,
							year: '2019',
							title: 'First Developer Role',
							description: 'Joined a startup as a junior frontend developer.',
							tags: ['React', 'TypeScript', 'Node.js'],
						},
						{
							icon: Rocket,
							year: '2021',
							title: 'Senior Developer',
							description:
								'Promoted to senior role, leading technical decisions.',
							tags: ['Architecture', 'Team Lead', 'Mentoring'],
						},
						{
							icon: Star,
							year: '2023',
							title: 'Independent Consultant',
							description: 'Started freelancing, working with global clients.',
							tags: ['Consulting', 'Full-Stack', 'Cloud'],
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface TimelineItem {
	icon: ComponentType<{ className?: string }>;
	year: string;
	title: string;
	description: string;
	tags: string[];
}

const VerticalTimeline = ({ items }: { items: TimelineItem[] }) => (
	<div className="max-w-3xl mx-auto">
		{items.map(({ icon: Icon, year, title, description, tags }, i) => (
			<div
				key={i}
				className="relative pl-12 @md:pl-16 pb-12 @md:pb-16 last:pb-0"
			>
				{i < items.length - 1 && (
					<div className="absolute left-[18px] @md:left-[22px] top-12 bottom-0 w-px bg-border" />
				)}

				<div className="absolute left-0 size-9 @md:size-11 rounded-full bg-primary/10 border-2 border-background shadow flex items-center justify-center">
					<Icon className="size-4 @md:size-5 text-primary" />
				</div>

				<div className="text-sm font-medium text-primary mb-2">{year}</div>
				<h3 className="text-lg @md:text-xl font-bold mb-2">{title}</h3>
				<p className="text-sm @md:text-base text-muted-foreground mb-4">
					{description}
				</p>

				<div className="flex flex-wrap gap-2">
					{tags.map((tag, j) => (
						<span
							key={j}
							className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		))}
	</div>
);
