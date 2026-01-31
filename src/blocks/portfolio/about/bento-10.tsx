import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Mic, Podcast, Video, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					<ProfileImageCard
						src="https://picsum.photos/seed/bento10/600/600"
						alt="Casey Jordan"
						badge="Content Creator"
					/>
					<IntroCard
						title="Casey Jordan"
						role="Tech Educator"
						description="I teach web development through videos, podcasts, and courses. Making complex topics simple and fun."
						className="@lg:col-span-2"
					/>
					<ChannelCard
						icon={Youtube}
						name="YouTube"
						stat="500K subscribers"
						href="https://youtube.com"
					/>
					<ChannelCard
						icon={Podcast}
						name="Podcast"
						stat="100K listeners"
						href="/podcast"
					/>
					<ChannelCard
						icon={Video}
						name="Courses"
						stat="10K students"
						href="/courses"
					/>
					<TopicsCard
						title="Topics I Cover"
						items={[
							'React & Next.js',
							'TypeScript',
							'Web Performance',
							'Career Advice',
							'System Design',
						]}
						className="@sm:col-span-2"
					/>
					<CTACard title="Start Learning" href="/courses" icon={ArrowUpRight} />
				</div>
			</div>
		</section>
	);
}

interface ProfileImageCardProps {
	src: string;
	alt: string;
	badge: string;
}

const ProfileImageCard = ({ src, alt, badge }: ProfileImageCardProps) => (
	<Card className="overflow-hidden py-0">
		<CardContent className="p-0 relative aspect-square">
			<Image src={src} alt={alt} fill className="object-cover" />
			<Badge className="absolute top-4 left-4">
				<Mic className="size-3 mr-1" />
				{badge}
			</Badge>
		</CardContent>
	</Card>
);

interface IntroCardProps {
	title: string;
	role: string;
	description: string;
	className?: string;
}

const IntroCard = ({ title, role, description, className }: IntroCardProps) => (
	<Card className={className}>
		<CardContent className="p-6 flex flex-col justify-center h-full">
			<h1 className="text-3xl font-bold mb-1">{title}</h1>
			<p className="text-primary font-medium mb-4">{role}</p>
			<p className="text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

interface ChannelCardProps {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	stat: string;
	href: string;
}

const ChannelCard = ({ icon: Icon, name, stat, href }: ChannelCardProps) => (
	<Card className="bg-muted/50 border-none hover:bg-muted transition-colors cursor-pointer">
		<Link href={href}>
			<CardContent className="p-6">
				<Icon className="size-6 text-primary mb-3" />
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground">{stat}</p>
			</CardContent>
		</Link>
	</Card>
);

interface TopicsCardProps {
	title: string;
	items: string[];
	className?: string;
}

const TopicsCard = ({ title, items, className }: TopicsCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-3">{title}</p>
			<div className="flex flex-wrap gap-2">
				{items.map((topic) => (
					<Badge key={topic} variant="secondary">
						{topic}
					</Badge>
				))}
			</div>
		</CardContent>
	</Card>
);

interface CTACardProps {
	title: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

const CTACard = ({ title, href, icon: Icon }: CTACardProps) => (
	<Card className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
		<Link href={href}>
			<CardContent className="p-6 flex flex-col justify-between h-full">
				<Icon className="size-6 ml-auto" />
				<p className="font-semibold text-lg">{title}</p>
			</CardContent>
		</Link>
	</Card>
);
