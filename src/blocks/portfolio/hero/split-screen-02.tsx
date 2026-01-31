import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ArrowRight,
	Calendar,
	Code2,
	Github,
	Linkedin,
	Mail,
	MapPin,
	Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType, FC } from 'react';

export default function Main() {
	return (
		<section className="@container relative min-h-screen flex items-center py-16 @md:py-20 @3xl:py-32 overflow-hidden">
			<BackgroundDecorative />

			<div className="relative mx-auto px-4 @sm:px-6 @lg:px-8 @3xl:px-12 max-w-7xl w-full">
				<ul className="grid @3xl:grid-cols-2 gap-10 @lg:gap-12 @4xl:gap-16 @5xl:gap-20 items-center">
					{/* Left: Profile Image */}
					<li className="flex justify-center @3xl:justify-start order-1">
						<HeroImage initials="SR" />
					</li>

					{/* Right: Content */}
					<li className="space-y-6 @md:space-y-8 order-2 text-center @3xl:text-left">
						<div className="space-y-5 @md:space-y-6">
							<Eyebrow icon={Code2} text="Full-Stack Developer" />
							<Title text="Hi, I'm John Doe" />
							<Description text="A passionate Full-Stack Developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions." />
						</div>

						<MetaInfo
							items={[
								{ icon: MapPin, text: 'San Francisco, CA' },
								{ icon: Mail, text: 'hello@johndoe.com' },
								{ icon: Calendar, text: 'Available from Jan 2025' },
							]}
						/>

						<CTA
							items={[
								{ label: 'View Projects', href: '#projects', icon: ArrowRight },
								{ label: 'Contact', href: '#contact', variant: 'outline' },
							]}
						/>

						<SocialLinks
							items={[
								{ icon: Github, href: '#', label: 'GitHub' },
								{ icon: Linkedin, href: '#', label: 'LinkedIn' },
								{ icon: Twitter, href: '#', label: 'Twitter' },
							]}
						/>
					</li>
				</ul>
			</div>
		</section>
	);
}

interface HeroImageProps {
	initials: string;
	src?: string;
}

const HeroImage: FC<HeroImageProps> = ({
	initials,
	src = 'https://avatars.githubusercontent.com/u/252440198?v=4',
}) => (
	<div className="relative">
		{/* Decorative ring */}
		<div className="absolute inset-0 rounded-full bg-linear-to-br from-primary via-primary/50 to-primary/20 blur-2xl opacity-40 animate-pulse"></div>

		<div className="relative w-64 h-64 @sm:w-72 @sm:h-72 @md:w-80 @md:h-80 @xl:w-80 @xl:h-80 @4xl:w-95 @4xl:h-95">
			<div className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-primary/60 opacity-20"></div>
			<div className="absolute inset-3 rounded-full overflow-hidden border-4 border-background shadow-2xl bg-gradient-to-br from-primary/10 to-primary/5">
				<Avatar className="w-full h-full rounded-none">
					<AvatarImage src={src} className="object-cover w-full h-full" />
					<AvatarFallback className="w-full h-full text-6xl @sm:text-7xl @md:text-8xl rounded-none bg-gradient-to-br from-primary/20 to-primary/5">
						{initials}
					</AvatarFallback>
				</Avatar>
			</div>
		</div>

		{/* Status Badge */}
		<div className="absolute top-4 @md:top-6 -left-3 @md:-left-4 px-3 @md:px-4 py-1 @md:py-1.5 bg-background/50 rounded-full border-2 border-primary/20 shadow-xl backdrop-blur-sm -rotate-35 animate-bounce">
			<div className="flex items-center gap-2 @md:gap-2.5">
				<span className="relative flex h-2.5 w-2.5 @md:h-3 @md:w-3">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
					<span className="relative inline-flex rounded-full h-2.5 w-2.5 @md:h-3 @md:w-3 bg-green-500"></span>
				</span>
				<span className="text-xs @md:text-sm font-semibold whitespace-nowrap">
					Available for work
				</span>
			</div>
		</div>
	</div>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge
		variant="outline"
		className="inline-flex items-center gap-1.5 px-3 @md:px-4 py-1 @md:py-1.5 text-sm font-medium border-primary/30 bg-primary/5"
	>
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @2xl:text-5xl @3xl:@max-4xl:text-4xl font-bold leading-tight tracking-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @4xl:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto @3xl:mx-0">
		{text}
	</p>
);

interface MetaItem {
	icon: ComponentType<{ className?: string }>;
	text: string;
}

const MetaInfo = ({ items }: { items: MetaItem[] }) => (
	<div className="flex flex-wrap justify-center @3xl:justify-start gap-x-4 @md:gap-x-6 gap-y-2 @md:gap-y-3 text-sm text-muted-foreground">
		{items.map(({ icon: Icon, text }, i) => (
			<span
				key={i}
				className="flex items-center gap-2 hover:text-foreground transition-colors"
			>
				<Icon className="size-4 text-primary" />
				{text}
			</span>
		))}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		variant?: React.ComponentProps<typeof Button>['variant'];
		icon?: React.ComponentType<{ className?: string }>;
	}[];
}) => (
	<div className="flex flex-col @sm:flex-row items-center justify-center @3xl:justify-start gap-3 @md:gap-4 pt-2 @md:pt-4">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2 px-6 @md:px-8 h-11  text-base font-semibold shadow-lg hover:shadow-xl transition-all"
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

interface SocialLink {
	href: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

const SocialLinks = ({ items }: { items: SocialLink[] }) => (
	<div className="flex items-center gap-2 @md:gap-3">
		{items.map(({ icon: Icon, href, label }) => (
			<Button
				key={label}
				variant="outline"
				size="icon"
				className="rounded-full h-10 w-10 @md:h-12 @md:w-12 border-2 hover:border-primary hover:bg-primary/5 transition-all"
				asChild
			>
				<Link href={href} aria-label={label}>
					<Icon className="size-4 @md:size-5" />
				</Link>
			</Button>
		))}
	</div>
);

const BackgroundDecorative = () => (
	<>
		<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
		<div className="absolute top-20 -right-20 w-56 h-56 @md:w-72 @md:h-72 bg-primary/10 rounded-full blur-3xl rotate-45"></div>
		<div className="absolute -bottom-20 -left-20 w-72 h-72 @md:w-96 @md:h-96 bg-primary/5 rounded-full blur-3xl -rotate-12"></div>
	</>
);
