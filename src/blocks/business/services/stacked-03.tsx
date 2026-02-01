import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container" data-theme="services">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<StackedComparison
					eyebrow="Why Choose Us"
					title="The Difference Is Clear"
					description="See how our approach compares to traditional agencies and freelancers."
					columns={[
						{ name: 'Traditional Agency', highlight: false },
						{ name: 'Our Approach', highlight: true },
						{ name: 'Freelancers', highlight: false },
					]}
					features={[
						{
							name: 'Dedicated Project Manager',
							values: [true, true, false],
						},
						{
							name: 'Fixed Price Guarantee',
							values: [false, true, false],
						},
						{
							name: 'Transparent Communication',
							values: ['Limited', 'Daily updates', 'Variable'],
						},
						{
							name: 'Quality Assurance',
							values: [true, true, false],
						},
						{
							name: 'Post-launch Support',
							values: ['30 days', '90 days', 'Negotiable'],
						},
						{
							name: 'Scalable Team',
							values: [true, true, false],
						},
						{
							name: 'Industry Expertise',
							values: ['Generalist', 'Specialized', 'Varies'],
						},
						{
							name: 'Response Time',
							values: ['24-48 hours', 'Same day', '1-3 days'],
						},
						{
							name: 'Cost Efficiency',
							values: ['$$$', '$$', '$'],
						},
						{
							name: 'Long-term Partnership',
							values: [true, true, false],
						},
					]}
					cta={{ label: 'Start Your Project', href: '/contact' }}
				/>
			</div>
		</section>
	);
}

interface Column {
	name: string;
	highlight: boolean;
}

interface Feature {
	name: string;
	values: (boolean | string)[];
}

const StackedComparison = ({
	eyebrow,
	title,
	description,
	columns,
	features,
	cta,
}: {
	eyebrow: string;
	title: string;
	description: string;
	columns: Column[];
	features: Feature[];
	cta: { label: string; href: string };
}) => (
	<div>
		<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
			<Badge variant="outline" className="mb-4">
				{eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
				{title}
			</h2>
			<p className="text-lg text-muted-foreground">{description}</p>
		</div>

		{/* Comparison table */}
		<div className="overflow-x-auto">
			<table className="w-full min-w-[600px]">
				<thead>
					<tr>
						<th className="text-left p-4 font-normal text-muted-foreground">Features</th>
						{columns.map((column, i) => (
							<th
								key={i}
								className={`p-4 text-center font-bold ${
									column.highlight
										? 'bg-primary text-primary-foreground rounded-t-xl'
										: ''
								}`}
							>
								{column.name}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{features.map((feature, i) => (
						<tr key={i} className="border-b">
							<td className="p-4 font-medium">{feature.name}</td>
							{feature.values.map((value, j) => (
								<td
									key={j}
									className={`p-4 text-center ${
										columns[j].highlight ? 'bg-primary/5' : ''
									}`}
								>
									{typeof value === 'boolean' ? (
										value ? (
											<Check className="size-5 text-green-500 mx-auto" />
										) : (
											<X className="size-5 text-muted-foreground mx-auto" />
										)
									) : (
										<span className={columns[j].highlight ? 'font-semibold' : ''}>
											{value}
										</span>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>

		{/* CTA */}
		<div className="text-center mt-10 @md:mt-14">
			<Button size="lg" asChild>
				<Link href={cta.href}>
					{cta.label}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</div>
	</div>
);
