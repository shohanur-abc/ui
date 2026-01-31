'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Star,
	ShoppingCart,
	Heart,
	BookOpen,
	Clock,
	User,
	Award,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BookCoverProps {
	src: string;
	alt: string;
	badges: string[];
}

interface HeaderProps {
	author: string;
	title: string;
	subtitle: string;
}

interface RatingProps {
	rating: number;
	reviews: number;
}

interface PriceProps {
	current: string;
	original?: string;
	format: string;
}

interface BookDetailsProps {
	details: { icon: LucideIcon; label: string; value: string }[];
}

interface DescriptionProps {
	text: string;
}

interface AuthorBioProps {
	name: string;
	avatar: string;
	bio: string;
}

interface FormatsProps {
	formats: { name: string; price: string; selected?: boolean }[];
}

interface ActionsProps {
	buttons: {
		label: string;
		href: string;
		icon?: LucideIcon;
		variant?: 'default' | 'outline';
	}[];
}

const BookCover = ({ src, alt, badges }: BookCoverProps) => (
	<div className="flex justify-center">
		<div className="relative w-64 aspect-[2/3] overflow-hidden rounded-xl shadow-2xl bg-muted">
			<Image src={src} alt={alt} fill className="object-cover" />
			<div className="absolute top-3 right-3 flex flex-col gap-2">
				{badges.map((badge, i) => (
					<Badge key={i} variant={i === 0 ? 'destructive' : 'secondary'}>
						{badge}
					</Badge>
				))}
			</div>
		</div>
	</div>
);

const Header = ({ author, title, subtitle }: HeaderProps) => (
	<div className="text-center space-y-2">
		<p className="text-sm text-primary font-medium uppercase tracking-wider">
			{author}
		</p>
		<h1 className="text-3xl @sm:text-4xl font-bold tracking-tight">{title}</h1>
		<p className="text-muted-foreground text-lg">{subtitle}</p>
	</div>
);

const Rating = ({ rating, reviews }: RatingProps) => (
	<div className="flex items-center justify-center gap-2">
		<div className="flex">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`size-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
				/>
			))}
		</div>
		<span className="font-medium text-lg">{rating}</span>
		<span className="text-muted-foreground">
			({reviews.toLocaleString()} reviews)
		</span>
	</div>
);

const Price = ({ current, original, format }: PriceProps) => (
	<div className="text-center">
		<div className="flex items-baseline justify-center gap-3">
			<span className="text-4xl font-bold text-primary">{current}</span>
			{original && (
				<span className="text-xl text-muted-foreground line-through">
					{original}
				</span>
			)}
		</div>
		<p className="text-sm text-muted-foreground mt-1">{format}</p>
	</div>
);

const BookDetails = ({ details }: BookDetailsProps) => (
	<div className="grid grid-cols-2 @sm:grid-cols-4 gap-3">
		{details.map((detail, i) => (
			<Card key={i} className="bg-muted/30 border-muted text-center">
				<CardContent className="p-4">
					<detail.icon className="size-5 mx-auto mb-2 text-primary" />
					<p className="text-xs text-muted-foreground">{detail.label}</p>
					<p className="font-medium text-sm">{detail.value}</p>
				</CardContent>
			</Card>
		))}
	</div>
);

const Description = ({ text }: DescriptionProps) => (
	<p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
		{text}
	</p>
);

const AuthorBio = ({ name, avatar, bio }: AuthorBioProps) => (
	<Card className="bg-muted/30 border-muted">
		<CardContent className="p-6 flex gap-4">
			<div className="relative size-16 rounded-full overflow-hidden bg-muted shrink-0">
				<Image src={avatar} alt={name} fill className="object-cover" />
			</div>
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-muted-foreground leading-relaxed mt-1">
					{bio}
				</p>
			</div>
		</CardContent>
	</Card>
);

const Formats = ({ formats }: FormatsProps) => (
	<div className="space-y-3">
		<p className="font-medium text-center text-sm uppercase tracking-wide text-muted-foreground">
			Available Formats
		</p>
		<div className="flex justify-center gap-3">
			{formats.map((format, i) => (
				<Button
					key={i}
					variant={format.selected ? 'default' : 'outline'}
					className="flex-col h-auto py-3 px-6"
				>
					<span className="font-medium">{format.name}</span>
					<span className="text-xs opacity-75">{format.price}</span>
				</Button>
			))}
		</div>
	</div>
);

const Actions = ({ buttons }: ActionsProps) => (
	<div className="flex justify-center gap-4">
		{buttons.map((btn, i) => (
			<Button
				key={i}
				variant={btn.variant || 'default'}
				size="lg"
				className="gap-2 px-8"
				asChild
			>
				<Link href={btn.href}>
					{btn.icon && <btn.icon className="size-5" />}
					{btn.label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-4xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="flex flex-col gap-10">
					{/* Cover */}
					<BookCover
						src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600"
						alt="Book cover"
						badges={['#1 Bestseller', 'New Release']}
					/>

					{/* Header */}
					<Header
						author="James Clear"
						title="Atomic Habits"
						subtitle="An Easy & Proven Way to Build Good Habits & Break Bad Ones"
					/>

					{/* Rating */}
					<Rating rating={5} reviews={89432} />

					<Separator />

					{/* Price */}
					<Price current="$16.99" original="$24.99" format="Hardcover" />

					{/* Book details */}
					<BookDetails
						details={[
							{ icon: BookOpen, label: 'Pages', value: '320' },
							{ icon: Clock, label: 'Read Time', value: '6 hours' },
							{ icon: User, label: 'Language', value: 'English' },
							{ icon: Award, label: 'Awards', value: '12+' },
						]}
					/>

					{/* Description */}
					<Description text="No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results." />

					{/* Author bio */}
					<AuthorBio
						name="James Clear"
						avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
						bio="James Clear is an author, speaker, and entrepreneur. His work has appeared in the New York Times, Time, and Entrepreneur, and on CBS This Morning. He is the creator of the Habits Academy."
					/>

					{/* Formats */}
					<Formats
						formats={[
							{ name: 'Hardcover', price: '$16.99', selected: true },
							{ name: 'Paperback', price: '$12.99' },
							{ name: 'Kindle', price: '$9.99' },
							{ name: 'Audiobook', price: '$14.99' },
						]}
					/>

					<Separator />

					{/* Actions */}
					<Actions
						buttons={[
							{ label: 'Add to Cart', href: '#cart', icon: ShoppingCart },
							{
								label: 'Save',
								href: '#wishlist',
								icon: Heart,
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
