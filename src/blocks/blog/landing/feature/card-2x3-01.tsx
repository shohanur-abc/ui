import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	BookOpen,
	Edit3,
	Globe,
	Image,
	MessageCircle,
	Rss,
	Search,
	Share2,
	Sparkles,
	TrendingUp,
	Users,
} from 'lucide-react';
import { ComponentType } from 'react';

interface Feature {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	color: string;
}

interface Stat {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden bg-background">
			<div className=" max-w-7xl relative mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @2xl:py-20">
				<div className="mx-auto mb-12 @lg:mb-14 @2xl:mb-16 max-w-2xl text-center">
					<Eyebrow icon={Sparkles} text="Powerful Features" />
					<Title
						text="Everything You Need to"
						highlight="Create Amazing Content"
					/>
					<Description text="Our blogging platform comes with all the tools you need to write, publish, and grow your audience." />
				</div>
				<Features
					items={[
						{
							icon: Edit3,
							title: 'Rich Text Editor',
							description:
								'Write beautiful articles with our powerful WYSIWYG editor featuring markdown support, code highlighting, and media embeds.',
							color: 'from-blue-500 to-cyan-500',
						},
						{
							icon: Image,
							title: 'Media Library',
							description:
								'Organize and manage your images, videos, and documents in one place with automatic optimization and CDN delivery.',
							color: 'from-purple-500 to-pink-500',
						},
						{
							icon: Search,
							title: 'SEO Optimization',
							description:
								'Built-in SEO tools with meta tags, sitemaps, and schema markup to help your content rank higher in search results.',
							color: 'from-green-500 to-emerald-500',
						},
						{
							icon: MessageCircle,
							title: 'Comments System',
							description:
								'Engage with your readers through a modern commenting system with moderation tools and spam protection.',
							color: 'from-orange-500 to-amber-500',
						},
						{
							icon: TrendingUp,
							title: 'Analytics Dashboard',
							description:
								'Track page views, reader engagement, and content performance with real-time analytics and insights.',
							color: 'from-red-500 to-rose-500',
						},
						{
							icon: Share2,
							title: 'Social Sharing',
							description:
								'One-click sharing to all major social platforms with customizable Open Graph images and Twitter cards.',
							color: 'from-indigo-500 to-violet-500',
						},
					]}
				/>
				<Metrics
					items={[
						{ icon: BookOpen, value: '10M+', label: 'Articles Published' },
						{ icon: Users, value: '500K+', label: 'Active Writers' },
						{ icon: Globe, value: '180+', label: 'Countries' },
						{ icon: Rss, value: '99.9%', label: 'Uptime' },
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-3 @md:mb-4">
		<Badge variant="secondary" className="inline-flex">
			<Icon className="mr-1.5 h-3 w-3" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h2 className="mb-3 @md:mb-4 text-2xl @sm:text-3xl @xl:text-4xl @3xl:text-5xl font-bold tracking-tight leading-tight">
		{text}
		<span className="block bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
			{highlight}
		</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<div>
		<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
	</div>
);

interface FeaturesProps {
	items: Feature[];
}

const Features = ({ items }: FeaturesProps) => (
	<div className="mb-12 @lg:mb-14 @2xl:mb-16 grid gap-4 @md:gap-5 @xl:gap-6 @lg:grid-cols-2 @4xl:grid-cols-3">
		{items.map((feature) => (
			<FeatureItem key={feature.title} feature={feature} />
		))}
	</div>
);

interface FeatureItemProps {
	feature: Feature;
}

const FeatureItem = ({ feature }: FeatureItemProps) => {
	const Icon = feature.icon;
	return (
		<Card className="group border-muted/50 transition-all hover:border-primary/30 hover:shadow-lg p-0">
			<CardContent className="p-5 @md:p-6">
				<div
					className={`mb-3 @md:mb-4 inline-flex h-10 w-10 @md:h-12 @md:w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
				>
					<Icon className="h-5 w-5 @md:h-6 @md:w-6 text-white" />
				</div>
				<h3 className="mb-2 text-base @md:text-lg font-semibold group-hover:text-primary transition-colors">
					{feature.title}
				</h3>
				<p className="text-sm text-muted-foreground leading-relaxed">
					{feature.description}
				</p>
			</CardContent>
		</Card>
	);
};

interface MetricsProps {
	items: Stat[];
}

const Metrics = ({ items }: MetricsProps) => (
	<div className="rounded-2xl border bg-muted/30 p-6 @md:p-8">
		<div className="grid grid-cols-2 gap-6 @md:gap-8 @xl:grid-cols-4">
			{items.map(({ icon: Icon, value, label }) => (
				<div key={label} className="text-center">
					<div className="mx-auto mb-2 @md:mb-3 flex h-10 w-10 @md:h-12 @md:w-12 items-center justify-center rounded-full bg-primary/10">
						<Icon className="h-5 w-5 @md:h-6 @md:w-6 text-primary" />
					</div>
					<p className="text-2xl @lg:text-3xl font-bold">{value}</p>
					<p className="text-xs @lg:text-sm text-muted-foreground">{label}</p>
				</div>
			))}
		</div>
	</div>
);
