import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	BookOpen,
	GraduationCap,
	Lightbulb,
	MessageCircle,
	Users,
	Video,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Learning" />
					<Title text="Knowledge Sharing" />
					<Description text="Dedicated to continuous learning and sharing expertise with the community." />
				</div>

				<IconGrid
					items={[
						{
							icon: Video,
							title: 'Tutorials',
							description: 'Video content explaining complex concepts.',
						},
						{
							icon: BookOpen,
							title: 'Articles',
							description: 'In-depth technical blog posts.',
						},
						{
							icon: MessageCircle,
							title: 'Mentoring',
							description: 'One-on-one guidance sessions.',
						},
						{
							icon: Users,
							title: 'Workshops',
							description: 'Interactive group learning.',
						},
						{
							icon: GraduationCap,
							title: 'Courses',
							description: 'Structured learning paths.',
						},
						{
							icon: Lightbulb,
							title: 'Tips',
							description: 'Quick productivity hacks.',
						},
					]}
				/>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface IconItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
}

const IconGrid = ({ items }: { items: IconItem[] }) => (
	<div className="grid @xs:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
		{items.map(({ icon: Icon, title, description }, i) => (
			<Card
				key={i}
				className="py-0 group hover:shadow-lg transition-all border-transparent hover:border-primary/20 bg-muted/30 hover:bg-card"
			>
				<CardContent className="p-5 @md:p-6 flex gap-4">
					<div className="size-10 @md:size-12 rounded-lg bg-background border flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
						<Icon className="size-5 @md:size-6" />
					</div>
					<div>
						<h3 className="font-semibold mb-1">{title}</h3>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
