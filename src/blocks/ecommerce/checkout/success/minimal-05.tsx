import { Button } from '@/components/ui/button';
import { Download, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessIcon = () => (
	<div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
		<CheckCircle className="size-8 text-primary" />
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

const DownloadCount = ({ count }: { count: number }) => (
	<p className="text-center text-sm text-muted-foreground">
		{count} {count === 1 ? 'file' : 'files'} ready for download
	</p>
);

const CTA = ({ items }: CTAProps) => (
	<div className="space-y-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="w-full gap-2"
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
	return (
		<section className="@container min-h-screen flex items-center justify-center py-12">
			<div className="mx-auto max-w-xs px-4 space-y-8 text-center">
				<SuccessIcon />

				<SuccessMessage
					title="Purchase Complete"
					description="Your downloads are ready"
				/>

				<DownloadCount count={3} />

				<CTA
					items={[
						{ label: 'Download All', href: '/downloads', icon: Download },
						{ label: 'View Library', href: '/library', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
