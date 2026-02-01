import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div className="relative aspect-square rounded-2xl overflow-hidden">
						<Image
							src="https://picsum.photos/seed/timeline3/800/800"
							alt="Our process"
							fill
							className="object-cover"
						/>
					</div>

					<div>
						<Eyebrow text="Methodology" />
						<Title text="Proven Approach" />
						<Description text="Our battle-tested process has delivered results for 500+ clients." />

						<TimelineSidebar
							items={[
								{
									number: '01',
									title: 'Understand',
									description:
										'Deep dive into your business context and user needs',
								},
								{
									number: '02',
									title: 'Design',
									description:
										'Create solutions that balance beauty and functionality',
								},
								{
									number: '03',
									title: 'Build',
									description:
										'Develop with modern tech and engineering best practices',
								},
								{
									number: '04',
									title: 'Test',
									description:
										'Rigorous testing ensures quality and reliability',
								},
								{
									number: '05',
									title: 'Deploy',
									description: 'Smooth launch with zero-downtime deployment',
								},
								{
									number: '06',
									title: 'Evolve',
									description: 'Continuous improvement based on real user data',
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
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-8">
		{text}
	</p>
);

interface TimelineItem {
	number: string;
	title: string;
	description: string;
}

const TimelineSidebar = ({ items }: { items: TimelineItem[] }) => (
	<div className="relative">
		{/* Vertical line */}
		<div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border" />

		<div className="space-y-4">
			{items.map(({ number, title, description }, i) => (
				<div key={i} className="relative pl-14 group">
					{/* Number indicator */}
					<div className="absolute left-0 top-0 size-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors z-10">
						<span className="text-sm font-bold">{number}</span>
					</div>

					<Card className="py-0">
						<CardContent className="p-4">
							<h3 className="font-semibold mb-1">{title}</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</CardContent>
					</Card>
				</div>
			))}
		</div>
	</div>
);
