import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container relative min-h-screen">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				{/* Text Content */}
				<div className="max-w-3xl mx-auto text-center mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Sparkles} text="Creative Portfolio" />
					<Title text="Designing the" highlight="future" suffix="of digital" />
					<Description text="Award-winning designer with 12+ years creating iconic brands, immersive experiences, and design systems for industry leaders." />

					<CTA
						items={[
							{ label: 'Explore Work', href: '#work', icon: ArrowRight },
							{
								label: 'Watch Reel',
								href: '#reel',
								icon: Play,
								variant: 'outline',
							},
						]}
					/>
				</div>

				{/* Featured Projects Preview */}
				<FeaturedProjects
					items={[
						{
							title: 'Nike Brand Refresh',
							category: 'Branding',
							image:
								'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
						},
						{
							title: 'Spotify Wrapped',
							category: 'Product Design',
							image:
								'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=600',
						},
						{
							title: 'Tesla UI System',
							category: 'Design System',
							image:
								'https://images.unsplash.com/photo-1617704548623-340376564e68?w=600',
						},
					]}
				/>

				{/* Clients Marquee */}
				<ClientsSection />
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
	<Badge
		variant="secondary"
		className="inline-flex items-center gap-2 px-4 py-2 mb-6 @md:mb-8"
	>
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({
	text,
	highlight,
	suffix,
}: {
	text: string;
	highlight: string;
	suffix: string;
}) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
		{text}{' '}
		<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
			{highlight}
		</span>
		<br className="hidden @sm:block" /> {suffix}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 @md:mb-10">
		{text}
	</p>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		variant?: React.ComponentProps<typeof Button>['variant'];
		icon?: ComponentType<{ className?: string }>;
	}[];
}) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
				asChild
			>
				<Link href={href}>
					{Icon && i !== 0 && <Icon className="size-4" />}
					{label}
					{Icon && i === 0 && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

interface FeaturedProject {
	title: string;
	category: string;
	image: string;
}

const FeaturedProjects = ({ items }: { items: FeaturedProject[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5 @xl:gap-6 mb-12 @md:mb-16">
		{items.map(({ title, category, image }) => (
			<Link
				key={title}
				href="#"
				className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
			>
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
				<div className="absolute bottom-0 left-0 right-0 p-5 @md:p-6">
					<Badge
						variant="secondary"
						className="mb-2 bg-white/20 text-white border-0 text-xs"
					>
						{category}
					</Badge>
					<h3 className="text-lg @md:text-xl font-semibold text-white flex items-center gap-2">
						{title}
						<ExternalLink className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
					</h3>
				</div>
			</Link>
		))}
	</div>
);

const ClientsSection = () => (
	<div className="text-center">
		<p className="text-sm text-muted-foreground mb-6">
			Trusted by leading brands
		</p>
		<div className="flex flex-wrap justify-center items-center gap-8 @md:gap-12 opacity-50">
			{['Google', 'Apple', 'Nike', 'Spotify', 'Tesla'].map((client) => (
				<span key={client} className="text-lg @md:text-xl font-semibold">
					{client}
				</span>
			))}
		</div>
	</div>
);
