import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Store, QrCode } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const SuccessIcon = () => (
	<div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
		<Store className="size-8 text-emerald-500" />
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
		<Badge className="bg-emerald-500 mb-3">Ready</Badge>
		<h1 className="text-2xl @lg:text-3xl font-bold">{title}</h1>
		<p className="text-muted-foreground mt-2">{description}</p>
	</div>
);

const PickupCode = ({ code }: { code: string }) => (
	<div className="text-center">
		<div className="inline-block p-4 rounded-xl bg-white dark:bg-slate-900 border">
			<div className="size-28 bg-muted rounded-lg flex items-center justify-center mx-auto">
				<QrCode className="size-16 text-muted-foreground/50" />
			</div>
		</div>
		<p className="font-mono text-2xl font-bold mt-3">{code}</p>
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

				<SuccessMessage
					title="Ready for Pickup"
					description="Show this code at the counter"
				/>

				<PickupCode code="PU-4527" />

				<CTA
					items={[
						{ label: 'Directions', href: '/directions' },
						{ label: 'Details', href: '/order', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
