import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Filter, Hash } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<Eyebrow icon={Compass} text="Explore by Topic" />
					<Title text="Navigate Your" highlight="Interests" />
					<Description text="Curated collections across 50+ topics. From system design to soft skills, find content that matches your current learning goals." />
					<TopicGrid
						categories={[
							{ name: 'Frontend', count: 342, trending: true },
							{ name: 'Backend', count: 287, trending: false },
							{ name: 'DevOps', count: 156, trending: true },
							{ name: 'AI/ML', count: 203, trending: true },
							{ name: 'Security', count: 98, trending: false },
							{ name: 'Career', count: 124, trending: false },
							{ name: 'Architecture', count: 87, trending: true },
							{ name: 'Testing', count: 112, trending: false },
						]}
					/>
					<CTA
						items={[
							{
								label: 'Explore All Topics',
								href: '/topics',
								icon: ArrowRight,
							},
							{
								label: 'Custom Filters',
								href: '/filters',
								icon: Filter,
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4 @md:mb-6">
		<Badge variant="secondary" className="gap-2 px-4 py-1.5">
			<Icon className="size-4" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
		{text} <span className="text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
		{text}
	</p>
);

interface Category {
	name: string;
	count: number;
	trending: boolean;
}

const TopicGrid = ({ categories }: { categories: Category[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-4 gap-3 @md:gap-4 mb-10 @md:mb-12">
		{categories.map(({ name, count, trending }) => (
			<Link
				key={name}
				href={`/topics/${name.toLowerCase()}`}
				className="group relative p-4 @md:p-5 rounded-xl bg-card border transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/5"
			>
				{trending && (
					<Badge className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-destructive text-white border-0">
						Hot
					</Badge>
				)}
				<Hash className="size-5 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
				<p className="font-semibold mb-1">{name}</p>
				<p className="text-sm text-muted-foreground">{count} articles</p>
			</Link>
		))}
	</div>
);

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }) => (
			<Button key={label} size="lg" variant={variant} asChild className="gap-2">
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);
