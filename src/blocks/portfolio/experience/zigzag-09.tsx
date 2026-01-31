import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Mic,
	Calendar,
	MapPin,
	Users,
	Video,
	ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Mic} text="Speaking" />
					<Title text="Conference Talks" />
					<Description text="Sharing knowledge at events and conferences." />
				</div>

				<div className="max-w-5xl mx-auto space-y-12">
					<TalkZigzag
						title="Scaling Design Systems to 200+ Engineers"
						event="React Summit 2024"
						type="Keynote"
						date="June 2024"
						location="Amsterdam"
						attendees={5000}
						videoUrl="https://youtube.com"
						align="left"
					/>
					<TalkZigzag
						title="The Future of Frontend Performance"
						event="Next.js Conf 2023"
						type="Talk"
						date="October 2023"
						location="San Francisco"
						attendees={3000}
						videoUrl="https://youtube.com"
						align="right"
					/>
					<TalkZigzag
						title="Building Accessible Component Libraries"
						event="JSWorld Conference 2023"
						type="Workshop"
						date="February 2023"
						location="Virtual"
						attendees={500}
						align="left"
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface TalkZigzagProps {
	title: string;
	event: string;
	type: string;
	date: string;
	location: string;
	attendees: number;
	videoUrl?: string;
	align: 'left' | 'right';
}

const TalkZigzag = ({
	title,
	event,
	type,
	date,
	location,
	attendees,
	videoUrl,
	align,
}: TalkZigzagProps) => (
	<div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
		<div className={`${align === 'right' ? '@lg:order-2' : ''}`}>
			<Badge
				variant={type === 'Keynote' ? 'default' : 'secondary'}
				className="mb-4"
			>
				{type}
			</Badge>
			<h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
			<p className="text-primary mb-4">{event}</p>
			<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
				<span className="flex items-center gap-1">
					<Calendar className="size-4" />
					{date}
				</span>
				<span className="flex items-center gap-1">
					<MapPin className="size-4" />
					{location}
				</span>
			</div>
		</div>
		<Card className={`${align === 'right' ? '@lg:order-1' : ''}`}>
			<CardContent className="p-6">
				<div className="flex items-center justify-center gap-3 mb-4">
					<div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
						<Mic className="size-7 text-primary" />
					</div>
					<div className="text-center">
						<p className="text-2xl font-bold">{attendees.toLocaleString()}</p>
						<p className="text-xs text-muted-foreground">Attendees</p>
					</div>
				</div>
				{videoUrl && (
					<Link
						href={videoUrl}
						target="_blank"
						className="flex items-center justify-center gap-1.5 text-sm text-primary hover:underline"
					>
						<Video className="size-4" />
						Watch Recording
						<ExternalLink className="size-3" />
					</Link>
				)}
			</CardContent>
		</Card>
	</div>
);
