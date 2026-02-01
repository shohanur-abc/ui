import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ZigzagWithPricing
					items={[
						{
							image: 'https://picsum.photos/seed/zzp1/800/600',
							eyebrow: 'Starter',
							title: 'Website Design & Development',
							description:
								'Professional websites that establish your online presence. Perfect for small businesses and startups.',
							price: '$5,000',
							timeline: '4-6 weeks',
							includes: [
								'Custom design',
								'Mobile responsive',
								'SEO optimization',
								'CMS integration',
							],
							ctaHref: '/contact?service=website',
						},
						{
							image: 'https://picsum.photos/seed/zzp2/800/600',
							eyebrow: 'Growth',
							title: 'Web Application Development',
							description:
								'Custom web applications with rich functionality. Built for businesses ready to scale.',
							price: '$25,000+',
							timeline: '8-12 weeks',
							includes: [
								'Custom architecture',
								'API development',
								'Database design',
								'User authentication',
							],
							ctaHref: '/contact?service=webapp',
						},
						{
							image: 'https://picsum.photos/seed/zzp3/800/600',
							eyebrow: 'Enterprise',
							title: 'Digital Transformation',
							description:
								'Comprehensive digital solutions for large organizations. Transform your operations.',
							price: 'Custom',
							timeline: '3-12 months',
							includes: [
								'Enterprise architecture',
								'System integration',
								'Change management',
								'Training',
							],
							ctaHref: '/contact?service=enterprise',
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
	price: string;
	timeline: string;
	includes: string[];
	ctaHref: string;
}

const ZigzagWithPricing = ({ items }: { items: ZigzagItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			(
				{
					image,
					eyebrow,
					title,
					description,
					price,
					timeline,
					includes,
					ctaHref,
				},
				i,
			) => (
				<div
					key={i}
					className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
				>
					<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
						<Badge variant="outline" className="mb-3">
							{eyebrow}
						</Badge>
						<h3 className="text-xl @sm:text-2xl @md:text-3xl font-bold tracking-tight mb-2">
							{title}
						</h3>
						<div className="flex items-center gap-4 mb-4">
							<span className="text-2xl @md:text-3xl font-bold text-primary">
								{price}
							</span>
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<Clock className="size-4" />
								{timeline}
							</div>
						</div>
						<p className="text-base text-muted-foreground leading-relaxed mb-6">
							{description}
						</p>

						<div className="grid grid-cols-2 gap-2 mb-6">
							{includes.map((item, j) => (
								<div key={j} className="flex items-center gap-2 text-sm">
									<div className="size-1.5 rounded-full bg-primary shrink-0" />
									{item}
								</div>
							))}
						</div>

						<Button asChild>
							<Link href={ctaHref}>
								Get Started
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
