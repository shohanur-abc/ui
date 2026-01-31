import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<ProfileImage
						src="https://picsum.photos/seed/about-centered7/400/400"
						fallback="AT"
					/>
					<StatusBadge text="Available for Freelance" />
					<Title text="Alex Thompson" />
					<Role text="Creative Developer" />
					<Description text="I blend creativity with code to build memorable digital experiences. From immersive animations to interactive websites, I love pushing the boundaries of what's possible on the web." />
					<Separator className="my-8 max-w-sm mx-auto" />
					<Services
						items={[
							'Interactive Websites',
							'WebGL Experiences',
							'Motion Design',
							'Creative Coding',
						]}
					/>
					<CTA label="Start a Project" href="/contact" icon={ArrowUpRight} />
				</div>
			</div>
		</section>
	);
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
	<Avatar className="size-32 @md:size-40 mx-auto mb-6 ring-4 ring-background shadow-2xl">
		<AvatarImage src={src} alt="Profile" />
		<AvatarFallback className="text-3xl @md:text-4xl bg-primary text-primary-foreground font-bold">
			{fallback}
		</AvatarFallback>
	</Avatar>
);

const StatusBadge = ({ text }: { text: string }) => (
	<Badge className="mb-4 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
		<span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
		{text}
	</Badge>
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
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
		{text}
	</p>
);

const Services = ({ items }: { items: string[] }) => (
	<div className="grid grid-cols-2 gap-3 text-left max-w-sm mx-auto mb-10">
		{items.map((service) => (
			<div key={service} className="flex items-center gap-2 text-sm">
				<CheckCircle2 className="size-4 text-primary shrink-0" />
				<span>{service}</span>
			</div>
		))}
	</div>
);

interface CTAProps {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
	<Button size="lg" className="gap-2" asChild>
		<Link href={href}>
			{label}
			<Icon className="size-4" />
		</Link>
	</Button>
);
