import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="grid @xl:grid-cols-2">
				<div className="relative aspect-video @xl:aspect-auto @xl:min-h-[600px]">
					<Image
						src="https://picsum.photos/seed/analytics/1000/800"
						alt="Data analytics dashboard"
						fill
						className="object-cover"
					/>
				</div>

				<div className="bg-muted/30 px-6 @md:px-10 @xl:px-16 py-12 @md:py-16 @xl:py-20 flex flex-col justify-center">
					<Eyebrow text="Data & Analytics" />
					<Title text="Turn Data Into Insights" />
					<Description text="Unlock the power of your data with our comprehensive analytics solutions. We help you collect, process, and visualize data to drive better decisions." />

					<ServiceList
						title="Analytics Services"
						items={[
							'Real-time dashboards',
							'Predictive analytics',
							'Customer segmentation',
							'Revenue forecasting',
							'Behavioral analysis',
							'Custom reporting',
						]}
					/>

					<div className="mt-8 flex flex-col @sm:flex-row gap-4">
						<Button asChild>
							<Link href="/contact">
								Get Started
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/case-studies">View Case Studies</Link>
						</Button>
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

const ServiceList = ({ title, items }: { title: string; items: string[] }) => (
	<div className="mt-8">
		<h3 className="font-semibold mb-4">{title}</h3>
		<ul className="grid @sm:grid-cols-2 gap-3">
			{items.map((item, i) => (
				<li key={i} className="flex items-center gap-2 text-sm">
					<div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
						<Check className="size-3 text-primary" />
					</div>
					{item}
				</li>
			))}
		</ul>
	</div>
);
