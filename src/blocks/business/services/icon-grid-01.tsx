import { Badge } from '@/components/ui/badge';
import {
	BarChart,
	Blocks,
	BrainCircuit,
	Cloud,
	Code,
	Database,
	Globe,
	Lock,
	Smartphone,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Our Expertise" />
					<Title text="Complete Service Portfolio" />
					<Description text="A comprehensive range of technology services to address every aspect of your digital needs." />
				</div>

				<IconGrid
					items={[
						{ icon: Code, title: 'Web Development' },
						{ icon: Smartphone, title: 'Mobile Apps' },
						{ icon: Cloud, title: 'Cloud Services' },
						{ icon: Database, title: 'Data Management' },
						{ icon: BrainCircuit, title: 'AI & ML' },
						{ icon: Lock, title: 'Cybersecurity' },
						{ icon: Blocks, title: 'Integration' },
						{ icon: Globe, title: 'Digital Strategy' },
						{ icon: BarChart, title: 'Analytics' },
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

interface IconItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
}

const IconGrid = ({ items }: { items: IconItem[] }) => (
	<div className="grid grid-cols-3 @md:grid-cols-3 @xl:grid-cols-9 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title }, i) => (
			<div key={i} className="group text-center">
				<div className="size-16 @md:size-20 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
					<Icon className="size-7 @md:size-9" />
				</div>
				<h3 className="text-xs @md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
					{title}
				</h3>
			</div>
		))}
	</div>
);
