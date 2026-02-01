import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowRight, BrainCircuit, Cloud, Code2, Shield } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Premium Services" />
					<Title text="Excellence Delivered" />
					<Description text="Premium service offerings designed for organizations that demand the best." />
				</div>

				<BentoGrid
					featured={{
						image: 'https://picsum.photos/seed/premium/800/600',
						title: 'Enterprise Solutions',
						description:
							"Comprehensive enterprise-grade solutions tailored to your organization's unique needs. Our team of experts works closely with you to deliver transformative results.",
						href: '/services/enterprise',
					}}
					items={[
						{
							icon: Code2,
							title: 'Custom Development',
							description: 'Bespoke software solutions.',
							href: '/services/development',
						},
						{
							icon: Cloud,
							title: 'Cloud Architecture',
							description: 'Scalable infrastructure design.',
							href: '/services/cloud',
						},
						{
							icon: BrainCircuit,
							title: 'AI & Automation',
							description: 'Intelligent process automation.',
							href: '/services/ai',
						},
						{
							icon: Shield,
							title: 'Security Services',
							description: 'Enterprise-grade protection.',
							href: '/services/security',
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

interface FeaturedItem {
	image: string;
	title: string;
	description: string;
	href: string;
}

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	href: string;
}

const BentoGrid = ({
	featured,
	items,
}: {
	featured: FeaturedItem;
	items: ServiceItem[];
}) => (
	<div className="grid @lg:grid-cols-2 gap-4 @md:gap-5">
		<Link href={featured.href} className="group block @lg:row-span-2">
			<Card className="h-full py-0 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group-focus-visible:ring-2 group-focus-visible:ring-ring">
				<div className="relative aspect-video @lg:aspect-auto @lg:h-1/2">
					<Image
						src={featured.image}
						alt={featured.title}
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
				</div>
				<CardContent className="p-6 @md:p-8">
					<Badge className="mb-4">Featured</Badge>
					<h3 className="text-xl @md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
						{featured.title}
					</h3>
					<p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-4">
						{featured.description}
					</p>
					<span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
						Learn more
						<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
					</span>
				</CardContent>
			</Card>
		</Link>

		<div className="grid @sm:grid-cols-2 gap-4">
			{items.map(({ icon: Icon, title, description, href }, i) => (
				<Link key={i} href={href} className="group block">
					<Card className="h-full py-0 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-ring">
						<CardContent className="p-5 @md:p-6">
							<div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
								<Icon className="size-5 @md:size-6" />
							</div>
							<h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
								{title}
							</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	</div>
);
