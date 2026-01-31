import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Skill Evolution"
					title="Growth Timeline"
					description="Tracking my technical growth over the years"
				/>

				<GrowthTimeline
					items={[
						{
							year: '2024',
							skill: 'AI/ML Integration',
							level: 75,
							status: 'Learning',
						},
						{
							year: '2023',
							skill: 'System Architecture',
							level: 88,
							status: 'Advanced',
						},
						{
							year: '2022',
							skill: 'Cloud & DevOps',
							level: 85,
							status: 'Advanced',
						},
						{
							year: '2021',
							skill: 'Backend Development',
							level: 90,
							status: 'Expert',
						},
						{
							year: '2020',
							skill: 'React & Next.js',
							level: 95,
							status: 'Expert',
						},
						{ year: '2019', skill: 'TypeScript', level: 95, status: 'Expert' },
					]}
				/>
			</div>
		</section>
	);
}

interface TitleBlockProps {
	eyebrow: string;
	title: string;
	description: string;
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface TimelineItem {
	year: string;
	skill: string;
	level: number;
	status: string;
}

const GrowthTimeline = ({ items }: { items: TimelineItem[] }) => (
	<div className="max-w-2xl mx-auto relative">
		<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20 rounded-full" />

		<div className="space-y-6">
			{items.map((item, i) => (
				<TimelineCard key={i} {...item} />
			))}
		</div>
	</div>
);

const TimelineCard = ({ year, skill, level, status }: TimelineItem) => {
	const statusColor =
		{
			Expert: 'text-green-500',
			Advanced: 'text-blue-500',
			Learning: 'text-yellow-500',
		}[status] || 'text-muted-foreground';

	return (
		<div className="relative pl-8">
			<div className="absolute left-0 top-4 size-3 rounded-full bg-primary -translate-x-1" />
			<Card className="group hover:border-primary/50 transition-all">
				<CardContent className="p-5">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-3">
							<Badge variant="secondary">{year}</Badge>
							<h4 className="font-semibold">{skill}</h4>
						</div>
						<span className={`text-sm font-medium ${statusColor}`}>
							{status}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<Progress value={level} className="h-2 flex-1" />
						<span className="text-sm font-bold">{level}%</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
