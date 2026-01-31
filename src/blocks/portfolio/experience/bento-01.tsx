import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Briefcase,
	Code,
	Users,
	Award,
	TrendingUp,
	GraduationCap,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow text="Overview" />
					<Title text="Experience at a Glance" />
					<Description text="A comprehensive overview of my professional journey." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
					<BentoCard
						icon={Briefcase}
						title="8+ Years"
						subtitle="Professional Experience"
						description="Building products at scale"
						className="@xl:col-span-2 @xl:row-span-2"
						featured
					/>
					<BentoCard
						icon={Code}
						title="50+"
						subtitle="Projects Shipped"
						description="From startups to enterprise"
					/>
					<BentoCard
						icon={Users}
						title="25+"
						subtitle="Engineers Mentored"
						description="Growing the next generation"
					/>
					<BentoCard
						icon={Award}
						title="5"
						subtitle="Certifications"
						description="AWS, GCP, K8s, and more"
					/>
					<BentoCard
						icon={TrendingUp}
						title="3x"
						subtitle="Career Growth"
						description="Junior to Principal in 8 years"
					/>
					<BentoCard
						icon={GraduationCap}
						title="MS + BS"
						subtitle="Computer Science"
						description="Stanford & UC Berkeley"
						className="@xl:col-span-2"
					/>
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({ text }: { text: string }) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{text}
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

interface BentoCardProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
	description: string;
	className?: string;
	featured?: boolean;
}

const BentoCard = ({
	icon: Icon,
	title,
	subtitle,
	description,
	className = '',
	featured,
}: BentoCardProps) => (
	<Card className={`group hover:shadow-lg transition-all ${className}`}>
		<CardContent
			className={`p-6 h-full flex flex-col ${featured ? 'justify-center items-center text-center' : ''}`}
		>
			<div
				className={`size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors ${featured ? 'size-16' : ''}`}
			>
				<Icon className={`text-primary ${featured ? 'size-8' : 'size-6'}`} />
			</div>
			<p
				className={`font-bold mb-1 ${featured ? 'text-5xl @md:text-6xl' : 'text-3xl'}`}
			>
				{title}
			</p>
			<p className={`text-primary mb-2 ${featured ? 'text-lg' : 'text-sm'}`}>
				{subtitle}
			</p>
			<p
				className={`text-muted-foreground ${featured ? 'text-base' : 'text-xs'}`}
			>
				{description}
			</p>
		</CardContent>
	</Card>
);
