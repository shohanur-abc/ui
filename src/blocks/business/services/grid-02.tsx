import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Boxes,
	Cpu,
	Fingerprint,
	Layers,
	Lightbulb,
	Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-10 @md:mb-14">
					<div className="max-w-2xl">
						<Eyebrow text="Services" />
						<Title text="Solutions That Scale" />
						<Description text="Enterprise-grade services designed to help you innovate faster and operate smarter." />
					</div>
					<CTAButton label="View All Services" href="/services" />
				</div>

				<ServiceGrid
					items={[
						{
							icon: Cpu,
							title: 'AI & Machine Learning',
							description:
								'Harness the power of AI to automate processes and unlock predictive insights.',
							href: '/services/ai',
						},
						{
							icon: Workflow,
							title: 'Process Automation',
							description:
								'Streamline operations with intelligent workflow automation solutions.',
							href: '/services/automation',
						},
						{
							icon: Boxes,
							title: 'System Integration',
							description:
								'Connect disparate systems for seamless data flow and unified operations.',
							href: '/services/integration',
						},
						{
							icon: Layers,
							title: 'Platform Development',
							description:
								'Build robust platforms that serve as the foundation for your digital ecosystem.',
							href: '/services/platform',
						},
						{
							icon: Fingerprint,
							title: 'Identity Management',
							description:
								'Secure and streamlined identity solutions for modern enterprises.',
							href: '/services/identity',
						},
						{
							icon: Lightbulb,
							title: 'Innovation Labs',
							description:
								'Rapid prototyping and experimentation to validate new ideas quickly.',
							href: '/services/innovation',
						},
					]}
				/>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const CTAButton = ({ label, href }: { label: string; href: string }) => (
	<Button variant="outline" size="lg" className="shrink-0" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	href: string;
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description, href }, i) => (
			<Link key={i} href={href} className="group block">
				<Card className="h-full py-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring">
					<CardContent className="p-6 @md:p-8 h-full flex flex-col">
						<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
							<Icon className="size-6 @md:size-7" />
						</div>
						<h3 className="text-lg @md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
							{title}
						</h3>
						<p className="text-sm @md:text-base text-muted-foreground leading-relaxed flex-1">
							{description}
						</p>
						<div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
							Learn more
							<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
						</div>
					</CardContent>
				</Card>
			</Link>
		))}
	</div>
);
