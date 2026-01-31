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
				<div className="grid @lg:grid-cols-2 gap-12 @lg:gap-20 items-center">
					<Header
						eyebrow="Testimonials"
						title="Words from Our Clients"
						description="Simple, honest feedback from the people we've had the privilege to work with."
					/>

					<TestimonialStack
						items={[
							{
								quote: 'Exceptional in every way.',
								author: 'Emily Brown',
								role: 'CEO, StartupX',
								avatar: 'https://i.pravatar.cc/100?img=91',
							},
							{
								quote: 'A true game-changer for our business.',
								author: 'Michael Park',
								role: 'Founder, AppFlow',
								avatar: 'https://i.pravatar.cc/100?img=92',
							},
							{
								quote: 'Highly recommend to anyone.',
								author: 'Lisa Wang',
								role: 'VP, DesignHub',
								avatar: 'https://i.pravatar.cc/100?img=93',
							},
						]}
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
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-lg leading-relaxed">
			{description}
		</p>
	</div>
);

const TestimonialStack = ({ items }: { items: TestimonialItem[] }) => (
	<ul className="space-y-0 divide-y divide-border">
		{items.map(({ quote, author, role, avatar }, i) => (
			<li key={i} className="py-6 first:pt-0 last:pb-0">
				<blockquote className="text-xl @md:text-2xl font-medium mb-4">
					&ldquo;{quote}&rdquo;
				</blockquote>
				<div className="flex items-center gap-3">
					<Avatar className="size-10">
						<AvatarImage src={avatar} />
						<AvatarFallback className="bg-primary text-primary-foreground text-sm">
							{author[0]}
						</AvatarFallback>
					</Avatar>
					<div className="flex items-center gap-2 text-sm">
						<span className="font-medium">{author}</span>
						<span className="text-muted-foreground">·</span>
						<span className="text-muted-foreground">{role}</span>
					</div>
				</div>
			</li>
		))}
	</ul>
);
