import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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
					<Title text="Kind Words" />
				</div>

				<MinimalList
					items={[
						{
							quote:
								'Outstanding work quality and professionalism throughout the entire engagement.',
							author: 'David Foster',
							role: 'CEO, TechStart',
							avatar: 'https://i.pravatar.cc/100?img=88',
						},
						{
							quote:
								'Delivered exceptional results that transformed our business operations completely.',
							author: 'Sarah Martinez',
							role: 'CTO, CloudFirst',
							avatar: 'https://i.pravatar.cc/100?img=89',
						},
						{
							quote:
								'A reliable partner who truly understands both design and development.',
							author: 'James Chen',
							role: 'Product VP, ScaleUp',
							avatar: 'https://i.pravatar.cc/100?img=90',
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h2>
);

const MinimalList = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="max-w-3xl mx-auto space-y-12">
		{items.map(({ quote, author, role, avatar }, i) => (
			<li
				key={i}
				className="flex flex-col @md:flex-row gap-6 @md:gap-8 items-start @md:items-center"
			>
				<Avatar className="size-16 shrink-0">
					<AvatarImage src={avatar} />
					<AvatarFallback className="text-lg bg-primary text-primary-foreground">
						{author[0]}
					</AvatarFallback>
				</Avatar>
				<div>
					<blockquote className="text-lg @md:text-xl leading-relaxed mb-3">
						&ldquo;{quote}&rdquo;
					</blockquote>
					<div className="flex items-center gap-2">
						<span className="font-semibold">{author}</span>
						<span className="text-muted-foreground">·</span>
						<span className="text-muted-foreground">{role}</span>
					</div>
				</div>
			</li>
		))}
	</ul>
);
