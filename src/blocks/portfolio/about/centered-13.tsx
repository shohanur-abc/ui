import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Clock, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<StatusIndicator text="Open for Projects" />
					<ProfileImage
						src="https://picsum.photos/seed/about-centered13/400/400"
						fallback="CP"
					/>
					<Title text="Chris Peterson" />
					<Role text="Freelance Mobile Developer" />
					<Description text="I specialize in building beautiful, performant mobile apps for iOS and Android. From concept to App Store, I handle the entire development lifecycle." />
					<Separator className="my-8 max-w-xs mx-auto" />
					<Availability
						items={[
							{ icon: Clock, text: 'Response within 24h' },
							{ icon: MessageCircle, text: 'Free consultation' },
							{ icon: Mail, text: 'chris@example.com' },
						]}
					/>
					<Technologies
						items={['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase']}
					/>
					<CTA
						items={[
							{ label: 'Start a Project', href: '/contact', icon: ArrowRight },
							{ label: 'View Portfolio', href: '/work', variant: 'outline' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const StatusIndicator = ({ text }: { text: string }) => (
	<Badge className="mb-6 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
		<span className="size-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
		{text}
	</Badge>
);

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
	<Avatar className="size-32 @md:size-40 mx-auto mb-6 ring-4 ring-border">
		<AvatarImage src={src} alt="Profile" />
		<AvatarFallback className="text-3xl @md:text-4xl bg-primary text-primary-foreground font-bold">
			{fallback}
		</AvatarFallback>
	</Avatar>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-2">
		{text}
	</h1>
);

const Role = ({ text }: { text: string }) => (
	<p className="text-xl @md:text-2xl text-muted-foreground font-light mb-6">
		{text}
	</p>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
		{text}
	</p>
);

interface AvailabilityItem {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}

const Availability = ({ items }: { items: AvailabilityItem[] }) => (
	<div className="flex flex-wrap justify-center gap-6 mb-8">
		{items.map(({ icon: Icon, text }, i) => (
			<div
				key={i}
				className="flex items-center gap-2 text-sm text-muted-foreground"
			>
				<Icon className="size-4" />
				<span>{text}</span>
			</div>
		))}
	</div>
);

const Technologies = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap justify-center gap-2 mb-10">
		{items.map((tech) => (
			<Badge key={tech} variant="secondary">
				{tech}
			</Badge>
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
