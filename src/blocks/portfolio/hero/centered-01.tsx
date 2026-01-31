import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-[80vh] flex items-center">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 w-full py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="max-w-4xl mx-auto">
					<div className="flex flex-col @md:flex-row gap-6 @lg:gap-8 items-center @md:items-start">
						<AvatarWithStatus initials="JD" />

						<div className="flex-1 text-center @md:text-left">
							<Eyebrow icon={Mail} text="Open to Work" />
							<Title text="Hi, I'm John Doe 👋" />
							<MetaInfo
								items={[
									{ icon: MapPin, text: 'San Francisco, CA' },
									{ icon: Mail, text: 'hello@johndoe.com' },
									{ icon: Calendar, text: 'Available from Jan 2025' },
								]}
							/>
							<Description text="A passionate Full-Stack Developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions." />
							<CTA
								items={[
									{
										label: 'View Portfolio',
										href: '#portfolio',
										icon: ArrowRight,
									},
									{
										label: 'Download Resume',
										href: '#resume',
										variant: 'outline',
									},
								]}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
interface AvatarWithStatusProps {
	initials: string;
	src?: string;
}

const AvatarWithStatus = ({ initials, src }: AvatarWithStatusProps) => (
	<div className="relative shrink-0">
		<Avatar className="size-28 @sm:size-32 @md:size-36 @lg:size-40 ring-4 ring-background shadow-xl">
			<AvatarImage src={src} />
			<AvatarFallback className="text-3xl @md:text-4xl bg-primary text-primary-foreground">
				{initials}
			</AvatarFallback>
		</Avatar>
		<div className="absolute -bottom-2 -right-2 size-7 @md:size-8 bg-green-500 rounded-full border-4 border-background" />
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
		variant="secondary"
		className="inline-flex items-center gap-1.5 bg-background/50 backdrop-blur-sm px-4 py-2 mb-6"
	>
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold mb-3 @md:mb-4 leading-tight">
		{text}
	</h1>
);

interface MetaItem {
	icon: ComponentType<{ className?: string }>;
	text: string;
}

const MetaInfo = ({ items }: { items: MetaItem[] }) => (
	<ul className="flex flex-wrap justify-center @md:justify-start gap-3 @lg:gap-4 mb-3 @md:mb-4 text-xs @sm:text-sm text-muted-foreground">
		{items.map(({ icon: Icon, text }, i) => (
			<li key={i} className="flex items-center gap-1">
				<Icon className="size-4" />
				{text}
			</li>
		))}
	</ul>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground mb-4 @md:mb-5 @lg:mb-6 max-w-xl leading-relaxed">
		{text}
	</p>
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
	<div className="flex flex-wrap justify-center @md:justify-start gap-3 @lg:gap-4">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				className="gap-2"
				variant={variant || 'default'}
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
