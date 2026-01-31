import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Bell,
	Calendar,
	Mail,
	MessageSquare,
	Sparkles,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="slate">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
					<HeroCell
						title="Stay Connected with What Matters"
						subtitle="Get curated content delivered to you"
						className="@md:col-span-2 row-span-2"
					/>
					<NewsletterCell
						title="Weekly Digest"
						description="Best articles in your inbox"
						className="@xl:col-span-2"
					/>
					<NotificationCell
						items={[
							{
								type: 'comment',
								text: 'New reply on your post',
								time: '2m ago',
							},
							{
								type: 'mention',
								text: '@you in React discussion',
								time: '15m ago',
							},
						]}
						className=""
					/>
					<UpcomingCell
						event={{
							title: 'Live Q&A Session',
							date: 'Feb 5, 2026',
							host: {
								name: 'Alex Kim',
								avatar: 'https://i.pravatar.cc/100?img=50',
							},
						}}
						className=""
					/>
				</div>
			</div>
		</section>
	);
}

interface HeroCellProps {
	title: string;
	subtitle: string;
	className?: string;
}

const HeroCell = ({ title, subtitle, className }: HeroCellProps) => (
	<Card
		className={`relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-transparent flex flex-col justify-center ${className}`}
	>
		<CardContent className="p-6 @md:p-8">
			<Badge variant="secondary" className="mb-4">
				<Sparkles className="size-3.5 mr-1.5" />
				Never Miss Out
			</Badge>
			<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-3">
				{title}
			</h1>
			<p className="text-muted-foreground mb-6 max-w-sm">{subtitle}</p>
			<Button size="lg" asChild className="gap-2">
				<Link href="/subscribe">
					Customize Feed
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

interface NewsletterCellProps {
	title: string;
	description: string;
	className?: string;
}

const NewsletterCell = ({
	title,
	description,
	className,
}: NewsletterCellProps) => (
	<Card className={`${className}`}>
		<CardContent className="p-5 @md:p-6 flex flex-col justify-center h-full">
			<div className="flex items-center gap-3 mb-4">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Mail className="size-5 text-primary" />
				</div>
				<div>
					<p className="font-semibold">{title}</p>
					<p className="text-xs text-muted-foreground">{description}</p>
				</div>
			</div>
			<div className="flex gap-2">
				<Input placeholder="your@email.com" className="h-10 flex-1" />
				<Button size="sm" className="h-10">
					Subscribe
				</Button>
			</div>
		</CardContent>
	</Card>
);

interface NotificationItem {
	type: string;
	text: string;
	time: string;
}

interface NotificationCellProps {
	items: NotificationItem[];
	className?: string;
}

const NotificationCell = ({ items, className }: NotificationCellProps) => (
	<Card className={`${className}`}>
		<CardContent className="p-5">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<Bell className="size-4 text-primary" />
					<span className="font-semibold text-sm">Notifications</span>
				</div>
				<Badge variant="secondary" className="text-[10px]">
					2 new
				</Badge>
			</div>
			<div className="space-y-3">
				{items.map((item, i) => (
					<div key={i} className="flex items-start gap-3">
						<div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
							<MessageSquare className="size-4 text-muted-foreground" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm truncate">{item.text}</p>
							<p className="text-xs text-muted-foreground">{item.time}</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

interface Host {
	name: string;
	avatar: string;
}

interface Event {
	title: string;
	date: string;
	host: Host;
}

interface UpcomingCellProps {
	event: Event;
	className?: string;
}

const UpcomingCell = ({ event, className }: UpcomingCellProps) => (
	<Card className={`bg-gradient-to-br from-accent/10 to-card ${className}`}>
		<CardContent className="p-5 flex flex-col justify-between h-full">
			<div>
				<Badge variant="outline" className="mb-3 text-[10px]">
					<Calendar className="size-3 mr-1" />
					{event.date}
				</Badge>
				<p className="font-semibold">{event.title}</p>
			</div>
			<div className="flex items-center gap-2 mt-3">
				<Avatar className="size-6">
					<AvatarImage src={event.host.avatar} alt={event.host.name} />
					<AvatarFallback className="text-[10px]">
						{event.host.name[0]}
					</AvatarFallback>
				</Avatar>
				<span className="text-xs text-muted-foreground">
					with {event.host.name}
				</span>
			</div>
		</CardContent>
	</Card>
);
