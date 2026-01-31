import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Briefcase, GraduationCap, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<Eyebrow text="Hello, I'm" />
					<Title text="Jessica Park" />
					<Role text="Product Designer & Strategist" />
					<ProfileImage
						src="https://picsum.photos/seed/about-centered8/800/400"
						alt="Jessica Park"
					/>
					<Highlights
						items={[
							{ icon: Briefcase, label: '8+ Years Experience' },
							{ icon: GraduationCap, label: 'Stanford MBA' },
							{ icon: Heart, label: '50+ Happy Clients' },
						]}
					/>
					<Separator className="my-8 max-w-md mx-auto" />
					<Description text="I help startups and enterprises transform complex problems into elegant solutions. My approach combines strategic thinking with hands-on design to create products that users love and businesses value." />
					<CTA
						items={[
							{ label: 'View Case Studies', href: '/work', icon: ArrowRight },
							{
								label: 'About My Process',
								href: '/process',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<p className="text-sm @md:text-base text-muted-foreground mb-2">{text}</p>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-2">
		{text}
	</h1>
);

const Role = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-primary font-medium mb-8">{text}</p>
);

const ProfileImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden mb-8">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

interface HighlightItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

const Highlights = ({ items }: { items: HighlightItem[] }) => (
	<div className="flex flex-wrap justify-center gap-4 @md:gap-6">
		{items.map(({ icon: Icon, label }, i) => (
			<Badge key={i} variant="secondary" className="px-4 py-2 text-sm">
				<Icon className="size-4 mr-2" />
				{label}
			</Badge>
		))}
	</div>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
		{text}
	</p>
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
