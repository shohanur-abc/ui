import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Layers, Rocket, Users, Clock, Target, TrendingUp } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-xl mb-12 @md:mb-16">
					<Eyebrow icon={Target} text="Impact" />
					<Title text="Career Highlights" />
					<Description text="Key achievements and milestones from my career." />
				</div>

				<div className="grid @md:grid-cols-6 gap-4 auto-rows-[minmax(150px,auto)]">
					<HighlightCard
						icon={Layers}
						metric="500+"
						label="Components Built"
						description="Design system used org-wide"
						className="@md:col-span-3"
					/>
					<HighlightCard
						icon={Rocket}
						metric="40%"
						label="Performance Boost"
						description="Core Web Vitals improvement"
						className="@md:col-span-3"
					/>
					<HighlightCard
						icon={Users}
						metric="25+"
						label="Engineers Mentored"
						description="From junior to senior"
						className="@md:col-span-2"
					/>
					<HighlightCard
						icon={Clock}
						metric="60%"
						label="Time Saved"
						description="Through automation"
						className="@md:col-span-2"
					/>
					<HighlightCard
						icon={TrendingUp}
						metric="$2M+"
						label="Revenue Impact"
						description="Direct contribution"
						className="@md:col-span-2"
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

interface HighlightCardProps {
	icon: ComponentType<{ className?: string }>;
	metric: string;
	label: string;
	description: string;
	className?: string;
}

const HighlightCard = ({
	icon: Icon,
	metric,
	label,
	description,
	className = '',
}: HighlightCardProps) => (
	<Card className={`group hover:shadow-lg transition-all ${className}`}>
		<CardContent className="p-6 h-full flex flex-col justify-center">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-4xl @md:text-5xl font-bold mb-1">{metric}</p>
					<p className="text-sm font-medium text-primary mb-1">{label}</p>
					<p className="text-xs text-muted-foreground">{description}</p>
				</div>
				<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
					<Icon className="size-6 text-primary" />
				</div>
			</div>
		</CardContent>
	</Card>
);
