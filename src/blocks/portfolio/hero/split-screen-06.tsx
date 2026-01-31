'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { ComponentType, FC } from 'react';

export default function Component() {
	return (
		<section className="@container">
			<div className="grid @3xl:grid-cols-2 min-h-screen">
				<div className="flex items-center justify-center py-12 @md:py-16 @xl:py-20 @3xl:py-24 px-4 @sm:px-6 @md:px-8 @xl:px-12 bg-gradient-to-br from-background to-muted/20">
					<div className="max-w-lg w-full">
						<Eyebrow icon={Star} text="Product Designer" />
						<Title text="Turning Ideas Into Reality" />
						<Description text="Hey, I'm David Park - a designer who codes. I specialize in creating digital products that are both beautiful and functional." />

						<CTA
							items={[
								{
									label: 'View Projects',
									href: '#projects',
									icon: ArrowRight,
									variant: 'default',
								},
								{ label: 'About Me', href: '#about', variant: 'outline' },
							]}
						/>

						<Stats
							items={[
								{ label: 'Awards', value: '15+', icon: Award },
								{ label: 'Clients', value: '80+', icon: Users },
								{ label: 'Rating', value: '4.9', icon: Star },
							]}
						/>
					</div>
				</div>

				<div className="relative bg-primary/5 flex items-center justify-center p-8 @md:p-12 @xl:p-16">
					<HeroImage
						src="https://avatars.githubusercontent.com/u/252440198?v=4"
						alt="David Park"
						initials="DP"
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge className="inline-flex items-center gap-1.5 mb-4 @md:mb-5 @xl:mb-6">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @2xl:text-7xl @3xl:text-5xl @5xl:text-7xl font-bold mb-4 @md:mb-5 @xl:mb-6 leading-[1.05] tracking-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-lg text-muted-foreground mb-8 @md:mb-10 @xl:mb-12 leading-relaxed">
		{text}
	</p>
);

interface CTALink {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: React.ComponentProps<typeof Button>['variant'];
}

const CTA = ({ items }: { items: CTALink[] }) => (
	<div className="flex flex-wrap gap-3 @md:gap-4 mb-12 @md:mb-14 @xl:mb-16">
		{items.map(({ href, label, icon: Icon, variant = 'default' }) => (
			<Button key={label} asChild size="lg" variant={variant} className="gap-2">
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

interface StatItem {
	label: string;
	value: string;
	icon: ComponentType<{ className?: string }>;
}

const Stats = ({ items }: { items: StatItem[] }) => (
	<div className="grid grid-cols-3 gap-3 @md:gap-4">
		{items.map(({ label, value, icon: Icon }) => (
			<div
				key={label}
				className="text-center p-3 @md:p-4 rounded-lg bg-card border hover:border-primary/50 transition-colors"
			>
				<Icon className="size-5 @md:size-6 mx-auto mb-2 text-primary" />
				<div className="text-lg @md:text-xl font-bold">{value}</div>
				<div className="text-xs text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

interface HeroImageProps {
	src?: string;
	alt?: string;
	initials?: string;
}

const HeroImage: FC<HeroImageProps> = ({
	src,
	alt = 'Profile Image',
	initials = 'DP',
}) => (
	<div className="relative w-full max-w-lg">
		{/* Card container */}
		<div className="aspect-4/5 rounded-3xl @md:rounded-3xl bg-linear-to-br from-primary to-primary/40 shadow-2xl overflow-hidden">
			<div className="absolute inset-0 bg-grid-white/10" />

			{/* Avatar or Placeholder */}
			<div className="absolute inset-0 flex items-center justify-center">
				<Avatar className="w-full h-full rounded-3xl">
					<AvatarImage src={src} alt={alt} className="object-cover" />
					<AvatarFallback className="rounded-3xl bg-white/10 text-6xl @md:text-7xl font-bold text-primary-foreground">
						{initials}
					</AvatarFallback>
				</Avatar>
			</div>
		</div>

		{/* Decorative dots */}
		<div className="absolute -z-10 top-0 right-0 w-28 h-28 @md:w-32 @md:h-32 bg-primary/20 rounded-full blur-3xl" />
		<div className="absolute -z-10 bottom-0 left-0 w-32 h-32 @md:w-40 @md:h-40 bg-primary/10 rounded-full blur-3xl" />
	</div>
);
