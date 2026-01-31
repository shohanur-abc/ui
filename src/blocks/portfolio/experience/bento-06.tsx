import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Briefcase,
	Award,
	GraduationCap,
	Users,
	Code,
	TrendingUp,
	Calendar,
} from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container bg-muted/30">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
					<Eyebrow icon={Briefcase} text="Summary" />
					<Title text="Career at a Glance" />
					<Description text="Key highlights from my professional journey." />
				</div>

				<div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
					<BentoTile
						icon={Calendar}
						value="8+"
						label="Years"
						sublabel="Experience"
						className="@md:col-span-1"
					/>
					<BentoTile
						icon={Briefcase}
						value="4"
						label="Companies"
						sublabel="FAANG + Startups"
						className="@md:col-span-1"
					/>
					<BentoTile
						icon={Code}
						value="50+"
						label="Projects"
						sublabel="Shipped"
						className="@md:col-span-1"
					/>
					<BentoTile
						icon={TrendingUp}
						value="40%"
						label="Performance"
						sublabel="Improvement"
						className="@md:col-span-1"
					/>
					<BentoTile
						icon={Users}
						value="25+"
						label="Engineers"
						sublabel="Mentored"
						className="@md:col-span-2"
						featured
					/>
					<BentoTile
						icon={Award}
						value="5"
						label="Awards"
						sublabel="Recognized"
						className="@md:col-span-1"
					/>
					<BentoTile
						icon={GraduationCap}
						value="2"
						label="Degrees"
						sublabel="MS + BS"
						className="@md:col-span-1"
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
	icon?: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="outline" className="mb-3 @md:mb-4">
		{Icon && <Icon className="size-3.5" />}
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

interface BentoTileProps {
	icon: ComponentType<{ className?: string }>;
	value: string;
	label: string;
	sublabel: string;
	className?: string;
	featured?: boolean;
}

const BentoTile = ({
	icon: Icon,
	value,
	label,
	sublabel,
	className = '',
	featured,
}: BentoTileProps) => (
	<Card className={`group hover:shadow-lg transition-all ${className}`}>
		<CardContent
			className={`p-6 h-full flex ${featured ? 'items-center gap-6' : 'flex-col justify-center'}`}
		>
			<div
				className={`rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ${featured ? 'size-16' : 'size-12 mb-4'}`}
			>
				<Icon className={`text-primary ${featured ? 'size-8' : 'size-6'}`} />
			</div>
			<div>
				<p className={`font-bold ${featured ? 'text-4xl' : 'text-3xl'}`}>
					{value}
				</p>
				<p className="text-sm text-primary">{label}</p>
				<p className="text-xs text-muted-foreground">{sublabel}</p>
			</div>
		</CardContent>
	</Card>
);
