import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	caseStudyUrl?: string;
}

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
					<Header
						eyebrow="Featured Client"
						title="Enterprise Success"
						description="How we helped a Fortune 500 company transform their digital presence."
					/>

					<FeaturedCard
						quote="This partnership redefined our expectations for what a digital agency could deliver. The technical sophistication, creative excellence, and strategic thinking resulted in a platform that has become a competitive advantage."
						author="Robert Anderson"
						role="Chief Digital Officer"
						company="Fortune 500 Company"
						avatar="https://i.pravatar.cc/100?img=97"
						rating={5}
						caseStudyUrl="#"
					/>
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
	<div>
		<Badge className="mb-4">{eyebrow}</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-lg leading-relaxed">
			{description}
		</p>
	</div>
);

const FeaturedCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	rating,
	caseStudyUrl,
}: TestimonialItem) => (
	<Card className="relative overflow-hidden">
		<CardContent className="p-8 @md:p-10">
			<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

			<Quote className="size-10 text-primary/30 mb-6" />
			<div className="flex gap-1 mb-4">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
					/>
				))}
			</div>
			<blockquote className="text-lg leading-relaxed mb-8">
				&ldquo;{quote}&rdquo;
			</blockquote>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Avatar className="size-14 ring-2 ring-primary/20">
						<AvatarImage src={avatar} />
						<AvatarFallback className="bg-primary text-primary-foreground text-lg">
							{author[0]}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-semibold text-lg">{author}</div>
						<div className="text-muted-foreground">{role}</div>
						<div className="text-sm text-primary font-medium">{company}</div>
					</div>
				</div>

				{caseStudyUrl && (
					<Button variant="outline" size="sm" className="gap-1.5" asChild>
						<Link href={caseStudyUrl}>
							Case Study
							<ExternalLink className="size-3.5" />
						</Link>
					</Button>
				)}
			</div>
		</CardContent>
	</Card>
);
