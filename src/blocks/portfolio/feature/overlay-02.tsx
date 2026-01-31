import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Code, Palette, Server } from 'lucide-react';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden">
			<div className="relative min-h-[600px] @md:min-h-[700px]">
				<Image
					src="https://picsum.photos/seed/overlay2/1920/1080"
					alt="Background"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

				<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-16 @md:py-20 @xl:py-24">
					<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
						<Eyebrow text="Services" />
						<Title text="What I Offer" />
						<Description text="Comprehensive development services to bring your vision to life." />
					</div>

					<ServiceCards
						items={[
							{
								icon: Code,
								title: 'Frontend Development',
								description:
									'Building responsive, accessible, and performant user interfaces.',
								link: '#frontend',
							},
							{
								icon: Server,
								title: 'Backend Development',
								description: 'Scalable APIs and server-side solutions.',
								link: '#backend',
							},
							{
								icon: Palette,
								title: 'UI/UX Design',
								description: 'User-centered design that converts.',
								link: '#design',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge
		variant="outline"
		className="mb-3 @md:mb-4 bg-background/50 backdrop-blur-sm"
	>
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

interface ServiceItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	link: string;
}

const ServiceCards = ({ items }: { items: ServiceItem[] }) => (
	<div className="grid @md:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description, link }, i) => (
			<Card
				key={i}
				className="py-0 group hover:shadow-xl transition-all bg-background/80 backdrop-blur-sm"
			>
				<CardContent className="p-6 @md:p-8">
					<a href={link} className="block">
						<div className="flex items-start justify-between mb-4">
							<div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
								<Icon className="size-6 @md:size-7" />
							</div>
							<ArrowUpRight className="size-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
						</div>
						<h3 className="font-bold text-lg @md:text-xl mb-2">{title}</h3>
						<p className="text-sm @md:text-base text-muted-foreground">
							{description}
						</p>
					</a>
				</CardContent>
			</Card>
		))}
	</div>
);
