'use client';
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from '@/components/ui/resizable';
import { useRef, useState } from 'react';
import { GroupImperativeHandle, Layout } from 'react-resizable-panels';

export function Iframe({ src }: { src: string }) {
	const [side, setSide] = useState<'left' | 'right'>('left');
	const groupRef = useRef<GroupImperativeHandle>(null);
	const handleLayoutChange = (layout: Layout) => {
		let actSide = side === 'left' ? layout.left : layout.right;
		actSide = actSide > 50 ? 100 - actSide : actSide;
		groupRef.current?.setLayout({
			left: actSide,
			center: 100 - actSide * 2,
			right: actSide,
		});
	};
	return (
		<>
			<ResizablePanelGroup
				groupRef={groupRef}
				onLayoutChange={handleLayoutChange}
				defaultLayout={{ left: 0, center: 100, right: 0 }}
			>
				<ResizablePanel id="left" />
				<ResizableHandle withHandle onPointerDown={() => setSide('left')} />
				<ResizablePanel id="center">
					<iframe src={src} className="h-full w-full" allowFullScreen />
				</ResizablePanel>
				<ResizableHandle withHandle onPointerDown={() => setSide('right')} />
				<ResizablePanel id="right" />
			</ResizablePanelGroup>
		</>
	);
}
