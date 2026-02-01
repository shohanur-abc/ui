import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface CounterStatProps {
	value: string;
	label: string;
	subtext: string;
}

interface HeaderProps {
	badge: string;
	title: string;
	subtitle: string;
}

const Header = ({ badge, title, subtitle }: HeaderProps) => (
	<div className="mb-12 text-center @md:mb-16">
		<Badge variant="secondary" className="mb-4 gap-1.5">
			<Sparkles className="size-3" />
			{badge}
		</Badge>
		<h2 className="text-3xl font-bold tracking-tight @sm:text-4xl @lg:text-5xl">
			{title}
		</h2>
		<p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>
	</div>
);

const CounterStat = ({ value, label, subtext }: CounterStatProps) => (
	<div className="group text-center">
		<div className="inline-flex items-baseline gap-1">
			<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-bold tracking-tighter text-transparent @sm:text-6xl @lg:text-7xl">
				{value}
			</span>
		</div>
		<p className="mt-3 text-lg font-semibold">{label}</p>
		<p className="mt-1 text-sm text-muted-foreground">{subtext}</p>
	</div>
);

export default function Main() {
	const header: HeaderProps = {
		badge: 'By the Numbers',
		title: 'Trusted by Millions',
		subtitle:
			'Our platform has helped businesses of all sizes achieve their e-commerce goals.',
	};

	const stats: CounterStatProps[] = [
		{ value: '250K+', label: 'Active Merchants', subtext: 'Growing every day' },
		{ value: '$12B', label: 'Annual Sales', subtext: 'Processed securely' },
		{
			value: '99.99%',
			label: 'Uptime SLA',
			subtext: 'Enterprise-grade reliability',
		},
		{ value: '150+', label: 'Integrations', subtext: 'Connect your tools' },
	];

	return (
		<section className="@container" data-theme="stats">
			<div className="mx-auto max-w-7xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<Header {...header} />
				<div className="grid gap-8 @sm:grid-cols-2 @lg:gap-12 @xl:grid-cols-4">
					{stats.map((stat, i) => (
						<CounterStat key={i} {...stat} />
					))}
				</div>
			</div>
		</section>
	);
}
