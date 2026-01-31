import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, Coffee, Globe, Heart, Music } from 'lucide-react';
import Image from 'next/image';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-4">
					<ProfileCard
						src="https://picsum.photos/seed/bento3/400/400"
						fallback="AT"
						name="Alex Turner"
						role="UX Designer"
						className="@sm:col-span-2"
					/>
					<QuoteCard
						text="Design is not just what it looks like—design is how it works."
						className="@lg:col-span-1 @xl:col-span-2"
					/>
					<StatsCard
						items={[
							{ value: '8+', label: 'Years' },
							{ value: '200+', label: 'Projects' },
						]}
					/>
					<HobbiesCard
						items={[
							{ icon: Coffee, label: 'Coffee' },
							{ icon: Music, label: 'Music' },
							{ icon: BookOpen, label: 'Books' },
						]}
					/>
					<ImageCard
						src="https://picsum.photos/seed/bento3b/600/400"
						alt="Working"
						className="@sm:col-span-2 @lg:col-span-1"
					/>
					<AchievementsCard
						items={[
							{ icon: Award, text: 'Red Dot Award 2023' },
							{ icon: Globe, text: 'Featured on Awwwards' },
							{ icon: Heart, text: '10K+ Dribbble Likes' },
						]}
						className="@xl:col-span-2"
					/>
				</div>
			</div>
		</section>
	);
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	className?: string;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	className,
}: ProfileCardProps) => (
	<Card className={className}>
		<CardContent className="p-6 flex items-center gap-6">
			<Avatar className="size-20 @sm:size-24 ring-4 ring-border">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<div>
				<h1 className="text-2xl @sm:text-3xl font-bold mb-1">{name}</h1>
				<p className="text-muted-foreground">{role}</p>
				<Badge variant="secondary" className="mt-2">
					Available
				</Badge>
			</div>
		</CardContent>
	</Card>
);

interface QuoteCardProps {
	text: string;
	className?: string;
}

const QuoteCard = ({ text, className }: QuoteCardProps) => (
	<Card className={`bg-muted/50 border-none ${className}`}>
		<CardContent className="p-6 flex items-center h-full">
			<p className="text-lg @lg:text-xl italic text-muted-foreground leading-relaxed">
				&ldquo;{text}&rdquo;
			</p>
		</CardContent>
	</Card>
);

interface StatItem {
	value: string;
	label: string;
}

const StatsCard = ({ items }: { items: StatItem[] }) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="p-6 flex justify-around items-center h-full">
			{items.map(({ value, label }, i) => (
				<div key={i} className="text-center">
					<div className="text-3xl font-bold">{value}</div>
					<div className="text-sm opacity-80">{label}</div>
				</div>
			))}
		</CardContent>
	</Card>
);

interface HobbyItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

const HobbiesCard = ({ items }: { items: HobbyItem[] }) => (
	<Card>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-3">When I'm not designing</p>
			<div className="flex gap-3">
				{items.map(({ icon: Icon, label }) => (
					<div key={label} className="text-center">
						<div className="size-10 rounded-full bg-muted flex items-center justify-center mb-1">
							<Icon className="size-4" />
						</div>
						<span className="text-xs text-muted-foreground">{label}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface ImageCardProps {
	src: string;
	alt: string;
	className?: string;
}

const ImageCard = ({ src, alt, className }: ImageCardProps) => (
	<Card className={`overflow-hidden py-0 ${className}`}>
		<CardContent className="p-0 h-full relative min-h-40">
			<Image src={src} alt={alt} fill className="object-cover" />
		</CardContent>
	</Card>
);

interface AchievementItem {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

interface AchievementsCardProps {
	items: AchievementItem[];
	className?: string;
}

const AchievementsCard = ({ items, className }: AchievementsCardProps) => (
	<Card className={className}>
		<CardContent className="p-6">
			<p className="text-sm font-medium mb-4">Achievements</p>
			<div className="space-y-3">
				{items.map(({ icon: Icon, text }, i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
							<Icon className="size-4 text-primary" />
						</div>
						<span className="text-sm">{text}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);
