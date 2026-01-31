import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle2,
	Globe,
	HardDrive,
	Shield,
	Users,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

interface SpecItem {
	icon: ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

interface FeatureSpec {
	category: string;
	specs: { name: string; value: string }[];
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={HardDrive} text="Technical Specs" />
					<Title text="Built for" highlight="Performance" />
					<Description text="Enterprise-grade infrastructure with the specs to back it up." />
				</div>

				<QuickSpecs
					items={[
						{ icon: Zap, label: 'Response Time', value: '<50ms' },
						{ icon: Globe, label: 'Edge Locations', value: '200+' },
						{ icon: Shield, label: 'Uptime SLA', value: '99.99%' },
						{ icon: HardDrive, label: 'Storage', value: 'Unlimited' },
						{ icon: Users, label: 'Concurrent Users', value: '1M+' },
					]}
				/>

				<Separator className="my-10 @md:my-12" />

				<DetailedSpecs
					items={[
						{
							category: 'Performance',
							specs: [
								{ name: 'Average Response Time', value: '45ms' },
								{ name: 'Throughput', value: '100K req/s' },
								{ name: 'Cold Start', value: '<100ms' },
							],
						},
						{
							category: 'Scalability',
							specs: [
								{ name: 'Auto-scaling', value: 'Yes' },
								{ name: 'Max Instances', value: 'Unlimited' },
								{ name: 'Load Balancing', value: 'Global' },
							],
						},
						{
							category: 'Security',
							specs: [
								{ name: 'Encryption', value: 'AES-256' },
								{ name: 'TLS Version', value: '1.3' },
								{ name: 'Certifications', value: 'SOC 2, GDPR' },
							],
						},
						{
							category: 'Storage',
							specs: [
								{ name: 'Object Storage', value: 'Unlimited' },
								{ name: 'Database', value: 'Managed PostgreSQL' },
								{ name: 'Backup Retention', value: '30 days' },
							],
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

const QuickSpecs = ({ items }: { items: SpecItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-5 gap-4">
		{items.map((item) => (
			<Card
				key={item.label}
				className="text-center border-border/50 transition-all hover:border-primary/30"
			>
				<CardContent className="p-5">
					<div className="mb-3 mx-auto flex size-10 items-center justify-center rounded-lg bg-primary/10">
						<item.icon className="size-5 text-primary" />
					</div>
					<p className="text-xl font-bold text-primary">{item.value}</p>
					<p className="text-xs text-muted-foreground">{item.label}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const DetailedSpecs = ({ items }: { items: FeatureSpec[] }) => (
	<div className="grid gap-6 @sm:grid-cols-2 @xl:grid-cols-4">
		{items.map((category) => (
			<Card key={category.category} className="border-border/50">
				<CardContent className="p-5">
					<h3 className="font-semibold mb-4">{category.category}</h3>
					<ul className="space-y-3">
						{category.specs.map((spec) => (
							<li
								key={spec.name}
								className="flex items-center justify-between text-sm"
							>
								<span className="text-muted-foreground">{spec.name}</span>
								<span className="font-medium">{spec.value}</span>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		))}
	</div>
);
