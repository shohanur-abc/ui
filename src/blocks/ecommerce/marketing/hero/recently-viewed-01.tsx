import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	RotateCcw,
	History,
	Clock,
	ShoppingBag,
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
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground max-w-xl">{text}</p>
);

const RecentlyViewed = ({
	items,
}: {
	items: { image: string; name: string; price: string; viewedAt: string }[];
}) => (
	<div className="space-y-4">
		{items.map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-4 p-3 rounded-xl border bg-card group hover:border-primary transition-colors"
			>
				<div className="relative size-16 rounded-lg overflow-hidden shrink-0">
					<Image
						src={item.image}
						alt={item.name}
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium truncate">{item.name}</p>
					<p className="text-primary font-bold">{item.price}</p>
					<div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
						<Clock className="size-3" />
						{item.viewedAt}
					</div>
				</div>
				<Button
					size="sm"
					variant="outline"
					className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<ShoppingBag className="size-4" />
				</Button>
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

const RecommendedImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
		<div className="absolute bottom-6 inset-x-6">
			<Badge className="mb-3">Because You Viewed</Badge>
			<h3 className="text-xl text-white font-bold">
				Similar styles you might like
			</h3>
		</div>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
				<div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
					<div className="space-y-8">
						<Eyebrow icon={History} text="Recently Viewed" />
						<Title text="Pick Up Where" highlight="You Left Off" />
						<Description text="Continue shopping from where you left off. Your recently viewed items are saved and ready for you to explore again." />
						<RecentlyViewed
							items={[
								{
									image:
										'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop',
									name: 'Silk Summer Dress',
									price: '$189',
									viewedAt: '2 hours ago',
								},
								{
									image:
										'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
									name: 'Urban Runner Pro',
									price: '$149',
									viewedAt: 'Yesterday',
								},
								{
									image:
										'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop',
									name: 'Leather Crossbody',
									price: '$229',
									viewedAt: '2 days ago',
								},
							]}
						/>
						<CTA
							items={[
								{ label: 'View All History', href: '/history', icon: History },
								{
									label: 'Continue Shopping',
									href: '/shop',
									variant: 'outline',
									icon: ArrowRight,
								},
							]}
						/>
					</div>
					<RecommendedImage
						src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=750&fit=crop"
						alt="Recommended products"
					/>
				</div>
			</div>
		</section>
	);
}
