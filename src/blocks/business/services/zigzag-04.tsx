import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ZigzagWithTestimonial
					items={[
						{
							image: 'https://picsum.photos/seed/zzt1/800/600',
							eyebrow: 'E-commerce',
							title: 'E-commerce Solutions',
							description:
								'Build powerful online stores that convert. We create custom e-commerce experiences with seamless checkout, inventory management, and analytics.',
							testimonial: {
								quote:
									'Our online sales increased by 150% within 6 months of launching the new platform.',
								author: 'Maria Santos',
								role: 'CEO, Fashion Forward',
								avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
							},
							ctaHref: '/services/ecommerce',
						},
						{
							image: 'https://picsum.photos/seed/zzt2/800/600',
							eyebrow: 'SaaS',
							title: 'SaaS Development',
							description:
								'Launch your software-as-a-service product with confidence. From MVP to scale, we build platforms that grow with your business.',
							testimonial: {
								quote:
									'They helped us go from idea to 10,000 users in under a year.',
								author: 'James Liu',
								role: 'Founder, CloudTools',
								avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
							},
							ctaHref: '/services/saas',
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
	testimonial: {
		quote: string;
		author: string;
		role: string;
		avatar: string;
	};
	ctaHref: string;
}

const ZigzagWithTestimonial = ({ items }: { items: ZigzagItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(
			({ image, eyebrow, title, description, testimonial, ctaHref }, i) => (
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

						<div className="bg-muted/50 rounded-xl p-5 mb-6">
							<Quote className="size-6 text-primary/50 mb-2" />
							<p className="text-sm @md:text-base italic mb-4">
								"{testimonial.quote}"
							</p>
							<div className="flex items-center gap-3">
								<Avatar className="size-8">
									<AvatarImage
										src={testimonial.avatar}
										alt={testimonial.author}
									/>
									<AvatarFallback>
										{testimonial.author
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium">{testimonial.author}</p>
									<p className="text-xs text-muted-foreground">
										{testimonial.role}
									</p>
								</div>
							</div>
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
