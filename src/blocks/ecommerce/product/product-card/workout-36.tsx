import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dumbbell, Heart, Play, Star, Timer, Zap } from 'lucide-react';
import Image from 'next/image';

interface WorkoutProps {
	thumbnail: string;
	title: string;
	trainer: string;
	duration: string;
	level: string;
	calories: number;
	equipment: string[];
	rating: number;
	isPremium: boolean;
}

const WorkoutThumbnail = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
		<div className="absolute inset-0 flex items-center justify-center bg-black/30">
			<div className="rounded-full bg-white/90 p-4 shadow-xl transition-transform hover:scale-110">
				<Play className="size-8 fill-primary text-primary" />
			</div>
		</div>
		<Button
			size="icon-sm"
			variant="secondary"
			className="absolute right-3 top-3 bg-white/90"
		>
			<Heart className="size-4" />
		</Button>
	</div>
);

const PremiumBadge = () => (
	<Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
		<Zap className="size-3" />
		Premium
	</Badge>
);

const WorkoutTitle = ({ text }: { text: string }) => (
	<h3 className="font-semibold text-foreground">{text}</h3>
);

const TrainerInfo = ({ name }: { name: string }) => (
	<p className="text-sm text-muted-foreground">with {name}</p>
);

const WorkoutStats = ({
	duration,
	level,
	calories,
}: {
	duration: string;
	level: string;
	calories: number;
}) => (
	<div className="flex gap-3 text-xs">
		<span className="flex items-center gap-1 text-muted-foreground">
			<Timer className="size-3" />
			{duration}
		</span>
		<Badge variant="outline" className="text-xs">
			{level}
		</Badge>
		<span className="flex items-center gap-1 text-orange-500">
			<Zap className="size-3" />
			{calories} cal
		</span>
	</div>
);

const EquipmentList = ({ items }: { items: string[] }) => (
	<div className="flex flex-wrap gap-1.5">
		{items.map((item, i) => (
			<Badge key={i} variant="secondary" className="text-xs">
				{item}
			</Badge>
		))}
	</div>
);

const WorkoutRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-1">
		<Star className="size-4 fill-yellow-400 text-yellow-400" />
		<span className="font-medium">{rating.toFixed(1)}</span>
	</div>
);

const StartButton = ({ label }: { label: string }) => (
	<Button className="gap-2">
		<Dumbbell className="size-4" />
		{label}
	</Button>
);

export default function Main() {
	const workout: WorkoutProps = {
		thumbnail:
			'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=340&fit=crop',
		title: 'High Intensity Full Body Burn',
		trainer: 'Sarah Johnson',
		duration: '45 min',
		level: 'Advanced',
		calories: 450,
		equipment: ['Dumbbells', 'Mat', 'Resistance Band'],
		rating: 4.9,
		isPremium: true,
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-8">
				<Card className="overflow-hidden">
					<div className="relative">
						<WorkoutThumbnail src={workout.thumbnail} alt={workout.title} />
						{workout.isPremium && <PremiumBadge />}
					</div>
					<div className="space-y-3 p-4">
						<div className="flex items-start justify-between gap-2">
							<div className="space-y-1">
								<WorkoutTitle text={workout.title} />
								<TrainerInfo name={workout.trainer} />
							</div>
							<WorkoutRating rating={workout.rating} />
						</div>
						<WorkoutStats
							duration={workout.duration}
							level={workout.level}
							calories={workout.calories}
						/>
						<Separator />
						<div className="flex items-center justify-between">
							<EquipmentList items={workout.equipment} />
							<StartButton label="Start" />
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
}
