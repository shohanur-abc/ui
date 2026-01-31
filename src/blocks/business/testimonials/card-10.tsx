import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Quote } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	location: string;
	flag: string;
}

export default function Main() {
	return (
		<section className="@container" data-theme="testimonial">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Global Reach" />
					<Title text="Worldwide Impact" />
					<Description text="Trusted by businesses across continents and time zones." />
				</div>

				<TestimonialCard
					quote="Despite being on opposite sides of the globe, collaboration was seamless. They understood our unique market needs and delivered a solution that resonated with our local audience."
					author="Yuki Tanaka"
					role="Managing Director"
					company="TechBridge Asia"
					avatar="https://i.pravatar.cc/100?img=35"
					location="Tokyo, Japan"
					flag="🇯🇵"
				/>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<div className="flex justify-center mb-3 @md:mb-4">
		<Badge variant="secondary" className="gap-1.5">
			<Globe className="size-3" />
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
	location,
	flag,
}: TestimonialItem) => (
	<Card className="max-w-3xl mx-auto relative overflow-hidden">
		<GlobeDecorative />
		<CardContent className="p-8 @md:p-12 relative z-10">
			<div className="flex items-center gap-2 mb-6">
				<span className="text-2xl">{flag}</span>
				<span className="text-sm text-muted-foreground">{location}</span>
			</div>
			<Quote className="size-10 text-primary/30 mb-6" />
			<blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-8">
				&ldquo;{quote}&rdquo;
			</blockquote>
			<div className="flex items-center gap-4 pt-6 border-t border-border">
				<Avatar className="size-14 ring-2 ring-primary/20">
					<AvatarImage src={avatar} alt={author} />
					<AvatarFallback className="bg-primary text-primary-foreground">
						{author
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-semibold text-lg">{author}</div>
					<div className="text-sm text-muted-foreground">{role}</div>
					<div className="text-sm text-primary font-medium">{company}</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const GlobeDecorative = () => (
	<div className="absolute -right-20 -top-20 opacity-5">
		<Globe className="size-64" />
	</div>
);
