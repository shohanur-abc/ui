import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Check, Shield, Zap } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<WhyUsZigzag
					items={[
						{
							icon: Zap,
							image: 'https://picsum.photos/seed/why1/800/600',
							title: 'Speed Without Compromise',
							description:
								'We deliver fast without cutting corners. Our efficient processes and experienced teams mean you get quality results on tight timelines.',
							points: [
								'Rapid prototyping in days',
								'Agile sprint cycles',
								'Continuous deployment',
								'Quick iteration based on feedback',
							],
						},
						{
							icon: Shield,
							image: 'https://picsum.photos/seed/why2/800/600',
							title: 'Security First',
							description:
								'Security is built into everything we do. From secure coding practices to compliance consulting, we protect your data and reputation.',
							points: [
								'Secure development lifecycle',
								'Regular security audits',
								'Compliance expertise',
								'Data encryption standards',
							],
						},
						{
							icon: Award,
							image: 'https://picsum.photos/seed/why3/800/600',
							title: 'Proven Excellence',
							description:
								"Our track record speaks for itself. We've helped hundreds of clients achieve their digital goals with measurable results.",
							points: [
								'500+ successful projects',
								'98% client satisfaction',
								'15+ years experience',
								'Award-winning team',
							],
						},
					]}
				/>

				<div className="text-center mt-12 @md:mt-16">
					<Button size="lg" asChild>
						<Link href="/contact">
							Work With Us
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

interface WhyUsItem {
	icon: ComponentType<{ className?: string }>;
	image: string;
	title: string;
	description: string;
	points: string[];
}

const WhyUsZigzag = ({ items }: { items: WhyUsItem[] }) => (
	<div className="space-y-16 @xl:space-y-24">
		{items.map(({ icon: Icon, image, title, description, points }, i) => (
			<div
				key={i}
				className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center"
			>
				<div className={i % 2 === 1 ? '@xl:order-2' : ''}>
					<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
						<Icon className="size-6 text-primary" />
					</div>
					<Badge variant="outline" className="mb-3">
						Why Choose Us
					</Badge>
					<h3 className="text-xl @sm:text-2xl @md:text-3xl font-bold tracking-tight mb-4">
						{title}
					</h3>
					<p className="text-base text-muted-foreground leading-relaxed mb-6">
						{description}
					</p>

					<ul className="space-y-3">
						{points.map((point, j) => (
							<li key={j} className="flex items-center gap-3">
								<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
									<Check className="size-3 text-primary" />
								</div>
								<span className="text-sm @md:text-base">{point}</span>
							</li>
						))}
					</ul>
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
