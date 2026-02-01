import Link from 'next/link';
import { Clock, User, Layers } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface ArticleProps {
	issue: string;
	section: string;
	sectionHref: string;
	title: string;
	kicker: string;
	byline: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	content: { type: 'paragraph' | 'dropcap'; text: string }[];
}

const MagazineHeader = ({
	issue,
	section,
	sectionHref,
}: {
	issue: string;
	section: string;
	sectionHref: string;
}) => (
	<div className="flex items-center justify-between border-b-2 border-foreground pb-3">
		<span className="text-xs font-bold uppercase tracking-[0.2em]">
			{issue}
		</span>
		<Link
			href={sectionHref}
			className="text-xs font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors"
		>
			{section}
		</Link>
	</div>
);

const Kicker = ({ text }: { text: string }) => (
	<span className="text-sm @md:text-base font-semibold text-primary uppercase tracking-[0.15em]">
		{text}
	</span>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl font-serif font-bold tracking-tight leading-[0.95]">
		{text}
	</h1>
);

const Byline = ({ text }: { text: string }) => (
	<p className="text-xl @md:text-2xl font-serif italic text-foreground/80 leading-relaxed">
		{text}
	</p>
);

const AuthorCredit = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex items-center gap-4 py-4 border-y border-border">
		<Avatar className="size-10">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="text-xs bg-muted font-semibold">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1">
			<p className="text-sm font-semibold uppercase tracking-wider">
				By {author.name}
			</p>
		</div>
		<div className="flex items-center gap-3 text-xs text-muted-foreground">
			<span>{publishDate}</span>
			<Separator orientation="vertical" className="h-3" />
			<div className="flex items-center gap-1">
				<Clock className="size-3" />
				<span>{readTime}</span>
			</div>
		</div>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<figure className="relative">
		<div className="aspect-[4/5] @md:aspect-[3/4] @lg:aspect-[2/3] overflow-hidden">
			<img src={src} alt={alt} className="size-full object-cover" />
		</div>
		<figcaption className="mt-3 text-xs text-muted-foreground italic text-center">
			{alt}
		</figcaption>
	</figure>
);

const MagazineContent = ({
	blocks,
}: {
	blocks: { type: 'paragraph' | 'dropcap'; text: string }[];
}) => (
	<div className="columns-1 @lg:columns-2 gap-8 @xl:gap-12">
		{blocks.map((block, index) => (
			<p
				key={index}
				className={`text-base leading-[1.9] text-foreground/90 mb-6 font-serif ${
					block.type === 'dropcap'
						? 'first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:font-serif'
						: ''
				}`}
			>
				{block.text}
			</p>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		issue: 'Winter 2026',
		section: 'Culture',
		sectionHref: '/blog/category/culture',
		kicker: 'The New Artisans',
		title: 'Crafting the Future by Hand',
		byline:
			'In an age of automation, a new generation of makers is rediscovering the value of handcrafted objects.',
		author: {
			name: 'Isabella Romano',
			avatar:
				'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
			initials: 'IR',
		},
		publishDate: 'January 15, 2026',
		readTime: '16 min read',
		heroImage:
			'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=1200&fit=crop',
		heroAlt: 'Artisan hands shaping clay on a pottery wheel',
		content: [
			{
				type: 'dropcap',
				text: 'There is a revolution happening in workshops and studios around the world, though you might not recognize it as such. It is quiet, deliberate, and measured in the rhythm of hands working with materials rather than the pace of digital innovation.',
			},
			{
				type: 'paragraph',
				text: 'The new artisans are not Luddites. They embrace technology where it serves their craft—precision tools, online marketplaces, social media for building community. But they have chosen to center their work around the irreducible value of human attention and skill.',
			},
			{
				type: 'paragraph',
				text: 'This movement represents more than aesthetic preference. It is a response to something missing in our relationship with the objects that fill our lives. Mass production has given us abundance, but it has also created a sameness, a disconnection from the stories and hands behind what we own.',
			},
			{
				type: 'paragraph',
				text: 'In the workshops of these new makers, every piece carries intention. The slight variations that mark handmade objects are not flaws but evidence of presence—a reminder that a human being devoted hours of focus and care to creating something that would outlast them.',
			},
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-8">
					<MagazineHeader
						issue={articleData.issue}
						section={articleData.section}
						sectionHref={articleData.sectionHref}
					/>

					<div className="grid @lg:grid-cols-[1fr_1.2fr] gap-8 @lg:gap-12">
						<div className="flex flex-col gap-6">
							<Kicker text={articleData.kicker} />
							<Title text={articleData.title} />
							<Byline text={articleData.byline} />
							<AuthorCredit
								author={articleData.author}
								publishDate={articleData.publishDate}
								readTime={articleData.readTime}
							/>
						</div>

						<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
					</div>

					<Separator className="my-4" />

					<MagazineContent blocks={articleData.content} />
				</div>
			</div>
		</section>
	);
}
