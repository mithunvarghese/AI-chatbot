
const TypingIndicator = () => {
  return (

        <div className="flex self-start gap-2 px-3 py-3">
            <DOT />
            <DOT clasName="[animation-delay: 0.2]" />
            <DOT clasName="[animation-delay: 0.4]" />
        </div>

  )
}

type DotProps = {
    clasName?: string
}

const DOT = ({clasName}: DotProps) => (            
    <div className={`w-2 h-2 rounded-full bg-orange-800 animate-pulse ${clasName}`}></div>
)

export default TypingIndicator