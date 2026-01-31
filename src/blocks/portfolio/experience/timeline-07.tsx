import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Rocket } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Rocket} text="Growth" />
					<Title text="Career Progression" />
					<Description text="Track my journey from entry-level to leadership positions." />
				</div>

				<ProgressTimeline
					items={[
						{
							year: '2016',
							title: 'Junior Developer',
							level: 'Entry',
							progress: 20,
							skills: ['HTML/CSS', 'JavaScript', 'Git'],
						},
						{
							year: '2018',
							title: 'Software Developer',
							level: 'Mid',
							progress: 40,
							skills: ['React', 'Node.js', 'SQL', 'Testing'],
						},
						{
							year: '2020',
							title: 'Senior Developer',
							level: 'Senior',
							progress: 60,
							skills: ['Architecture', 'TypeScript', 'AWS', 'Mentoring'],
						},
						{
							year: '2022',
							title: 'Tech Lead',
							level: 'Lead',
							progress: 80,
							skills: ['Team Leadership', 'System Design', 'Strategy'],
						},
						{
							year: '2024',
							title: 'Principal Engineer',
							level: 'Principal',
							progress: 100,
							skills: [
								'Technical Vision',
								'Cross-team Collaboration',
								'Innovation',
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

interface ProgressItem {
	year: string;
	title: string;
	level: string;
	progress: number;
	skills: string[];
}

const ProgressTimeline = ({ items }: { items: ProgressItem[] }) => (
	<div className="space-y-8">
		{items.map(({ year, title, level, progress, skills }, i) => (
			<div key={i} className="group">
				<div className="flex items-center gap-4 mb-3">
					<div className="size-12 @md:size-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
						<span className="text-sm @md:text-base font-bold text-primary">
							{year}
						</span>
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex flex-wrap items-center gap-2 mb-1">
							<h3 className="text-base @md:text-lg font-semibold">{title}</h3>
							<Badge variant="secondary" className="text-xs">
								{level}
							</Badge>
						</div>
						<Progress value={progress} className="h-2" />
					</div>
				</div>
				<div className="pl-16 @md:pl-[4.5rem]">
					<div className="flex flex-wrap gap-1.5">
						{skills.map((skill, j) => (
							<Badge key={j} variant="outline" className="text-xs">
								{skill}
							</Badge>
						))}
					</div>
				</div>
			</div>
		))}
	</div>
);
