import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div className="@xl:order-2">
						<Eyebrow text="Design Services" />
						<Title text="UI/UX Design That Converts" />
						<Description text="Create digital experiences that users love. Our design team combines research, strategy, and creativity to deliver interfaces that drive engagement." />

						<ReviewCards
							items={[
								{
									name: 'Emily Johnson',
									role: 'Product Manager, Fintech Inc',
									avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
									rating: 5,
									text: 'Incredible attention to detail. Our conversion rate improved by 40%.',
								},
								{
									name: 'Michael Park',
									role: 'Founder, StartupXYZ',
									avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
									rating: 5,
									text: "The best design team we've ever worked with.",
								},
							]}
						/>

						<Button className="mt-8" asChild>
							<Link href="/contact">
								Start Design Project
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>

					<div className="@xl:order-1 grid grid-cols-2 gap-4">
						<div className="space-y-4">
							<div className="relative aspect-4/5 rounded-xl overflow-hidden">
								<Image
									src="https://picsum.photos/seed/design1/400/500"
									alt="Design work sample"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative aspect-square rounded-xl overflow-hidden">
								<Image
									src="https://picsum.photos/seed/design2/400/400"
									alt="Design work sample"
									fill
									className="object-cover"
								/>
							</div>
						</div>
						<div className="space-y-4 pt-8">
							<div className="relative aspect-square rounded-xl overflow-hidden">
								<Image
									src="https://picsum.photos/seed/design3/400/400"
									alt="Design work sample"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative aspect-4/5 rounded-xl overflow-hidden">
								<Image
									src="https://picsum.photos/seed/design4/400/500"
									alt="Design work sample"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface ReviewItem {
	name: string;
	role: string;
	avatar: string;
	rating: number;
	text: string;
}

const ReviewCards = ({ items }: { items: ReviewItem[] }) => (
	<div className="space-y-3 mt-8">
		{items.map(({ name, role, avatar, rating, text }, i) => (
			<div key={i} className="p-4 bg-muted/50 rounded-xl">
				<div className="flex items-center gap-3 mb-2">
					<Avatar className="size-8">
						<AvatarImage src={avatar} alt={name} />
						<AvatarFallback>
							{name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<p className="text-sm font-medium">{name}</p>
						<p className="text-xs text-muted-foreground">{role}</p>
					</div>
					<div className="flex gap-0.5">
						{Array.from({ length: rating }).map((_, j) => (
							<Star key={j} className="size-3 fill-primary text-primary" />
						))}
					</div>
				</div>
				<p className="text-sm text-muted-foreground">{text}</p>
			</div>
		))}
	</div>
);
