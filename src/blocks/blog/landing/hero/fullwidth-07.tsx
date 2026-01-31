import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden min-h-[85vh]"
			data-theme="corporate"
		>
			<BackgroundImage src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920" />
			<div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 @sm:px-6 @2xl:px-8 py-20">
				<Content
					eyebrow="Upcoming Event"
					title="DevConnect Conference 2026"
					description="Join 5,000+ developers for 3 days of talks, workshops, and networking with industry leaders."
					date="March 15-17, 2026"
					location="San Francisco, CA"
					spotsLeft={127}
				/>
			</div>
		</section>
	);
}

interface BackgroundImageProps {
	src: string;
}

const BackgroundImage = ({ src }: BackgroundImageProps) => (
	<>
		<Image src={src} alt="Background" fill className="object-cover" priority />
		<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
	</>
);

interface ContentProps {
	eyebrow: string;
	title: string;
	description: string;
	date: string;
	location: string;
	spotsLeft: number;
}

const Content = ({
	eyebrow,
	title,
	description,
	date,
	location,
	spotsLeft,
}: ContentProps) => (
	<div className="max-w-4xl mx-auto text-center">
		<Badge className="mb-6 bg-primary text-primary-foreground border-0 text-sm py-1.5 px-4">
			<Calendar className="size-4 mr-2" />
			{eyebrow}
		</Badge>
		<h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold text-white mb-6">
			{title}
		</h1>
		<p className="text-lg @md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
			{description}
		</p>
		<div className="flex flex-col @sm:flex-row items-center justify-center gap-6 mb-10 text-white/70">
			<span className="flex items-center gap-2">
				<Calendar className="size-5" />
				{date}
			</span>
			<span className="hidden @sm:block">•</span>
			<span className="flex items-center gap-2">
				<MapPin className="size-5" />
				{location}
			</span>
			<span className="hidden @sm:block">•</span>
			<span className="flex items-center gap-2">
				<Users className="size-5" />
				{spotsLeft} spots left
			</span>
		</div>
		<div className="flex flex-col @sm:flex-row gap-4 justify-center">
			<Button asChild size="lg" className="text-base px-8">
				<Link href="#">
					<Ticket className="size-4 mr-2" />
					Get Your Ticket
				</Link>
			</Button>
			<Button
				asChild
				size="lg"
				variant="outline"
				className="text-base px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
			>
				<Link href="#">View Schedule</Link>
			</Button>
		</div>
	</div>
);
