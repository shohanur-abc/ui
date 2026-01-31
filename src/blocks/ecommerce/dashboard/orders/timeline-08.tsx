import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2, AlertCircle, User } from 'lucide-react';

interface SupportInteraction {
	id: string;
	type: 'message' | 'call' | 'email' | 'note';
	direction: 'inbound' | 'outbound';
	agent?: { name: string; avatar: string; initials: string };
	customer?: { name: string };
	content: string;
	timestamp: string;
	resolved?: boolean;
}

interface SupportTimelineProps {
	ticketId: string;
	orderId: string;
	interactions: SupportInteraction[];
}

interface InteractionItemProps {
	interaction: SupportInteraction;
	isLast: boolean;
}

const TypeConfig: Record<SupportInteraction['type'], { icon: typeof MessageSquare; color: string; bg: string }> = {
	message: { icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10' },
	call: { icon: Phone, color: 'text-accent', bg: 'bg-accent/10' },
	email: { icon: Mail, color: 'text-blue-500', bg: 'bg-blue-500/10' },
	note: { icon: User, color: 'text-muted-foreground', bg: 'bg-muted' },
};

const InteractionItem = ({ interaction, isLast }: InteractionItemProps) => {
	const { icon: Icon, color, bg } = TypeConfig[interaction.type];
	const isCustomer = interaction.direction === 'inbound';

	return (
		<div className={`flex gap-4 ${isCustomer ? '' : 'flex-row-reverse'}`}>
			<div className="flex flex-col items-center">
				{interaction.agent ? (
					<Avatar className="size-10 ring-2 ring-background">
						<AvatarImage src={interaction.agent.avatar} alt={interaction.agent.name} />
						<AvatarFallback className="bg-primary/10 text-primary text-sm">{interaction.agent.initials}</AvatarFallback>
					</Avatar>
				) : (
					<div className={`size-10 rounded-full flex items-center justify-center ${bg}`}>
						<Icon className={`size-5 ${color}`} />
					</div>
				)}
				{!isLast && <div className="w-0.5 flex-1 bg-border my-2" />}
			</div>

			<div className={`flex-1 max-w-[80%] ${isLast ? '' : 'pb-6'}`}>
				<div className={`p-4 rounded-xl ${isCustomer ? 'bg-muted/30 border border-border/50' : 'bg-primary/10 border border-primary/20'}`}>
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<span className="font-medium text-sm">
								{interaction.agent?.name || interaction.customer?.name || 'Customer'}
							</span>
							<Badge variant="outline" className={`text-xs gap-1 ${color}`}>
								<Icon className="size-3" />
								{interaction.type}
							</Badge>
						</div>
						<span className="text-xs text-muted-foreground">{interaction.timestamp}</span>
					</div>
					<p className="text-sm">{interaction.content}</p>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const interactions: SupportInteraction[] = [
		{ id: '1', type: 'message', direction: 'outbound', agent: { name: 'Sarah Support', avatar: '', initials: 'SS' }, content: 'Hi! Your refund has been processed and should appear in your account within 3-5 business days. Is there anything else I can help you with?', timestamp: '2:45 PM' },
		{ id: '2', type: 'message', direction: 'inbound', customer: { name: 'John' }, content: 'Thanks! When will I receive my refund?', timestamp: '2:40 PM' },
		{ id: '3', type: 'note', direction: 'outbound', agent: { name: 'Sarah Support', avatar: '', initials: 'SS' }, content: 'Internal note: Processed refund for $89.99. Customer satisfied.', timestamp: '2:38 PM' },
		{ id: '4', type: 'call', direction: 'outbound', agent: { name: 'Mike Agent', avatar: '', initials: 'MA' }, content: 'Called customer to clarify return process. Customer confirmed they will ship the item back today.', timestamp: '11:30 AM' },
		{ id: '5', type: 'email', direction: 'inbound', customer: { name: 'John' }, content: 'I received the wrong item in my order #ORD-2024-156. I ordered black headphones but received blue ones. Please help.', timestamp: 'Yesterday' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-lg">Support Conversation</CardTitle>
								<div className="flex items-center gap-2 mt-1">
									<Badge variant="outline" className="font-mono text-xs">TKT-001</Badge>
									<Badge variant="secondary" className="gap-1 text-xs">
										<CheckCircle2 className="size-3 text-accent" />
										Resolved
									</Badge>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{interactions.map((interaction, i) => (
							<InteractionItem key={interaction.id} interaction={interaction} isLast={i === interactions.length - 1} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
