import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Smartphone, Tablet, Monitor, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Monitor} text="Responsive" />
					<Title text="Multi-Platform" />
					<Description text="Projects optimized for every screen size and device." />
				</div>

				<ResponsiveShowcase
					items={[
						{
							desktopImage: 'https://picsum.photos/seed/resp1d/1200/800',
							tabletImage: 'https://picsum.photos/seed/resp1t/768/1024',
							mobileImage: 'https://picsum.photos/seed/resp1m/375/812',
							title: 'E-Commerce Platform',
							description: 'Seamless shopping experience across all devices.',
							tags: ['Next.js', 'Tailwind'],
							href: '#',
						},
						{
							desktopImage: 'https://picsum.photos/seed/resp2d/1200/800',
							tabletImage: 'https://picsum.photos/seed/resp2t/768/1024',
							mobileImage: 'https://picsum.photos/seed/resp2m/375/812',
							title: 'Banking Dashboard',
							description: 'Financial overview adapted for any viewport.',
							tags: ['React', 'TypeScript'],
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

interface ResponsiveItem {
	desktopImage: string;
	tabletImage: string;
	mobileImage: string;
	title: string;
	description: string;
	tags: string[];
	href: string;
}

const ResponsiveShowcase = ({ items }: { items: ResponsiveItem[] }) => (
	<div className="space-y-16">
		{items.map(
			(
				{
					desktopImage,
					tabletImage,
					mobileImage,
					title,
					description,
					tags,
					href,
				},
				i,
			) => (
				<div key={i} className="group">
					{/* Device mockups */}
					<div className="relative flex items-end justify-center gap-4 @md:gap-6 mb-8 px-4">
						{/* Desktop */}
						<div className="hidden @lg:block relative w-[60%] max-w-2xl">
							<div className="relative rounded-t-xl bg-zinc-800 p-1.5 pt-4">
								{/* Browser dots */}
								<div className="absolute top-1.5 left-3 flex gap-1.5">
									<div className="size-2 rounded-full bg-red-500" />
									<div className="size-2 rounded-full bg-yellow-500" />
									<div className="size-2 rounded-full bg-green-500" />
								</div>
								<div className="relative aspect-[16/10] rounded overflow-hidden bg-muted">
									<Image
										src={desktopImage}
										alt={`${title} Desktop`}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
								</div>
							</div>
							<div className="h-3 bg-zinc-700 rounded-b-lg" />
							<div className="h-1 w-1/3 mx-auto bg-zinc-600 rounded-b-lg" />
						</div>

						{/* Tablet */}
						<div className="hidden @md:block relative w-[25%] max-w-[200px] z-10">
							<div className="rounded-2xl bg-zinc-800 p-2 shadow-2xl">
								<div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
									<Image
										src={tabletImage}
										alt={`${title} Tablet`}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
								</div>
							</div>
						</div>

						{/* Mobile */}
						<div className="relative w-[20%] max-w-[100px] @md:w-[15%] @md:max-w-[80px] z-20">
							<div className="rounded-2xl bg-zinc-800 p-1 shadow-2xl">
								<div className="relative aspect-[9/19] rounded-xl overflow-hidden bg-muted">
									<Image
										src={mobileImage}
										alt={`${title} Mobile`}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Info */}
					<Card className="max-w-xl mx-auto p-6 text-center border transition-all group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/20">
						<Link href={href} className="block">
							<div className="flex justify-center gap-2 mb-4">
								<Badge variant="outline" className="gap-1.5">
									<Monitor className="size-3" />
									Desktop
								</Badge>
								<Badge variant="outline" className="gap-1.5">
									<Tablet className="size-3" />
									Tablet
								</Badge>
								<Badge variant="outline" className="gap-1.5">
									<Smartphone className="size-3" />
									Mobile
								</Badge>
							</div>

							<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
								{title}
							</h3>
							<p className="text-muted-foreground mb-4">{description}</p>

							<div className="flex items-center justify-center gap-2">
								{tags.map((tag, j) => (
									<Badge key={j} variant="secondary">
										{tag}
									</Badge>
								))}
								<ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
							</div>
						</Link>
					</Card>
				</div>
			),
		)}
	</div>
);
