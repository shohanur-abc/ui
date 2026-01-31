import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Layers, X } from 'lucide-react';
import { ComponentType } from 'react';

interface ComparisonItem {
	feature: string;
	us: boolean | string;
	others: boolean | string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Layers} text="Why Choose Us" />
					<Title text="See How We" highlight="Compare" />
					<Description text="We're not just another platform. See how our features stack up against the competition." />
				</div>

				<ComparisonTable
					ourName="Our Platform"
					othersName="Others"
					items={[
						{ feature: 'Unlimited team members', us: true, others: false },
						{ feature: 'Real-time collaboration', us: true, others: 'Limited' },
						{ feature: 'AI-powered automation', us: true, others: false },
						{ feature: 'Custom integrations', us: '500+', others: '50+' },
						{ feature: '24/7 support', us: true, others: 'Business hours' },
						{ feature: 'Data encryption', us: 'AES-256', others: 'AES-128' },
						{ feature: 'Uptime SLA', us: '99.99%', others: '99.9%' },
						{ feature: 'Free migration', us: true, others: false },
					]}
				/>
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
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const ComparisonTable = ({
	ourName,
	othersName,
	items,
}: {
	ourName: string;
	othersName: string;
	items: ComparisonItem[];
}) => (
	<Card className="max-w-3xl mx-auto border-border/50 overflow-hidden">
		<CardContent className="p-0">
			{/* Header */}
			<div className="grid grid-cols-3 p-4 @md:p-5 bg-muted/50">
				<div className="text-sm font-medium text-muted-foreground">Feature</div>
				<div className="text-center text-sm font-semibold text-primary">
					{ourName}
				</div>
				<div className="text-center text-sm font-medium text-muted-foreground">
					{othersName}
				</div>
			</div>
			<Separator />
			{/* Rows */}
			{items.map((item, index) => (
				<div key={item.feature}>
					<div className="grid grid-cols-3 p-4 @md:p-5 items-center">
						<div className="text-sm">{item.feature}</div>
						<div className="flex justify-center">
							<ComparisonValue value={item.us} positive />
						</div>
						<div className="flex justify-center">
							<ComparisonValue value={item.others} />
						</div>
					</div>
					{index < items.length - 1 && <Separator />}
				</div>
			))}
		</CardContent>
	</Card>
);

const ComparisonValue = ({
	value,
	positive,
}: {
	value: boolean | string;
	positive?: boolean;
}) => {
	if (typeof value === 'boolean') {
		return value ? (
			<CheckCircle2
				className={`size-5 ${positive ? 'text-emerald-500' : 'text-muted-foreground'}`}
			/>
		) : (
			<X className="size-5 text-muted-foreground/50" />
		);
	}
	return (
		<span
			className={`text-sm font-medium ${positive ? 'text-primary' : 'text-muted-foreground'}`}
		>
			{value}
		</span>
	);
};
