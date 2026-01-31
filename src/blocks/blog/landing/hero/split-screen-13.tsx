import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	BookOpen,
	Clock,
	GraduationCap,
	Users,
} from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
					<SeriesCard
						series={{
							title: 'Building a SaaS from Scratch',
							description:
								'A 12-part series covering everything from idea validation to scaling your product.',
							parts: 12,
							completed: 8,
							readers: 15400,
							duration: '6 hours',
							author: 'Michael Torres',
						}}
					/>
					<ContentSection
						eyebrow={{ icon: BookOpen, text: 'Article Series' }}
						title="Deep Dives That"
						highlight="Go the Distance"
						description="Multi-part article series that take you from beginner to expert. Follow along at your own pace and build real-world projects."
						series={[
							{
								title: 'React Performance Mastery',
								parts: 8,
								readers: '12.3K',
							},
							{ title: 'Database Design Patterns', parts: 10, readers: '9.8K' },
							{ title: 'Testing Best Practices', parts: 6, readers: '7.5K' },
						]}
						cta={[
							{ label: 'Browse All Series', href: '/series', icon: ArrowRight },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface Series {
	title: string;
	description: string;
	parts: number;
	completed: number;
	readers: number;
	duration: string;
	author: string;
}

const SeriesCard = ({ series }: { series: Series }) => (
	<div className="relative p-6 @md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-primary/20">
		<Badge className="mb-4 bg-primary text-primary-foreground">
			<GraduationCap className="size-3.5 mr-1.5" />
			Featured Series
		</Badge>
		<h3 className="text-2xl @md:text-3xl font-bold mb-3">{series.title}</h3>
		<p className="text-muted-foreground mb-6">{series.description}</p>

		<div className="mb-6">
			<div className="flex items-center justify-between text-sm mb-2">
				<span>Progress</span>
				<span className="font-medium">
					{series.completed}/{series.parts} parts
				</span>
			</div>
			<div className="h-2 bg-secondary rounded-full overflow-hidden">
				<div
					className="h-full bg-primary rounded-full transition-all"
					style={{ width: `${(series.completed / series.parts) * 100}%` }}
				/>
			</div>
		</div>

		<div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
			<span className="flex items-center gap-1.5">
				<BookOpen className="size-4" />
				{series.parts} parts
			</span>
			<span className="flex items-center gap-1.5">
				<Clock className="size-4" />
				{series.duration}
			</span>
			<span className="flex items-center gap-1.5">
				<Users className="size-4" />
				{series.readers.toLocaleString()} readers
			</span>
		</div>

		<div className="flex items-center justify-between">
			<span className="text-sm">
				by <span className="font-medium">{series.author}</span>
			</span>
			<Button size="sm" className="gap-2">
				Continue Reading
				<ArrowRight className="size-4" />
			</Button>
		</div>
	</div>
);

interface SeriesItem {
	title: string;
	parts: string;
	readers: string;
}

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface ContentSectionProps {
	eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string };
	title: string;
	highlight: string;
	description: string;
	series: SeriesItem[];
	cta: CTAItem[];
}

const ContentSection = ({
	eyebrow,
	title,
	highlight,
	description,
	series,
	cta,
}: ContentSectionProps) => (
	<div className="space-y-6 @3xl:pl-8">
		<Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
		<Title text={title} highlight={highlight} />
		<Description text={description} />
		<SeriesList items={series} />
		<CTA items={cta} />
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="gap-2 px-4 py-1.5">
		<Icon className="size-4 text-primary" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
		<span className="block text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const SeriesList = ({ items }: { items: SeriesItem[] }) => (
	<div className="space-y-3">
		{items.map((item) => (
			<Link
				key={item.title}
				href="#"
				className="group flex items-center justify-between p-4 rounded-xl bg-card border transition-all hover:border-primary"
			>
				<div>
					<p className="font-medium group-hover:text-primary transition-colors">
						{item.title}
					</p>
					<p className="text-sm text-muted-foreground">
						{item.parts} parts · {item.readers} readers
					</p>
				</div>
				<ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
			</Link>
		))}
	</div>
);

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap gap-3">
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
