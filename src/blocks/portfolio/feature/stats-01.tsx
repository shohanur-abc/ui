import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Clock,
	Coffee,
	FileCode,
	GitCommit,
	Laptop,
	Terminal,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Weekly Stats" />
					<Title text="This Week in Code" />
					<Description text="A snapshot of my development activity this week." />
				</div>

				<WeeklyStats
					items={[
						{
							icon: Clock,
							label: 'Hours Coded',
							value: '42h',
							sublabel: 'This week',
						},
						{
							icon: GitCommit,
							label: 'Commits',
							value: '87',
							sublabel: '+12% from last week',
						},
						{
							icon: FileCode,
							label: 'Files Changed',
							value: '234',
							sublabel: 'Across 5 projects',
						},
						{
							icon: Terminal,
							label: 'Lines Written',
							value: '8.4k',
							sublabel: 'Net additions',
						},
						{
							icon: Coffee,
							label: 'Cups of Coffee',
							value: '23',
							sublabel: 'Fueling progress',
						},
						{
							icon: Laptop,
							label: 'Active Projects',
							value: '4',
							sublabel: 'In development',
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

interface StatItem {
	icon: ComponentType<{ className?: string }>;
	label: string;
	value: string;
	sublabel: string;
}

const WeeklyStats = ({ items }: { items: StatItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, label, value, sublabel }, i) => (
			<Card
				key={i}
				className="py-0 group hover:shadow-lg transition-all hover:border-primary/30"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
							<Icon className="size-5 @md:size-6" />
						</div>
						<span className="text-xs @md:text-sm text-muted-foreground">
							{label}
						</span>
					</div>
					<div className="text-3xl @md:text-4xl font-bold mb-1">{value}</div>
					<div className="text-xs @md:text-sm text-muted-foreground">
						{sublabel}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
