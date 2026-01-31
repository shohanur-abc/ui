import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	CheckCircle2,
	Clock,
	Rocket,
	Users,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @3xl:grid-cols-2 gap-12 @xl:gap-16 items-center">
					<ImpactMetrics
						stats={[
							{
								icon: Rocket,
								value: '50+',
								label: 'Projects Shipped',
								description: 'Successfully delivered',
							},
							{
								icon: Users,
								value: '1M+',
								label: 'Users Reached',
								description: 'Across all projects',
							},
							{
								icon: Zap,
								value: '99.9%',
								label: 'Uptime',
								description: 'System reliability',
							},
							{
								icon: Clock,
								value: '<100ms',
								label: 'Response Time',
								description: 'Average API latency',
							},
						]}
					/>

					<ValueProposition
						eyebrow="Why Work With Me"
						title="Results-Driven Development"
						description="I focus on delivering measurable business outcomes through high-quality code and user-centered design."
						benefits={[
							'Clean, maintainable, and scalable code',
							'Strong focus on performance and accessibility',
							'Excellent communication and collaboration',
							'Commitment to deadlines and quality',
							'Continuous learning and improvement',
						]}
						cta={{ label: 'Start a Conversation', href: '#contact' }}
					/>
				</div>
			</div>
		</section>
	);
}

interface StatItem {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
	description: string;
}

const ImpactMetrics = ({ stats }: { stats: StatItem[] }) => (
	<div className="grid grid-cols-2 gap-4 @md:gap-6">
		{stats.map((stat, i) => (
			<StatCard key={i} {...stat} />
		))}
	</div>
);

const StatCard = ({ icon: Icon, value, label, description }: StatItem) => (
	<Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
		<CardContent className="p-5 @md:p-6 text-center">
			<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
				<Icon className="size-6 text-primary group-hover:text-primary-foreground transition-colors" />
			</div>
			<p className="text-3xl @md:text-4xl font-bold mb-1">{value}</p>
			<p className="font-medium text-sm mb-1">{label}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

interface ValuePropositionProps {
	eyebrow: string;
	title: string;
	description: string;
	benefits: string[];
	cta: { label: string; href: string };
}

const ValueProposition = ({
	eyebrow,
	title,
	description,
	benefits,
	cta,
}: ValuePropositionProps) => (
	<div>
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg mb-6 leading-relaxed">
			{description}
		</p>

		<ul className="space-y-3 mb-8">
			{benefits.map((benefit, i) => (
				<li key={i} className="flex items-center gap-3">
					<CheckCircle2 className="size-5 text-primary shrink-0" />
					<span className="text-sm">{benefit}</span>
				</li>
			))}
		</ul>

		<Button size="lg" asChild>
			<Link href={cta.href}>
				{cta.label}
				<ArrowRight className="size-4 ml-2" />
			</Link>
		</Button>
	</div>
);
