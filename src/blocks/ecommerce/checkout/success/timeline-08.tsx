import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	CheckCircle,
	Gift,
	Heart,
	Mail,
	Eye,
	Calendar,
	Clock,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface TimelineStepProps {
	icon: React.ElementType;
	title: string;
	description: string;
	date: string;
	status: 'completed' | 'current' | 'upcoming';
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ orderNumber }: { orderNumber: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center">
			<Gift className="size-10 text-rose-500" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-4xl font-bold">Gift Card Sent!</h1>
			<p className="text-muted-foreground">Order #{orderNumber}</p>
		</div>
	</div>
);

const GiftCardPreview = ({
	amount,
	recipientName,
	message,
	style,
}: {
	amount: number;
	recipientName: string;
	message: string;
	style: string;
}) => (
	<Card className="overflow-hidden">
		<div
			className={`p-8 text-white text-center ${
				style === 'birthday'
					? 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500'
					: style === 'holiday'
						? 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500'
						: 'bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500'
			}`}
		>
			<Gift className="size-12 mx-auto mb-4 opacity-80" />
			<p className="text-5xl font-bold">${amount}</p>
			<p className="mt-2 opacity-80">For {recipientName}</p>
		</div>
		<CardContent className="pt-6">
			<div className="p-4 rounded-lg bg-muted/30 text-center">
				<p className="text-sm text-muted-foreground italic">
					&ldquo;{message}&rdquo;
				</p>
			</div>
		</CardContent>
	</Card>
);

const TimelineStep = ({
	icon: Icon,
	title,
	description,
	date,
	status,
}: TimelineStepProps) => (
	<div className="relative flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`size-10 rounded-full flex items-center justify-center ${
					status === 'completed'
						? 'bg-emerald-500 text-white'
						: status === 'current'
							? 'bg-rose-500 text-white ring-4 ring-rose-500/20'
							: 'bg-muted text-muted-foreground'
				}`}
			>
				<Icon className="size-5" />
			</div>
			<div className="flex-1 w-0.5 bg-border mt-2" />
		</div>
		<div className="pb-6 flex-1">
			<div className="flex items-center justify-between">
				<h3
					className={`font-semibold ${
						status === 'upcoming' ? 'text-muted-foreground' : ''
					}`}
				>
					{title}
				</h3>
				<span className="text-sm text-muted-foreground">{date}</span>
			</div>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</div>
);

const RecipientCard = ({
	name,
	email,
	deliveryDate,
	deliveryTime,
}: {
	name: string;
	email: string;
	deliveryDate: string;
	deliveryTime: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<h3 className="font-semibold mb-4">Recipient Details</h3>
			<div className="grid @sm:grid-cols-2 gap-4">
				<div className="flex items-center gap-3">
					<Heart className="size-5 text-rose-500" />
					<div>
						<p className="text-sm text-muted-foreground">Recipient</p>
						<p className="font-medium">{name}</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Mail className="size-5 text-muted-foreground" />
					<div>
						<p className="text-sm text-muted-foreground">Email</p>
						<p className="font-medium">{email}</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Calendar className="size-5 text-muted-foreground" />
					<div>
						<p className="text-sm text-muted-foreground">Delivery Date</p>
						<p className="font-medium">{deliveryDate}</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Clock className="size-5 text-muted-foreground" />
					<div>
						<p className="text-sm text-muted-foreground">Delivery Time</p>
						<p className="font-medium">{deliveryTime}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
				asChild
			>
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const timelineSteps: TimelineStepProps[] = [
		{
			icon: CheckCircle,
			title: 'Gift Purchased',
			description: 'Payment confirmed',
			date: 'Jan 15',
			status: 'completed',
		},
		{
			icon: Gift,
			title: 'Gift Card Created',
			description: 'Design customized',
			date: 'Jan 15',
			status: 'completed',
		},
		{
			icon: Calendar,
			title: 'Scheduled',
			description: 'Waiting for delivery date',
			date: 'Jan 20',
			status: 'current',
		},
		{
			icon: Mail,
			title: 'Email Delivery',
			description: 'Gift card sent to recipient',
			date: 'Jan 20, 9 AM',
			status: 'upcoming',
		},
		{
			icon: Eye,
			title: 'Opened',
			description: 'Recipient viewed the gift',
			date: 'Pending',
			status: 'upcoming',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader orderNumber="GFT-78432" />

				<GiftCardPreview
					amount={100}
					recipientName="Sarah"
					message="Happy Birthday! Wishing you all the best on your special day."
					style="birthday"
				/>

				<RecipientCard
					name="Sarah Johnson"
					email="sarah@example.com"
					deliveryDate="Jan 20, 2024"
					deliveryTime="9:00 AM EST"
				/>

				<Card>
					<CardContent className="pt-6">
						<h2 className="font-semibold mb-6">Gift Journey</h2>
						<div>
							{timelineSteps.map((step, i) => (
								<TimelineStep key={i} {...step} />
							))}
						</div>
					</CardContent>
				</Card>

				<CTA
					items={[
						{ label: 'Preview Email', href: '/preview', icon: Eye },
						{
							label: 'Send Another',
							href: '/gifts',
							variant: 'outline',
							icon: Gift,
						},
					]}
				/>
			</div>
		</section>
	);
}
