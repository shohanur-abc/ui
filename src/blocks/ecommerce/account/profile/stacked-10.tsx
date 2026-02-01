import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	AlertTriangle,
	Award,
	Bell,
	Calendar,
	Car,
	CheckCircle2,
	ChevronRight,
	Clock,
	CreditCard,
	FileText,
	Fuel,
	Gauge,
	Heart,
	History,
	Key,
	MapPin,
	Navigation,
	ParkingCircle,
	Settings,
	Shield,
	Sparkles,
	Wrench,
	Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const DriverHeader = ({
	src,
	fallback,
	name,
	memberSince,
	vehicleName,
	licensePlate,
}: {
	src: string;
	fallback: string;
	name: string;
	memberSince: string;
	vehicleName: string;
	licensePlate: string;
}) => (
	<Card className="bg-gradient-to-r from-slate-500/10 to-zinc-500/10">
		<CardContent className="p-6">
			<div className="flex flex-col @md:flex-row items-center gap-6">
				<Avatar className="size-20">
					<AvatarImage src={src} alt={name} />
					<AvatarFallback className="text-xl">{fallback}</AvatarFallback>
				</Avatar>
				<div className="text-center @md:text-left flex-1">
					<h1 className="text-2xl font-bold">{name}</h1>
					<p className="text-muted-foreground">Member since {memberSince}</p>
					<div className="flex items-center justify-center @md:justify-start gap-2 mt-2">
						<Car className="size-4 text-muted-foreground" />
						<span>{vehicleName}</span>
						<Badge variant="outline">{licensePlate}</Badge>
					</div>
				</div>
				<Button>
					<Settings className="size-4 mr-2" />
					Settings
				</Button>
			</div>
		</CardContent>
	</Card>
);

const VehicleStatus = ({
	fuelLevel,
	mileage,
	nextService,
	batteryHealth,
}: {
	fuelLevel: number;
	mileage: string;
	nextService: string;
	batteryHealth: number;
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center gap-2">
				<Gauge className="size-5" />
				<h2 className="font-semibold">Vehicle Status</h2>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				<div className="text-center p-3 rounded-lg bg-muted/30">
					<Fuel className="size-6 mx-auto text-amber-500 mb-2" />
					<p className="text-2xl font-bold">{fuelLevel}%</p>
					<p className="text-xs text-muted-foreground">Fuel Level</p>
				</div>
				<div className="text-center p-3 rounded-lg bg-muted/30">
					<Navigation className="size-6 mx-auto text-blue-500 mb-2" />
					<p className="text-2xl font-bold">{mileage}</p>
					<p className="text-xs text-muted-foreground">Total Miles</p>
				</div>
				<div className="text-center p-3 rounded-lg bg-muted/30">
					<Wrench className="size-6 mx-auto text-green-500 mb-2" />
					<p className="text-2xl font-bold">{nextService}</p>
					<p className="text-xs text-muted-foreground">Next Service</p>
				</div>
				<div className="text-center p-3 rounded-lg bg-muted/30">
					<Zap className="size-6 mx-auto text-purple-500 mb-2" />
					<p className="text-2xl font-bold">{batteryHealth}%</p>
					<p className="text-xs text-muted-foreground">Battery</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const MaintenanceAlerts = ({
	alerts,
}: {
	alerts: {
		type: 'warning' | 'info' | 'success';
		title: string;
		description: string;
		action?: string;
	}[];
}) => (
	<div className="space-y-3">
		{alerts.map((alert, i) => (
			<Card
				key={i}
				className={
					alert.type === 'warning'
						? 'border-amber-500/30 bg-amber-500/5'
						: alert.type === 'success'
							? 'border-green-500/30 bg-green-500/5'
							: ''
				}
			>
				<CardContent className="p-4">
					<div className="flex items-center gap-3">
						{alert.type === 'warning' ? (
							<AlertTriangle className="size-5 text-amber-500 shrink-0" />
						) : alert.type === 'success' ? (
							<CheckCircle2 className="size-5 text-green-500 shrink-0" />
						) : (
							<Bell className="size-5 text-blue-500 shrink-0" />
						)}
						<div className="flex-1">
							<p className="font-medium">{alert.title}</p>
							<p className="text-sm text-muted-foreground">
								{alert.description}
							</p>
						</div>
						{alert.action && (
							<Button variant="outline" size="sm">
								{alert.action}
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
);

const QuickServices = ({
	services,
}: {
	services: { icon: React.ElementType; label: string; href: string }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Quick Services</h2>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-4 gap-3">
				{services.map((service, i) => (
					<Link
						key={i}
						href={service.href}
						className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
					>
						<div className="p-2 rounded-lg bg-muted">
							<service.icon className="size-5 text-muted-foreground" />
						</div>
						<span className="text-xs font-medium text-center">
							{service.label}
						</span>
					</Link>
				))}
			</div>
		</CardContent>
	</Card>
);

const TripHistory = ({
	trips,
}: {
	trips: {
		from: string;
		to: string;
		date: string;
		distance: string;
		duration: string;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold flex items-center gap-2">
					<History className="size-5" />
					Recent Trips
				</h2>
				<Button variant="ghost" size="sm">
					View All
				</Button>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{trips.map((trip, i) => (
				<div
					key={i}
					className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
				>
					<div className="flex flex-col items-center">
						<div className="size-2 rounded-full bg-green-500" />
						<div className="w-px h-6 bg-muted-foreground" />
						<div className="size-2 rounded-full bg-red-500" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium truncate">{trip.from}</p>
						<p className="font-medium truncate">{trip.to}</p>
					</div>
					<div className="text-right text-sm text-muted-foreground shrink-0">
						<p>{trip.date}</p>
						<p>
							{trip.distance} • {trip.duration}
						</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const Subscriptions = ({
	subscriptions,
}: {
	subscriptions: {
		name: string;
		status: 'active' | 'expiring' | 'expired';
		expiryDate: string;
		icon: React.ElementType;
	}[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold">Subscriptions</h2>
		</CardHeader>
		<CardContent className="space-y-3">
			{subscriptions.map((sub, i) => (
				<div
					key={i}
					className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
				>
					<div className="flex items-center gap-3">
						<div
							className={`p-2 rounded-lg ${
								sub.status === 'active'
									? 'bg-green-500/10'
									: sub.status === 'expiring'
										? 'bg-amber-500/10'
										: 'bg-red-500/10'
							}`}
						>
							<sub.icon
								className={`size-5 ${
									sub.status === 'active'
										? 'text-green-500'
										: sub.status === 'expiring'
											? 'text-amber-500'
											: 'text-red-500'
								}`}
							/>
						</div>
						<div>
							<p className="font-medium">{sub.name}</p>
							<p className="text-sm text-muted-foreground">
								Expires {sub.expiryDate}
							</p>
						</div>
					</div>
					<Badge
						className={
							sub.status === 'active'
								? 'bg-green-500/20 text-green-600'
								: sub.status === 'expiring'
									? 'bg-amber-500/20 text-amber-600'
									: 'bg-red-500/20 text-red-600'
						}
					>
						{sub.status === 'active'
							? 'Active'
							: sub.status === 'expiring'
								? 'Expiring Soon'
								: 'Expired'}
					</Badge>
				</div>
			))}
		</CardContent>
	</Card>
);

const DrivingScore = ({
	score,
	breakdown,
}: {
	score: number;
	breakdown: { label: string; value: number }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<h2 className="font-semibold flex items-center gap-2">
				<Award className="size-5 text-amber-500" />
				Driving Score
			</h2>
		</CardHeader>
		<CardContent>
			<div className="flex items-center gap-6">
				<div className="relative size-24">
					<svg className="size-24 -rotate-90">
						<circle
							cx="48"
							cy="48"
							r="40"
							fill="none"
							stroke="currentColor"
							strokeWidth="8"
							className="text-muted"
						/>
						<circle
							cx="48"
							cy="48"
							r="40"
							fill="none"
							stroke="currentColor"
							strokeWidth="8"
							strokeDasharray={`${(score / 100) * 251} 251`}
							strokeLinecap="round"
							className={
								score >= 80
									? 'text-green-500'
									: score >= 60
										? 'text-amber-500'
										: 'text-red-500'
							}
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<p className="text-2xl font-bold">{score}</p>
						<p className="text-xs text-muted-foreground">/ 100</p>
					</div>
				</div>
				<div className="flex-1 space-y-3">
					{breakdown.map((item, i) => (
						<div key={i} className="space-y-1">
							<div className="flex justify-between text-sm">
								<span>{item.label}</span>
								<span className="font-medium">{item.value}%</span>
							</div>
							<Progress value={item.value} className="h-1.5" />
						</div>
					))}
				</div>
			</div>
		</CardContent>
	</Card>
);

const LinkedVehicles = ({
	vehicles,
}: {
	vehicles: { name: string; type: string; image: string; active: boolean }[];
}) => (
	<Card>
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold">My Vehicles</h2>
				<Button variant="outline" size="sm">
					<Key className="size-4 mr-1" />
					Add Vehicle
				</Button>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid @sm:grid-cols-2 gap-3">
				{vehicles.map((vehicle, i) => (
					<div
						key={i}
						className={`flex items-center gap-3 p-3 rounded-lg ${vehicle.active ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30'}`}
					>
						<div className="size-16 rounded-lg bg-muted overflow-hidden relative">
							<Image
								src={vehicle.image}
								alt={vehicle.name}
								fill
								className="object-cover"
							/>
						</div>
						<div className="flex-1">
							<p className="font-medium">{vehicle.name}</p>
							<p className="text-sm text-muted-foreground">{vehicle.type}</p>
							{vehicle.active && (
								<Badge variant="secondary" className="mt-1">
									Active
								</Badge>
							)}
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const profileData = {
		header: {
			src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
			fallback: 'RB',
			name: 'Robert Brown',
			memberSince: 'Jan 2021',
			vehicleName: '2023 Tesla Model 3',
			licensePlate: 'ABC 1234',
		},
		vehicleStatus: {
			fuelLevel: 78,
			mileage: '24,567',
			nextService: '500 mi',
			batteryHealth: 95,
		},
		alerts: [
			{
				type: 'warning' as const,
				title: 'Tire Pressure Low',
				description: 'Front left tire is 5 PSI below recommended.',
				action: 'View',
			},
			{
				type: 'info' as const,
				title: 'Software Update',
				description: 'New update v2.4.1 available for your vehicle.',
			},
			{
				type: 'success' as const,
				title: 'Insurance Renewed',
				description: 'Your policy is active until Dec 2024.',
			},
		],
		quickServices: [
			{ icon: Fuel, label: 'Find Gas', href: '/gas' },
			{ icon: ParkingCircle, label: 'Parking', href: '/parking' },
			{ icon: Wrench, label: 'Service', href: '/service' },
			{ icon: Sparkles, label: 'Car Wash', href: '/wash' },
		],
		trips: [
			{
				from: 'Home',
				to: 'Office',
				date: 'Today',
				distance: '12.5 mi',
				duration: '25 min',
			},
			{
				from: 'Office',
				to: 'Downtown Mall',
				date: 'Yesterday',
				distance: '8.2 mi',
				duration: '18 min',
			},
		],
		subscriptions: [
			{
				name: 'Premium Nav',
				status: 'active' as const,
				expiryDate: 'Dec 2024',
				icon: Navigation,
			},
			{
				name: 'Roadside Assist',
				status: 'expiring' as const,
				expiryDate: 'Feb 2024',
				icon: Shield,
			},
			{
				name: 'CarPlay Plus',
				status: 'active' as const,
				expiryDate: 'Jun 2024',
				icon: Zap,
			},
		],
		drivingScore: {
			score: 87,
			breakdown: [
				{ label: 'Smooth Braking', value: 92 },
				{ label: 'Speed Control', value: 85 },
				{ label: 'Eco Driving', value: 78 },
			],
		},
		vehicles: [
			{
				name: 'Tesla Model 3',
				type: 'Electric',
				image:
					'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200',
				active: true,
			},
			{
				name: 'Honda CR-V',
				type: 'Hybrid',
				image:
					'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200',
				active: false,
			},
		],
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @lg:px-8 py-8 @md:py-12 space-y-4">
				<DriverHeader {...profileData.header} />
				<MaintenanceAlerts alerts={profileData.alerts} />
				<VehicleStatus {...profileData.vehicleStatus} />
				<QuickServices services={profileData.quickServices} />
				<DrivingScore {...profileData.drivingScore} />
				<TripHistory trips={profileData.trips} />
				<Subscriptions subscriptions={profileData.subscriptions} />
				<LinkedVehicles vehicles={profileData.vehicles} />
			</div>
		</section>
	);
}
