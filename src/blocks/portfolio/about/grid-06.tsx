import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, BookOpen, Mic, Video, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-3 gap-8">
					<div className="@lg:col-span-2 space-y-6">
						<IntroSection
							eyebrow="Content Creator"
							name="Rachel Kim"
							tagline="Helping developers level up their skills"
							bio="I create tutorials, courses, and content to help developers become better at their craft. Join 500K+ developers who learn with me."
						/>
						<ChannelsGrid
							channels={[
								{
									icon: Youtube,
									name: 'YouTube',
									stat: '500K',
									label: 'Subscribers',
								},
								{
									icon: Mic,
									name: 'Podcast',
									stat: '100K',
									label: 'Listeners',
								},
								{ icon: BookOpen, name: 'Blog', stat: '50K', label: 'Readers' },
								{
									icon: Video,
									name: 'Courses',
									stat: '10K',
									label: 'Students',
								},
							]}
						/>
					</div>
					<FeaturedContentCard
						title="Latest Course"
						image="https://picsum.photos/seed/course1/600/400"
						courseName="Complete React Masterclass"
						description="Everything you need to become a professional React developer."
						stats={[
							{ label: 'Students', value: '5,000+' },
							{ label: 'Hours', value: '40+' },
							{ label: 'Rating', value: '4.9' },
						]}
						cta={{ label: 'Learn More', href: '/courses', icon: ArrowRight }}
					/>
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-6 mt-8">
					<TopicCard title="React & Next.js" count={120} href="/topics/react" />
					<TopicCard title="TypeScript" count={80} href="/topics/typescript" />
					<TopicCard title="CSS & Tailwind" count={60} href="/topics/css" />
					<TopicCard title="Career Tips" count={40} href="/topics/career" />
				</div>
			</div>
		</section>
	);
}

interface IntroSectionProps {
	eyebrow: string;
	name: string;
	tagline: string;
	bio: string;
}

const IntroSection = ({ eyebrow, name, tagline, bio }: IntroSectionProps) => (
	<div>
		<Badge variant="secondary" className="mb-4">
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @xl:text-4xl font-bold mb-2">{name}</h1>
		<p className="text-xl text-primary mb-4">{tagline}</p>
		<p className="text-muted-foreground">{bio}</p>
	</div>
);

interface ChannelItem {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	stat: string;
	label: string;
}

interface ChannelsGridProps {
	channels: ChannelItem[];
}

const ChannelsGrid = ({ channels }: ChannelsGridProps) => (
	<div className="grid grid-cols-2 @sm:grid-cols-4 gap-4">
		{channels.map(({ icon: Icon, name, stat, label }) => (
			<Card key={name}>
				<CardContent className="p-4 text-center">
					<Icon className="size-6 text-primary mx-auto mb-2" />
					<div className="text-2xl font-bold">{stat}</div>
					<div className="text-xs text-muted-foreground">{label}</div>
				</CardContent>
			</Card>
		))}
	</div>
);

interface StatItem {
	label: string;
	value: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface FeaturedContentCardProps {
	title: string;
	image: string;
	courseName: string;
	description: string;
	stats: StatItem[];
	cta: CTAData;
}

const FeaturedContentCard = ({
	title,
	image,
	courseName,
	description,
	stats,
	cta,
}: FeaturedContentCardProps) => (
	<Card className="overflow-hidden py-0">
		<div className="relative aspect-video">
			<Image src={image} alt={courseName} fill className="object-cover" />
			<Badge className="absolute top-3 left-3">{title}</Badge>
		</div>
		<CardContent className="p-6">
			<h3 className="text-lg font-bold mb-2">{courseName}</h3>
			<p className="text-sm text-muted-foreground mb-4">{description}</p>
			<div className="flex gap-4 mb-4">
				{stats.map((stat) => (
					<div key={stat.label} className="text-center">
						<div className="text-lg font-bold">{stat.value}</div>
						<div className="text-xs text-muted-foreground">{stat.label}</div>
					</div>
				))}
			</div>
			<Button className="w-full gap-2" asChild>
				<Link href={cta.href}>
					{cta.label}
					<cta.icon className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

interface TopicCardProps {
	title: string;
	count: number;
	href: string;
}

const TopicCard = ({ title, count, href }: TopicCardProps) => (
	<Link href={href}>
		<Card className="hover:bg-muted/50 transition-colors">
			<CardHeader className="p-4">
				<div className="flex justify-between items-center">
					<h3 className="font-semibold">{title}</h3>
					<Badge variant="outline">{count}</Badge>
				</div>
			</CardHeader>
		</Card>
	</Link>
);
