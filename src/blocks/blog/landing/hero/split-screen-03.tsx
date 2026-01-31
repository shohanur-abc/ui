import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bookmark, Calendar, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
					<ContentSection
						eyebrow={{ icon: Sparkles, text: 'Featured Article' }}
						title="Building Resilient Systems: Lessons from Production"
						description="A deep dive into the patterns and practices that keep modern distributed systems running smoothly under pressure."
						author={{
							name: 'Elena Rodriguez',
							avatar: 'https://i.pravatar.cc/100?img=10',
							initials: 'ER',
							role: 'Principal SRE at Netflix',
						}}
						meta={{ date: 'Jan 28, 2026', readTime: '15 min read' }}
						cta={[
							{
								label: 'Read Article',
								href: '/articles/resilient-systems',
								icon: ArrowRight,
							},
							{
								label: 'Save for Later',
								href: '#',
								icon: Bookmark,
								variant: 'outline',
							},
						]}
					/>
					<ImageSection
						src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"
						alt="Server infrastructure"
						tags={['System Design', 'Reliability', 'DevOps']}
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
	role: string;
}

interface Meta {
	date: string;
	readTime: string;
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
	description: string;
	author: Author;
	meta: Meta;
	cta: CTAItem[];
}

const ContentSection = ({
	eyebrow,
	title,
	description,
	author,
	meta,
	cta,
}: ContentSectionProps) => (
	<div className="space-y-6">
		<Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
		<Title text={title} />
		<Description text={description} />
		<AuthorInfo author={author} />
		<MetaInfo date={meta.date} readTime={meta.readTime} />
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
	<Badge variant="secondary" className="gap-2 px-4 py-1.5">
		<Icon className="size-4 text-primary" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight leading-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const AuthorInfo = ({ author }: { author: Author }) => (
	<div className="flex items-center gap-3">
		<Avatar className="size-12 ring-2 ring-primary/20">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="bg-primary text-primary-foreground">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<div>
			<p className="font-semibold">{author.name}</p>
			<p className="text-sm text-muted-foreground">{author.role}</p>
		</div>
	</div>
);

const MetaInfo = ({ date, readTime }: { date: string; readTime: string }) => (
	<div className="flex items-center gap-4 text-sm text-muted-foreground">
		<span className="flex items-center gap-1.5">
			<Calendar className="size-4" />
			{date}
		</span>
		<span className="flex items-center gap-1.5">
			<Clock className="size-4" />
			{readTime}
		</span>
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

interface ImageSectionProps {
	src: string;
	alt: string;
	tags: string[];
}

const ImageSection = ({ src, alt, tags }: ImageSectionProps) => (
	<div className="relative group">
		<div className="relative aspect-[4/3] @3xl:aspect-square rounded-2xl overflow-hidden">
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
		</div>
		<div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
			{tags.map((tag) => (
				<Badge
					key={tag}
					className="bg-background/90 text-foreground backdrop-blur-sm"
				>
					{tag}
				</Badge>
			))}
		</div>
	</div>
);
