import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ZigzagCompare
					items={[
						{
							image: 'https://picsum.photos/seed/zzc1/800/600',
							title: 'Custom Development',
							description:
								'Tailored solutions built from the ground up to meet your exact requirements.',
							benefits: [
								'Full control over features',
								'Scalable architecture',
								'No licensing fees',
								'Complete ownership',
							],
							idealFor: 'Enterprises and startups with unique needs',
							ctaHref: '/services/custom',
						},
						{
							image: 'https://picsum.photos/seed/zzc2/800/600',
							title: 'Platform Integration',
							description:
								'Leverage existing platforms and tools to accelerate your time-to-market.',
							benefits: [
								'Faster deployment',
								'Lower upfront costs',
								'Proven reliability',
								'Regular updates',
							],
							idealFor: 'Businesses looking for quick, reliable solutions',
							ctaHref: '/services/integration',
						},
					]}
				/>

				<div className="mt-12 @md:mt-16 text-center">
					<p className="text-muted-foreground mb-4">
						Not sure which approach is right for you?
					</p>
					<Button size="lg" asChild>
						<Link href="/contact">
							Schedule a Consultation
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

interface ZigzagItem {
	image: string;
	title: string;
	description: string;
	benefits: string[];
	idealFor: string;
	ctaHref: string;
}

const ZigzagCompare = ({ items }: { items: ZigzagItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			({ image, title, description, benefits, idealFor, ctaHref }, i) => (
				<div
					key={i}
					className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
				>
					<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
						<Badge variant="outline" className="mb-3">
							Option {i + 1}
						</Badge>
						<h3 className="text-xl @sm:text-2xl @md:text-3xl font-bold tracking-tight mb-4">
							{title}
						</h3>
						<p className="text-base text-muted-foreground leading-relaxed mb-6">
							{description}
						</p>

						<div className="space-y-3 mb-6">
							{benefits.map((benefit, j) => (
								<div key={j} className="flex items-center gap-3">
									<CheckCircle2 className="size-5 text-primary shrink-0" />
									<span className="text-sm">{benefit}</span>
								</div>
							))}
						</div>

						<div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
							<p className="text-sm">
								<span className="font-semibold">Ideal for:</span>{' '}
								<span className="text-muted-foreground">{idealFor}</span>
							</p>
						</div>

						<Button variant="outline" asChild>
							<Link href={ctaHref}>
								Learn More
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
					</div>
				</div>
			),
		)}
	</div>
);
