import { Badge } from '@/components/ui/badge';
import { Compass, Layers, Cpu, Zap, Shield, BarChart3 } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Journey" />
					<Title text="Building Your Solution" />
					<Description text="A collaborative process that transforms your vision into reality." />
				</div>

				<TimelineMinimal
					items={[
						{
							icon: Compass,
							title: 'Navigate',
							description: 'Chart the course with clear goals and strategy',
						},
						{
							icon: Layers,
							title: 'Architect',
							description: 'Design scalable systems and intuitive interfaces',
						},
						{
							icon: Cpu,
							title: 'Engineer',
							description: 'Build with precision using modern technologies',
						},
						{
							icon: Zap,
							title: 'Optimize',
							description: 'Fine-tune for maximum performance and efficiency',
						},
						{
							icon: Shield,
							title: 'Secure',
							description: 'Implement robust security at every layer',
						},
						{
							icon: BarChart3,
							title: 'Measure',
							description: 'Track success with data-driven insights',
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

interface TimelineItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const TimelineMinimal = ({ items }: { items: TimelineItem[] }) => (
	<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-8 @xl:gap-12">
		{items.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="relative">
				{/* Step number */}
				<div className="absolute -left-2 -top-2 size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
					{i + 1}
				</div>

				{/* Icon */}
				<div className="size-14 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
					<Icon className="size-6 text-primary" />
				</div>

				{/* Content */}
				<h3 className="text-lg font-bold mb-2">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>

				{/* Connector line (visible on larger screens) */}
				{i < items.length - 1 && (i + 1) % 3 !== 0 && (
					<div className="absolute top-7 left-full w-8 h-0.5 bg-border hidden @lg:block" />
				)}
			</div>
		))}
	</div>
);
