'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center">
					<FeaturedTestimonial
						quote="Working with this team transformed how we approach digital products. Their expertise and dedication resulted in a platform that our users love and our business depends on."
						author="Catherine Moore"
						role="Chief Digital Officer, EnterpriseFirst"
						avatar="https://i.pravatar.cc/100?img=11"
					/>

					<div>
						<Header
							eyebrow="Testimonials"
							title="More Success Stories"
							description="Join hundreds of satisfied clients."
						/>
						<TestimonialCarousel
							items={[
								{
									quote: 'Exceptional work that exceeded expectations.',
									author: 'James Wilson',
									role: 'CEO, TechStart',
									avatar: 'https://i.pravatar.cc/100?img=12',
								},
								{
									quote: 'Professional and technically brilliant.',
									author: 'Sarah Chen',
									role: 'CTO, DataFlow',
									avatar: 'https://i.pravatar.cc/100?img=13',
								},
								{
									quote: 'A true partner in our digital journey.',
									author: 'Michael Park',
									role: 'VP Product, ScaleUp',
									avatar: 'https://i.pravatar.cc/100?img=14',
								},
							]}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

const Header = ({
	eyebrow,
	title,
	description,
}: {
	eyebrow: string;
	title: string;
	description: string;
}) => (
	<div className="mb-8">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-2xl @md:text-3xl font-bold tracking-tight mb-2">
			{title}
		</h2>
		<p className="text-muted-foreground">{description}</p>
	</div>
);

const FeaturedTestimonial = ({
	quote,
	author,
	role,
	avatar,
}: TestimonialItem) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="p-8 @md:p-10">
			<Quote className="size-12 opacity-30 mb-6" />
			<blockquote className="text-xl @md:text-2xl leading-relaxed mb-8">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center gap-4">
				<Avatar className="size-14 ring-4 ring-primary-foreground/20">
					<AvatarImage src={avatar} />
					<AvatarFallback className="bg-primary-foreground text-primary text-lg">
						{author[0]}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-semibold text-lg">{author}</div>
					<div className="opacity-80">{role}</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const TestimonialCarousel = ({ items }: { items: TestimonialItem[] }) => (
	<Carousel opts={{ loop: true }} className="w-full">
		<CarouselContent>
			{items.map(({ quote, author, role, avatar }, i) => (
				<CarouselItem key={i}>
					<Card>
						<CardContent className="p-6">
							<blockquote className="text-base leading-relaxed mb-4">
								&ldquo;{quote}&rdquo;
							</blockquote>
							<div className="flex items-center gap-3">
								<Avatar className="size-10">
									<AvatarImage src={avatar} />
									<AvatarFallback className="bg-primary text-primary-foreground text-sm">
										{author[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-semibold text-sm">{author}</div>
									<div className="text-xs text-muted-foreground">{role}</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</CarouselItem>
			))}
		</CarouselContent>
	</Carousel>
);
