import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Home, Building, MapPin } from "lucide-react";

const PopularSearches = () => {
  const navigate = useNavigate();
  const [activeCity, setActiveCity] = useState("dubai");
  const [offPlanOpen, setOffPlanOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sale");
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/properties`
        );
        const data = await response.json();
        setProperties(data);
        console.log("Fetched properties:", data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Group properties by type
  const apartments = properties.filter(
    (p) => p.propertyType?.toLowerCase() === "apartment"
  );
  const villas = properties.filter(
    (p) => p.propertyType?.toLowerCase() === "villas" || p.propertyType?.toLowerCase() === "villa"
  );
  const others = properties.filter(
    (p) =>
      p.propertyType?.toLowerCase() !== "apartment" &&
      p.propertyType?.toLowerCase() !== "villas" &&
      p.propertyType?.toLowerCase() !== "villa"
  );

  // 👇 Unique combinations extract karne ka function
  const getUniqueCombos = (properties: any[]) => {
    const seen = new Set();
    return properties.filter((p) => {
      const key = `${p.propertyType}-${p.state}`;
      if (seen.has(key)) {
        return false; // duplicate → skip
      }
      seen.add(key);
      return true; // unique → allow
    });
  };

  // 👇 Filtering arrays
  const uniqueApartments = getUniqueCombos(apartments);
  const uniqueVillas = getUniqueCombos(villas);
  const uniqueOthers = getUniqueCombos(others);



  const offPlanSearches = {
    apartments: [
      "Off Plan Apartments in Dubai",
      "Off Plan Apartments in JVC",
      "Off Plan Apartments in Business Bay",
      "Off Plan Apartments in Al Furjan",
      "Off Plan Apartments in Dubai Land",
      "Off Plan Apartments in Arjan",
      "Off Plan Apartments in JVT",
      "Off Plan Apartments in Dubai Investment Park",
      "Off Plan Apartments in Dubai South",
      "Off Plan Apartments in Dubai Islands",
    ],
    villas: [
      "Off Plan Villas in Dubai",
      "Off Plan Villas in DAMAC Hills 2",
      "Off Plan Villas in DAMAC Lagoons",
      "Off Plan Villas in Tilal Al Ghaf",
      "Off Plan Villas in Mohammed Bin Rashid City",
      "Off Plan Villas in The Valley by Emaar",
      "Off Plan Villas in Palm Jebel Ali",
      "Off Plan Villas in Dubai South",
      "Off Plan Villas in Arabian Ranches 3",
      "Off Plan Villas in The Acres",
    ],
    other: [
      "Off Plan Properties in Dubai",
      "Off Plan Townhouses in Dubai",
      "Off Plan Penthouses in Dubai",
      "Off Plan Commercial Properties in Dubai",
      "Off Plan Townhouses in The Valley by Emaar",
    ],
  };

  const rentSearches = {
    apartments: [
      "Apartments for rent in Dubai",
      "Apartments for rent in JVC",
      "Apartments for rent in Business Bay",
      "Apartments for rent in Downtown Dubai",
      "Apartments for rent in Dubai Marina",
      "Apartments for rent in JLT",
      "Apartments for rent in Meydan City",
      "Apartments for rent in Palm Jumeirah",
      "Apartments for rent in Burj Khalifa",
      "Apartments for rent in Arjan",
      "Studio Apartments for rent in Dubai",
      "1 Bedroom Apartments for rent in Dubai",
      "2 Bedroom Apartments for rent in Dubai",
      "Furnished apartments for monthly rent in Dubai",
      "Cheap apartments for rent in Dubai",
    ],
    villas: [
      "Villas for rent in Dubai",
      "Villas for rent in Mirdif",
      "Villas for rent in DAMAC Hills 2",
      "Villas for rent in Al Barsha",
      "Villas for rent in Arabian Ranches",
      "Villas for rent in Palm Jumeirah",
      "Villas for rent in Dubai Hills Estate",
      "Villas for rent in DAMAC Hills",
      "Villas for rent in Tilal Al Ghaf",
      "Villas for rent in Al Furjan",
      "3 Bedroom Villas for rent in Dubai",
      "4 Bedroom Villas for rent in Dubai",
      "5 Bedroom Villas for rent in Dubai",
      "Villas with private pool for rent in Dubai",
      "Cheap villas for rent in Dubai",
    ],
    other: [
      "Properties for rent in Dubai",
      "Townhouses for rent in Dubai",
      "Penthouses for rent in Dubai",
      "Hotel Apartments for rent in Dubai",
      "Commercial Properties for rent in Dubai",
    ],
  };

  const handleCardClick = (property: any) => {
    const type = property.propertyType?.toLowerCase();
    const state = property.state?.replace(/\s+/g, "-").toLowerCase();

    // PopularSearches.jsx
    if (type === "apartment") {
      navigate(`/apartments/${state}`);
    } else if (type === "villas") {
      navigate(`/villas/${state}`);
    } else {
      navigate(`/other-properties/${state}`);
    }
  };

  const SearchCard = ({
    property,
    icon: Icon,
  }: {
    property: any;
    icon: any;
  }) => (
    <Card
      className="cursor-pointer hover:shadow-card-hover transition-smooth group"
      onClick={() => handleCardClick(property)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-primary group-hover:text-primary-hover" />
          <span className="text-sm font-medium group-hover:text-primary">
            {property.propertyType} for Sale {property.state}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Popular Real Estate Searches
          </h2>
          <p className="text-muted-foreground">
            Explore the most sought-after properties in the UAE
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Primary Tabs */}
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="sale">For Sale</TabsTrigger>
            <TabsTrigger value="rent">For Rent</TabsTrigger>
          </TabsList>

          {/* For Sale Content */}
          <TabsContent value="sale">
            <Tabs
              value={activeCity}
              onValueChange={setActiveCity}
              className="w-full"
            >
              {/* City Tabs */}
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="dubai">Dubai</TabsTrigger>
                <TabsTrigger value="abudhabi">Abu Dhabi</TabsTrigger>
                <TabsTrigger value="other">Other Emirates</TabsTrigger>
              </TabsList>

              <TabsContent value="dubai">
                {/* Regular Sale Properties */}
                <div className="space-y-8 mb-8">
                  {/* Apartments */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-primary" />
                      Apartments
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {uniqueApartments.map((p, idx) => (
                        <SearchCard key={idx} property={p} icon={Building} />
                      ))}
                    </div>
                  </div>

                  {/* Villas */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Home className="w-5 h-5 mr-2 text-primary" />
                      Villas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {uniqueVillas.map((p, idx) => (
                        <SearchCard key={idx} property={p} icon={Home} />
                      ))}
                    </div>
                  </div>

                  {/* Other Properties */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Other Properties
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {uniqueOthers.map((p, idx) => (
                        <SearchCard key={idx} property={p} icon={MapPin} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Off-Plan Section */}
                <Collapsible open={offPlanOpen} onOpenChange={setOffPlanOpen}>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-center mb-4">
                      <Badge
                        variant="outline"
                        className="px-6 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        Off-Plan Properties
                        <ChevronDown
                          className={`w-4 h-4 ml-2 transition-transform ${
                            offPlanOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Badge>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-8">
                    {/* Off-Plan Apartments */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-primary" />
                        Off-Plan Apartments
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {offPlanSearches.apartments.map((search, index) => (
                          <SearchCard
                            key={index}
                            property={search}
                            icon={Building}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Off-Plan Villas */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Home className="w-5 h-5 mr-2 text-primary" />
                        Off-Plan Villas
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {offPlanSearches.villas.map((search, index) => (
                          <SearchCard
                            key={index}
                            property={search}
                            icon={Building}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Off-Plan Other */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-primary" />
                        Off-Plan Other Properties
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {offPlanSearches.other.map((search, index) => (
                          <SearchCard
                            key={index}
                            property={search}
                            icon={MapPin}
                          />
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </TabsContent>

              <TabsContent value="abudhabi">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Abu Dhabi properties coming soon...
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="other">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Other Emirates properties coming soon...
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* For Rent Content */}
          <TabsContent value="rent">
            <Tabs
              value={activeCity}
              onValueChange={setActiveCity}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="dubai">Dubai</TabsTrigger>
                <TabsTrigger value="abudhabi">Abu Dhabi</TabsTrigger>
                <TabsTrigger value="other">Other Emirates</TabsTrigger>
              </TabsList>

              <TabsContent value="dubai">
                <div className="space-y-8">
                  {/* Rental Apartments */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-primary" />
                      Apartments for Rent
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {rentSearches.apartments.map((search, index) => (
                        <SearchCard
                          key={index}
                          property={search}
                          icon={Building}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Rental Villas */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Home className="w-5 h-5 mr-2 text-primary" />
                      Villas for Rent
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {rentSearches.villas.map((search, index) => (
                        <SearchCard key={index} property={search} icon={Home} />
                      ))}
                    </div>
                  </div>

                  {/* Other Rental Properties */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Other Properties for Rent
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {rentSearches.other.map((search, index) => (
                        <SearchCard
                          key={index}
                          property={search}
                          icon={MapPin}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="abudhabi">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Abu Dhabi rental properties coming soon...
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="other">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Other Emirates rental properties coming soon...
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PopularSearches;
