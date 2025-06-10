interface Tool {
  label: string;
  img?: string;
  color: string;
}

interface OptionsProps {
  tools: Tool[];
}

export default function Options({ tools }: OptionsProps) {
  return (
    <div className="flex flex-wrap mt-[63px] gap-4 px-4 w-full">
      <div className="w-full flex flex-wrap justify-between">
        {tools.map((tool, index) => (
          <div key={index} className="w-[80px] h-[105px] group">
            <div
              className={`w-[80px] h-[80px] rounded-full ${tool.color} flex items-center justify-center shadow-md 
                    group-hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer`}
            >
              {tool.img && (
                <img
                  src={tool.img || "/placeholder.svg"}
                  alt={tool.label}
                  className="w-8 h-8 object-contain transition duration-300 group-hover:scale-125"
                />
              )}
            </div>
            <div className="text-[14px] mt-2 text-center">{tool.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
