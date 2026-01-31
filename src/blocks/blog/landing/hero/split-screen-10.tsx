import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, ThumbsUp, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
					<ContentSection
						eyebrow={{ icon: TrendingUp, text: "This Week's Hot Topic" }}
						title="Join the Discussion"
						description="The most engaging article this week is sparking conversations across our community. Don't miss out on the insights being shared."
						article={{
							title: 'Is AI Taking Over Software Development?',
							excerpt:
								'A deep dive into how AI tools are reshaping the developer experience, and what it means for the future of our profession.',
							author: {
								name: 'David Park',
								avatar: 'https://i.pravatar.cc/100?img=20',
								initials: 'DP',
							},
							stats: { likes: 2340, comments: 458 },
						}}
						cta={{
							label: 'Read & Discuss',
							href: '/articles/ai-development',
							icon: ArrowRight,
						}}
					/>
					<DiscussionPreview
						comments={[
							{
								author: {
									name: 'Lisa Chen',
									avatar: 'https://i.pravatar.cc/100?img=21',
									initials: 'LC',
								},
								text: "AI won't replace developers, but developers who use AI will replace those who don't.",
								likes: 234,
							},
							{
								author: {
									name: 'Marcus Johnson',
									avatar: 'https://i.pravatar.cc/100?img=22',
									initials: 'MJ',
								},
								text: 'The key is understanding when to leverage AI and when human judgment is irreplaceable.',
								likes: 189,
							},
							{
								author: {
									name: 'Priya Sharma',
									avatar: 'https://i.pravatar.cc/100?img=23',
									initials: 'PS',
								},
								text: "I've seen 3x productivity gains since integrating AI into my workflow. Game changer!",
								likes: 156,
							},
						]}
						totalComments={458}
					/>
				</div>
			</div>
		</section>
	);
}

interface Author {
	name: string;
	avatar: string;
	initials: string;
}

interface Article {
	title: string;
	excerpt: string;
	author: Author;
	stats: { likes: number; comments: number };
}

interface CTAItem {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ContentSectionProps {
	eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string };
	title: string;
	description: string;
	article: Article;
	cta: CTAItem;
}

const ContentSection = ({
	eyebrow,
	title,
	description,
	article,
	cta,
}: ContentSectionProps) => (
	<div className="space-y-6">
		<Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
		<Title text={title} />
		<Description text={description} />
		<ArticleCard article={article} />
		<CTA label={cta.label} href={cta.href} icon={cta.icon} />
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge className="gap-2 px-4 py-1.5 bg-destructive/10 text-destructive border-0">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const ArticleCard = ({ article }: { article: Article }) => (
	<div className="p-5 rounded-xl bg-card border">
		<h3 className="text-lg @md:text-xl font-semibold mb-2">{article.title}</h3>
		<p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Avatar className="size-8">
					<AvatarImage src={article.author.avatar} alt={article.author.name} />
					<AvatarFallback className="bg-primary text-primary-foreground text-xs">
						{article.author.initials}
					</AvatarFallback>
				</Avatar>
				<span className="text-sm font-medium">{article.author.name}</span>
			</div>
			<div className="flex items-center gap-4 text-sm text-muted-foreground">
				<span className="flex items-center gap-1">
					<ThumbsUp className="size-4" />
					{article.stats.likes.toLocaleString()}
				</span>
				<span className="flex items-center gap-1">
					<MessageCircle className="size-4" />
					{article.stats.comments}
				</span>
			</div>
		</div>
	</div>
);

const CTA = ({ label, href, icon: Icon }: CTAItem) => (
	<Button size="lg" asChild className="gap-2">
		<Link href={href}>
			{label}
			<Icon className="size-4" />
		</Link>
	</Button>
);

interface Comment {
	author: Author;
	text: string;
	likes: number;
}

interface DiscussionPreviewProps {
	comments: Comment[];
	totalComments: number;
}

const DiscussionPreview = ({
	comments,
	totalComments,
}: DiscussionPreviewProps) => (
	<div className="space-y-4">
		<div className="flex items-center gap-2 mb-2">
			<MessageCircle className="size-5 text-primary" />
			<span className="font-semibold">Top Comments ({totalComments})</span>
		</div>
		{comments.map((comment) => (
			<CommentCard key={comment.author.name} comment={comment} />
		))}
	</div>
);

const CommentCard = ({ comment }: { comment: Comment }) => (
	<div className="p-4 rounded-xl bg-card border">
		<div className="flex items-start gap-3">
			<Avatar className="size-9 shrink-0">
				<AvatarImage src={comment.author.avatar} alt={comment.author.name} />
				<AvatarFallback className="bg-primary text-primary-foreground text-xs">
					{comment.author.initials}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<p className="font-medium text-sm mb-1">{comment.author.name}</p>
				<p className="text-sm text-muted-foreground">{comment.text}</p>
				<div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
					<ThumbsUp className="size-3" />
					<span>{comment.likes}</span>
				</div>
			</div>
		</div>
	</div>
);
