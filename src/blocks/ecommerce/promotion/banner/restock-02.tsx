import Link from 'next/link';
import { ArrowRight, Bell, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const NotifyForm = ({ productName }: { productName: string }) => (
	<div className="bg-card rounded-2xl p-6 @md:p-8 border border-border/50 max-w-md mx-auto">
		<div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
			<Bell className="size-8 text-primary" />
		</div>
		<h3 className="text-xl font-bold text-center mb-2">Get Notified</h3>
		<p className="text-sm text-muted-foreground text-center mb-6">
			Be the first to know when <strong>{productName}</strong> is back in stock
		</p>
		<div className="flex gap-2">
			<Input type="email" placeholder="Enter your email" className="flex-1" />
			<Button className="gap-1.5 shrink-0">
				<Mail className="size-4" />
				Notify Me
			</Button>
		</div>
		<div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
			<Check className="size-3 text-green-500" />
			<span>2,450 people waiting</span>
		</div>
	</div>
);

const SectionHeader = ({
	badge,
	headline,
	subtext,
}: {
	badge: { icon: React.ElementType; text: string };
	headline: string;
	subtext: string;
}) => (
	<div className="text-center mb-8">
		<Badge
			variant="outline"
			className="border-yellow-500/50 text-yellow-500 gap-1.5 mb-4"
		>
			<badge.icon className="size-3" />
			{badge.text}
		</Badge>
		<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
			{headline}
		</h2>
		<p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
	</div>
);

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
				<SectionHeader
					badge={{ icon: Bell, text: 'Out of Stock' }}
					headline="Sold Out – Coming Soon!"
					subtext="This popular item flew off the shelves. Sign up to get an alert when it's available."
				/>
				<NotifyForm productName="Premium Wireless Headphones" />
			</div>
		</section>
	);
}
