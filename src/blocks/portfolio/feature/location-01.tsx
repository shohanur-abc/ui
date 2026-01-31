import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Globe } from 'lucide-react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
				<div className="grid @xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
					<div>
						<Eyebrow text="Location" />
						<Title text="Based in San Francisco" />
						<Description text="Available for remote work worldwide and on-site projects in the Bay Area. I work with clients across all time zones." />

						<InfoCards
							items={[
								{ icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
								{ icon: Clock, label: 'Timezone', value: 'PST (UTC-8)' },
								{
									icon: Globe,
									label: 'Availability',
									value: 'Remote Worldwide',
								},
							]}
						/>
					</div>

					<MapPlaceholder />
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
	<h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
		{text}
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
		{text}
	</p>
);

interface InfoItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

const InfoCards = ({ items }: { items: InfoItem[] }) => (
	<div className="grid @sm:grid-cols-3 gap-3 @md:gap-4">
		{items.map(({ icon: Icon, label, value }, i) => (
			<Card key={i} className="py-0">
				<CardContent className="p-3 @md:p-4 flex items-center gap-3">
					<div className="size-9 @md:size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
						<Icon className="size-4 @md:size-5 text-primary" />
					</div>
					<div>
						<div className="text-xs text-muted-foreground">{label}</div>
						<div className="font-medium text-sm">{value}</div>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const MapPlaceholder = () => (
	<Card className="py-0 overflow-hidden">
		<CardContent className="p-0">
			<div className="aspect-square @md:aspect-[4/3] bg-muted relative">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<div className="size-16 @md:size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
							<MapPin className="size-8 @md:size-10 text-primary" />
						</div>
						<p className="text-sm @md:text-base font-medium">
							San Francisco, CA
						</p>
						<p className="text-xs @md:text-sm text-muted-foreground">
							Interactive map placeholder
						</p>
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
			</div>
		</CardContent>
	</Card>
);
