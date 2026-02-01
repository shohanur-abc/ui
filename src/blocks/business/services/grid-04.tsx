import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ArrowUpRight,
	Cog,
	FileSearch,
	Handshake,
	LayoutDashboard,
	MessageSquare,
	Rocket,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="How We Help" />
					<Title text="End-to-End Solutions" />
					<Description text="From initial concept to ongoing support, we partner with you at every step." />
				</div>

				<ServiceGrid
					items={[
						{
							icon: FileSearch,
							title: 'Discovery & Analysis',
							description:
								'Deep-dive into your requirements to understand goals and challenges.',
							href: '/services/discovery',
						},
						{
							icon: LayoutDashboard,
							title: 'Design & Prototyping',
							description:
								'Create intuitive interfaces backed by user research and best practices.',
							href: '/services/design',
						},
						{
							icon: Cog,
							title: 'Development & Testing',
							description:
								'Build reliable software with rigorous quality assurance processes.',
							href: '/services/development',
						},
						{
							icon: Rocket,
							title: 'Deployment & Launch',
							description:
								'Seamless rollouts with comprehensive training and documentation.',
							href: '/services/deployment',
						},
						{
							icon: MessageSquare,
							title: 'Support & Maintenance',
							description:
								'Ongoing assistance to keep your systems running at peak performance.',
							href: '/services/support',
						},
						{
							icon: Handshake,
							title: 'Partnership & Growth',
							description:
								'Long-term collaboration to evolve your solution as your business grows.',
							href: '/services/partnership',
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
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
			<div
				key={i}
				className="group relative bg-card border rounded-2xl p-6 @md:p-8 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
			>
				<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
					<Icon className="size-6 @md:size-7" />
				</div>
				<h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
				<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-4">
					{description}
				</p>
				<Button
					variant="ghost"
					size="sm"
					className="px-0 text-primary hover:text-primary hover:bg-transparent"
					asChild
				>
					<Link href={href}>
						Explore
						<ArrowUpRight className="size-4" />
					</Link>
				</Button>
			</div>
		))}
	</div>
);
