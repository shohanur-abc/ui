import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ComponentType, FC } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="grid @3xl:grid-cols-[1fr_1.1fr] gap-0 min-h-screen">
				{/* Image Section */}
				<div className="relative bg-linear-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center p-8 @md:p-12 @xl:p-16">
					<HeroImage
						initials="RK"
						achievements={[
							{ text: 'Award-Winning Designer' },
							{ text: '10+ Years Experience' },
							{ text: '200+ Projects Delivered' },
						]}
					/>
					<BackgroundDecorative />
				</div>

				{/* Content Section */}
				<div className="flex items-center justify-center py-12 @md:py-16 @xl:py-20 @3xl:py-24 px-4 @sm:px-6 @md:px-8 @xl:px-12">
					<div className="max-w-xl">
						<Eyebrow icon={Briefcase} text="Available for Hire" />
						<Title text="Ryan Kim" />
						<Subtitle text="UX/UI Designer & Creative Director" />
						<Description text="I help brands and businesses create meaningful digital experiences through strategic design and creative thinking. Let's build something extraordinary together." />

						<ServiceList
							services={[
								{
									title: 'User-Centered Design',
									description: 'Creating intuitive experiences that users love',
								},
								{
									title: 'Brand Strategy',
									description: 'Building strong brand identities',
								},
								{
									title: 'Product Development',
									description: 'From concept to launch and beyond',
								},
							]}
						/>

						<CTA
							items={[
								{
									label: 'View Case Studies',
									href: '#cases',
									icon: ArrowRight,
								},
								{ label: 'Contact Me', href: '#contact' },
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
interface AchievementItem {
	text: string;
}

interface HeroImageProps {
	initials?: string;
	src?: string;
	achievements: AchievementItem[];
}

const HeroImage: FC<HeroImageProps> = ({
	initials = 'RK',
	src = 'https://avatars.githubusercontent.com/u/252440198?v=4',
	achievements,
}) => (
	<div className="text-center text-primary-foreground">
		<Avatar className="size-56 mx-auto mb-6 @md:mb-8">
			<AvatarImage src={src} alt="Profile" />
			<AvatarFallback className="bg-white/10 text-6xl @md:text-7xl font-bold">
				{initials}
			</AvatarFallback>
		</Avatar>
		<ul className="space-y-3 @md:space-y-4 max-w-md mx-auto">
			{achievements.map(({ text }) => (
				<li
					key={text}
					className="flex items-center justify-center gap-2 @md:gap-3"
				>
					<CheckCircle2 className="size-4 @md:size-5" />
					<span className="text-sm @md:text-base">{text}</span>
				</li>
			))}
		</ul>
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
		className="inline-flex items-center gap-1.5 mb-4 @md:mb-5 @xl:mb-6"
	>
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl @3xl:@max-5xl:text-4xl font-bold mb-3 @md:mb-4 leading-tight tracking-tight">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<div className="text-lg @sm:text-xl @md:text-2xl @xl:text-3xl @3xl:@max-5xl:text-xl font-medium mb-4 @md:mb-5 @xl:mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
		{text}
	</div>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground mb-8 @md:mb-10 @xl:mb-12 leading-relaxed">
		{text}
	</p>
);

interface Service {
	title: string;
	description: string;
}

const ServiceList = ({ services }: { services: Service[] }) => (
	<ul className="space-y-2.5 @md:space-y-3 mb-8 @md:mb-10 @xl:mb-12">
		{services.map(({ title, description }) => (
			<li key={title} className="flex items-start gap-2.5 @md:gap-3">
				<div className="size-5 @md:size-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
					<div className="size-1.5 @md:size-2 rounded-full bg-primary" />
				</div>
				<div>
					<div className="font-medium text-sm @md:text-base">{title}</div>
					<div className="text-xs @md:text-sm text-muted-foreground">
						{description}
					</div>
				</div>
			</li>
		))}
	</ul>
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
	<div className="flex flex-wrap gap-3 @md:gap-4">
		{items.map(({ label, href, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={i === 0 ? 'default' : 'outline'}
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

const BackgroundDecorative = () => (
	<>
		<div className="absolute top-8 @md:top-10 left-8 @md:left-10 size-20 @md:size-24 bg-white/5 rounded-2xl rotate-12" />
		<div className="absolute bottom-8 @md:bottom-10 right-8 @md:right-10 size-24 @md:size-32 bg-white/5 rounded-full" />
	</>
);
