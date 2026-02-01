import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div className="@xl:order-2">
						<Eyebrow text="Consulting" />
						<Title text="Strategic Technology Consulting" />
						<Description text="Navigate digital transformation with expert guidance. Our consultants bring decades of experience helping organizations modernize and innovate." />

						<TestimonialQuote
							quote="Their strategic advice helped us save millions in infrastructure costs while improving performance."
							author="Sarah Chen"
							role="CTO, TechCorp"
						/>

						<div className="flex flex-col @sm:flex-row gap-4 mt-8">
							<Button asChild>
								<Link href="/contact">
									Book Consultation
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/case-studies">
									<Play className="size-4" />
									Watch Case Study
								</Link>
							</Button>
						</div>
					</div>

					<div className="@xl:order-1 relative aspect-4/3 rounded-2xl overflow-hidden">
						<Image
							src="https://picsum.photos/seed/consulting/800/600"
							alt="Consulting session"
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
					</div>
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
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface TestimonialQuoteProps {
	quote: string;
	author: string;
	role: string;
}

const TestimonialQuote = ({ quote, author, role }: TestimonialQuoteProps) => (
	<blockquote className="mt-8 pl-4 border-l-2 border-primary">
		<p className="text-sm @md:text-base italic text-muted-foreground mb-2">
			"{quote}"
		</p>
		<footer className="text-sm">
			<span className="font-medium">{author}</span>
			<span className="text-muted-foreground"> — {role}</span>
		</footer>
	</blockquote>
);
