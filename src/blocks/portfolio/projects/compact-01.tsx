import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Minimize2, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Minimize2} text="Compact" />
					<Title text="Mini Portfolio" />
					<Description text="Space-efficient project display with essential details." />
				</div>

				<MiniGrid
					items={[
						{
							image: 'https://picsum.photos/seed/mini1/400/300',
							title: 'Dashboard',
							tag: 'React',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini2/400/300',
							title: 'Mobile App',
							tag: 'Native',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini3/400/300',
							title: 'E-Commerce',
							tag: 'Next.js',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini4/400/300',
							title: 'Landing Page',
							tag: 'Astro',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini5/400/300',
							title: 'SaaS App',
							tag: 'Vue',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini6/400/300',
							title: 'Portfolio',
							tag: 'Next.js',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini7/400/300',
							title: 'Blog',
							tag: 'Astro',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini8/400/300',
							title: 'API Service',
							tag: 'Node.js',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini9/400/300',
							title: 'CRM',
							tag: 'React',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini10/400/300',
							title: 'Chat App',
							tag: 'WebSocket',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini11/400/300',
							title: 'Analytics',
							tag: 'D3.js',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/mini12/400/300',
							title: 'Booking',
							tag: 'Next.js',
							href: '#',
						},
					]}
				/>

				<div className="text-center mt-10">
					<Button variant="outline" className="gap-2" asChild>
						<Link href="#expanded">
							<Maximize2 className="size-4" />
							Expand View
						</Link>
					</Button>
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

interface MiniItem {
	image: string;
	title: string;
	tag: string;
	href: string;
}

const MiniGrid = ({ items }: { items: MiniItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-6 gap-3 @md:gap-4">
		{items.map(({ image, title, tag, href }, i) => (
			<Link
				key={i}
				href={href}
				className="group block rounded-lg overflow-hidden bg-card border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-0.5"
			>
				<div className="relative aspect-[4/3] overflow-hidden">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
						<ArrowUpRight className="size-5 text-white" />
					</div>
				</div>
				<div className="p-2 @md:p-3">
					<h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
						{title}
					</h3>
					<Badge variant="secondary" className="text-[10px] mt-1">
						{tag}
					</Badge>
				</div>
			</Link>
		))}
	</div>
);
