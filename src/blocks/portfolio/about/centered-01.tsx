import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<ProfileImage
						src="https://picsum.photos/seed/about-centered/400/400"
						fallback="JD"
					/>
					<Eyebrow icon={Briefcase} text="Product Designer" />
					<Title text="John Doe" />
					<Subtitle text="Creating digital experiences that matter" />
					<Description text="I'm a product designer with over 8 years of experience crafting digital products. I specialize in user experience design, brand strategy, and creative direction for startups and Fortune 500 companies alike." />
					<Location icon={MapPin} text="San Francisco, CA" />
					<CTA
						items={[
							{ label: 'View My Work', href: '#work', icon: ArrowRight },
							{ label: 'Get In Touch', href: '#contact', variant: 'outline' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
	<Avatar className="size-28 @sm:size-32 @md:size-40 mx-auto mb-6 @md:mb-8 ring-4 ring-border shadow-xl">
		<AvatarImage src={src} alt="Profile" />
		<AvatarFallback className="text-3xl @md:text-4xl bg-primary text-primary-foreground font-bold">
			{fallback}
		</AvatarFallback>
	</Avatar>
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="secondary" className="mb-4 @md:mb-5">
		<Icon className="size-3.5 mr-1" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-3">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-xl @md:text-2xl text-muted-foreground font-light mb-6">
		{text}
	</p>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
		{text}
	</p>
);

const Location = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
		<Icon className="size-4" />
		<span>{text}</span>
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
