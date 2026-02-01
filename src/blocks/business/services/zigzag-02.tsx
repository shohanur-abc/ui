import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ZigzagWithStats
					items={[
						{
							image: 'https://picsum.photos/seed/zzs1/800/600',
							eyebrow: 'Cloud Migration',
							title: 'Seamless Cloud Transition',
							description:
								'Move your infrastructure to the cloud with zero downtime. Our experts handle everything from assessment to migration.',
							stats: [
								{ value: '100+', label: 'Migrations' },
								{ value: '99.9%', label: 'Uptime' },
								{ value: '40%', label: 'Cost Savings' },
							],
							ctaHref: '/services/cloud',
						},
						{
							image: 'https://picsum.photos/seed/zzs2/800/600',
							eyebrow: 'Security',
							title: 'Enterprise-Grade Security',
							description:
								'Protect your digital assets with comprehensive security solutions. We identify vulnerabilities and implement robust protection.',
							stats: [
								{ value: '500+', label: 'Audits' },
								{ value: '0', label: 'Breaches' },
								{ value: '24/7', label: 'Monitoring' },
							],
							ctaHref: '/services/security',
						},
						{
							image: 'https://picsum.photos/seed/zzs3/800/600',
							eyebrow: 'Support',
							title: 'Ongoing Maintenance',
							description:
								'Keep your systems running smoothly with our maintenance services. We provide proactive monitoring and rapid response.',
							stats: [
								{ value: '<1hr', label: 'Response' },
								{ value: '98%', label: 'Satisfaction' },
								{ value: '50+', label: 'Clients' },
							],
							ctaHref: '/services/support',
						},
					]}
				/>
			</div>
		</section>
	);
}

interface ZigzagItem {
	image: string;
	eyebrow: string;
	title: string;
	description: string;
	stats: { value: string; label: string }[];
	ctaHref: string;
}

const ZigzagWithStats = ({ items }: { items: ZigzagItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(({ image, eyebrow, title, description, stats, ctaHref }, i) => (
			<div
				key={i}
				className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
			>
				<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
					<Badge variant="outline" className="mb-3">
						{eyebrow}
					</Badge>
					<h3 className="text-xl @sm:text-2xl @md:text-3xl font-bold tracking-tight mb-4">
						{title}
					</h3>
					<p className="text-base text-muted-foreground leading-relaxed mb-6">
						{description}
					</p>

					<Card className="py-0 mb-6">
						<CardContent className="p-4">
							<div className="grid grid-cols-3 gap-4 text-center">
								{stats.map(({ value, label }, j) => (
									<div key={j}>
										<p className="text-xl @md:text-2xl font-bold text-primary">
											{value}
										</p>
										<p className="text-xs text-muted-foreground">{label}</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

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
		))}
	</div>
);
