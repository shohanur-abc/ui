import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Trophy, Medal, Star, Target, Rocket } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Award} text="Recognition" />
					<Title text="Awards & Achievements" />
					<Description text="Milestones and recognition throughout my career." />
				</div>

				<div className="columns-1 @sm:columns-2 @lg:columns-3 gap-4 space-y-4">
					<AwardCard
						icon={Trophy}
						title="Engineer of the Year"
						org="TechCorp"
						year="2024"
						description="Recognized for technical leadership and organizational impact."
						highlight
					/>
					<MilestoneCard
						year="2023"
						title="Design System v3"
						metric="500+ components"
					/>
					<AwardCard
						icon={Medal}
						title="Innovation Award"
						org="Meta"
						year="2021"
						description="Patent filed for caching algorithm."
					/>
					<StatCard value="40%" label="Performance Boost" />
					<MilestoneCard
						year="2022"
						title="Patent Filed"
						metric="$2M+ revenue impact"
					/>
					<AwardCard
						icon={Star}
						title="Top Contributor"
						org="React Community"
						year="2023"
						description="Open source contributions recognized."
					/>
					<StatCard value="200+" label="Engineers Impacted" />
					<MilestoneCard
						year="2021"
						title="First Team Lead"
						metric="8 engineers managed"
					/>
					<AwardCard
						icon={Rocket}
						title="Startup Award"
						org="StartupX"
						year="2022"
						description="Fastest shipped feature of the year."
					/>
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

interface AwardCardProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	org: string;
	year: string;
	description: string;
	highlight?: boolean;
}

const AwardCard = ({
	icon: Icon,
	title,
	org,
	year,
	description,
	highlight,
}: AwardCardProps) => (
	<Card
		className={`break-inside-avoid ${highlight ? 'ring-2 ring-primary' : ''}`}
	>
		<CardContent className="p-5">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
				<Icon className="size-6 text-primary" />
			</div>
			<Badge variant="secondary" className="mb-2">
				{year}
			</Badge>
			<h4 className="font-bold">{title}</h4>
			<p className="text-sm text-primary mb-2">{org}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

interface MilestoneCardProps {
	year: string;
	title: string;
	metric: string;
}

const MilestoneCard = ({ year, title, metric }: MilestoneCardProps) => (
	<Card className="break-inside-avoid bg-muted/50">
		<CardContent className="p-5">
			<Badge variant="outline" className="mb-2">
				{year}
			</Badge>
			<h4 className="font-bold mb-1">{title}</h4>
			<p className="text-sm text-primary">{metric}</p>
		</CardContent>
	</Card>
);

interface StatCardProps {
	value: string;
	label: string;
}

const StatCard = ({ value, label }: StatCardProps) => (
	<Card className="break-inside-avoid bg-primary text-primary-foreground">
		<CardContent className="p-5 text-center">
			<p className="text-3xl font-bold">{value}</p>
			<p className="text-sm opacity-80">{label}</p>
		</CardContent>
	</Card>
);
