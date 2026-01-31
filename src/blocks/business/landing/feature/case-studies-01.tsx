import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Award,
	Building2,
	Factory,
	Globe2,
	GraduationCap,
	Heart,
	ShoppingCart,
	Sparkles,
	Stethoscope,
	TrendingUp,
} from 'lucide-react';
import { ComponentType } from 'react';

interface CaseStudy {
	icon: ComponentType<{ className?: string }>;
	industry: string;
	company: string;
	metric: string;
	improvement: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Award} text="Case Studies" />
					<Title text="Real Results from" highlight="Real Customers" />
					<Description text="See how companies across industries have transformed their operations with our platform." />
				</div>

				<CaseStudyGrid
					items={[
						{
							icon: ShoppingCart,
							industry: 'E-commerce',
							company: 'ShopMax',
							metric: 'Order Processing',
							improvement: '+180%',
						},
						{
							icon: Building2,
							industry: 'Finance',
							company: 'FinServe',
							metric: 'Compliance Time',
							improvement: '-65%',
						},
						{
							icon: Stethoscope,
							industry: 'Healthcare',
							company: 'MedCare',
							metric: 'Patient Throughput',
							improvement: '+42%',
						},
						{
							icon: GraduationCap,
							industry: 'Education',
							company: 'EduTech',
							metric: 'Student Engagement',
							improvement: '+95%',
						},
						{
							icon: Factory,
							industry: 'Manufacturing',
							company: 'BuildCo',
							metric: 'Production Efficiency',
							improvement: '+38%',
						},
						{
							icon: Globe2,
							industry: 'Travel',
							company: 'TravelNow',
							metric: 'Booking Speed',
							improvement: '+210%',
						},
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

const CaseStudyGrid = ({ items }: { items: CaseStudy[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3">
		{items.map((study) => (
			<Card
				key={study.company}
				className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-lg cursor-pointer"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="flex items-start justify-between mb-4">
						<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
							<study.icon className="size-6 text-primary" />
						</div>
						<Badge variant="secondary" className="text-xs">
							{study.industry}
						</Badge>
					</div>
					<h3 className="font-semibold mb-2">{study.company}</h3>
					<p className="text-sm text-muted-foreground mb-3">{study.metric}</p>
					<div className="flex items-center gap-2">
						<TrendingUp className="size-5 text-emerald-500" />
						<span className="text-2xl font-bold text-emerald-500">
							{study.improvement}
						</span>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);
