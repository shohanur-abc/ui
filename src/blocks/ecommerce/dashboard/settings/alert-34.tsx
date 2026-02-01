import {
	AlertCircle,
	Bell,
	ChevronRight,
	Clock,
	Mail,
	MessageCircle,
	Phone,
	Send,
	Settings2,
	Smartphone,
	User,
	Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

type Contact = {
	id: string;
	name: string;
	email: string;
	phone?: string;
	role: string;
	avatar?: string;
	receiveAlerts: boolean;
};

type AlertRule = {
	id: string;
	name: string;
	description: string;
	recipients: number;
	enabled: boolean;
};

const ContactCard = ({
	name,
	email,
	phone,
	role,
	avatar,
	receiveAlerts,
}: Contact) => (
	<div className="flex items-center gap-4 rounded-lg border p-4">
		<Avatar>
			<AvatarImage src={avatar} />
			<AvatarFallback>
				{name
					.split(' ')
					.map((n) => n[0])
					.join('')}
			</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<h4 className="font-medium truncate">{name}</h4>
				<Badge variant="secondary" className="text-xs">
					{role}
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground truncate">{email}</p>
			{phone && <p className="text-xs text-muted-foreground">{phone}</p>}
		</div>
		<div className="flex items-center gap-3">
			<div className="flex items-center gap-2">
				<Bell className="size-4 text-muted-foreground" />
				<Switch defaultChecked={receiveAlerts} />
			</div>
			<Button variant="ghost" size="icon-sm">
				<ChevronRight className="size-4" />
			</Button>
		</div>
	</div>
);

const AlertRuleRow = ({
	name,
	description,
	recipients,
	enabled,
}: AlertRule) => (
	<div className="flex items-center justify-between py-3">
		<div className="flex-1">
			<h4 className="font-medium">{name}</h4>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<div className="flex items-center gap-4">
			<span className="flex items-center gap-1 text-sm text-muted-foreground">
				<Users className="size-4" />
				{recipients}
			</span>
			<Switch defaultChecked={enabled} />
		</div>
	</div>
);

export default function Main() {
	const contacts: Contact[] = [
		{
			id: '1',
			name: 'John Doe',
			email: 'john@company.com',
			phone: '+1 (555) 123-4567',
			role: 'Admin',
			avatar: 'https://avatars.githubusercontent.com/u/252440198?v=4',
			receiveAlerts: true,
		},
		{
			id: '2',
			name: 'Jane Smith',
			email: 'jane@company.com',
			phone: '+1 (555) 987-6543',
			role: 'Manager',
			receiveAlerts: true,
		},
		{
			id: '3',
			name: 'Bob Wilson',
			email: 'bob@company.com',
			role: 'Support',
			receiveAlerts: false,
		},
	];

	const alertRules: AlertRule[] = [
		{
			id: '1',
			name: 'Critical System Alerts',
			description: 'Server downtime, security breaches',
			recipients: 3,
			enabled: true,
		},
		{
			id: '2',
			name: 'High-Value Orders',
			description: 'Orders over $1,000',
			recipients: 2,
			enabled: true,
		},
		{
			id: '3',
			name: 'Inventory Warnings',
			description: 'Low stock alerts',
			recipients: 1,
			enabled: true,
		},
		{
			id: '4',
			name: 'Negative Reviews',
			description: 'Reviews with 1-2 stars',
			recipients: 2,
			enabled: false,
		},
	];

	return (
		<section className="@container" data-theme="settings">
			<div className="mx-auto max-w-4xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-5">
					<div className="@lg:col-span-3 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
											<Users className="size-5 text-primary" />
										</div>
										<div>
											<CardTitle>Alert Recipients</CardTitle>
											<CardDescription>
												Team members who receive alerts
											</CardDescription>
										</div>
									</div>
									<Button size="sm" variant="outline">
										Add Contact
									</Button>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-6">
								{contacts.map((contact) => (
									<ContactCard key={contact.id} {...contact} />
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Alert Rules</CardTitle>
								<CardDescription>
									Define when alerts are sent to the team
								</CardDescription>
							</CardHeader>
							<CardContent className="divide-y pt-2">
								{alertRules.map((rule) => (
									<AlertRuleRow key={rule.id} {...rule} />
								))}
							</CardContent>
						</Card>
					</div>

					<div className="@lg:col-span-2 space-y-6">
						<Card>
							<CardHeader className="border-b">
								<CardTitle className="text-base">Quick Alert</CardTitle>
								<CardDescription>
									Send a manual alert to the team
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4 pt-6">
								<div className="space-y-2">
									<Label htmlFor="subject">Subject</Label>
									<Input id="subject" placeholder="Alert subject" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										placeholder="Enter alert message..."
										rows={4}
									/>
								</div>
								<Button className="w-full gap-2">
									<Send className="size-4" />
									Send Alert
								</Button>
							</CardContent>
						</Card>

						<Card className="border-amber-500/20 bg-amber-500/5">
							<CardContent className="pt-6">
								<div className="flex items-start gap-3">
									<AlertCircle className="size-5 text-amber-500 shrink-0" />
									<div>
										<h4 className="font-medium">Alert Escalation</h4>
										<p className="mt-1 text-sm text-muted-foreground">
											If an alert isn't acknowledged within 30 minutes, it will
											automatically escalate to the next contact.
										</p>
										<Button
											variant="link"
											size="sm"
											className="mt-2 h-auto p-0"
										>
											Configure escalation rules
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
