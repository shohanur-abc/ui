import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<ComparisonLayout
					header={{
						eyebrow: 'Difference',
						title: 'What Makes Me Different',
						description: 'The key differentiators that set my work apart.',
					}}
					columns={[
						{
							title: 'Traditional Developer',
							items: [
								'Writes code to specification',
								'Basic project communication',
								'Standard development practices',
								'Fixed technology stack',
							],
							isHighlighted: false,
						},
						{
							title: 'Working With Me',
							items: [
								'Strategic partner focused on your goals',
								'Proactive updates and transparent process',
								'Modern best practices with documentation',
								'Flexible stack tailored to your needs',
								'Post-launch support and optimization',
							],
							isHighlighted: true,
						},
					]}
				/>
			</div>
		</section>
	);
}

interface HeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

interface ColumnProps {
	title: string;
	items: string[];
	isHighlighted: boolean;
}

interface ComparisonLayoutProps {
	header: HeaderProps;
	columns: ColumnProps[];
}

const ComparisonLayout = ({ header, columns }: ComparisonLayoutProps) => (
	<div>
		<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
			<Badge variant="outline" className="mb-3 @md:mb-4">
				{header.eyebrow}
			</Badge>
			<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
				{header.title}
			</h2>
			<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
				{header.description}
			</p>
		</div>

		<div className="grid @md:grid-cols-2 gap-4 @md:gap-6 max-w-4xl mx-auto">
			{columns.map(({ title, items, isHighlighted }, i) => (
				<Card
					key={i}
					className={`py-0 ${
						isHighlighted
							? 'border-primary bg-primary/5 shadow-lg'
							: 'bg-muted/30'
					}`}
				>
					<CardContent className="p-6 @md:p-8">
						<div className="flex items-center gap-3 mb-6">
							{isHighlighted && <Badge variant="default">Recommended</Badge>}
							<h3 className="font-bold text-lg @md:text-xl">{title}</h3>
						</div>

						<ul className="space-y-3 @md:space-y-4">
							{items.map((item, j) => (
								<li key={j} className="flex items-start gap-3">
									<CheckCircle
										className={`size-5 shrink-0 mt-0.5 ${
											isHighlighted
												? 'text-primary'
												: 'text-muted-foreground/50'
										}`}
									/>
									<span
										className={`text-sm @md:text-base ${
											isHighlighted ? '' : 'text-muted-foreground'
										}`}
									>
										{item}
									</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			))}
		</div>
	</div>
);
