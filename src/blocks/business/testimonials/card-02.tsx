import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	companyLogo?: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Trusted Worldwide" />
					<Title text="Client Testimonials" highlight="Testimonials" />
					<Description text="Hear from industry leaders who have experienced exceptional results." />
				</div>

				<TestimonialCard
					quote="The level of professionalism and technical expertise demonstrated throughout our project was outstanding. They delivered a robust enterprise solution that has become the backbone of our operations."
					author="Marcus Williams"
					role="VP of Engineering"
					company="GlobalTech Solutions"
					avatar="https://i.pravatar.cc/100?img=3"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="outline" className="gap-1.5 px-4 py-1.5">
			<Building2 className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({
	text,
	highlight,
}: {
	text: string;
	highlight?: string;
}) => {
	if (!highlight) {
		return (
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
				{text}
			</h2>
		);
	}
	const parts = text.split(highlight);
	return (
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{parts[0]}
			<span className="text-primary">{highlight}</span>
			{parts[1]}
		</h2>
	);
};

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
}: TestimonialItem) => (
	<Card className="max-w-4xl mx-auto overflow-hidden">
		<CardContent className="p-0">
			<div className="grid @lg:grid-cols-[1fr_auto]">
				<div className="p-8 @md:p-12">
					<Quote className="size-10 text-primary mb-6" />
					<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-4">
						<Avatar className="size-12 @md:size-14 ring-2 ring-border">
							<AvatarImage src={avatar} alt={author} />
							<AvatarFallback className="bg-primary text-primary-foreground">
								{author
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-semibold text-base @md:text-lg">{author}</div>
							<div className="text-sm text-muted-foreground">{role}</div>
							<div className="text-sm text-primary">{company}</div>
						</div>
					</div>
				</div>
				<div className="hidden @lg:flex items-center justify-center bg-primary/5 p-12 min-w-[200px]">
					<div className="text-center">
						<Building2 className="size-16 text-primary/40 mx-auto mb-4" />
						<div className="text-sm font-medium text-muted-foreground">
							Enterprise
						</div>
						<div className="text-lg font-bold text-primary">Partner</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);
