import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Get in Touch" />
					<Title text="Let's Work Together" />
					<Description text="Have a project in mind? I'd love to hear about it. Choose how you'd like to connect." />
				</div>

				<ContactOptions
					items={[
						{
							icon: Calendar,
							title: 'Schedule a Call',
							description:
								'Book a free 30-minute consultation to discuss your project.',
							action: { label: 'Book Now', href: '#calendly' },
							highlight: true,
						},
						{
							icon: Mail,
							title: 'Send an Email',
							description:
								"Prefer email? Send me a message and I'll respond within 24 hours.",
							action: { label: 'Email Me', href: 'mailto:hello@example.com' },
							highlight: false,
						},
						{
							icon: MessageCircle,
							title: 'Quick Chat',
							description:
								'For quick questions, reach out on Twitter or LinkedIn.',
							action: { label: 'Message', href: '#social' },
							highlight: false,
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

interface ContactItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	action: { label: string; href: string };
	highlight: boolean;
}

const ContactOptions = ({ items }: { items: ContactItem[] }) => (
	<div className="grid @md:grid-cols-3 gap-4 @md:gap-6 max-w-4xl mx-auto">
		{items.map(({ icon: Icon, title, description, action, highlight }, i) => (
			<Card
				key={i}
				className={`py-0 text-center ${
					highlight ? 'border-primary bg-primary/5 shadow-lg' : ''
				}`}
			>
				<CardContent className="p-6 @md:p-8">
					<div
						className={`size-14 @md:size-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
							highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
						}`}
					>
						<Icon className="size-7 @md:size-8" />
					</div>
					<h3 className="font-bold text-lg @md:text-xl mb-2">{title}</h3>
					<p className="text-sm text-muted-foreground mb-6">{description}</p>
					<Button
						variant={highlight ? 'default' : 'outline'}
						className="w-full"
						asChild
					>
						<Link href={action.href}>
							{action.label}
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		))}
	</div>
);
