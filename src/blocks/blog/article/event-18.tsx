import Link from 'next/link';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface EventDetails {
	name: string;
	date: string;
	location: string;
	attendees: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	event: EventDetails;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	highlights: string[];
	content: string[];
}

const EventBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="default" className="gap-1.5 bg-gradient-to-r from-violet-500 to-purple-500 border-0" asChild>
		<Link href={href}>
			<Calendar className="size-3" />
			{text}
		</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const EventCard = ({ event }: { event: EventDetails }) => (
	<Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
		<CardContent className="p-4 @md:p-6">
			<h2 className="text-xl font-bold mb-4">{event.name}</h2>
			<div className="grid @sm:grid-cols-3 gap-4 text-sm">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-violet-500" />
					<span>{event.date}</span>
				</div>
				<div className="flex items-center gap-2">
					<MapPin className="size-4 text-violet-500" />
					<span>{event.location}</span>
				</div>
				<div className="flex items-center gap-2">
					<Users className="size-4 text-violet-500" />
					<span>{event.attendees}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AuthorLine = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex items-center gap-3 text-sm">
		<Avatar className="size-8">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="text-xs bg-muted font-medium">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<span className="font-medium">{author.name}</span>
		<span className="text-muted-foreground">·</span>
		<span className="text-muted-foreground">{publishDate}</span>
		<span className="text-muted-foreground">·</span>
		<div className="flex items-center gap-1 text-muted-foreground">
			<Clock className="size-3" />
			<span>{readTime}</span>
		</div>
	</div>
);

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
	</div>
);

const Highlights = ({ items }: { items: string[] }) => (
	<Card className="bg-muted/30 border-dashed">
		<CardContent className="p-4 @md:p-6">
			<h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Key Highlights</h3>
			<ul className="grid @md:grid-cols-2 gap-3">
				{items.map((item, index) => (
					<li key={index} className="flex items-start gap-2 text-sm">
						<span className="size-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
						<span>{item}</span>
					</li>
				))}
			</ul>
		</CardContent>
	</Card>
);

const ArticleContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @md:text-lg leading-[1.85] text-foreground/85"
			>
				{paragraph}
			</p>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Event Recap',
		categoryHref: '/blog/category/events',
		title: 'What We Learned at React Summit 2026',
		subtitle:
			'Our team attended the largest React conference in Europe. Here are the trends, tools, and ideas that stood out.',
		event: {
			name: 'React Summit Amsterdam',
			date: 'January 15-16, 2026',
			location: 'Amsterdam, Netherlands',
			attendees: '2,500+ attendees',
		},
		author: {
			name: 'Jordan Lee',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'JL',
		},
		publishDate: 'January 20, 2026',
		readTime: '12 min read',
		heroImage:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=700&fit=crop',
		heroAlt: 'React Summit conference main stage',
		highlights: [
			'React Server Components are now production-ready and widely adopted',
			'New React compiler delivers automatic memoization',
			'Signals pattern gaining traction in React ecosystem',
			'Server-first architecture becoming the default mental model',
		],
		content: [
			'React Summit 2026 marked a turning point for the React ecosystem. After years of experimentation with Server Components, the technology has finally reached a level of maturity where most teams feel confident using it in production. The talks reflected this shift, focusing less on "what" and more on "how."',
			'The announcement of the React compiler stole the show. By automatically optimizing re-renders and memoization, it promises to eliminate entire categories of performance bugs while simplifying the mental model for developers. The demo was impressive—though the team was careful to set realistic expectations about the rollout timeline.',
			'Perhaps most interesting was the subtle shift in community perspective. The server-first architecture that seemed controversial just two years ago is now the assumed default. Speakers consistently framed client-only rendering as a special case rather than the norm.',
			'Beyond the main stage, the hallway track delivered its usual magic. Conversations with fellow developers revealed a community that\'s more pragmatic and less dogmatic than online discourse might suggest. The vibe was collaborative rather than competitive—people sharing solutions rather than arguing about tools.',
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<EventBadge text={articleData.category} href={articleData.categoryHref} />
					<Title text={articleData.title} />
					<Subtitle text={articleData.subtitle} />
					<EventCard event={articleData.event} />
					<AuthorLine
						author={articleData.author}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<HeroImage src={articleData.heroImage} alt={articleData.heroAlt} />
					<Highlights items={articleData.highlights} />
					<Separator />
					<ArticleContent paragraphs={articleData.content} />
				</div>
			</div>
		</section>
	);
}
