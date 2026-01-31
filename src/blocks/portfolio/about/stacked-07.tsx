import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BookOpen, Mic, Video, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-2xl mx-auto space-y-12">
					<ProfileSection
						src="https://picsum.photos/seed/stack7/400/400"
						fallback="CT"
						name="Chris Taylor"
						role="Content Creator & Educator"
						bio="Helping developers level up their skills through practical tutorials and real-world projects."
					/>
					<Separator />
					<ChannelsSection
						title="Where to Find Me"
						channels={[
							{
								icon: Youtube,
								name: 'YouTube',
								followers: '500K subscribers',
								href: 'https://youtube.com',
								description:
									'Weekly tutorials on React, TypeScript, and web development',
							},
							{
								icon: Mic,
								name: 'Podcast',
								followers: '100K listeners',
								href: '/podcast',
								description:
									'Conversations with industry leaders about tech and careers',
							},
							{
								icon: BookOpen,
								name: 'Blog',
								followers: '50K readers',
								href: '/blog',
								description:
									'In-depth articles on software development and best practices',
							},
							{
								icon: Video,
								name: 'Courses',
								followers: '10K students',
								href: '/courses',
								description:
									'Comprehensive courses to take your skills to the next level',
							},
						]}
					/>
					<Separator />
					<TopicsSection
						title="Topics I Cover"
						topics={[
							{
								category: 'Frontend',
								items: ['React', 'Next.js', 'TypeScript', 'CSS', 'Testing'],
							},
							{
								category: 'Backend',
								items: ['Node.js', 'APIs', 'Databases', 'Authentication'],
							},
							{
								category: 'Career',
								items: ['Interviews', 'Resume', 'Side Projects', 'Freelancing'],
							},
						]}
					/>
					<Separator />
					<NewsletterSection
						title="Join 25,000+ Developers"
						description="Get weekly tips, tutorials, and insights delivered to your inbox. No spam, ever."
						cta={{
							label: 'Subscribe to Newsletter',
							href: '/newsletter',
							icon: ArrowRight,
						}}
					/>
				</div>
			</div>
		</section>
	);
}

interface ProfileSectionProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	bio: string;
}

const ProfileSection = ({
	src,
	fallback,
	name,
	role,
	bio,
}: ProfileSectionProps) => (
	<div className="text-center">
		<Avatar className="size-28 mx-auto mb-6 ring-4 ring-primary/20">
			<AvatarImage src={src} alt={name} />
			<AvatarFallback className="text-3xl bg-primary text-primary-foreground">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<h1 className="text-3xl font-bold mb-2">{name}</h1>
		<p className="text-xl text-primary font-medium mb-4">{role}</p>
		<p className="text-muted-foreground max-w-lg mx-auto">{bio}</p>
	</div>
);

interface ChannelItem {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	followers: string;
	href: string;
	description: string;
}

interface ChannelsSectionProps {
	title: string;
	channels: ChannelItem[];
}

const ChannelsSection = ({ title, channels }: ChannelsSectionProps) => (
	<div>
		<h2 className="text-xl font-bold mb-6">{title}</h2>
		<div className="space-y-4">
			{channels.map(({ icon: Icon, name, followers, href, description }) => (
				<Link
					key={name}
					href={href}
					className="flex items-start gap-4 p-4 rounded-xl border hover:bg-muted/50 transition-colors"
				>
					<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
						<Icon className="size-6 text-primary" />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="font-semibold">{name}</h3>
							<Badge variant="secondary" className="text-xs">
								{followers}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
					<ArrowRight className="size-5 text-muted-foreground shrink-0" />
				</Link>
			))}
		</div>
	</div>
);

interface TopicCategory {
	category: string;
	items: string[];
}

interface TopicsSectionProps {
	title: string;
	topics: TopicCategory[];
}

const TopicsSection = ({ title, topics }: TopicsSectionProps) => (
	<div>
		<h2 className="text-xl font-bold mb-6">{title}</h2>
		<div className="space-y-6">
			{topics.map((topic) => (
				<div key={topic.category}>
					<h3 className="text-sm font-medium text-muted-foreground mb-3">
						{topic.category}
					</h3>
					<div className="flex flex-wrap gap-2">
						{topic.items.map((item) => (
							<Badge key={item} variant="outline">
								{item}
							</Badge>
						))}
					</div>
				</div>
			))}
		</div>
	</div>
);

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface NewsletterSectionProps {
	title: string;
	description: string;
	cta: CTAData;
}

const NewsletterSection = ({
	title,
	description,
	cta,
}: NewsletterSectionProps) => (
	<div className="text-center p-8 rounded-xl bg-muted/50">
		<h2 className="text-xl font-bold mb-2">{title}</h2>
		<p className="text-muted-foreground mb-6">{description}</p>
		<Button className="gap-2" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
