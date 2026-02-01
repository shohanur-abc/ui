import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Clock } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const SuccessIcon = () => (
	<div className="size-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto">
		<CalendarCheck className="size-8 text-violet-500" />
	</div>
);

const SuccessMessage = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className="text-center">
		<h1 className="text-2xl @lg:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-2">{description}</p>
	</div>
);

const AppointmentTime = ({ date, time }: { date: string; time: string }) => (
	<div className="p-4 rounded-xl bg-violet-500/10 text-center">
		<p className="font-bold text-lg">{date}</p>
		<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-1">
			<Clock className="size-4" />
			<span>{time}</span>
		</div>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex gap-3">
		{items.map(({ label, href, variant }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1"
				asChild
			>
				<Link href={href}>{label}</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	return (
		<section className="@container min-h-screen flex items-center justify-center py-12">
			<div className="mx-auto max-w-xs px-4 space-y-6 text-center">
				<SuccessIcon />

				<SuccessMessage title="Booking Confirmed" description="See you soon!" />

				<AppointmentTime date="Saturday, Jan 20" time="10:00 AM" />

				<CTA
					items={[
						{ label: 'Add to Calendar', href: '/calendar' },
						{ label: 'Details', href: '/booking', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
