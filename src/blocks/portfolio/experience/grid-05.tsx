import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Testimonials" />
					<Title text="What People Say" />
					<Description text="Feedback from colleagues and collaborators." />
				</div>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
					<TestimonialCard
						quote="John is the best engineer I've ever worked with. His technical skills are matched only by his ability to mentor and lead."
						author="Sarah Chen"
						role="VP of Engineering"
						company="TechCorp"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
					<TestimonialCard
						quote="Working with John transformed our design system. He brings clarity to complex problems."
						author="Michael Park"
						role="Product Designer"
						company="Meta"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
					<TestimonialCard
						quote="John's mentorship helped me grow from junior to senior in just two years. Forever grateful."
						author="Alex Kim"
						role="Senior Engineer"
						company="Google"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
					<TestimonialCard
						quote="Incredible technical depth combined with strong communication skills. A rare combination."
						author="Emily Wang"
						role="Tech Lead"
						company="Stripe"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
					<TestimonialCard
						quote="John's code reviews are legendary. Thorough, educational, and always constructive."
						author="David Lee"
						role="Staff Engineer"
						company="Netflix"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
					<TestimonialCard
						quote="The design system John built has become the foundation of our entire product suite."
						author="Rachel Park"
						role="Product Manager"
						company="TechCorp"
						avatar="https://github.com/shadcn.png"
						rating={5}
					/>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface TestimonialCardProps {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	rating: number;
}

const TestimonialCard = ({
	quote,
	author,
	role,
	company,
	avatar,
	rating,
}: TestimonialCardProps) => (
	<Card className="h-full hover:shadow-lg transition-all">
		<CardContent className="p-5 h-full flex flex-col">
			<Quote className="size-6 text-primary/20 mb-3" />
			<p className="text-sm italic flex-1 mb-4">&quot;{quote}&quot;</p>
			<div className="flex gap-0.5 mb-3">
				{[...Array(rating)].map((_, i) => (
					<Star key={i} className="size-3.5 text-yellow-500 fill-current" />
				))}
			</div>
			<div className="flex items-center gap-3">
				<Avatar className="size-10">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback>
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium text-sm">{author}</p>
					<p className="text-xs text-muted-foreground">
						{role} · {company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);
