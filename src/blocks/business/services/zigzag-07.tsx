import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import {
	ArrowRight,
	Building2,
	Factory,
	Heart,
	ShoppingCart,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Industries" />
					<Title text="Industry Expertise" />
					<Description text="Deep domain knowledge across key industries enables us to deliver solutions that address your specific challenges." />
				</div>

				<IndustryZigzag
					items={[
						{
							icon: Building2,
							image: 'https://picsum.photos/seed/ind1/800/600',
							title: 'Financial Services',
							description:
								'Secure, compliant solutions for banks, insurance, and fintech. We understand the regulatory landscape and build systems that meet the highest standards.',
							capabilities: [
								'Digital banking',
								'Payment processing',
								'Risk management',
								'Regulatory compliance',
							],
							ctaHref: '/industries/finance',
						},
						{
							icon: Heart,
							image: 'https://picsum.photos/seed/ind2/800/600',
							title: 'Healthcare',
							description:
								'Patient-centered technology that improves outcomes. We build HIPAA-compliant systems that connect providers, patients, and data.',
							capabilities: [
								'EHR integration',
								'Telemedicine',
								'Patient portals',
								'Healthcare analytics',
							],
							ctaHref: '/industries/healthcare',
						},
						{
							icon: ShoppingCart,
							image: 'https://picsum.photos/seed/ind3/800/600',
							title: 'Retail & E-commerce',
							description:
								'Omnichannel experiences that drive sales. From online stores to inventory management, we help retailers thrive in the digital age.',
							capabilities: [
								'E-commerce platforms',
								'POS systems',
								'Inventory management',
								'Customer analytics',
							],
							ctaHref: '/industries/retail',
						},
						{
							icon: Factory,
							image: 'https://picsum.photos/seed/ind4/800/600',
							title: 'Manufacturing',
							description:
								'Digital transformation for modern manufacturing. We connect operations, supply chains, and customers with intelligent systems.',
							capabilities: [
								'IoT integration',
								'Supply chain',
								'Quality management',
								'Predictive maintenance',
							],
							ctaHref: '/industries/manufacturing',
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

interface IndustryItem {
	icon: ComponentType<{ className?: string }>;
	image: string;
	title: string;
	description: string;
	capabilities: string[];
	ctaHref: string;
}

const IndustryZigzag = ({ items }: { items: IndustryItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			({ icon: Icon, image, title, description, capabilities, ctaHref }, i) => (
				<div
					key={i}
					className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
				>
					<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
						<div className="flex items-center gap-3 mb-4">
							<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
								<Icon className="size-5 text-primary" />
							</div>
							<h3 className="text-xl @md:text-2xl font-bold">{title}</h3>
						</div>
						<p className="text-base text-muted-foreground leading-relaxed mb-6">
							{description}
						</p>

						<Card className="py-0 mb-6">
							<CardContent className="p-4">
								<h4 className="text-sm font-semibold mb-3">Capabilities</h4>
								<div className="grid grid-cols-2 gap-2">
									{capabilities.map((item, j) => (
										<div key={j} className="flex items-center gap-2 text-sm">
											<div className="size-1.5 rounded-full bg-primary shrink-0" />
											{item}
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Button variant="outline" asChild>
							<Link href={ctaHref}>
								Explore Solutions
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
					<div
						className={`relative aspect-4/3 rounded-2xl overflow-hidden ${
							i % 2 === 1 ? '@xl:order-1' : ''
						}`}
					>
						<Image src={image} alt={title} fill className="object-cover" />
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
					</div>
				</div>
			),
		)}
	</div>
);
