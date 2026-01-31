import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Award,
	CheckCircle,
	Globe,
	Handshake,
	Shield,
	Star,
	Trophy,
	Users,
} from 'lucide-react';
import { ComponentType } from 'react';

interface TrustSignal {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Shield} text="Trust & Reliability" />
					<Title text="Why Teams" highlight="Trust Us" />
					<Description text="Security, reliability, and transparency are at the core of everything we build." />
				</div>

				<TrustGrid
					items={[
						{
							icon: Shield,
							title: 'SOC 2 Compliant',
							description:
								'Audited annually for security, availability, and confidentiality.',
						},
						{
							icon: Globe,
							title: 'GDPR Ready',
							description:
								'Full compliance with European data protection regulations.',
						},
						{
							icon: Award,
							title: 'ISO 27001',
							description: 'Certified information security management system.',
						},
						{
							icon: CheckCircle,
							title: '99.99% Uptime',
							description: 'Industry-leading uptime with SLA guarantees.',
						},
						{
							icon: Handshake,
							title: 'DPA Included',
							description:
								'Data Processing Agreement available for all customers.',
						},
						{
							icon: Users,
							title: 'Trusted by 10K+',
							description: 'Companies worldwide rely on our platform daily.',
						},
					]}
				/>

				<LogoBar
					logos={[
						'Fortune 500',
						'TechCorp',
						'GlobalBiz',
						'InnovateCo',
						'LeadingTech',
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
		<Badge variant="outline" className="gap-2">
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

const TrustGrid = ({ items }: { items: TrustSignal[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3 max-w-5xl mx-auto mb-12">
		{items.map((item) => (
			<Card
				key={item.title}
				className="border-border/50 transition-all hover:border-primary/30"
			>
				<CardContent className="p-5 @md:p-6 flex items-start gap-4">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
						<item.icon className="size-5 text-primary" />
					</div>
					<div>
						<h3 className="font-semibold mb-1">{item.title}</h3>
						<p className="text-sm text-muted-foreground">{item.description}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const LogoBar = ({ logos }: { logos: string[] }) => (
	<div className="text-center">
		<p className="text-sm text-muted-foreground mb-6">
			Trusted by industry leaders
		</p>
		<div className="flex flex-wrap justify-center gap-8">
			{logos.map((logo) => (
				<span
					key={logo}
					className="text-lg font-semibold text-muted-foreground/50"
				>
					{logo}
				</span>
			))}
		</div>
	</div>
);
