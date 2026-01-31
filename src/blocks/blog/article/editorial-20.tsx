import Link from 'next/link';
import { Clock, Pencil, Italic, Quote as QuoteIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
	bio: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	content: { type: 'paragraph' | 'quote' | 'emphasis'; text: string }[];
}

const EditorialBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="secondary" className="gap-1.5 uppercase tracking-widest text-[10px] font-bold" asChild>
		<Link href={href}>
			<Pencil className="size-3" />
			{text}
		</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl font-serif font-bold tracking-tight leading-[0.95]">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-xl @md:text-2xl font-serif italic text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const AuthorBlock = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex flex-col @md:flex-row @md:items-center gap-6 py-6 border-y border-border">
		<div className="flex items-center gap-4 flex-1">
			<Avatar className="size-16 ring-4 ring-primary/10">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="text-xl bg-primary text-primary-foreground font-serif font-bold">
					{author.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-lg font-semibold font-serif">{author.name}</p>
				<p className="text-sm text-muted-foreground">{author.bio}</p>
			</div>
		</div>
		<div className="flex items-center gap-4 text-sm text-muted-foreground">
			<span>{publishDate}</span>
			<Separator orientation="vertical" className="h-4" />
			<div className="flex items-center gap-1">
				<Clock className="size-3.5" />
				<span>{readTime}</span>
			</div>
		</div>
	</div>
);

const InitialLetter = ({ letter }: { letter: string }) => (
	<span className="float-left text-8xl @md:text-9xl font-serif font-bold leading-none mr-4 mt-2 text-primary">
		{letter}
	</span>
);

const EditorialContent = ({ blocks }: { blocks: { type: 'paragraph' | 'quote' | 'emphasis'; text: string }[] }) => (
	<div className="space-y-8">
		{blocks.map((block, index) => {
			if (block.type === 'quote') {
				return (
					<blockquote
						key={index}
						className="relative py-8 px-6 @md:px-10 my-10 border-l-4 border-primary bg-muted/30"
					>
						<QuoteIcon className="absolute top-4 right-4 size-8 text-muted-foreground/20" />
						<p className="text-xl @md:text-2xl font-serif italic leading-relaxed">
							{block.text}
						</p>
					</blockquote>
				);
			}

			if (block.type === 'emphasis') {
				return (
					<p
						key={index}
						className="text-lg @md:text-xl font-serif font-medium text-center leading-relaxed py-4"
					>
						<Italic className="size-5 inline-block mr-2 text-primary" />
						{block.text}
					</p>
				);
			}

			return (
				<p
					key={index}
					className="text-lg @md:text-xl font-serif leading-[1.9] text-foreground/90"
				>
					{index === 0 && <InitialLetter letter={block.text[0]} />}
					{index === 0 ? block.text.slice(1) : block.text}
				</p>
			);
		})}
	</div>
);

const EndMark = () => (
	<div className="flex justify-center py-8">
		<div className="size-3 rotate-45 bg-primary" />
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Editorial',
		categoryHref: '/blog/category/editorial',
		title: 'On the Virtue of Patience in an Age of Instant Everything',
		subtitle: 'Why slowing down might be the most radical act in a world obsessed with speed.',
		author: {
			name: 'Catherine Wells',
			avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
			initials: 'CW',
			bio: 'Editor-in-Chief',
		},
		publishDate: 'January 30, 2026',
		readTime: '8 min read',
		content: [
			{
				type: 'paragraph',
				text: 'We have built a civilization that cannot wait. Same-day delivery, instant streaming, real-time notifications—we have engineered delay out of existence and called it progress. Yet in our rush to eliminate friction, we may have discarded something essential.',
			},
			{
				type: 'paragraph',
				text: 'Patience was once considered a virtue, an expression of character and wisdom. The patient person demonstrated self-control, long-term thinking, and faith that good things would come to those who waited. These were qualities worth cultivating.',
			},
			{
				type: 'quote',
				text: 'We have engineered delay out of existence and called it progress. Yet in our rush to eliminate friction, we may have discarded something essential.',
			},
			{
				type: 'paragraph',
				text: 'Today, patience often feels like a liability. In a world where response time is measured in milliseconds and attention spans in seconds, the person who pauses to think is at a disadvantage. Speed wins. Urgency prevails. The patient are left behind.',
			},
			{
				type: 'emphasis',
				text: 'But what if the opposite were true?',
			},
			{
				type: 'paragraph',
				text: 'The most enduring achievements of human civilization were not built in a day. Cathedrals took generations. Scientific breakthroughs emerged from decades of patient inquiry. Art that moves us across centuries was created by individuals who understood that some things cannot be rushed.',
			},
			{
				type: 'paragraph',
				text: 'Perhaps the most radical thing we can do in this age of instant everything is to slow down deliberately. To choose depth over breadth, quality over quantity, understanding over mere information. To remember that patience is not passive waiting, but active cultivation of something worth waiting for.',
			},
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28">
				<div className="flex flex-col gap-8 @md:gap-10">
					<div className="text-center">
						<EditorialBadge text={articleData.category} href={articleData.categoryHref} />
					</div>
					<Title text={articleData.title} />
					<Subtitle text={articleData.subtitle} />
					<AuthorBlock
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<EditorialContent blocks={articleData.content} />
					<EndMark />
				</div>
			</div>
		</section>
	);
}
