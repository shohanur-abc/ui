'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
	MapPin,
	User,
	Phone,
	Mail,
	Building2,
	Globe,
	Edit2,
	Trash2,
	MoreHorizontal,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DetailRowProps {
	icon: React.ElementType;
	label: string;
	value: string;
}

interface AddressProps {
	id: string;
	initials: string;
	name: string;
	email: string;
	phone: string;
	street: string;
	city: string;
	country: string;
	isDefault?: boolean;
}

const PageHeader = () => (
	<div className="text-center mb-10">
		<div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-4">
			<MapPin className="size-8 text-primary" />
		</div>
		<h1 className="text-2xl @md:text-3xl font-bold mb-2">Shipping Details</h1>
		<p className="text-muted-foreground max-w-md mx-auto">
			Select or update your delivery information
		</p>
	</div>
);

const DetailRow = ({ icon: Icon, label, value }: DetailRowProps) => (
	<div className="flex items-center gap-3">
		<div className="size-8 rounded-lg bg-muted flex items-center justify-center">
			<Icon className="size-4 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="text-sm font-medium truncate">{value}</p>
		</div>
	</div>
);

const AddressCard = ({
	id,
	initials,
	name,
	email,
	phone,
	street,
	city,
	country,
	isDefault,
}: AddressProps) => (
	<label className="block cursor-pointer">
		<Card className="h-full transition-all hover:shadow-lg has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:checked]:shadow-lg">
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<RadioGroupItem value={id} />
						<Avatar className="size-10">
							<AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
								{initials}
							</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className="text-base">{name}</CardTitle>
							{isDefault && (
								<Badge variant="secondary" className="text-xs mt-0.5">
									Default
								</Badge>
							)}
						</div>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon-sm">
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>
								<Edit2 className="size-4 mr-2" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								<Trash2 className="size-4 mr-2" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<DetailRow icon={Mail} label="Email" value={email} />
				<DetailRow icon={Phone} label="Phone" value={phone} />
				<Separator />
				<DetailRow icon={Building2} label="Street" value={street} />
				<DetailRow icon={MapPin} label="City" value={city} />
				<DetailRow icon={Globe} label="Country" value={country} />
			</CardContent>
		</Card>
	</label>
);

export default function Main() {
	const addresses = [
		{
			id: '1',
			initials: 'JD',
			name: 'John Doe',
			email: 'john@example.com',
			phone: '+1 (555) 123-4567',
			street: '123 Main Street, Apt 4B',
			city: 'San Francisco, CA 94102',
			country: 'United States',
			isDefault: true,
		},
		{
			id: '2',
			initials: 'JD',
			name: 'John Doe',
			email: 'john@work.com',
			phone: '+1 (555) 987-6543',
			street: '456 Market Street, Suite 100',
			city: 'San Francisco, CA 94103',
			country: 'United States',
		},
	];

	return (
		<section className="@container" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
				<PageHeader />

				<RadioGroup defaultValue="1" className="grid @md:grid-cols-2 gap-6">
					{addresses.map((addr) => (
						<AddressCard key={addr.id} {...addr} />
					))}
				</RadioGroup>

				<div className="flex justify-center mt-6">
					<Button variant="outline" size="lg" className="gap-2">
						<User className="size-4" />
						Add New Address
					</Button>
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col @sm:flex-row gap-3 justify-center">
					<Button variant="ghost" size="lg">
						← Back to Cart
					</Button>
					<Button size="lg">Continue to Payment →</Button>
				</div>
			</div>
		</section>
	);
}
