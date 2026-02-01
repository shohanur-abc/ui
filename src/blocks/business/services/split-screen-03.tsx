import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Palette, Code2, Rocket } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div>
						<Eyebrow text="Our Process" />
						<Title text="End-to-End Product Development" />
						<Description text="From concept to launch, we guide you through every stage of product development with our proven methodology." />

						<Button className="mt-8" asChild>
							<Link href="/contact">
								Start Your Journey
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>

					<ProcessCards
						items={[
							{
								icon: Palette,
								step: 1,
								title: 'Design & Prototype',
								description:
									'Transform ideas into interactive prototypes with user-centered design.',
							},
							{
								icon: Code2,
								step: 2,
								title: 'Build & Test',
								description:
									'Develop with modern tech and rigorous testing at every step.',
							},
							{
								icon: Rocket,
								step: 3,
								title: 'Launch & Scale',
								description:
									'Deploy to production and scale as your user base grows.',
							},
						]}
					/>
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

interface ProcessItem {
	icon: React.ComponentType<{ className?: string }>;
	step: number;
	title: string;
	description: string;
}

const ProcessCards = ({ items }: { items: ProcessItem[] }) => (
	<div className="space-y-4">
		{items.map(({ icon: Icon, step, title, description }, i) => (
			<Card
				key={i}
				className="py-0 group hover:border-primary/50 transition-colors"
			>
				<CardContent className="p-5 @md:p-6 flex gap-4">
					<div className="relative">
						<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
							<Icon className="size-6" />
						</div>
						<span className="absolute -top-2 -right-2 size-6 rounded-full bg-background border text-xs font-bold flex items-center justify-center">
							{step}
						</span>
					</div>
					<div className="flex-1">
						<h3 className="font-semibold text-base @md:text-lg mb-1">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
