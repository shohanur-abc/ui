import dynamic from "next/dynamic"

export default function BlockSinglePage({href}: {href: string}) {
    const Comp = dynamic(() => import(`@/${href}.tsx`))
    return <Comp />
}