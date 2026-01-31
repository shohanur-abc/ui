import { Button } from '@/components/ui/button';
import { Ticket, QrCode } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	label: string;
	href: string;
}

const SuccessIcon = () => (
	<div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto">
		<Ticket className="size-8 text-rose-500" />
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

const TicketQR = ({ code }: { code: string }) => (
	<div className="text-center">
		<div className="inline-block p-4 rounded-xl bg-white dark:bg-slate-900 border">
			<div className="size-32 bg-muted rounded-lg flex items-center justify-center mx-auto">
				<QrCode className="size-20 text-muted-foreground/50" />
			</div>
		</div>
		<p className="font-mono font-bold mt-3">{code}</p>
	</div>
);

const CTA = ({ label, href }: CTAProps) => (
	<Button size="lg" className="w-full" asChild>
		<Link href={href}>{label}</Link>
	</Button>
);

export default function Main() {
	return (
		<section className="@container min-h-screen flex items-center justify-center py-12">
			<div className="mx-auto max-w-xs px-4 space-y-6 text-center">
				<SuccessIcon />

				<SuccessMessage
					title="You're In!"
					description="Show this code at the entrance"
				/>

				<TicketQR code="TKT-ABCD-1234" />

				<CTA label="Save Ticket" href="/ticket" />
			</div>
		</section>
	);
}
