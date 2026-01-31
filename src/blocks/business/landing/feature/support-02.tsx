import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Book,
	FileQuestion,
	Headphones,
	MessageCircle,
	Video,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface SupportChannel {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	action: string;
	href: string;
}

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Headphones} text="Support" />
					<Title text="We're Here to" highlight="Help You Succeed" />
					<Description text="Choose your preferred way to get help. Our team is available 24/7 to assist you." />
				</div>

				<SupportChannels
					items={[
						{
							icon: MessageCircle,
							title: 'Live Chat',
							description: 'Get instant answers from our support team',
							action: 'Start Chat',
							href: '/chat',
						},
						{
							icon: FileQuestion,
							title: 'Help Center',
							description: 'Browse our comprehensive documentation',
							action: 'Browse Docs',
							href: '/docs',
						},
						{
							icon: Video,
							title: 'Video Tutorials',
							description: 'Learn with step-by-step video guides',
							action: 'Watch Now',
							href: '/tutorials',
						},
						{
							icon: Book,
							title: 'Knowledge Base',
							description: 'Find answers in our FAQ articles',
							action: 'Search FAQ',
							href: '/faq',
						},
					]}
				/>

				<ResponseTimeBadge average="< 5 min" />
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4">
		<Badge variant="secondary" className="gap-2 px-3 py-1">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const SupportChannels = ({ items }: { items: SupportChannel[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-4 max-w-5xl mx-auto">
		{items.map((channel) => (
			<Card
				key={channel.title}
				className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
			>
				<CardContent className="p-5 @md:p-6 flex flex-col h-full">
					<div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
						<channel.icon className="size-6 text-primary" />
					</div>
					<h3 className="mb-2 font-semibold">{channel.title}</h3>
					<p className="mb-4 text-sm text-muted-foreground flex-1">
						{channel.description}
					</p>
					<Button
						variant="ghost"
						className="gap-2 justify-start p-0 h-auto text-primary"
						asChild
					>
						<Link href={channel.href}>
							{channel.action}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);

const ResponseTimeBadge = ({ average }: { average: string }) => (
	<div className="mt-10 @md:mt-12 text-center">
		<Badge variant="outline" className="gap-2 px-4 py-2 text-sm">
			<Zap className="size-4 text-primary" />
			Average response time:{' '}
			<span className="font-semibold text-primary">{average}</span>
		</Badge>
	</div>
);
