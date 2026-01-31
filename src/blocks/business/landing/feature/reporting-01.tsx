import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	ArrowRight,
	Calendar,
	Download,
	FileSpreadsheet,
	Mail,
	Repeat,
	Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

interface ReportType {
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	frequency: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
					<ReportPreview />

					<div>
						<Eyebrow icon={FileSpreadsheet} text="Reporting" />
						<Title text="Automated Reports" highlight="Delivered to You" />
						<Description text="Schedule comprehensive reports and have them delivered automatically. Export to PDF, Excel, or integrate with your BI tools." />
						<ReportTypes
							items={[
								{
									icon: Calendar,
									title: 'Executive Summary',
									description: 'High-level KPIs and trends',
									frequency: 'Weekly',
								},
								{
									icon: FileSpreadsheet,
									title: 'Detailed Analytics',
									description: 'Full data breakdown',
									frequency: 'Monthly',
								},
								{
									icon: Mail,
									title: 'Team Performance',
									description: 'Individual and team metrics',
									frequency: 'Bi-weekly',
								},
							]}
						/>
						<CTAButton label="Set Up Reports" href="/features/reporting" />
					</div>
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
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight leading-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

const ReportTypes = ({ items }: { items: ReportType[] }) => (
	<div className="space-y-3 mb-6">
		{items.map((report) => (
			<div
				key={report.title}
				className="flex items-center gap-4 p-3 rounded-lg border border-border/50 bg-muted/30"
			>
				<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
					<report.icon className="size-5 text-primary" />
				</div>
				<div className="flex-1">
					<h4 className="font-medium text-sm">{report.title}</h4>
					<p className="text-xs text-muted-foreground">{report.description}</p>
				</div>
				<Badge variant="secondary" className="text-xs">
					{report.frequency}
				</Badge>
			</div>
		))}
	</div>
);

const CTAButton = ({ label, href }: { label: string; href: string }) => (
	<Button size="lg" className="gap-2" asChild>
		<Link href={href}>
			{label}
			<ArrowRight className="size-4" />
		</Link>
	</Button>
);

const ReportPreview = () => (
	<Card className="border-border/50 shadow-xl overflow-hidden">
		<CardContent className="p-0">
			<div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
				<div>
					<h3 className="font-semibold">Monthly Performance Report</h3>
					<p className="text-xs text-muted-foreground">
						Generated automatically on March 1, 2026
					</p>
				</div>
				<Button variant="ghost" size="sm" className="gap-1">
					<Download className="size-4" />
					Export
				</Button>
			</div>
			<div className="p-6">
				<div className="grid grid-cols-3 gap-4 mb-6">
					{[
						{ label: 'Total Revenue', value: '$124.5K', change: '+12%' },
						{ label: 'Active Users', value: '8,429', change: '+8%' },
						{ label: 'Conversion', value: '3.24%', change: '+0.5%' },
					].map((stat) => (
						<div
							key={stat.label}
							className="text-center p-3 rounded-lg bg-muted/50"
						>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
							<p className="text-lg font-bold">{stat.value}</p>
							<p className="text-xs text-emerald-500">{stat.change}</p>
						</div>
					))}
				</div>
				<div className="space-y-2">
					<div className="h-3 rounded bg-muted/50 w-full" />
					<div className="h-3 rounded bg-muted/50 w-4/5" />
					<div className="h-3 rounded bg-muted/50 w-3/4" />
				</div>
			</div>
		</CardContent>
	</Card>
);
