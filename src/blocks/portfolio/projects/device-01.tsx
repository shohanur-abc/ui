import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Watch, Smartphone, Monitor, Tablet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Monitor} text="Devices" />
					<Title text="Multi-Device View" />
					<Description text="Projects showcased across different device types." />
				</div>

				<DeviceShowcase
					items={[
						{
							title: 'Banking Suite',
							category: 'Fintech',
							description: 'Complete banking experience across all devices.',
							devices: {
								desktop: 'https://picsum.photos/seed/dev1d/1200/800',
								tablet: 'https://picsum.photos/seed/dev1t/800/1024',
								mobile: 'https://picsum.photos/seed/dev1m/400/800',
								watch: 'https://picsum.photos/seed/dev1w/200/200',
							},
							href: '#',
						},
						{
							title: 'Health Platform',
							category: 'Healthcare',
							description: 'Patient care from any device, anywhere.',
							devices: {
								desktop: 'https://picsum.photos/seed/dev2d/1200/800',
								tablet: 'https://picsum.photos/seed/dev2t/800/1024',
								mobile: 'https://picsum.photos/seed/dev2m/400/800',
							},
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

interface DeviceImages {
	desktop: string;
	tablet?: string;
	mobile?: string;
	watch?: string;
}

interface DeviceItem {
	title: string;
	category: string;
	description: string;
	devices: DeviceImages;
	href: string;
}

const DeviceShowcase = ({ items }: { items: DeviceItem[] }) => (
	<div className="space-y-16">
		{items.map(({ title, category, description, devices, href }, i) => (
			<div key={i} className="group">
				{/* Header */}
				<div className="flex flex-col @md:flex-row @md:items-end @md:justify-between gap-4 mb-8">
					<div>
						<Badge className="mb-2">{category}</Badge>
						<h3 className="font-bold text-2xl @md:text-3xl mb-1">{title}</h3>
						<p className="text-muted-foreground">{description}</p>
					</div>
					<Button variant="outline" className="gap-2 w-fit" asChild>
						<Link href={href}>
							View Project <ArrowUpRight className="size-4" />
						</Link>
					</Button>
				</div>

				{/* Device mockups */}
				<div className="relative flex items-end justify-center gap-4 @md:gap-6 py-8">
					{/* Desktop */}
					<div className="relative flex-shrink-0 hidden @lg:block">
						<div className="relative bg-gray-800 rounded-t-lg p-1.5 pt-5">
							{/* Webcam dot */}
							<div className="absolute top-1.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-gray-600" />
							<div className="relative w-[400px] aspect-[16/10] rounded-sm overflow-hidden bg-muted">
								<Image
									src={devices.desktop}
									alt={`${title} Desktop`}
									fill
									className="object-cover"
								/>
							</div>
						</div>
						{/* Stand */}
						<div className="h-4 bg-gray-800 mx-auto w-20 rounded-b-sm" />
						<div className="h-1 bg-gray-700 mx-auto w-32 rounded-b-lg" />
						<Badge
							variant="outline"
							className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1"
						>
							<Monitor className="size-3" /> Desktop
						</Badge>
					</div>

					{/* Tablet */}
					{devices.tablet && (
						<div className="relative flex-shrink-0 hidden @md:block">
							<div className="relative bg-gray-800 rounded-2xl p-2">
								<div className="relative w-[180px] aspect-[3/4] rounded-lg overflow-hidden bg-muted">
									<Image
										src={devices.tablet}
										alt={`${title} Tablet`}
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<Badge
								variant="outline"
								className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1"
							>
								<Tablet className="size-3" /> Tablet
							</Badge>
						</div>
					)}

					{/* Mobile */}
					{devices.mobile && (
						<div className="relative flex-shrink-0">
							<div className="relative bg-gray-800 rounded-3xl p-2">
								{/* Notch */}
								<div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-800 rounded-full z-10" />
								<div className="relative w-[120px] aspect-[9/19] rounded-2xl overflow-hidden bg-muted">
									<Image
										src={devices.mobile}
										alt={`${title} Mobile`}
										fill
										className="object-cover"
									/>
								</div>
							</div>
							<Badge
								variant="outline"
								className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1"
							>
								<Smartphone className="size-3" /> Mobile
							</Badge>
						</div>
					)}

					{/* Watch */}
					{devices.watch && (
						<div className="relative flex-shrink-0 hidden @sm:block">
							<div className="relative bg-gray-800 rounded-2xl p-1.5">
								<div className="relative size-16 rounded-xl overflow-hidden bg-muted">
									<Image
										src={devices.watch}
										alt={`${title} Watch`}
										fill
										className="object-cover"
									/>
								</div>
							</div>
							{/* Band */}
							<div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-6 bg-gray-700 rounded-t-sm" />
							<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-6 bg-gray-700 rounded-b-sm" />
							<Badge
								variant="outline"
								className="absolute -top-10 left-1/2 -translate-x-1/2 gap-1"
							>
								<Watch className="size-3" /> Watch
							</Badge>
						</div>
					)}
				</div>
			</div>
		))}
	</div>
);
