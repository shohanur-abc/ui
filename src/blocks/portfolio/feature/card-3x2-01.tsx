import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Brain,
	Clock,
	MessageSquare,
	Settings,
	Target,
	Users,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
					<Eyebrow text="Working Together" />
					<Title text="What to Expect" />
					<Description text="A transparent and collaborative approach to ensure your project's success from start to finish." />
				</div>

				<FeatureGrid
					items={[
						{
							icon: MessageSquare,
							title: 'Clear Communication',
							description:
								'Regular updates and open dialogue throughout the project lifecycle.',
						},
						{
							icon: Clock,
							title: 'Timely Delivery',
							description:
								'Realistic timelines with consistent progress and on-time completion.',
						},
						{
							icon: Target,
							title: 'Focused Execution',
							description:
								'Dedicated attention to your project goals and requirements.',
						},
						{
							icon: Users,
							title: 'Collaborative Process',
							description:
								'Working together as partners to achieve the best outcomes.',
						},
						{
							icon: Brain,
							title: 'Strategic Thinking',
							description:
								'Thoughtful solutions that consider long-term implications.',
						},
						{
							icon: Settings,
							title: 'Ongoing Support',
							description:
								'Post-launch maintenance and continuous improvement.',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="secondary" className="mb-3 @md:mb-4">
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

interface FeatureItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
	<ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5 @xl:gap-6">
		{items.map(({ icon: Icon, title, description }, i) => (
			<li key={i}>
				<Card className="h-full group hover:border-primary/50 transition-colors py-0">
					<CardContent className="p-5 @md:p-6">
						<div className="flex items-start gap-4">
							<div className="size-10 @md:size-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
								<Icon className="size-5 @md:size-6" />
							</div>
							<div>
								<h3 className="text-base @md:text-lg font-semibold mb-1.5">
									{title}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{description}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</li>
		))}
	</ul>
);
