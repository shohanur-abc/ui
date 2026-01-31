import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, Globe, Play, Star, Users } from 'lucide-react';
import Image from 'next/image';

interface BookProductProps {
	cover: string;
	title: string;
	author: string;
	rating: number;
	reviews: number;
	format: string[];
	language: string;
	pages: number;
	price: number;
}

const BookCover = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative mx-auto w-32 @sm:w-40">
		<div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-primary/20" />
		<div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-xl">
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
	</div>
);

const BookTitle = ({ text }: { text: string }) => (
	<h3 className="text-center text-lg font-bold text-foreground">{text}</h3>
);

const AuthorName = ({ name }: { name: string }) => (
	<p className="text-center text-sm text-muted-foreground">by {name}</p>
);

const BookRating = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center justify-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="text-sm text-muted-foreground">
			({reviews.toLocaleString()})
		</span>
	</div>
);

const FormatBadges = ({ formats }: { formats: string[] }) => (
	<div className="flex justify-center gap-2">
		{formats.map((format, i) => (
			<Badge key={i} variant="outline" className="gap-1 text-xs">
				{format === 'Audiobook' && <Play className="size-3" />}
				{format === 'eBook' && <BookOpen className="size-3" />}
				{format}
			</Badge>
		))}
	</div>
);

const BookMeta = ({ language, pages }: { language: string; pages: number }) => (
	<div className="flex justify-center gap-4 text-xs text-muted-foreground">
		<span className="flex items-center gap-1">
			<Globe className="size-3" />
			{language}
		</span>
		<span>{pages} pages</span>
	</div>
);

const PriceTag = ({ amount }: { amount: number }) => (
	<span className="text-xl font-bold text-foreground">
		${amount.toFixed(2)}
	</span>
);

const ActionButtons = ({
	readLabel,
	buyLabel,
}: {
	readLabel: string;
	buyLabel: string;
}) => (
	<div className="flex gap-2">
		<Button variant="outline" className="flex-1 gap-2">
			<BookOpen className="size-4" />
			{readLabel}
		</Button>
		<Button className="flex-1 gap-2">
			{buyLabel}
			<ArrowRight className="size-4" />
		</Button>
	</div>
);

export default function Main() {
	const book: BookProductProps = {
		cover:
			'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop',
		title: 'The Art of Innovation',
		author: 'Tom Kelley',
		rating: 4.6,
		reviews: 2847,
		format: ['Hardcover', 'eBook', 'Audiobook'],
		language: 'English',
		pages: 320,
		price: 24.99,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-xs px-4 py-8">
				<Card className="space-y-5 p-5">
					<BookCover src={book.cover} alt={book.title} />
					<div className="space-y-2">
						<BookTitle text={book.title} />
						<AuthorName name={book.author} />
						<BookRating rating={book.rating} reviews={book.reviews} />
					</div>
					<FormatBadges formats={book.format} />
					<BookMeta language={book.language} pages={book.pages} />
					<div className="flex items-center justify-center">
						<PriceTag amount={book.price} />
					</div>
					<ActionButtons readLabel="Sample" buyLabel="Buy" />
				</Card>
			</div>
		</section>
	);
}
