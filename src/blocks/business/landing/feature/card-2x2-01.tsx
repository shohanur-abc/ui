import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Award,
	BarChart3,
	Building2,
	CheckCircle2,
	Globe,
	Handshake,
	LineChart,
	Shield,
	Target,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface Feature {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	stat: string;
	statLabel: string;
}

interface Certification {
	name: string;
	icon: ComponentType<{ className?: string }>;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden bg-background">
			<div className="max-w-7xl relative mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @2xl:py-20">
				<div className="mb-10 @md:mb-12 @xl:mb-14 @3xl:mb-16 flex flex-col items-start gap-5 @md:gap-6 @xl:gap-8 @2xl:flex-row @2xl:items-end @2xl:justify-between">
					<div className="max-w-2xl">
						<Eyebrow icon={Building2} text="Enterprise Solutions" />
						<Title text="Driving Business Excellence Through Expert Consulting" />
						<Description text="Partner with industry-leading consultants who bring decades of experience transforming businesses across sectors." />
					</div>
					<CTA text="Schedule Consultation" href="/contact" />
				</div>

				<Features
					items={[
						{
							icon: Target,
							title: 'Strategic Planning',
							description:
								'Data-driven strategies tailored to your business goals with measurable KPIs and milestones.',
							stat: '40%',
							statLabel: 'Avg. growth',
						},
						{
							icon: BarChart3,
							title: 'Market Analysis',
							description:
								'In-depth market research and competitive analysis to identify opportunities and threats.',
							stat: '500+',
							statLabel: 'Markets analyzed',
						},
						{
							icon: Users,
							title: 'Team Consulting',
							description:
								'Expert guidance for organizational development, leadership training, and team optimization.',
							stat: '98%',
							statLabel: 'Client satisfaction',
						},
						{
							icon: LineChart,
							title: 'Financial Advisory',
							description:
								'Comprehensive financial planning, budgeting, and investment strategies for sustainable growth.',
							stat: '$2B+',
							statLabel: 'Assets managed',
						},
					]}
				/>

				<TrustSection
					certifications={[
						{ name: 'ISO 9001', icon: Award },
						{ name: 'SOC 2 Type II', icon: Shield },
						{ name: 'GDPR Compliant', icon: Globe },
					]}
					clientLogos={[
						'Fortune 500',
						'S&P 500',
						'Inc. 5000',
						'Deloitte Fast',
						'Forbes Global',
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
	<div className="mb-3 @md:mb-4">
		<Badge variant="outline" className="inline-flex gap-2">
			<Icon className="size-3" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="mb-3 @md:mb-4 text-2xl @sm:text-3xl @xl:text-4xl @3xl:text-5xl font-bold tracking-tight leading-tight">
		{text.split('Expert Consulting')[0]}
		<span className="text-primary">Expert Consulting</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const CTA = ({ text, href }: { text: string; href: string }) => (
	<Button size="lg" className="shrink-0 gap-2" asChild>
		<Link href={href}>
			{text}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);

const Features = ({ items }: { items: Feature[] }) => (
	<ul className="mb-10 @md:mb-12 @xl:mb-14 @3xl:mb-16 grid gap-4 @md:gap-5 @xl:gap-6 @md:grid-cols-2">
		{items.map((feature) => (
			<li key={feature.title}>
				<Card className="group border-2 py-0 gap-0 transition-all hover:border-primary/50 hover:shadow-lg">
					<CardContent className="p-4 @md:p-5 @xl:p-6">
						<div className="flex items-start justify-between">
							<div className="mb-3 @md:mb-4 flex size-12 @md:size-14 items-center justify-center rounded-xl bg-primary/10">
								<feature.icon className="size-6 @md:size-7 text-primary" />
							</div>
							<div className="text-right">
								<p className="text-xl @md:text-2xl @xl:text-3xl font-bold text-primary">
									{feature.stat}
								</p>
								<p className="text-xs text-muted-foreground">
									{feature.statLabel}
								</p>
							</div>
						</div>
						<h3 className="mb-1.5 @md:mb-2 text-base @md:text-lg @xl:text-xl font-semibold">
							{feature.title}
						</h3>
						<p className="mb-3 @md:mb-4 text-sm @md:text-base text-muted-foreground">
							{feature.description}
						</p>
						<div className="flex items-center gap-2 text-xs @md:text-sm text-primary">
							<CheckCircle2 className="size-3.5 @md:size-4" />
							<span>Proven methodology</span>
						</div>
					</CardContent>
				</Card>
			</li>
		))}
	</ul>
);

const TrustSection = ({
	certifications,
	clientLogos,
}: {
	certifications: Certification[];
	clientLogos: string[];
}) => (
	<div className="rounded-2xl border-2 bg-background p-5 @md:p-6 @xl:p-8 shadow-sm">
		<div className="grid gap-6 @md:gap-8 @xl:grid-cols-2">
			{/* Certifications */}
			<div>
				<h3 className="mb-3 @md:mb-4 flex items-center gap-2 text-base @md:text-lg font-semibold">
					<Shield className="size-4 @md:size-5 text-primary" />
					Certified & Compliant
				</h3>
				<div className="flex flex-wrap gap-2 @md:gap-3">
					{certifications.map((cert) => (
						<Badge
							key={cert.name}
							variant="secondary"
							className="gap-1.5 @md:gap-2 px-3 @md:px-4 py-1.5 @md:py-2"
						>
							<cert.icon className="size-3.5 @md:size-4" />
							{cert.name}
						</Badge>
					))}
				</div>
			</div>

			{/* Client Logos */}
			<div>
				<h3 className="mb-3 @md:mb-4 flex items-center gap-2 text-base @md:text-lg font-semibold">
					<Handshake className="size-4 @md:size-5 text-primary" />
					Trusted by Leaders
				</h3>
				<div className="flex flex-wrap gap-3 @md:gap-4">
					{clientLogos.map((logo) => (
						<span
							key={logo}
							className="text-xs @md:text-sm font-medium text-muted-foreground"
						>
							{logo}
						</span>
					))}
				</div>
			</div>
		</div>
	</div>
);
