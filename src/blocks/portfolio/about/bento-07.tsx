import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Languages, MapPin, Plane, Wallet } from 'lucide-react';
import Image from 'next/image';

export default function Main() {
	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					<ProfileCard
						src="https://picsum.photos/seed/bento7/400/400"
						fallback="NK"
						name="Nina Kim"
						role="Freelance Designer"
						status="Currently in: Barcelona"
					/>
					<BioCard
						title="Digital Nomad"
						description="I've been traveling the world while designing for startups. 40+ countries, 100+ projects, and counting."
						className="@lg:col-span-2"
					/>
					<GalleryCard
						images={[
							{
								src: 'https://picsum.photos/seed/bento7a/300/300',
								alt: 'Travel 1',
							},
							{
								src: 'https://picsum.photos/seed/bento7b/300/300',
								alt: 'Travel 2',
							},
							{
								src: 'https://picsum.photos/seed/bento7c/300/300',
								alt: 'Travel 3',
							},
							{
								src: 'https://picsum.photos/seed/bento7d/300/300',
								alt: 'Travel 4',
							},
						]}
						className="@lg:row-span-2"
					/>
					<StatCard icon={Plane} value="40+" label="Countries Visited" />
					<StatCard icon={Languages} value="4" label="Languages Spoken" />
					<InfoCard
						items={[
							{ icon: MapPin, label: 'Base', value: 'Remote (Portugal)' },
							{ icon: Wallet, label: 'Rate', value: '$150/hr' },
						]}
						className="@sm:col-span-2"
					/>
				</div>
			</div>
		</section>
	);
}

interface ProfileCardProps {
	src: string;
	fallback: string;
	name: string;
	role: string;
	status: string;
}

const ProfileCard = ({
	src,
	fallback,
	name,
	role,
	status,
}: ProfileCardProps) => (
	<Card>
		<CardContent className="p-6 text-center">
			<Avatar className="size-20 mx-auto mb-4 ring-2 ring-primary/20">
				<AvatarImage src={src} alt={name} />
				<AvatarFallback className="text-xl bg-primary text-primary-foreground">
					{fallback}
				</AvatarFallback>
			</Avatar>
			<h1 className="text-xl font-bold mb-1">{name}</h1>
			<p className="text-muted-foreground text-sm mb-3">{role}</p>
			<Badge variant="secondary">
				<Plane className="size-3 mr-1" />
				{status}
			</Badge>
		</CardContent>
	</Card>
);

interface BioCardProps {
	title: string;
	description: string;
	className?: string;
}

const BioCard = ({ title, description, className }: BioCardProps) => (
	<Card className={`bg-muted/50 border-none ${className}`}>
		<CardContent className="p-6 flex flex-col justify-center h-full">
			<Badge variant="outline" className="w-fit mb-3">
				{title}
			</Badge>
			<p className="text-muted-foreground leading-relaxed">{description}</p>
		</CardContent>
	</Card>
);

interface ImageItem {
	src: string;
	alt: string;
}

interface GalleryCardProps {
	images: ImageItem[];
	className?: string;
}

const GalleryCard = ({ images, className }: GalleryCardProps) => (
	<Card className={`overflow-hidden py-0 ${className}`}>
		<CardContent className="p-0 grid grid-cols-2 h-full">
			{images.map(({ src, alt }, i) => (
				<div key={i} className="relative aspect-square">
					<Image src={src} alt={alt} fill className="object-cover" />
				</div>
			))}
		</CardContent>
	</Card>
);

interface StatCardProps {
	icon: React.ComponentType<{ className?: string }>;
	value: string;
	label: string;
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="p-6 flex flex-col justify-center h-full text-center">
			<Icon className="size-6 mx-auto mb-2 opacity-80" />
			<div className="text-2xl font-bold">{value}</div>
			<div className="text-sm opacity-80">{label}</div>
		</CardContent>
	</Card>
);

interface InfoItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}

interface InfoCardProps {
	items: InfoItem[];
	className?: string;
}

const InfoCard = ({ items, className }: InfoCardProps) => (
	<Card className={className}>
		<CardContent className="p-6 flex justify-around items-center h-full">
			{items.map(({ icon: Icon, label, value }) => (
				<div key={label} className="flex items-center gap-3">
					<Icon className="size-5 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">{label}</p>
						<p className="font-medium">{value}</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);
