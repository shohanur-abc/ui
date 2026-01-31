import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	LayoutGrid,
	Grid3X3,
	List,
	SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const ViewToggle = ({
	items,
}: {
	items: { icon: React.ElementType; active?: boolean }[];
}) => (
	<div className="flex justify-center gap-1 p-1 rounded-lg border bg-card">
		{items.map(({ icon: Icon, active }, i) => (
			<Button key={i} size="icon-sm" variant={active ? 'default' : 'ghost'}>
				<Icon className="size-4" />
			</Button>
		))}
	</div>
);

const MasonryGrid = ({
	images,
}: {
	images: { src: string; span?: string }[];
}) => (
	<div className="columns-2 @md:columns-3 @lg:columns-4 gap-4 space-y-4">
		{images.map((image, i) => (
			<div
				key={i}
				className="relative rounded-2xl overflow-hidden break-inside-avoid group"
			>
				<Image
					src={image.src}
					alt={`Gallery ${i + 1}`}
					width={400}
					height={i % 3 === 0 ? 500 : i % 2 === 0 ? 400 : 300}
					className="object-cover w-full group-hover:scale-105 transition-transform duration-500"
				/>
				<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
					<Button size="sm" variant="secondary">
						Quick View
					</Button>
				</div>
			</div>
		))}
	</div>
);

const CTA = ({ label, href }: { label: string; href: string }) => (
	<div className="text-center">
		<Button size="lg" className="gap-2" asChild>
			<Link href={href}>
				{label}
				<ArrowRight className="size-5" />
			</Link>
		</Button>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<Eyebrow icon={LayoutGrid} text="Gallery" />
					<Title text="Explore Our" highlight="Collection" />
					<Description text="Browse through our curated gallery of products. Each piece is photographed to showcase its unique details and craftsmanship." />
				</div>
				<ViewToggle
					items={[
						{ icon: Grid3X3, active: true },
						{ icon: LayoutGrid },
						{ icon: List },
					]}
				/>
				<MasonryGrid
					images={[
						{
							src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop',
						},
						{
							src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
						},
						{
							src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
						},
						{
							src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
						},
						{
							src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
						},
						{
							src: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=300&fit=crop',
						},
						{
							src: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
						},
						{
							src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
						},
					]}
				/>
				<CTA label="View Full Gallery" href="/gallery" />
			</div>
		</section>
	);
}
