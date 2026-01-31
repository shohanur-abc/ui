import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Cpu, Lightbulb, Target } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-3xl mx-auto text-center">
					<ProfileImage
						src="https://picsum.photos/seed/about-centered12/400/400"
						fallback="RJ"
					/>
					<Title text="Ryan Johnson" />
					<Role text="AI/ML Engineer" />
					<Description text="I build intelligent systems that solve real-world problems. From recommendation engines to computer vision, I specialize in bringing machine learning from research to production." />
					<FocusAreas
						items={[
							{ icon: Cpu, label: 'Deep Learning' },
							{ icon: Target, label: 'Computer Vision' },
							{ icon: Lightbulb, label: 'NLP' },
							{ icon: BookOpen, label: 'MLOps' },
						]}
					/>
					<Publications items={['NeurIPS 2024', 'CVPR 2023', 'ICML 2023']} />
					<CTA label="View Research" href="/research" icon={ArrowRight} />
				</div>
			</div>
		</section>
	);
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
	<Avatar className="size-28 @md:size-36 mx-auto mb-6 ring-2 ring-primary/30">
		<AvatarImage src={src} alt="Profile" />
		<AvatarFallback className="text-3xl bg-primary text-primary-foreground font-bold">
			{fallback}
		</AvatarFallback>
	</Avatar>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">
		{text}
	</h1>
);

const Role = ({ text }: { text: string }) => (
	<p className="text-lg @md:text-xl text-primary font-medium mb-6">{text}</p>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
		{text}
	</p>
);

interface FocusItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

const FocusAreas = ({ items }: { items: FocusItem[] }) => (
	<div className="flex flex-wrap justify-center gap-4 mb-8">
		{items.map(({ icon: Icon, label }, i) => (
			<div
				key={i}
				className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full"
			>
				<Icon className="size-4 text-primary" />
				<span className="text-sm font-medium">{label}</span>
			</div>
		))}
	</div>
);

const Publications = ({ items }: { items: string[] }) => (
	<div className="mb-10">
		<p className="text-sm text-muted-foreground mb-3">Published at:</p>
		<div className="flex flex-wrap justify-center gap-2">
			{items.map((pub) => (
				<Badge key={pub} variant="outline">
					{pub}
				</Badge>
			))}
		</div>
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
