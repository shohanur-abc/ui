import { Badge } from '@/components/ui/badge';
import {
	Activity,
	FileSearch,
	PieChart,
	Settings,
	TrendingUp,
	Wallet,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Analytics" />
					<Title text="Data-Driven Decisions" />
					<Description text="Comprehensive analytics and insights to power your business growth." />
				</div>

				<CompactGrid
					items={[
						{
							icon: TrendingUp,
							title: 'Growth Metrics',
							value: '+127%',
							description: 'Year over year growth',
						},
						{
							icon: Activity,
							title: 'Performance',
							value: '99.9%',
							description: 'System uptime',
						},
						{
							icon: Wallet,
							title: 'ROI',
							value: '3.2x',
							description: 'Return on investment',
						},
						{
							icon: PieChart,
							title: 'Conversion',
							value: '24%',
							description: 'Visitor to customer',
						},
						{
							icon: FileSearch,
							title: 'SEO Score',
							value: '95',
							description: 'Search optimization',
						},
						{
							icon: Settings,
							title: 'Automation',
							value: '80%',
							description: 'Tasks automated',
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

interface CompactItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	value: string;
	description: string;
}

const CompactGrid = ({ items }: { items: CompactItem[] }) => (
	<div className="grid @xs:grid-cols-2 @lg:grid-cols-3 gap-6 @md:gap-8">
		{items.map(({ icon: Icon, title, value, description }, i) => (
			<div
				key={i}
				className="group flex gap-4 items-start p-4 @md:p-5 rounded-xl hover:bg-muted/50 transition-colors"
			>
				<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
					<Icon className="size-6 @md:size-7" />
				</div>
				<div>
					<div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
						{title}
					</div>
					<div className="text-2xl @md:text-3xl font-bold mb-0.5">{value}</div>
					<div className="text-sm text-muted-foreground">{description}</div>
				</div>
			</div>
		))}
	</div>
);
