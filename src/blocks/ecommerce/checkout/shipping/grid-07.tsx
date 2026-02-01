import { Truck, Clock, Check, Star, ThumbsUp, Award } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CarrierCard = ({
	value,
	name,
	logo,
	rating,
	reviews,
	onTime,
	time,
	price,
	badges,
}: {
	value: string;
	name: string;
	logo: string;
	rating: number;
	reviews: number;
	onTime: number;
	time: string;
	price: string;
	badges: string[];
}) => (
	<Label htmlFor={value} className="cursor-pointer">
		<Card
			className="
				h-full transition-all hover:shadow-lg hover:border-primary/50
				has-[:checked]:border-primary has-[:checked]:bg-primary/5
			"
		>
			<CardContent className="p-4">
				<div className="flex items-start justify-between mb-3">
					<div className="flex items-center gap-3">
						<RadioGroupItem value={value} id={value} />
						<Avatar className="rounded-lg size-12 bg-muted">
							<AvatarImage src={logo} />
							<AvatarFallback className="rounded-lg font-bold">
								{name.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="font-semibold">{name}</h3>
							<div className="flex items-center gap-1 text-sm">
								<Star className="size-3.5 text-amber-500 fill-amber-500" />
								<span>{rating}</span>
								<span className="text-muted-foreground">({reviews})</span>
							</div>
						</div>
					</div>
					<span className="text-xl font-bold text-primary">{price}</span>
				</div>

				<div className="mb-3">
					<div className="flex items-center justify-between text-sm mb-1">
						<span className="text-muted-foreground">On-time delivery</span>
						<span className="font-medium">{onTime}%</span>
					</div>
					<Progress value={onTime} className="h-2" />
				</div>

				<div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
					<Clock className="size-3.5" />
					<span>{time}</span>
				</div>

				<div className="flex flex-wrap gap-1">
					{badges.map((badge, i) => (
						<Badge key={i} variant="secondary" className="text-xs font-normal">
							{badge}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	</Label>
);

export default function Main() {
	const carriers = [
		{
			value: 'fedex',
			name: 'FedEx',
			logo: '/carriers/fedex.png',
			rating: 4.7,
			reviews: 2345,
			onTime: 96,
			time: '2-3 business days',
			price: '$12.99',
			badges: ['Tracking', 'Insurance', 'Signature'],
		},
		{
			value: 'ups',
			name: 'UPS',
			logo: '/carriers/ups.png',
			rating: 4.6,
			reviews: 1987,
			onTime: 94,
			time: '2-3 business days',
			price: '$11.99',
			badges: ['Tracking', 'Insurance'],
		},
		{
			value: 'usps',
			name: 'USPS',
			logo: '/carriers/usps.png',
			rating: 4.4,
			reviews: 3456,
			onTime: 89,
			time: '3-5 business days',
			price: '$7.99',
			badges: ['Tracking', 'Budget'],
		},
		{
			value: 'dhl',
			name: 'DHL',
			logo: '/carriers/dhl.png',
			rating: 4.8,
			reviews: 1234,
			onTime: 98,
			time: '1-2 business days',
			price: '$18.99',
			badges: ['Express', 'International', 'Premium'],
		},
		{
			value: 'ontrac',
			name: 'OnTrac',
			logo: '/carriers/ontrac.png',
			rating: 4.2,
			reviews: 876,
			onTime: 85,
			time: '3-5 business days',
			price: '$6.99',
			badges: ['Budget', 'Regional'],
		},
		{
			value: 'lasership',
			name: 'LaserShip',
			logo: '/carriers/lasership.png',
			rating: 4.0,
			reviews: 654,
			onTime: 82,
			time: '2-4 business days',
			price: '$5.99',
			badges: ['Budget', 'Fast'],
		},
	];

	return (
		<section className="@container relative overflow-hidden">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold tracking-tight mb-2">
						Choose Carrier
					</h1>
					<p className="text-muted-foreground">
						Compare carriers by rating, speed, and price
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-3 mb-8">
					<Button variant="outline" size="sm">
						Best Rating
					</Button>
					<Button variant="outline" size="sm">
						Lowest Price
					</Button>
					<Button variant="outline" size="sm">
						Fastest
					</Button>
					<Button variant="outline" size="sm">
						Most Reliable
					</Button>
				</div>

				<RadioGroup
					defaultValue="fedex"
					className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4"
				>
					{carriers.map((carrier) => (
						<CarrierCard key={carrier.value} {...carrier} />
					))}
				</RadioGroup>

				<div className="flex gap-3 justify-center pt-10">
					<Button variant="outline">Back</Button>
					<Button>Continue to Payment</Button>
				</div>
			</div>
		</section>
	);
}
