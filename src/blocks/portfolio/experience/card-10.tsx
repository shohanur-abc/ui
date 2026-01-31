import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingUp, Users, Clock } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Target} text="Impact" />
					<Title text="Career Impact" />
					<Description text="Measurable results and achievements throughout my career." />
				</div>

				<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
					<ImpactCard
						icon={TrendingUp}
						metric="60%"
						label="Performance Improvement"
						description="Average improvement in page load times across projects"
					/>
					<ImpactCard
						icon={Users}
						metric="25+"
						label="Engineers Mentored"
						description="Junior to senior level developers guided in their careers"
					/>
					<ImpactCard
						icon={Target}
						metric="50+"
						label="Projects Shipped"
						description="Products and features delivered to production"
					/>
					<ImpactCard
						icon={Clock}
						metric="40%"
						label="Efficiency Gains"
						description="Developer time saved through tooling improvements"
					/>
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 mt-6">
					<AchievementCard
						title="Design System Adoption"
						metric="500+"
						unit="Engineers"
						description="Built a design system now used across the entire organization."
						growth="+150% YoY"
					/>
					<AchievementCard
						title="Revenue Impact"
						metric="$2M+"
						unit="Annual"
						description="Features directly contributing to revenue growth."
						growth="+35% Conversion"
					/>
					<AchievementCard
						title="User Reach"
						metric="1B+"
						unit="Users"
						description="Products shipped that reach billions of users globally."
						growth="Global Scale"
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

interface ImpactCardProps {
	icon: ComponentType<{ className?: string }>;
	metric: string;
	label: string;
	description: string;
}

const ImpactCard = ({
	icon: Icon,
	metric,
	label,
	description,
}: ImpactCardProps) => (
	<Card className="text-center hover:shadow-lg transition-shadow">
		<CardContent className="p-6">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
				<Icon className="size-6 text-primary" />
			</div>
			<p className="text-3xl @md:text-4xl font-bold mb-1">{metric}</p>
			<p className="text-sm font-medium mb-2">{label}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

interface AchievementCardProps {
	title: string;
	metric: string;
	unit: string;
	description: string;
	growth: string;
}

const AchievementCard = ({
	title,
	metric,
	unit,
	description,
	growth,
}: AchievementCardProps) => (
	<Card className="hover:shadow-lg transition-shadow">
		<CardContent className="p-6">
			<div className="flex items-start justify-between mb-4">
				<h3 className="font-semibold">{title}</h3>
				<Badge variant="secondary" className="text-xs">
					{growth}
				</Badge>
			</div>
			<div className="flex items-baseline gap-1 mb-2">
				<span className="text-4xl font-bold">{metric}</span>
				<span className="text-sm text-muted-foreground">{unit}</span>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);
