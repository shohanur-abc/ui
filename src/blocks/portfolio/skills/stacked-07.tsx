import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<TitleBlock
					eyebrow="Skill Ratings"
					title="Star Rankings"
					description="Visual ratings for each technical skill"
				/>

				<StarRatings
					categories={[
						{
							title: 'Languages',
							skills: [
								{ name: 'TypeScript', rating: 5 },
								{ name: 'JavaScript', rating: 5 },
								{ name: 'Python', rating: 4 },
								{ name: 'Go', rating: 3 },
							],
						},
						{
							title: 'Frameworks',
							skills: [
								{ name: 'React', rating: 5 },
								{ name: 'Next.js', rating: 5 },
								{ name: 'Node.js', rating: 4 },
								{ name: 'FastAPI', rating: 4 },
							],
						},
						{
							title: 'Tools',
							skills: [
								{ name: 'Git', rating: 5 },
								{ name: 'Docker', rating: 4 },
								{ name: 'AWS', rating: 4 },
								{ name: 'Kubernetes', rating: 3 },
							],
						},
					]}
				/>
			</div>
		</section>
	);
}

interface TitleBlockProps {
	eyebrow: string;
	title: string;
	description: string;
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
	<div className="text-center mb-12 @md:mb-16">
		<Badge variant="outline" className="mb-4">
			{eyebrow}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
			{description}
		</p>
	</div>
);

interface Skill {
	name: string;
	rating: number;
}

interface Category {
	title: string;
	skills: Skill[];
}

const StarRatings = ({ categories }: { categories: Category[] }) => (
	<div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
		{categories.map((category, i) => (
			<RatingCard key={i} {...category} />
		))}
	</div>
);

const RatingCard = ({ title, skills }: Category) => (
	<Card className="group hover:border-primary/50 transition-all">
		<CardContent className="p-5 @md:p-6">
			<h4 className="font-bold text-lg mb-5">{title}</h4>
			<div className="space-y-4">
				{skills.map(({ name, rating }, i) => (
					<div key={i} className="flex items-center justify-between">
						<span className="font-medium">{name}</span>
						<StarRating rating={rating} />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5">
		{[1, 2, 3, 4, 5].map((star) => (
			<Star
				key={star}
				className={`size-4 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
			/>
		))}
	</div>
);
