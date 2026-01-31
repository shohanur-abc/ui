import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Podcast, Video, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-16 items-center">
					<ImageSection
						src="https://picsum.photos/seed/split14/800/800"
						alt="Daniel Foster"
					/>
					<ContentSection
						eyebrow="Content Creator"
						title="Daniel Foster"
						role="Tech Educator & YouTuber"
						description="I make complex tech concepts simple and fun. With 500K+ subscribers and 50M+ views, I've helped countless developers level up their skills through tutorials and courses."
						channels={[
							{ icon: Youtube, name: 'YouTube', stats: '500K subs' },
							{ icon: Podcast, name: 'Podcast', stats: '100K listeners' },
							{ icon: Video, name: 'Courses', stats: '10K students' },
						]}
						topics={[
							'React & Next.js',
							'TypeScript',
							'System Design',
							'Career Advice',
							'Productivity',
						]}
						cta={[
							{
								label: 'Watch Videos',
								href: 'https://youtube.com',
								icon: ArrowRight,
							},
							{ label: 'View Courses', href: '/courses', variant: 'outline' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
		<Badge className="absolute bottom-4 left-4 bg-red-500 text-white border-none">
			<span className="size-2 rounded-full bg-white mr-2 animate-pulse" />
			Live
		</Badge>
	</div>
);

interface ChannelItem {
	icon: React.ComponentType<{ className?: string }>;
	name: string;
	stats: string;
}

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface ContentSectionProps {
	eyebrow: string;
	title: string;
	role: string;
	description: string;
	channels: ChannelItem[];
	topics: string[];
	cta: CTAItem[];
}

const ContentSection = ({
	eyebrow,
	title,
	role,
	description,
	channels,
	topics,
	cta,
}: ContentSectionProps) => (
	<div>
		<Badge variant="secondary" className="mb-4">
			{eyebrow}
		</Badge>
		<h1 className="text-4xl @sm:text-5xl font-bold tracking-tight mb-2">
			{title}
		</h1>
		<p className="text-lg text-primary font-medium mb-6">{role}</p>
		<p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
		<div className="flex gap-6 mb-8">
			{channels.map(({ icon: Icon, name, stats }, i) => (
				<div key={i} className="text-center">
					<Icon className="size-6 text-primary mx-auto mb-2" />
					<p className="text-sm font-medium">{name}</p>
					<p className="text-xs text-muted-foreground">{stats}</p>
				</div>
			))}
		</div>
		<div className="mb-8">
			<p className="text-sm font-medium mb-3">Topics I Cover</p>
			<div className="flex flex-wrap gap-2">
				{topics.map((topic) => (
					<Badge key={topic} variant="outline">
						{topic}
					</Badge>
				))}
			</div>
		</div>
		<div className="flex flex-wrap gap-3">
			{cta.map(({ label, href, icon: Icon, variant }, i) => (
				<Button
					key={i}
					size="lg"
					variant={variant || 'default'}
					className="gap-2"
					asChild
				>
					<Link href={href}>
						{label}
						{Icon && <Icon className="size-4" />}
					</Link>
				</Button>
			))}
		</div>
	</div>
);
