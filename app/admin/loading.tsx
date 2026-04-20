import { Spinner } from "@/components/index"

const loading = () => {
  return (
    <div className="w-full flex items-center justify-center h-[50vh]"><Spinner className="size-6" /></div>
  )
}

export default loading