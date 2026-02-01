import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div className="relative aspect-square @xl:aspect-4/5 rounded-2xl overflow-hidden">
						<Image
							src="https://picsum.photos/seed/cloud-service/800/900"
							alt="Cloud infrastructure"
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
						<div className="absolute bottom-6 left-6 right-6">
							<StatsBar
								items={[
									{ value: '99.9%', label: 'Uptime' },
									{ value: '<50ms', label: 'Latency' },
									{ value: '24/7', label: 'Support' },
								]}
							/>
						</div>
					</div>

					<div>
						<Eyebrow text="Cloud Services" />
						<Title text="Enterprise Cloud Infrastructure" />
						<Description text="Scale your business with our robust cloud solutions. We design, deploy, and manage infrastructure that grows with your needs." />

						<FeatureList
							items={[
								{
									icon: Zap,
									title: 'High Performance',
									description: 'Optimized for speed and reliability',
								},
								{
									icon: Shield,
									title: 'Enterprise Security',
									description: 'SOC 2 and ISO 27001 compliant',
								},
								{
									icon: Rocket,
									title: 'Auto Scaling',
									description: 'Scale instantly based on demand',
								},
							]}
						/>

						<Button size="lg" className="mt-8" asChild>
							<Link href="/contact">
								Get Started
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const StatsBar = ({ items }: { items: { value: string; label: string }[] }) => (
	<div className="grid grid-cols-3 gap-4 p-4 bg-background/90 backdrop-blur-sm rounded-xl">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<p className="text-lg @md:text-xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		))}
	</div>
);

interface FeatureItem {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const FeatureList = ({ items }: { items: FeatureItem[] }) => (
	<div className="space-y-4 mt-8">
		{items.map(({ icon: Icon, title, description }, i) => (
			<div key={i} className="flex gap-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-5 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		))}
	</div>
);
