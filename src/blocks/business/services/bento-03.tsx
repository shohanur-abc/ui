import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import {
	BarChart3,
	BrainCircuit,
	Cloud,
	Code2,
	Database,
	Shield,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Services" />
					<Title text="Innovative Solutions" />
					<Description text="Discover how our comprehensive services can transform your business operations." />
				</div>

				<BentoGrid
					items={[
						{
							icon: Code2,
							title: 'Custom Development',
							description:
								'Full-stack development with modern frameworks and best practices for optimal performance.',
							image: 'https://picsum.photos/seed/dev/600/400',
							size: 'featured',
						},
						{
							icon: Cloud,
							title: 'Cloud Migration',
							description: 'Seamless transition to cloud infrastructure.',
							size: 'normal',
						},
						{
							icon: Database,
							title: 'Data Analytics',
							description: 'Turn raw data into actionable insights.',
							size: 'normal',
						},
						{
							icon: Shield,
							title: 'Cybersecurity',
							description: 'Enterprise-grade security solutions.',
							size: 'normal',
						},
						{
							icon: BrainCircuit,
							title: 'AI Integration',
							description: 'Intelligent automation for your workflows.',
							size: 'normal',
						},
						{
							icon: BarChart3,
							title: 'Business Intelligence',
							description:
								'Comprehensive BI solutions with real-time dashboards and predictive analytics.',
							image: 'https://picsum.photos/seed/bi/600/400',
							size: 'featured',
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

interface BentoItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	image?: string;
	size: 'normal' | 'featured';
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, description, image, size }, i) =>
			size === 'featured' ? (
				<Card
					key={i}
					className="group py-0 overflow-hidden @xl:col-span-2 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
				>
					<div className="grid @lg:grid-cols-2">
						<div className="relative aspect-video @lg:aspect-auto @lg:min-h-[200px]">
							<Image
								src={image || ''}
								alt={title}
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
						</div>
						<CardContent className="p-6 @md:p-8 flex flex-col justify-center">
							<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
								<Icon className="size-5 @md:size-6" />
							</div>
							<h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
							<p className="text-sm @md:text-base text-muted-foreground leading-relaxed">
								{description}
							</p>
						</CardContent>
					</div>
				</Card>
			) : (
				<Card
					key={i}
					className="group py-0 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
				>
					<CardContent className="p-6 @md:p-7">
						<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-5 @md:size-6" />
						</div>
						<h3 className="text-lg font-semibold mb-2">{title}</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{description}
						</p>
					</CardContent>
				</Card>
			),
		)}
	</div>
);
