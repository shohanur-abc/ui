import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Zap,
	Users,
	Trophy,
	Clock,
	Code,
	Palette,
	Server,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<BackgroundGrid />
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @lg:grid-cols-3 @2xl:grid-cols-4 gap-4 @md:gap-5">
					<HeroTextCard
						badgeIcon={Zap}
						badgeText="Full-Stack Developer"
						title="Building the future, one line at a time"
						description="Hi, I'm Alex. I create scalable web solutions that make an impact."
					/>
					<ProfileCard
						src="https://i.pravatar.cc/400?img=33"
						fallback="AK"
						name="Alex Kim"
						location="San Francisco, CA"
					/>
					<CTACard
						heading="Let's work together"
						items={[
							{ label: 'Start Project', href: '#contact', icon: ArrowRight },
						]}
					/>
					<StatCard icon={Users} value="200+" label="Happy Clients" />
					<StatCard icon={Trophy} value="50+" label="Awards Won" />
					<StatCard icon={Clock} value="10+" label="Years Active" />
					<SkillsCard
						title="Core Expertise"
						items={[
							{ icon: Code, label: 'Frontend Development' },
							{ icon: Server, label: 'Backend Systems' },
							{ icon: Palette, label: 'UI/UX Design' },
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const HeroTextCard = ({
	badgeIcon: BadgeIcon,
	badgeText,
	title,
	description,
}: {
	badgeIcon: ComponentType<{ className?: string }>;
	badgeText: string;
	title: string;
	description: string;
}) => (
	<Card className="@lg:col-span-2 @2xl:col-span-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 py-0">
		<CardContent className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-between h-full min-h-64">
			<Badge className="w-fit bg-white/20 text-white border-0 mb-4">
				<BadgeIcon className="size-3 mr-1" /> {badgeText}
			</Badge>
			<div>
				<h1 className="text-3xl @sm:text-4xl @xl:text-5xl font-bold mb-3 leading-tight">
					{title}
				</h1>
				<p className="text-primary-foreground/80 text-base @md:text-lg max-w-md">
					{description}
				</p>
			</div>
		</CardContent>
	</Card>
);

const ProfileCard = ({
	src,
	fallback,
	name,
	location,
}: {
	src?: string;
	fallback: string;
	name: string;
	location: string;
}) => (
	<Card className="@2xl:row-span-2 overflow-hidden py-0">
		<CardContent className="p-0 h-full">
			<ProfileImage
				src={src}
				fallback={fallback}
				name={name}
				location={location}
			/>
		</CardContent>
	</Card>
);

const CTACard = ({
	heading,
	items,
}: {
	heading: string;
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
	}[];
}) => (
	<Card className="py-0">
		<CardContent className="p-5 @md:p-6 flex flex-col justify-center h-full">
			<h3 className="font-semibold mb-3">{heading}</h3>
			<CTA items={items} />
		</CardContent>
	</Card>
);

const SkillsCard = ({
	title,
	items,
}: {
	title: string;
	items: { icon: ComponentType<{ className?: string }>; label: string }[];
}) => (
	<Card className="@lg:col-span-2 py-0">
		<CardContent className="p-5 @md:p-6">
			<h3 className="font-semibold mb-4">{title}</h3>
			<SkillsList items={items} />
		</CardContent>
	</Card>
);

const BackgroundGrid = () => (
	<div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30" />
);

const ProfileImage = ({
	src,
	fallback,
	name,
	location,
}: {
	src?: string;
	fallback: string;
	name: string;
	location: string;
}) => (
	<div className="relative h-full min-h-48">
		<Avatar className="w-full h-full rounded-none">
			<AvatarImage src={src} className="object-cover" />
			<AvatarFallback className="rounded-none text-4xl bg-primary/10">
				{fallback}
			</AvatarFallback>
		</Avatar>
		<div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border">
			<div className="font-semibold">{name}</div>
			<div className="text-xs text-muted-foreground">{location}</div>
		</div>
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
	}[];
}) => (
	<div className="flex gap-2">
		{items.map(({ label, href, icon: Icon }, i) => (
			<Button key={i} className="gap-2 w-full" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const StatCard = ({
	icon: Icon,
	value,
	label,
}: {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
}) => (
	<Card className="group hover:shadow-md hover:-translate-y-0.5 transition-all py-0">
		<CardContent className="p-5 @md:p-6 flex items-center gap-4">
			<div className="size-10 @md:size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
				<Icon className="size-5 @md:size-6 text-primary" />
			</div>
			<div>
				<div className="text-xl @md:text-2xl font-bold">{value}</div>
				<div className="text-xs text-muted-foreground">{label}</div>
			</div>
		</CardContent>
	</Card>
);

const SkillsList = ({
	items,
}: {
	items: { icon: ComponentType<{ className?: string }>; label: string }[];
}) => (
	<div className="grid @sm:grid-cols-3 gap-3">
		{items.map(({ icon: Icon, label }) => (
			<div
				key={label}
				className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
			>
				<Icon className="size-4 text-primary" />
				<span className="text-sm font-medium">{label}</span>
			</div>
		))}
	</div>
);
