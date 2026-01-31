import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Headphones, Pause, Play } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="emerald"
		>
			<div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-28">
				<div className="flex flex-col items-center text-center gap-6">
					<Eyebrow label="Podcast" icon={Headphones} />
					<Title text="The Dev Talk Show" />
					<Description text="Weekly conversations with industry leaders, exploring the future of technology." />
					<LatestEpisode
						episode={{
							number: 127,
							title: 'Building at Scale with Next.js',
							guest: {
								name: 'Guillermo Rauch',
								avatar: 'https://i.pravatar.cc/100?img=60',
								role: 'CEO at Vercel',
							},
							duration: '58 min',
						}}
					/>
					<PlatformLinks platforms={['Spotify', 'Apple', 'YouTube']} />
					<Stats
						items={[
							{ value: '127', label: 'Episodes' },
							{ value: '500K+', label: 'Downloads' },
							{ value: '4.9', label: 'Rating' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface EyebrowProps {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

const Eyebrow = ({ label, icon: Icon }: EyebrowProps) => (
	<Badge variant="secondary" className="px-4 py-1.5">
		<Icon className="size-3.5 mr-2" />
		{label}
	</Badge>
);

interface TitleProps {
	text: string;
}

const Title = ({ text }: TitleProps) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text}
	</h1>
);

interface DescriptionProps {
	text: string;
}

const Description = ({ text }: DescriptionProps) => (
	<p className="text-lg @md:text-xl text-muted-foreground max-w-xl">{text}</p>
);

interface Guest {
	name: string;
	avatar: string;
	role: string;
}

interface Episode {
	number: number;
	title: string;
	guest: Guest;
	duration: string;
}

interface LatestEpisodeProps {
	episode: Episode;
}

const LatestEpisode = ({ episode }: LatestEpisodeProps) => (
	<div className="w-full max-w-lg bg-card rounded-2xl border p-5 @md:p-6 mt-2">
		<div className="flex items-center justify-between mb-4">
			<Badge variant="outline" className="text-xs">
				EP {episode.number}
			</Badge>
			<span className="text-xs text-muted-foreground flex items-center gap-1">
				<Clock className="size-3" />
				{episode.duration}
			</span>
		</div>
		<p className="font-semibold text-lg mb-4">{episode.title}</p>
		<div className="flex items-center gap-3 mb-4">
			<Avatar className="size-10">
				<AvatarImage src={episode.guest.avatar} alt={episode.guest.name} />
				<AvatarFallback>{episode.guest.name[0]}</AvatarFallback>
			</Avatar>
			<div className="text-left">
				<p className="text-sm font-medium">{episode.guest.name}</p>
				<p className="text-xs text-muted-foreground">{episode.guest.role}</p>
			</div>
		</div>
		<div className="flex items-center gap-3">
			<Button size="icon" className="size-10 rounded-full shrink-0">
				<Play className="size-4 ml-0.5" />
			</Button>
			<div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
				<div className="h-full w-0 bg-primary rounded-full" />
			</div>
			<span className="text-xs text-muted-foreground">0:00</span>
		</div>
	</div>
);

interface PlatformLinksProps {
	platforms: string[];
}

const PlatformLinks = ({ platforms }: PlatformLinksProps) => (
	<div className="flex flex-wrap justify-center gap-3">
		{platforms.map((platform) => (
			<Button key={platform} variant="outline" size="sm" asChild>
				<Link href={`/${platform.toLowerCase()}`}>{platform}</Link>
			</Button>
		))}
	</div>
);

interface StatItem {
	value: string;
	label: string;
}

interface StatsProps {
	items: StatItem[];
}

const Stats = ({ items }: StatsProps) => (
	<div className="flex gap-8 @md:gap-12 mt-4">
		{items.map((stat) => (
			<div key={stat.label} className="text-center">
				<p className="text-2xl @md:text-3xl font-bold">{stat.value}</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);
