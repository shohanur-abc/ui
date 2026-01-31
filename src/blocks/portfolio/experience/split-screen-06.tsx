import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight, Trophy, Medal, Star } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-center">
					<div className="@xl:order-2">
						<Eyebrow icon={Award} text="Recognition" />
						<Title text="Awards & Honors" />
						<Description text="Recognition received for technical excellence and leadership throughout my career." />

						<Button asChild className="mt-8">
							<Link href="/awards">
								View All Awards <ArrowRight className="size-4 ml-2" />
							</Link>
						</Button>
					</div>

					<div className="@xl:order-1 grid grid-cols-1 @sm:grid-cols-2 gap-4">
						<AwardCard
							icon={Trophy}
							title="Engineer of the Year"
							org="TechCorp"
							year="2024"
							highlight
						/>
						<AwardCard
							icon={Medal}
							title="Innovation Award"
							org="Meta"
							year="2021"
						/>
						<AwardCard
							icon={Star}
							title="Top Contributor"
							org="React Community"
							year="2023"
						/>
						<AwardCard
							icon={Award}
							title="Patents Filed"
							org="USPTO"
							year="2022"
						/>
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

interface AwardCardProps {
	icon: ComponentType<{ className?: string }>;
	title: string;
	org: string;
	year: string;
	highlight?: boolean;
}

const AwardCard = ({
	icon: Icon,
	title,
	org,
	year,
	highlight,
}: AwardCardProps) => (
	<div
		className={`group p-6 rounded-xl border transition-all hover:shadow-lg ${highlight ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted/50'}`}
	>
		<div
			className={`size-12 rounded-xl flex items-center justify-center mb-4 ${highlight ? 'bg-primary-foreground/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}
		>
			<Icon
				className={`size-6 ${highlight ? 'text-primary-foreground' : 'text-primary'}`}
			/>
		</div>
		<h3 className="font-bold mb-1">{title}</h3>
		<p
			className={`text-sm ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
		>
			{org}
		</p>
		<Badge
			variant={highlight ? 'secondary' : 'outline'}
			className="mt-3 text-xs"
		>
			{year}
		</Badge>
	</div>
);
