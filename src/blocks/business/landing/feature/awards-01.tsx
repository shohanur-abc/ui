import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Award,
	Clock,
	Globe,
	Rocket,
	Shield,
	Star,
	Trophy,
	Users,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

interface AwardItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	source: string;
	year: string;
}

interface StatItem {
	value: string;
	label: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Trophy} text="Awards & Recognition" />
					<Title text="Industry Leaders" highlight="Trust Us" />
					<Description text="We're proud to be recognized by leading industry analysts and publications." />
				</div>

				<AwardsRow
					items={[
						{
							icon: Trophy,
							title: 'Best SaaS Product',
							source: 'TechCrunch',
							year: '2025',
						},
						{
							icon: Star,
							title: 'Top Rated',
							source: 'G2 Crowd',
							year: '2025',
						},
						{
							icon: Award,
							title: "Editor's Choice",
							source: 'PCMag',
							year: '2025',
						},
						{
							icon: Shield,
							title: 'Most Secure',
							source: 'Security Weekly',
							year: '2024',
						},
					]}
				/>

				<Separator className="my-10 @md:my-12" />

				<StatsRow
					items={[
						{ value: '50K+', label: 'Happy Customers' },
						{ value: '99.99%', label: 'Uptime SLA' },
						{ value: '4.9/5', label: 'Customer Rating' },
						{ value: '24/7', label: 'Support Available' },
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

const AwardsRow = ({ items }: { items: AwardItem[] }) => (
	<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<Card
				key={item.title}
				className="text-center border-border/50 transition-all hover:border-primary/30"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="mb-3 mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
						<item.icon className="size-6 text-primary" />
					</div>
					<h3 className="text-sm font-semibold mb-1">{item.title}</h3>
					<p className="text-xs text-muted-foreground">
						{item.source} • {item.year}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const StatsRow = ({ items }: { items: StatItem[] }) => (
	<div className="grid grid-cols-2 @lg:grid-cols-4 gap-6 @md:gap-8 text-center">
		{items.map((item) => (
			<div key={item.label}>
				<p className="text-3xl @md:text-4xl font-bold text-primary mb-1">
					{item.value}
				</p>
				<p className="text-sm text-muted-foreground">{item.label}</p>
			</div>
		))}
	</div>
);
