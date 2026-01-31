import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Code2, Rocket, Users } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-3 gap-8 @xl:gap-12">
					<div>
						<Eyebrow text="Career Highlights" />
						<Title text="A Decade of Growth" />
						<Description text="From curious beginner to seasoned professional, here's my journey through the tech landscape." />
					</div>

					<div className="@xl:col-span-2">
						<HorizontalTimeline
							items={[
								{
									icon: Code2,
									year: '2015',
									title: 'First Line of Code',
									description: 'Started learning programming basics.',
								},
								{
									icon: Users,
									year: '2018',
									title: 'Team Collaboration',
									description: 'Joined my first development team.',
								},
								{
									icon: Award,
									year: '2021',
									title: 'Technical Lead',
									description: 'Promoted to lead a team of 5 developers.',
								},
								{
									icon: Rocket,
									year: '2024',
									title: 'Founding Member',
									description: 'Co-founded a tech startup.',
								},
							]}
						/>
					</div>
				</div>
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
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
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
}

const HorizontalTimeline = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative">
		<div className="absolute top-6 left-0 right-0 h-px bg-border hidden @lg:block" />

		<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
			{items.map(({ icon: Icon, year, title, description }, i) => (
				<Card
					key={i}
					className="py-0 relative group hover:shadow-lg transition-all"
				>
					<div className="absolute -top-3 left-6 size-6 rounded-full bg-primary border-4 border-background hidden @lg:flex items-center justify-center">
						<div className="size-2 rounded-full bg-primary-foreground" />
					</div>

					<CardContent className="p-5 @md:p-6 @lg:pt-8">
						<div className="size-10 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
							<Icon className="size-5 @md:size-6" />
						</div>
						<div className="text-sm font-bold text-primary mb-1">{year}</div>
						<h3 className="font-semibold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);
