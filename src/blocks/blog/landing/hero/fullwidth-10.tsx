import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden min-h-[85vh]"
			data-theme="slate"
		>
			<BackgroundImage src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1920" />
			<div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 @sm:px-6 @2xl:px-8 py-20">
				<Content
					quote="This blog completely changed how I approach software development. The tutorials are clear, practical, and up-to-date with the latest technologies."
					author={{
						name: 'Emily Rodriguez',
						role: 'Senior Developer at Stripe',
						avatar: 'https://i.pravatar.cc/200?img=25',
					}}
					stats={[
						{ value: '50K+', label: 'Monthly Readers' },
						{ value: '500+', label: 'In-depth Articles' },
						{ value: '4.9', label: 'Reader Rating' },
					]}
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
		<div className="absolute inset-0 bg-black/85" />
	</>
);

interface Author {
	name: string;
	role: string;
	avatar: string;
}

interface Stat {
	value: string;
	label: string;
}

interface ContentProps {
	quote: string;
	author: Author;
	stats: Stat[];
}

const Content = ({ quote, author, stats }: ContentProps) => (
	<div className="max-w-4xl mx-auto text-center">
		<Quote className="size-12 text-primary mx-auto mb-8" />
		<blockquote className="text-2xl @sm:text-3xl @lg:text-4xl font-medium text-white leading-relaxed mb-10">
			&ldquo;{quote}&rdquo;
		</blockquote>
		<div className="flex items-center justify-center gap-4 mb-6">
			<Avatar className="size-14 ring-2 ring-primary/30">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback>{author.name[0]}</AvatarFallback>
			</Avatar>
			<div className="text-left">
				<p className="font-semibold text-white">{author.name}</p>
				<p className="text-sm text-white/60">{author.role}</p>
			</div>
		</div>
		<div className="flex justify-center gap-1 mb-12">
			{[...Array(5)].map((_, i) => (
				<Star key={i} className="size-5 fill-amber-500 text-amber-500" />
			))}
		</div>
		<div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mb-12">
			{stats.map((stat) => (
				<div key={stat.label}>
					<p className="text-3xl @md:text-4xl font-bold text-white mb-1">
						{stat.value}
					</p>
					<p className="text-sm text-white/60">{stat.label}</p>
				</div>
			))}
		</div>
		<Button asChild size="lg" className="text-base px-8">
			<Link href="/blog">
				Start Exploring
				<ArrowRight className="size-4 ml-2" />
			</Link>
		</Button>
	</div>
);
