import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CircleDot, Circle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={CircleDot} text="Radial" />
					<Title text="Circular Gallery" />
					<Description text="Projects arranged in a radial, circular pattern." />
				</div>

				<CircularGallery
					centerProject={{
						image: 'https://picsum.photos/seed/circ0/600/600',
						title: 'Featured Project',
						category: 'AI Platform',
						href: '#',
					}}
					orbitProjects={[
						{
							image: 'https://picsum.photos/seed/circ1/400/400',
							title: 'Banking App',
							category: 'Fintech',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/circ2/400/400',
							title: 'E-Commerce',
							category: 'Retail',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/circ3/400/400',
							title: 'Healthcare',
							category: 'Health',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/circ4/400/400',
							title: 'Dashboard',
							category: 'SaaS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/circ5/400/400',
							title: 'Mobile App',
							category: 'iOS',
							href: '#',
						},
						{
							image: 'https://picsum.photos/seed/circ6/400/400',
							title: 'Design System',
							category: 'UI/UX',
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

interface CircularProject {
	image: string;
	title: string;
	category: string;
	href: string;
}

interface CircularGalleryProps {
	centerProject: CircularProject;
	orbitProjects: CircularProject[];
}

const CircularGallery = ({
	centerProject,
	orbitProjects,
}: CircularGalleryProps) => {
	const orbitRadius = 180; // pixels

	return (
		<div className="relative mx-auto w-[500px] h-[500px] max-w-full hidden @lg:block">
			{/* Center project */}
			<Link
				href={centerProject.href}
				className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
			>
				<div className="relative size-full rounded-full overflow-hidden border-4 border-primary shadow-2xl shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
					<Image
						src={centerProject.image}
						alt={centerProject.title}
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
					<div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
						<Badge className="mb-1">{centerProject.category}</Badge>
						<h3 className="text-white font-bold text-sm">
							{centerProject.title}
						</h3>
					</div>
				</div>
			</Link>

			{/* Orbit ring */}
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border"
				style={{ width: orbitRadius * 2 + 80, height: orbitRadius * 2 + 80 }}
			/>

			{/* Orbit projects */}
			{orbitProjects.map(({ image, title, category, href }, i) => {
				const angle = (i * 360) / orbitProjects.length;
				const x = Math.cos((angle - 90) * (Math.PI / 180)) * (orbitRadius + 40);
				const y = Math.sin((angle - 90) * (Math.PI / 180)) * (orbitRadius + 40);

				return (
					<Link
						key={i}
						href={href}
						className="group absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:z-10"
						style={{
							top: `calc(50% + ${y}px)`,
							left: `calc(50% + ${x}px)`,
						}}
					>
						<div className="relative size-full rounded-full overflow-hidden border-2 border-border bg-card shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/20">
							<Image src={image} alt={title} fill className="object-cover" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity p-2">
								<span className="text-white font-bold text-xs leading-tight">
									{title}
								</span>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
