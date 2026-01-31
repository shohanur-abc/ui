import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Sparkles } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	avatar?: string;
	tags: string[];
}

export default function Main() {
	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Sparkles} text="Featured Reviews" />
					<Title text="What Clients Love" />
					<Description text="Discover why teams choose to work with us." />
				</div>

				<FeaturedTestimonial
					quote="This partnership has been transformative for our business. The technical expertise, creative vision, and dedication to excellence delivered results beyond our highest expectations. Every milestone was hit, every challenge was overcome, and the final product exceeded what we thought was possible."
					author="Alexandra Reynolds"
					role="Chief Product Officer, FutureTech"
					avatar="https://i.pravatar.cc/100?img=72"
					tags={['Enterprise', 'Web Platform', 'Long-term Partnership']}
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline" className="gap-1.5">
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

const FeaturedTestimonial = ({
	quote,
	author,
	role,
	avatar,
	tags,
}: TestimonialItem) => (
	<Card className="max-w-4xl mx-auto overflow-hidden">
		<CardContent className="p-0">
			<div className="grid @lg:grid-cols-3">
				<div className="@lg:col-span-2 p-8 @md:p-10 @lg:p-12">
					<Quote className="size-12 text-primary/30 mb-6" />
					<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag, i) => (
							<Badge key={i} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
				</div>
				<div className="bg-muted/50 p-8 @md:p-10 flex flex-col items-center justify-center text-center">
					<Avatar className="size-24 ring-4 ring-primary/20 mb-4">
						<AvatarImage src={avatar} />
						<AvatarFallback className="text-2xl bg-primary text-primary-foreground">
							{author[0]}
						</AvatarFallback>
					</Avatar>
					<div className="font-semibold text-lg mb-1">{author}</div>
					<div className="text-muted-foreground text-sm">{role}</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
