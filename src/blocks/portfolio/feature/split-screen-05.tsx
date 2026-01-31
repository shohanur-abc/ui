import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, Lightbulb, Rocket, Target } from 'lucide-react';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12">
					<ContentWithCards
						eyebrow="Methodology"
						title="Strategic Approach to Every Project"
						description="A proven framework that ensures successful delivery from concept to launch."
						cards={[
							{
								icon: Compass,
								title: 'Discovery',
								description: 'Understanding goals',
							},
							{
								icon: Lightbulb,
								title: 'Strategy',
								description: 'Planning solutions',
							},
							{
								icon: Target,
								title: 'Execution',
								description: 'Building products',
							},
							{
								icon: Rocket,
								title: 'Launch',
								description: 'Deploying success',
							},
						]}
					/>

					<StackedImages
						images={[
							{
								src: 'https://picsum.photos/seed/method1/600/400',
								alt: 'Strategy session',
							},
							{
								src: 'https://picsum.photos/seed/method2/600/400',
								alt: 'Development process',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

interface CardItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

interface ContentWithCardsProps {
	eyebrow: string;
	title: string;
	description: string;
	cards: CardItem[];
}

const ContentWithCards = ({
	eyebrow,
	title,
	description,
	cards,
}: ContentWithCardsProps) => (
	<div className="flex flex-col justify-center">
		<Badge variant="outline" className="mb-3 @md:mb-4 w-fit">
			{eyebrow}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
			{title}
		</h2>
		<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
			{description}
		</p>

		<div className="grid @sm:grid-cols-2 gap-3 @md:gap-4">
			{cards.map(({ icon: Icon, title, description }, i) => (
				<Card key={i} className="py-0 group hover:shadow-md transition-all">
					<CardContent className="p-4 @md:p-5 flex gap-3">
						<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
							<Icon className="size-5" />
						</div>
						<div>
							<h3 className="font-semibold text-sm @md:text-base">{title}</h3>
							<p className="text-xs @md:text-sm text-muted-foreground">
								{description}
							</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);

interface StackedImagesProps {
	images: { src: string; alt: string }[];
}

const StackedImages = ({ images }: StackedImagesProps) => (
	<div className="relative h-[400px] @md:h-[500px] @xl:h-full">
		<div className="absolute top-0 left-0 w-[85%] h-[60%] rounded-2xl overflow-hidden shadow-xl">
			<Image
				src={images[0].src}
				alt={images[0].alt}
				fill
				className="object-cover"
			/>
		</div>
		<div className="absolute bottom-0 right-0 w-[75%] h-[55%] rounded-2xl overflow-hidden shadow-xl border-4 border-background">
			<Image
				src={images[1].src}
				alt={images[1].alt}
				fill
				className="object-cover"
			/>
		</div>
	</div>
);
