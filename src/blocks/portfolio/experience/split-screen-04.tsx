import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-start">
					<Card className="overflow-hidden @xl:order-2">
						<CardContent className="p-0">
							<div className="grid grid-cols-2">
								<CompanyTile
									logo="https://github.com/google.png"
									initials="G"
									name="Google"
									current
								/>
								<CompanyTile
									logo="https://github.com/facebook.png"
									initials="M"
									name="Meta"
								/>
								<CompanyTile
									logo="https://github.com/stripe.png"
									initials="S"
									name="Stripe"
								/>
								<CompanyTile
									logo="https://github.com/github.png"
									initials="GH"
									name="GitHub"
								/>
							</div>
						</CardContent>
					</Card>

					<div className="@xl:order-1">
						<Eyebrow icon={Building2} text="Work History" />
						<Title text="Where I've Built" />
						<Description text="I've had the privilege of working at some of the world's leading technology companies, building products used by billions." />

						<div className="space-y-4 mt-8">
							<StatRow
								icon={Calendar}
								label="Total Experience"
								value="8+ years"
							/>
							<StatRow icon={Building2} label="Companies" value="4 companies" />
							<StatRow icon={Users} label="Teams Led" value="5 teams" />
							<StatRow icon={MapPin} label="Locations" value="3 cities" />
						</div>

						<Button asChild className="mt-8">
							<Link href="/experience">
								View Full Experience <ArrowRight className="size-4 ml-2" />
							</Link>
						</Button>
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

interface CompanyTileProps {
	logo: string;
	initials: string;
	name: string;
	current?: boolean;
}

const CompanyTile = ({ logo, initials, name, current }: CompanyTileProps) => (
	<div
		className={`group relative p-8 flex flex-col items-center justify-center border-b border-r last:border-r-0 hover:bg-muted/50 transition-colors ${current ? 'bg-primary/5' : ''}`}
	>
		{current && (
			<Badge className="absolute top-2 right-2 text-xs">Current</Badge>
		)}
		<Avatar className="size-16 mb-3 group-hover:scale-105 transition-transform">
			<AvatarImage src={logo} alt={name} />
			<AvatarFallback className="text-xl">{initials}</AvatarFallback>
		</Avatar>
		<span className="text-sm font-medium">{name}</span>
	</div>
);

interface StatRowProps {
	icon: ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

const StatRow = ({ icon: Icon, label, value }: StatRowProps) => (
	<div className="flex items-center justify-between py-3 border-b last:border-0">
		<span className="flex items-center gap-2 text-sm text-muted-foreground">
			<Icon className="size-4" />
			{label}
		</span>
		<span className="text-sm font-medium">{value}</span>
	</div>
);
