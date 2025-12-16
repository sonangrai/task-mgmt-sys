import { LoaderCircle } from 'lucide-react'

function Loader() {
  return (
    <div className="h-100 flex items-center justify-center">
      <LoaderCircle className="animate-spin rot" />
    </div>
  )
}

export default Loader
