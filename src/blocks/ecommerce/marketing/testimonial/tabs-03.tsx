'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Quote, Star } from 'lucide-react';

interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
	initials: string;
	rating: number;
	location: string;
}

interface Region {
	id: string;
	label: string;
	flag: string;
	testimonials: TestimonialItem[];
}

const SectionHeader = ({
	badge,
	title,
	description,
}: {
	badge: string;
	title: string;
	description: string;
}) => (
	<div className="text-center mb-12 @lg:mb-16">
		<Badge variant="outline" className="mb-4 gap-2 border-primary/30">
			<Globe className="size-3 text-primary" />
			{badge}
		</Badge>
		<h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
			{title}
		</h2>
		<p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
			{description}
		</p>
	</div>
);

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex gap-0.5 mb-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted/30'}`}
			/>
		))}
	</div>
);

const LocationBadge = ({ location }: { location: string }) => (
	<Badge variant="secondary" className="text-xs font-normal">
		{location}
	</Badge>
);

const RegionalCard = ({ item }: { item: TestimonialItem }) => (
	<Card className="border-border/50 bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group h-full">
		<CardContent className="p-6 flex flex-col h-full">
			<div className="flex items-center justify-between mb-3">
				<Quote className="size-7 text-primary/20" />
				<LocationBadge location={item.location} />
			</div>
			<StarRating rating={item.rating} />
			<p className="text-foreground leading-relaxed flex-1 mb-5">
				"{item.quote}"
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-border/50">
				<Avatar className="size-10 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
					<AvatarImage src={item.avatar} alt={item.author} />
					<AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
						{item.initials}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold text-sm text-foreground">{item.author}</p>
					<p className="text-xs text-muted-foreground">
						{item.role} · {item.company}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const regions: Region[] = [
		{
			id: 'americas',
			label: '🌎 Americas',
			flag: '🌎',
			testimonials: [
				{
					quote: 'The platform works perfectly for our US and LATAM teams.',
					author: 'Patricia Garcia',
					role: 'Regional Director',
					company: 'AmericasFirst',
					avatar:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'PG',
					rating: 5,
					location: 'New York, USA',
				},
				{
					quote: 'Seamless cross-border collaboration for our Mexico offices.',
					author: 'Quentin Reyes',
					role: 'Country Manager',
					company: 'MexiCorp',
					avatar:
						'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
					initials: 'QR',
					rating: 5,
					location: 'Mexico City',
				},
				{
					quote: 'Supporting our rapid expansion across South America.',
					author: 'Rosa Silva',
					role: 'VP Expansion',
					company: 'Brazil Tech',
					avatar:
						'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'RS',
					rating: 5,
					location: 'São Paulo, Brazil',
				},
			],
		},
		{
			id: 'europe',
			label: '🌍 Europe',
			flag: '🌍',
			testimonials: [
				{
					quote: 'GDPR compliance was seamless. No issues whatsoever.',
					author: 'Stefan Mueller',
					role: 'Data Officer',
					company: 'Deutsche Tech',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'SM',
					rating: 5,
					location: 'Berlin, Germany',
				},
				{
					quote:
						'Multi-language support made adoption easy across our EU offices.',
					author: 'Theresa Martin',
					role: 'EU Director',
					company: 'EuroConnect',
					avatar:
						'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
					initials: 'TM',
					rating: 5,
					location: 'Paris, France',
				},
				{
					quote: 'UK and EU teams working together seamlessly.',
					author: 'Ulrich Wright',
					role: 'COO',
					company: 'LondonBridge',
					avatar:
						'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
					initials: 'UW',
					rating: 5,
					location: 'London, UK',
				},
			],
		},
		{
			id: 'apac',
			label: '🌏 Asia-Pacific',
			flag: '🌏',
			testimonials: [
				{
					quote: 'Perfect timezone support for our distributed APAC team.',
					author: 'Vivian Chen',
					role: 'APAC Lead',
					company: 'SingaporeTech',
					avatar:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
					initials: 'VC',
					rating: 5,
					location: 'Singapore',
				},
				{
					quote: 'Local support team understands our regional needs.',
					author: 'William Tanaka',
					role: 'Japan Director',
					company: 'TokyoSoft',
					avatar:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
					initials: 'WT',
					rating: 5,
					location: 'Tokyo, Japan',
				},
				{
					quote: 'Scaling rapidly across Australia and New Zealand.',
					author: 'Xena Roberts',
					role: 'ANZ Manager',
					company: 'AustraliaTech',
					avatar:
						'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
					initials: 'XR',
					rating: 5,
					location: 'Sydney, Australia',
				},
			],
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="testimonial"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<SectionHeader
					badge="Global Impact"
					title="Trusted Worldwide"
					description="Customers across the globe rely on our platform for their success."
				/>

				<Tabs defaultValue="americas" className="w-full">
					<TabsList className="flex justify-center gap-2 mb-10 @lg:mb-14 bg-transparent h-auto">
						{regions.map((region) => (
							<TabsTrigger
								key={region.id}
								value={region.id}
								className="text-base px-5 py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								{region.label}
							</TabsTrigger>
						))}
					</TabsList>

					{regions.map((region) => (
						<TabsContent key={region.id} value={region.id}>
							<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
								{region.testimonials.map((item, index) => (
									<RegionalCard key={index} item={item} />
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
