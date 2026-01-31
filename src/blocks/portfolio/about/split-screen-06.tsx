import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Coffee, Code, Music } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-16">
					<ImageSection
						src="https://picsum.photos/seed/split6/800/1000"
						alt="Marcus Brown"
					/>
					<ContentSection
						eyebrow="The Person Behind The Code"
						title="Marcus Brown"
						role="Software Architect"
						description="Beyond the code, I'm a lifelong learner, coffee enthusiast, and jazz lover. I believe the best engineers are those who bring diverse perspectives to their work."
						hobbies={[
							{ icon: Coffee, label: 'Coffee Brewing' },
							{ icon: Music, label: 'Jazz Piano' },
							{ icon: BookOpen, label: 'Sci-Fi Novels' },
							{ icon: Code, label: 'Open Source' },
						]}
						funFacts={[
							"I've visited 30+ countries",
							'I speak 3 languages fluently',
							'I once built a robot that makes coffee',
						]}
						cta={{ label: 'Learn More', href: '/story', icon: ArrowRight }}
					/>
				</div>
			</div>
		</section>
	);
}

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

interface HobbyItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

interface CTAData {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface ContentSectionProps {
	eyebrow: string;
	title: string;
	role: string;
	description: string;
	hobbies: HobbyItem[];
	funFacts: string[];
	cta: CTAData;
}

const ContentSection = ({
	eyebrow,
	title,
	role,
	description,
	hobbies,
	funFacts,
	cta,
}: ContentSectionProps) => (
	<div className="flex flex-col justify-center">
		<Badge variant="outline" className="w-fit mb-4">
			{eyebrow}
		</Badge>
		<h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">
			{title}
		</h1>
		<p className="text-lg text-primary font-medium mb-6">{role}</p>
		<p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
		<div className="grid grid-cols-2 gap-3 mb-8">
			{hobbies.map(({ icon: Icon, label }) => (
				<Card key={label} className="bg-muted/50 border-none">
					<CardContent className="p-4 flex items-center gap-3">
						<Icon className="size-5 text-primary" />
						<span className="text-sm font-medium">{label}</span>
					</CardContent>
				</Card>
			))}
		</div>
		<div className="mb-8">
			<p className="text-sm font-medium mb-3">Fun Facts</p>
			<ul className="space-y-2">
				{funFacts.map((fact, i) => (
					<li
						key={i}
						className="flex items-start gap-2 text-sm text-muted-foreground"
					>
						<span className="text-primary">•</span>
						{fact}
					</li>
				))}
			</ul>
		</div>
		<Button size="lg" className="gap-2 w-fit" asChild>
			<Link href={cta.href}>
				{cta.label}
				<cta.icon className="size-4" />
			</Link>
		</Button>
	</div>
);
