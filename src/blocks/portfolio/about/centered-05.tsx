import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<ProfileImage
						src="https://picsum.photos/seed/about-centered5/400/400"
						fallback="DK"
					/>
					<Title text="David Kim" />
					<Subtitle text="Software Engineer at Google" />
					<MetaInfo
						items={[
							{ icon: MapPin, text: 'Seattle, WA' },
							{ icon: Calendar, text: '10+ Years Experience' },
						]}
					/>
					<Separator className="my-8 max-w-xs mx-auto" />
					<Paragraphs
						items={[
							"I'm a software engineer with a deep passion for building developer tools and infrastructure. Currently at Google, I work on making development workflows faster and more enjoyable for millions of developers worldwide.",
							"My journey in tech started with building games in my basement. That curiosity evolved into a career spanning startups to tech giants, where I've learned that great software is as much about people as it is about code.",
						]}
					/>
					<CTA
						items={[
							{ label: 'Read My Blog', href: '/blog', icon: ArrowRight },
							{ label: 'Contact Me', href: '/contact', variant: 'outline' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
	<Avatar className="size-24 @sm:size-28 @md:size-32 mx-auto mb-6 ring-4 ring-border">
		<AvatarImage src={src} alt="Profile" />
		<AvatarFallback className="text-2xl @md:text-3xl bg-muted font-bold">
			{fallback}
		</AvatarFallback>
	</Avatar>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-muted-foreground mb-4">{text}</p>
);

interface MetaItem {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

const MetaInfo = ({ items }: { items: MetaItem[] }) => (
	<div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
		{items.map(({ icon: Icon, text }, i) => (
			<span key={i} className="flex items-center gap-1.5">
				<Icon className="size-4" />
				{text}
			</span>
		))}
	</div>
);

const Paragraphs = ({ items }: { items: string[] }) => (
	<div className="space-y-4 text-base @md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
		{items.map((text, i) => (
			<p key={i}>{text}</p>
		))}
	</div>
);

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, icon: Icon, variant }, i) => (
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
);
