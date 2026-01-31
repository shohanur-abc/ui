import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, GraduationCap, Medal, Star, Trophy } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface CertificationItem {
	icon: ComponentType<{ className?: string }>;
	level: string;
	title: string;
	description: string;
	duration: string;
	badge: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={GraduationCap} text="Certifications" />
					<Title text="Become a Certified" highlight="Expert" />
					<Description text="Validate your skills with industry-recognized certifications and stand out from the crowd." />
				</div>

				<CertificationGrid
					items={[
						{
							icon: Medal,
							level: 'Foundation',
							title: 'Platform Essentials',
							description:
								'Master the fundamentals and core features of our platform.',
							duration: '4 hours',
							badge: 'Foundation Badge',
						},
						{
							icon: Star,
							level: 'Professional',
							title: 'Advanced Features',
							description:
								'Deep dive into automation, integrations, and analytics.',
							duration: '8 hours',
							badge: 'Professional Badge',
						},
						{
							icon: Trophy,
							level: 'Expert',
							title: 'Architecture & Scale',
							description:
								'Enterprise deployment, security, and optimization strategies.',
							duration: '16 hours',
							badge: 'Expert Badge',
						},
					]}
				/>

				<StatsBar
					stats={[
						{ value: '25K+', label: 'Certified Professionals' },
						{ value: '98%', label: 'Pass Rate' },
						{ value: '500+', label: 'Companies Trust Our Certs' },
					]}
				/>
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
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const CertificationGrid = ({ items }: { items: CertificationItem[] }) => (
	<div className="grid gap-6 @lg:grid-cols-3 mb-12">
		{items.map((cert) => (
			<Link
				key={cert.title}
				href={`/certifications/${cert.level.toLowerCase()}`}
			>
				<Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg">
					<CardContent className="p-6">
						<Badge variant="outline" className="mb-4">
							{cert.level}
						</Badge>
						<div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
							<cert.icon className="size-7 text-primary" />
						</div>
						<h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
							{cert.title}
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							{cert.description}
						</p>
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">{cert.duration}</span>
							<span className="text-primary font-medium flex items-center gap-1">
								Start Learning <ArrowRight className="size-3" />
							</span>
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);

const StatsBar = ({ stats }: { stats: { value: string; label: string }[] }) => (
	<div className="flex flex-wrap justify-center gap-8 @md:gap-16">
		{stats.map((stat) => (
			<div key={stat.label} className="text-center">
				<p className="text-2xl @md:text-3xl font-bold text-primary">
					{stat.value}
				</p>
				<p className="text-sm text-muted-foreground">{stat.label}</p>
			</div>
		))}
	</div>
);
