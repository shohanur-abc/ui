import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Activity,
	Cloud,
	Fingerprint,
	HardDrive,
	Key,
	RefreshCcw,
	Shield,
	Webhook,
} from 'lucide-react';
import { ComponentType } from 'react';

interface FeatureItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	stat: string;
	statLabel: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
					<Eyebrow icon={Shield} text="Security & Reliability" />
					<Title text="Enterprise-Grade Protection for" highlight="Your Data" />
					<Description text="Built with security-first architecture and compliance standards for regulated industries." />
				</div>

				<FeatureGrid
					items={[
						{
							icon: Key,
							title: 'End-to-End Encryption',
							description: 'AES-256 encryption at rest and TLS 1.3 in transit.',
							stat: '256-bit',
							statLabel: 'Encryption',
						},
						{
							icon: Fingerprint,
							title: 'Biometric Auth',
							description:
								'Multi-factor authentication with hardware key support.',
							stat: '99.9%',
							statLabel: 'Fraud prevention',
						},
						{
							icon: Activity,
							title: 'Real-time Monitoring',
							description:
								'Continuous threat detection and automated response.',
							stat: '<1ms',
							statLabel: 'Detection time',
						},
						{
							icon: HardDrive,
							title: 'Automated Backups',
							description: 'Point-in-time recovery with 30-day retention.',
							stat: '30 days',
							statLabel: 'Retention',
						},
						{
							icon: Cloud,
							title: 'Multi-Region DR',
							description: 'Automatic failover across geographic regions.',
							stat: '5 regions',
							statLabel: 'Coverage',
						},
						{
							icon: RefreshCcw,
							title: 'Zero-Downtime Updates',
							description:
								'Rolling deployments with instant rollback capability.',
							stat: '0s',
							statLabel: 'Downtime',
						},
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
		<Badge variant="secondary" className="gap-2 px-3 py-1.5">
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

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
	<div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-3">
		{items.map((item) => (
			<Card
				key={item.title}
				className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
							<item.icon className="size-6 text-primary" />
						</div>
						<div className="text-right">
							<p className="text-xl font-bold text-primary">{item.stat}</p>
							<p className="text-xs text-muted-foreground">{item.statLabel}</p>
						</div>
					</div>
					<h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
					<p className="text-sm text-muted-foreground">{item.description}</p>
				</CardContent>
			</Card>
		))}
	</div>
);
