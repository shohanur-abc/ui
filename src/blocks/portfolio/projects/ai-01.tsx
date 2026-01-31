import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Cpu, Brain, Sparkles, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Brain} text="AI / ML" />
					<Title text="AI-Powered Projects" />
					<Description text="Projects leveraging artificial intelligence and machine learning." />
				</div>

				<AIGrid
					items={[
						{
							image: 'https://picsum.photos/seed/ai1/800/500',
							title: 'Content Generator',
							description:
								'GPT-powered content creation tool for marketing teams.',
							model: 'GPT-4',
							category: 'NLP',
							features: ['Text Generation', 'Summarization', 'Translation'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ai2/800/500',
							title: 'Image Classifier',
							description: 'Custom vision model for product categorization.',
							model: 'ResNet-50',
							category: 'Computer Vision',
							features: ['Image Recognition', 'Object Detection', 'Tagging'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ai3/800/500',
							title: 'Recommendation Engine',
							description:
								'Personalized content recommendations for e-commerce.',
							model: 'Collaborative Filtering',
							category: 'Recommendations',
							features: ['User Preferences', 'Similar Items', 'Trending'],
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/ai4/800/500',
							title: 'Sentiment Analyzer',
							description:
								'Real-time sentiment analysis for customer feedback.',
							model: 'BERT',
							category: 'NLP',
							features: [
								'Sentiment Scoring',
								'Emotion Detection',
								'Topic Extraction',
							],
							href: '#',
						},
					]}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex justify-center mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface AIItem {
	image: string;
	title: string;
	description: string;
	model: string;
	category: string;
	features: string[];
	href: string;
}

const AIGrid = ({ items }: { items: AIItem[] }) => (
	<div className="grid @md:grid-cols-2 gap-6">
		{items.map(
			({ image, title, description, model, category, features, href }, i) => (
				<Card
					key={i}
					className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0"
				>
					<Link href={href} className="block">
						<div className="relative aspect-video overflow-hidden">
							<Image
								src={image}
								alt={title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

							{/* AI badge */}
							<div className="absolute top-3 left-3 flex gap-2">
								<Badge className="gap-1.5 bg-purple-600">
									<Bot className="size-3" />
									{category}
								</Badge>
								<Badge
									variant="secondary"
									className="bg-black/50 backdrop-blur-sm"
								>
									{model}
								</Badge>
							</div>
						</div>

						<CardContent className="p-5">
							<div className="flex items-start justify-between gap-3 mb-3">
								<h3 className="font-bold text-xl group-hover:text-primary transition-colors">
									{title}
								</h3>
								<ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
							</div>

							<p className="text-sm text-muted-foreground mb-4">
								{description}
							</p>

							{/* Features */}
							<div className="flex items-center gap-4 pt-4 border-t border-border">
								{features.map((feature, j) => (
									<div
										key={j}
										className="flex items-center gap-1.5 text-xs text-muted-foreground"
									>
										<Sparkles className="size-3 text-primary" />
										{feature}
									</div>
								))}
							</div>
						</CardContent>
					</Link>
				</Card>
			),
		)}
	</div>
);
