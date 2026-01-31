import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Calendar,
	Camera,
	ChevronRight,
	Clock,
	Compass,
	Globe,
	Heart,
	MapPin,
	Plane,
	Plus,
	Settings,
	Star,
	Ticket,
	Trash2,
	Trophy,
	Users,
	Wallet,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TravelerProfileCard = ({
	src,
	fallback,
	name,
	level,
	countriesVisited,
	memberSince,
}: {
	src: string;
	fallback: string;
	name: string;
	level: string;
	countriesVisited: number;
	memberSince: string;
}) => (
	<Card className="col-span-full @lg:col-span-2 row-span-2 bg-gradient-to-br from-sky-500/10 to-blue-500/10">
		<CardContent className="p-6 h-full flex flex-col">
			<div className="flex items-start justify-between mb-4">
				<Avatar className="size-20 ring-4 ring-sky-500/30">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
				</Avatar>
				<Button variant="outline" size="icon">
					<Settings className="size-4" />
				</Button>
			</div>
			<div className="flex-1">
				<h1 className="text-xl font-bold">{name}</h1>
				<div className="flex items-center gap-2 mt-1">
					<Badge className="bg-sky-500/20 text-sky-600">{level}</Badge>
					<span className="text-sm text-muted-foreground">since {memberSince}</span>
				</div>
				<div className="flex items-center gap-2 mt-4">
					<Globe className="size-5 text-sky-500" />
					<span className="text-2xl font-bold">{countriesVisited}</span>
					<span className="text-muted-foreground">countries visited</span>
				</div>
			</div>
			<Button className="w-full mt-4 gap-2">
				<Plane className="size-4" />
				Plan New Trip
			</Button>
		</CardContent>
	</Card>
);

const StatCard = ({
	icon: Icon,
	label,
	value,
	color,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	color: string;
}) => (
	<Card>
		<CardContent className="p-4">
			<Icon className={`size-6 ${color} mb-2`} />
			<p className="text-2xl font-bold">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</CardContent>
	</Card>
);

const UpcomingTripCard = ({
	destination,
	dates,
	image,
	daysUntil,
}: {
	destination: string;
	dates: string;
	image: string;
	daysUntil: number;
}) => (
	<Card className="col-span-2 overflow-hidden">
		<div className="flex h-full">
			<div className="relative w-28 shrink-0">
				<Image src={image} alt={destination} fill className="object-cover" />
				<div className="absolute top-2 left-2">
					<Badge className="bg-amber-500 text-white">{daysUntil} days</Badge>
				</div>
			</div>
			<CardContent className="p-4 flex-1">
				<Badge variant="outline" className="mb-2">Upcoming Trip</Badge>
				<p className="font-bold">{destination}</p>
				<p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
					<Calendar className="size-3" />
					{dates}
				</p>
				<div className="flex gap-2 mt-3">
					<Button size="sm" variant="outline">View Details</Button>
					<Button size="sm">Check In</Button>
				</div>
			</CardContent>
		</div>
	</Card>
);

const MilesCard = ({
	balance,
	expiring,
	expiringDate,
	tier,
}: {
	balance: string;
	expiring: string;
	expiringDate: string;
	tier: string;
}) => (
	<Card className="col-span-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
		<CardContent className="p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<Trophy className="size-5 text-violet-500" />
					<span className="font-semibold">Reward Miles</span>
				</div>
				<Badge>{tier}</Badge>
			</div>
			<p className="text-3xl font-bold">{balance}</p>
			<p className="text-sm text-muted-foreground">miles available</p>
			<p className="text-xs text-amber-600 mt-2">{expiring} miles expiring {expiringDate}</p>
		</CardContent>
	</Card>
);

const RecentTripCard = ({
	destination,
	dates,
	image,
	rating,
	photos,
}: {
	destination: string;
	dates: string;
	image: string;
	rating: number;
	photos: number;
}) => (
	<Card className="overflow-hidden">
		<div className="aspect-video relative">
			<Image src={image} alt={destination} fill className="object-cover" />
			<div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded text-xs">
				<Camera className="size-3" />
				{photos}
			</div>
		</div>
		<CardContent className="p-3">
			<p className="font-medium truncate">{destination}</p>
			<p className="text-xs text-muted-foreground">{dates}</p>
			<div className="flex items-center gap-1 mt-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className={`size-3 ${i < rating ? 'fill-amber-500 text-amber-500' : 'text-muted'}`}
					/>
				))}
			</div>
		</CardContent>
	</Card>
);

const SavedPlacesCard = ({
	places,
}: {
	places: { name: string; location: string; image: string }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Heart className="size-5 text-red-500" />
					Saved Places
				</h3>
				<Button variant="ghost" size="sm">View All</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-2">
			{places.map((place, i) => (
				<div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
					<div className="relative size-12 rounded-lg overflow-hidden">
						<Image src={place.image} alt={place.name} fill className="object-cover" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium truncate">{place.name}</p>
						<p className="text-xs text-muted-foreground flex items-center gap-1">
							<MapPin className="size-3" />
							{place.location}
						</p>
					</div>
					<Heart className="size-4 text-red-500 fill-red-500" />
				</div>
			))}
		</CardContent>
	</Card>
);

const TravelBadgesCard = ({
	badges,
}: {
	badges: { name: string; icon: string; unlocked: boolean }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<h3 className="font-semibold flex items-center gap-2">
				<Trophy className="size-5 text-amber-500" />
				Travel Badges
			</h3>
		</CardHeader>
		<CardContent>
			<div className="flex gap-3 flex-wrap">
				{badges.map((badge, i) => (
					<div
						key={i}
						className={`flex flex-col items-center p-2 rounded-lg ${
							badge.unlocked ? 'bg-amber-500/10' : 'bg-muted/50 opacity-50'
						}`}
						title={badge.name}
					>
						<span className="text-2xl">{badge.icon}</span>
						<span className="text-xs mt-1 truncate w-16 text-center">{badge.name}</span>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const TravelCompanionsCard = ({
	companions,
}: {
	companions: { name: string; avatar: string; trips: number }[];
}) => (
	<Card className="col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Users className="size-5" />
					Travel Companions
				</h3>
				<Button variant="ghost" size="icon">
					<Plus className="size-4" />
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="flex gap-4">
				{companions.map((companion, i) => (
					<div key={i} className="flex flex-col items-center">
						<Avatar className="size-12">
							<AvatarImage src={companion.avatar} />
							<AvatarFallback>{companion.name[0]}</AvatarFallback>
						</Avatar>
						<p className="text-xs font-medium mt-1">{companion.name}</p>
						<p className="text-xs text-muted-foreground">{companion.trips} trips</p>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		user: {
			src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
			fallback: 'JT',
			name: 'James Taylor',
			level: 'Gold Explorer',
			countriesVisited: 24,
			memberSince: '2019',
		},
		stats: [
			{ icon: Plane, label: 'Flights', value: '47', color: 'text-sky-500' },
			{ icon: Calendar, label: 'Trips', value: '32', color: 'text-green-500' },
			{ icon: Camera, label: 'Photos', value: '2.4K', color: 'text-pink-500' },
			{ icon: Star, label: 'Reviews', value: '28', color: 'text-amber-500' },
		],
		upcomingTrip: {
			destination: 'Tokyo, Japan',
			dates: 'Mar 15 - Mar 28, 2024',
			image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
			daysUntil: 45,
		},
		miles: {
			balance: '124,500',
			expiring: '5,200',
			expiringDate: 'Mar 31',
			tier: 'Gold',
		},
		recentTrips: [
			{ destination: 'Paris, France', dates: 'Dec 2023', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', rating: 5, photos: 156 },
			{ destination: 'Barcelona, Spain', dates: 'Oct 2023', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400', rating: 4, photos: 98 },
		],
		savedPlaces: [
			{ name: 'Santorini', location: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=100' },
			{ name: 'Machu Picchu', location: 'Peru', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=100' },
		],
		badges: [
			{ name: 'Globe Trotter', icon: '🌍', unlocked: true },
			{ name: 'Photo Pro', icon: '📸', unlocked: true },
			{ name: 'Food Explorer', icon: '🍜', unlocked: true },
			{ name: 'Adventure Seeker', icon: '🏔️', unlocked: true },
			{ name: 'Culture Vulture', icon: '🏛️', unlocked: false },
			{ name: '7 Continents', icon: '✈️', unlocked: false },
		],
		companions: [
			{ name: 'Sarah', avatar: 'https://i.pravatar.cc/48?img=1', trips: 12 },
			{ name: 'Mike', avatar: 'https://i.pravatar.cc/48?img=2', trips: 8 },
			{ name: 'Emma', avatar: 'https://i.pravatar.cc/48?img=3', trips: 5 },
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
					<TravelerProfileCard {...profileData.user} />
					{profileData.stats.map((stat, i) => (
						<StatCard key={i} {...stat} />
					))}
					<UpcomingTripCard {...profileData.upcomingTrip} />
					<MilesCard {...profileData.miles} />
					{profileData.recentTrips.map((trip, i) => (
						<RecentTripCard key={i} {...trip} />
					))}
					<SavedPlacesCard places={profileData.savedPlaces} />
					<TravelBadgesCard badges={profileData.badges} />
					<TravelCompanionsCard companions={profileData.companions} />
				</div>
			</div>
		</section>
	);
}
