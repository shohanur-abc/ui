import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Building2,
	HeartHandshake,
	Megaphone,
	PenTool,
	Target,
	TrendingUp,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Professional Services" />
					<Title text="Expertise You Can Trust" />
					<Description text="A full spectrum of professional services to support every stage of your business journey." />
				</div>

				<ServiceGrid
					items={[
						{
							icon: Target,
							title: 'Strategic Planning',
							description:
								'Define clear objectives and create actionable roadmaps for success.',
							metric: '500+',
							metricLabel: 'Strategies Delivered',
						},
						{
							icon: PenTool,
							title: 'Brand Design',
							description:
								'Craft compelling brand identities that resonate with your audience.',
							metric: '200+',
							metricLabel: 'Brands Created',
						},
						{
							icon: Megaphone,
							title: 'Marketing Solutions',
							description:
								'Data-driven campaigns that amplify your reach and drive conversions.',
							metric: '10M+',
							metricLabel: 'Leads Generated',
						},
						{
							icon: Building2,
							title: 'Enterprise Consulting',
							description:
								'Navigate complex challenges with expert guidance and proven methodologies.',
							metric: '150+',
							metricLabel: 'Enterprise Clients',
						},
						{
							icon: TrendingUp,
							title: 'Performance Optimization',
							description:
								'Maximize efficiency and output across all business functions.',
							metric: '40%',
							metricLabel: 'Avg. Improvement',
						},
						{
							icon: HeartHandshake,
							title: 'Customer Success',
							description:
								'Ensure customer satisfaction with dedicated support and engagement strategies.',
							metric: '98%',
							metricLabel: 'Satisfaction Rate',
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

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	metric: string;
	metricLabel: string;
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description, metric, metricLabel }, i) => (
			<Card
				key={i}
				className="group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
			>
				<CardContent className="p-6 @md:p-8">
					<div className="flex items-start justify-between mb-5">
						<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-6 @md:size-7" />
						</div>
						<div className="text-right">
							<div className="text-xl @md:text-2xl font-bold text-primary">
								{metric}
							</div>
							<div className="text-xs text-muted-foreground">{metricLabel}</div>
						</div>
					</div>
					<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
						{description}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);
