import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Medal, Trophy, Star } from 'lucide-react';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
					<Eyebrow text="Recognition" />
					<Title text="Awards & Achievements" />
					<Description text="Honored to receive recognition for my contributions to the tech community." />
				</div>

				<AwardsGrid
					items={[
						{
							icon: Trophy,
							title: 'Developer of the Year',
							organization: 'Tech Awards 2023',
							year: '2023',
							description:
								'Recognized for exceptional open source contributions.',
						},
						{
							icon: Medal,
							title: 'Best UI Framework',
							organization: 'React Summit',
							year: '2022',
							description: 'Award for innovative component library design.',
						},
						{
							icon: Award,
							title: 'Top 100 Contributors',
							organization: 'GitHub',
							year: '2022',
							description: 'Named among top global open source contributors.',
						},
						{
							icon: Star,
							title: 'Excellence in Education',
							organization: 'Dev Community',
							year: '2021',
							description: 'For educational content and mentorship.',
						},
					]}
				/>
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
	<h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
		{text}
	</p>
);

interface AwardItem {
	icon: ComponentType<{ className?: string }>;
	title: string;
	organization: string;
	year: string;
	description: string;
}

const AwardsGrid = ({ items }: { items: AwardItem[] }) => (
	<div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5">
		{items.map(({ icon: Icon, title, organization, year, description }, i) => (
			<Card
				key={i}
				className="py-0 text-center group hover:shadow-lg transition-all hover:border-primary/30"
			>
				<CardContent className="p-5 @md:p-6">
					<div className="size-14 @md:size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all">
						<Icon className="size-7 @md:size-8" />
					</div>
					<Badge variant="secondary" className="mb-3 text-xs">
						{year}
					</Badge>
					<h3 className="font-bold text-base @md:text-lg mb-1">{title}</h3>
					<p className="text-xs @md:text-sm text-primary font-medium mb-2">
						{organization}
					</p>
					<p className="text-xs @md:text-sm text-muted-foreground">
						{description}
					</p>
				</CardContent>
			</Card>
		))}
	</div>
);
