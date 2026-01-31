import Link from 'next/link';
import { Clock, Star, ChevronDown, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	bio: string;
}

interface ArticleProps {
	featured: boolean;
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	pullQuote: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: string[];
	keyTakeaways: string[];
}

const FeaturedBadge = () => (
	<Badge className="gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
		<Star className="size-3 fill-current" />
		Featured Article
	</Badge>
);

const CategoryLink = ({ text, href }: { text: string; href: string }) => (
	<Link
		href={href}
		className="text-sm font-medium text-primary hover:underline underline-offset-4"
	>
		{text}
	</Link>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-black tracking-tight leading-none bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground font-light leading-relaxed">
		{text}
	</p>
);

const PullQuote = ({ text }: { text: string }) => (
	<div className="relative py-8 @md:py-10">
		<Quote className="absolute top-0 left-0 size-12 text-primary/20" />
		<blockquote className="text-xl @md:text-2xl @lg:text-3xl font-medium italic text-center leading-relaxed px-8">
			&ldquo;{text}&rdquo;
		</blockquote>
	</div>
);

const AuthorBar = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex flex-col @sm:flex-row @sm:items-center gap-4 @sm:justify-between p-4 @md:p-6 rounded-xl bg-muted/50">
		<div className="flex items-center gap-4">
			<Avatar className="size-14 ring-4 ring-background shadow-lg">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-semibold">{author.name}</p>
				<p className="text-sm text-muted-foreground line-clamp-1">{author.bio}</p>
			</div>
		</div>
		<div className="flex items-center gap-4 text-sm text-muted-foreground @sm:text-right">
			<span>{publishDate}</span>
			<span>·</span>
			<div className="flex items-center gap-1">
				<Clock className="size-3.5" />
				<span>{readTime}</span>
			</div>
		</div>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/3] @lg:aspect-[21/9] overflow-hidden rounded-2xl @xl:rounded-3xl ring-1 ring-border/50 shadow-2xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
	</div>
);

const KeyTakeaways = ({ items }: { items: string[] }) => (
	<Collapsible className="rounded-xl border border-border overflow-hidden">
		<CollapsibleTrigger asChild>
			<Button
				variant="ghost"
				className="w-full justify-between p-4 @md:p-6 rounded-none h-auto hover:bg-muted/50"
			>
				<span className="font-semibold text-base">Key Takeaways</span>
				<ChevronDown className="size-5 transition-transform duration-200 [[data-state=open]_&]:rotate-180" />
			</Button>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="px-4 @md:px-6 pb-4 @md:pb-6 pt-0">
				<ul className="space-y-3">
					{items.map((item, index) => (
						<li key={index} className="flex gap-3 text-sm @md:text-base text-foreground/85">
							<span className="shrink-0 flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
								{index + 1}
							</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</CollapsibleContent>
	</Collapsible>
);

const ArticleContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @md:text-lg leading-[1.85] text-foreground/90"
			>
				{paragraph}
			</p>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		featured: true,
		category: 'Innovation',
		categoryHref: '/blog/category/innovation',
		title: 'The Next Decade of Space Exploration',
		subtitle:
			'From lunar bases to Mars missions, humanity is on the brink of becoming a multi-planetary species.',
		pullQuote:
			'We are not just exploring space—we are ensuring the long-term survival of consciousness in the universe.',
		author: {
			name: 'Commander Sarah Chen',
			avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop',
			initials: 'SC',
			bio: 'Former NASA Astronaut & Space Policy Advisor',
		},
		publishDate: 'February 1, 2026',
		readTime: '11 min read',
		heroImage:
			'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&h=900&fit=crop',
		heroAlt: 'Astronaut with Earth in background',
		content: [
			'The next decade promises to be the most exciting era in space exploration since the Apollo program. Multiple nations and private companies are racing to establish a permanent human presence beyond Earth, with the Moon serving as our first stepping stone.',
			'NASA\'s Artemis program aims to return humans to the lunar surface and establish a sustainable base camp. But this time, we\'re going to stay. The goal is to develop the technologies and experience needed for the ultimate destination: Mars.',
			'Private space companies have fundamentally altered the economics of reaching orbit. Reusable rockets have slashed launch costs by an order of magnitude, making previously impossible missions financially viable. This democratization of space access is accelerating innovation at an unprecedented pace.',
			'The challenges ahead are immense: radiation exposure, life support systems, psychological factors of long-duration spaceflight. But with each mission, we learn more. The question is no longer whether humans will walk on Mars, but when.',
		],
		keyTakeaways: [
			'Lunar bases will serve as testing grounds for Mars mission technologies',
			'Private companies have reduced launch costs by over 90%',
			'International cooperation is essential for sustainable space exploration',
			'The first crewed Mars mission is projected within the next 15 years',
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<div className="flex flex-wrap items-center gap-3">
						{articleData.featured && <FeaturedBadge />}
						<CategoryLink text={articleData.category} href={articleData.categoryHref} />
					</div>

					<Title text={articleData.title} />
					<Subtitle text={articleData.subtitle} />

					<AuthorBar
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>

					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />

					<PullQuote text={articleData.pullQuote} />

					<KeyTakeaways items={articleData.keyTakeaways} />

					<ArticleContent paragraphs={articleData.content} />
				</div>
			</div>
		</section>
	);
}
