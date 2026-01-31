import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Clock, Heart, Shield, Star, Zap } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Why Me" />
					<Title text="Client Benefits" />
					<Description text="What you get when working with me." />
				</div>

				<HighlightGrid
					items={[
						{
							icon: Zap,
							title: 'Fast Turnaround',
							description: 'Quick delivery without compromising quality.',
							highlight: true,
						},
						{
							icon: Shield,
							title: 'Reliable',
							description: 'Consistent communication and updates.',
						},
						{
							icon: Heart,
							title: 'Passionate',
							description: 'Genuine care for your success.',
						},
						{
							icon: Award,
							title: 'Quality',
							description: 'Production-ready code every time.',
						},
						{
							icon: Clock,
							title: 'On-Time',
							description: 'Meeting deadlines is non-negotiable.',
						},
						{
							icon: Star,
							title: 'Experienced',
							description: '8+ years in the industry.',
							highlight: true,
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

interface GridItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	highlight?: boolean;
}

const HighlightGrid = ({ items }: { items: GridItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, highlight }, i) => (
			<Card
				key={i}
				className={`py-0 group transition-all ${
					highlight
						? 'bg-primary text-primary-foreground hover:shadow-xl'
						: 'hover:shadow-lg hover:border-primary/30'
				}`}
			>
				<CardContent className="p-5 @md:p-6 flex gap-4 items-start">
					<div
						className={`size-11 @md:size-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
							highlight
								? 'bg-primary-foreground/20'
								: 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground'
						}`}
					>
						<Icon className="size-5 @md:size-6" />
					</div>
					<div>
						<h3 className="font-semibold text-base @md:text-lg mb-1">
							{title}
						</h3>
						<p
							className={`text-sm ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
						>
							{description}
						</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
