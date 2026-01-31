import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden min-h-[90vh]"
			data-theme="emerald"
		>
			<BackgroundImage src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920" />
			<div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 @sm:px-6 @2xl:px-8 py-20">
				<Content
					eyebrow="Free Course"
					title="Master React in 30 Days"
					description="A complete learning path from fundamentals to advanced patterns. Build real projects and become job-ready."
					stats={[
						{ icon: BookOpen, label: '42 Lessons' },
						{ icon: Clock, label: '12 Hours' },
						{ icon: Users, label: '25K+ Enrolled' },
					]}
					features={[
						'Project-based learning',
						'Certificate included',
						'Lifetime access',
					]}
				/>
			</div>
		</section>
	);
}

interface BackgroundImageProps {
	src: string;
}

const BackgroundImage = ({ src }: BackgroundImageProps) => (
	<>
		<Image src={src} alt="Background" fill className="object-cover" priority />
		<div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
	</>
);

interface Stat {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

interface ContentProps {
	eyebrow: string;
	title: string;
	description: string;
	stats: Stat[];
	features: string[];
}

const Content = ({
	eyebrow,
	title,
	description,
	stats,
	features,
}: ContentProps) => (
	<div className="max-w-4xl mx-auto">
		<Badge className="mb-6 bg-primary text-primary-foreground border-0">
			{eyebrow}
		</Badge>
		<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold text-white mb-6">
			{title}
		</h1>
		<p className="text-lg @md:text-xl text-white/80 mb-8 max-w-2xl">
			{description}
		</p>
		<div className="flex flex-wrap gap-6 mb-8">
			{stats.map((stat) => (
				<div key={stat.label} className="flex items-center gap-2 text-white/80">
					<stat.icon className="size-5" />
					<span>{stat.label}</span>
				</div>
			))}
		</div>
		<div className="flex flex-wrap gap-4 mb-10">
			{features.map((feature) => (
				<span
					key={feature}
					className="flex items-center gap-2 text-white/70 text-sm"
				>
					<CheckCircle2 className="size-4 text-primary" />
					{feature}
				</span>
			))}
		</div>
		<div className="flex flex-col @sm:flex-row gap-4">
			<Button asChild size="lg" className="text-base px-8">
				<Link href="#">Start Learning Free</Link>
			</Button>
			<Button
				asChild
				size="lg"
				variant="outline"
				className="text-base px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
			>
				<Link href="#">View Curriculum</Link>
			</Button>
		</div>
	</div>
);
