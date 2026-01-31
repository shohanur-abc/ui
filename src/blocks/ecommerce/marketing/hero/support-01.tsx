import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	MessageSquare,
	HeadphonesIcon,
	Mail,
	Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: React.ElementType;
	text: string;
}) => (
	<Badge variant="secondary" className="gap-2">
		<Icon className="size-4" />
		{text}
	</Badge>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
		{text}
	</p>
);

const ContactOptions = ({
	options,
}: {
	options: {
		icon: React.ElementType;
		title: string;
		description: string;
		action: string;
		href: string;
	}[];
}) => (
	<div className="grid @md:grid-cols-3 gap-6">
		{options.map(({ icon: Icon, title, description, action, href }, i) => (
			<div
				key={i}
				className="rounded-2xl border bg-card p-6 text-center space-y-4 hover:border-primary transition-colors"
			>
				<div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
					<Icon className="size-7 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold text-lg">{title}</h3>
					<p className="text-sm text-muted-foreground mt-1">{description}</p>
				</div>
				<Button asChild>
					<Link href={href}>{action}</Link>
				</Button>
			</div>
		))}
	</div>
);

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
	<div className="flex justify-center gap-8 @md:gap-12">
		{items.map(({ value, label }, i) => (
			<div key={i} className="text-center">
				<div className="text-3xl font-bold text-primary">{value}</div>
				<div className="text-sm text-muted-foreground">{label}</div>
			</div>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
				<div className="text-center space-y-6">
					<Eyebrow icon={HeadphonesIcon} text="Customer Support" />
					<Title text="We're Here to" highlight="Help" />
					<Description text="Have questions? Our friendly customer support team is available 24/7 to assist you with orders, returns, or anything else." />
				</div>
				<Stats
					items={[
						{ value: '< 2min', label: 'Avg Response' },
						{ value: '24/7', label: 'Availability' },
						{ value: '98%', label: 'Satisfaction' },
					]}
				/>
				<ContactOptions
					options={[
						{
							icon: MessageSquare,
							title: 'Live Chat',
							description: 'Chat with us instantly for quick answers',
							action: 'Start Chat',
							href: '/chat',
						},
						{
							icon: Mail,
							title: 'Email Us',
							description: "Send us an email, we'll reply within 24hrs",
							action: 'Send Email',
							href: '/contact',
						},
						{
							icon: Phone,
							title: 'Call Us',
							description: 'Speak directly with our support team',
							action: 'Call Now',
							href: 'tel:+1234567890',
						},
					]}
				/>
			</div>
		</section>
	);
}
