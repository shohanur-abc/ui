import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Client Feedback" />
					<Title text="What Clients Say" />
					<Description text="Trusted by professionals and businesses worldwide." />
				</div>

				<TestimonialCard
					quote="An exceptional developer who transformed our vision into reality. The attention to detail and commitment to quality was outstanding throughout the project."
					author="Alexandra Smith"
					role="Product Lead, DesignCraft"
					avatar="https://i.pravatar.cc/100?img=5"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline">{text}</Badge>
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

const TestimonialCard = ({ quote, author, role, avatar }: TestimonialItem) => (
	<Card className="max-w-2xl mx-auto">
		<CardContent className="p-8 @md:p-10">
			<Quote className="size-10 @md:size-12 text-primary/20 mb-6" />
			<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center gap-4">
				<Avatar className="size-12 @md:size-14 ring-2 ring-border">
					<AvatarImage src={avatar} />
					<AvatarFallback className="bg-primary text-primary-foreground">
						{author[0]}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-semibold text-base @md:text-lg">{author}</div>
					<div className="text-sm @md:text-base text-muted-foreground">
						{role}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
