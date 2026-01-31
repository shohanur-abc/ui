import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ThumbsUp,
	Copy,
	ExternalLink,
	Mail,
	ArrowRight,
	HelpCircle,
	Phone,
} from 'lucide-react';
import Link from 'next/link';

interface SupportOptionProps {
	icon: React.ElementType;
	title: string;
	description: string;
	action: string;
	href: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const ThankYouIcon = () => (
	<div className="size-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/25">
		<ThumbsUp className="size-12 text-white" />
	</div>
);

const Title = ({ text, subtitle }: { text: string; subtitle?: string }) => (
	<div className="space-y-2">
		<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold tracking-tight">
			{text}
		</h1>
		{subtitle && (
			<p className="text-lg text-muted-foreground">{subtitle}</p>
		)}
	</div>
);

const OrderDetails = ({
	orderNumber,
	total,
	currency,
}: {
	orderNumber: string;
	total: number;
	currency: string;
}) => (
	<Card className="w-full max-w-md">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground mb-1">Order Number</p>
					<div className="flex items-center gap-2">
						<code className="font-mono font-semibold">{orderNumber}</code>
						<Button variant="ghost" size="icon" className="size-8">
							<Copy className="size-4" />
						</Button>
					</div>
				</div>
				<Separator orientation="vertical" className="h-12" />
				<div className="text-right">
					<p className="text-sm text-muted-foreground mb-1">Total Paid</p>
					<p className="text-2xl font-bold">
						{currency}
						{total.toFixed(2)}
					</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const EmailConfirmation = ({ email }: { email: string }) => (
	<div className="w-full max-w-md p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div className="flex items-start gap-3">
			<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
				<Mail className="size-5 text-primary" />
			</div>
			<div>
				<p className="font-medium">Confirmation Email Sent</p>
				<p className="text-sm text-muted-foreground mt-1">
					We've sent order details and tracking information to{' '}
					<span className="font-medium text-foreground">{email}</span>
				</p>
			</div>
		</div>
	</div>
);

const SupportOption = ({
	icon: Icon,
	title,
	description,
	action,
	href,
}: SupportOptionProps) => (
	<Link
		href={href}
		className="flex items-start gap-3 p-4 rounded-xl border hover:bg-muted/50 transition-colors group"
	>
		<div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
			<Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<ExternalLink className="size-4 text-muted-foreground mt-1" />
	</Link>
);

const SupportSection = ({
	options,
}: {
	options: SupportOptionProps[];
}) => (
	<div className="w-full max-w-md space-y-3">
		<h3 className="text-sm font-medium text-muted-foreground">
			Need Help?
		</h3>
		<div className="space-y-2">
			{options.map((option, i) => (
				<SupportOption key={i} {...option} />
			))}
		</div>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 w-full max-w-md">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const supportOptions: SupportOptionProps[] = [
		{
			icon: HelpCircle,
			title: 'FAQs',
			description: 'Find answers to common questions',
			action: 'View FAQs',
			href: '/faq',
		},
		{
			icon: Phone,
			title: 'Contact Support',
			description: 'Speak with our customer service',
			action: 'Call Now',
			href: '/contact',
		},
	];

	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-8 text-center">
					<ThankYouIcon />

					<Title
						text="Thank You!"
						subtitle="Your order has been successfully placed"
					/>

					<OrderDetails
						orderNumber="ORD-2024-78432"
						total={459.99}
						currency="$"
					/>

					<EmailConfirmation email="customer@example.com" />

					<Separator className="w-full max-w-md" />

					<SupportSection options={supportOptions} />

					<CTA
						items={[
							{
								label: 'View My Orders',
								href: '/orders',
								icon: ArrowRight,
							},
							{
								label: 'Continue Shopping',
								href: '/shop',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
