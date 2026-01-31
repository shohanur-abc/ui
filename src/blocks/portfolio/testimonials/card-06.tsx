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
					<Eyebrow text="Testimonials" />
					<Title text="Voices of Trust" />
					<Description text="Hear from the people who have experienced the difference." />
				</div>

				<TestimonialGrid
					items={[
						{
							quote:
								'Exceptional quality and professionalism. The final product was exactly what we envisioned, delivered on time and within budget.',
							author: 'Nathan Brooks',
							role: 'CEO, InnovateTech',
							avatar: 'https://i.pravatar.cc/100?img=40',
						},
						{
							quote:
								'A rare combination of technical expertise and creative vision. Our website has never looked or performed better.',
							author: 'Olivia Chen',
							role: 'Creative Director, ArtFlow',
							avatar: 'https://i.pravatar.cc/100?img=41',
						},
						{
							quote:
								'The level of dedication and attention to detail was impressive. Highly recommend for any project.',
							author: 'Michael Torres',
							role: 'Product Manager, CloudSync',
							avatar: 'https://i.pravatar.cc/100?img=42',
						},
						{
							quote:
								'Transformed our complex requirements into an elegant, user-friendly solution. Outstanding work!',
							author: 'Sarah Kim',
							role: 'Director, FinanceHub',
							avatar: 'https://i.pravatar.cc/100?img=43',
						},
						{
							quote:
								'Professional, responsive, and incredibly talented. The project exceeded all expectations.',
							author: 'David Wilson',
							role: 'Founder, StartupLabs',
							avatar: 'https://i.pravatar.cc/100?img=44',
						},
						{
							quote:
								"Best developer we've worked with. Clear communication and exceptional results every time.",
							author: 'Emily Rodriguez',
							role: 'VP Engineering, DataDrive',
							avatar: 'https://i.pravatar.cc/100?img=45',
						},
					]}
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

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{items.map(({ quote, author, role, avatar }, i) => (
			<li key={i}>
				<Card className="h-full group hover:shadow-xl hover:border-primary/30 transition-all duration-300">
					<CardContent className="p-6 flex flex-col h-full">
						<Quote className="size-8 text-primary/30 group-hover:text-primary/50 transition-colors mb-4" />
						<blockquote className="text-base leading-relaxed mb-6 flex-1">
							&ldquo;{quote}&rdquo;
						</blockquote>
						<div className="flex items-center gap-3 pt-4 border-t">
							<Avatar className="size-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
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
			</li>
		))}
	</ul>
);
