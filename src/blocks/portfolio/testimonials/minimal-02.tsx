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
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-12 @md:mb-16">
					<Eyebrow text="What They Say" />
					<Title text="Client Words" />
				</div>

				<SingleTestimonial
					quote="Working with this team was transformative. They took our complex vision and delivered a solution that not only met but exceeded every expectation. The technical excellence and creative approach resulted in a platform our users love."
					author="Victoria Adams"
					role="Chief Product Officer, InnovateTech"
					avatar="https://i.pravatar.cc/100?img=87"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary">{text}</Badge>
	</div>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
		{text}
	</h2>
);

const SingleTestimonial = ({
	quote,
	author,
	role,
	avatar,
}: TestimonialItem) => (
	<div className="text-center">
		<blockquote className="text-xl @md:text-2xl @lg:text-3xl leading-relaxed mb-10 font-light">
			&ldquo;{quote}&rdquo;
		</blockquote>
		<div className="flex flex-col items-center">
			<Avatar className="size-16 @md:size-20 ring-4 ring-muted mb-4">
				<AvatarImage src={avatar} />
				<AvatarFallback className="text-xl bg-primary text-primary-foreground">
					{author[0]}
				</AvatarFallback>
			</Avatar>
			<div className="font-semibold text-lg">{author}</div>
			<div className="text-muted-foreground">{role}</div>
		</div>
	</div>
);
