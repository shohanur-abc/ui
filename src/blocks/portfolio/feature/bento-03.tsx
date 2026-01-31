import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	BarChart3,
	Boxes,
	Fingerprint,
	Gauge,
	LineChart,
	Settings2,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Capabilities" />
					<Title text="End-to-End Solutions" />
					<Description text="From concept to deployment, every aspect is crafted with precision and care." />
				</div>

				<BentoLayout
					featured={{
						icon: BarChart3,
						title: 'Analytics Dashboard',
						description:
							'Real-time insights and comprehensive reporting to track performance metrics and make data-driven decisions.',
						stats: [
							{ label: 'Data Points', value: '1M+' },
							{ label: 'Uptime', value: '99.9%' },
						],
					}}
					items={[
						{
							icon: Gauge,
							title: 'Performance',
							description: 'Optimized for speed.',
						},
						{
							icon: Fingerprint,
							title: 'Privacy',
							description: 'GDPR compliant by default.',
						},
						{
							icon: Boxes,
							title: 'Modular',
							description: 'Composable architecture.',
						},
						{
							icon: LineChart,
							title: 'Metrics',
							description: 'Track key indicators.',
						},
						{
							icon: Settings2,
							title: 'Configurable',
							description: 'Flexible customization.',
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

interface FeaturedItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	stats: { label: string; value: string }[];
}

interface BentoItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const BentoLayout = ({
	featured,
	items,
}: {
	featured: FeaturedItem;
	items: BentoItem[];
}) => {
	const FeaturedIcon = featured.icon;
	return (
		<div className="grid @xl:grid-cols-3 gap-4 @md:gap-6">
			<Card className="@xl:col-span-2 @xl:row-span-2 py-0 group hover:shadow-xl transition-all">
				<CardContent className="p-6 @md:p-8 @xl:p-10 h-full flex flex-col">
					<div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
						<FeaturedIcon className="size-7 @md:size-8" />
					</div>
					<h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3 @md:mb-4">
						{featured.title}
					</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-6 flex-1">
						{featured.description}
					</p>
					<div className="flex gap-8">
						{featured.stats.map(({ label, value }, i) => (
							<div key={i}>
								<div className="text-2xl @md:text-3xl font-bold text-primary">
									{value}
								</div>
								<div className="text-sm text-muted-foreground">{label}</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{items.map(({ icon: Icon, title, description }, i) => (
				<Card
					key={i}
					className="py-0 group hover:shadow-lg transition-all hover:-translate-y-0.5"
				>
					<CardContent className="p-5 @md:p-6">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
							<Icon className="size-5" />
						</div>
						<h3 className="font-semibold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
