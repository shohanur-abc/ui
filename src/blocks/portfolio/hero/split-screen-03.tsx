import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Palette, Play } from 'lucide-react';
import Link from 'next/link';
import { ComponentType, FC } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="min-h-screen grid @3xl:grid-cols-2">
				{/* Left Side - Content */}
				<div className="flex items-center justify-center py-12 @md:py-16 @xl:py-20 @3xl:py-24 px-4 @sm:px-6 @2xl:px-8">
					<div className="max-w-xl">
						<Eyebrow icon={Palette} text="Digital Product Designer" />
						<Title text="Design. Develop. Deploy." />
						<Description text="I'm Marcus Lee, a designer and developer who believes that great products come from the perfect blend of aesthetics and functionality." />

						<CTA
							items={[
								{ label: 'View My Work', href: '#work', icon: ArrowRight },
								{ label: 'Watch Reel', href: '#reel', icon: Play },
							]}
						/>

						<Stats
							items={[
								{ value: '120+', label: 'Projects Done' },
								{ value: '6 Years', label: 'Experience' },
								{ value: '45+', label: 'Happy Clients' },
							]}
						/>
					</div>
				</div>

				{/* Right Side - Image/Visual */}
				<div className="relative bg-linear-to-br from-primary/10 via-primary/5 to-background flex items-center justify-center p-8 @md:p-12 @xl:p-16">
					<HeroImage alt="Marcus Lee" fallback="ML" />
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
	<Badge
		variant="outline"
		className="inline-flex items-center gap-1.5 mb-4 @md:mb-5 @xl:mb-6"
	>
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl @3xl:@max-4xl:text-4xl font-bold mb-4 @md:mb-5 @xl:mb-6 leading-tight tracking-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground mb-8 @md:mb-10 @xl:mb-12 leading-relaxed">
		{text}
	</p>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: React.ComponentType<{ className?: string }>;
		variant?: React.ComponentProps<typeof Button>['variant'];
	}[];
}) => (
	<div className="flex flex-wrap gap-3 @md:gap-4 mb-8 @md:mb-10 @xl:mb-12">
		{items.map(({ label, href, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				className="gap-2"
				variant={i === 0 ? 'default' : 'outline'}
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

interface StatItem {
	value: string;
	label: string;
}

const Stats = ({ items }: { items: StatItem[] }) => (
	<div className="flex items-center gap-6 @md:gap-8 pt-4 @md:pt-6 border-t">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center @3xl:text-left">
				<div className="text-xl @md:text-2xl font-bold">{value}</div>
				<div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

interface HeroImageProps {
	src?: string;
	alt?: string;
	fallback?: string;
}

const HeroImage: FC<HeroImageProps> = ({
	src = 'https://avatars.githubusercontent.com/u/252440198?v=4',
	alt = 'Profile',
	fallback = 'ML',
}) => (
	<div className="relative w-full max-w-md aspect-square">
		<div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5 rounded-3xl rotate-6" />
		<div className="absolute inset-0 bg-card border-2 rounded-3xl shadow-2xl flex items-center justify-center">
			<Avatar className="size-56">
				<AvatarImage src={src} alt={alt} className="rounded-2xl" />
				<AvatarFallback className="rounded-2xl bg-linear-to-br from-primary to-primary/60 text-4xl @sm:text-5xl font-bold text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
		</div>
	</div>
);
