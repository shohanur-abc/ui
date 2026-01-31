import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Award,
	Trophy,
	Medal,
	Star,
	Target,
	Rocket,
	Sparkles,
	Crown,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Award} text="Recognition" />
					<Title text="Awards & Achievements" />
					<Description text="Recognition received throughout my career." />
				</div>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
					<AwardCard
						icon={Trophy}
						title="Engineer of the Year"
						org="TechCorp"
						year="2024"
						description="Technical leadership and organizational impact"
						featured
					/>
					<AwardCard
						icon={Medal}
						title="Innovation Award"
						org="Meta"
						year="2021"
						description="Patent filed for caching algorithm"
					/>
					<AwardCard
						icon={Star}
						title="Top Contributor"
						org="React Community"
						year="2023"
						description="Open source contributions"
					/>
					<AwardCard
						icon={Target}
						title="Impact Award"
						org="StartupX"
						year="2022"
						description="Design system adoption"
					/>
					<AwardCard
						icon={Rocket}
						title="Speed Award"
						org="Stripe"
						year="2019"
						description="Fastest feature delivery"
					/>
					<AwardCard
						icon={Sparkles}
						title="Mentor Award"
						org="TechCorp"
						year="2023"
						description="Outstanding mentorship"
					/>
					<AwardCard
						icon={Crown}
						title="Excellence Award"
						org="Meta"
						year="2020"
						description="Technical excellence"
					/>
					<AwardCard
						icon={Award}
						title="Patents Filed"
						org="USPTO"
						year="2022"
						description="2 patents approved"
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
	featured?: boolean;
}

const AwardCard = ({
	icon: Icon,
	title,
	org,
	year,
	description,
	featured,
}: AwardCardProps) => (
	<Card
		className={`group hover:shadow-lg transition-all ${featured ? 'ring-2 ring-primary' : ''}`}
	>
		<CardContent className="p-5 text-center">
			<div
				className={`size-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${featured ? 'bg-primary text-primary-foreground' : 'bg-primary/10 group-hover:bg-primary/20'}`}
			>
				<Icon className={`size-7 ${featured ? '' : 'text-primary'}`} />
			</div>
			<Badge variant="secondary" className="mb-2">
				{year}
			</Badge>
			<h3 className="font-bold mb-1">{title}</h3>
			<p className="text-sm text-primary mb-2">{org}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);
