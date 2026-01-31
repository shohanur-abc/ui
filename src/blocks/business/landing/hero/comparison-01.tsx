import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeftRight, Check, X } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container min-h-screen" data-theme="amber">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center mb-10 @md:mb-14">
					<Eyebrow icon={ArrowLeftRight} text="Compare Solutions" />
					<Title text="See How We Stack Up" />
					<Description text="An honest comparison of features, pricing, and capabilities. Make an informed decision based on what matters most to your business." />
				</div>
				<ComparisonTable
					headers={['Feature', 'Us', 'Competitor A', 'Competitor B']}
					rows={[
						{ feature: 'Unlimited Users', us: true, compA: false, compB: true },
						{
							feature: 'Advanced Analytics',
							us: true,
							compA: true,
							compB: false,
						},
						{ feature: '24/7 Support', us: true, compA: false, compB: false },
						{ feature: 'API Access', us: true, compA: true, compB: true },
						{
							feature: 'Custom Integrations',
							us: true,
							compA: false,
							compB: false,
						},
						{
							feature: 'White-label Option',
							us: true,
							compA: true,
							compB: false,
						},
						{
							feature: 'Starting Price',
							us: '$49/mo',
							compA: '$99/mo',
							compB: '$79/mo',
						},
					]}
				/>
				<div className="text-center mt-10">
					<CTA
						items={[
							{ label: 'Start Free Trial', href: '#trial', icon: ArrowRight },
							{
								label: 'Full Comparison',
								href: '#compare',
								variant: 'outline',
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
		{text}
	</p>
);

const ComparisonTable = ({
	headers,
	rows,
}: {
	headers: string[];
	rows: {
		feature: string;
		us: boolean | string;
		compA: boolean | string;
		compB: boolean | string;
	}[];
}) => (
	<Card className="overflow-hidden">
		<CardContent className="p-0">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-border bg-muted/50">
							{headers.map((header, i) => (
								<th
									key={i}
									className={`px-4 @md:px-6 py-4 text-left font-semibold ${i === 1 ? 'bg-primary/10' : ''}`}
								>
									{header}
									{i === 1 && (
										<Badge className="ml-2 text-xs">Recommended</Badge>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map(({ feature, us, compA, compB }, i) => (
							<tr key={i} className="border-b border-border/50 last:border-0">
								<td className="px-4 @md:px-6 py-4 font-medium">{feature}</td>
								<td className="px-4 @md:px-6 py-4 bg-primary/5">
									<CellValue value={us} highlighted />
								</td>
								<td className="px-4 @md:px-6 py-4">
									<CellValue value={compA} />
								</td>
								<td className="px-4 @md:px-6 py-4">
									<CellValue value={compB} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</CardContent>
	</Card>
);

const CellValue = ({
	value,
	highlighted = false,
}: {
	value: boolean | string;
	highlighted?: boolean;
}) => {
	if (typeof value === 'boolean') {
		return value ? (
			<Check
				className={`size-5 ${highlighted ? 'text-primary' : 'text-green-500'}`}
			/>
		) : (
			<X className="size-5 text-muted-foreground/50" />
		);
	}
	return (
		<span className={highlighted ? 'font-semibold text-primary' : ''}>
			{value}
		</span>
	);
};

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		icon?: ComponentType<{ className?: string }>;
		variant?: 'default' | 'outline';
	}[];
}) => (
	<div className="flex flex-wrap justify-center gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
			<Button key={i} size="lg" variant={variant} className="gap-2" asChild>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);
