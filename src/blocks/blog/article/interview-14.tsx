import Link from 'next/link';
import { Clock, Quote, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface IntervieweeProps {
	name: string;
	title: string;
	company: string;
	avatar: string;
	initials: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	introduction: string;
	interviewer: AuthorProps;
	interviewee: IntervieweeProps;
	publishDate: string;
	readTime: string;
	heroImage: string;
	heroAlt: string;
	qa: { question: string; answer: string }[];
}

const InterviewBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="default" className="gap-1.5" asChild>
		<Link href={href}>
			<Quote className="size-3" />
			{text}
		</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Introduction = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-foreground/80 leading-relaxed italic border-l-4 border-primary/50 pl-4 @md:pl-6">
		{text}
	</p>
);

const InterviewParticipants = ({
	interviewer,
	interviewee,
	publishDate,
	readTime,
}: {
	interviewer: AuthorProps;
	interviewee: IntervieweeProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex flex-col @md:flex-row gap-6 p-4 @md:p-6 rounded-xl bg-muted/50">
		<div className="flex items-center gap-3 flex-1">
			<Avatar className="size-14 ring-2 ring-primary/20 shadow-lg">
				<AvatarImage src={interviewee.avatar} alt={interviewee.name} />
				<AvatarFallback className="text-lg bg-primary text-primary-foreground font-bold">
					{interviewee.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
					Featured
				</p>
				<p className="font-semibold">{interviewee.name}</p>
				<p className="text-sm text-muted-foreground">
					{interviewee.title}, {interviewee.company}
				</p>
			</div>
		</div>
		<div className="flex items-center gap-3">
			<Avatar className="size-10">
				<AvatarImage src={interviewer.avatar} alt={interviewer.name} />
				<AvatarFallback className="text-xs bg-muted font-medium">
					{interviewer.initials}
				</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-xs text-muted-foreground uppercase tracking-wider">
					Interview by
				</p>
				<p className="text-sm font-medium">{interviewer.name}</p>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span>{publishDate}</span>
					<span>·</span>
					<div className="flex items-center gap-1">
						<Clock className="size-3" />
						<span>{readTime}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const HeroPortrait = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[3/4] @md:aspect-[4/3] @lg:aspect-video overflow-hidden rounded-2xl shadow-xl">
		<img
			src={src}
			alt={alt}
			className="absolute inset-0 size-full object-cover"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
	</div>
);

const QASection = ({ qa }: { qa: { question: string; answer: string }[] }) => (
	<div className="space-y-8 @md:space-y-12">
		{qa.map((item, index) => (
			<div key={index} className="space-y-4">
				<div className="flex gap-4">
					<div className="shrink-0 size-8 rounded-full bg-primary/10 flex items-center justify-center">
						<span className="text-xs font-bold text-primary">Q</span>
					</div>
					<p className="text-base @md:text-lg font-semibold leading-relaxed pt-1">
						{item.question}
					</p>
				</div>
				<div className="flex gap-4">
					<div className="shrink-0 size-8 rounded-full bg-muted flex items-center justify-center">
						<span className="text-xs font-bold text-muted-foreground">A</span>
					</div>
					<p className="text-base @md:text-lg leading-[1.85] text-foreground/85 pt-1">
						{item.answer}
					</p>
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Interview',
		categoryHref: '/blog/category/interviews',
		title:
			'Building Products That Matter: A Conversation with the Future of Tech',
		introduction:
			'We sat down with one of the most influential voices in product development to discuss the changing landscape of technology, the responsibility of builders, and what comes next.',
		interviewer: {
			name: 'David Chen',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
			initials: 'DC',
		},
		interviewee: {
			name: 'Amanda Foster',
			title: 'Chief Product Officer',
			company: 'Nexus Technologies',
			avatar:
				'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
			initials: 'AF',
		},
		publishDate: 'January 20, 2026',
		readTime: '18 min read',
		heroImage:
			'https://images.unsplash.com/photo-1560439514-4e9645039924?w=1600&h=900&fit=crop',
		heroAlt: 'Professional headshot of Amanda Foster',
		qa: [
			{
				question:
					"You've been at the forefront of product development for over a decade. How has your philosophy evolved?",
				answer:
					"Early in my career, I was obsessed with features—shipping more, shipping faster. Over time, I've come to believe that restraint is the harder and more valuable skill. The best products aren't the ones that do everything; they're the ones that do a few things extraordinarily well. Every feature is a commitment, a complexity cost that compounds over time.",
			},
			{
				question:
					"There's been a lot of discussion about AI and its impact on product development. Where do you see the biggest opportunities?",
				answer:
					"The obvious applications are automation and personalization, and those are valuable. But I'm most excited about AI as a tool for understanding. We've always struggled to truly know our users—their contexts, their frustrations, their unarticulated needs. AI gives us new ways to synthesize information and surface patterns that would be invisible otherwise.",
			},
			{
				question:
					'What advice would you give to someone just starting out in product?',
				answer:
					"Fall in love with problems, not solutions. It's so easy to get attached to a particular approach or technology. But the job is to serve users, and that requires the humility to admit when your initial ideas aren't working. The best product people I know are relentlessly curious and genuinely excited about being proven wrong.",
			},
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<InterviewBadge
						text={articleData.category}
						href={articleData.categoryHref}
					/>
					<Title text={articleData.title} />
					<Introduction text={articleData.introduction} />
					<InterviewParticipants
						interviewer={articleData.interviewer}
						interviewee={articleData.interviewee}
						publishDate={articleData.publishDate}
						readTime={articleData.readTime}
					/>
					<HeroPortrait src={articleData.heroImage} alt={articleData.heroAlt} />
					<QASection qa={articleData.qa} />
				</div>
			</div>
		</section>
	);
}
