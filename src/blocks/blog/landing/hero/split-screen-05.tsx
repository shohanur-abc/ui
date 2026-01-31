import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookOpen, Mail, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
					<LatestPosts
						items={[
							{
								title: 'Understanding React Server Components',
								category: 'React',
								image:
									'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200',
								trending: true,
							},
							{
								title: 'The Complete Guide to TypeScript 5.0',
								category: 'TypeScript',
								image:
									'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200',
								trending: false,
							},
							{
								title: 'Building APIs with Hono and Bun',
								category: 'Backend',
								image:
									'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200',
								trending: true,
							},
						]}
					/>
					<ContentSection
						eyebrow={{ icon: BookOpen, text: 'Weekly Newsletter' }}
						title="Never Miss a Beat"
						description="Get the best articles delivered to your inbox every week. Curated by our editors, loved by 50,000+ subscribers."
						newsletter={{
							placeholder: 'your@email.com',
							buttonText: 'Subscribe',
						}}
						features={['No spam, ever', 'Unsubscribe anytime', 'Free forever']}
					/>
				</div>
			</div>
		</section>
	);
}

interface Post {
	title: string;
	category: string;
	image: string;
	trending: boolean;
}

const LatestPosts = ({ items }: { items: Post[] }) => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-6">
			<TrendingUp className="size-5 text-primary" />
			<span className="font-semibold">Latest Articles</span>
		</div>
		{items.map((post) => (
			<PostCard key={post.title} post={post} />
		))}
	</div>
);

const PostCard = ({ post }: { post: Post }) => (
	<div className="group flex gap-4 p-4 rounded-xl bg-card border transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
		<div className="relative size-20 @md:size-24 rounded-lg overflow-hidden shrink-0">
			<Image
				src={post.image}
				alt={post.title}
				fill
				className="object-cover transition-transform group-hover:scale-110"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2 mb-2">
				<Badge variant="secondary" className="text-xs">
					{post.category}
				</Badge>
				{post.trending && (
					<Badge className="text-xs bg-primary/10 text-primary border-0">
						Trending
					</Badge>
				)}
			</div>
			<h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
				{post.title}
			</h3>
		</div>
		<ArrowRight className="size-5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity self-center" />
	</div>
);

interface ContentSectionProps {
	eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string };
	title: string;
	description: string;
	newsletter: { placeholder: string; buttonText: string };
	features: string[];
}

const ContentSection = ({
	eyebrow,
	title,
	description,
	newsletter,
	features,
}: ContentSectionProps) => (
	<div className="@3xl:pl-8">
		<Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
		<Title text={title} />
		<Description text={description} />
		<Newsletter
			placeholder={newsletter.placeholder}
			buttonText={newsletter.buttonText}
		/>
		<Features items={features} />
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="outline" className="gap-2 px-4 py-1.5">
			<Icon className="size-4 text-primary" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">
		{text}
	</p>
);

const Newsletter = ({
	placeholder,
	buttonText,
}: {
	placeholder: string;
	buttonText: string;
}) => (
	<div className="flex flex-col @sm:flex-row gap-3 mb-6">
		<div className="relative flex-1">
			<Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
			<Input
				type="email"
				placeholder={placeholder}
				className="pl-10 h-12 bg-background border-2"
			/>
		</div>
		<Button size="lg" className="h-12 gap-2">
			{buttonText}
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

const Features = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
		{items.map((item) => (
			<span key={item} className="flex items-center gap-1.5">
				<span className="size-1.5 rounded-full bg-primary" />
				{item}
			</span>
		))}
	</div>
);
