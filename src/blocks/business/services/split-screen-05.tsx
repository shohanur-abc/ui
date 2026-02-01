import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-5 gap-8 @xl:gap-12 items-center">
					<div className="@xl:col-span-3">
						<Eyebrow text="Mobile Development" />
						<Title text="Native Mobile Applications" />
						<Description text="Create stunning mobile experiences for iOS and Android. Our mobile team delivers apps that users love with native performance." />

						<div className="grid @sm:grid-cols-2 gap-6 mt-8">
							<FeatureColumn
								title="iOS Development"
								items={[
									'Swift & SwiftUI',
									'App Store optimization',
									'Apple ecosystem integration',
									'In-app purchases',
								]}
							/>
							<FeatureColumn
								title="Android Development"
								items={[
									'Kotlin & Jetpack Compose',
									'Play Store optimization',
									'Material Design 3',
									'Google services integration',
								]}
							/>
						</div>

						<Button className="mt-8" asChild>
							<Link href="/contact">
								Start Your App
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>

					<div className="@xl:col-span-2">
						<div className="relative aspect-3/4 rounded-2xl overflow-hidden">
							<Image
								src="https://picsum.photos/seed/mobile-app/600/800"
								alt="Mobile app development"
								fill
								className="object-cover"
							/>
						</div>
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

const FeatureColumn = ({
	title,
	items,
}: {
	title: string;
	items: string[];
}) => (
	<div>
		<h3 className="font-semibold mb-3">{title}</h3>
		<ul className="space-y-2">
			{items.map((item, i) => (
				<li key={i} className="flex items-center gap-2 text-sm">
					<Check className="size-4 text-primary shrink-0" />
					{item}
				</li>
			))}
		</ul>
	</div>
);
