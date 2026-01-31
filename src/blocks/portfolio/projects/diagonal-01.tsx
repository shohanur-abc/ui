import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Scissors, Crop, Slice } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Slice} text="Diagonal" />
					<Title text="Angled Sections" />
					<Description text="Dynamic diagonal cuts creating visual movement." />
				</div>

				<DiagonalLayout
					items={[
						{
							image: 'https://picsum.photos/seed/diag1/1200/600',
							title: 'Financial Analytics',
							description: 'Real-time market data visualization.',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diag2/1200/600',
							title: 'E-Commerce Platform',
							description: 'Modern shopping experience.',
							category: 'Retail',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/diag3/1200/600',
							title: 'Healthcare Portal',
							description: 'Patient-first digital health.',
							category: 'Health',
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

interface DiagonalItem {
	image: string;
	title: string;
	description: string;
	category: string;
	href: string;
}

const DiagonalLayout = ({ items }: { items: DiagonalItem[] }) => (
	<div className="space-y-0 -my-8">
		{items.map(({ image, title, description, category, href }, i) => {
			const isOdd = i % 2 === 1;

			return (
				<div
					key={i}
					className="relative py-16"
					style={{
						clipPath:
							i === 0
								? 'polygon(0 0, 100% 0, 100% calc(100% - 50px), 0 100%)'
								: i === items.length - 1
									? 'polygon(0 50px, 100% 0, 100% 100%, 0 100%)'
									: 'polygon(0 50px, 100% 0, 100% calc(100% - 50px), 0 100%)',
						marginTop: i > 0 ? '-50px' : '0',
					}}
				>
					{/* Background image */}
					<div className="absolute inset-0">
						<Image src={image} alt={title} fill className="object-cover" />
						<div
							className={`absolute inset-0 ${isOdd ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-black/90 via-black/60 to-black/30`}
						/>
					</div>

					{/* Content */}
					<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-20">
						<div className={`max-w-lg ${isOdd ? 'ml-auto text-right' : ''}`}>
							<Badge className="mb-3">{category}</Badge>
							<h3 className="text-white font-bold text-3xl @md:text-4xl mb-3">
								{title}
							</h3>
							<p className="text-white/80 text-lg mb-6">{description}</p>

							<Button variant="secondary" className="gap-2" asChild>
								<Link href={href}>
									View Project <ArrowUpRight className="size-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			);
		})}
	</div>
);
