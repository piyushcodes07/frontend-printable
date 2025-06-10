interface tool {
  label: string;
  img?: string;
}

interface CategoriesProps {
  categories: tool[];
}

function CategoriesSection({ categories }: CategoriesProps) {
    return (
      <div className="w-[1580px] h-[348px]">
        <h2 className="text-4xl">Explore all categories</h2>
        <div className="flex flex-wrap mt-[50px] w-full">
          <div className="w-full flex flex-wrap justify-between">
            {categories.map((categories, index) => (
              <div key={index} className="w-[200px] h-[251px] group">
                <div
                  className={`w-[200px] h-[200px] rounded-full flex items-center justify-center
                      cursor-pointer`}
                >
                  {categories.img && (
                    <img
                      src={categories.img || "/placeholder.svg"}
                      alt={categories.label}
                      className="w-[200px] h-[200px]"
                    />
                  )}
                </div>
                <div className="text-[16px] mt-5 text-center">
                  {categories.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default CategoriesSection;