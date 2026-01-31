import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Quote, Video } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	videoThumbnail?: string;
	videoDuration?: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Video Testimonial" />
					<Title text="Hear It Directly" />
					<Description text="Watch our clients share their success stories in their own words." />
				</div>

				<TestimonialCard
					quote="This partnership transformed how we approach product development. Watch me explain the incredible impact on our business."
					author="Thomas Anderson"
					role="Product Director"
					company="Matrix Solutions"
					avatar="https://i.pravatar.cc/100?img=33"
					videoThumbnail="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop"
					videoDuration="2:34"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline" className="gap-1.5">
			<Video className="size-3" />
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
	<p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
		{text}
	</p>
);

const TestimonialCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	videoThumbnail,
	videoDuration,
}: TestimonialItem) => (
	<Card className="max-w-5xl mx-auto overflow-hidden">
		<CardContent className="p-0">
			<div className="grid @lg:grid-cols-2">
				<div className="relative aspect-video @lg:aspect-auto">
					<img
						src={videoThumbnail}
						alt="Video testimonial thumbnail"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					<VideoOverlayDecorative duration={videoDuration} />
				</div>
				<div className="p-8 @md:p-10 flex flex-col justify-center">
					<Quote className="size-10 text-primary/30 mb-6" />
					<blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-4">
						<Avatar className="size-14 ring-2 ring-border">
							<AvatarImage src={avatar} alt={author} />
							<AvatarFallback className="bg-primary text-primary-foreground">
								{author
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-semibold text-lg">{author}</div>
							<div className="text-sm text-muted-foreground">{role}</div>
							<div className="text-sm text-primary font-medium">{company}</div>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const VideoOverlayDecorative = ({ duration }: { duration?: string }) => (
	<div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer hover:bg-black/50 transition-colors">
		<div className="size-16 @md:size-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
			<Play className="size-8 @md:size-10 text-primary fill-primary ml-1" />
		</div>
		{duration && (
			<div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
				{duration}
			</div>
		)}
	</div>
);
