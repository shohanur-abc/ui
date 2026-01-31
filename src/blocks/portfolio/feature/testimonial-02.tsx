import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<FeaturedTestimonial
					eyebrow="Client Success"
					quote="This developer transformed our outdated platform into a modern, high-performing application. The new system handles 10x the traffic with half the infrastructure costs. Their expertise in both frontend and backend development made this possible."
					author={{
						name: 'James Wilson',
						role: 'VP of Engineering',
						company: 'Enterprise Corp',
						avatar: 'https://i.pravatar.cc/150?u=james',
						initials: 'JW',
					}}
					rating={5}
					stats={[
						{ value: '10x', label: 'Traffic Handled' },
						{ value: '50%', label: 'Cost Reduction' },
						{ value: '99.9%', label: 'Uptime' },
					]}
				/>
			</div>
		</section>
	);
}

interface AuthorProps {
	name: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
}

interface StatItem {
	value: string;
	label: string;
}

interface FeaturedTestimonialProps {
	eyebrow: string;
	quote: string;
	author: AuthorProps;
	rating: number;
	stats: StatItem[];
}

const FeaturedTestimonial = ({
	eyebrow,
	quote,
	author,
	rating,
	stats,
}: FeaturedTestimonialProps) => (
	<div className="max-w-4xl mx-auto text-center">
		<Badge variant="outline" className="mb-6 @md:mb-8">
			{eyebrow}
		</Badge>

		<div className="flex justify-center gap-1 mb-6">
			{Array.from({ length: rating }).map((_, i) => (
				<Star
					key={i}
					className="size-5 @md:size-6 fill-yellow-500 text-yellow-500"
				/>
			))}
		</div>

		<blockquote className="text-lg @sm:text-xl @md:text-2xl @xl:text-3xl font-medium leading-relaxed mb-8 @md:mb-10">
			"{quote}"
		</blockquote>

		<div className="flex flex-col items-center gap-4 mb-10 @md:mb-12">
			<Avatar className="size-14 @md:size-16">
				<AvatarImage src={author.avatar} alt={author.name} />
				<AvatarFallback className="text-lg">{author.initials}</AvatarFallback>
			</Avatar>
			<div>
				<div className="font-semibold text-base @md:text-lg">{author.name}</div>
				<div className="text-sm @md:text-base text-muted-foreground">
					{author.role}, {author.company}
				</div>
			</div>
		</div>

		<div className="flex flex-wrap justify-center gap-8 @md:gap-12">
			{stats.map(({ value, label }, i) => (
				<div key={i}>
					<div className="text-2xl @md:text-3xl font-bold text-primary">
						{value}
					</div>
					<div className="text-sm text-muted-foreground">{label}</div>
				</div>
			))}
		</div>
	</div>
);
