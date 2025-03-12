

const CarCategories = () => {
    const categories = [
        {
          title: "Sedans",
          description:
            "Enjoy a premium driving experience with Sedans. Ideal for business travel or longer drives, they provide comfort, elegance, and plenty of legroom.",
          button: "Rent Sedans in Bangalore",
        },
        {
          title: "Hatchbacks",
          description:
            "Spacious, convenient, and economical, hatchbacks are great for zipping around the city. They're easy to park, fuel-efficient, and perfect for short drives, long trips or even offroading!",
          button: "Hatchbacks in Bangalore",
        },
        {
          title: "Electric Cars",
          description:
            "Go green with electric vehicles. Experience the latest in eco-friendly technology while saving on fuel costs. Perfect for city commutes and short getaways.",
          button: "EVs in Bangalore",
        },
        {
          title: "SUVs and Family Cars",
          description:
            "Perfect for road trips with your family or group outings, SUVs offer ample space and comfort for 6-7 passengers. Whether it's a weekend getaway or a wedding trip, these cars are built for Indian families and friend groups.",
          button: "SUVs in Bangalore",
        },
      ];

    return (
        <div className="mt-10 px-5 w-11/12 mx-auto">
           <h2 className="text-center text-2xl font-semibold mb-4">
              Perfect Car for Every Journey in Bangalore
           </h2>
           <p className="text-center max-w-3xl mx-auto mb-8">
              Whether you're traveling with family, heading out for a solo trip, or simply looking for a great drive in a premium car, Zoomcar offers a variety of cars to suit your needs.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {categories.map((category, index) => (
    <div key={index} className="text-center p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold">{category.title}</h3>
        <p className="mt-2 mb-2 text-sm">{category.description}</p>
      </div>
      <button className="mt-auto bg-gray-900 text-white px-4 py-2 rounded font-medium hover:bg-gray-200">
        {category.button}
      </button>
    </div>
  ))}
</div>
    </div>
  );
};

export default CarCategories;