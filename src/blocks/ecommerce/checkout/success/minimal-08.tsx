import { Button } from '@/components/ui/button';
import { Gift, Heart } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
	}[];
}

const SuccessIcon = () => (
	<div className="size-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-pink-500/25">
		<Gift className="size-8 text-white" />
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

const RecipientInfo = ({
	name,
	message,
}: {
	name: string;
	message?: string;
}) => (
	<div className="p-4 rounded-xl bg-pink-500/10 text-center">
		<div className="flex items-center justify-center gap-2 mb-2">
			<Heart className="size-4 text-pink-500" />
			<span className="font-medium">{name}</span>
		</div>
		{message && (
			<p className="text-sm text-muted-foreground italic">"{message}"</p>
		)}
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
					title="Gift Sent!"
					description="They're going to love it"
				/>

				<RecipientInfo name="Jane Doe" message="Happy Birthday!" />

				<CTA
					items={[
						{ label: 'Preview', href: '/preview' },
						{ label: 'Edit', href: '/edit', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
