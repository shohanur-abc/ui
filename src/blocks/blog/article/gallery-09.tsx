import Link from 'next/link';
import {
	Clock,
	ImageIcon,
	ZoomIn,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';

interface AuthorProps {
	name: string;
	avatar: string;
	initials: string;
}

interface GalleryImage {
	src: string;
	alt: string;
	caption: string;
}

interface ArticleProps {
	category: string;
	categoryHref: string;
	title: string;
	subtitle: string;
	author: AuthorProps;
	publishDate: string;
	readTime: string;
	gallery: GalleryImage[];
	content: string[];
}

const CategoryBadge = ({ text, href }: { text: string; href: string }) => (
	<Badge variant="secondary" className="font-medium" asChild>
		<Link href={href}>{text}</Link>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold tracking-tight text-center">
		{text}
	</h1>
);

const Subtitle = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const AuthorMeta = ({
	author,
	publishDate,
	readTime,
}: {
	author: AuthorProps;
	publishDate: string;
	readTime: string;
}) => (
	<div className="flex flex-col items-center gap-3">
		<Avatar className="size-12">
			<AvatarImage src={author.avatar} alt={author.name} />
			<AvatarFallback className="bg-primary/10 text-primary font-semibold">
				{author.initials}
			</AvatarFallback>
		</Avatar>
		<div className="text-center">
			<p className="font-medium">{author.name}</p>
			<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
				<span>{publishDate}</span>
				<span>·</span>
				<div className="flex items-center gap-1">
					<Clock className="size-3.5" />
					<span>{readTime}</span>
				</div>
			</div>
		</div>
	</div>
);

const ImageGallery = ({ images }: { images: GalleryImage[] }) => (
	<div className="relative">
		<div className="flex items-center gap-2 mb-4">
			<ImageIcon className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium text-muted-foreground">
				{images.length} Photos
			</span>
		</div>

		<div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
			{images.map((image, index) => (
				<div
					key={index}
					className={`group relative overflow-hidden rounded-xl ${index === 0 ? '@md:col-span-2' : ''}`}
				>
					<AspectRatio ratio={index === 0 ? 16 / 9 : 4 / 3}>
						<img
							src={image.src}
							alt={image.alt}
							className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
							<p className="text-sm text-white font-medium">{image.caption}</p>
						</div>
						<Button
							variant="secondary"
							size="icon"
							className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full size-9"
						>
							<ZoomIn className="size-4" />
						</Button>
					</AspectRatio>
				</div>
			))}
		</div>

		<div className="flex items-center justify-center gap-2 mt-6">
			<Button variant="outline" size="icon" className="rounded-full size-10">
				<ChevronLeft className="size-5" />
			</Button>
			<div className="flex gap-1.5">
				{images.map((_, index) => (
					<div
						key={index}
						className={`size-2 rounded-full transition-colors ${
							index === 0 ? 'bg-primary' : 'bg-muted-foreground/30'
						}`}
					/>
				))}
			</div>
			<Button variant="outline" size="icon" className="rounded-full size-10">
				<ChevronRight className="size-5" />
			</Button>
		</div>
	</div>
);

const ArticleContent = ({ paragraphs }: { paragraphs: string[] }) => (
	<div className="space-y-6">
		{paragraphs.map((paragraph, index) => (
			<p
				key={index}
				className="text-base @md:text-lg leading-[1.85] text-foreground/90"
			>
				{paragraph}
			</p>
		))}
	</div>
);

export default function Main() {
	const articleData: ArticleProps = {
		category: 'Travel',
		categoryHref: '/blog/category/travel',
		title: 'Hidden Gems of the Pacific Northwest',
		subtitle:
			"Discover lesser-known destinations that showcase the region's stunning natural beauty and unique culture.",
		author: {
			name: 'Elena Vasquez',
			avatar:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
			initials: 'EV',
		},
		publishDate: 'January 28, 2026',
		readTime: '9 min read',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
				alt: 'Mountain landscape',
				caption: 'Sunrise over the Cascade Range',
			},
			{
				src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=600&fit=crop',
				alt: 'Forest trail',
				caption: 'Ancient forests of Olympic National Park',
			},
			{
				src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop',
				alt: 'Waterfall',
				caption: 'Hidden waterfall in the Columbia River Gorge',
			},
		],
		content: [
			"The Pacific Northwest is known for its iconic destinations—Seattle's Space Needle, Portland's quirky neighborhoods, the dramatic Oregon coast. But venture off the beaten path, and you'll discover landscapes and experiences that rival anything in the guidebooks.",
			'Our journey begins in the Methow Valley, a remote corner of north-central Washington that transforms dramatically with the seasons. In winter, it hosts one of the largest cross-country ski trail networks in North America. Come summer, those same trails become hiking and mountain biking paradises.',
			'Further south, the Wallowa Mountains of eastern Oregon offer alpine scenery to match anything in the Rockies. Known as the "Switzerland of Oregon," this range features granite peaks, glacial lakes, and wilderness that sees a fraction of the visitors that crowd the more famous Cascades.',
			'These hidden gems remind us that adventure often lies just beyond the familiar. Sometimes the most memorable experiences come not from ticking off bucket list items, but from embracing the unknown and letting curiosity guide the way.',
		],
	};

	return (
		<section className="@container relative" data-theme="article">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-24">
				<div className="flex flex-col gap-6 @md:gap-8">
					<div className="flex flex-col items-center gap-4 @md:gap-6">
						<CategoryBadge
							text={articleData.category}
							href={articleData.categoryHref}
						/>
						<Title text={articleData.title} />
						<Subtitle text={articleData.subtitle} />
						<AuthorMeta
							author={articleData.author}
							publishDate={articleData.publishDate}
							readTime={articleData.readTime}
						/>
					</div>

					<Separator />

					<ImageGallery images={articleData.gallery} />

					<Separator />

					<div className="max-w-3xl mx-auto">
						<ArticleContent paragraphs={articleData.content} />
					</div>
				</div>
			</div>
		</section>
	);
}
