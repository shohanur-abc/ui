import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	MessageCircle,
	Send,
	Smile,
	Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
	id: string;
	sender: 'user' | 'friend';
	senderName: string;
	senderAvatar: string;
	content: string;
	timestamp: string;
	itemId?: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	href: string;
}

interface SplitProps {
	items: WishlistItem[];
	messages: Message[];
}

const WishlistPanel = ({ items }: { items: WishlistItem[] }) => (
	<div className="h-full flex flex-col">
		<div className="flex items-center justify-between mb-4">
			<h2 className="font-bold">Shared Wishlist</h2>
			<Badge variant="secondary">{items.length} items</Badge>
		</div>
		<ScrollArea className="flex-1">
			<div className="grid grid-cols-2 gap-3">
				{items.map((item) => (
					<div
						key={item.id}
						className="group relative rounded-xl overflow-hidden bg-muted"
					>
						<div className="aspect-square">
							<img
								src={item.image}
								alt={item.name}
								className="size-full object-cover group-hover:scale-105 transition-transform"
							/>
						</div>
						<div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
							<p className="text-white text-xs truncate">{item.name}</p>
							<p className="text-white text-sm font-bold">${item.price}</p>
						</div>
						<Button
							variant="ghost"
							size="icon-sm"
							className="absolute top-2 right-2 bg-white/90 hover:bg-white"
						>
							<MessageCircle className="size-4" />
						</Button>
					</div>
				))}
			</div>
		</ScrollArea>
	</div>
);

const ChatMessage = ({
	message,
	items,
}: {
	message: Message;
	items: WishlistItem[];
}) => {
	const isUser = message.sender === 'user';
	const linkedItem = message.itemId
		? items.find((i) => i.id === message.itemId)
		: null;

	return (
		<div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
			<Avatar className="size-8">
				<AvatarImage src={message.senderAvatar} />
				<AvatarFallback>{message.senderName[0]}</AvatarFallback>
			</Avatar>
			<div className={`max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
				<div
					className={`rounded-2xl px-3 py-2 ${isUser ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm'}`}
				>
					<p className="text-sm">{message.content}</p>
				</div>
				{linkedItem && (
					<div
						className={`mt-1 p-2 rounded-lg bg-card border flex items-center gap-2 ${isUser ? 'ml-auto' : ''}`}
					>
						<div className="size-10 rounded overflow-hidden bg-muted">
							<img
								src={linkedItem.image}
								alt={linkedItem.name}
								className="size-full object-cover"
							/>
						</div>
						<div className="min-w-0">
							<p className="text-xs truncate">{linkedItem.name}</p>
							<p className="text-xs font-bold">${linkedItem.price}</p>
						</div>
					</div>
				)}
				<p
					className={`text-[10px] text-muted-foreground mt-1 ${isUser ? 'text-right' : ''}`}
				>
					{message.timestamp}
				</p>
			</div>
		</div>
	);
};

const ChatPanel = ({
	messages,
	items,
}: {
	messages: Message[];
	items: WishlistItem[];
}) => (
	<div className="h-full flex flex-col bg-card rounded-xl border">
		<div className="p-4 border-b flex items-center gap-3">
			<Avatar>
				<AvatarImage src="https://i.pravatar.cc/100?img=5" />
				<AvatarFallback>J</AvatarFallback>
			</Avatar>
			<div>
				<p className="font-medium">Jessica</p>
				<p className="text-xs text-green-500">Online</p>
			</div>
		</div>
		<ScrollArea className="flex-1 p-4">
			<div className="space-y-4">
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} items={items} />
				))}
			</div>
		</ScrollArea>
		<div className="p-4 border-t">
			<div className="flex gap-2">
				<Button variant="ghost" size="icon">
					<ImageIcon className="size-5" />
				</Button>
				<Input placeholder="Type a message..." className="flex-1" />
				<Button variant="ghost" size="icon">
					<Smile className="size-5" />
				</Button>
				<Button size="icon">
					<Send className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Designer Handbag',
			price: 299,
			image:
				'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Silk Scarf',
			price: 89,
			image:
				'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Pearl Earrings',
			price: 149,
			image:
				'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Cashmere Sweater',
			price: 245,
			image:
				'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
			href: '/product/4',
		},
	];

	const messages: Message[] = [
		{
			id: '1',
			sender: 'friend',
			senderName: 'Jessica',
			senderAvatar: 'https://i.pravatar.cc/100?img=5',
			content: 'Hey! I love the items on your wishlist 😍',
			timestamp: '10:30 AM',
		},
		{
			id: '2',
			sender: 'user',
			senderName: 'You',
			senderAvatar: 'https://i.pravatar.cc/100?img=8',
			content: 'Thanks! What do you think about this one?',
			timestamp: '10:32 AM',
			itemId: '1',
		},
		{
			id: '3',
			sender: 'friend',
			senderName: 'Jessica',
			senderAvatar: 'https://i.pravatar.cc/100?img=5',
			content: 'OMG that bag is gorgeous! Would look amazing on you',
			timestamp: '10:33 AM',
		},
		{
			id: '4',
			sender: 'user',
			senderName: 'You',
			senderAvatar: 'https://i.pravatar.cc/100?img=8',
			content: "Right?! I've been eyeing it for weeks",
			timestamp: '10:35 AM',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<h1 className="text-2xl font-bold mb-6">Discuss with Friends</h1>
				<div className="grid @md:grid-cols-2 gap-6 h-[600px]">
					<WishlistPanel items={wishlistItems} />
					<ChatPanel messages={messages} items={wishlistItems} />
				</div>
			</div>
		</section>
	);
}
