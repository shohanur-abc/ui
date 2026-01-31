import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, Download, Book, Star } from 'lucide-react';
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
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const CatalogPreview = ({
	pages,
}: {
	pages: { image: string; page: string }[];
}) => (
	<div className="relative">
		<div className="flex gap-4 perspective-1000">
			{pages.map((p, i) => (
				<div
					key={i}
					className="relative aspect-[3/4] w-48 @md:w-56 rounded-lg overflow-hidden shadow-2xl border"
					style={{
						transform: `rotateY(${i * -5}deg) translateZ(${i * -20}px)`,
					}}
				>
					<Image
						src={p.image}
						alt={`Page ${p.page}`}
						fill
						className="object-cover"
					/>
					<div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/50 text-white text-xs">
						Page {p.page}
					</div>
				</div>
			))}
		</div>
	</div>
);

const CatalogInfo = ({
	items,
}: {
	items: { label: string; value: string }[];
}) => (
	<div className="grid grid-cols-2 @sm:grid-cols-4 gap-4">
		{items.map(({ label, value }, i) => (
			<div key={i} className="text-center p-4 rounded-xl border bg-card">
				<p className="text-2xl font-bold text-primary">{value}</p>
				<p className="text-sm text-muted-foreground">{label}</p>
			</div>
		))}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: React.ElementType;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-5" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={Book} text="New Catalog" />
						<Title text="Spring/Summer" highlight="2024 Catalog" />
						<Description text="Explore our latest collection in our beautifully designed catalog. Download it for free or browse online to discover new arrivals, styling tips, and exclusive offers." />
						<CatalogInfo
							items={[
								{ label: 'Pages', value: '120' },
								{ label: 'Collections', value: '8' },
								{ label: 'Products', value: '500+' },
								{ label: 'Exclusives', value: '50' },
							]}
						/>
						<CTA
							items={[
								{
									label: 'Download PDF',
									href: '/catalog/download',
									icon: Download,
								},
								{
									label: 'Browse Online',
									href: '/catalog',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<CatalogPreview
						pages={[
							{
								image:
									'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop',
								page: '1',
							},
							{
								image:
									'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop',
								page: '24',
							},
							{
								image:
									'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop',
								page: '56',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
