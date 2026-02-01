import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Star } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Services" />
					<Title text="Everything You Need" />
					<Description text="A comprehensive suite of services to help you build, launch, and grow." />
				</div>

				<MasonryGrid
					items={[
						{
							type: 'featured',
							image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
							title: 'Full-Stack Development',
							description: 'End-to-end web application development with modern frameworks and best practices.',
							features: ['React & Next.js', 'Node.js & Python', 'PostgreSQL & MongoDB'],
						},
						{
							type: 'stat',
							stat: '500+',
							label: 'Projects Delivered',
							color: 'bg-primary',
						},
						{
							type: 'service',
							title: 'Mobile Apps',
							description: 'Native and cross-platform mobile applications for iOS and Android.',
							icon: '📱',
						},
						{
							type: 'service',
							title: 'Cloud Infrastructure',
							description: 'Scalable, secure cloud solutions on AWS, GCP, and Azure.',
							icon: '☁️',
						},
						{
							type: 'testimonial',
							quote: 'They delivered beyond our expectations. The team\'s expertise is unmatched.',
							author: 'Sarah Chen',
							role: 'CTO, TechStart',
							avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
							rating: 5,
						},
						{
							type: 'stat',
							stat: '99.9%',
							label: 'Uptime SLA',
							color: 'bg-green-500',
						},
						{
							type: 'service',
							title: 'DevOps & CI/CD',
							description: 'Automated pipelines for continuous integration and deployment.',
							icon: '⚙️',
						},
						{
							type: 'image',
							image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
							caption: 'Our distributed team',
						},
						{
							type: 'service',
							title: 'UI/UX Design',
							description: 'User-centered design that drives engagement and conversions.',
							icon: '🎨',
						},
						{
							type: 'stat',
							stat: '24/7',
							label: 'Support Available',
							color: 'bg-purple-500',
						},
					]}
				/>

				<div className="text-center mt-10 @md:mt-14">
					<Button size="lg" asChild>
						<Link href="/services">
							Explore All Services
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
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

type MasonryItem =
	| { type: 'featured'; image: string; title: string; description: string; features: string[] }
	| { type: 'stat'; stat: string; label: string; color: string }
	| { type: 'service'; title: string; description: string; icon: string }
	| { type: 'testimonial'; quote: string; author: string; role: string; avatar: string; rating: number }
	| { type: 'image'; image: string; caption: string };

const MasonryGrid = ({ items }: { items: MasonryItem[] }) => (
	<div className="columns-1 @md:columns-2 @xl:columns-3 gap-6 space-y-6">
		{items.map((item, i) => {
			switch (item.type) {
				case 'featured':
					return (
						<Card key={i} className="py-0 break-inside-avoid overflow-hidden">
							<div className="relative aspect-[4/3]">
								<Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover"
								/>
							</div>
							<CardContent className="p-5">
								<h3 className="font-bold text-lg mb-2">{item.title}</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{item.description}
								</p>
								<ul className="space-y-2">
									{item.features.map((feature, j) => (
										<li key={j} className="flex items-center gap-2 text-sm">
											<Check className="size-4 text-primary shrink-0" />
											{feature}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					);

				case 'stat':
					return (
						<div
							key={i}
							className={`break-inside-avoid ${item.color} text-white p-6 rounded-2xl text-center`}
						>
							<div className="text-4xl font-bold mb-2">{item.stat}</div>
							<div className="text-sm opacity-90">{item.label}</div>
						</div>
					);

				case 'service':
					return (
						<Card key={i} className="py-0 break-inside-avoid">
							<CardContent className="p-5">
								<div className="text-3xl mb-3">{item.icon}</div>
								<h3 className="font-bold mb-2">{item.title}</h3>
								<p className="text-sm text-muted-foreground">{item.description}</p>
							</CardContent>
						</Card>
					);

				case 'testimonial':
					return (
						<Card key={i} className="py-0 break-inside-avoid bg-muted/50">
							<CardContent className="p-5">
								<div className="flex items-center gap-1 mb-3">
									{[...Array(item.rating)].map((_, j) => (
										<Star
											key={j}
											className="size-4 fill-amber-400 text-amber-400"
										/>
									))}
								</div>
								<blockquote className="text-sm mb-4">"{item.quote}"</blockquote>
								<div className="flex items-center gap-3">
									<div className="relative size-10 rounded-full overflow-hidden">
										<Image
											src={item.avatar}
											alt={item.author}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<p className="font-medium text-sm">{item.author}</p>
										<p className="text-xs text-muted-foreground">{item.role}</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);

				case 'image':
					return (
						<div key={i} className="break-inside-avoid">
							<div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
								<Image
									src={item.image}
									alt={item.caption}
									fill
									className="object-cover"
								/>
							</div>
							<p className="text-sm text-muted-foreground text-center mt-2">
								{item.caption}
							</p>
						</div>
					);
			}
		})}
	</div>
);
