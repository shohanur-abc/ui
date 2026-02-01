import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Globe, Palette, Settings } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Core Services" />
					<Title text="Four Pillars of Success" />
					<Description text="Our foundational services that drive transformation across industries." />
				</div>

				<ServiceGrid
					items={[
						{
							icon: Briefcase,
							title: 'Business Consulting',
							description:
								'Strategic advisory services to optimize operations and accelerate growth through proven methodologies.',
							features: [
								'Market Analysis',
								'Growth Strategy',
								'Operational Excellence',
							],
						},
						{
							icon: Palette,
							title: 'Creative Design',
							description:
								'Human-centered design solutions that connect brands with audiences through compelling experiences.',
							features: [
								'Brand Identity',
								'UX/UI Design',
								'Visual Storytelling',
							],
						},
						{
							icon: Settings,
							title: 'Technology Solutions',
							description:
								'Cutting-edge technology implementations that modernize infrastructure and enable innovation.',
							features: [
								'Digital Transformation',
								'Cloud Migration',
								'Custom Development',
							],
						},
						{
							icon: Globe,
							title: 'Global Expansion',
							description:
								'End-to-end support for entering new markets and scaling operations internationally.',
							features: ['Market Entry', 'Localization', 'Compliance'],
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
	features: string[];
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description, features }, i) => (
			<Card
				key={i}
				className="group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
			>
				<CardContent className="p-6 @md:p-8">
					<div className="flex items-start gap-4 @md:gap-5 mb-4">
						<div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-7 @md:size-8" />
						</div>
						<div>
							<h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
							<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
								{description}
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-2 mt-4">
						{features.map((feature, j) => (
							<Badge key={j} variant="secondary" className="text-xs">
								{feature}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
