import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wand2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="slate">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @3xl:grid-cols-[1fr_1fr] gap-8 @xl:gap-16 items-start">
					<div>
						<Eyebrow icon={Wand2} text="AI-Powered" />
						<Title text="Let AI Handle the Heavy Lifting" />
						<Description text="Our intelligent automation learns from your workflow and continuously optimizes processes to save you time and money." />
						<BenefitsList
							items={[
								'Reduce manual work by 80%',
								'Cut operational costs by 50%',
								'Improve accuracy to 99.9%',
								'Scale without adding headcount',
							]}
						/>
						<CTA
							items={[
								{ label: 'See AI in Action', href: '#demo', icon: ArrowRight },
								{
									label: 'Read Whitepaper',
									href: '#whitepaper',
									variant: 'outline',
								},
							]}
						/>
					</div>
					<div>
						<ImageStack
							items={[
								{
									src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
									alt: 'AI Analytics',
								},
								{
									src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
									alt: 'Dashboard',
								},
							]}
						/>
					</div>
				</div>
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
	<Badge className="mb-4 @md:mb-6 gap-2">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
		{text}
	</p>
);

const BenefitsList = ({ items }: { items: string[] }) => (
	<ul className="grid @sm:grid-cols-2 gap-3 mb-8 @md:mb-10">
		{items.map((item, i) => (
			<li key={i} className="flex items-center gap-2 text-sm @md:text-base">
				<CheckCircle className="size-5 text-primary shrink-0" />
				<span>{item}</span>
			</li>
		))}
	</ul>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap gap-3 @md:gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const ImageStack = ({ items }: { items: { src: string; alt: string }[] }) => (
	<div className="relative">
		<div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
			<Image
				src={items[0].src}
				alt={items[0].alt}
				width={600}
				height={400}
				className="w-full h-auto"
			/>
		</div>
		<div className="absolute top-8 -right-4 @xl:-right-8 w-3/4 rounded-2xl overflow-hidden shadow-xl border border-border/30 -z-0 opacity-60">
			<Image
				src={items[1].src}
				alt={items[1].alt}
				width={600}
				height={400}
				className="w-full h-auto"
			/>
		</div>
	</div>
);
